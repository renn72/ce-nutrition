PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer NOT NULL,
	`user_plan_id` integer,
	`daily_meal_id` integer,
	`name` text,
	`meal_index` integer,
	`recipe_index` integer,
	`alternate_id` integer,
	`serve` text,
	`serve_unit` text,
	`note` text,
	`daily_log_id` integer,
	`is_user_created` integer DEFAULT false,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_plan_id`) REFERENCES `user_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`alternate_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_ingredient`("id", "created_at", "updated_at", "ingredient_id", "user_plan_id", "daily_meal_id", "name", "meal_index", "recipe_index", "alternate_id", "serve", "serve_unit", "note", "daily_log_id", "is_user_created") SELECT "id", "created_at", "updated_at", "ingredient_id", "user_plan_id", "daily_meal_id", "name", "meal_index", "recipe_index", "alternate_id", "serve", "serve_unit", "note", "daily_log_id", "is_user_created" FROM `user_ingredient`;--> statement-breakpoint
DROP TABLE `user_ingredient`;--> statement-breakpoint
ALTER TABLE `__new_user_ingredient` RENAME TO `user_ingredient`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `user_ingredient_daily_meal_id_index` ON `user_ingredient` (`daily_meal_id`);--> statement-breakpoint
CREATE INDEX `user_ingredient_user_plan_id_idx` ON `user_ingredient` (`user_plan_id`);--> statement-breakpoint
CREATE INDEX `user_ingredient_daily_log_id_idx` ON `user_ingredient` (`daily_log_id`);