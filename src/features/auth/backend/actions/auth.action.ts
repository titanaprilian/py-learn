"use server";

import { action } from "@/features/auth/backend/actions";
import { auth } from "@/features/auth/backend/auth";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/backend/validations/auth.validation";
import { AuthService } from "@/features/auth/backend/services/auth.service";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const login = action
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { identifier, password, role } = parsedInput;

    try {
      const dbUser = await AuthService.resolveIdentifier(identifier, role);

      if (!dbUser) {
        console.log(
          `Login attempt failed: User with identifier "${identifier}" not found in database.`,
        );
        return { error: "Invalid NIM/NIK atau password" };
      }

      console.log(`User found: ${dbUser.email} (Role: ${dbUser.role})`);

      console.log(`Attempting signInEmail for ${dbUser.email}...`);
      const signInResult = await auth.api.signInEmail({
        body: {
          email: dbUser.email,
          password,
        },
      });

      if (!signInResult || !signInResult.token) {
        console.log("signInEmail failed: Invalid credentials or token missing");
        return { error: "Invalid NIM/NIK atau password" };
      }

      const sessionHeaders = await headers();
      const session = await auth.api.getSession({
        headers: sessionHeaders,
      });

      if (!session) {
        return { error: "Failed to create session" };
      }

      return { success: true, user: session.user };
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Invalid NIM/NIK atau password" };
    }
  });

export const logout = action.action(async () => {
  const sessionHeaders = await headers();
  await auth.api.signOut({
    headers: sessionHeaders,
  });
  redirect("/");
});

