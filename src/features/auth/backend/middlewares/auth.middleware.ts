import { auth } from "@/features/auth/backend/auth";
import { NextRequest, NextResponse } from "next/server";

export async function requireAuth(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}