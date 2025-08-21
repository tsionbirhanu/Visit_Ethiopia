import { PrismaClient } from "@prisma/client";
import ISO6391 from "iso-639-1";

const prisma = new PrismaClient();

async function main() {
  const codes = ISO6391.getAllCodes();
  const languages = codes.map((code) => ({
    code,
    name: ISO6391.getName(code),
  }));

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: {},
      create: lang,
    });
  }

  console.log(`Seeded ${languages.length} languages ✅`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
