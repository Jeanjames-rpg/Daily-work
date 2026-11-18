/*
  Warnings:

  - The values [REDEMED] on the enum `CouponRedemptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CouponRedemptionStatus_new" AS ENUM ('RESERVED', 'REDEEMED', 'RELEASED');
ALTER TABLE "public"."CouponRedemption" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "CouponRedemption" ALTER COLUMN "status" TYPE "CouponRedemptionStatus_new" USING ("status"::text::"CouponRedemptionStatus_new");
ALTER TYPE "CouponRedemptionStatus" RENAME TO "CouponRedemptionStatus_old";
ALTER TYPE "CouponRedemptionStatus_new" RENAME TO "CouponRedemptionStatus";
DROP TYPE "public"."CouponRedemptionStatus_old";
ALTER TABLE "CouponRedemption" ALTER COLUMN "status" SET DEFAULT 'RESERVED';
COMMIT;
