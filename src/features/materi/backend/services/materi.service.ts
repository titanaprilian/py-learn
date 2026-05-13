import { db } from "@/shared/db";
import { material, materialLevel } from "@/shared/db/schema";
import { eq } from "drizzle-orm";

export class MateriService {
  static async getAllPublished() {
    return db
      .select()
      .from(material)
      .where(eq(material.isPublished, true));
  }

  static async getById(id: number) {
    const results = await db
      .select()
      .from(material)
      .where(eq(material.id, id))
      .limit(1);
    return results[0] ?? null;
  }

  static async getLevelsByMaterialId(materialId: number) {
    return db
      .select()
      .from(materialLevel)
      .where(eq(materialLevel.materialId, materialId))
      .orderBy(materialLevel.levelOrder);
  }
}