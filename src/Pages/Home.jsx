import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Ourimpacts from "./Ourimpacts";

const Home = () => {
  // Scroll Progress Bar logic (Maakher moto smooth hobe)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Premium Lenis Settings
    const lenis = new Lenis({
      duration: 1.4, // Duration barano hoyeche smooth feeling er jonno
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1, // natural
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <section id="home" className="relative">
      {/* Scroll Progress Bar at the top */}
      <Motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E87461] origin-left z-9999"
        style={{ scaleX }}
      />

      <Hero />
      <About />
      <Ourimpacts />
    </section>
  );
};

export default Home;
