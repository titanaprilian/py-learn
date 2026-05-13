export interface Materi {
  id: number;
  lecturerId: string;
  title: string;
  description?: string | null;
  materialType: string;
  content?: string | null;
  sourceUrl?: string | null;
  iconName?: string | null;
  isPublished: boolean;
  publishedAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface MateriLevel {
  id: number;
  materialId: number;
  title?: string | null;
  levelOrder: number;
  createdAt?: Date | null;
}

export interface MateriWithLevels extends Materi {
  levels: MateriLevel[];
}

export interface MateriDTO {
  id: number;
  title: string;
  description?: string;
  materialType: string;
  iconName?: string;
}