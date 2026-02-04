import React from "react";
<<<<<<< HEAD
import Hero from "./Hero";
const Home = () => {
  return (
    <div className="">
      <Hero />
    </div>
=======
import Hero from "../Components/Home/Hero";
import About from "../Components/Home/About";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
    </>
>>>>>>> dece56b (hero section and about section)
  );
};

export default Home;
