import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { motion as Motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../Zustand/authStore";
import { rtdb } from "../Database/firebase.config";
import {
  get,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";

const DEFAULT_SUPER_ADMIN = "xavierjames701@gmail.com";
const MAX_RTDB_CONTENT_BYTES = 900000;
const MAX_UPLOAD_FILE_BYTES = 4 * 1024 * 1024;

const sanitizeForRtdb = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForRtdb(item));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((accumulator, [key, entryValue]) => {
      if (entryValue === undefined) {
        return accumulator;
      }

      accumulator[key] = sanitizeForRtdb(entryValue);
      return accumulator;
    }, {});
  }

  if (typeof value === "number" && Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const compressImageFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.onload = () => {
      const image = new Image();

      image.onerror = () =>
        reject(new Error("Selected file is not a valid image."));
      image.onload = () => {
        const maxDimension = 1400;
        const scale = Math.min(
          1,
          maxDimension / image.width,
          maxDimension / image.height,
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d");

        if (!context) {
          reject(
            new Error("Image processing is not supported in this browser."),
          );
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });

const createItem = (fields = []) =>
  fields.reduce((accumulator, field) => {
    if (field.type === "list") {
      accumulator[field.name] = [];
      return accumulator;
    }

    if (field.type === "checkbox") {
      accumulator[field.name] = false;
      return accumulator;
    }

    if (field.type === "number") {
      accumulator[field.name] = 0;
      return accumulator;
    }

    accumulator[field.name] = "";
    return accumulator;
  }, {});

const CONTENT_SECTIONS = [
  {
    key: "home-hero",
    label: "Home Hero",
    title: "Home hero content",
    fallbackPath: "/content/home-hero.json",
    description:
      "Edit the homepage hero image, title, description, notice, and buttons.",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "notice", label: "Notice", type: "text" },
      { name: "noticeLinkText", label: "Notice Link Text", type: "text" },
      { name: "noticeLink", label: "Notice Link", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "highlight", label: "Highlight", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "backgroundImage", label: "Background Image", type: "image" },
      { name: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { name: "primaryButtonLink", label: "Primary Button Link", type: "text" },
      {
        name: "secondaryButtonText",
        label: "Secondary Button Text",
        type: "text",
      },
      {
        name: "secondaryButtonLink",
        label: "Secondary Button Link",
        type: "text",
      },
    ],
  },
  {
    key: "about-page",
    label: "About Page",
    title: "About page content",
    fallbackPath: "/content/about-page.json",
    description:
      "Manage about hero content, about section copy, images, stats, and challenge text.",
    fields: [
      { name: "heroBadge", label: "Hero Badge", type: "text" },
      { name: "heroTitle", label: "Hero Title", type: "text" },
      { name: "heroHighlight", label: "Hero Highlight", type: "text" },
      { name: "heroDescription", label: "Hero Description", type: "textarea" },
      { name: "heroImage", label: "Hero Image", type: "image" },
      {
        name: "heroButtons",
        label: "Hero Buttons",
        type: "list",
        itemLabel: "Button",
        itemFields: [
          { name: "label", label: "Label", type: "text" },
          { name: "link", label: "Link", type: "text" },
        ],
      },
      { name: "sectionTitle", label: "Section Title", type: "text" },
      {
        name: "sectionDescriptionOne",
        label: "Section Description One",
        type: "textarea",
      },
      {
        name: "sectionDescriptionTwo",
        label: "Section Description Two",
        type: "textarea",
      },
      { name: "imageOne", label: "Image One", type: "image" },
      { name: "imageTwo", label: "Image Two", type: "image" },
      {
        name: "stats",
        label: "Stats",
        type: "list",
        itemLabel: "Stat",
        itemFields: [
          { name: "count", label: "Count", type: "text" },
          { name: "label", label: "Label", type: "text" },
          { name: "icon", label: "Icon", type: "text" },
          { name: "color", label: "Color Class", type: "text" },
        ],
      },
      { name: "challengeTitle", label: "Challenge Title", type: "text" },
      {
        name: "challengeDescription",
        label: "Challenge Description",
        type: "textarea",
      },
    ],
  },
  {
    key: "campaigns",
    label: "Campaigns",
    title: "Active campaigns",
    fallbackPath: "/content/campaigns.json",
    description:
      "Manage active campaign cards. Keep items inside the top-level items array.",
    fields: [
      {
        name: "items",
        label: "Campaigns",
        type: "list",
        itemLabel: "Campaign",
        itemFields: [
          { name: "campaignName", label: "Campaign Name", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "category", label: "Category", type: "text" },
          { name: "goal", label: "Goal Amount", type: "number" },
          { name: "raised", label: "Raised Amount", type: "number" },
          { name: "comment", label: "Comment", type: "textarea" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ],
      },
    ],
  },
  {
    key: "past-campaigns",
    label: "Past Campaigns",
    title: "Past campaigns",
    fallbackPath: "/content/past-campaigns.json",
    description:
      "Manage past campaigns with goal, raised amount, progress data, and comments.",
    fields: [
      {
        name: "items",
        label: "Past Campaigns",
        type: "list",
        itemLabel: "Past Campaign",
        itemFields: [
          { name: "campaignName", label: "Campaign Name", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "category", label: "Category", type: "text" },
          { name: "goal", label: "Goal Amount", type: "number" },
          { name: "raised", label: "Raised Amount", type: "number" },
          { name: "comment", label: "Comment", type: "textarea" },
          { name: "completed", label: "Completed", type: "checkbox" },
        ],
      },
    ],
  },
  {
    key: "newsletters-page",
    label: "Newsletters",
    title: "Newsletters page",
    fallbackPath: "/content/newsletters-page.json",
    description:
      "Update the newsletters hero block, cards, and the right-side featured content.",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { name: "primaryButtonLink", label: "Primary Button Link", type: "text" },
      {
        name: "secondaryButtonText",
        label: "Secondary Button Text",
        type: "text",
      },
      {
        name: "secondaryButtonLink",
        label: "Secondary Button Link",
        type: "text",
      },
      { name: "asideBadge", label: "Aside Badge", type: "text" },
      { name: "asideTitle", label: "Aside Title", type: "text" },
      {
        name: "asideDescription",
        label: "Aside Description",
        type: "textarea",
      },
      {
        name: "featuredFocusBadge",
        label: "Featured Focus Badge",
        type: "text",
      },
      {
        name: "featuredFocusText",
        label: "Featured Focus Text",
        type: "textarea",
      },
      { name: "asideButtonText", label: "Aside Button Text", type: "text" },
      { name: "asideButtonLink", label: "Aside Button Link", type: "text" },
      {
        name: "items",
        label: "Newsletter Items",
        type: "list",
        itemLabel: "Newsletter",
        itemFields: [
          { name: "month", label: "Month", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "category", label: "Category", type: "text" },
        ],
      },
    ],
  },
  {
    key: "sponsor-child-page",
    label: "Sponsor Child",
    title: "Sponsor child page",
    fallbackPath: "/content/sponsor-child-page.json",
    description:
      "Manage sponsor child hero content and sponsor child cards, including add/remove.",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "primaryButtonText", label: "Primary Button Text", type: "text" },
      { name: "primaryButtonLink", label: "Primary Button Link", type: "text" },
      {
        name: "secondaryButtonText",
        label: "Secondary Button Text",
        type: "text",
      },
      {
        name: "secondaryButtonLink",
        label: "Secondary Button Link",
        type: "text",
      },
      { name: "impactBadge", label: "Impact Badge", type: "text" },
      { name: "impactTitle", label: "Impact Title", type: "text" },
      {
        name: "impactDescription",
        label: "Impact Description",
        type: "textarea",
      },
      {
        name: "sponsorCards",
        label: "Sponsor Cards",
        type: "list",
        itemLabel: "Child",
        itemFields: [
          { name: "photo", label: "Photo", type: "image" },
          { name: "childName", label: "Child Name", type: "text" },
          { name: "age", label: "Age", type: "text" },
          { name: "religion", label: "Religion", type: "text" },
          { name: "address", label: "Address", type: "text" },
          { name: "schoolName", label: "School Name", type: "text" },
          { name: "sponsorLink", label: "Sponsor Link", type: "text" },
        ],
      },
      { name: "processTitle", label: "Process Title", type: "text" },
      {
        name: "processSteps",
        label: "Process Steps",
        type: "list",
        itemLabel: "Step",
        itemFields: [{ name: "step", label: "Step Text", type: "text" }],
        primitive: true,
      },
    ],
  },
  {
    key: "voices-of-hope",
    label: "Voices Of Hope",
    title: "Voices of hope",
    fallbackPath: "/content/voices-of-hope.json",
    description:
      "Manage the Voices of Hope heading and testimonial cards shown on the website.",
    fields: [
      { name: "title", label: "Section Title", type: "text" },
      { name: "subtitle", label: "Section Subtitle", type: "textarea" },
      {
        name: "members",
        label: "Voice Cards",
        type: "list",
        itemLabel: "Voice",
        itemFields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "image", label: "Image", type: "image" },
          { name: "quote", label: "Quote", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "legal-page",
    label: "Legal",
    title: "Legal page",
    fallbackPath: "/content/legal-page.json",
    description:
      "Manage legal navigation sections, content, and quick download labels.",
    fields: [
      { name: "pageTitle", label: "Page Title", type: "text" },
      { name: "statusText", label: "Status Text", type: "text" },
      { name: "downloadsTitle", label: "Downloads Title", type: "text" },
      {
        name: "downloads",
        label: "Downloads",
        type: "list",
        itemLabel: "Download",
        itemFields: [{ name: "value", label: "Label", type: "text" }],
        primitive: true,
      },
      {
        name: "sections",
        label: "Legal Sections",
        type: "list",
        itemLabel: "Section",
        itemFields: [
          { name: "key", label: "Key", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "content", label: "Content", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "privacy-page",
    label: "Privacy",
    title: "Privacy page",
    fallbackPath: "/content/privacy-page.json",
    description:
      "Manage privacy sections, navigation labels, context box, and footer label.",
    fields: [
      { name: "navigationTitle", label: "Navigation Title", type: "text" },
      {
        name: "navigationSubtitle",
        label: "Navigation Subtitle",
        type: "text",
      },
      { name: "helpText", label: "Help Text", type: "textarea" },
      { name: "headerLabel", label: "Header Label", type: "text" },
      { name: "contextTitle", label: "Context Title", type: "text" },
      { name: "contextText", label: "Context Text", type: "textarea" },
      { name: "footerLabel", label: "Footer Label", type: "text" },
      {
        name: "sections",
        label: "Privacy Sections",
        type: "list",
        itemLabel: "Section",
        itemFields: [
          { name: "key", label: "Key", type: "text" },
          { name: "navLabel", label: "Navigation Label", type: "text" },
          { name: "title", label: "Title", type: "text" },
          {
            name: "details",
            label: "Details",
            type: "list",
            itemLabel: "Detail",
            itemFields: [
              { name: "subtitle", label: "Subtitle", type: "text" },
              { name: "text", label: "Text", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "terms-page",
    label: "Terms",
    title: "Terms & conditions",
    fallbackPath: "/content/terms-page.json",
    description: "Update terms title, description, and all terms sections.",
    fields: [
      { name: "pageTitle", label: "Page Title", type: "text" },
      { name: "pageDescription", label: "Page Description", type: "textarea" },
      {
        name: "sections",
        label: "Terms Sections",
        type: "list",
        itemLabel: "Section",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "content", label: "Content", type: "textarea" },
        ],
      },
    ],
  },
];

const AdminPortal = () => {
  const {
    user,
    isSuperAdmin,
    authLoading,
    addSuperAdmin,
    listSuperAdmins,
    removeSuperAdmin,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [removingEmail, setRemovingEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home-hero");
  const [formData, setFormData] = useState({});
  const [contentLoading, setContentLoading] = useState(true);
  const [contentSaving, setContentSaving] = useState(false);
  const [publicComments, setPublicComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [removingCommentId, setRemovingCommentId] = useState("");

  const activeContentSection = CONTENT_SECTIONS.find(
    (section) => section.key === activeSection,
  );

  const loadAdmins = async () => {
    const nextAdmins = await listSuperAdmins();
    setAdmins(nextAdmins);
  };

  const loadSectionContent = async (sectionKey) => {
    const section =
      CONTENT_SECTIONS.find((item) => item.key === sectionKey) ||
      CONTENT_SECTIONS[0];

    setContentLoading(true);

    try {
      const contentRef = ref(rtdb, `site_content/${section.key}/content`);
      const contentSnap = await get(contentRef);

      if (contentSnap.exists()) {
        const nextContent = contentSnap.val() ?? {};
        setFormData(nextContent);
        return;
      }

      const response = await fetch(`${section.fallbackPath}?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Fallback content not found.");
      }

      const fallbackContent = await response.json();
      setFormData(fallbackContent);
    } catch (error) {
      setFormData({});
      toast.error("Could not load section content.");
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
    loadSectionContent(activeSection);
  }, []);

  useEffect(() => {
    const commentsRef = ref(rtdb, "public_comments");
    const unsubscribe = onValue(commentsRef, (snapshot) => {
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
            uid: firstValue?.uid || "",
            createdAt:
              typeof firstValue?.createdAt === "number" ? firstValue.createdAt : 0,
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
              uid: commentValue?.uid || firstKey,
              createdAt:
                typeof commentValue?.createdAt === "number"
                  ? commentValue.createdAt
                  : 0,
            });
          });
        }
      });

      nextComments.sort((a, b) => b.createdAt - a.createdAt);

      setPublicComments(nextComments);
      setCommentsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadSectionContent(activeSection);
  }, [activeSection]);

  if (authLoading) {
    return (
      <section className="bg-[#FAF8F3] px-4 py-28 text-center text-[#4A3F35]">
        Loading admin access...
      </section>
    );
  }

  if (!user || !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const result = await addSuperAdmin(email, user.email);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Super admin added successfully.");
      setEmail("");
      await loadAdmins();
    } catch (error) {
      toast.error("Could not add super admin.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (adminEmail) => {
    setRemovingEmail(adminEmail);

    try {
      const result = await removeSuperAdmin(adminEmail);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Super admin removed successfully.");
      await loadAdmins();
    } catch (error) {
      toast.error("Could not remove super admin.");
    } finally {
      setRemovingEmail("");
    }
  };

  const handleDeletePublicComment = async (commentId) => {
    const targetComment = publicComments.find((item) => item.id === commentId);
    const commentPath = targetComment?.path || `public_comments/${commentId}`;
    setRemovingCommentId(commentId);

    try {
      await remove(ref(rtdb, commentPath));
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error("Could not delete comment.");
    } finally {
      setRemovingCommentId("");
    }
  };

  const updateFieldValue = (path, value) => {
    setFormData((current) => {
      const next = structuredClone(current);
      let cursor = next;

      for (let index = 0; index < path.length - 1; index += 1) {
        const key = path[index];

        if (cursor[key] === undefined) {
          cursor[key] = typeof path[index + 1] === "number" ? [] : {};
        }

        cursor = cursor[key];
      }

      cursor[path[path.length - 1]] = value;
      return next;
    });
  };

  const addListItem = (path, field) => {
    setFormData((current) => {
      const next = structuredClone(current);
      let cursor = next;

      for (let index = 0; index < path.length; index += 1) {
        const key = path[index];

        if (cursor[key] === undefined) {
          cursor[key] = [];
        }

        cursor = cursor[key];
      }

      if (field.primitive) {
        cursor.push("");
      } else {
        cursor.push(createItem(field.itemFields));
      }

      return next;
    });
  };

  const removeListItem = (path, itemIndex) => {
    setFormData((current) => {
      const next = structuredClone(current);
      let cursor = next;

      for (let index = 0; index < path.length; index += 1) {
        cursor = cursor[path[index]];
      }

      cursor.splice(itemIndex, 1);
      return next;
    });
  };

  const handleImageSelect = (path, file) => {
    if (!file) {
      return;
    }

    if (file.size > MAX_UPLOAD_FILE_BYTES) {
      toast.error("Image is too large. Please use an image under 4 MB.");
      return;
    }

    compressImageFile(file)
      .then((compressedImage) => {
        updateFieldValue(path, compressedImage);
      })
      .catch((error) => {
        toast.error(error.message || "Image upload failed.");
      });
  };

  const renderField = (field, value, path = []) => {
    if (field.type === "list") {
      const listItems = Array.isArray(value) ? value : [];

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#4A3F35]">
              {field.label}
            </label>
            <button
              type="button"
              onClick={() => addListItem(path, field)}
              className="rounded-full bg-[#E87461] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D66350]"
            >
              Add {field.itemLabel || "Item"}
            </button>
          </div>

          <div className="space-y-4">
            {listItems.map((item, index) => (
              <div
                key={`${field.name}-${index}`}
                className="rounded-2xl border border-[#E7DED3] bg-[#FFFCF8] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#4A3F35]">
                    {field.itemLabel || "Item"} {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeListItem(path, index)}
                    className="rounded-full bg-[#4A3F35] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#3b3129]"
                  >
                    Remove
                  </button>
                </div>

                {field.primitive ? (
                  <input
                    type="text"
                    value={item || ""}
                    onChange={(event) =>
                      updateFieldValue([...path, index], event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {field.itemFields.map((subField) => (
                      <div
                        key={`${field.name}-${index}-${subField.name}`}
                        className={
                          subField.type === "textarea" ? "md:col-span-2" : ""
                        }
                      >
                        {renderField(subField, item?.[subField.name], [
                          ...path,
                          index,
                          subField.name,
                        ])}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[#4A3F35]">
            {field.label}
          </span>
          <textarea
            value={value || ""}
            onChange={(event) => updateFieldValue(path, event.target.value)}
            className="min-h-32 w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
          />
        </label>
      );
    }

    if (field.type === "image") {
      return (
        <div className="space-y-3">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#4A3F35]">
              {field.label}
            </span>
            <input
              type="text"
              value={value || ""}
              onChange={(event) => updateFieldValue(path, event.target.value)}
              placeholder="Paste image URL or use upload below"
              className="w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
            />
          </label>

          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#E87461] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D66350]">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                handleImageSelect(path, event.target.files?.[0] || null)
              }
            />
          </label>

          {value ? (
            <div className="overflow-hidden rounded-2xl border border-[#E7DED3] bg-[#FFFCF8] p-3">
              <img
                src={value}
                alt={field.label}
                className="max-h-48 w-full rounded-xl object-cover"
              />
            </div>
          ) : null}
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="flex items-center gap-3 rounded-2xl border border-[#E7DED3] bg-[#FFFCF8] px-4 py-3">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => updateFieldValue(path, event.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm font-semibold text-[#4A3F35]">
            {field.label}
          </span>
        </label>
      );
    }

    return (
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[#4A3F35]">
          {field.label}
        </span>
        <input
          type={field.type || "text"}
          value={value ?? ""}
          onChange={(event) =>
            updateFieldValue(
              path,
              field.type === "number"
                ? event.target.value === ""
                  ? ""
                  : Number(event.target.value)
                : event.target.value,
            )
          }
          className="w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
        />
      </label>
    );
  };

  const handleContentSave = async () => {
    setContentSaving(true);

    try {
      const sanitizedContent = sanitizeForRtdb(formData);
      const payloadBytes = new Blob([JSON.stringify(sanitizedContent)]).size;

      if (payloadBytes > MAX_RTDB_CONTENT_BYTES) {
        throw new Error(
          "Content is too large for Firebase. Please use smaller images or fewer items.",
        );
      }

      await set(ref(rtdb, `site_content/${activeSection}`), {
        content: sanitizedContent,
        updatedBy: user.email,
        updatedAt: Date.now(),
      });
      toast.success("Content saved successfully.");
    } catch (error) {
      toast.error(error.message || "Save failed.");
    } finally {
      setContentSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF8F3]">
      <ToastContainer />
      <header className="bg-[#4A3F35] shadow-sm h-16 sticky top-0 z-50 flex items-center px-4 md:px-6" />
      <div className="px-4 py-10 sm:py-12">
        <div className="container max-w-5xl">
          <div className="mb-8 rounded-xl bg-brand py-2">
            <h1 className="text-center text-2xl font-bold text-white">
              Admin Panel
            </h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-[2rem] bg-[#E87461] p-6 text-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden">
              <div className="border-b border-white/20 pb-4">
                <h2 className="text-lg font-bold">Content Navigation</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                  Custom CMS Dashboard
                </p>
              </div>
              <nav className="mt-6 pb-6 space-y-2 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto lg:pr-1">
                {CONTENT_SECTIONS.map((section) => (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      activeSection === section.key
                        ? "bg-white text-[#E87461] font-bold"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="rounded-[2rem] bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="inline-flex rounded-full bg-[#FCE6DE] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#A54F3C]">
                        Website Content
                      </p>
                      <h2 className="mt-4 text-3xl font-bold text-[#4A3F35]">
                        {activeContentSection?.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-[#6E625A]">
                        {activeContentSection?.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleContentSave}
                        disabled={contentSaving || contentLoading}
                        className="rounded-full bg-[#E87461] px-6 py-3 font-medium text-white transition hover:bg-[#D66350] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {contentSaving ? "Saving..." : "Save Content"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-[#E7DED3] bg-[#FFFCF8] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A54F3C]">
                      Content Editor
                    </p>
                    <p className="mt-2 text-sm text-[#6E625A]">
                      Edit the fields below and save. The website will
                      automatically read the latest Firestore content.
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-[#E7DED3] bg-[#FFFDFC] p-5">
                    {contentLoading ? (
                      <p className="text-[#6E625A]">Loading content...</p>
                    ) : (
                      <div className="grid gap-5">
                        {activeContentSection?.fields.map((field) => (
                          <div
                            key={`${activeSection}-${field.name}`}
                            className={
                              field.type === "textarea" || field.type === "list"
                                ? ""
                                : ""
                            }
                          >
                            {renderField(field, formData?.[field.name], [
                              field.name,
                            ])}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Motion.div>
              </AnimatePresence>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#4A3F35]">
                    Super admin control
                  </h2>
                  <p className="mt-4 max-w-2xl text-[#6E625A]">
                    Only approved Firebase users can access this dashboard. Add
                    more super admins by email below.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <label className="block text-sm font-semibold text-[#4A3F35]">
                      Add super admin by email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter email address"
                      className="w-full rounded-2xl border border-[#E7DED3] px-4 py-3 outline-none transition focus:border-[#E87461]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-full bg-[#E87461] px-6 py-3 font-medium text-white transition hover:bg-[#D66350] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSaving ? "Saving..." : "Add Super Admin"}
                    </button>
                  </form>
                </div>

                <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#4A3F35]">
                    Current super admins
                  </h2>
                  <div className="mt-6 space-y-3">
                    {admins.map((adminEmail) => (
                      <div
                        key={adminEmail}
                        className="flex flex-col gap-3 rounded-2xl border border-[#E7DED3] bg-[#FFFCF8] px-4 py-4 text-[#4A3F35] sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium">{adminEmail}</p>
                          {adminEmail === DEFAULT_SUPER_ADMIN ? (
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#A54F3C]">
                              Default super admin
                            </p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(adminEmail)}
                          disabled={
                            adminEmail === DEFAULT_SUPER_ADMIN ||
                            removingEmail === adminEmail
                          }
                          className="rounded-full bg-[#4A3F35] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3b3129] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingEmail === adminEmail
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#4A3F35]">
                  Public Comments Moderation
                </h2>
                <p className="mt-3 text-[#6E625A]">
                  Remove inappropriate comments posted by users.
                </p>

                <div className="mt-6 space-y-3">
                  {commentsLoading ? (
                    <p className="text-[#6E625A]">Loading comments...</p>
                  ) : publicComments.length ? (
                    publicComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-2xl border border-[#E7DED3] bg-[#FFFCF8] p-4"
                      >
                        <p className="font-semibold text-[#4A3F35]">
                          {comment.name}
                        </p>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#A54F3C]">
                          {comment.role}
                        </p>
                        <p className="mt-3 text-sm text-[#6E625A]">
                          {comment.text}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDeletePublicComment(comment.id)}
                          disabled={removingCommentId === comment.id}
                          className="mt-4 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingCommentId === comment.id
                            ? "Deleting..."
                            : "Delete Comment"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#6E625A]">No public comments found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPortal;
