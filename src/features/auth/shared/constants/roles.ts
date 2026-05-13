export const ROLES = {
  MAHASISWA: "student",
  DOSEN: "lecturer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS = {
  student: "Mahasiswa",
  lecturer: "Dosen",
} as const;