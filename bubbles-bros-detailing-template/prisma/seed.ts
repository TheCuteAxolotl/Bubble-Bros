import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.OWNER_EMAIL || process.env.NEXT_PUBLIC_OWNER_EMAIL || "kongkaeow5@gmail.com";
  const password = process.env.OWNER_PASSWORD;
  const name = process.env.OWNER_NAME || "Bubbles & Bros. Owner";
  if (!password) throw new Error("Set OWNER_PASSWORD before running npm run seed.");
  if (password.length < 12) throw new Error("OWNER_PASSWORD should be at least 12 characters.");
  const hashed = await bcryptjs.hash(password, 10);
  await prisma.user.upsert({ where:{ email:email.toLowerCase() }, update:{ password:hashed, name, role:"owner" }, create:{ email:email.toLowerCase(), password:hashed, name, role:"owner" } });
  console.log(`Owner account is ready: ${email.toLowerCase()}`);
}
main().finally(()=>prisma.$disconnect());
