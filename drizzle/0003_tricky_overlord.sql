DROP INDEX `date_idx`;--> statement-breakpoint
DROP INDEX `ingredient_food_name_idx`;--> statement-breakpoint
DROP INDEX `ingredient_food_key_idx`;--> statement-breakpoint
DROP INDEX `message_user_id_idx`;--> statement-breakpoint
DROP INDEX `message_from_user_id_idx`;--> statement-breakpoint
DROP INDEX `body_fat_date_idx`;--> statement-breakpoint
DROP INDEX `body_weight_date_idx`;--> statement-breakpoint
DROP INDEX `lean_mass_date_idx`;--> statement-breakpoint
DROP INDEX `skinfold_date_idx`;--> statement-breakpoint
DROP INDEX `notification_user_id_idx`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_account` (
	`user_id` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`provider_account_id` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_account`("user_id", "type", "provider", "provider_account_id", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state") SELECT "user_id", "type", "provider", "provider_account_id", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state" FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `session_userId_idx`;--> statement-breakpoint
DROP INDEX `name_idx`;--> statement-breakpoint
DROP INDEX `clerk_id_idx`;