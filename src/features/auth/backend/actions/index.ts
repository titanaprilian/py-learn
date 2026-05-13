import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/features/auth/backend/auth";
import { headers } from "next/headers";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient().use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { session } });
});