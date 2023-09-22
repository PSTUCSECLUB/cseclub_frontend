"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Event from "./event";
import { color, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "@/app/(user)/components/roundedButton";
import { Alert, Box, CircularProgress } from "@mui/joy";
import { getEvents } from "@/app/admin/actions/eventActions";
import { slideUp } from "./animation";
function getRandomColor() {
  let colors = ["#000000", , "#8C8C8C", , "#EFE8D3", , "#706D63"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Home() {
  let [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  console.log(total);
  useEffect(() => {
    (async () => {
      try {
        const { events, totalEventsCount } = await getEvents(
          `?page=${page}&limit=${limit}`
        );
        setEvents(events);
        setTotal(totalEventsCount);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
        console.log(err.message);
      }
    })();
  }, [page]);

  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  // container
  // const container = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ["start end", "end end"],
  // });
  // const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <motion.main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.events}
      variants={slideUp}
      initial="initial"
      animate="enter"
    >
      <h1
        style={{
          textAlign: "center",
          width: "100%",
          marginBottom: 0,
        }}
      >
        Our Events
      </h1>
      <p
        style={{
          textAlign: "center",
          width: "100%",
          marginBottom: 80,
        }}
      >
        As a club we held thousands of events, where none them actually works
      </p>
      <div className={styles.body}>
        {events.map((event, index) => {
          return (
            <Event
              index={index}
              title={event.title}
              date={event.startDate}
              manageModal={manageModal}
              key={index}
              id={event._id}
              participants={event.participants}
            />
          );
        })}
        {events.length === 0 && !loading && (
          <p
            style={{
              fontSize: 28,
              textAlign: "left",
              width: "100%",
              marginBottom: 80,
            }}
          >
            There is no events
          </p>
        )}
        {loading && <CircularProgress />}
        {error && <Alert color="danger">Something bad happen</Alert>}
      </div>
      <Box sx={{ display: "flex", gap: 2 }}>
        {page > 1 && (
          <Rounded
            onClick={() => {
              setPage((page) => page - 1);
            }}
          >
            <p>Prev</p>
          </Rounded>
        )}
        {page < Math.ceil(total / limit) && (
          <Rounded
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            <p>Next</p>
          </Rounded>
        )}
      </Box>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {events.map((event, index) => {
              const { image } = event;
              const color = getRandomColor();
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <img src={image} width={300} height={0} alt="image" />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
      <motion.div className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </motion.main>
  );
}
