import "dotenv/config";
import { RoleRepository } from "@/features/auth/backend/repositories/role.repository";
import { AuthRepository } from "@/features/auth/backend/repositories/auth.repository";
import { db } from "@/shared/db";
import { user, account } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@better-auth/utils/password";

async function main() {
  console.log("Starting database seed...");

  // 1. Seed Roles
  await RoleRepository.seedIfEmpty();
  const roles = await RoleRepository.findAll();
  const mahasiswaRole = roles.find((r) => r.name === "Mahasiswa");
  const dosenRole = roles.find((r) => r.name === "Dosen");

  if (!mahasiswaRole || !dosenRole) {
    throw new Error("Roles not found after seeding");
  }

  // 2. Seed Users
  console.log("Seeding users...");

  // Check if users already exist to avoid duplicates
  const existingUsers = await db.select().from(user).limit(1);
  if (existingUsers.length > 0) {
    console.log("Users already exist, skipping user seed");
  } else {
    const now = new Date();
    const passwordHash = await hashPassword("password123");

    // Seed 10 Mahasiswa
    for (let i = 1; i <= 10; i++) {
      const id = crypto.randomUUID();
      const nim = `22000${i.toString().padStart(2, "0")}`;
      const email = `student${i}@pylearn.com`;
      
      await db.insert(user).values({
        id,
        userId: nim,
        name: `Mahasiswa ${i}`,
        email,
        emailVerified: true,
        roleId: mahasiswaRole.id,
        createdAt: now,
        updatedAt: now,
      });

      await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: id,
        providerId: "credential",
        userId: id,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Seed 5 Dosen
    for (let i = 1; i <= 5; i++) {
      const id = crypto.randomUUID();
      const nik = `11000${i.toString().padStart(2, "0")}`;
      const email = `lecturer${i}@pylearn.com`;

      await db.insert(user).values({
        id,
        userId: nik,
        name: `Dosen ${i}`,
        email,
        emailVerified: true,
        roleId: dosenRole.id,
        createdAt: now,
        updatedAt: now,
      });

      await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: id,
        providerId: "credential",
        userId: id,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      });
    }

    console.log("10 Mahasiswa and 5 Dosen seeded successfully (Password: password123)");
  }

  console.log("Seed completed successfully!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
