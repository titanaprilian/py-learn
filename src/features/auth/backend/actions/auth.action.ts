"use server";

import { action } from "@/features/auth/backend/actions";
import {
  loginSchema,
} from "@/features/auth/backend/validations/auth.validation";
import { AuthService } from "@/features/auth/backend/services/auth.service";
import { redirect } from "next/navigation";

export const login = action
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { identifier, password, role } = parsedInput;

    try {
      const result = await AuthService.login(identifier, password, role);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Invalid NIM/NIK atau password" };
    }
  });

export const logout = action.action(async () => {
  await AuthService.logout();
  redirect("/");
});

