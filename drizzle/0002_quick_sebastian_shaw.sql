PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ce-nu_user-recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`meal_index` integer,
	`recipe_index` integer,
	`user_plan_id` integer,
	`daily_meal_id` integer,
	`name` text,
	`index` integer,
	`serve` text,
	`serve_unit` text,
	`note` text,
	`ingredient_blob` text,
	`is_log` integer,
	`daily_log_id` integer,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `ce-nu_daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_user-recipe`("id", "created_at", "updated_at", "meal_index", "recipe_index", "user_plan_id", "daily_meal_id", "name", "index", "serve", "serve_unit", "note", "ingredient_blob", "is_log", "daily_log_id") SELECT "id", "created_at", "updated_at", "meal_index", "recipe_index", "user_plan_id", "daily_meal_id", "name", "index", "serve", "serve_unit", "note", "ingredient_blob", "is_log", "daily_log_id" FROM `ce-nu_user-recipe`;--> statement-breakpoint
DROP TABLE `ce-nu_user-recipe`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_user-recipe` RENAME TO `ce-nu_user-recipe`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_ce-nu_daily_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`meal_index` integer,
	`date` integer,
	`recipe_id` integer,
	`vege_calories` text,
	`veges` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_daily_meal`("id", "created_at", "daily_log_id", "meal_index", "date", "recipe_id", "vege_calories", "veges") SELECT "id", "created_at", "daily_log_id", "meal_index", "date", "recipe_id", "vege_calories", "veges" FROM `ce-nu_daily_meal`;--> statement-breakpoint
DROP TABLE `ce-nu_daily_meal`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_daily_meal` RENAME TO `ce-nu_daily_meal`;