import { baseURL } from "@/baseUrl";
import axios from "axios";

const API = axios.create({
  baseURL: baseURL, // Replace with your API endpoint // Replace with your desired timeout value
  headers: {
    "Content-Type": "application/json", // Replace with your desired content type
  },
});

export function postEvent(event) {
  console.log(process.env.BASEURL);
  API.post("/events", event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
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
