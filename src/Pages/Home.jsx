import React, { Suspense, lazy } from "react";
import Hero from "./Hero";
import About from "./About";
import FloatingAdminInbox from "../Components/UI/FloatingAdminInbox";

const Ourimpacts = lazy(() => import("./Ourimpacts"));

const Home = () => {
  return (
    <section id="home" className="relative">
      <Hero />
      <About />
      <Suspense
        fallback={
          <section className="py-16">
            <div className="container">
              <div className="h-36 animate-pulse rounded-3xl bg-[#F5EFE8]" />
            </div>
          </section>
        }
      >
        <Ourimpacts />
      </Suspense>
      <FloatingAdminInbox />
    </section>
  );
};

export default Home;
