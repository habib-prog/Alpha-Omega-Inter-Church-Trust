import React from "react";
import Hero from "./Hero";
import About from "./About";
import Ourimpacts from "./Ourimpacts";


const Home = () => {
  return (
    <section id="home">
      <Hero />
      <About />
      <Ourimpacts/>
    </section>
  );
};

export default Home;
