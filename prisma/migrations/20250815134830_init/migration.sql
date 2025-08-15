-- CreateTable
CREATE TABLE "public"."Package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inclusions" JSONB NOT NULL,
    "Price" JSONB NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);
