import React from "react";
import Autosuggestion from "../autosuggestion";

export default function EventDetailsForm({
  title,
  onTitle,
  shortDescription,
  onShortDescription,
  parentValue,
  onParentChange,
  suggestedOptions,
  onOptionclick,
}) {
  return (
    <div className="event-details-form">
      <div className="form__controls">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={onTitle}
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
          value={shortDescription}
          onChange={onShortDescription}
          placeholder="Short descriptions should be short"
          className="form__textarea"
        ></textarea>
      </div>
      <div className="form__controls">
        <label htmlFor="shortDescription">Select Parent Event</label>
        <Autosuggestion
          value={parentValue}
          handleInputChange={onParentChange}
          handleOptionClick={onOptionclick}
          suggestedOptions={suggestedOptions}
        />
      </div>
    </div>
  );
}
