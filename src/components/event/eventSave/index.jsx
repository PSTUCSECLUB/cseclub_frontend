import { postEvent } from "@/actions/event";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function EventSave({ event, parentId }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {}, []);

  const handleSave = () => {
    console.log(parentId);
    let idOfParent = parentId ? parentId : "";
    console.log(idOfParent);
    if (!success) {
      postEvent(event, idOfParent, setLoading, setError, setSuccess);
    }
  };
  return (
    <div className="addevent__event-save">
      <button className="addevent__event-save__btn" onClick={handleSave}>
        Save this event
      </button>
      {loading && (
        <div className="addevent__event-save__loading">
          <InfinitySpin width="100" color="#4fa94d" />
        </div>
      )}

      {error && (
        <div className="addevent__event-save__error">
          failed to save the event!
        </div>
      )}
      {success && (
        <div className="addevent__event-save__success">
          <p>Event is created successfully !</p>
          <Link
            className="addevent__event-save__success__link"
            href={"/events/" + success}
          >
            Visit the event
          </Link>
          <Link
            className="addevent__event-save__success__link"
            href={"/admin/addEvent"}
          >
            Create another event
          </Link>
        </div>
      )}
    </div>
  );
}
