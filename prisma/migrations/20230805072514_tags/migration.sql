-- DropIndex
DROP INDEX `UserRole_userId_boardId_key` ON `userrole`;

-- AlterTable
ALTER TABLE `board` ADD COLUMN `tagId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userrole` ADD PRIMARY KEY (`userId`, `boardId`);

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `boardId` INTEGER NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
