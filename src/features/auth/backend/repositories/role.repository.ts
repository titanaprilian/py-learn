import { db } from "@/shared/db";
import { role } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export class RoleRepository {
  static async findByName(name: string) {
    const results = await db
      .select()
      .from(role)
      .where(eq(role.name, name))
      .limit(1);
    return results[0] ?? null;
  }

  static async findAll() {
    return db.select().from(role);
  }

  static async create(data: typeof role.$inferInsert) {
    return db.insert(role).values(data).returning();
  }

  static async seedIfEmpty() {
    const existingRoles = await db.select().from(role);
    if (existingRoles.length > 0) {
      console.log("Roles already exist, skipping seed");
      return;
    }

    const now = new Date();
    await db.insert(role).values([
      { name: "Mahasiswa", createdAt: now, updatedAt: now },
      { name: "Dosen", createdAt: now, updatedAt: now },
    ]);
    console.log("Roles seeded successfully");
  }
}
