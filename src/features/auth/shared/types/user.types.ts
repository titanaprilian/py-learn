export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: "Mahasiswa" | "Dosen";
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: "Mahasiswa" | "Dosen";
}

