CREATE TABLE "nutrition_daily_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"morning_weight" text,
	"notes" text,
	"fasted_blood_glucose" text,
	"sleep" text,
	"sleep_quality" text,
	"is_hiit" integer DEFAULT 0,
	"is_cardio" integer DEFAULT 0,
	"is_lift" integer DEFAULT 0,
	"is_liss" integer DEFAULT 0,
	"is_starred" integer DEFAULT 0,
	"hiit" text,
	"cardio" text,
	"weight" text,
	"liss" text,
	"cardio_type" text,
	"image" text,
	"waist_measurement" text,
	"nap" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_daily_meal" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"daily_log_id" integer NOT NULL,
	"meal_index" integer NOT NULL,
	"date" date NOT NULL,
	"recipe_id" integer,
	"vege_calories" text,
	"veges" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_poop_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"daily_log_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" date DEFAULT (unixepoch()) NOT NULL,
	"user_Id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_tag_to_daily_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag_id" integer NOT NULL,
	"daily_log_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_water_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"daily_log_id" integer NOT NULL,
	"water" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_grocery_store" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"name" text,
	"locations" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"user_id" text,
	"favourite_at" date,
	"deleted_at" date,
	"hidden_at" date,
	"is_aus_food" boolean,
	"is_all_stores" boolean DEFAULT true,
	"serve_size" text,
	"serve_unit" text,
	"public_food_key" text,
	"classification" text,
	"food_name" text,
	"name" text,
	"calories_w_fibre" text,
	"calories_wo_fibre" text,
	"protein" text,
	"fat_total" text,
	"total_dietary_fibre" text,
	"total_sugars" text,
	"starch" text,
	"resistant_starch" text,
	"available_carbohydrate_without_sugar_alcohols" text,
	"available_carbohydrate_with_sugar_alcohols" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_ingredient_addition_one" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"ingredient_id" integer,
	"energy_with_dietary_fibre" text,
	"energy_without_dietary_fibre" text,
	"added_sugars" text,
	"free_sugars" text,
	"moisture" text,
	"nitrogen" text,
	"alcohol" text,
	"fructose" text,
	"glucose" text,
	"sucrose" text,
	"maltose" text,
	"lactose" text,
	"galactose" text,
	"maltotrios" text,
	"ash" text,
	"dextrin" text,
	"glycerol" text,
	"glycogen" text,
	"inulin" text,
	"erythritol" text,
	"maltitol" text,
	"mannitol" text,
	"xylitol" text,
	"maltodextrin" text,
	"oligosaccharides" text,
	"polydextrose" text,
	"raffinose" text,
	"stachyose" text,
	"sorbitol" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_ingredient_addition_three" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"ingredient_id" integer,
	"total_saturated_fatty_acids" text,
	"total_monounsaturated_fatty_acids" text,
	"total_polyunsaturated_fatty_acids" text,
	"total_long_chain_omega_3_fatty_acids" text,
	"total_trans_fatty_acids" text,
	"caffeine" text,
	"cholesterol" text,
	"alanine" text,
	"arginine" text,
	"aspartic_acid" text,
	"cystine_plus_cysteine" text,
	"glutamic_acid" text,
	"glycine" text,
	"histidine" text,
	"isoleucine" text,
	"leucine" text,
	"lysine" text,
	"methionine" text,
	"phenylalanine" text,
	"proline" text,
	"serine" text,
	"threonine" text,
	"tyrosine" text,
	"tryptophan" text,
	"valine" text,
	"c4" text,
	"c6" text,
	"c8" text,
	"c10" text,
	"c11" text,
	"c12" text,
	"c13" text,
	"c14" text,
	"c15" text,
	"c16" text,
	"c17" text,
	"c18" text,
	"c19" text,
	"c20" text,
	"c21" text,
	"c22" text,
	"c23" text,
	"c24" text,
	"total_saturated_fatty_acids_equated" text,
	"c10_1" text,
	"c12_1" text,
	"c14_1" text,
	"c15_1" text,
	"c16_1" text,
	"c17_1" text,
	"c18_1" text,
	"c18_1w5" text,
	"c18_1w6" text,
	"c18_1w7" text,
	"c18_1w9" text,
	"c20_1" text,
	"c20_1w9" text,
	"c20_1w13" text,
	"c20_1w11" text,
	"c22_1" text,
	"c22_1w9" text,
	"c22_1w11" text,
	"c24_1" text,
	"c24_1w9" text,
	"c24_1w11" text,
	"c24_1w13" text,
	"total_monounsaturated_fatty_acids_equated" text,
	"c12_2" text,
	"c16_2w4" text,
	"c16_3" text,
	"c18_2w6" text,
	"c18_3w3" text,
	"c18_3w4" text,
	"c18_3w6" text,
	"c18_4w1" text,
	"c18_4w3" text,
	"c20_2" text,
	"c20_2w6" text,
	"c20_3" text,
	"c20_3w3" text,
	"c20_3w6" text,
	"c20_4" text,
	"c20_4w3" text,
	"c20_4w6" text,
	"c20_5w3" text,
	"c21_5w3" text,
	"c22_2" text,
	"c22_2w6" text,
	"c22_4w6" text,
	"c22_5w3" text,
	"c22_5w6" text,
	"c22_6w3" text,
	"total_polyunsaturated_fatty_acids_equated" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_ingredient_addition_two" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"ingredient_id" integer,
	"acetic_acid" text,
	"citric_acid" text,
	"fumaric_acid" text,
	"lactic_acid" text,
	"malic_acid" text,
	"oxalic_acid" text,
	"propionic_acid" text,
	"quinic_acid" text,
	"shikimic_acid" text,
	"succinic_acid" text,
	"tartaric_acid" text,
	"aluminium" text,
	"antimony" text,
	"arsenic" text,
	"cadmium" text,
	"calcium" text,
	"chromium" text,
	"chloride" text,
	"cobalt" text,
	"copper" text,
	"fluoride" text,
	"iodine" text,
	"iron" text,
	"lead" text,
	"magnesium" text,
	"manganese" text,
	"mercury" text,
	"molybdenum" text,
	"nickel" text,
	"phosphorus" text,
	"potassium" text,
	"selenium" text,
	"sodium" text,
	"sulphur" text,
	"tin" text,
	"zinc" text,
	"retinol" text,
	"alpha_carotene" text,
	"beta_carotene" text,
	"cryptoxanthin" text,
	"beta_carotene_equivalents" text,
	"vitamin_a_retinol_equivalents" text,
	"lutein" text,
	"lycopene" text,
	"xanthophyl" text,
	"thiamin" text,
	"riboflavin" text,
	"niacin" text,
	"niacin_derived_from_tryptophan" text,
	"niacin_derived_equivalents" text,
	"pantothenic_acid" text,
	"pyridoxine" text,
	"biotin" text,
	"cobalamin" text,
	"folate_natural" text,
	"folic_acid" text,
	"total_folates" text,
	"dietary_folate_equivalents" text,
	"vitamin_c" text,
	"cholecalciferol" text,
	"ergocalciferol" text,
	"hydroxy_cholecalciferol" text,
	"hydroxy_ergocalciferol" text,
	"vitamin_d_equivalents" text,
	"alpha_tocopherol" text,
	"alpha_tocotrienol" text,
	"beta_tocopherol" text,
	"beta_tocotrienol" text,
	"delta_tocopherol" text,
	"delta_tocotrienol" text,
	"gamma_tocopherol" text,
	"gamma_tocotrienol" text,
	"vitamin_e" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_ingredient_to_grocery_store" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"ingredient_id" integer,
	"grocery_store_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"object_id" integer,
	"task" text,
	"notes" text,
	"user" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_meal" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"plan_id" integer,
	"name" text,
	"description" text,
	"image" text,
	"notes" text,
	"creator_id" text,
	"meal_category" text,
	"favourite_at" date,
	"deleted_at" date,
	"hidden_at" date,
	"vege_notes" text,
	"vege" text,
	"vege_calories" text,
	"index" integer,
	"calories" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_meal_to_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"meal_id" integer,
	"recipe_id" integer,
	"index" integer NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_meal_to_vege_stack" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"meal_id" integer,
	"vege_stack_id" integer,
	"calories" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_vege_stack" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"name" text,
	"veges" text,
	"notes" text,
	"calories" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text,
	"subject" text,
	"is_important" boolean,
	"is_read" boolean,
	"is_viewed" boolean,
	"is_deleted" boolean,
	"message" text,
	"image" text,
	"from_user_id" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_body_fat" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"body_fat" text,
	"notes" text,
	"skinfold_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_body_weight" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"body_weight" text,
	"source" text,
	"notes" text,
	"skinfold_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_lean_mass" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"lean_mass" text,
	"notes" text,
	"skinfold_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_skinfold" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"chin" text,
	"cheek" text,
	"lower_abdominal" text,
	"pectoral" text,
	"biceps" text,
	"triceps" text,
	"subscapular" text,
	"mid_axillary" text,
	"suprailiac" text,
	"umbilical" text,
	"lower_back" text,
	"quadriceps" text,
	"hamstrings" text,
	"medial_calf" text,
	"knee" text,
	"shoulder" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text,
	"title" text,
	"description" text,
	"is_read" boolean,
	"is_viewed" boolean,
	"is_deleted" boolean,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"name" text,
	"description" text,
	"image" text,
	"notes" text,
	"number_of_meals" integer,
	"creator_id" text,
	"recipe_category" text,
	"favourite_at" date,
	"deleted_at" date,
	"hidden_at" date
);
--> statement-breakpoint
CREATE TABLE "nutrition_plan_to_meal" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"plan_id" integer,
	"meal_id" integer,
	"index" integer,
	"meal_title" text,
	"calories" text,
	"vege_calories" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"notes" text NOT NULL,
	"calories" integer NOT NULL,
	"creator_id" text NOT NULL,
	"recipe_category" text NOT NULL,
	"favourite_at" date,
	"deleted_at" date,
	"hidden_at" date
);
--> statement-breakpoint
CREATE TABLE "nutrition_recipe_to_ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"recipe_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"index" integer NOT NULL,
	"alternate_id" integer,
	"serve" text NOT NULL,
	"serve_unit" text NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_calories_with_fibre" boolean,
	"is_posing" boolean
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"ingredient_id" integer,
	"user_plan_id" integer,
	"daily_meal_id" integer,
	"name" text,
	"meal_index" integer,
	"recipe_index" integer,
	"alternate_id" integer,
	"serve" text,
	"serve_unit" text,
	"note" text,
	"daily_log_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_meal" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"user_plan_id" integer NOT NULL,
	"index" integer,
	"meal_title" text,
	"calories" text,
	"protein" text,
	"target_protein" text,
	"target_calories" text,
	"vege_calories" text,
	"veges" text,
	"vege_notes" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"finished_at" date,
	"start_at" date,
	"is_active" date,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"notes" text NOT NULL,
	"number_of_meals" integer,
	"creator_id" text NOT NULL,
	"user_id" text NOT NULL,
	"favourite_at" date,
	"deleted_at" date,
	"hidden_at" date
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"meal_index" integer,
	"recipe_index" integer,
	"user_plan_id" integer,
	"daily_meal_id" integer,
	"name" text,
	"index" integer,
	"serve" text,
	"serve_unit" text,
	"note" text,
	"is_log" boolean,
	"daily_log_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition_account" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "nutrition_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "nutrition_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"first_name" text,
	"last_name" text,
	"clerk_id" text,
	"birth_date" date,
	"gender" text,
	"address" text,
	"notes" text,
	"instagram" text,
	"phone" text,
	"email" text,
	"email_verified" date,
	"password" text,
	"current_plan_id" integer,
	"image" text,
	"is_fake" boolean DEFAULT false,
	"is_trainer" boolean DEFAULT false,
	"is_root" boolean DEFAULT false,
	"is_creator" boolean DEFAULT false,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	CONSTRAINT "nutrition_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"updated_at" date,
	"user_id" text NOT NULL,
	"default_water" text,
	"default_chart_range" text
);
--> statement-breakpoint
CREATE TABLE "nutrition_user_to_trainer" (
	"user_id" text NOT NULL,
	"trainer_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" date NOT NULL,
	CONSTRAINT "nutrition_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "nutrition_weigh_in" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT (unixepoch()) NOT NULL,
	"user_id" text NOT NULL,
	"trainer_id" text NOT NULL,
	"date" date DEFAULT (unixepoch()) NOT NULL,
	"body_weight" text,
	"lean_mass" text,
	"body_fat" text,
	"blood_pressure" text,
	"image" text,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "nutrition_daily_log" ADD CONSTRAINT "nutrition_daily_log_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_daily_meal" ADD CONSTRAINT "nutrition_daily_meal_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_poop_log" ADD CONSTRAINT "nutrition_poop_log_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_tag" ADD CONSTRAINT "nutrition_tag_user_Id_nutrition_user_id_fk" FOREIGN KEY ("user_Id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_tag_to_daily_log" ADD CONSTRAINT "nutrition_tag_to_daily_log_tag_id_nutrition_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."nutrition_tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_tag_to_daily_log" ADD CONSTRAINT "nutrition_tag_to_daily_log_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_water_log" ADD CONSTRAINT "nutrition_water_log_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient" ADD CONSTRAINT "nutrition_ingredient_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient_addition_one" ADD CONSTRAINT "nutrition_ingredient_addition_one_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient_addition_three" ADD CONSTRAINT "nutrition_ingredient_addition_three_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient_addition_two" ADD CONSTRAINT "nutrition_ingredient_addition_two_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient_to_grocery_store" ADD CONSTRAINT "nutrition_ingredient_to_grocery_store_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_ingredient_to_grocery_store" ADD CONSTRAINT "nutrition_ingredient_to_grocery_store_grocery_store_id_nutrition_grocery_store_id_fk" FOREIGN KEY ("grocery_store_id") REFERENCES "public"."nutrition_grocery_store"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal" ADD CONSTRAINT "nutrition_meal_plan_id_nutrition_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."nutrition_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal" ADD CONSTRAINT "nutrition_meal_creator_id_nutrition_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal_to_recipe" ADD CONSTRAINT "nutrition_meal_to_recipe_meal_id_nutrition_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."nutrition_meal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal_to_recipe" ADD CONSTRAINT "nutrition_meal_to_recipe_recipe_id_nutrition_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."nutrition_recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal_to_vege_stack" ADD CONSTRAINT "nutrition_meal_to_vege_stack_meal_id_nutrition_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."nutrition_meal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal_to_vege_stack" ADD CONSTRAINT "nutrition_meal_to_vege_stack_vege_stack_id_nutrition_vege_stack_id_fk" FOREIGN KEY ("vege_stack_id") REFERENCES "public"."nutrition_vege_stack"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_message" ADD CONSTRAINT "nutrition_message_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_message" ADD CONSTRAINT "nutrition_message_from_user_id_nutrition_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_body_fat" ADD CONSTRAINT "nutrition_body_fat_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_body_fat" ADD CONSTRAINT "nutrition_body_fat_skinfold_id_nutrition_skinfold_id_fk" FOREIGN KEY ("skinfold_id") REFERENCES "public"."nutrition_skinfold"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_body_weight" ADD CONSTRAINT "nutrition_body_weight_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_body_weight" ADD CONSTRAINT "nutrition_body_weight_skinfold_id_nutrition_skinfold_id_fk" FOREIGN KEY ("skinfold_id") REFERENCES "public"."nutrition_skinfold"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_lean_mass" ADD CONSTRAINT "nutrition_lean_mass_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_lean_mass" ADD CONSTRAINT "nutrition_lean_mass_skinfold_id_nutrition_skinfold_id_fk" FOREIGN KEY ("skinfold_id") REFERENCES "public"."nutrition_skinfold"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_skinfold" ADD CONSTRAINT "nutrition_skinfold_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_notification" ADD CONSTRAINT "nutrition_notification_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan" ADD CONSTRAINT "nutrition_plan_creator_id_nutrition_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan_to_meal" ADD CONSTRAINT "nutrition_plan_to_meal_plan_id_nutrition_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."nutrition_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan_to_meal" ADD CONSTRAINT "nutrition_plan_to_meal_meal_id_nutrition_meal_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."nutrition_meal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_recipe" ADD CONSTRAINT "nutrition_recipe_creator_id_nutrition_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_recipe_to_ingredient" ADD CONSTRAINT "nutrition_recipe_to_ingredient_recipe_id_nutrition_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."nutrition_recipe"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_recipe_to_ingredient" ADD CONSTRAINT "nutrition_recipe_to_ingredient_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_recipe_to_ingredient" ADD CONSTRAINT "nutrition_recipe_to_ingredient_alternate_id_nutrition_ingredient_id_fk" FOREIGN KEY ("alternate_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_ingredient" ADD CONSTRAINT "nutrition_user_ingredient_ingredient_id_nutrition_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_ingredient" ADD CONSTRAINT "nutrition_user_ingredient_user_plan_id_nutrition_user_plan_id_fk" FOREIGN KEY ("user_plan_id") REFERENCES "public"."nutrition_user_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_ingredient" ADD CONSTRAINT "nutrition_user_ingredient_daily_meal_id_nutrition_daily_meal_id_fk" FOREIGN KEY ("daily_meal_id") REFERENCES "public"."nutrition_daily_meal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_ingredient" ADD CONSTRAINT "nutrition_user_ingredient_alternate_id_nutrition_ingredient_id_fk" FOREIGN KEY ("alternate_id") REFERENCES "public"."nutrition_ingredient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_ingredient" ADD CONSTRAINT "nutrition_user_ingredient_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_meal" ADD CONSTRAINT "nutrition_user_meal_user_plan_id_nutrition_user_plan_id_fk" FOREIGN KEY ("user_plan_id") REFERENCES "public"."nutrition_user_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_plan" ADD CONSTRAINT "nutrition_user_plan_creator_id_nutrition_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_plan" ADD CONSTRAINT "nutrition_user_plan_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_recipe" ADD CONSTRAINT "nutrition_user_recipe_user_plan_id_nutrition_user_plan_id_fk" FOREIGN KEY ("user_plan_id") REFERENCES "public"."nutrition_user_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_recipe" ADD CONSTRAINT "nutrition_user_recipe_daily_meal_id_nutrition_daily_meal_id_fk" FOREIGN KEY ("daily_meal_id") REFERENCES "public"."nutrition_daily_meal"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_recipe" ADD CONSTRAINT "nutrition_user_recipe_daily_log_id_nutrition_daily_log_id_fk" FOREIGN KEY ("daily_log_id") REFERENCES "public"."nutrition_daily_log"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_account" ADD CONSTRAINT "nutrition_account_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_role" ADD CONSTRAINT "nutrition_role_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_session" ADD CONSTRAINT "nutrition_session_userId_nutrition_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_settings" ADD CONSTRAINT "nutrition_user_settings_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_to_trainer" ADD CONSTRAINT "nutrition_user_to_trainer_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_user_to_trainer" ADD CONSTRAINT "nutrition_user_to_trainer_trainer_id_nutrition_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_weigh_in" ADD CONSTRAINT "nutrition_weigh_in_user_id_nutrition_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_weigh_in" ADD CONSTRAINT "nutrition_weigh_in_trainer_id_nutrition_user_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."nutrition_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "daily_log_date_index" ON "nutrition_daily_log" USING btree ("date");--> statement-breakpoint
CREATE INDEX "ingredient_food_name_idx" ON "nutrition_ingredient" USING btree ("food_name");--> statement-breakpoint
CREATE INDEX "ingredient_food_key_idx" ON "nutrition_ingredient" USING btree ("public_food_key");--> statement-breakpoint
CREATE INDEX "body_fat_date_idx" ON "nutrition_body_fat" USING btree ("date");--> statement-breakpoint
CREATE INDEX "body_weight_date_idx" ON "nutrition_body_weight" USING btree ("date");--> statement-breakpoint
CREATE INDEX "lean_mass_date_idx" ON "nutrition_lean_mass" USING btree ("date");--> statement-breakpoint
CREATE INDEX "skinfold_date_idx" ON "nutrition_skinfold" USING btree ("date");--> statement-breakpoint
CREATE INDEX "notification_user_id_idx" ON "nutrition_notification" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "nutrition_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "nutrition_session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "email_idx" ON "nutrition_user" USING btree ("email");