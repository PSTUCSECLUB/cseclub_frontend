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
      console.log(response.data);
      dispatch({ type: "get_event", payload: response.data.events });
    })
    .catch((error) => {
      // Handle error
      return error;
    });
}
