# Refactor User Table: Replace String Role with Role ID

> **For the implementer:** This issue is self-contained. Read it fully before starting. If anything is unclear, re-read the Notes section before asking.

---

## Overview

Currently, the `user` table stores the user's role as a string (`varchar`) in the `role` column, which is manually kept in sync with the `role` table's `name` column. This lacks database-level integrity. We need to refactor the `user` table to use a `role_id` column that properly references the `role` table's primary key (`id`).

---

## Scope

This affects the database schema in `src/shared/db/schema.ts`, database migrations, and all backend/frontend logic that relies on the `user.role` field.

---

## Tasks

1. **Schema Update:**
    - Modify `src/shared/db/schema.ts`:
        - Rename `role` column in the `user` table to `role_id`.
        - Change its type from `varchar` to `integer`.
        - Add a foreign key reference: `.references(() => role.id)`.
    - Update `userRoleRelations` to use `user.roleId` and `role.id`.
2. **Migration:**
    - Generate a new migration using `bun db:generate`.
    - **Note:** Since this is a breaking change, existing data (if any) might need a manual migration script or be cleared if in development.
3. **Repository/Service Updates:**
    - Update `AuthRepository` and `AuthService` to handle `role_id` instead of `role`.
    - **Crucial:** Since we often need the role *name* (e.g., "Mahasiswa", "Dosen") for logic, ensure that queries joining the `role` table are used where necessary, or update the logic to compare IDs.
4. **Auth Logic Updates:**
    - Update `AuthService.resolveIdentifier` and `AuthService.login` to use the role relationship or compare against the `role_id`.
    - Update `role.middleware.ts` to check `user.roleId`.
5. **Seeding:**
    - Update `src/shared/db/seed.ts` to include a seeder for the `user` table.
    - Create 10 "Mahasiswa" accounts and 5 "Dosen" accounts with predictable passwords for testing.
    - Ensure passwords are hashed correctly (Better Auth uses bcrypt or similar, but for seeding you might need to use the auth API or a compatible hashing lib).
6. **Frontend/Type Updates:**
    - Update `UserDTO` in `src/features/auth/shared/types/user.types.ts` (if it exists) to reflect the change.
    - Update `useAuth` hook and any components using `user.role`.

---

## Acceptance Criteria

- [ ] The `user` table in the database has a `role_id` column of type `integer`.
- [ ] The `role_id` column has a foreign key constraint referencing `role.id`.
- [ ] Login functionality still works correctly for both "Mahasiswa" and "Dosen".
- [ ] 10 Mahasiswa and 5 Dosen accounts are successfully seeded into the database.
- [ ] `AuthService` correctly validates that a user has the selected role during login.
- [ ] All TypeScript errors related to `user.role` are resolved.
- [ ] The project builds successfully with `bun run build`.

---

## Out of Scope

- Adding new roles.
- Changing the `Better Auth` configuration beyond what is necessary to support the schema change.

---

## Notes

- You may need to update the `betterAuth` adapter configuration if it explicitly maps the `role` field.
- Check `AuthRepository.findByIdentifier` to see if it needs to `.leftJoin` the `role` table to provide the role name to the service layer.
- Existing `ROLES` constants in `src/features/auth/shared/constants/roles.ts` are strings ("Mahasiswa", "Dosen"). You might need to fetch the IDs from the database or map them.
