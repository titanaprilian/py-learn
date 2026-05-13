export interface Tugas {
  id: number;
  materialLevelId: number;
  title: string;
  description?: string | null;
  durationMinutes?: number | null;
  totalScore: number;
  startTime?: Date | null;
  endTime?: Date | null;
  isPublished: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface TugasDTO {
  id: number;
  title: string;
  description?: string;
  durationMinutes?: number;
  totalScore: number;
  startTime?: Date;
  endTime?: Date;
}