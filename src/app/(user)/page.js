"use client";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Preloader from "./components/preloader";
import Landing from "./components/landing";
import Description from "./components/description";
import SlidingImages from "./components/slidingImages";
import Executives from "./components/executive";
import Companies from "./components/company";
import Events from "./components/events";
import { Metadata } from 'next'
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main style={{ overflowX: "hidden" }}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />

      <Description />
      <SlidingImages />

      <Events />

      <Executives />
      <Companies />
    </main>
  );
}
export const metadata = {
  title: "CSE CLUB, PSTU - Welcome to the cse club hompage",
  description:
    "CSE CLUB, PSTU is the largest computer science club in the Barisal Division. Its works to provide support and resources to the computer science student of pstu",
};
