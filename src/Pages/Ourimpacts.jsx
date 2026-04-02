// import Card from "../Components/Card";
// import React from "react";
// import TestimonialCard from "../Components/TestimonialCard";

// const Ourimpacts = () => {
//   return (
//     <section className="py-10">
//       <div className="container">
//         <div className="text-center m-auto">
//           <h3 className="text-[#E87461] text-sm font-medium">Our Impact</h3>
//           <h2 className="text-4xl text-[#4A3F35] font-bold mb-4 mt-2">
//             Projects We're Proud Of
//           </h2>
//           <p className="text-[#4A3F35]/70 max-w-2xl mx-auto">
//             See how your donations are being put to work across the globe,
//             creating sustainable change where it's needed most.
//           </p>
//         </div>

//         {/* Responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//           <Card
//             title="Education for All"
//             description="Building schools and supplying learning materials for underprivileged children."
//             campaign="500+ Students"
//             image="/cardphoto.avif"
//           />
//           <Card
//             title="Sustainable Farming"
//             description="Teaching modern agricultural techniques to ensure food security."
//             campaign="200 Families"
//             image="/agriculture.avif"
//           />
//           <Card
//             title="Clean Water Initiative"
//             description="Providing sustainable clean water access to remote villages in East Africa."
//             campaign="12 Wells Built"
//             image="/cleanwater.jpg"
//           />
//           <Card
//             title="Healthcare for All"
//             description="Providing urgent medical care and treatment to those who need it most."
//             campaign="1000+ Patients"
//             image="/healtcare.jpg"
//           />
//         </div>
//         {/*team member*/}
//         <div className="py-24">
//           <div className="text-center m-auto">
//             <h2 className="text-4xl font-bold text-[#4A3F35] mb-4">
//               Voices of Hope
//             </h2>
//             <p className="text-[#4A3F35]/70">
//               Hear from the incredible people who make our mission possible.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//             <TestimonialCard
//               image="/russel.png"
//               name="Russel Abraham"
//               role="Founder"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/parvez.png"
//               name="Parvez Youhonna"
//               role="Secretary"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/subir.png"
//               name="Dr. Subir Khiyang"
//               role="Accounts"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/admin.jfif"
//               name="David Chen"
//               role="Monthly Donor"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ourimpacts;
import Card from "../Components/Card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TestimonialCard from "../Components/TestimonialCard";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import useAuthStore from "../Zustand/authStore";
import { rtdb } from "../Database/firebase.config";
import { useSiteContent } from "../data/useSiteContent";
import { getUserAvatarUrl, getUserDisplayName } from "../utils/userProfile";

const COMMENT_CACHE_KEY = "public_comments_cache";
const MAX_COMMENT_WORDS = 35;
const countWords = (text = "") =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
const dedupeComments = (items = []) => {
  const map = new Map();
  items.forEach((item) => {
    const key = item?.path || `${item?.uid || "unknown"}-${item?.id || ""}`;
    if (!map.has(key)) {
      map.set(key, item);
    }
  });
  return Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
};

const Ourimpacts = () => {
  const { user, isSuperAdmin } = useAuthStore();
  const voicesContent = useSiteContent(
    "voices-of-hope",
    "/content/voices-of-hope.json",
    {
      title: "Voices of Hope",
      subtitle: "Hear from the incredible people who make our mission possible.",
      members: [
        { name: "Russel Abraham", role: "Founder", image: "/russel.png" },
        { name: "Parvez Youhonna", role: "Secretary", image: "/parvez.png" },
        { name: "Dr. Subir Khiyang", role: "Accounts", image: "/subir.png" },
        { name: "David Chen", role: "Monthly Donor", image: "/admin.jfif" },
      ],
    },
  );
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState("");
  const [cardsPerView, setCardsPerView] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [readBlocked, setReadBlocked] = useState(false);
  const submitLockRef = useRef(false);
  const writeCommentCache = (items) => {
    try {
      localStorage.setItem(COMMENT_CACHE_KEY, JSON.stringify(items));
    } catch (error) {
      // Ignore cache write failures (private mode/storage full)
    }
  };
  const isPermissionDenied = (error) => {
    const code = String(error?.code || "").toLowerCase();
    const message = String(error?.message || "").toLowerCase();

    return (
      code.includes("permission_denied") ||
      code.includes("permission-denied") ||
      message.includes("permission_denied") ||
      message.includes("permission denied")
    );
  };

  useEffect(() => {
    const commentsRef = ref(rtdb, "public_comments");
    const unsubscribe = onValue(
      commentsRef,
      (snapshot) => {
        const rawComments = snapshot.val() || {};
        const nextComments = [];

        Object.entries(rawComments).forEach(([firstKey, firstValue]) => {
          const looksLikeCommentNode =
            firstValue && typeof firstValue === "object" && "text" in firstValue;

          if (looksLikeCommentNode) {
            nextComments.push({
              id: firstKey,
              path: `public_comments/${firstKey}`,
              text: firstValue?.text || "",
              name: firstValue?.name || "Community Supporter",
              role: firstValue?.role || "Public Comment",
              image: firstValue?.image || "/user.png",
              uid: firstValue?.uid || "",
              createdAt:
                typeof firstValue?.createdAt === "number"
                  ? firstValue.createdAt
                  : 0,
            });
            return;
          }

          if (firstValue && typeof firstValue === "object") {
            Object.entries(firstValue).forEach(([commentId, commentValue]) => {
              if (!commentValue || typeof commentValue !== "object") {
                return;
              }

              nextComments.push({
                id: commentId,
                path: `public_comments/${firstKey}/${commentId}`,
                text: commentValue?.text || "",
                name: commentValue?.name || "Community Supporter",
                role: commentValue?.role || "Public Comment",
                image: commentValue?.image || "/user.png",
                uid: commentValue?.uid || firstKey,
                createdAt:
                  typeof commentValue?.createdAt === "number"
                    ? commentValue.createdAt
                    : 0,
              });
            });
          }
        });

        const uniqueComments = dedupeComments(nextComments);

        setReadBlocked(false);
        setComments(uniqueComments);
        writeCommentCache(uniqueComments);
      },
      () => {
        setReadBlocked(true);
        try {
          const cached = JSON.parse(
            localStorage.getItem(COMMENT_CACHE_KEY) || "[]",
          );
          const uniqueCached = dedupeComments(Array.isArray(cached) ? cached : []);
          setComments(uniqueCached);
        } catch (error) {
          setComments([]);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        return;
      }

      if (window.innerWidth >= 640) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = useMemo(
    () => Math.max(0, comments.length - cardsPerView),
    [comments.length, cardsPerView]
  );

  useEffect(() => {
    if (startIndex > maxStartIndex) {
      setStartIndex(maxStartIndex);
    }
  }, [startIndex, maxStartIndex]);

  const visibleComments = comments.slice(startIndex, startIndex + cardsPerView);
  const commentWordCount = useMemo(() => countWords(commentText), [commentText]);
  const isWordLimitExceeded = commentWordCount > MAX_COMMENT_WORDS;

  const handleSlidePrev = () => {
    setSlideDirection(-1);
    setStartIndex((current) => Math.max(0, current - cardsPerView));
  };

  const handleSlideNext = () => {
    setSlideDirection(1);
    setStartIndex((current) => Math.min(maxStartIndex, current + cardsPerView));
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (submitLockRef.current || isSubmitting) {
      return;
    }

    if (!user) {
      setFormMessage("Please login to share a public comment.");
      return;
    }

    const trimmed = commentText.trim();

    if (trimmed.length < 4) {
      setFormMessage("Please write at least 4 characters.");
      return;
    }
    if (isWordLimitExceeded) {
      setFormMessage("Word limit crossed. Maximum 150 words allowed.");
      return;
    }

    setIsSubmitting(true);
    submitLockRef.current = true;
    setFormMessage("");

    try {
      const newCommentRef = push(ref(rtdb, `public_comments/${user.uid}`));
      const nextComment = {
        id: newCommentRef.key || `local-${Date.now()}`,
        path: `public_comments/${user.uid}/${newCommentRef.key}`,
        text: trimmed,
        name: getUserDisplayName(user),
        role: "Community Member",
        image: getUserAvatarUrl(user),
        createdAt: Date.now(),
        uid: user.uid,
      };

      await set(newCommentRef, {
        text: nextComment.text,
        name: nextComment.name,
        role: nextComment.role,
        image: nextComment.image,
        createdAt: nextComment.createdAt,
        uid: nextComment.uid,
      });

      if (readBlocked) {
        setComments((current) => {
          const merged = dedupeComments([nextComment, ...current]);
          writeCommentCache(merged);
          return merged;
        });
      }
      setCommentText("");
      setFormMessage("Comment posted successfully.");
    } catch (error) {
      if (isPermissionDenied(error)) {
        setFormMessage(
          "Comment post blocked by Realtime Database rules. Please enable write access for logged-in users on public_comments.",
        );
      } else {
        setFormMessage(
          error?.message || "Could not post comment. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  };

  const handleDeleteComment = async (comment) => {
    if (!user) {
      setFormMessage("Please login to delete your comment.");
      return;
    }

    const canDelete = isSuperAdmin || comment.uid === user.uid;

    if (!canDelete) {
      setFormMessage("You can only delete your own comments.");
      return;
    }

    setDeletingCommentId(comment.id);
    setFormMessage("");

    try {
      await remove(ref(rtdb, comment.path || `public_comments/${comment.id}`));
      setComments((current) => {
        const next = current.filter(
          (item) =>
            (comment.path ? item.path !== comment.path : true) &&
            item.id !== comment.id,
        );
        writeCommentCache(next);
        return next;
      });
      setFormMessage("Comment deleted.");
    } catch (error) {
      setFormMessage("Could not delete comment. Please try again.");
    } finally {
      setDeletingCommentId("");
    }
  };

  // Parent container variants to handle sequential (staggered) loading of children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
      },
    },
  };

  // Default item variants for fade-in and scale-up effect
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-10"
    >
      <div className="container">
        {/* Header Section */}
        <Motion.div variants={itemVariants} className="text-center m-auto">
          <h3 className="text-[#E87461] text-sm font-medium">Our Impact</h3>
          <h2 className="text-4xl text-[#4A3F35] font-bold mb-4 mt-2">
            Projects We're Proud Of
          </h2>
          <p className="text-[#4A3F35]/70 max-w-2xl mx-auto">
            See how your donations are being put to work across the globe,
            creating sustainable change where it's needed most.
          </p>
        </Motion.div>

        {/* Project Cards Grid */}
        <Motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          {[
            {
              title: "Education for All",
              desc: "Building schools...",
              camp: "500+ Students",
              img: "/cardphoto.avif",
            },
            {
              title: "Sustainable Farming",
              desc: "Teaching modern...",
              camp: "200 Families",
              img: "/agriculture.avif",
            },
            {
              title: "Clean Water Initiative",
              desc: "Providing clean water...",
              camp: "12 Wells Built",
              img: "/cleanwater.jpg",
            },
            {
              title: "Healthcare for All",
              desc: "Providing medical care...",
              camp: "1000+ Patients",
              img: "/healtcare.jpg",
            },
          ].map((item, index) => (
            <Motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }} // Lift effect on hover
              className="h-full"
            >
              <Card
                title={item.title}
                description={item.desc}
                campaign={item.camp}
                image={item.img}
              />
            </Motion.div>
          ))}
        </Motion.div>

        {/* Voices of Hope (Testimonials) */}
        <div className="py-24">
          <Motion.div variants={itemVariants} className="text-center m-auto">
            <h2 className="text-4xl font-bold text-[#4A3F35] mb-4">
              {voicesContent.title}
            </h2>
            <p className="text-[#4A3F35]/70">
              {voicesContent.subtitle}
            </p>
          </Motion.div>

          <Motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {(voicesContent.members || []).map((member, index) => (
              /* CRITICAL CHANGE: 
                 We pass the 'index' prop so TestimonialCard knows 
                 whether to slide from the Left or Right -James(author changed the cod).
              */
              <TestimonialCard
                key={index}
                index={index}
                image={member.image}
                name={member.name}
                role={member.role}
                quote={
                  member.quote ||
                  "Seeing the direct impact of support on families has been incredibly moving."
                }
              />
            ))}
          </Motion.div>

          <div className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold text-[#4A3F35]">
                  Public Comments
                </h3>
                <p className="mt-2 text-[#4A3F35]/70">
                  Community voices from supporters and visitors.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSlidePrev}
                  disabled={startIndex === 0}
                  aria-label="Previous comments"
                  className="rounded-full border border-[#E87461] px-4 py-2 text-sm font-semibold text-[#E87461] transition hover:bg-[#E87461] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span aria-hidden="true">&#8592;</span>
                </button>
                <button
                  type="button"
                  onClick={handleSlideNext}
                  disabled={startIndex >= maxStartIndex}
                  aria-label="Next comments"
                  className="rounded-full border border-[#E87461] px-4 py-2 text-sm font-semibold text-[#E87461] transition hover:bg-[#E87461] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>

            <Motion.div
              key={`${startIndex}-${cardsPerView}`}
              initial={{ opacity: 0, x: slideDirection > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${Math.max(
                  1,
                  visibleComments.length
                )}, minmax(0, 1fr))`,
              }}
            >
              {visibleComments.length ? (
                visibleComments.map((comment) => {
                  const canDelete = user && (isSuperAdmin || comment.uid === user.uid);

                  return (
                    <TestimonialCard
                      key={comment.id}
                      image={comment.image}
                      name={comment.name}
                      role={comment.role}
                      quote={comment.text}
                      enableReadMore
                      fixedHeight
                      action={
                        canDelete ? (
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(comment)}
                            disabled={deletingCommentId === comment.id}
                            className="invisible rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 opacity-0 transition group-hover:visible group-hover:opacity-100 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingCommentId === comment.id ? "Deleting..." : "Delete"}
                          </button>
                        ) : null
                      }
                    />
                  );
                })
              ) : (
                <div className="rounded-3xl border border-[#E7DED3] bg-white p-6 text-[#6E625A]">
                  No public comments yet. Be the first to share your voice.
                </div>
              )}
            </Motion.div>

            <div className="mt-10 rounded-3xl border border-[#E7DED3] bg-white p-6 shadow-sm">
              <h4 className="text-xl font-bold text-[#4A3F35]">
                Leave A Public Comment
              </h4>
              <p className="mt-2 text-sm text-[#6E625A]">
                Only logged-in users can post comments.
              </p>
              {readBlocked ? (
                <p className="mt-2 text-sm text-amber-700">
                  Live comment feed is blocked by database read rules. Showing
                  cached comments only.
                </p>
              ) : null}

              {user ? (
                <form onSubmit={handleCommentSubmit} className="mt-5 space-y-4">
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write your public comment..."
                    className="min-h-28 w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        isWordLimitExceeded ? "text-red-600 font-semibold" : "text-[#6E625A]"
                      }
                    >
                      {isWordLimitExceeded
                        ? "Word limit crossed"
                        : `${commentWordCount}/${MAX_COMMENT_WORDS} words`}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || isWordLimitExceeded || !commentText.trim()
                    }
                    className="rounded-full bg-[#E87461] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D66350] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Posting..."
                      : isWordLimitExceeded
                        ? "Word Limit Crossed"
                        : "Post Comment"}
                  </button>
                </form>
              ) : (
                <div className="mt-5 rounded-2xl bg-[#FCE6DE] px-4 py-4 text-sm text-[#A54F3C]">
                  Please login first to submit a public comment.{" "}
                  <Link to="/login" className="font-semibold underline">
                    Go to Login
                  </Link>
                </div>
              )}

              {formMessage ? (
                <p className="mt-4 text-sm text-[#6E625A]">{formMessage}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Motion.section>
  );
};

export default Ourimpacts;
