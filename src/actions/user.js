import { baseURL } from "@/baseUrl";
import axios from "axios";

const API = axios.create({
  baseURL: baseURL, // Replace with your API endpoint // Replace with your desired timeout value
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  },
});

export function getUsers(dispatch) {
  API.get("/users")
    .then((response) => {
      // Handle success
      dispatch({ type: "get_users", payload: response.data.users });
    })
    .catch((error) => {
      // Handle error
      dispatch({ type: "error" });
    });
}
