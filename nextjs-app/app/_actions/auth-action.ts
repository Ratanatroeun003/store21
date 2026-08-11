"use server";
import { cookies } from "next/headers";
import { handleApiError } from "@/lib/api-error";
import { SigninInput,loginSchema } from "@/lib/validations/auth";
import {AUTH} from "@/lib/api/auth"
interface SigninState {
    success: boolean;
    message?: string;
}
export async function signin(data:SigninInput): Promise<SigninState> {
   const validation = loginSchema.safeParse(data);
   if(!validation.success) {
   return{
     success: false,
    message: "invalid input"
    }
   }
  const payload = validation.data;
    try {
        const res = await AUTH.signin(payload);
        const token = res.data.token;
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
          httpOnly: true,
         secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
         maxAge: 60 * 60 * 24 * 7, 
      });
      return { success: true, message: "Login successful" };
    } catch (error: unknown) {
      return handleApiError(error);
    }
}
export async function signout() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
          await AUTH.signout(token).catch((error) => {
            console.error("Error during signout:", error);
       } ) ;
    }
cookieStore.delete("token");
}
