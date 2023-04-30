import { deleteEvent, updateInEventPage } from "@/actions/event";
import PanelCard from "@/components/cards/panelCard";
import { useAdmin } from "@/contexts/adminContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EventCard({ event }) {
  const [stateBtnState, setStateBtnState] = useState(
    event.inEventsPage ? "success" : "initial"
  );
  const router = useRouter();
  const { dispatch } = useAdmin();
  function handleEdit() {
    router.push("/admin/editEvent?id=" + eventId);
  }
  function handleDelete() {
    deleteEvent(event._id, toast, dispatch);
  }
  function handleStatebtn() {
    updateInEventPage(
      event._id,
      stateBtnState === "success" ? false : true,
      setStateBtnState
    );
  }
  function getStateBtnLabel() {
    if (stateBtnState === "initial") {
      return "Add To The Event Page";
    }
    if (stateBtnState === "loading") {
      return "Adding !";
    }
    if (stateBtnState === "error") {
      return "Failed";
    }
    if (stateBtnState === "success") {
      return "Added To Event Page";
    }
  }

  return (
    <>
      <PanelCard
        title={event.title}
        imgUrl={event.image}
        extra={new Date(event.createdAt).toDateString()}
        stateBtnLabel={getStateBtnLabel(stateBtnState)}
        stateBtnState={stateBtnState}
        handleStateBtn={handleStatebtn}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ToastContainer></ToastContainer>
    </>
  );
}
