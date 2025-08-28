// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"], // add "query" temporarily if you want to see SQL
  });

if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
