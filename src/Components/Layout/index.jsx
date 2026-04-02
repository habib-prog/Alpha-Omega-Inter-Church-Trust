import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import SocialSidebar from "../../Pages/SocialSidebar";

const Index = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  // 1. Logic for the top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, // Resistance of the spring
    damping: 30, // How fast it stops bouncing
    restDelta: 0.001,
  });

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname]);

  useEffect(() => {
    // 2. Initialize Lenis for smooth "liquid" scrolling
    const lenis = new Lenis({
      duration: 1.4, // Speed of the scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      smooth: true,
    });
    lenisRef.current = lenis;

    // Recursively call the animation frame for smooth updates
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup Lenis when the component unmounts
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 3. Global Scroll Progress Bar - Visible on every page */}
      <Motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E87461] origin-left z-10000"
        style={{ scaleX }}
      />

      <Navbar />

      {/* The main content area where Home, About, etc. will render */}
      <main>
        <SocialSidebar />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Index;
