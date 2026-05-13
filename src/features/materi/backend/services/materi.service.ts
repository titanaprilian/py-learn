import { MateriRepository } from "@/features/materi/backend/repositories/materi.repository";

export class MateriService {
  static async getAllPublished() {
    return MateriRepository.findPublished();
  }

  static async getById(id: number) {
    return MateriRepository.findById(id);
  }

  static async getLevelsByMaterialId(materialId: number) {
    return MateriRepository.findLevelsByMaterialId(materialId);
  }
}