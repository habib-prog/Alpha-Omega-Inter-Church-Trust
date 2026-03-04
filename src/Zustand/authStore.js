import { create } from "zustand";
import { auth, db } from "../Database/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useAuthStore = create((set) => ({
  // --- Initial State ---
  user: null, // Stores the authenticated user object
  isLoading: false, // Tracks the loading state during async operations
  error: null, // Stores error messages to display in the UI

  /**
   * Signup function to create a new user, update their profile,
   * and save extra data to Firestore.
   */
  signup: async (email, password, displayName) => {
    // Start loading and clear previous errors
    set({ isLoading: true, error: null });

    try {
      // 1. Create user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      //   Email Verify
      await sendEmailVerification(user);
      // 2. Update the user's profile with the provided Display Name
      await updateProfile(user, { displayName });

      // 3. Save additional user details in Firestore 'users' collection
      // We use user.uid as the Document ID for easy reference
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: displayName,
        email: email,
        createdAt: new Date().toISOString(),
      });

      // Update global state with the new user and stop loading
      set({ user: { ...user, displayName }, isLoading: false });
      return { success: true };
    } catch (err) {
      // Handle Firebase-specific error codes for a better user experience
      let errorMessage = "Something went wrong!";

      if (err.code === "auth/email-already-in-use")
        errorMessage = "Email already exists!";
      if (err.code === "auth/weak-password")
        errorMessage = "Password is too weak!";

      // Update state with the error message and stop loading
      set({ error: errorMessage, isLoading: false });
      return { success: false };
    }
  },

  /**
   * Helper function to manually set the user state
   * (Used for session persistence on page refresh)
   */
  setUser: (user) => set({ user, isLoading: false }),
}));

export default useAuthStore;
