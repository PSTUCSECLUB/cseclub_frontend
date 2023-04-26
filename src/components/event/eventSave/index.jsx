import { postEvent } from "@/actions/event";
import React, { useEffect, useState } from "react";

export default function EventSave({ event }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {}, []);

  const handleSave = async () => {
    setLoading(true);
    let response = await postEvent(event);
    console.log(response);
    setLoading(false);
  };
  return (
    <div className="addevent__event-save">
      <button className="addevent__event-save" onClick={handleSave}>
        Save this event
      </button>
    </div>
  );
}
