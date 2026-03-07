import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";

// Components
import Preloader from "./Components/UI/Loader";
import PageLoader from "./Components/UI/Skeleton/PageLoader";
import Layout from "./Components/Layout"; // Contains the <Outlet />
import Protected from "./Components/Auth/Protected";

// Lazy Loaded Pages
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));
const Profile = lazy(() => import("./Pages/Profile"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const CampaignHeader = lazy(() => import("./Pages/CampaignHeader"));
const DonationForm = lazy(() => import("./Pages/DonationForm"));

import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "./Zustand/authStore";
import { auth } from "./Database/firebase.config";
import Privacy from "./Pages/Privacy";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unSubscribe();
  }, [setUser]);

  return (
    <>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Layout wraps all public pages */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<Aboutus />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="all-campaigns" element={<CampaignHeader />} />
                <Route path="donation" element={<DonationForm />} />
                <Route path="privacy" element={<Privacy />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<Protected />}>
                <Route path="editprofile" element={<EditProfile />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
