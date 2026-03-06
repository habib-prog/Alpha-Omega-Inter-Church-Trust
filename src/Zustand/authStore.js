import { create } from "zustand";
import { auth, db } from "../Database/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useAuthStore = create((set) => ({
  // --- Initial State ---
  user: null,
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

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: displayName,
        email: email,
        createdAt: new Date().toISOString(),
      });

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
      set({ user: userCredential.user, authLoading: false });
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

  // --- Session Persistence ---
  setUser: (user) => set({ user, authLoading: false }),
}));

export default useAuthStore;
