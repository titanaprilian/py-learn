# Fix Post-Login Session Cookies and Last Login Timestamp

> **For the implementer:** This issue is self-contained. Read it fully before starting. If anything is unclear, re-read the Notes section before asking.

---

## Overview

After a successful login via our Server Action, the session is created in the database, but the session cookie is not being set in the user's browser. This happens because `auth.api.signInEmail` is called without the proper Next.js request context to handle `Set-Cookie` headers automatically. Additionally, our custom `last_login_at` field in the `user` table is not being updated upon a successful login.

---

## Scope

This issue affects the login logic in `src/features/auth/backend/services/auth.service.ts` and the data access logic in `src/features/auth/backend/repositories/auth.repository.ts`.

---

## Tasks

1. **Update `last_login_at`:**
    - Modify `src/features/auth/backend/repositories/auth.repository.ts` to include a method (e.g., `updateLastLogin`) that updates the `lastLoginAt` column for a given user ID to the current timestamp.
2. **Fix Session Cookie & Login Flow:**
    - Modify `src/features/auth/backend/services/auth.service.ts` in the `login` method.
    - Change the `auth.api.signInEmail` call to properly pass the Next.js `headers()` context. E.g., `auth.api.signInEmail({ body: ... }, { headers: await headers() })`.
    - If Better Auth does not automatically set the cookie in a Server Action context even with headers provided, perform the API call with `asResponse: true`, extract the `Set-Cookie` header from the resulting Response object, and manually apply it using the Next.js `cookies()` API.
3. **Execute Timestamp Update:**
    - Upon a successful sign-in (after the cookie is verified to be set), call the repository method to update the user's `last_login_at`.

---

## Acceptance Criteria

- [ ] When a user logs in, a valid session cookie (e.g., `better-auth.session_token`) is set in the browser.
- [ ] The user is successfully redirected to the dashboard (or stays logged in) because the session persists across requests.
- [ ] The `last_login_at` column in the `user` table is updated to the current time immediately after a successful login.
- [ ] The `access_token` in the `account` table remains `null` (this is expected behavior for the credential provider and should not be altered).

---

## Out of Scope

- Modifying the frontend login component or form logic.
- Implementing OAuth providers (Google, GitHub, etc.).

---

## Notes

- To set cookies manually if needed:
  ```typescript
  import { cookies } from "next/headers";
  // ...
  const res = await auth.api.signInEmail({ body: ..., asResponse: true });
  const setCookieHeader = res.headers.get("Set-Cookie");
  if (setCookieHeader) {
      // Parse the cookie string and use cookies().set(name, value, options)
  }
  ```
