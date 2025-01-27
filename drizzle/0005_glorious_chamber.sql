DROP INDEX "ingredient_food_name_idx";--> statement-breakpoint
DROP INDEX "ingredient_food_key_idx";--> statement-breakpoint
DROP INDEX "notification_user_id_idx";--> statement-breakpoint
DROP INDEX "account_user_id_idx";--> statement-breakpoint
DROP INDEX "session_userId_idx";--> statement-breakpoint
DROP INDEX "ce-nu_user_email_unique";--> statement-breakpoint
DROP INDEX "name_idx";--> statement-breakpoint
DROP INDEX "clerk_id_idx";--> statement-breakpoint
DROP INDEX "email_idx";--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` ALTER COLUMN "date" TO "date" text NOT NULL;--> statement-breakpoint
CREATE INDEX `ingredient_food_name_idx` ON `ce-nu_ingredient` (`food_name`);--> statement-breakpoint
CREATE INDEX `ingredient_food_key_idx` ON `ce-nu_ingredient` (`public_food_key`);--> statement-breakpoint
CREATE INDEX `notification_user_id_idx` ON `ce-nu_notification` (`user_id`);--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `ce-nu_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `ce-nu_session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `ce-nu_user_email_unique` ON `ce-nu_user` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ce-nu_user` (`name`);--> statement-breakpoint
CREATE INDEX `clerk_id_idx` ON `ce-nu_user` (`clerk_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `ce-nu_user` (`email`);--> statement-breakpoint
ALTER TABLE `ce-nu_user-recipe` DROP COLUMN `ingredient_blob`;