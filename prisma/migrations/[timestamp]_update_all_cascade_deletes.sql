-- Drop existing foreign key constraints
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_recipeId_fkey`;
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_userId_fkey`;
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_userId_fkey`;

-- Add new foreign key constraints with CASCADE delete
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_recipeId_fkey`
FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey`
FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_userId_fkey`
FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
