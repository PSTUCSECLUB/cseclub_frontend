"use client";
import { Alert, Avatar, AvatarGroup, Box, Typography } from "@mui/joy";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { getEvent } from "@/app/admin/actions/eventActions";
import "./style.css";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/app/(user)/components/preloader";
import EventDetails from "../components/events/eventDetails/EventDetails";
import { motion } from "framer-motion";
import { slideUp } from "../components/events/animation";
export default function EventDetailsPage() {
  let [event, setEvent] = useState({});
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);
  let { id } = useParams();
  console.log(event?.description);
  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const { event } = await getEvent(id);
        setEvent(event);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

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
    <Box component="main" sx={{ minHeight: "80vh" }}>
      {error && <Alert color="danger">Something bad happend</Alert>}

      <AnimatePresence>
        {isLoading && (
          <Preloader words={["Please wait", "We are ", "almost ready"]} />
        )}
      </AnimatePresence>
      <motion.div variants={slideUp} initial="initial" animate="enter">
        <EventDetails event={event} />
      </motion.div>
    </Box>
  );
}
