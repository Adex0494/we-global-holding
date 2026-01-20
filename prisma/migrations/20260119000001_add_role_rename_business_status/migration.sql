-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'DENIED');

-- Add role column with default USER
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';

-- Add businessStatus column by copying from accessStatus
ALTER TABLE "User" ADD COLUMN "businessStatus" "BusinessStatus" NOT NULL DEFAULT 'NONE';

-- Copy existing accessStatus values to businessStatus
UPDATE "User" SET "businessStatus" =
    CASE "accessStatus"::text
        WHEN 'NONE' THEN 'NONE'::"BusinessStatus"
        WHEN 'PENDING' THEN 'PENDING'::"BusinessStatus"
        WHEN 'APPROVED' THEN 'APPROVED'::"BusinessStatus"
        WHEN 'DENIED' THEN 'DENIED'::"BusinessStatus"
    END;

-- Drop the old accessStatus column
ALTER TABLE "User" DROP COLUMN "accessStatus";

-- Drop the old AccessStatus enum
DROP TYPE "AccessStatus";
