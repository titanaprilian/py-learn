import "dotenv/config";
import { RoleRepository } from "@/features/auth/backend/repositories/role.repository";

async function main() {
  console.log("Starting database seed...");

  await RoleRepository.seedIfEmpty();

  console.log("Seed completed successfully!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

