"use client";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@mui/joy";
import { useMediaQuery } from "react-responsive";

export default function index({
  index,
  title,
  date,
  manageModal,
  id,
  participants,
}) {
  let router = useRouter();
  const isTouch = useMediaQuery({
    query: " (hover: none)",
  });

  return (
    <div
      onMouseEnter={
        !isTouch
          ? (e) => {
              manageModal(true, index, e.clientX, e.clientY);
            }
          : () => {}
      }
      onMouseLeave={
        !isTouch
          ? (e) => {
              manageModal(false, index, e.clientX, e.clientY);
            }
          : () => {}
      }
      className={styles.event}
      onClick={() => {
        router.push(`/events/${id}`);
      }}
    >
      <h2>{title}</h2>
      {participants && <p>Participants : {participants}</p>}
      <p>Date : {date}</p>
      {isTouch && (
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderRadius: 20,
            fontWeight: 400,
          }}
          onClick={() => {
            router.push(`/events/${id}`);
          }}
        >
          View
        </Button>
      )}
    </div>
  );
}
