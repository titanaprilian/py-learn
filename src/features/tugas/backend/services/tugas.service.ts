import { db } from "@/shared/db";
import { quiz } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export class TugasService {
  static async getAllPublished() {
    return db
      .select()
      .from(quiz)
      .where(eq(quiz.isPublished, true));
  }

  static async getById(id: number) {
    const results = await db
      .select()
      .from(quiz)
      .where(eq(quiz.id, id))
      .limit(1);
    return results[0] ?? null;
  }

  static async getByMaterialLevelId(materialLevelId: number) {
    return db
      .select()
      .from(quiz)
      .where(eq(quiz.materialLevelId, materialLevelId));
  }
}