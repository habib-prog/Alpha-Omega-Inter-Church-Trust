import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Aboutus from "./Pages/Aboutus";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import CampaignHeader from "./Components/UI/Charts/CampaignHeader";

// Component
import Preloader from "./Components/UI/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        /* Preloader will hide itself after reaching 100% and calling onComplete */
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/all-campaigns" element={<CampaignHeader />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
