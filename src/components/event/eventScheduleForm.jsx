import React, { useState } from "react";
import { Remove } from "@mui/icons-material";
function EventScheduleForm() {
  const [schedules, setSchedules] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");

  function handleInputCh(event) {
    setInputValue(event.target.value);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }
  function handleDetails(e) {
    setDetails(e.target.value);
  }
  function handleAddSchedule() {
    if (title && time) {
      setSchedules([
        ...schedules,
        {
          title,
          time,
          details,
        },
      ]);
      setTitle("");
      setTime("");
      setDetails("");
    }
  }

  function handleDeleteSchedule(index) {
    const newSchedules = [...schedules];
    newSchedules.splice(index, 1);
    setSchedules(newSchedules);
  }

  return (
    <div className="schedule__form">
      <h2 style={{ marginBottom: "1rem" }}>Event Schedules</h2>
      <div className="schedule__inputs">
        <input
          type="text"
          placeholder="Schedule Title"
          value={title}
          onChange={handleTitle}
        />
        <input
          type="text"
          placeholder="Schedule Time"
          value={time}
          onChange={handleTime}
        />
        <input
          type="text"
          placeholder="Schedule Details"
          value={details}
          onChange={handleDetails}
        />
      </div>
      <button className="schedule__btn" onClick={handleAddSchedule}>
        Add Schedule
      </button>
      <ul className="schedule__list">
        {schedules.map((schedule, index) => (
          <li className="schedule__list__item" key={index}>
            <span className="schedule__list__item__title">
              {schedule.title}
            </span>
            <span className="schedule__list__item__time">{schedule.time}</span>
            {schedule.details && (
              <span className="schedule__list__item__details">
                {schedule.details}
              </span>
            )}
            <button
              className="schedule__delete__btn"
              onClick={() => handleDeleteSchedule(index)}
            >
              <Remove fontSize="large" color="error" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventScheduleForm;
