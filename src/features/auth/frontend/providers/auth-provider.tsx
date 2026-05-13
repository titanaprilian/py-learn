"use client";

import { createAuthClient } from "better-auth/react";
import { useState, useEffect, type ReactNode } from "react";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
});

const { useSession, signIn, signOut, signUp } = authClient;

export { useSession, signIn, signOut, signUp };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}