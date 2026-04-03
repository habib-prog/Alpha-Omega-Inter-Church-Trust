import React, { memo, useEffect, useMemo, useState } from "react";
import { onValue, push, ref, remove, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../../Zustand/authStore";
import { rtdb } from "../../Database/firebase.config";

const FloatingAdminInbox = () => {
  const { user, isSuperAdmin } = useAuthStore();
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingReplyId, setSendingReplyId] = useState("");
  const [deletingMessageId, setDeletingMessageId] = useState("");
  const [lastSeenAt, setLastSeenAt] = useState(0);

  const inboxSeenStorageKey = useMemo(() => {
    if (!user?.uid) {
      return "";
    }
    return `super_admin_inbox_seen_${user.uid}`;
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || !isSuperAdmin) {
      setLastSeenAt(0);
      return;
    }

    const stored = Number(localStorage.getItem(inboxSeenStorageKey) || 0);
    setLastSeenAt(Number.isFinite(stored) ? stored : 0);
  }, [inboxSeenStorageKey, isSuperAdmin, user?.uid]);

  useEffect(() => {
    if (!user?.uid || !isSuperAdmin) {
      setPrivateMessages([]);
      setMessagesLoading(false);
      return;
    }

    setMessagesLoading(true);
    const privateMessagesRef = ref(rtdb, "super_admin_messages");
    const unsubscribe = onValue(privateMessagesRef, (snapshot) => {
      const rawMessages = snapshot.val() || {};
      const nextMessages = [];

      Object.entries(rawMessages).forEach(([uid, userMessageNode]) => {
        if (!userMessageNode || typeof userMessageNode !== "object") {
          return;
        }

        Object.entries(userMessageNode).forEach(([messageId, messageValue]) => {
          if (!messageValue || typeof messageValue !== "object") {
            return;
          }

          const replies = Object.values(messageValue?.replies || {})
            .filter((item) => item && typeof item === "object")
            .map((item) => ({
              message: item.message || "",
              repliedBy: item.repliedBy || "Super Admin",
              repliedRole: item.repliedRole || "admin",
              createdAt: typeof item.createdAt === "number" ? item.createdAt : 0,
            }))
            .sort((a, b) => a.createdAt - b.createdAt);

          const userReplyTimes = replies
            .filter((reply) => reply.repliedRole === "user")
            .map((reply) => reply.createdAt);
          const createdAt =
            typeof messageValue?.createdAt === "number" ? messageValue.createdAt : 0;
          const userLastActivityAt = Math.max(createdAt, ...userReplyTimes, 0);

          nextMessages.push({
            id: `${uid}-${messageId}`,
            uid: messageValue?.uid || uid,
            messageKey: messageId,
            path: `super_admin_messages/${uid}/${messageId}`,
            senderName: messageValue?.senderName || "Community Member",
            senderEmail: messageValue?.senderEmail || "No email",
            subject: messageValue?.subject || "General",
            message: messageValue?.message || "",
            createdAt,
            userLastActivityAt,
            replies,
          });
        });
      });

      nextMessages.sort((a, b) => b.userLastActivityAt - a.userLastActivityAt);
      setPrivateMessages(nextMessages);
      setActiveThreadId((current) => {
        if (current && nextMessages.some((item) => item.id === current)) {
          return current;
        }
        return nextMessages[0]?.id || "";
      });
      setMessagesLoading(false);
    });

    return () => unsubscribe();
  }, [isSuperAdmin, user?.uid]);

  const unseenCount = useMemo(() => {
    if (!isSuperAdmin) {
      return 0;
    }
    return privateMessages.filter((item) => item.userLastActivityAt > lastSeenAt)
      .length;
  }, [isSuperAdmin, lastSeenAt, privateMessages]);

  const markInboxAsSeen = () => {
    const latestUserActivity = Math.max(
      ...privateMessages.map((item) => item.userLastActivityAt || 0),
      0,
    );
    setLastSeenAt(latestUserActivity);
    if (inboxSeenStorageKey) {
      localStorage.setItem(inboxSeenStorageKey, String(latestUserActivity));
    }
  };

  const toggleInbox = () => {
    setIsInboxOpen((current) => {
      const next = !current;
      if (next) {
        markInboxAsSeen();
      }
      return next;
    });
  };

  const handleReplyDraftChange = (messageId, value) => {
    setReplyDrafts((current) => ({
      ...current,
      [messageId]: value,
    }));
  };

  const handleReplyPrivateMessage = async (messageId) => {
    if (!messageId) {
      toast.error("Please select a conversation.");
      return;
    }

    const targetMessage = privateMessages.find((item) => item.id === messageId);
    if (!targetMessage?.uid || !targetMessage?.messageKey) {
      toast.error("Message not found.");
      return;
    }

    const replyText = String(replyDrafts[messageId] || "").trim();
    if (!replyText) {
      toast.error("Please write a reply.");
      return;
    }

    setSendingReplyId(messageId);
    try {
      const replyRef = push(
        ref(
          rtdb,
          `super_admin_messages/${targetMessage.uid}/${targetMessage.messageKey}/replies`,
        ),
      );
      await set(replyRef, {
        message: replyText,
        repliedBy: user?.email || "Super Admin",
        repliedRole: "admin",
        createdAt: Date.now(),
      });

      toast.success("Reply sent.");
      setReplyDrafts((current) => ({
        ...current,
        [messageId]: "",
      }));
    } catch (error) {
      toast.error("Could not send reply.");
    } finally {
      setSendingReplyId("");
    }
  };

  const handleDeletePrivateMessage = async (messageId) => {
    const targetMessage = privateMessages.find((item) => item.id === messageId);
    if (!targetMessage?.path) {
      toast.error("Message not found.");
      return;
    }

    setDeletingMessageId(messageId);
    try {
      await remove(ref(rtdb, targetMessage.path));
      toast.success("Message deleted.");
    } catch (error) {
      toast.error("Could not delete message.");
    } finally {
      setDeletingMessageId("");
    }
  };

  const activeThread = useMemo(
    () => privateMessages.find((item) => item.id === activeThreadId) || null,
    [activeThreadId, privateMessages],
  );

  const activeThreadTimeline = useMemo(() => {
    if (!activeThread) {
      return [];
    }

    return [
      {
        id: `${activeThread.id}-root`,
        message: activeThread.message,
        repliedBy: activeThread.senderName || "User",
        repliedRole: "user",
        createdAt: activeThread.createdAt || 0,
      },
      ...activeThread.replies.map((reply, index) => ({
        ...reply,
        id: `${activeThread.id}-reply-${index + 1}`,
      })),
    ];
  }, [activeThread]);

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        onClick={toggleInbox}
        className="fixed bottom-6 left-1/2 z-[10001] -translate-x-1/2 rounded-full bg-[#E87461] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#D66350] md:left-auto md:right-6 md:translate-x-0"
      >
        {isInboxOpen ? "Close Inbox" : "Messages Inbox"}
        {unseenCount > 0 ? (
          <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
            {unseenCount}
          </span>
        ) : null}
      </button>

      {isInboxOpen ? (
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          className="fixed bottom-20 top-24 left-1/2 z-[10001] flex w-[98vw] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-[#E7DED3] bg-white shadow-2xl md:bottom-16 md:top-22 md:left-auto md:right-6 md:w-[97vw] md:max-w-6xl md:translate-x-0"
        >
          <div className="border-b border-[#EFE5DB] bg-[#FFFCF8] px-4 py-3">
            <p className="text-sm font-bold text-[#4A3F35]">Super Admin Inbox</p>
            <p className="text-xs text-[#6E625A]">New user activity: {unseenCount}</p>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-3">
            {messagesLoading ? (
              <p className="text-sm text-[#6E625A]">Loading messages...</p>
            ) : privateMessages.length ? (
              <div className="grid h-full min-h-0 overflow-hidden rounded-xl border border-[#E7DED3] bg-[#FFFCF8] lg:grid-cols-[320px_1fr]">
                <div className="flex min-h-0 flex-col border-b border-[#EFE5DB] bg-white lg:border-b-0 lg:border-r">
                  <div className="border-b border-[#EFE5DB] px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A54F3C]">
                      Conversations
                    </p>
                  </div>
                  <div
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2"
                  >
                    {privateMessages.map((item) => {
                      const latestReply = item.replies[item.replies.length - 1];
                      const preview = String(
                        latestReply?.message || item.message || "",
                      )
                        .replace(/\s+/g, " ")
                        .trim();
                      return (
                        <div
                          key={item.id}
                          className={`w-full rounded-lg border px-3 py-2 transition ${
                            activeThreadId === item.id
                              ? "border-[#E87461] bg-[#FFF2EC]"
                              : "border-[#EFE5DB] bg-white hover:bg-[#FFF7F2]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveThreadId(item.id)}
                            className="w-full text-left"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-[#4A3F35]">
                                {item.senderName}
                              </p>
                              <p className="text-[10px] uppercase tracking-[0.12em] text-[#A54F3C]">
                                {item.subject}
                              </p>
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-[#6E625A]">
                              {preview || "No message preview"}
                            </p>
                          </button>
                          <div className="mt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleDeletePrivateMessage(item.id)}
                              disabled={deletingMessageId === item.id}
                              className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingMessageId === item.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex h-full min-h-0 flex-col overflow-hidden">
                  <div className="border-b border-[#EFE5DB] bg-white px-3 py-2">
                    <p className="text-xs font-semibold text-[#4A3F35]">
                      {activeThread?.senderName || "User"} |{" "}
                      {activeThread?.senderEmail || "No email"}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#A54F3C]">
                      {activeThread?.subject || "General"}
                    </p>
                  </div>

                  <div
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3"
                  >
                    {activeThreadTimeline.map((reply) => {
                      const isUserReply = reply.repliedRole === "user";
                      return (
                        <div
                          key={reply.id}
                          className={`flex ${isUserReply ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs ${
                              isUserReply
                                ? "border border-[#E7DED3] bg-white text-[#4A3F35]"
                                : "bg-[#E87461] text-white"
                            }`}
                          >
                            <p className="font-semibold opacity-85">
                              {isUserReply
                                ? `User: ${reply.repliedBy || "User"}`
                                : reply.repliedBy || "Admin"}
                            </p>
                            <p className="mt-1 whitespace-pre-wrap">{reply.message}</p>
                            <p className="mt-1 text-[10px] opacity-70">
                              {reply.createdAt
                                ? new Date(reply.createdAt).toLocaleString()
                                : "Unknown time"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#EFE5DB] bg-white p-3">
                    <textarea
                      value={replyDrafts[activeThread?.id || ""] || ""}
                      onChange={(event) =>
                        handleReplyDraftChange(
                          activeThread?.id || "",
                          event.target.value,
                        )
                      }
                      placeholder="Write a reply..."
                      className="min-h-18 w-full rounded-lg border border-[#E7DED3] px-3 py-2 text-sm outline-none focus:border-[#E87461]"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleReplyPrivateMessage(activeThread?.id || "")}
                        disabled={
                          !activeThread?.id || sendingReplyId === activeThread?.id
                        }
                        className="rounded-lg bg-[#E87461] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#D66350] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {sendingReplyId === activeThread?.id ? "Sending..." : "Send"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePrivateMessage(activeThread?.id || "")}
                        disabled={
                          !activeThread?.id || deletingMessageId === activeThread?.id
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingMessageId === activeThread?.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#6E625A]">No private messages yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(FloatingAdminInbox);
