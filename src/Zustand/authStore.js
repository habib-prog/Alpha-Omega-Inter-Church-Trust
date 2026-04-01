import { create } from "zustand";
import { auth, googleProvider, rtdb } from "../Database/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  child,
  get,
  ref,
  remove,
  set as setDb,
  update,
} from "firebase/database";

const DEFAULT_SUPER_ADMINS = ["xavierjames701@gmail.com"];

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const isDefaultSuperAdmin = (email = "") =>
  DEFAULT_SUPER_ADMINS.includes(normalizeEmail(email));

const getSuperAdminDocId = (email = "") => normalizeEmail(email).replaceAll(".", ",");

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

const checkSuperAdminAccess = async (email = "") => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  if (isDefaultSuperAdmin(normalizedEmail)) {
    return true;
  }

  try {
    const adminRef = ref(
      rtdb,
      `super_admins/${getSuperAdminDocId(normalizedEmail)}`,
    );
    const adminSnap = await get(adminRef);
    return adminSnap.exists();
  } catch (error) {
    return false;
  }
};

const useAuthStore = create((set) => ({
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
      const user = userCredential.user;
      const normalizedEmail = normalizeEmail(user.email || "");
      const displayName =
        user.displayName || normalizedEmail.split("@")[0] || "User";

      const userRef = ref(rtdb, `users/${user.uid}`);
      const userSnap = await get(userRef);

      let warningMessage = "";

      try {
        if (!userSnap.exists()) {
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

      const isSuperAdmin = await checkSuperAdminAccess(user.email);
      set({ user, isSuperAdmin, authLoading: false });
      return { success: true, warning: warningMessage };
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
    await setDb(docRef, {
      email: normalizedEmail,
      addedBy: normalizeEmail(addedBy),
      createdAt: Date.now(),
    });

    return { success: true };
  },

  listSuperAdmins: async () => {
    const snapshot = await get(child(ref(rtdb), "super_admins"));
    const dynamicAdmins = snapshot.exists()
      ? Object.values(snapshot.val() || {})
          .map((item) => item?.email)
          .filter(Boolean)
          .map((email) => normalizeEmail(email))
      : [];

    return Array.from(new Set([...DEFAULT_SUPER_ADMINS, ...dynamicAdmins]));
  },

  removeSuperAdmin: async (email) => {
    const normalizedEmail = normalizeEmail(email);

    if (isDefaultSuperAdmin(normalizedEmail)) {
      return {
        success: false,
        message: "Default super admin cannot be removed.",
      };
    }

    await remove(ref(rtdb, `super_admins/${getSuperAdminDocId(normalizedEmail)}`));
    return { success: true };
  },

  logout: async () => {
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
    set({ user: null, isSuperAdmin: false, authLoading: false });

    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Could not sign out completely. Please try again.",
      };
    }
  },
}));

export default useAuthStore;
