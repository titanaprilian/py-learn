import { auth } from "@/features/auth/backend/auth";
import { NextRequest, NextResponse } from "next/server";
import { ROLES } from "@/features/auth/shared/constants/roles";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string;
}

export async function requireRole(req: NextRequest, role: keyof typeof ROLES) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as SessionUser;

  if (user.role !== role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}