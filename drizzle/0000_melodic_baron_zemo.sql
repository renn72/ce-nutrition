CREATE TABLE `ce-nu_grocery_store` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text,
	`locations` text
);
--> statement-breakpoint
CREATE TABLE `ce-nu_ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	`is_aus_food` integer,
	`is_all_stores` integer DEFAULT true,
	`serve_size` text,
	`serve_unit` text,
	`public_food_key` text,
	`classification` text,
	`food_name` text,
	`name` text,
	`calories_w_fibre` text,
	`calories_wo_fibre` text,
	`protein` text,
	`fat_total` text,
	`total_dietary_fibre` text,
	`total_sugars` text,
	`starch` text,
	`resistant_starch` text,
	`available_carbohydrate_without_sugar_alcohols` text,
	`available_carbohydrate_with_sugar_alcohols` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ingredient_food_key_idx` ON `ce-nu_ingredient` (`public_food_key`);--> statement-breakpoint
CREATE INDEX `ingredient_food_name_idx` ON `ce-nu_ingredient` (`food_name`);--> statement-breakpoint
CREATE TABLE `ce-nu_ingredient_addition_one` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer,
	`energy_with_dietary_fibre` text,
	`energy_without_dietary_fibre` text,
	`added_sugars` text,
	`free_sugars` text,
	`moisture` text,
	`nitrogen` text,
	`alcohol` text,
	`fructose` text,
	`glucose` text,
	`sucrose` text,
	`maltose` text,
	`lactose` text,
	`galactose` text,
	`maltotrios` text,
	`ash` text,
	`dextrin` text,
	`glycerol` text,
	`glycogen` text,
	`inulin` text,
	`erythritol` text,
	`maltitol` text,
	`mannitol` text,
	`xylitol` text,
	`maltodextrin` text,
	`oligosaccharides` text,
	`polydextrose` text,
	`raffinose` text,
	`stachyose` text,
	`sorbitol` text,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_ingredient_addition_three` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer,
	`total_saturated_fatty_acids` text,
	`total_monounsaturated_fatty_acids` text,
	`total_polyunsaturated_fatty_acids` text,
	`total_long_chain_omega_3_fatty_acids` text,
	`total_trans_fatty_acids` text,
	`caffeine` text,
	`cholesterol` text,
	`alanine` text,
	`arginine` text,
	`aspartic_acid` text,
	`cystine_plus_cysteine` text,
	`glutamic_acid` text,
	`glycine` text,
	`histidine` text,
	`isoleucine` text,
	`leucine` text,
	`lysine` text,
	`methionine` text,
	`phenylalanine` text,
	`proline` text,
	`serine` text,
	`threonine` text,
	`tyrosine` text,
	`tryptophan` text,
	`valine` text,
	`c4` text,
	`c6` text,
	`c8` text,
	`c10` text,
	`c11` text,
	`c12` text,
	`c13` text,
	`c14` text,
	`c15` text,
	`c16` text,
	`c17` text,
	`c18` text,
	`c19` text,
	`c20` text,
	`c21` text,
	`c22` text,
	`c23` text,
	`c24` text,
	`total_saturated_fatty_acids_equated` text,
	`c10_1` text,
	`c12_1` text,
	`c14_1` text,
	`c15_1` text,
	`c16_1` text,
	`c17_1` text,
	`c18_1` text,
	`c18_1w5` text,
	`c18_1w6` text,
	`c18_1w7` text,
	`c18_1w9` text,
	`c20_1` text,
	`c20_1w9` text,
	`c20_1w13` text,
	`c20_1w11` text,
	`c22_1` text,
	`c22_1w9` text,
	`c22_1w11` text,
	`c24_1` text,
	`c24_1w9` text,
	`c24_1w11` text,
	`c24_1w13` text,
	`total_monounsaturated_fatty_acids_equated` text,
	`c12_2` text,
	`c16_2w4` text,
	`c16_3` text,
	`c18_2w6` text,
	`c18_3w3` text,
	`c18_3w4` text,
	`c18_3w6` text,
	`c18_4w1` text,
	`c18_4w3` text,
	`c20_2` text,
	`c20_2w6` text,
	`c20_3` text,
	`c20_3w3` text,
	`c20_3w6` text,
	`c20_4` text,
	`c20_4w3` text,
	`c20_4w6` text,
	`c20_5w3` text,
	`c21_5w3` text,
	`c22_2` text,
	`c22_2w6` text,
	`c22_4w6` text,
	`c22_5w3` text,
	`c22_5w6` text,
	`c22_6w3` text,
	`total_polyunsaturated_fatty_acids_equated` text,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_ingredient_addition_two` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer,
	`acetic_acid` text,
	`citric_acid` text,
	`fumaric_acid` text,
	`lactic_acid` text,
	`malic_acid` text,
	`oxalic_acid` text,
	`propionic_acid` text,
	`quinic_acid` text,
	`shikimic_acid` text,
	`succinic_acid` text,
	`tartaric_acid` text,
	`aluminium` text,
	`antimony` text,
	`arsenic` text,
	`cadmium` text,
	`calcium` text,
	`chromium` text,
	`chloride` text,
	`cobalt` text,
	`copper` text,
	`fluoride` text,
	`iodine` text,
	`iron` text,
	`lead` text,
	`magnesium` text,
	`manganese` text,
	`mercury` text,
	`molybdenum` text,
	`nickel` text,
	`phosphorus` text,
	`potassium` text,
	`selenium` text,
	`sodium` text,
	`sulphur` text,
	`tin` text,
	`zinc` text,
	`retinol` text,
	`alpha_carotene` text,
	`beta_carotene` text,
	`cryptoxanthin` text,
	`beta_carotene_equivalents` text,
	`vitamin_a_retinol_equivalents` text,
	`lutein` text,
	`lycopene` text,
	`xanthophyl` text,
	`thiamin` text,
	`riboflavin` text,
	`niacin` text,
	`niacin_derived_from_tryptophan` text,
	`niacin_derived_equivalents` text,
	`pantothenic_acid` text,
	`pyridoxine` text,
	`biotin` text,
	`cobalamin` text,
	`folate_natural` text,
	`folic_acid` text,
	`total_folates` text,
	`dietary_folate_equivalents` text,
	`vitamin_c` text,
	`cholecalciferol` text,
	`ergocalciferol` text,
	`hydroxy_cholecalciferol` text,
	`hydroxy_ergocalciferol` text,
	`vitamin_d_equivalents` text,
	`alpha_tocopherol` text,
	`alpha_tocotrienol` text,
	`beta_tocopherol` text,
	`beta_tocotrienol` text,
	`delta_tocopherol` text,
	`delta_tocotrienol` text,
	`gamma_tocopherol` text,
	`gamma_tocotrienol` text,
	`vitamin_e` text,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_ingredient_to_grocery_store` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`ingredient_id` integer,
	`grocery_store_id` integer,
	FOREIGN KEY (`grocery_store_id`) REFERENCES `ce-nu_grocery_store`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`plan_id` integer,
	`name` text,
	`description` text,
	`image` text,
	`notes` text,
	`creator_id` text,
	`meal_category` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	`vege_notes` text,
	`vege` text,
	`vege_calories` text,
	`index` integer,
	`calories` text,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`plan_id`) REFERENCES `ce-nu_plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_meal_to_recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`recipe_id` integer,
	`index` integer NOT NULL,
	`note` text,
	FOREIGN KEY (`recipe_id`) REFERENCES `ce-nu_recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_meal_to_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`vege_stack_id` integer,
	`calories` text,
	`note` text,
	FOREIGN KEY (`vege_stack_id`) REFERENCES `ce-nu_vege_stack`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text,
	`veges` text,
	`notes` text,
	`calories` text
);
--> statement-breakpoint
CREATE TABLE `ce-nu_notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`title` text,
	`description` text,
	`is_read` integer,
	`is_viewed` integer,
	`is_deleted` integer,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `notification_user_id_idx` ON `ce-nu_notification` (`user_id`);--> statement-breakpoint
CREATE TABLE `ce-nu_plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text,
	`description` text,
	`image` text,
	`notes` text,
	`number_of_meals` integer,
	`creator_id` text,
	`recipe_category` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`plan_id`) REFERENCES `ce-nu_plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`notes` text NOT NULL,
	`calories` integer NOT NULL,
	`creator_id` text NOT NULL,
	`recipe_category` text NOT NULL,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_recipe_to_ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`recipe_id` integer NOT NULL,
	`ingredient_id` integer NOT NULL,
	`index` integer NOT NULL,
	`alternate_id` integer,
	`serve` text NOT NULL,
	`serve_unit` text NOT NULL,
	`note` text,
	FOREIGN KEY (`alternate_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipe_id`) REFERENCES `ce-nu_recipe`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_calories_with_fibre` integer
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer,
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
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`alternate_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `ce-nu_daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_plan_id` integer NOT NULL,
	`index` integer,
	`meal_title` text,
	`calories` text,
	`protein` text,
	`target_protein` text,
	`target_calories` text,
	`vege_calories` text,
	`veges` text,
	`vege_notes` text,
	`note` text,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`finished_at` integer,
	`start_at` integer,
	`is_active` integer,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`notes` text NOT NULL,
	`number_of_meals` integer,
	`creator_id` text NOT NULL,
	`user_id` text NOT NULL,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-recipe` (
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
	`is_log` integer,
	`daily_log_id` integer,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `ce-nu_daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_account` (
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
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `ce-nu_account` (`user_id`);--> statement-breakpoint
CREATE TABLE `ce-nu_daily_meal` (
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
CREATE TABLE `ce-nu_poop_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text,
	`name` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `ce-nu_session` (`userId`);--> statement-breakpoint
CREATE TABLE `ce-nu_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text,
	`first_name` text,
	`last_name` text,
	`clerk_id` text,
	`birth_date` integer,
	`gender` text,
	`address` text,
	`notes` text,
	`instagram` text,
	`open_lifter` text,
	`phone` text,
	`email` text,
	`email_verified` integer,
	`password` text,
	`current_plan_id` integer,
	`image` text,
	`is_fake` integer DEFAULT false,
	`is_trainer` integer DEFAULT false,
	`is_root` integer DEFAULT false,
	`is_creator` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `ce-nu_user` (`email`);--> statement-breakpoint
CREATE INDEX `clerk_id_idx` ON `ce-nu_user` (`clerk_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ce-nu_user` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `ce-nu_user_email_unique` ON `ce-nu_user` (`email`);--> statement-breakpoint
CREATE TABLE `ce-nu_user_to_trainer` (
	`user_id` text NOT NULL,
	`trainer_id` text NOT NULL,
	FOREIGN KEY (`trainer_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `ce-nu_water_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`water` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_weigh_in` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`trainer_id` text NOT NULL,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`body_weight` text,
	`lean_mass` text,
	`body_fat` text,
	`blood_pressure` text,
	`image` text,
	`notes` text,
	FOREIGN KEY (`trainer_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`task` text,
	`notes` text,
	`user` text,
	`object_id` integer,
	`user_id` text
);
--> statement-breakpoint
CREATE TABLE `ce-nu_daily_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`morning_weight` text,
	`notes` text,
	`fasted_blood_glucose` text,
	`sleep` text,
	`sleep_quality` text,
	`is_hiit` integer,
	`is_cardio` integer,
	`is_lift` integer,
	`is_liss` integer,
	`image` text,
	`waist_measurement` text,
	`nap` text,
	`hiit` text,
	`cardio` text,
	`weight` text,
	`liss` text,
	`cardio_type` text,
	`is_starred` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `date_idx` ON `ce-nu_daily_log` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`default_water` text,
	`default_chart_range` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_skinfold` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`chin` text,
	`cheek` text,
	`lower_abdominal` text,
	`pectoral` text,
	`biceps` text,
	`triceps` text,
	`subscapular` text,
	`mid_axillary` text,
	`suprailiac` text,
	`umbilical` text,
	`lower_back` text,
	`quadriceps` text,
	`hamstrings` text,
	`medial_calf` text,
	`knee` text,
	`shoulder` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `skinfold_date_idx` ON `ce-nu_skinfold` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_body_fat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_fat` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `body_fat_date_idx` ON `ce-nu_body_fat` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_body_weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_weight` text,
	`source` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `body_weight_date_idx` ON `ce-nu_body_weight` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_lean_mass` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`lean_mass` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`skinfold_id`) REFERENCES `ce-nu_skinfold`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `lean_mass_date_idx` ON `ce-nu_lean_mass` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`subject` text,
	`is_important` integer,
	`is_read` integer,
	`is_viewed` integer,
	`is_deleted` integer,
	`message` text,
	`image` text,
	`from_user_id` text,
	FOREIGN KEY (`from_user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `message_from_user_id_idx` ON `ce-nu_message` (`from_user_id`);--> statement-breakpoint
CREATE INDEX `message_user_id_idx` ON `ce-nu_message` (`user_id`);--> statement-breakpoint
CREATE TABLE `ce-nu_tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_tag_to_daily_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tag_id` integer NOT NULL,
	`daily_log_id` integer NOT NULL,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `ce-nu_tag`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `__drizzle_migrations` (

);
