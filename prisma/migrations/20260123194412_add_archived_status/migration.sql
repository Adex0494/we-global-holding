-- AlterEnum
ALTER TYPE "RequestStatus" ADD VALUE 'ARCHIVED';

-- CreateIndex
CREATE INDEX "BusinessAccessRequest_userId_status_idx" ON "BusinessAccessRequest"("userId", "status");
