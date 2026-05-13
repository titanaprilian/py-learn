import { auth } from "@/features/auth/backend/auth";
import { AuthRepository } from "@/features/auth/backend/repositories/auth.repository";
import { headers } from "next/headers";

export type AuthResult =
  | { success: true; user: unknown }
  | { error: string };

export class AuthService {
  static async resolveIdentifier(
    identifier: string,
    role: "student" | "lecturer"
  ) {
    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      return null;
    }

    const expectedRole = role === "student" ? "student" : "lecturer";
    if (dbUser.role !== expectedRole) {
      return null;
    }

    return dbUser;
  }

  static async login(
    identifier: string,
    password: string,
    role: "student" | "lecturer"
  ): Promise<AuthResult> {
    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      console.log(
        `Login attempt failed: User with identifier "${identifier}" not found in database.`
      );
      return { error: "Invalid NIM/NIK atau password" };
    }

    console.log(`User found: ${dbUser.email} (Role: ${dbUser.role})`);

    const expectedRole = role === "student" ? "student" : "lecturer";
    if (dbUser.role !== expectedRole) {
      console.log(`Role mismatch: Expected ${role}, got ${dbUser.role}`);
      return {
        error: `Akun ini bukan sebagai ${
          role === "student" ? "Mahasiswa" : "Dosen"
        }. Silakan pilih peran yang sesuai.`,
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
  }

  static async logout() {
    const sessionHeaders = await headers();
    await auth.api.signOut({
      headers: sessionHeaders,
    });
  }
}