import { baseURL } from "@/baseUrl";
import axios from "axios";

const API = axios.create({
  baseURL: baseURL, // Replace with your API endpoint // Replace with your desired timeout value
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  },
});

export function postEvent(event) {
  API.get("/events")
    .then((response) => {
      // Handle success
      console.log(response.data);
      return [null, response.data];
    })
    .catch((error) => {
      // Handle error
      return [error, null];
      console.error(error);
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
