import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";
import { Outlet } from "react-router";

const index = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default index;
