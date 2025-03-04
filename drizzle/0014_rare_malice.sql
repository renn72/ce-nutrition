PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ce-nu_body_fat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_fat` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_body_fat`("id", "created_at", "user_id", "date", "body_fat", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "body_fat", "notes", "skinfold_id" FROM `ce-nu_body_fat`;--> statement-breakpoint
DROP TABLE `ce-nu_body_fat`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_body_fat` RENAME TO `ce-nu_body_fat`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `body_fat_date_idx` ON `ce-nu_body_fat` (`date`);--> statement-breakpoint
CREATE TABLE `__new_ce-nu_body_weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_weight` text,
	`source` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_body_weight`("id", "created_at", "user_id", "date", "body_weight", "source", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "body_weight", "source", "notes", "skinfold_id" FROM `ce-nu_body_weight`;--> statement-breakpoint
DROP TABLE `ce-nu_body_weight`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_body_weight` RENAME TO `ce-nu_body_weight`;--> statement-breakpoint
CREATE INDEX `body_weight_date_idx` ON `ce-nu_body_weight` (`date`);--> statement-breakpoint
CREATE TABLE `__new_ce-nu_lean_mass` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`lean_mass` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_lean_mass`("id", "created_at", "user_id", "date", "lean_mass", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "lean_mass", "notes", "skinfold_id" FROM `ce-nu_lean_mass`;--> statement-breakpoint
DROP TABLE `ce-nu_lean_mass`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_lean_mass` RENAME TO `ce-nu_lean_mass`;--> statement-breakpoint
CREATE INDEX `lean_mass_date_idx` ON `ce-nu_lean_mass` (`date`);