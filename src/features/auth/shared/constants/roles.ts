export const ROLES = {
  MAHASISWA: "Mahasiswa",
  DOSEN: "Dosen",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

