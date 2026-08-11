// lib/api-error.ts
import axios from "axios";

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export function handleApiError(error: unknown): ApiErrorResponse {
  console.error("API Error Logged (Internal):", error);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const apiMessage = error.response.data?.message;

      if (apiMessage) {
        return { success: false, message: apiMessage };
      }

      if (status === 401) {
        return { success: false, message: "Invalid credentials." };
      }
      if (status === 403) {
        return {
          success: false,
          message: "You do not have permission to perform this action.",
        };
      }
      if (status === 422) {
        return {
          success: false,
          message: "Invalid data submitted. Please check your inputs.",
        };
      }
      if (status === 429) {
        return {
          success: false,
          message: "Too many requests. Please try again later.",
        };
      }
      if (status >= 500) {
        return {
          success: false,
          message: "Internal Server Error. Please try again later.",
        };
      }

      return {
        success: false,
        message: "An error occurred while processing your request.",
      };
    }

    if (error.request) {
      return {
        success: false,
        message: "Unable to connect to the server. Please check your network.",
      };
    }
  }

  if (error instanceof Error) {
    return { success: false, message: error.message };
  }

  return { success: false, message: "An unexpected error occurred." };
}