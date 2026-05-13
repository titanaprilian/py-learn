import { TugasRepository } from "@/features/tugas/backend/repositories/tugas.repository";

export class TugasService {
  static async getAllPublished() {
    return TugasRepository.findPublished();
  }

  static async getById(id: number) {
    return TugasRepository.findById(id);
  }

  static async getByMaterialLevelId(materialLevelId: number) {
    return TugasRepository.findByMaterialLevelId(materialLevelId);
  }
}