import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Aboutus from "./Pages/Aboutus";
import CampaignHeader from "./Components/UI/Charts/CampaignHeader";
import DonationForm from "./Pages/DonationForm";

function App() {   
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/about" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-campaigns" element={<CampaignHeader />} />
           <Route path="/donation" element={<DonationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );          
}

export default App;
