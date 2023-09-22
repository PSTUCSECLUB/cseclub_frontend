import { baseUrl } from "@/baseUrl";
import axios from "axios";

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: baseUrl + "/api/v1/upload",
  headers: {
    "Content-Type": "application/json",
  },
});

// Define POST action
export const postImage = async (formData) => {
  try {
    const response = await api.post("/uploadImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteImage = async (body) => {
  try {
    const response = await api.put("/remove", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
