import { db } from "@/shared/db";
import { quiz } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export class TugasRepository {
  static async findAll() {
    return db.select().from(quiz);
  }

  static async findById(id: number) {
    const results = await db
      .select()
      .from(quiz)
      .where(eq(quiz.id, id))
      .limit(1);
    return results[0] ?? null;
  }

  static async findPublished() {
    return db
      .select()
      .from(quiz)
      .where(eq(quiz.isPublished, true));
  }

  static async findByMaterialLevelId(materialLevelId: number) {
    return db
      .select()
      .from(quiz)
      .where(eq(quiz.materialLevelId, materialLevelId));
  }

  static async create(data: typeof quiz.$inferInsert) {
    return db.insert(quiz).values(data).returning();
  }

  static async update(id: number, data: Partial<typeof quiz.$inferInsert>) {
    return db.update(quiz).set(data).where(eq(quiz.id, id)).returning();
  }

  static async delete(id: number) {
    return db.delete(quiz).where(eq(quiz.id, id));
  }
}