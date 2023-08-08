-- DropIndex
DROP INDEX `Board_userId_fkey` ON `board`;

-- DropIndex
DROP INDEX `Comment_postId_key` ON `comment`;

-- DropIndex
DROP INDEX `Comment_userId_key` ON `comment`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- DropIndex
DROP INDEX `Post_boardId_fkey` ON `post`;

-- DropIndex
DROP INDEX `ReportedUser_reportedUserId_fkey` ON `reporteduser`;

-- DropIndex
DROP INDEX `Tag_boardId_fkey` ON `tag`;

-- DropIndex
DROP INDEX `UserRole_userId_key` ON `userrole`;

-- CreateIndex
CREATE INDEX `UserRole_userId_idx` ON `UserRole`(`userId`);

-- RenameIndex
ALTER TABLE `userrole` RENAME INDEX `UserRole_boardId_fkey` TO `UserRole_boardId_idx`;
