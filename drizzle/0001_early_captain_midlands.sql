ALTER TABLE `ce-nu_daily_log` RENAME TO `daily_log`;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_meal` RENAME TO `daily_meal`;--> statement-breakpoint
ALTER TABLE `ce-nu_poop_log` RENAME TO `poop_log`;--> statement-breakpoint
ALTER TABLE `ce-nu_tag` RENAME TO `tag`;--> statement-breakpoint
ALTER TABLE `ce-nu_tag_to_daily_log` RENAME TO `tag_to_daily_log`;--> statement-breakpoint
ALTER TABLE `ce-nu_water_log` RENAME TO `water_log`;--> statement-breakpoint
ALTER TABLE `ce-nu_grocery_store` RENAME TO `grocery_store`;--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient` RENAME TO `ingredient`;--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient_addition_one` RENAME TO `ingredient_addition_one`;--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient_addition_three` RENAME TO `ingredient_addition_three`;--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient_addition_two` RENAME TO `ingredient_addition_two`;--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient_to_grocery_store` RENAME TO `ingredient_to_grocery_store`;--> statement-breakpoint
ALTER TABLE `ce-nu_log` RENAME TO `log`;--> statement-breakpoint
ALTER TABLE `ce-nu_meal` RENAME TO `meal`;--> statement-breakpoint
ALTER TABLE `ce-nu_meal_to_recipe` RENAME TO `meal_to_recipe`;--> statement-breakpoint
ALTER TABLE `ce-nu_meal_to_vege_stack` RENAME TO `meal_to_vege_stack`;--> statement-breakpoint
ALTER TABLE `ce-nu_vege_stack` RENAME TO `vege_stack`;--> statement-breakpoint
ALTER TABLE `ce-nu_message` RENAME TO `message`;--> statement-breakpoint
ALTER TABLE `ce-nu_body_fat` RENAME TO `body_fat`;--> statement-breakpoint
ALTER TABLE `ce-nu_body_weight` RENAME TO `body_weight`;--> statement-breakpoint
ALTER TABLE `ce-nu_lean_mass` RENAME TO `lean_mass`;--> statement-breakpoint
ALTER TABLE `ce-nu_skinfold` RENAME TO `skinfold`;--> statement-breakpoint
ALTER TABLE `ce-nu_notification` RENAME TO `notification`;--> statement-breakpoint
ALTER TABLE `ce-nu_plan` RENAME TO `plan`;--> statement-breakpoint
ALTER TABLE `ce-nu_plan_to_meal` RENAME TO `plan_to_meal`;--> statement-breakpoint
ALTER TABLE `ce-nu_recipe` RENAME TO `recipe`;--> statement-breakpoint
ALTER TABLE `ce-nu_recipe_to_ingredient` RENAME TO `recipe_to_ingredient`;--> statement-breakpoint
ALTER TABLE `ce-nu_settings` RENAME TO `settings`;--> statement-breakpoint
ALTER TABLE `ce-nu_user-ingredient` RENAME TO `user_ingredient`;--> statement-breakpoint
ALTER TABLE `ce-nu_user-meal` RENAME TO `user_meal`;--> statement-breakpoint
ALTER TABLE `ce-nu_user-plan` RENAME TO `user_plan`;--> statement-breakpoint
ALTER TABLE `ce-nu_user-recipe` RENAME TO `user_recipe`;--> statement-breakpoint
ALTER TABLE `ce-nu_account` RENAME TO `account`;--> statement-breakpoint
ALTER TABLE `ce-nu_role` RENAME TO `role`;--> statement-breakpoint
ALTER TABLE `ce-nu_session` RENAME TO `session`;--> statement-breakpoint
ALTER TABLE `ce-nu_user` RENAME TO `user`;--> statement-breakpoint
ALTER TABLE `ce-nu_user_settings` RENAME TO `user_settings`;--> statement-breakpoint
ALTER TABLE `ce-nu_user_to_trainer` RENAME TO `user_to_trainer`;--> statement-breakpoint
ALTER TABLE `ce-nu_verification_token` RENAME TO `verification_token`;--> statement-breakpoint
ALTER TABLE `ce-nu_weigh_in` RENAME TO `weigh_in`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_daily_log` (
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
	`is_starred` integer DEFAULT false,
	`hiit` text,
	`cardio` text,
	`weight` text,
	`liss` text,
	`cardio_type` text,
	`image` text,
	`waist_measurement` text,
	`nap` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_daily_log`("id", "created_at", "updated_at", "user_id", "date", "morning_weight", "notes", "fasted_blood_glucose", "sleep", "sleep_quality", "is_hiit", "is_cardio", "is_lift", "is_liss", "is_starred", "hiit", "cardio", "weight", "liss", "cardio_type", "image", "waist_measurement", "nap") SELECT "id", "created_at", "updated_at", "user_id", "date", "morning_weight", "notes", "fasted_blood_glucose", "sleep", "sleep_quality", "is_hiit", "is_cardio", "is_lift", "is_liss", "is_starred", "hiit", "cardio", "weight", "liss", "cardio_type", "image", "waist_measurement", "nap" FROM `daily_log`;--> statement-breakpoint
DROP TABLE `daily_log`;--> statement-breakpoint
ALTER TABLE `__new_daily_log` RENAME TO `daily_log`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_daily_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`meal_index` integer,
	`date` integer,
	`recipe_id` integer,
	`vege_calories` text,
	`veges` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_daily_meal`("id", "created_at", "daily_log_id", "meal_index", "date", "recipe_id", "vege_calories", "veges") SELECT "id", "created_at", "daily_log_id", "meal_index", "date", "recipe_id", "vege_calories", "veges" FROM `daily_meal`;--> statement-breakpoint
DROP TABLE `daily_meal`;--> statement-breakpoint
ALTER TABLE `__new_daily_meal` RENAME TO `daily_meal`;--> statement-breakpoint
CREATE TABLE `__new_poop_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_poop_log`("id", "created_at", "daily_log_id") SELECT "id", "created_at", "daily_log_id" FROM `poop_log`;--> statement-breakpoint
DROP TABLE `poop_log`;--> statement-breakpoint
ALTER TABLE `__new_poop_log` RENAME TO `poop_log`;--> statement-breakpoint
CREATE TABLE `__new_tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tag`("id", "created_at", "name", "icon", "color", "user_id") SELECT "id", "created_at", "name", "icon", "color", "user_id" FROM `tag`;--> statement-breakpoint
DROP TABLE `tag`;--> statement-breakpoint
ALTER TABLE `__new_tag` RENAME TO `tag`;--> statement-breakpoint
CREATE TABLE `__new_tag_to_daily_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tag_id` integer NOT NULL,
	`daily_log_id` integer NOT NULL,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tag_to_daily_log`("id", "tag_id", "daily_log_id") SELECT "id", "tag_id", "daily_log_id" FROM `tag_to_daily_log`;--> statement-breakpoint
DROP TABLE `tag_to_daily_log`;--> statement-breakpoint
ALTER TABLE `__new_tag_to_daily_log` RENAME TO `tag_to_daily_log`;--> statement-breakpoint
CREATE TABLE `__new_water_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`water` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_water_log`("id", "created_at", "daily_log_id", "water") SELECT "id", "created_at", "daily_log_id", "water" FROM `water_log`;--> statement-breakpoint
DROP TABLE `water_log`;--> statement-breakpoint
ALTER TABLE `__new_water_log` RENAME TO `water_log`;--> statement-breakpoint
CREATE TABLE `__new_ingredient` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_ingredient`("id", "created_at", "updated_at", "user_id", "favourite_at", "deleted_at", "hidden_at", "is_aus_food", "is_all_stores", "serve_size", "serve_unit", "public_food_key", "classification", "food_name", "name", "calories_w_fibre", "calories_wo_fibre", "protein", "fat_total", "total_dietary_fibre", "total_sugars", "starch", "resistant_starch", "available_carbohydrate_without_sugar_alcohols", "available_carbohydrate_with_sugar_alcohols") SELECT "id", "created_at", "updated_at", "user_id", "favourite_at", "deleted_at", "hidden_at", "is_aus_food", "is_all_stores", "serve_size", "serve_unit", "public_food_key", "classification", "food_name", "name", "calories_w_fibre", "calories_wo_fibre", "protein", "fat_total", "total_dietary_fibre", "total_sugars", "starch", "resistant_starch", "available_carbohydrate_without_sugar_alcohols", "available_carbohydrate_with_sugar_alcohols" FROM `ingredient`;--> statement-breakpoint
DROP TABLE `ingredient`;--> statement-breakpoint
ALTER TABLE `__new_ingredient` RENAME TO `ingredient`;--> statement-breakpoint
CREATE TABLE `__new_ingredient_addition_one` (
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
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ingredient_addition_one`("id", "created_at", "updated_at", "ingredient_id", "energy_with_dietary_fibre", "energy_without_dietary_fibre", "added_sugars", "free_sugars", "moisture", "nitrogen", "alcohol", "fructose", "glucose", "sucrose", "maltose", "lactose", "galactose", "maltotrios", "ash", "dextrin", "glycerol", "glycogen", "inulin", "erythritol", "maltitol", "mannitol", "xylitol", "maltodextrin", "oligosaccharides", "polydextrose", "raffinose", "stachyose", "sorbitol") SELECT "id", "created_at", "updated_at", "ingredient_id", "energy_with_dietary_fibre", "energy_without_dietary_fibre", "added_sugars", "free_sugars", "moisture", "nitrogen", "alcohol", "fructose", "glucose", "sucrose", "maltose", "lactose", "galactose", "maltotrios", "ash", "dextrin", "glycerol", "glycogen", "inulin", "erythritol", "maltitol", "mannitol", "xylitol", "maltodextrin", "oligosaccharides", "polydextrose", "raffinose", "stachyose", "sorbitol" FROM `ingredient_addition_one`;--> statement-breakpoint
DROP TABLE `ingredient_addition_one`;--> statement-breakpoint
ALTER TABLE `__new_ingredient_addition_one` RENAME TO `ingredient_addition_one`;--> statement-breakpoint
CREATE TABLE `__new_ingredient_addition_three` (
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
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ingredient_addition_three`("id", "created_at", "updated_at", "ingredient_id", "total_saturated_fatty_acids", "total_monounsaturated_fatty_acids", "total_polyunsaturated_fatty_acids", "total_long_chain_omega_3_fatty_acids", "total_trans_fatty_acids", "caffeine", "cholesterol", "alanine", "arginine", "aspartic_acid", "cystine_plus_cysteine", "glutamic_acid", "glycine", "histidine", "isoleucine", "leucine", "lysine", "methionine", "phenylalanine", "proline", "serine", "threonine", "tyrosine", "tryptophan", "valine", "c4", "c6", "c8", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "total_saturated_fatty_acids_equated", "c10_1", "c12_1", "c14_1", "c15_1", "c16_1", "c17_1", "c18_1", "c18_1w5", "c18_1w6", "c18_1w7", "c18_1w9", "c20_1", "c20_1w9", "c20_1w13", "c20_1w11", "c22_1", "c22_1w9", "c22_1w11", "c24_1", "c24_1w9", "c24_1w11", "c24_1w13", "total_monounsaturated_fatty_acids_equated", "c12_2", "c16_2w4", "c16_3", "c18_2w6", "c18_3w3", "c18_3w4", "c18_3w6", "c18_4w1", "c18_4w3", "c20_2", "c20_2w6", "c20_3", "c20_3w3", "c20_3w6", "c20_4", "c20_4w3", "c20_4w6", "c20_5w3", "c21_5w3", "c22_2", "c22_2w6", "c22_4w6", "c22_5w3", "c22_5w6", "c22_6w3", "total_polyunsaturated_fatty_acids_equated") SELECT "id", "created_at", "updated_at", "ingredient_id", "total_saturated_fatty_acids", "total_monounsaturated_fatty_acids", "total_polyunsaturated_fatty_acids", "total_long_chain_omega_3_fatty_acids", "total_trans_fatty_acids", "caffeine", "cholesterol", "alanine", "arginine", "aspartic_acid", "cystine_plus_cysteine", "glutamic_acid", "glycine", "histidine", "isoleucine", "leucine", "lysine", "methionine", "phenylalanine", "proline", "serine", "threonine", "tyrosine", "tryptophan", "valine", "c4", "c6", "c8", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "total_saturated_fatty_acids_equated", "c10_1", "c12_1", "c14_1", "c15_1", "c16_1", "c17_1", "c18_1", "c18_1w5", "c18_1w6", "c18_1w7", "c18_1w9", "c20_1", "c20_1w9", "c20_1w13", "c20_1w11", "c22_1", "c22_1w9", "c22_1w11", "c24_1", "c24_1w9", "c24_1w11", "c24_1w13", "total_monounsaturated_fatty_acids_equated", "c12_2", "c16_2w4", "c16_3", "c18_2w6", "c18_3w3", "c18_3w4", "c18_3w6", "c18_4w1", "c18_4w3", "c20_2", "c20_2w6", "c20_3", "c20_3w3", "c20_3w6", "c20_4", "c20_4w3", "c20_4w6", "c20_5w3", "c21_5w3", "c22_2", "c22_2w6", "c22_4w6", "c22_5w3", "c22_5w6", "c22_6w3", "total_polyunsaturated_fatty_acids_equated" FROM `ingredient_addition_three`;--> statement-breakpoint
DROP TABLE `ingredient_addition_three`;--> statement-breakpoint
ALTER TABLE `__new_ingredient_addition_three` RENAME TO `ingredient_addition_three`;--> statement-breakpoint
CREATE TABLE `__new_ingredient_addition_two` (
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
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ingredient_addition_two`("id", "created_at", "updated_at", "ingredient_id", "acetic_acid", "citric_acid", "fumaric_acid", "lactic_acid", "malic_acid", "oxalic_acid", "propionic_acid", "quinic_acid", "shikimic_acid", "succinic_acid", "tartaric_acid", "aluminium", "antimony", "arsenic", "cadmium", "calcium", "chromium", "chloride", "cobalt", "copper", "fluoride", "iodine", "iron", "lead", "magnesium", "manganese", "mercury", "molybdenum", "nickel", "phosphorus", "potassium", "selenium", "sodium", "sulphur", "tin", "zinc", "retinol", "alpha_carotene", "beta_carotene", "cryptoxanthin", "beta_carotene_equivalents", "vitamin_a_retinol_equivalents", "lutein", "lycopene", "xanthophyl", "thiamin", "riboflavin", "niacin", "niacin_derived_from_tryptophan", "niacin_derived_equivalents", "pantothenic_acid", "pyridoxine", "biotin", "cobalamin", "folate_natural", "folic_acid", "total_folates", "dietary_folate_equivalents", "vitamin_c", "cholecalciferol", "ergocalciferol", "hydroxy_cholecalciferol", "hydroxy_ergocalciferol", "vitamin_d_equivalents", "alpha_tocopherol", "alpha_tocotrienol", "beta_tocopherol", "beta_tocotrienol", "delta_tocopherol", "delta_tocotrienol", "gamma_tocopherol", "gamma_tocotrienol", "vitamin_e") SELECT "id", "created_at", "updated_at", "ingredient_id", "acetic_acid", "citric_acid", "fumaric_acid", "lactic_acid", "malic_acid", "oxalic_acid", "propionic_acid", "quinic_acid", "shikimic_acid", "succinic_acid", "tartaric_acid", "aluminium", "antimony", "arsenic", "cadmium", "calcium", "chromium", "chloride", "cobalt", "copper", "fluoride", "iodine", "iron", "lead", "magnesium", "manganese", "mercury", "molybdenum", "nickel", "phosphorus", "potassium", "selenium", "sodium", "sulphur", "tin", "zinc", "retinol", "alpha_carotene", "beta_carotene", "cryptoxanthin", "beta_carotene_equivalents", "vitamin_a_retinol_equivalents", "lutein", "lycopene", "xanthophyl", "thiamin", "riboflavin", "niacin", "niacin_derived_from_tryptophan", "niacin_derived_equivalents", "pantothenic_acid", "pyridoxine", "biotin", "cobalamin", "folate_natural", "folic_acid", "total_folates", "dietary_folate_equivalents", "vitamin_c", "cholecalciferol", "ergocalciferol", "hydroxy_cholecalciferol", "hydroxy_ergocalciferol", "vitamin_d_equivalents", "alpha_tocopherol", "alpha_tocotrienol", "beta_tocopherol", "beta_tocotrienol", "delta_tocopherol", "delta_tocotrienol", "gamma_tocopherol", "gamma_tocotrienol", "vitamin_e" FROM `ingredient_addition_two`;--> statement-breakpoint
DROP TABLE `ingredient_addition_two`;--> statement-breakpoint
ALTER TABLE `__new_ingredient_addition_two` RENAME TO `ingredient_addition_two`;--> statement-breakpoint
CREATE TABLE `__new_ingredient_to_grocery_store` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`ingredient_id` integer,
	`grocery_store_id` integer,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`grocery_store_id`) REFERENCES `grocery_store`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ingredient_to_grocery_store`("id", "created_at", "ingredient_id", "grocery_store_id") SELECT "id", "created_at", "ingredient_id", "grocery_store_id" FROM `ingredient_to_grocery_store`;--> statement-breakpoint
DROP TABLE `ingredient_to_grocery_store`;--> statement-breakpoint
ALTER TABLE `__new_ingredient_to_grocery_store` RENAME TO `ingredient_to_grocery_store`;--> statement-breakpoint
CREATE TABLE `__new_meal` (
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
	FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_meal`("id", "created_at", "updated_at", "plan_id", "name", "description", "image", "notes", "creator_id", "meal_category", "favourite_at", "deleted_at", "hidden_at", "vege_notes", "vege", "vege_calories", "index", "calories") SELECT "id", "created_at", "updated_at", "plan_id", "name", "description", "image", "notes", "creator_id", "meal_category", "favourite_at", "deleted_at", "hidden_at", "vege_notes", "vege", "vege_calories", "index", "calories" FROM `meal`;--> statement-breakpoint
DROP TABLE `meal`;--> statement-breakpoint
ALTER TABLE `__new_meal` RENAME TO `meal`;--> statement-breakpoint
CREATE TABLE `__new_meal_to_recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`recipe_id` integer,
	`index` integer NOT NULL,
	`note` text,
	FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_meal_to_recipe`("id", "created_at", "meal_id", "recipe_id", "index", "note") SELECT "id", "created_at", "meal_id", "recipe_id", "index", "note" FROM `meal_to_recipe`;--> statement-breakpoint
DROP TABLE `meal_to_recipe`;--> statement-breakpoint
ALTER TABLE `__new_meal_to_recipe` RENAME TO `meal_to_recipe`;--> statement-breakpoint
CREATE TABLE `__new_meal_to_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`vege_stack_id` integer,
	`calories` text,
	`note` text,
	FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`vege_stack_id`) REFERENCES `vege_stack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_meal_to_vege_stack`("id", "created_at", "meal_id", "vege_stack_id", "calories", "note") SELECT "id", "created_at", "meal_id", "vege_stack_id", "calories", "note" FROM `meal_to_vege_stack`;--> statement-breakpoint
DROP TABLE `meal_to_vege_stack`;--> statement-breakpoint
ALTER TABLE `__new_meal_to_vege_stack` RENAME TO `meal_to_vege_stack`;--> statement-breakpoint
CREATE TABLE `__new_message` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_message`("id", "created_at", "user_id", "subject", "is_important", "is_read", "is_viewed", "is_deleted", "message", "image", "from_user_id") SELECT "id", "created_at", "user_id", "subject", "is_important", "is_read", "is_viewed", "is_deleted", "message", "image", "from_user_id" FROM `message`;--> statement-breakpoint
DROP TABLE `message`;--> statement-breakpoint
ALTER TABLE `__new_message` RENAME TO `message`;--> statement-breakpoint
CREATE TABLE `__new_body_fat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_fat` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_fat`("id", "created_at", "user_id", "date", "body_fat", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "body_fat", "notes", "skinfold_id" FROM `body_fat`;--> statement-breakpoint
DROP TABLE `body_fat`;--> statement-breakpoint
ALTER TABLE `__new_body_fat` RENAME TO `body_fat`;--> statement-breakpoint
CREATE TABLE `__new_body_weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_weight` text,
	`source` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_weight`("id", "created_at", "user_id", "date", "body_weight", "source", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "body_weight", "source", "notes", "skinfold_id" FROM `body_weight`;--> statement-breakpoint
DROP TABLE `body_weight`;--> statement-breakpoint
ALTER TABLE `__new_body_weight` RENAME TO `body_weight`;--> statement-breakpoint
CREATE TABLE `__new_lean_mass` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`lean_mass` text,
	`notes` text,
	`skinfold_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skinfold_id`) REFERENCES `skinfold`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_lean_mass`("id", "created_at", "user_id", "date", "lean_mass", "notes", "skinfold_id") SELECT "id", "created_at", "user_id", "date", "lean_mass", "notes", "skinfold_id" FROM `lean_mass`;--> statement-breakpoint
DROP TABLE `lean_mass`;--> statement-breakpoint
ALTER TABLE `__new_lean_mass` RENAME TO `lean_mass`;--> statement-breakpoint
CREATE TABLE `__new_skinfold` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_skinfold`("id", "created_at", "user_id", "date", "chin", "cheek", "lower_abdominal", "pectoral", "biceps", "triceps", "subscapular", "mid_axillary", "suprailiac", "umbilical", "lower_back", "quadriceps", "hamstrings", "medial_calf", "knee", "shoulder", "notes") SELECT "id", "created_at", "user_id", "date", "chin", "cheek", "lower_abdominal", "pectoral", "biceps", "triceps", "subscapular", "mid_axillary", "suprailiac", "umbilical", "lower_back", "quadriceps", "hamstrings", "medial_calf", "knee", "shoulder", "notes" FROM `skinfold`;--> statement-breakpoint
DROP TABLE `skinfold`;--> statement-breakpoint
ALTER TABLE `__new_skinfold` RENAME TO `skinfold`;--> statement-breakpoint
CREATE TABLE `__new_notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`title` text,
	`description` text,
	`is_read` integer,
	`is_viewed` integer,
	`is_deleted` integer,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notification`("id", "created_at", "user_id", "title", "description", "is_read", "is_viewed", "is_deleted", "notes") SELECT "id", "created_at", "user_id", "title", "description", "is_read", "is_viewed", "is_deleted", "notes" FROM `notification`;--> statement-breakpoint
DROP TABLE `notification`;--> statement-breakpoint
ALTER TABLE `__new_notification` RENAME TO `notification`;--> statement-breakpoint
CREATE TABLE `__new_plan` (
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
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_plan`("id", "created_at", "updated_at", "name", "description", "image", "notes", "number_of_meals", "creator_id", "recipe_category", "favourite_at", "deleted_at", "hidden_at") SELECT "id", "created_at", "updated_at", "name", "description", "image", "notes", "number_of_meals", "creator_id", "recipe_category", "favourite_at", "deleted_at", "hidden_at" FROM `plan`;--> statement-breakpoint
DROP TABLE `plan`;--> statement-breakpoint
ALTER TABLE `__new_plan` RENAME TO `plan`;--> statement-breakpoint
CREATE TABLE `__new_plan_to_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`plan_id` integer,
	`meal_id` integer,
	`index` integer,
	`meal_title` text,
	`calories` text,
	`vege_calories` text,
	`note` text,
	FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_plan_to_meal`("id", "created_at", "plan_id", "meal_id", "index", "meal_title", "calories", "vege_calories", "note") SELECT "id", "created_at", "plan_id", "meal_id", "index", "meal_title", "calories", "vege_calories", "note" FROM `plan_to_meal`;--> statement-breakpoint
DROP TABLE `plan_to_meal`;--> statement-breakpoint
ALTER TABLE `__new_plan_to_meal` RENAME TO `plan_to_meal`;--> statement-breakpoint
CREATE TABLE `__new_recipe` (
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
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_recipe`("id", "created_at", "updated_at", "name", "description", "image", "notes", "calories", "creator_id", "recipe_category", "favourite_at", "deleted_at", "hidden_at") SELECT "id", "created_at", "updated_at", "name", "description", "image", "notes", "calories", "creator_id", "recipe_category", "favourite_at", "deleted_at", "hidden_at" FROM `recipe`;--> statement-breakpoint
DROP TABLE `recipe`;--> statement-breakpoint
ALTER TABLE `__new_recipe` RENAME TO `recipe`;--> statement-breakpoint
CREATE TABLE `__new_recipe_to_ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`recipe_id` integer NOT NULL,
	`ingredient_id` integer NOT NULL,
	`index` integer NOT NULL,
	`alternate_id` integer,
	`serve` text NOT NULL,
	`serve_unit` text NOT NULL,
	`note` text,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`alternate_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_recipe_to_ingredient`("id", "created_at", "recipe_id", "ingredient_id", "index", "alternate_id", "serve", "serve_unit", "note") SELECT "id", "created_at", "recipe_id", "ingredient_id", "index", "alternate_id", "serve", "serve_unit", "note" FROM `recipe_to_ingredient`;--> statement-breakpoint
DROP TABLE `recipe_to_ingredient`;--> statement-breakpoint
ALTER TABLE `__new_recipe_to_ingredient` RENAME TO `recipe_to_ingredient`;--> statement-breakpoint
CREATE TABLE `__new_user_ingredient` (
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
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_plan_id`) REFERENCES `user_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`alternate_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_ingredient`("id", "created_at", "updated_at", "ingredient_id", "user_plan_id", "daily_meal_id", "name", "meal_index", "recipe_index", "alternate_id", "serve", "serve_unit", "note", "daily_log_id") SELECT "id", "created_at", "updated_at", "ingredient_id", "user_plan_id", "daily_meal_id", "name", "meal_index", "recipe_index", "alternate_id", "serve", "serve_unit", "note", "daily_log_id" FROM `user_ingredient`;--> statement-breakpoint
DROP TABLE `user_ingredient`;--> statement-breakpoint
ALTER TABLE `__new_user_ingredient` RENAME TO `user_ingredient`;--> statement-breakpoint
CREATE TABLE `__new_user_meal` (
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
	FOREIGN KEY (`user_plan_id`) REFERENCES `user_plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_meal`("id", "created_at", "updated_at", "user_plan_id", "index", "meal_title", "calories", "protein", "target_protein", "target_calories", "vege_calories", "veges", "vege_notes", "note") SELECT "id", "created_at", "updated_at", "user_plan_id", "index", "meal_title", "calories", "protein", "target_protein", "target_calories", "vege_calories", "veges", "vege_notes", "note" FROM `user_meal`;--> statement-breakpoint
DROP TABLE `user_meal`;--> statement-breakpoint
ALTER TABLE `__new_user_meal` RENAME TO `user_meal`;--> statement-breakpoint
CREATE TABLE `__new_user_plan` (
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
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_plan`("id", "created_at", "updated_at", "finished_at", "start_at", "is_active", "name", "description", "image", "notes", "number_of_meals", "creator_id", "user_id", "favourite_at", "deleted_at", "hidden_at") SELECT "id", "created_at", "updated_at", "finished_at", "start_at", "is_active", "name", "description", "image", "notes", "number_of_meals", "creator_id", "user_id", "favourite_at", "deleted_at", "hidden_at" FROM `user_plan`;--> statement-breakpoint
DROP TABLE `user_plan`;--> statement-breakpoint
ALTER TABLE `__new_user_plan` RENAME TO `user_plan`;--> statement-breakpoint
CREATE TABLE `__new_user_recipe` (
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
	FOREIGN KEY (`user_plan_id`) REFERENCES `user_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_meal_id`) REFERENCES `daily_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_recipe`("id", "created_at", "updated_at", "meal_index", "recipe_index", "user_plan_id", "daily_meal_id", "name", "index", "serve", "serve_unit", "note", "is_log", "daily_log_id") SELECT "id", "created_at", "updated_at", "meal_index", "recipe_index", "user_plan_id", "daily_meal_id", "name", "index", "serve", "serve_unit", "note", "is_log", "daily_log_id" FROM `user_recipe`;--> statement-breakpoint
DROP TABLE `user_recipe`;--> statement-breakpoint
ALTER TABLE `__new_user_recipe` RENAME TO `user_recipe`;--> statement-breakpoint
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
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_account`("user_id", "type", "provider", "provider_account_id", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state") SELECT "user_id", "type", "provider", "provider_account_id", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state" FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
CREATE TABLE `__new_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text,
	`name` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_role`("id", "created_at", "updated_at", "user_id", "name") SELECT "id", "created_at", "updated_at", "user_id", "name" FROM `role`;--> statement-breakpoint
DROP TABLE `role`;--> statement-breakpoint
ALTER TABLE `__new_role` RENAME TO `role`;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_session`("session_token", "userId", "expires") SELECT "session_token", "userId", "expires" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
DROP INDEX `email_idx`;--> statement-breakpoint
DROP INDEX `clerk_id_idx`;--> statement-breakpoint
DROP INDEX `name_idx`;--> statement-breakpoint
DROP INDEX `ce-nu_user_email_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `__new_user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`default_water` text,
	`default_chart_range` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_settings`("id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range") SELECT "id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range" FROM `user_settings`;--> statement-breakpoint
DROP TABLE `user_settings`;--> statement-breakpoint
ALTER TABLE `__new_user_settings` RENAME TO `user_settings`;--> statement-breakpoint
CREATE TABLE `__new_user_to_trainer` (
	`user_id` text NOT NULL,
	`trainer_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`trainer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_to_trainer`("user_id", "trainer_id") SELECT "user_id", "trainer_id" FROM `user_to_trainer`;--> statement-breakpoint
DROP TABLE `user_to_trainer`;--> statement-breakpoint
ALTER TABLE `__new_user_to_trainer` RENAME TO `user_to_trainer`;--> statement-breakpoint
CREATE TABLE `__new_weigh_in` (
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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`trainer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_weigh_in`("id", "created_at", "user_id", "trainer_id", "date", "body_weight", "lean_mass", "body_fat", "blood_pressure", "image", "notes") SELECT "id", "created_at", "user_id", "trainer_id", "date", "body_weight", "lean_mass", "body_fat", "blood_pressure", "image", "notes" FROM `weigh_in`;--> statement-breakpoint
DROP TABLE `weigh_in`;--> statement-breakpoint
ALTER TABLE `__new_weigh_in` RENAME TO `weigh_in`;
