import { baseUrl } from "@/baseUrl";
import axios from "axios";

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: baseUrl + "/api/v1/executives",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch data using Axios
export const getExecutives = async (query = "?sort=order") => {
  try {
    const response = await api.get(query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

// Function to fetch data using Axios
export const getExecutive = async (id) => {
  try {
    const response = await api.get(id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

// Define POST action
export const addExecutive = async (formData) => {
  try {
    const response = await api.post("/", formData, {
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

export const deleteExecutive = async (id) => {
  try {
    const response = await api.delete("/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// Define PUT action
export const updateExecutive = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update alumni");
  }
};
