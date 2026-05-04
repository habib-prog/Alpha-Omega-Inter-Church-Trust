import { create } from "zustand";
import { auth, googleProvider, rtdb } from "../Database/firebase.config";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  child,
  get,
  push,
  ref,
  remove,
  set as setDb,
  update,
} from "firebase/database";

const DEFAULT_SUPER_ADMINS = ["jcollins@globalgates.info"];
const SEEDED_SUPER_ADMIN_EMAILS = ["xavierjames701@gmail.com"];

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const isDefaultSuperAdmin = (email = "") =>
  DEFAULT_SUPER_ADMINS.includes(normalizeEmail(email));

const isSeededSuperAdmin = (email = "") =>
  SEEDED_SUPER_ADMIN_EMAILS.includes(normalizeEmail(email));

const getSuperAdminDocId = (email = "") => normalizeEmail(email).replaceAll(".", ",");

const getRemovedAdminDocId = getSuperAdminDocId;

const LOG_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

const detectBrowser = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/") || ua.includes("edgios/")) return "Edge";
  if (ua.includes("samsungbrowser/")) return "Samsung Internet";
  if (ua.includes("opr/") || ua.includes("opera/")) return "Opera";
  if (ua.includes("chrome/") || ua.includes("crios/")) return "Chrome";
  if (ua.includes("firefox/") || ua.includes("fxios/")) return "Firefox";
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari";
  return "Unknown";
};

const detectDevice = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  if (/android|iphone|ipad|ipod|mobile/i.test(ua)) {
    return "Mobile";
  }

  if (ua.includes("tablet")) {
    return "Tablet";
  }

  return "Desktop";
};

const detectOs = (userAgent = "", platform = "") => {
  const ua = userAgent.toLowerCase();
  const pf = platform.toLowerCase();

  if (ua.includes("windows") || pf.includes("win")) return "Windows";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
    return "iOS";
  if (ua.includes("mac os") || ua.includes("macintosh") || pf.includes("mac"))
    return "macOS";
  if (ua.includes("linux") || pf.includes("linux")) return "Linux";
  return "Unknown";
};

const detectDeviceName = (userAgent = "", deviceType = "Unknown") => {
  const ua = userAgent.toLowerCase();

  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("ipod")) return "iPod";
  if (ua.includes("macintosh") || ua.includes("mac os")) return "Mac";
  if (ua.includes("windows")) return "Windows PC";
  if (ua.includes("android")) {
    const modelMatch = userAgent.match(/Android[^;]*;\s*([^;)]+)/i);
    if (modelMatch?.[1]) {
      return modelMatch[1].trim();
    }
    return "Android Phone";
  }

  if (deviceType === "Desktop") return "Desktop";
  if (deviceType === "Mobile") return "Mobile Phone";
  if (deviceType === "Tablet") return "Tablet";
  return "Unknown";
};

const mapFirebaseAuthError = (code = "") => {
  switch (code) {
    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in Firebase Authentication.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized. Add it in Firebase Authentication > Settings > Authorized domains.";
    case "auth/popup-blocked":
      return "Popup was blocked by browser. Please allow popups and try again.";
    case "auth/popup-closed-by-user":
      return "Google login popup was closed before completing sign-in.";
    case "auth/cancelled-popup-request":
      return "Another popup request is in progress. Please try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    default:
      return "Google sign-in failed. Please check Firebase settings and try again.";
  }
};

const isRtdbPermissionDenied = (error) => {
  const code = String(error?.code || "").toLowerCase();
  const message = String(error?.message || "").toLowerCase();

  return (
    code.includes("permission_denied") ||
    code.includes("permission-denied") ||
    message.includes("permission_denied") ||
    message.includes("permission denied")
  );
};

const getSnapshotValue = (snapshot) => {
  if (snapshot && typeof snapshot.val === "function") {
    return snapshot.val();
  }
  return snapshot ?? null;
};

const hasSnapshotData = (snapshot) => {
  if (snapshot && typeof snapshot.exists === "function") {
    return snapshot.exists();
  }
  const value = getSnapshotValue(snapshot);
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return Boolean(value);
};

const normalizeCreatedAt = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value < 1e12 ? value * 1000 : value;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && numericValue > 0) {
      return numericValue < 1e12 ? numericValue * 1000 : numericValue;
    }

    const dateValue = new Date(value).getTime();
    return Number.isFinite(dateValue) ? dateValue : 0;
  }

  return 0;
};

const getClientIp = async () => {
  const endpoints = [
    "https://api.ipify.org?format=json",
    "https://api64.ipify.org?format=json",
    "https://ifconfig.me/all.json",
  ];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const response = await fetch(endpoint, {
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const ip = data?.ip_addr || data?.ip || "";
      if (ip) {
        return ip;
      }
    } catch (error) {
      // Try next endpoint.
    }
  }

  return "Unavailable";
};

const getGeoFromIp = async (ip = "") => {
  if (!ip || ip === "Unavailable") {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
      timezone: "Unknown",
    };
  }

  const endpoints = [
    `https://ipwho.is/${ip}`,
    `https://ipapi.co/${ip}/json/`,
  ];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timer);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (endpoint.includes("ipwho.is")) {
        if (data?.success === false) {
          continue;
        }

        return {
          country: data?.country || "Unknown",
          region: data?.region || "Unknown",
          city: data?.city || "Unknown",
          latitude:
            typeof data?.latitude === "number" ? data.latitude : null,
          longitude:
            typeof data?.longitude === "number" ? data.longitude : null,
          timezone: data?.timezone?.id || "Unknown",
        };
      }

      return {
        country: data?.country_name || data?.country || "Unknown",
        region: data?.region || "Unknown",
        city: data?.city || "Unknown",
        latitude:
          typeof data?.latitude === "number" ? data.latitude : null,
        longitude:
          typeof data?.longitude === "number" ? data.longitude : null,
        timezone: data?.timezone || "Unknown",
      };
    } catch (error) {
      // Try next geo endpoint.
    }
  }

  return {
    country: "Unknown",
    region: "Unknown",
    city: "Unknown",
    latitude: null,
    longitude: null,
    timezone: "Unknown",
  };
};

const getNavigatorMeta = () => {
  if (typeof navigator === "undefined") {
    return {
      userAgent: "",
      browser: "Unknown",
      device: "Unknown",
    };
  }

  const uaFromData =
    Array.isArray(navigator.userAgentData?.brands) &&
    navigator.userAgentData.brands.length
      ? navigator.userAgentData.brands.map((item) => item.brand).join(" ")
      : "";
  const userAgent = navigator.userAgent || uaFromData || "";
  const platform = String(navigator.platform || "").toLowerCase();

  let device = detectDevice(userAgent);
  if (device === "Desktop" && navigator.userAgentData?.mobile === true) {
    device = "Mobile";
  }
  if (device === "Unknown") {
    device = /iphone|ipad|ipod|android/.test(platform) ? "Mobile" : "Desktop";
  }

  let browser = detectBrowser(userAgent);
  if (browser === "Unknown" && uaFromData) {
    browser = detectBrowser(uaFromData);
  }

  const os = detectOs(userAgent, platform);
  const deviceNameFromUaData = String(navigator.userAgentData?.model || "").trim();
  const deviceName = deviceNameFromUaData || detectDeviceName(userAgent, device);

  return {
    userAgent,
    browser,
    device,
    os,
    deviceName,
  };
};

const getClientMeta = async () => {
  const navigatorMeta = getNavigatorMeta();
  const ip = await getClientIp();
  const geoMeta = await getGeoFromIp(ip);

  return {
    ip,
    browser: navigatorMeta.browser,
    device: navigatorMeta.device,
    os: navigatorMeta.os,
    deviceName: navigatorMeta.deviceName,
    country: geoMeta.country,
    region: geoMeta.region,
    city: geoMeta.city,
    latitude: geoMeta.latitude,
    longitude: geoMeta.longitude,
    timezone: geoMeta.timezone,
    userAgent: navigatorMeta.userAgent,
  };
};

const normalizeLogMeta = (meta = {}) => ({
  ip: meta.ip || "Unavailable",
  browser: meta.browser || "Unknown",
  device: meta.device || "Unknown",
  os: meta.os || "Unknown",
  deviceName: meta.deviceName || "Unknown",
  country: meta.country || "Unknown",
  region: meta.region || "Unknown",
  city: meta.city || "Unknown",
  latitude: typeof meta.latitude === "number" ? meta.latitude : null,
  longitude: typeof meta.longitude === "number" ? meta.longitude : null,
  timezone: meta.timezone || "Unknown",
  userAgent: meta.userAgent || "",
});

const buildLogClientMeta = async () => {
  const rawMeta = await getClientMeta();
  return normalizeLogMeta(rawMeta);
};

const getProviderId = (user) =>
  user?.providerData?.[0]?.providerId || "password";

const buildAuthLogPayload = async ({ user, email, name, event }) => {
  const clientMeta = await buildLogClientMeta();
  return {
    uid: user?.uid || "",
    email: normalizeEmail(email || ""),
    name: name || "",
    provider: getProviderId(user),
    event,
    ...clientMeta,
  };
};

const writeUserAuthLog = async ({ user, email, name, event }) => {
  try {
    const payload = await buildAuthLogPayload({ user, email, name, event });
    await writeLogEntry("user_login_logs", payload);
    await cleanupOldLogs("user_login_logs");
  } catch (error) {
    // Non-blocking
  }
};

const syncGoogleUserProfile = async (user) => {
  const normalizedEmail = normalizeEmail(user.email || "");
  const displayName = user.displayName || normalizedEmail.split("@")[0] || "User";

  const userRef = ref(rtdb, `users/${user.uid}`);
  const userSnap = await get(userRef);
  let warningMessage = "";

  try {
  if (!hasSnapshotData(userSnap)) {
      await setDb(userRef, {
        uid: user.uid,
        name: displayName,
        email: normalizedEmail,
        photoURL: user.photoURL || "",
        provider: "google",
        createdAt: Date.now(),
      });
    } else {
      await update(userRef, {
        name: displayName,
        email: normalizedEmail,
        photoURL: user.photoURL || "",
        provider: "google",
      });
    }
  } catch (profileError) {
    if (isRtdbPermissionDenied(profileError)) {
      warningMessage =
        "Login successful, but profile sync to database is blocked by Realtime Database rules.";
    } else {
      throw profileError;
    }
  }

  return {
    normalizedEmail,
    displayName,
    warningMessage,
  };
};

const completeGoogleLoginSession = async (user) => {
  const { normalizedEmail, displayName, warningMessage } =
    await syncGoogleUserProfile(user);
  const isSuperAdmin = await checkSuperAdminAccess(user.email);

  await writeUserAuthLog({
    user,
    email: normalizedEmail,
    name: displayName,
    event: "login",
  });

  return {
    user,
    isSuperAdmin,
    warningMessage,
  };
};

const checkSuperAdminAccess = async (email = "") => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  if (isDefaultSuperAdmin(normalizedEmail)) {
    await seedManagedAdmins(normalizedEmail);
    return true;
  }

  try {
    const removedAdminRef = ref(
      rtdb,
      `removed_admins/${getRemovedAdminDocId(normalizedEmail)}`,
    );
    const removedAdminSnap = await get(removedAdminRef);
    if (hasSnapshotData(removedAdminSnap)) {
      return false;
    }

    if (isSeededSuperAdmin(normalizedEmail)) {
      await seedManagedAdmins(DEFAULT_SUPER_ADMINS[0]);
      return true;
    }

    const adminRef = ref(
      rtdb,
      `super_admins/${getSuperAdminDocId(normalizedEmail)}`,
    );
    const adminSnap = await get(adminRef);
    return hasSnapshotData(adminSnap);
  } catch (error) {
    return false;
  }
};

const seedManagedAdmins = async (actorEmail = "") => {
  try {
    await Promise.all(
      SEEDED_SUPER_ADMIN_EMAILS.map((email) => {
        const normalizedEmail = normalizeEmail(email);
        const adminRef = ref(
          rtdb,
          `super_admins/${getSuperAdminDocId(normalizedEmail)}`,
        );
        const removedAdminRef = ref(
          rtdb,
          `removed_admins/${getRemovedAdminDocId(normalizedEmail)}`,
        );

        return get(removedAdminRef).then((removedAdminSnap) => {
          if (hasSnapshotData(removedAdminSnap)) {
            return null;
          }

          return setDb(adminRef, {
            email: normalizedEmail,
            addedBy: normalizeEmail(actorEmail),
            createdAt: Date.now(),
          });
        });
      }),
    );
  } catch (error) {
    // Non-blocking: default admin access should still work if seeding is blocked.
  }
};

const getManagedSuperAdmins = async () => {
  const [superAdminSnapshot, removedAdminSnapshot] = await Promise.all([
    get(child(ref(rtdb), "super_admins")),
    get(child(ref(rtdb), "removed_admins")),
  ]);
  const removedAdminSet = new Set(
    hasSnapshotData(removedAdminSnapshot)
      ? Object.values(getSnapshotValue(removedAdminSnapshot) || {})
          .map((item) => normalizeEmail(item?.email || ""))
          .filter(Boolean)
      : [],
  );
  const seededSuperAdmins = SEEDED_SUPER_ADMIN_EMAILS.filter(
    (email) => !removedAdminSet.has(normalizeEmail(email)),
  );
  const dynamicAdmins = hasSnapshotData(superAdminSnapshot)
    ? Object.values(getSnapshotValue(superAdminSnapshot) || {})
        .map((item) => item?.email)
        .filter(Boolean)
        .map((email) => normalizeEmail(email))
        .filter((email) => !removedAdminSet.has(email))
    : [];

  return Array.from(
    new Set([...DEFAULT_SUPER_ADMINS, ...seededSuperAdmins, ...dynamicAdmins]),
  );
};

const writeLogEntry = async (path, payload) => {
  try {
    const entryRef = push(ref(rtdb, path));
    await setDb(entryRef, {
      ...payload,
      createdAt: Date.now(),
    });
  } catch (error) {
    // Non-blocking: logging should not break auth flow.
  }
};

const cleanupOldLogs = async (path) => {
  try {
    const snapshot = await get(ref(rtdb, path));
    if (!hasSnapshotData(snapshot)) {
      return;
    }

    const now = Date.now();
    const raw = getSnapshotValue(snapshot) || {};
    const removalTasks = Object.entries(raw)
      .filter(([, item]) => {
        const createdAt = normalizeCreatedAt(item?.createdAt);
        return createdAt > 0 && now - createdAt > LOG_RETENTION_MS;
      })
      .map(([key]) => remove(ref(rtdb, `${path}/${key}`)));

    if (removalTasks.length) {
      await Promise.all(removalTasks);
    }
  } catch (error) {
    // Non-blocking cleanup.
  }
};

const useAuthStore = create((set, get) => ({
  // --- Initial State ---
  user: null,
  isSuperAdmin: false,
  authLoading: false,
  error: null,

  // --- Signup ---
  signup: async (email, password, displayName) => {
    set({ authLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      await updateProfile(user, { displayName });

      try {
        await setDb(ref(rtdb, `users/${user.uid}`), {
          uid: user.uid,
          name: displayName,
          email: email,
          createdAt: new Date().toISOString(),
        });
      } catch (profileError) {
        // Do not block auth account creation if RTDB rule is strict.
      }

      // Auto signout after sign up
      await signOut(auth);
      set({ user: null, authLoading: false });
      return { success: true };
    } catch (err) {
      let errorMessage = "Something went wrong!";
      if (err.code === "auth/email-already-in-use")
        errorMessage = "Email already exists!";
      if (err.code === "auth/weak-password")
        errorMessage = "Password is too weak!";

      set({ error: errorMessage, authLoading: false });
      return { success: false, message: errorMessage };
    }
  },

  // --- Login ---
  login: async (email, password) => {
    set({ authLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        set({ user: null, isSuperAdmin: false, authLoading: false });
        return {
          success: false,
          message: "Please verify your email first before logging in.",
        };
      }

      const isSuperAdmin = await checkSuperAdminAccess(userCredential.user.email);
      await writeUserAuthLog({
        user: userCredential.user,
        email: userCredential.user.email || "",
        name: userCredential.user.displayName || "",
        event: "login",
      });
      set({
        user: userCredential.user,
        isSuperAdmin,
        authLoading: false,
      });
      return { success: true };
    } catch (err) {
      let errorMessage = "Something went wrong!";
      if (err.code === "auth/invalid-credential")
        errorMessage = "Email or password is incorrect!";
      if (err.code === "auth/user-not-found")
        errorMessage = "No account found with this email!";
      if (err.code === "auth/wrong-password") errorMessage = "Wrong password!";
      if (err.code === "auth/too-many-requests")
        errorMessage = "Too many attempts. Try again later!";

      set({ error: errorMessage, authLoading: false });
      return { success: false, message: errorMessage };
    }
  },

  googleLogin: async () => {
    set({ authLoading: true, error: null });
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const session = await completeGoogleLoginSession(userCredential.user);
      set({
        user: session.user,
        isSuperAdmin: session.isSuperAdmin,
        authLoading: false,
      });
      return { success: true, warning: session.warningMessage };
    } catch (err) {
      set({ authLoading: false });
      return {
        success: false,
        message: mapFirebaseAuthError(err?.code) || err?.message,
      };
    }
  },

  // --- Session Persistence ---
  setUser: async (user) => {
    if (!user) {
      set({ user: null, isSuperAdmin: false, authLoading: false });
      return;
    }

    set({ authLoading: true });
    const isSuperAdmin = await checkSuperAdminAccess(user.email);
    set({ user, isSuperAdmin, authLoading: false });
  },

  addSuperAdmin: async (email, addedBy) => {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return { success: false, message: "Email is required." };
    }

    const docRef = ref(rtdb, `super_admins/${getSuperAdminDocId(normalizedEmail)}`);
    await remove(ref(rtdb, `removed_admins/${getRemovedAdminDocId(normalizedEmail)}`));
    await setDb(docRef, {
      email: normalizedEmail,
      addedBy: normalizeEmail(addedBy),
      createdAt: Date.now(),
    });
    await writeLogEntry("admin_activity_logs", {
      action: "add_super_admin",
      actorEmail: normalizeEmail(addedBy),
      targetEmail: normalizedEmail,
    });
    await cleanupOldLogs("admin_activity_logs");

    return { success: true };
  },

  listSuperAdmins: async () => {
    return getManagedSuperAdmins();
  },

  removeSuperAdmin: async (email) => {
    const normalizedEmail = normalizeEmail(email);

    if (isDefaultSuperAdmin(normalizedEmail)) {
      return {
        success: false,
        message: "Default super admin cannot be removed.",
      };
    }

    const superAdmins = await getManagedSuperAdmins();
    if (superAdmins.length <= 1) {
      return {
        success: false,
        message: "Add another super admin before removing this one.",
      };
    }

    await setDb(ref(rtdb, `removed_admins/${getRemovedAdminDocId(normalizedEmail)}`), {
      email: normalizedEmail,
      removedFrom: "super_admin",
      removedAt: Date.now(),
    });
    await remove(ref(rtdb, `super_admins/${getSuperAdminDocId(normalizedEmail)}`));
    const currentUser = auth.currentUser;
    await writeLogEntry("admin_activity_logs", {
      action: "remove_super_admin",
      actorEmail: normalizeEmail(currentUser?.email || ""),
      targetEmail: normalizedEmail,
    });
    await cleanupOldLogs("admin_activity_logs");
    return { success: true };
  },

  deleteMyAccount: async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return { success: false, message: "No user is signed in." };
    }

    const isCurrentUserSuperAdmin = await checkSuperAdminAccess(currentUser.email);
    if (isCurrentUserSuperAdmin) {
      return {
        success: false,
        message: "Super admin account cannot be deleted from settings.",
      };
    }

    const uid = currentUser.uid;
    const email = normalizeEmail(currentUser.email || "");

    try {
      await writeLogEntry("user_login_logs", {
        uid,
        email,
        name: currentUser.displayName || "",
        provider: currentUser.providerData?.[0]?.providerId || "",
        event: "account_delete_requested",
      });

      await Promise.all([
        remove(ref(rtdb, `users/${uid}`)),
        remove(ref(rtdb, `public_comments/${uid}`)),
        remove(ref(rtdb, `super_admin_messages/${uid}`)),
      ]);

      await deleteUser(currentUser);
      set({ user: null, isSuperAdmin: false, authLoading: false });
      return { success: true };
    } catch (error) {
      if (String(error?.code || "").includes("requires-recent-login")) {
        return {
          success: false,
          message:
            "For security, please login again and then try deleting your account.",
        };
      }

      return {
        success: false,
        message: "Could not delete account. Please try again.",
      };
    }
  },

  logout: async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await writeUserAuthLog({
        user: currentUser,
        email: currentUser.email || "",
        name: currentUser.displayName || "",
        event: "logout",
      });
    }

    // Clear UI state immediately so protected pages redirect right away.
    set({ user: null, isSuperAdmin: false, authLoading: false });

    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Could not log out completely. Please try again.",
      };
    }
  },

  signout: async () => {
    // Alias for logout, kept for simpler usage from UI.
    return get().logout();
  },
}));

export default useAuthStore;
