import { auth } from "@/features/auth/backend/auth";
import { AuthRepository } from "@/features/auth/backend/repositories/auth.repository";
import { RoleRepository } from "@/features/auth/backend/repositories/role.repository";
import { headers } from "next/headers";

export type AuthResult = { success: true; user: unknown } | { error: string };

export class AuthService {
  static async resolveIdentifier(
    identifier: string,
    role: "Mahasiswa" | "Dosen",
  ) {
    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      return null;
    }

    const roleRecord = await RoleRepository.findByName(role);
    if (!roleRecord) {
      return null;
    }

    if (dbUser.roleId !== roleRecord.id) {
      return null;
    }

    return dbUser;
  }

  static async login(
    identifier: string,
    password: string,
    role: "Mahasiswa" | "Dosen",
  ): Promise<AuthResult> {
    const roleRecord = await RoleRepository.findByName(role);
    if (!roleRecord) {
      return { error: "Invalid role" };
    }

    const dbUser = await AuthRepository.findByIdentifier(identifier);

    if (!dbUser) {
      console.log(
        `Login attempt failed: User with identifier "${identifier}" not found in database.`,
      );
      return { error: "Invalid NIM/NIK atau password" };
    }

    console.log(`User found: ${dbUser.email} (Role ID: ${dbUser.roleId})`);

    if (dbUser.roleId !== roleRecord.id) {
      console.log(`Role mismatch: Expected role ID ${roleRecord.id}, got ${dbUser.roleId}`);
      return {
        error: `Akun ini bukan sebagai ${
          role === "Mahasiswa" ? "Mahasiswa" : "Dosen"
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

    if (!signInResult || !signInResult.user) {
      console.log("signInEmail failed: Invalid credentials or user missing");
      return { error: "Invalid NIM/NIK atau password" };
    }

    return { success: true, user: signInResult.user };
  }

  static async logout() {
    const sessionHeaders = await headers();
    await auth.api.signOut({
      headers: sessionHeaders,
    });
  }
}

