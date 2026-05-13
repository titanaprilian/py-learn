"use client";

import { useSession } from "@/features/auth/frontend/providers/auth-provider";
import type { UserDTO } from "@/features/auth/shared/types/user.types";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string;
}

export function useAuth() {
  const { data: session, isPending, error } = useSession();

  const user: UserDTO | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as SessionUser).role as "student" | "lecturer",
      }
    : null;

  const isAuthenticated = !!session?.user;
  const isMahasiswa = user?.role === "student";
  const isDosen = user?.role === "lecturer";

  return {
    user,
    isLoading: isPending,
    isAuthenticated,
    isMahasiswa,
    isDosen,
    error,
  };
}