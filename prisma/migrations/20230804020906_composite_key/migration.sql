/*
  Warnings:

  - The primary key for the `userrole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userrole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userrole` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `boardId`);
