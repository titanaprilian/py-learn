import { auth } from "@/features/auth/backend/auth";
import { NextRequest, NextResponse } from "next/server";
import { ROLES, ROLE_IDS } from "@/features/auth/shared/constants/roles";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  roleId?: number;
  role?: string;
}

export async function requireRole(req: NextRequest, role: keyof typeof ROLES) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as SessionUser;
  const expectedRoleName = ROLES[role];
  const expectedRoleId = ROLE_IDS[expectedRoleName];

  if (user.roleId !== expectedRoleId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}