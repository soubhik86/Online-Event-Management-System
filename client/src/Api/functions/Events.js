import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";

export const allEvent = async () => {
  try {
    const response = await axiosInstance.get(endPoints.event.getAll);
    return response; // return full response
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message); 
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(endPoints.event.getById(id));
    return response; // return full response
  } catch (error) {
    console.error("Error fetching event by ID:", error.response?.data || error.message);
    throw error;
  }
};