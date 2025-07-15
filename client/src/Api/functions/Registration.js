import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";


// ✅ Register current user for an event
export const registerEvent = async (eventId) => {
  try {
    const response = await axiosInstance.post(endPoints.registration.register(eventId));
    return response;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get all registrations by the current user
export const getMyRegistrations = async () => {
  try {
    const response = await axiosInstance.get(endPoints.registration.myRegistrations);
    return response;
  } catch (error) {
    console.error("Error fetching registrations:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get ticket details for a specific event
export const getTicketByEvent = async (eventId) => {
  try {
    const response = await axiosInstance.get(endPoints.ticket.getByEvent(eventId));
    return response;
  } catch (error) {
    console.error("Error fetching ticket:", error.response?.data || error.message);
    throw error;
  }
};
