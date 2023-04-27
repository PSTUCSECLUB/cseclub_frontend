import { baseURL } from "@/baseUrl";
import axios from "axios";

const API = axios.create({
  baseURL: baseURL, // Replace with your API endpoint // Replace with your desired timeout value
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  },
});

export function postBlog(blog) {
  API.get("/blogs")
    .then((response) => {
      return [null, response.data];
    })
    .catch((error) => {
      // Handle error
      return [error, null];
    });
}
export function getBlogs(dispatch) {
  API.get("/blogs")
    .then((response) => {
      // Handle success
      dispatch({ type: "get_blogs", payload: response.data.blogs });
    })
    .catch((error) => {
      // Handle error
      dispatch({ type: "error" });
    });
}
