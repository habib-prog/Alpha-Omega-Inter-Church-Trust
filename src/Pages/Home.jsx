import React from "react";
import Hero from "./Hero";
import About from "./About";
import Ourimpact from "./Ourimpacts";


const Home = () => {
  return (
    <section id="home">
      <Hero />
      <About />
      <Ourimpact/>
    </section>
  );
};

export default Home;
