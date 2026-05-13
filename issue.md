# Implement Full-Stack Login Authentication

> **For the implementer:** This issue is self-contained. Read it fully before starting. If anything is unclear, re-read the Notes section before asking.

---

## Overview

This task involves connecting the previously built Role-Based Login UI to a functional backend. We will use **Better Auth** as the authentication provider, **Drizzle ORM** for database interaction, and **next-safe-action** for typesafe communication between the frontend and backend. The goal is to allow users (Students/Lecturers) to log in with their credentials (NIM/NIK and password) and maintain a valid session.

---

## Scope

- **Backend**: `src/lib/auth.ts`, `src/lib/db/schema.ts`, and a new server action in `src/lib/actions/auth.ts`.
- **Frontend**: Integration of `authClient` in `src/app/page.tsx`.
- **Testing**: New integration tests in `src/lib/actions/auth.test.ts`.

---

## Tasks

1. **Schema Verification**: Ensure the `user` table in `src/lib/db/schema.ts` has the `role` and `userId` (NIM/NIK) fields.
2. **Better Auth Configuration**: 
   - Configure `betterAuth` in `src/lib/auth.ts` to support `emailAndPassword` login.
   - Map the `email` field internally to use the `userId` (NIM/NIK) if necessary, or ensure the registration flow handles this mapping.
3. **Create Login Server Action**:
   - Implement a `loginAction` using `next-safe-action` in `src/lib/actions/auth.ts`.
   - The action should validate the input (NIM/NIK, password, role) using Zod.
   - Use `auth.api.signInEmail` or a custom credential flow to authenticate the user.
4. **Frontend Integration**:
   - Connect the login form in `src/app/page.tsx` to the `loginAction`.
   - Use `useAction` from `next-safe-action/hooks` to handle loading and error states.
   - On success, redirect the user to `/dashboard`.
5. **Integration Testing**:
   - Write tests in `src/lib/actions/auth.test.ts` using `bun:test`.
   - Test cases: Successful login, incorrect credentials, and invalid role selection.

---

## Acceptance Criteria

- [ ] A user can successfully log in using their identifier (NIM/NIK) and password.
- [ ] The system correctly distinguishes between `student` and `lecturer` roles during or after login.
- [ ] Authentication state persists across page refreshes (via Better Auth session cookies).
- [ ] Errors (e.g., "Invalid credentials") are displayed clearly in the UI.
- [ ] Integration tests pass with `bun test`.
- [ ] Successful login redirects the user to the dashboard.

---

## Out of Scope

- Implementing the "Forgot Password" flow.
- Implementing OAuth providers (GitHub, Google, etc.).
- Creating the full content of the Dashboard (just a redirect is enough).

---

## Notes

- **Credential Mapping**: Since Better Auth defaults to `email`, you may need to treat the `NIM/NIK` as the email string internally (e.g., `12345@pylearn.local`) or use Better Auth's custom credential support.
- **Middleware**: Ensure `src/middleware.ts` is configured to protect the `/dashboard` route and redirect unauthenticated users back to `/`.
- **References**:
  - `src/lib/auth-client.ts` for client-side auth methods.
  - `src/lib/validations/index.ts` for Zod schemas.
