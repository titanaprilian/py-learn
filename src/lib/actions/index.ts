import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Public actions (no auth required)
export const action = createSafeActionClient();

// Protected actions (auth required)
export const authAction = createSafeActionClient().use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { session } });
});
