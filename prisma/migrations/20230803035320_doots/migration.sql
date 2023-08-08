/*
  Warnings:

  - Added the required column `doots` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `doots` INTEGER NOT NULL;
