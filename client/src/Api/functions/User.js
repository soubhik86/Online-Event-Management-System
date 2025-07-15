import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoint";

export const register = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.register, input);
    return response; // return full response
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message); 
    throw error;
  }
};

export const login = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.login, input);
    return response; // return full response
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message); 
    throw error;
  }

  
};

export const verify = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.verify, input);
    return response; // return full response
  } catch (error) {
    console.error("Verification error:", error.response?.data || error.message);
    throw error;
  }
};

// updateProfile

export const updateProfile = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.updateProfile, input);
    return response; // return full response
  } catch (error) {
    console.error("Profile update error:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Forgot Password
export const forgotPassword = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.forgotPassword, input);
    return response;
  } catch (error) {
    console.error("Forgot password error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Reset Password
export const resetPassword = async (input) => {
  try {
    const response = await axiosInstance.post(endPoints.user.resetPassword, input);
    return response;
  } catch (error) {
    console.error("Reset password error:", error.response?.data || error.message);
    throw error;
  }
};