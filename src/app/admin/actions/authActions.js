import { baseUrl } from "@/baseUrl";
import axios from "axios";

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: baseUrl + "/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signInAdmin = async (data) => {
  try {
    const response = await api.post("/signin", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
