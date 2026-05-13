import { db } from "@/shared/db";
import { user } from "@/shared/db/schema";
import { eq, or } from "drizzle-orm";

export class AuthRepository {
  static async findByIdentifier(identifier: string) {
    const results = await db
      .select()
      .from(user)
      .where(
        or(
          eq(user.userId, identifier),
          eq(user.email, identifier)
        )
      )
      .limit(1);
    return results[0] ?? null;
  }

  static async findById(id: string) {
    const results = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);
    return results[0] ?? null;
  }

  static async findByEmail(email: string) {
    const results = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    return results[0] ?? null;
  }

  static async create(data: typeof user.$inferInsert) {
    return db.insert(user).values(data).returning();
  }

  static async update(id: string, data: Partial<typeof user.$inferInsert>) {
    return db.update(user).set(data).where(eq(user.id, id)).returning();
  }

  static async delete(id: string) {
    return db.delete(user).where(eq(user.id, id));
  }
}