// lib/api-error.ts

import axios from "axios";
export function handleApiError(error: unknown): never {
    console.error(error);
    if (axios.isAxiosError(error)) {
        if (error.response) {
            throw new Error("Server Error. Please try again later.");
        }
        throw new Error(
            "Unable to connect to the server. Please check your internet connection."
        );
    }
    throw new Error("Unexpected error.");
}