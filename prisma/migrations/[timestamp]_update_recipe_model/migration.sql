-- Check if mood column exists and drop it if it does
SET @exist := (SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'Recipe'
    AND COLUMN_NAME = 'mood'
    AND TABLE_SCHEMA = DATABASE());

SET @query := IF(@exist > 0,
    'ALTER TABLE `Recipe` DROP COLUMN `mood`',
    'SELECT 1');

PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add cuisine column if it doesn't exist
SET @exist := (SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'Recipe'
    AND COLUMN_NAME = 'cuisine'
    AND TABLE_SCHEMA = DATABASE());

SET @query := IF(@exist = 0,
    'ALTER TABLE `Recipe` ADD COLUMN `cuisine` VARCHAR(191) NOT NULL DEFAULT "international"',
    'SELECT 1');

PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
