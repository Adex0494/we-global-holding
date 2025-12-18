-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('LLC', 'CORP', 'SRL', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateTable
CREATE TABLE "BusinessAccessRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "legalCompanyName" TEXT NOT NULL,
    "incorporationCountry" TEXT NOT NULL,
    "incorporationState" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "companyType" "CompanyType" NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "website" TEXT,
    "corporateEmail" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "socialLink" TEXT,
    "representativeName" TEXT NOT NULL,
    "representativePosition" TEXT NOT NULL,
    "interestExplanation" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessAccessRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessAccessRequest" ADD CONSTRAINT "BusinessAccessRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
