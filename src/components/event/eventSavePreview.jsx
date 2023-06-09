import React from "react";
import EventPreview from "./eventPreview";
import EventSave from "./eventSave";
import { events } from "@/data/eventsData";

// styles @_addEvent.scss
export default function EventSaveAndPreview({ event, formEvent, parentId }) {
  return (
    <div className="event-save-and-preview">
      <EventPreview event={event} />
      <EventSave event={formEvent} parentId={parentId} />
    </div>
  );
}
