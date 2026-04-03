import React, { useEffect, useMemo, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import { LuClock10 } from "react-icons/lu";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiInstagram } from "react-icons/si";
import { BsFillSendFill } from "react-icons/bs";
import { onValue, push, ref, set, update } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../Zustand/authStore";
import { rtdb } from "../Database/firebase.config";

const SUBJECT_OPTIONS = [
  "Education",
  "Sustainable Farming",
  "Clean Water Initiative",
  "Healthcare",
  "Parenting Responsibilities",
  "Food",
];

const ContactUs = () => {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myMessages, setMyMessages] = useState([]);
  const [myMessagesLoading, setMyMessagesLoading] = useState(true);
  const [activeThreadId, setActiveThreadId] = useState("");
  const [seenByThread, setSeenByThread] = useState({});
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingReplyId, setSendingReplyId] = useState("");
  const [deletingThreadId, setDeletingThreadId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: SUBJECT_OPTIONS[0],
    message: "",
  });

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      fullName:
        user?.displayName || user?.name || current.fullName || "Community Member",
      email: user?.email || current.email,
    }));
  }, [user]);

  const userSeenStorageKey = useMemo(() => {
    if (!user?.uid) {
      return "";
    }
    return `user_inbox_seen_${user.uid}`;
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) {
      setSeenByThread({});
      return;
    }
    try {
      const raw = localStorage.getItem(userSeenStorageKey) || "{}";
      const parsed = JSON.parse(raw);
      setSeenByThread(parsed && typeof parsed === "object" ? parsed : {});
    } catch {
      setSeenByThread({});
    }
  }, [user?.uid, userSeenStorageKey]);

  useEffect(() => {
    if (!user?.uid) {
      setMyMessages([]);
      setMyMessagesLoading(false);
      return;
    }

    const myMessagesRef = ref(rtdb, `super_admin_messages/${user.uid}`);
    const unsubscribe = onValue(myMessagesRef, (snapshot) => {
      const rawMessages = snapshot.val() || {};
      const nextMessages = Object.entries(rawMessages).map(
        ([messageId, messageValue]) => {
          if (messageValue?.hiddenForUser) {
            return null;
          }

          const rawReplies = messageValue?.replies || {};
          const replies = Object.values(rawReplies)
            .filter((item) => item && typeof item === "object")
            .map((item) => ({
              message: item.message || "",
              repliedBy: item.repliedBy || "Super Admin",
              repliedRole: item.repliedRole || "admin",
              createdAt:
                typeof item.createdAt === "number" ? item.createdAt : 0,
            }))
            .sort((a, b) => a.createdAt - b.createdAt);

          const lastAdminReplyAt = Math.max(
            ...replies
              .filter((reply) => reply.repliedRole !== "user")
              .map((reply) => reply.createdAt || 0),
            0,
          );

          return {
            id: messageId,
            subject: messageValue?.subject || "General",
            message: messageValue?.message || "",
            createdAt:
              typeof messageValue?.createdAt === "number"
                ? messageValue.createdAt
                : 0,
            replies,
            lastAdminReplyAt,
          };
        },
      ).filter(Boolean);

      nextMessages.sort((a, b) => b.createdAt - a.createdAt);
      setMyMessages(nextMessages);
      setActiveThreadId((current) => {
        if (current && nextMessages.some((item) => item.id === current)) {
          return current;
        }
        return nextMessages[0]?.id || "";
      });
      setMyMessagesLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!activeThreadId) {
      return;
    }
    const activeThread = myMessages.find((item) => item.id === activeThreadId);
    if (!activeThread?.lastAdminReplyAt) {
      return;
    }

    setSeenByThread((current) => {
      const currentSeen = Number(current?.[activeThreadId] || 0);
      if (currentSeen >= activeThread.lastAdminReplyAt) {
        return current;
      }
      const next = {
        ...current,
        [activeThreadId]: activeThread.lastAdminReplyAt,
      };
      if (userSeenStorageKey) {
        localStorage.setItem(userSeenStorageKey, JSON.stringify(next));
      }
      return next;
    });
  }, [activeThreadId, myMessages, userSeenStorageKey]);

  const handleInputChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.uid) {
      toast.error("Please login first to send a private message to super admins.");
      return;
    }

    const messageText = String(formData.message || "").trim();
    if (!messageText) {
      toast.error("Please write your message.");
      return;
    }

    if (messageText.length < 8) {
      toast.error("Message should be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newMessageRef = push(ref(rtdb, `super_admin_messages/${user.uid}`));
      await set(newMessageRef, {
        uid: user.uid,
        senderEmail: String(user.email || formData.email || "").trim().toLowerCase(),
        senderName: String(
          formData.fullName || user.displayName || user.email || "Community Member",
        ).trim(),
        subject: String(formData.subject || "General").trim(),
        message: messageText,
        isRead: false,
        createdAt: Date.now(),
      });

      toast.success("Message sent to super admin team.");
      setFormData((current) => ({
        ...current,
        subject: SUBJECT_OPTIONS[0],
        message: "",
      }));
    } catch (error) {
      toast.error("Could not send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyDraftChange = (messageId, value) => {
    setReplyDrafts((current) => ({
      ...current,
      [messageId]: value,
    }));
  };

  const handleReplyToThread = async (messageId) => {
    if (!user?.uid) {
      toast.error("Please login first.");
      return;
    }
    if (!messageId) {
      toast.error("Please select a conversation.");
      return;
    }

    const replyText = String(replyDrafts[messageId] || "").trim();
    if (!replyText) {
      toast.error("Please write your reply.");
      return;
    }

    setSendingReplyId(messageId);
    try {
      const replyRef = push(
        ref(rtdb, `super_admin_messages/${user.uid}/${messageId}/replies`),
      );
      await set(replyRef, {
        message: replyText,
        repliedBy: String(user.email || user.displayName || "User"),
        repliedRole: "user",
        createdAt: Date.now(),
      });

      toast.success("Reply sent.");
      setReplyDrafts((current) => ({
        ...current,
        [messageId]: "",
      }));
    } catch {
      toast.error("Could not send reply.");
    } finally {
      setSendingReplyId("");
    }
  };

  const handleDeleteConversation = async (messageId) => {
    if (!user?.uid) {
      toast.error("Please login first.");
      return;
    }
    if (!messageId) {
      toast.error("Conversation not found.");
      return;
    }

    setDeletingThreadId(messageId);
    try {
      await update(ref(rtdb, `super_admin_messages/${user.uid}/${messageId}`), {
        hiddenForUser: true,
        hiddenForUserAt: Date.now(),
      });
      toast.success("Conversation removed from your inbox.");
      setReplyDrafts((current) => {
        const next = { ...current };
        delete next[messageId];
        return next;
      });
    } catch {
      toast.error("Could not delete conversation.");
    } finally {
      setDeletingThreadId("");
    }
  };

  const activeThread = useMemo(
    () => myMessages.find((item) => item.id === activeThreadId) || null,
    [activeThreadId, myMessages],
  );

  const activeThreadTimeline = useMemo(() => {
    if (!activeThread) {
      return [];
    }

    return [
      {
        id: `${activeThread.id}-root`,
        message: activeThread.message,
        repliedBy: "You",
        repliedRole: "user",
        createdAt: activeThread.createdAt,
      },
      ...activeThread.replies.map((reply, index) => ({
        ...reply,
        id: `${activeThread.id}-reply-${index + 1}`,
      })),
    ];
  }, [activeThread]);

  const unreadCount = useMemo(
    () =>
      myMessages.filter(
        (item) => (item.lastAdminReplyAt || 0) > Number(seenByThread[item.id] || 0),
      ).length,
    [myMessages, seenByThread],
  );

  return (
    <section className="py-36">
      <ToastContainer />
      <div className="container">
        <header className="bg-[#4A3F35] w-full h-16 fixed top-0 left-0 z-60 flex items-center px-6 justify-between shadow-md"></header>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Let's start a conversation
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you have a question about features, trials, pricing, or
            anything else, our team is ready to answer all your questions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-amber-700 rounded-2xl">
          <div className="bg-slate-900 text-slate-50 p-8 md:p-12 h-full flex flex-col justify-between rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none relative overflow-hidden">
            {/* Background decorative  */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
              <p className="text-slate-400 mb-10 text-lg">
                We'd love to hear from you. Our friendly team is always here to
                chat.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                    <IoMailOpenOutline className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 mb-1">
                      Chat to us
                    </h3>
                    <p className="text-slate-400 text-sm mb-1">
                      Our friendly team is here to help.
                    </p>
                    <a
                      href="#"
                      className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                    <IoLocationOutline className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 mb-1">Office</h3>
                    <p className="text-slate-400 text-sm mb-1">
                      Come say hello at our office HQ.
                    </p>
                    <p className="text-slate-300 font-medium">
                      100 Smith Street <br />
                      Collingwood VIC 3066 AU
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                    <FiPhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 mb-1">Phone</h3>
                    <p className="text-slate-400 text-sm mb-1">
                      Mon-Fri from 8am to 5pm.
                    </p>
                    <a
                      href="#"
                      className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
                    >
                      +1 (555) 000-0000
                    </a>
                  </div>
                </div>

                {/* office time section */}
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                    <LuClock10 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-slate-300 font-medium">
                      Monday - Friday: 9:00 AM - 6:00 PM <br />
                      Weekend: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social section */}
            <div className="mt-12 pt-8 border-t border-slate-800 relative z-10">
              <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  to="#"
                  className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all"
                >
                  <TfiTwitter className="w-5 h-5" />
                </a>
                <a
                  to="#"
                  className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all"
                >
                  <SlSocialLinkedin className="w-5 h-5" />
                </a>
                <a
                  to="#"
                  className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          {/*form part */}
          <div className="bg-white p-8 md:p-12 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Send us a message
              </h2>
              <p className="text-slate-500">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                      handleInputChange("fullName", event.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700"
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700"
                    placeholder="AlphaOmega@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(event) => handleInputChange("subject", event.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700"
                >
                  {SUBJECT_OPTIONS.map((subject) => (
                    <option key={subject} className="bg-amber-600 text-slate-700">
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(event) => handleInputChange("message", event.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700 resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E87461] hover:bg-amber-800 hover:text-white text-slate-900 font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center space-x-2"
              >
                <BsFillSendFill className="w-5 h-5" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>{" "}
        {/*grid-col-div */}

        <div className="mt-10 rounded-2xl border border-amber-700 bg-white p-6 md:p-8">
          <h3 className="text-2xl font-bold text-slate-900">My Private Messages</h3>
          <p className="mt-2 text-slate-600">
            Your messages and super admin replies will appear here.
          </p>
          {unreadCount > 0 ? (
            <p className="mt-2 inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              {unreadCount} new reply
            </p>
          ) : null}

          {!user ? (
            <p className="mt-5 text-sm text-slate-500">
              Please login to view your private message replies.
            </p>
          ) : myMessagesLoading ? (
            <p className="mt-5 text-sm text-slate-500">Loading your messages...</p>
          ) : myMessages.length ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-[260px_1fr]">
              <div
                data-lenis-prevent
                data-lenis-prevent-wheel
                className="max-h-[520px] space-y-2 overflow-y-auto rounded-xl border border-amber-200 bg-amber-50/40 p-2"
              >
                {myMessages.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full rounded-lg px-3 py-3 text-left transition ${
                      activeThreadId === item.id
                        ? "bg-[#E87461] text-white"
                        : "bg-white text-slate-700 hover:bg-amber-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveThreadId(item.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold">You</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                          {item.subject}
                        </p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs opacity-90">
                        {item.replies[item.replies.length - 1]?.message || item.message}
                      </p>
                    </button>
                    <div className="mt-2 flex items-center justify-between">
                      {(item.lastAdminReplyAt || 0) >
                      Number(seenByThread[item.id] || 0) ? (
                        <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                          New
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteConversation(item.id)}
                        disabled={deletingThreadId === item.id}
                        className={`rounded-md border px-2 py-1 text-[10px] font-semibold transition ${
                          activeThreadId === item.id
                            ? "border-white/60 bg-white/20 text-white hover:bg-white/30"
                            : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {deletingThreadId === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div
                data-lenis-prevent
                data-lenis-prevent-wheel
                className="flex h-[520px] flex-col overflow-hidden rounded-xl border border-amber-200 bg-white"
              >
                <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {activeThread?.subject || "Conversation"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Private chat with super admin
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteConversation(activeThread?.id || "")}
                      disabled={!activeThread?.id || deletingThreadId === activeThread?.id}
                      className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingThreadId === activeThread?.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                <div
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  className="flex-1 space-y-3 overflow-y-auto bg-[#FFF9F4] px-3 py-4"
                >
                  {activeThreadTimeline.map((reply) => {
                    const isUserReply = reply.repliedRole === "user";
                    return (
                      <div
                        key={reply.id}
                        className={`flex ${isUserReply ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm ${
                            isUserReply
                              ? "bg-[#E87461] text-white"
                              : "border border-amber-200 bg-white text-slate-700"
                          }`}
                        >
                          <p className="text-[11px] font-semibold opacity-80">
                            {isUserReply ? "You" : "Admin"}
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

                <div className="border-t border-amber-200 bg-white p-3">
                  <div className="space-y-2">
                    <textarea
                      value={replyDrafts[activeThread?.id || ""] || ""}
                      onChange={(event) =>
                        handleReplyDraftChange(
                          activeThread?.id || "",
                          event.target.value,
                        )
                      }
                      placeholder="Write your message..."
                      className="min-h-20 w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleReplyToThread(activeThread?.id || "")}
                      disabled={
                        !activeThread?.id || sendingReplyId === activeThread?.id
                      }
                      className="rounded-lg bg-[#E87461] px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sendingReplyId === activeThread?.id ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              You have not sent any private message yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
