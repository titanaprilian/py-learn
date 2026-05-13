export const ROLES = {
  MAHASISWA: "Mahasiswa",
  DOSEN: "Dosen",
} as const;

export const ROLE_IDS = {
  [ROLES.MAHASISWA]: 1,
  [ROLES.DOSEN]: 2,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

