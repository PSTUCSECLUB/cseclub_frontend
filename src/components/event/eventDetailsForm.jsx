import React from "react";
import Editor from "../editor";
import Autosuggestion from "../autosuggestion";

export default function EventDetailsForm() {
  return (
    <div className="event-details-form">
      <div className="form__controls">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Write title here"
          className="form__input-text"
        />
      </div>
      <div className="form__controls">
        <label htmlFor="shortDescription">Short Description</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          type="text"
          placeholder="Short descriptions should be short"
          className="form__textarea"
        ></textarea>
      </div>
      <div className="form__controls">
        <label htmlFor="shortDescription">Select Parent Event</label>
        <Autosuggestion />
      </div>
    </div>
  );
}
