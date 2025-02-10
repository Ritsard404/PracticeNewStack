import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../redux/AuthSlice";

// const API_URL = "http://localhost:5000/api/";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

interface User {
  email: string;
  password: String;
}

// LogIn
export const useLogInMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (data: User) => {
      const response = await api.post("auth/userLogin", data, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem("token", data.token);

      //  Dispatch user data to Redux
      dispatch(
        setUser({
          userId: String(data.user.id),
          userEmail: data.user.email,
          token: data.token,
        })
      );

      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error.response?.data?.message);
    },
  });
};

// Register
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      const response = await api.post("auth/newUser", data, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error.response?.data?.message);
    },
  });
};
