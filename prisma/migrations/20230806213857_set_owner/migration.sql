-- AlterTable
ALTER TABLE `board` ADD COLUMN `longDescription` VARCHAR(191) NULL,
    ADD COLUMN `motd` VARCHAR(191) NULL,
    ADD COLUMN `rules` VARCHAR(191) NULL,
    ADD COLUMN `shortDescription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reported` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `userrole` ADD COLUMN `banned` BOOLEAN NULL,
    ADD COLUMN `timeoutLength` INTEGER NULL,
    ADD COLUMN `timeoutStart` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `ReportedUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reportedUserId` INTEGER NOT NULL,
    `reportedBy` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReportedUser` ADD CONSTRAINT `ReportedUser_reportedUserId_fkey` FOREIGN KEY (`reportedUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
