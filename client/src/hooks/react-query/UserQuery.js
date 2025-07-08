import { useMutation } from "@tanstack/react-query";

import { forgotPassword, login, register, resetPassword, updateProfile, verify } from "../../Api/functions/User";
import { USERS } from "./QueryKey";
import { GlobalHooks } from "../GlobalHooks";
import { toast } from "react-toastify";

// REGISTER HOOK
export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = GlobalHooks();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ data, status, message }) => {
      if (status === 201) {
        toast.success("Registered successfully ✅");
        queryClient.invalidateQueries({ queryKey: [USERS] });
        setTimeout(() => navigate("/verify-email"), 1000);
      } else {
        toast.error(message || "Signup failed");
        setTimeout(() => navigate("/register"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup error");
    },
  });
};

// EMAIL VERIFY HOOK
export const useVerifyEmailMutation = () => {
  const { queryClient, navigate } = GlobalHooks();

  return useMutation({
    mutationFn: verify,
    onSuccess: ({ data, status }) => {
      if (status === 200) { // Corrected to 200 for successful verification
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: [USERS] });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message || "Email verification failed");
        setTimeout(() => navigate("/verify-email"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Email verification error");
    },
  });
};

// LOGIN HOOK
export const useUserLoginMutation = () => {
  const { queryClient, navigate } = GlobalHooks();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ data, status }) => {
      const { token, user } = data || {};
      const { name, profilePicture } = user || {};

      if (status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("proimg", profilePicture);
        localStorage.setItem("userid", "_id");

        toast.success("Login successful");
        queryClient.invalidateQueries({ queryKey: [USERS] });

        setTimeout(() => navigate("/"), 1000); // ✅ now this will work
      } else {
        toast.error("Login failed");
        setTimeout(() => navigate("/login"), 1000);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login error");
    },
  });
};

//updateProfile HOOK
export const useUpdateProfileMutation = () => {
  const { queryClient, navigate } = GlobalHooks();

  return useMutation({
    mutationFn: (input) => updateProfile(input),
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: [USERS] });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message || "Profile update failed");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Profile update error");
    },
  });
}

// ✅ FORGOT PASSWORD HOOK
export const useForgotPasswordMutation = () => {
  const { navigate } = GlobalHooks();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(data.message);
        setTimeout(() => navigate("/resetpassword"), 1000);
      } else {
        toast.error(data.message || "OTP request failed");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "OTP send error");
    },
  });
};

// ✅ RESET PASSWORD HOOK
export const useResetPasswordMutation = () => {
  const { navigate } = GlobalHooks();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message || "Reset failed");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Reset password error");
    },
  });
};