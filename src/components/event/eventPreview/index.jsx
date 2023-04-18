import React, { useState } from "react";
import EventPreviewPage from "./eventPreviewPage";
import PreviewIcon from "@mui/icons-material/Preview";
import CloseIcon from "@mui/icons-material/Close";

export default function EventPreview({ event }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="event-preview">
      {showPreview && (
        <>
          <div className="event-preview__overlay"></div>
          <div className="event-preview__preview__wrapper">
            <EventPreviewPage event={event} />
          </div>
          <button
            onClick={() => {
              setShowPreview(false);
            }}
            className="event-preview__cancel-btn"
          >
            <CloseIcon htmlColor="#fff" fontSize="large" />
          </button>
        </>
      )}
      {!showPreview && (
        <button
          onClick={() => {
            setShowPreview(true);
          }}
          className="event-preview__button"
        >
          <PreviewIcon fontSize="medium" />
          See Preview
        </button>
      )}
    </div>
  );
}
