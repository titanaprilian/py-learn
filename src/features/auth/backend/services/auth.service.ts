import { AuthRepository } from "@/features/auth/backend/repositories/auth.repository";

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
}