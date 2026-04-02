// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useState, lazy, Suspense, useEffect } from "react";
// import "./App.css";

// // Components
// import Preloader from "./Components/UI/Loader";
// import PageLoader from "./Components/UI/Skeleton/PageLoader";
// import Layout from "./Components/Layout"; // Contains the <Outlet />
// import Protected from "./Components/Auth/Protected";
// import Legal from "./Pages/Legal";

// // Lazy Loaded Pages
// const Home = lazy(() => import("./Pages/Home"));
// const Login = lazy(() => import("./Pages/Login"));
// const Signup = lazy(() => import("./Pages/Signup"));
// const Aboutus = lazy(() => import("./Pages/Aboutus"));
// const NewsLetters = lazy(() => import("./Pages/NewsLetters"));
// const Profile = lazy(() => import("./Pages/Profile"));
// const EditProfile = lazy(() => import("./Pages/EditProfile"));
// const CampaignHeader = lazy(() => import("./Pages/CampaignHeader"));
// const PastCampaigns = lazy(() => import("./Pages/PastCampaigns"));
// const DonationForm = lazy(() => import("./Pages/DonationForm"));
// const Terms = lazy(() => import("./Pages/Terms"));
// const AdminPortal = lazy(() => import("./Pages/AdminPortal"));
// const SponsorChild = lazy(() => import("./Pages/SponsorChild"));

// import { onAuthStateChanged } from "firebase/auth";
// import useAuthStore from "./Zustand/authStore";
// import { auth } from "./Database/firebase.config";
// import Privacy from "./Pages/Privacy";
// import ContactUs from "./Pages/contactUs";

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const setUser = useAuthStore((state) => state.setUser);

//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user || null);
//     });
//     return () => unSubscribe();
//   }, [setUser]);

//   return (
//     <>
//       {isLoading ? (
//         <Preloader onComplete={() => setIsLoading(false)} />
//       ) : (
//         <BrowserRouter>
//           <Suspense fallback={<PageLoader />}>
//             <Routes>
//               {/* Layout wraps all public pages */}
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<Home />} />
//                 <Route path="about" element={<Aboutus />} />
//                 <Route path="newsletters" element={<NewsLetters />} />
//                 <Route path="login" element={<Login />} />
//                 <Route path="signup" element={<Signup />} />
//                 <Route path="all-campaigns" element={<CampaignHeader />} />
//                 <Route path="past-campaigns" element={<PastCampaigns />} />
//                 <Route path="donation" element={<DonationForm />} />
//                 <Route path="sponsor-child" element={<SponsorChild />} />
//                 <Route path="privacy" element={<Privacy />} />
//                 <Route path="legal" element={<Legal />} />
// <<<<<<< Updated upstream
//                 <Route path="contact" element={<ContactUs />} />
// =======
//                 <Route path="terms" element={<Terms />} />
// >>>>>>> Stashed changes
//               </Route>

//               {/* Protected Routes */}
//               <Route element={<Protected />}>
//                 <Route path="editprofile" element={<EditProfile />} />
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="admin-panel" element={<AdminPortal />} />
//               </Route>
//             </Routes>
//           </Suspense>
//         </BrowserRouter>
//       )}
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";

// Components
import Preloader from "./Components/UI/Loader";
import PageLoader from "./Components/UI/Skeleton/PageLoader";
import Layout from "./Components/Layout"; // Contains the <Outlet />
import Protected from "./Components/Auth/Protected";
import Legal from "./Pages/Legal";

// Lazy Loaded Pages
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));
const NewsLetters = lazy(() => import("./Pages/NewsLetters"));
const Profile = lazy(() => import("./Pages/Profile"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const CampaignHeader = lazy(() => import("./Pages/CampaignHeader"));
const PastCampaigns = lazy(() => import("./Pages/PastCampaigns"));
const DonationForm = lazy(() => import("./Pages/DonationForm"));
const Terms = lazy(() => import("./Pages/Terms"));
const AdminPortal = lazy(() => import("./Pages/AdminPortal"));
const SponsorChild = lazy(() => import("./Pages/SponsorChild"));
const Gallery = lazy(() => import("./Pages/Gallery"));

import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "./Zustand/authStore";
import { auth } from "./Database/firebase.config";
import Privacy from "./Pages/Privacy";
import ContactUs from "./Pages/ContactUs";

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
                <Route path="newsletters" element={<NewsLetters />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="all-campaigns" element={<CampaignHeader />} />
                <Route path="past-campaigns" element={<PastCampaigns />} />
                <Route path="donation" element={<DonationForm />} />
                <Route path="sponsor-child" element={<SponsorChild />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="legal" element={<Legal />} />

                {/* Fixed: Both routes are now included */}
                <Route path="terms" element={<Terms />} />
                <Route path="contact" element={<ContactUs />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<Protected />}>
                <Route path="editprofile" element={<EditProfile />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin-panel" element={<AdminPortal />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
