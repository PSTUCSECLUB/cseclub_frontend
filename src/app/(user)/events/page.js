"use client";

import Preloader from "@/app/(user)/components/preloader";
import React, { useEffect, useState } from "react";
import EventContents from "./components/events";
import { AnimatePresence, motion } from "framer-motion";
export default function EventPage() {
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
    <main>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            words={["Please wait", "it will", "take", "few seconds"]}
          />
        )}
      </AnimatePresence>
      <EventContents />
    </main>
  );
}
