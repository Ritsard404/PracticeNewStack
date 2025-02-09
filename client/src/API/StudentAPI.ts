import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./AuthAPI";
import { toast } from "react-toastify";

// Define Student type
export interface StudentDetails {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  isMale: boolean;
  birthdate: string;
}

export const getStudents = () => {
  return useQuery<StudentDetails[], Error>({
    queryKey: ["Students"],
    queryFn: async () => {
      const response = await api.get("student/students");
      return response.data;
    },
  });
};

export const getStudent = (id: string) => {
  return useQuery<StudentDetails, Error>({
    queryKey: ["Student: " + id],
    queryFn: async () => {
      const response = await api.get(`student/getStudent/${id}`);
      return response.data;
    },
  });
};

export interface Student {
  name: string;
  email: string;
  age: number;
  gender: string;
  isMale: boolean;
  birthdate: Date;
}

export const useNewStudent = () => {
  return useMutation({
    mutationFn: async (data: Student) => {
      const response = await api.post("student/newStudent", data, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response;
    },
    onSuccess: () => {
      toast.success("New Student Added");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    },
  });
};

export interface EditStudent {
  name: string;
  email: string;
  age: string;
  isMale: boolean;
  birthdate: string;
}

export const useEditStudent = (id: string) => {
  return useMutation({
    mutationFn: async (data: EditStudent) => {
      const response = await api.put(
        `student/editStudent/${id}`,
        { data },
        {
          headers: {
            "Content-Type": "application/json", // Ensure it matches the server requirements
          },
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      console.error("Error edit:", error);
    },
  });
};

export const useDeleteStudent = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`student/deleteStudent/${id}`, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.error("Deleted");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      console.error("Error delete:", error);
    },
  });
};
