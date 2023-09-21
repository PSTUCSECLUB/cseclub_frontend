import { baseUrl } from "@/baseUrl";
import axios from "axios";

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: baseUrl + "/api/v1/events",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch data using Axios
export const getEvents = async (query = "") => {
  try {
    const response = await api.get(query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

// Function to fetch data using Axios
export const getEvent = async (id) => {
  try {
    console.log("get event");
    const response = await api.get(id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

// Define POST action
export const addEvent = async (formData) => {
  try {
    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete("/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// Define PUT action
export const updateEvent = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update alumni");
  }
};

export const updateAlumniPhoto = async (id, data) => {
  try {
    const response = await api.patch(`/${id}/updatePhoto`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update photo");
  }
};
