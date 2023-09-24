"use client";
import { Box, Button, Input, Sheet, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useFeather from "@/app/hooks/useFeather";
import { deleteEvent, getEvents } from "../actions/eventActions";
import EventCard from "../components/EventCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsAdmin } from "@/app/hooks/isAdmin";

let toastSuccessConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
let toastFailureConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function Events() {
  useIsAdmin();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let [page, setPage] = useState(1);
  let [size, setSize] = useState(10);
  useFeather();
  function paginate(items) {
    return items.slice(0, page * size);
  }

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const data = await getEvents();
        setEvents(data.events);
        setFilteredEvents(data.events);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, []);

  useEffect(() => {
    // adding debouncing
    let timeOutId;
    timeOutId = setTimeout(() => {
      clearTimeout(timeOutId);
      events.length && updateOnSearch();
    }, 100);
  }, [searchQuery]);

  function handleSearchInput(e) {
    setSearchQuery(e.target.value);
  }
  function updateOnSearch() {
    let filtered = events?.filter((e) =>
      e.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    if (filtered) setFilteredEvents(filtered);
  }
  async function removeEvent(id) {
    let prevEvents = events;
    let { title } = events.filter((e) => e._id === id)[0];
    let postEvents = events.filter((e) => e._id !== id);
    let preFiltered = filteredEvents;
    let postFiltered = filteredEvents.filter((e) => e._id !== id);
    setEvents(postEvents);
    // update filter
    setFilteredEvents(postFiltered);

    try {
      // await async "fetchBooks()" function
      const data = await deleteEvent(id);
      if (data?.success) {
        // removing the preserving state
        prevEvents.length = 0;
        preFiltered.length = 0;
        toast.success(title + " is deleted successfully !", toastSuccessConfig);
      }
    } catch (err) {
      setEvents(prevEvents);
      setFilteredEvents(preFiltered);
      toast.error("Failed : " + err.message, toastFailureConfig);
    }
  }

  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
      }}
    >
      {/* <Typography
        level="h1"
        fontSize="xl2"
        sx={{
          bgcolor: "background.body",
          mb: 1,
        }}
      >
        Alumnies
      </Typography> */}
      <Box sx={{ pt: 3, pb: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
            pb: 3,
          }}
        >
          <Input
            startDecorator={<i data-feather="search" />}
            sx={{ width: 280 }}
            variant="outlined"
            type="text"
            placeholder="Search Alumni"
            onChange={handleSearchInput}
          />
          <Button size="md">
            <Link
              href={"/admin/newEvent"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add Event
            </Link>
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {paginate(filteredEvents).map((e) => {
            return (
              <EventCard
                handleDelete={removeEvent}
                event={e}
                key={e._id}
              ></EventCard>
            );
          })}
          {events.length === 0 && <Typography>Nothing to show!</Typography>}
          {error && <Typography>Something bad happend!</Typography>}
          {filteredEvents.length > page * size && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                onClick={() => {
                  setPage((page) => page + 1);
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Sheet>
  );
}
