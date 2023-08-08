/*
  Warnings:

  - The primary key for the `userrole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,boardId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userrole` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `UserRole_userId_boardId_key` ON `UserRole`(`userId`, `boardId`);
