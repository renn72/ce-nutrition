CREATE TABLE `ce-nu_plan_to_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`plan_id` integer,
	`meal_id` integer,
	`index` integer,
	`meal_title` text,
	`calories` text,
	`vege_calories` text,
	`note` text,
	FOREIGN KEY (`plan_id`) REFERENCES `ce-nu_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade
);
