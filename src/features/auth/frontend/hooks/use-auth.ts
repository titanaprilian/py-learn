"use client";

import { useSession } from "@/features/auth/frontend/providers/auth-provider";
import type { UserDTO } from "@/features/auth/shared/types/user.types";
import { ROLE_IDS, ROLES } from "@/features/auth/shared/constants/roles";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  roleId?: number;
  role?: string;
}

export function useAuth() {
  const { data: session, isPending, error } = useSession();

  const user: UserDTO | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role:
          (session.user as SessionUser).roleId === ROLE_IDS[ROLES.DOSEN]
            ? ROLES.DOSEN
            : ROLES.MAHASISWA,
      }
    : null;

  const isAuthenticated = !!session?.user;
  const isMahasiswa = user?.role === "Mahasiswa";
  const isDosen = user?.role === "Dosen";

  return {
    user,
    isLoading: isPending,
    isAuthenticated,
    isMahasiswa,
    isDosen,
    error,
  };
}

