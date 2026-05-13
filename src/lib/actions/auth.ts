"use server";

import { action } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const login = action
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { identifier, password, role } = parsedInput;

    try {
      const { db } = await import("@/shared/db");
      const { user: userTable } = await import("@/shared/db/schema");
      const { eq, or } = await import("drizzle-orm");

      // Find user by NIM/NIK (userId) or email
      const dbUsers = await db
        .select()
        .from(userTable)
        .where(
          or(
            eq(userTable.userId, identifier),
            eq(userTable.email, identifier)
          )
        )
        .limit(1);

      if (dbUsers.length === 0) {
        console.log(`Login attempt failed: User with identifier "${identifier}" not found in database.`);
        return { error: "Invalid NIM/NIK atau password" };
      }

      const dbUser = dbUsers[0];
      console.log(`User found: ${dbUser.email} (Role: ${dbUser.role})`);

      // Check role before signing in
      if (dbUser.role !== role) {
        console.log(`Role mismatch: Expected ${role}, got ${dbUser.role}`);
        return {
          error: `Akun ini bukan sebagai ${role === "student" ? "Mahasiswa" : "Dosen"}. Silakan pilih peran yang sesuai.`,
        };
      }

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