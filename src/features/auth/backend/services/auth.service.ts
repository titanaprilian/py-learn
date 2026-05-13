import { db } from "@/shared/db";
import { user } from "@/shared/db/schema";
import { eq, or } from "drizzle-orm";

export class AuthService {
  static async resolveIdentifier(
    identifier: string,
    role: "student" | "lecturer"
  ) {
    const dbUsers = await db
      .select()
      .from(user)
      .where(
        or(
          eq(user.userId, identifier),
          eq(user.email, identifier)
        )
      )
      .limit(1);

    if (dbUsers.length === 0) {
      return null;
    }

    const dbUser = dbUsers[0];

    const expectedRole = role === "student" ? "student" : "lecturer";
    if (dbUser.role !== expectedRole) {
      return null;
    }

    return dbUser;
  }
}