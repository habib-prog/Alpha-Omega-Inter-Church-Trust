import { BrowserRouter, Route, Routes } from "react-router";
import { useState, lazy, Suspense, useEffect } from "react"; // Suspense ও lazy
import "./App.css";

import Preloader from "./Components/UI/Loader";
import Layout from "./Components/Layout";

import PageLoader from "./Components/UI/Skeleton/PageLoader";
import Protected from "./Components/Auth/Protected";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));
const Profile = lazy(() => import("./Pages/Profile"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const CampaignHeader = lazy(() => import("./Pages/CampaignHeader"));

import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "./Zustand/authStore";
import { auth } from "./Database/firebase.config";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unSunscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unSunscribe();
  }, [setUser]);

  return (
    <>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<Aboutus />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="all-campaigns" element={<CampaignHeader />} />
              </Route>

              {/* Authorised Protected Route*/}
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
