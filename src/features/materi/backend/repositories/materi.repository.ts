import { db } from "@/shared/db";
import { material, materialLevel } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export class MateriRepository {
  static async findAll() {
    return db.select().from(material);
  }

  static async findById(id: number) {
    const results = await db
      .select()
      .from(material)
      .where(eq(material.id, id))
      .limit(1);
    return results[0] ?? null;
  }

  static async findPublished() {
    return db
      .select()
      .from(material)
      .where(eq(material.isPublished, true));
  }

  static async findLevelsByMaterialId(materialId: number) {
    return db
      .select()
      .from(materialLevel)
      .where(eq(materialLevel.materialId, materialId))
      .orderBy(materialLevel.levelOrder);
  }

  static async create(data: typeof material.$inferInsert) {
    return db.insert(material).values(data).returning();
  }

  static async update(id: number, data: Partial<typeof material.$inferInsert>) {
    return db.update(material).set(data).where(eq(material.id, id)).returning();
  }

  static async delete(id: number) {
    return db.delete(material).where(eq(material.id, id));
  }
}