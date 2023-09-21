"use client";
import React, { useEffect, useState } from "react";
import AlumniContents from "./components/AlumniContents";
import { Sheet, Box } from "@/app/lib/mui";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/app/(user)/components/preloader";

export default function AlumniPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })();
  }, []);
  return (
    <Sheet>
      {/* <Cover /> */}
      {/* <Divider sx={{ my: 5 }} /> */}
      <AnimatePresence>
        {isLoading && (
          <Preloader words={["Welcome", "to", "our", "Alumnies"]} />
        )}
      </AnimatePresence>
      <Box sx={{ pt: 15, pb: 15 }}>
        <AlumniContents />
      </Box>
    </Sheet>
  );
}
