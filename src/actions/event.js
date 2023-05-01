import { baseURL } from "@/baseUrl";
import axios from "axios";

const API = axios.create({
  baseURL: baseURL, // Replace with your API endpoint // Replace with your desired timeout value
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  },
});

export function postEvent(
  event,
  parentId = "",
  setLoading,
  setError,
  setSuccess
) {
  setLoading(true);
  let query = parentId ? `?parentId=${parentId}` : "";
  console.log(query);
  API.post("/events" + query, event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      setLoading(false);
      setSuccess(response.data.result._id);
      setError(false);
      console.log(response.data);
    })
    .catch((error) => {
      setLoading(false);
      setError(true);
      console.log(error);
    });
}
export function getEvents(dispatch) {
  API.get("/events")
    .then((response) => {
      // Handle success
      dispatch({ type: "get_events", payload: response.data.events });
    })
    .catch((error) => {
      // Handle error
      dispatch({ type: "error" });
    });
}

export function updateInEventPage(eventId, state, setStateBtnState) {
  setStateBtnState("loading");
  API.put("/events/" + eventId, { inEventsPage: state })
    .then((response) => {
      // Handle success
      if (response.data.event.inEventsPage) {
        setStateBtnState("success");
      } else {
        setStateBtnState("initial");
      }
    })
    .catch((error) => {
      // Handle error
      setStateBtnState("error");
      console.log(error);
    });
}

export function deleteEvent(eventId, toast, dispatch) {
  API.delete("/events/" + eventId)
    .then((response) => {
      dispatch({
        type: "delete_event",
        payload: {
          id: eventId,
        },
      });
      console.log(response.data);
      toast("Deleted Successfully !");
      return { deleted: true };
    })
    .catch((error) => {
      // Handle error

      toast("Failed to Delete");
      console.log(error);
      return { deleted: false };
    });
}

export function getParentEvents(setParents, setLoading, setError) {
  API.get("/events?fields=title,image,_id")
    .then((response) => {
      console.log(response.data.events);
      // Handle success
      setLoading(false);
      setParents(response.data.events);
    })
    .catch((error) => {
      // Handle error
      setLoading(false);
      setError(true);
    });
}
