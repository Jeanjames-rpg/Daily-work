-- CreateEnum
CREATE TYPE "CouponRedemptionStatus" AS ENUM ('RESERVED', 'REDEMED', 'RELEASED');

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "reservedCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CouponRedemption" ADD COLUMN     "status" "CouponRedemptionStatus" NOT NULL DEFAULT 'RESERVED';
