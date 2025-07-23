import { z } from 'zod'

export const fieldsMap = [
	{
		name: 'Calories w Fibre',
		field: 'caloriesWFibre',
	},
	{
		name: 'Calories',
		field: 'caloriesWOFibre',
	},
	{
		name: 'Protein',
		field: 'protein',
	},
	{
		name: 'Fat',
		field: 'fatTotal',
	},
	{
		name: 'Carbohydrate',
		field: 'totalDietaryFibre',
	},
	{
		name: 'Sugars',
		field: 'totalSugars',
	},
	{
		name: 'Starch',
		field: 'starch',
	},
	{
		name: 'Resistant Starch',
		field: 'resistantStarch',
	},
	{
		name: 'Available Carbohydrate Without Sugar Alcohol',
		field: 'availableCarbohydrateWithoutSugarAlcohols',
	},
	{
		name: 'Available Carbohydrate With Sugar Alcohol',
		field: 'availableCarbohydrateWithSugarAlcohols',
	},
	{
		name: 'Added Sugars',
		field: 'addedSugars',
	},
	{
		name: 'Free Sugars',
		field: 'freeSugars',
	},
	{
		name: 'Moisture',
		field: 'moisture',
	},
	{
		name: 'Nitrogen',
		field: 'nitrogen',
	},
	{
		name: 'Alcohol',
		field: 'alcohol',
	},
	{
		name: 'Fructose',
		field: 'fructose',
	},
	{
		name: 'Glucose',
		field: 'glucose',
	},
	{
		name: 'Sucrose',
		field: 'sucrose',
	},
	{
		name: 'Maltose',
		field: 'maltose',
	},
	{
		name: 'Lactose',
		field: 'lactose',
	},
	{
		name: 'Galactose',
		field: 'galactose',
	},
	{
		name: 'Maltotriose',
		field: 'maltotrios',
	},
	{
		name: 'Ash',
		field: 'ash',
	},
	{
		name: 'Dextrin',
		field: 'dextrin',
	},
	{
		name: 'Glycerol',
		field: 'glycerol',
	},
	{
		name: 'Glycogen',
		field: 'glycogen',
	},
	{
		name: 'Inulin',
		field: 'inulin',
	},
	{
		name: 'Erythritol',
		field: 'erythritol',
	},
	{
		name: 'Maltitol',
		field: 'maltitol',
	},
	{
		name: 'Mannitol',
		field: 'mannitol',
	},
	{
		name: 'Xylitol',
		field: 'xylitol',
	},
	{
		name: 'Maltodextrin',
		field: 'maltodextrin',
	},
	{
		name: 'Oleic Acid',
		field: 'oleicAcid',
	},
	{
		name: 'Polydextrose',
		field: 'polydextrose',
	},
	{
		name: 'Raffinose',
		field: 'raffinose',
	},
	{
		name: 'Stachyose',
		field: 'stachyose',
	},
	{
		name: 'Sorbitol',
		field: 'sorbitol',
	},
	{
		name: 'Acetic Acid',
		field: 'aceticAcid',
	},
	{
		name: 'Citric Acid',
		field: 'citricAcid',
	},
	{
		name: 'Fumaric Acid',
		field: 'fumaricAcid',
	},
	{
		name: 'Lactic Acid',
		field: 'lacticAcid',
	},
	{
		name: 'Malic Acid',
		field: 'malicAcid',
	},
	{
		name: 'Oxalic Acid',
		field: 'oxalicAcid',
	},
	{
		name: 'Propionic Acid',
		field: 'propionicAcid',
	},
	{
		name: 'Quinic Acid',
		field: 'quinicAcid',
	},
	{
		name: 'Shikimic Acid',
		field: 'shikimicAcid',
	},
	{
		name: 'Succinic Acid',
		field: 'succinicAcid',
	},
	{
		name: 'Tartaric Acid',
		field: 'tartaricAcid',
	},
	{
		name: 'Aluminium',
		field: 'aluminium',
	},
	{
		name: 'Antimony',
		field: 'antimony',
	},
	{
		name: 'Arsenic',
		field: 'arsenic',
	},
	{
		name: 'Cadmium',
		field: 'cadmium',
	},
	{
		name: 'Calcium',
		field: 'calcium',
	},
	{
		name: 'Chromium',
		field: 'chromium',
	},
	{
		name: 'Chloride',
		field: 'chloride',
	},
	{
		name: 'Cobalt',
		field: 'cobalt',
	},
	{
		name: 'Copper',
		field: 'copper',
	},
	{
		name: 'Fluoride',
		field: 'fluoride',
	},
	{
		name: 'Iodine',
		field: 'iodine',
	},
	{
		name: 'Iron',
		field: 'iron',
	},
	{
		name: 'Lead',
		field: 'lead',
	},
	{
		name: 'Magnesium',
		field: 'magnesium',
	},
	{
		name: 'Manganese',
		field: 'manganese',
	},
	{
		name: 'Mercury',
		field: 'mercury',
	},
	{
		name: 'Molybdenum',
		field: 'molybdenum',
	},
	{
		name: 'Nickel',
		field: 'nickel',
	},
	{
		name: 'Phosphorus',
		field: 'phosphorus',
	},
	{
		name: 'Potassium',
		field: 'potassium',
	},
	{
		name: 'Selenium',
		field: 'selenium',
	},
	{
		name: 'Sodium',
		field: 'sodium',
	},
	{
		name: 'Sulphur',
		field: 'sulphur',
	},
	{
		name: 'Tin',
		field: 'tin',
	},
	{
		name: 'Zinc',
		field: 'zinc',
	},
	{
		name: 'Retinol',
		field: 'retinol',
	},
	{
		name: 'Alpha Carotene',
		field: 'alphaCarotene',
	},
	{
		name: 'Beta Carotene',
		field: 'betaCarotene',
	},
	{
		name: 'Cryptoxanthin',
		field: 'cryptoxanthin',
	},
	{
		name: 'Beta Carotene Equivalents',
		field: 'betaCaroteneEquivalents',
	},
	{
		name: 'Vitamin ARetinol Equivalents',
		field: 'vitaminARetinolEquivalents',
	},
	{
		name: 'Lutein',
		field: 'lutein',
	},
	{
		name: 'Lycopene',
		field: 'lycopene',
	},
	{
		name: 'Xanthophyl',
		field: 'xanthophyl',
	},
	{
		name: 'Thiamin',
		field: 'thiamin',
	},
	{
		name: 'Riboflavin',
		field: 'riboflavin',
	},
	{
		name: 'Niacin',
		field: 'niacin',
	},
	{
		name: 'Niacin Derived From Tryptophan',
		field: 'niacinDerivedFromTryptophan',
	},
	{
		name: 'Niacin Derived Equivalents',
		field: 'niacinDerivedEquivalents',
	},
	{
		name: 'Pantothenic Acid',
		field: 'pantothenicAcid',
	},
	{
		name: 'Pyridoxine',
		field: 'pyridoxine',
	},
	{
		name: 'Biotin',
		field: 'biotin',
	},
	{
		name: 'Coalamin',
		field: 'cobalamin',
	},
	{
		name: 'Folate Natural',
		field: 'folateNatural',
	},
	{
		name: 'Folic Acid',
		field: 'folicAcid',
	},
	{
		name: 'Total Folates',
		field: 'totalFolates',
	},
	{
		name: 'Dietary Folate Equivalents',
		field: 'dietaryFolateEquivalents',
	},
	{
		name: 'Vitamin C',
		field: 'vitaminC',
	},
	{
		name: 'Cholecalciferol',
		field: 'cholecalciferol',
	},
	{
		name: 'Ergocalciferol',
		field: 'ergocalciferol',
	},
	{
		name: 'Hydroxy Cholecalciferol',
		field: 'hydroxyCholecalciferol',
	},
	{
		name: 'Hydroxy Ergocalciferol',
		field: 'hydroxyErgocalciferol',
	},
	{
		name: 'Vitamin DEquivalents',
		field: 'vitaminDEquivalents',
	},
	{
		name: 'Alpha Tocopherol',
		field: 'alphaTocopherol',
	},
	{
		name: 'Alpha Tocotrienol',
		field: 'alphaTocotrienol',
	},
	{
		name: 'Beta Tocopherol',
		field: 'betaTocopherol',
	},
	{
		name: 'Beta Tocotrienol',
		field: 'betaTocotrienol',
	},
	{
		name: 'Delta Tocopherol',
		field: 'deltaTocopherol',
	},
	{
		name: 'Delta Tocotrienol',
		field: 'deltaTocotrienol',
	},
	{
		name: 'Gamma Tocopherol',
		field: 'gammaTocopherol',
	},
	{
		name: 'Gamma Tocotrienol',
		field: 'gammaTocotrienol',
	},
	{
		name: 'Vitamin E',
		field: 'vitaminE',
	},
	{
		name: 'Total Saturated Fatty Acids',
		field: 'totalSaturatedFattyAcids',
	},
	{
		name: 'Total Monounsaturated Fatty Acids',
		field: 'totalMonounsaturatedFattyAcids',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids',
		field: 'totalPolyunsaturatedFattyAcids',
	},
	{
		name: 'Total Long Chain Omega 3Fatty Acids',
		field: 'totalLongChainOmega3FattyAcids',
	},
	{
		name: 'Total Trans Fatty Acids',
		field: 'totalTransFattyAcids',
	},
	{
		name: 'Caffeine',
		field: 'caffeine',
	},
	{
		name: 'Cholesterol',
		field: 'cholesterol',
	},
	{
		name: 'Alanine',
		field: 'alanine',
	},
	{
		name: 'Arginine',
		field: 'arginine',
	},
	{
		name: 'Aspartic Acid',
		field: 'asparticAcid',
	},
	{
		name: 'Cystine Plus Cysteine',
		field: 'cystinePlusCysteine',
	},
	{
		name: 'Glutamic Acid',
		field: 'glutamicAcid',
	},
	{
		name: 'Glycine',
		field: 'glycine',
	},
	{
		name: 'Histidine',
		field: 'histidine',
	},
	{
		name: 'Isoleucine',
		field: 'isoleucine',
	},
	{
		name: 'Leucine',
		field: 'leucine',
	},
	{
		name: 'Lysine',
		field: 'lysine',
	},
	{
		name: 'Methionine',
		field: 'methionine',
	},
	{
		name: 'Phenylalanine',
		field: 'phenylalanine',
	},
	{
		name: 'Proline',
		field: 'proline',
	},
	{
		name: 'Serine',
		field: 'serine',
	},
	{
		name: 'Threonine',
		field: 'threonine',
	},
	{
		name: 'Tyrosine',
		field: 'tyrosine',
	},
	{
		name: 'Tryptophan',
		field: 'tryptophan',
	},
	{
		name: 'Valine',
		field: 'valine',
	},
	{
		name: 'C4',
		field: 'c4',
	},
	{
		name: 'C6',
		field: 'c6',
	},
	{
		name: 'C8',
		field: 'c8',
	},
	{
		name: 'C10',
		field: 'c10',
	},
	{
		name: 'C11',
		field: 'c11',
	},
	{
		name: 'C12',
		field: 'c12',
	},
	{
		name: 'C13',
		field: 'c13',
	},
	{
		name: 'C14',
		field: 'c14',
	},
	{
		name: 'C15',
		field: 'c15',
	},
	{
		name: 'C16',
		field: 'c16',
	},
	{
		name: 'C17',
		field: 'c17',
	},
	{
		name: 'C18',
		field: 'c18',
	},
	{
		name: 'C19',
		field: 'c19',
	},
	{
		name: 'C20',
		field: 'c20',
	},
	{
		name: 'C21',
		field: 'c21',
	},
	{
		name: 'C22',
		field: 'c22',
	},
	{
		name: 'C23',
		field: 'c23',
	},
	{
		name: 'C24',
		field: 'c24',
	},
	{
		name: 'Total Saturated Fatty Acids Equated',
		field: 'totalSaturatedFattyAcidsEquated',
	},
	{
		name: 'C10 1',
		field: 'c10_1',
	},
	{
		name: 'C12 1',
		field: 'c12_1',
	},
	{
		name: 'C14 1',
		field: 'c14_1',
	},
	{
		name: 'C15 1',
		field: 'c15_1',
	},
	{
		name: 'C16 1',
		field: 'c16_1',
	},
	{
		name: 'C17 1',
		field: 'c17_1',
	},
	{
		name: 'C18 1',
		field: 'c18_1',
	},
	{
		name: 'C18 1w5',
		field: 'c18_1w5',
	},
	{
		name: 'C18 1w6',
		field: 'c18_1w6',
	},
	{
		name: 'C18 1w7',
		field: 'c18_1w7',
	},
	{
		name: 'C18 1w9',
		field: 'c18_1w9',
	},
	{
		name: 'C20 1',
		field: 'c20_1',
	},
	{
		name: 'C20 1w9',
		field: 'c20_1w9',
	},
	{
		name: 'C20 1w13',
		field: 'c20_1w13',
	},
	{
		name: 'C20 1w11',
		field: 'c20_1w11',
	},
	{
		name: 'C22 1',
		field: 'c22_1',
	},
	{
		name: 'C22 1w9',
		field: 'c22_1w9',
	},
	{
		name: 'C22 1w11',
		field: 'c22_1w11',
	},
	{
		name: 'C24 1',
		field: 'c24_1',
	},
	{
		name: 'C24 1w9',
		field: 'c24_1w9',
	},
	{
		name: 'C24 1w11',
		field: 'c24_1w11',
	},
	{
		name: 'C24 1w13',
		field: 'c24_1w13',
	},
	{
		name: 'C12 2',
		field: 'c12_2',
	},
	{
		name: 'C16 2w4',
		field: 'c16_2w4',
	},
	{
		name: 'C16 3',
		field: 'c16_3',
	},
	{
		name: 'C18 2w6',
		field: 'c18_2w6',
	},
	{
		name: 'C18 3w3',
		field: 'c18_3w3',
	},
	{
		name: 'C18 3w4',
		field: 'c18_3w4',
	},
	{
		name: 'C18 3w6',
		field: 'c18_3w6',
	},
	{
		name: 'C18 4w1',
		field: 'c18_4w1',
	},
	{
		name: 'C18 4w3',
		field: 'c18_4w3',
	},
	{
		name: 'C20 2',
		field: 'c20_2',
	},
	{
		name: 'C20 2w6',
		field: 'c20_2w6',
	},
	{
		name: 'C20 3',
		field: 'c20_3',
	},
	{
		name: 'C20 3w3',
		field: 'c20_3w3',
	},
	{
		name: 'C20 3w6',
		field: 'c20_3w6',
	},
	{
		name: 'C20 4',
		field: 'c20_4',
	},
	{
		name: 'C20 4w3',
		field: 'c20_4w3',
	},
	{
		name: 'C20 4w6',
		field: 'c20_4w6',
	},
	{
		name: 'C20 5w3',
		field: 'c20_5w3',
	},
	{
		name: 'C21 5w3',
		field: 'c21_5w3',
	},
	{
		name: 'C22 2',
		field: 'c22_2',
	},
	{
		name: 'C22 2w6',
		field: 'c22_2w6',
	},
	{
		name: 'C22 4w6',
		field: 'c22_4w6',
	},
	{
		name: 'C22 5w3',
		field: 'c22_5w3',
	},
	{
		name: 'C22 5w6',
		field: 'c22_5w6',
	},
	{
		name: 'C22 6w3',
		field: 'c22_6w3',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids Equated',
		field: 'totalPolyunsaturatedFattyAcidsEquated',
	},
	{
		name: 'Total Monounsaturated Fatty Acids Equated',
		field: 'totalMonounsaturatedFattyAcidsEquated',
	},
]

export const fieldsMapWUnit = [
	{
		name: 'Calories w Fibre',
		field: 'caloriesWFibre',
		unit: 'kJ',
	},
	{
		name: 'Calories',
		field: 'caloriesWOFibre',
		unit: 'kJ',
	},
	{
		name: 'Protein',
		field: 'protein',
		unit: 'g',
	},
	{
		name: 'Fat',
		field: 'fatTotal',
		unit: 'g',
	},
	{
		name: 'Carbohydrate',
		field: 'totalDietaryFibre',
		unit: 'g',
	},
	{
		name: 'Sugars',
		field: 'totalSugars',
		unit: 'g',
	},
	{
		name: 'Starch',
		field: 'starch',
		unit: 'g',
	},
	{
		name: 'Resistant Starch',
		field: 'resistantStarch',
		unit: 'g',
	},
	{
		name: 'Available Carbohydrate Without Sugar Alcohol',
		field: 'availableCarbohydrateWithoutSugarAlcohols',
		unit: 'g',
	},
	{
		name: 'Available Carbohydrate With Sugar Alcohol',
		field: 'availableCarbohydrateWithSugarAlcohols',
		unit: 'g',
	},
	{
		name: 'Added Sugars',
		field: 'addedSugars',
		unit: 'g',
	},
	{
		name: 'Free Sugars',
		field: 'freeSugars',
		unit: 'g',
	},
	{
		name: 'Moisture',
		field: 'moisture',
		unit: 'g',
	},
	{
		name: 'Nitrogen',
		field: 'nitrogen',
		unit: 'g',
	},
	{
		name: 'Alcohol',
		field: 'alcohol',
		unit: 'g',
	},
	{
		name: 'Fructose',
		field: 'fructose',
		unit: 'g',
	},
	{
		name: 'Glucose',
		field: 'glucose',
		unit: 'g',
	},
	{
		name: 'Sucrose',
		field: 'sucrose',
		unit: 'g',
	},
	{
		name: 'Maltose',
		field: 'maltose',
		unit: 'g',
	},
	{
		name: 'Lactose',
		field: 'lactose',
		unit: 'g',
	},
	{
		name: 'Galactose',
		field: 'galactose',
		unit: 'g',
	},
	{
		name: 'Maltotriose',
		field: 'maltotrios',
		unit: 'g',
	},
	{
		name: 'Ash',
		field: 'ash',
		unit: 'g',
	},
	{
		name: 'Dextrin',
		field: 'dextrin',
		unit: 'g',
	},
	{
		name: 'Glycerol',
		field: 'glycerol',
		unit: 'g',
	},
	{
		name: 'Glycogen',
		field: 'glycogen',
		unit: 'g',
	},
	{
		name: 'Inulin',
		field: 'inulin',
		unit: 'g',
	},
	{
		name: 'Erythritol',
		field: 'erythritol',
		unit: 'g',
	},
	{
		name: 'Maltitol',
		field: 'maltitol',
		unit: 'g',
	},
	{
		name: 'Mannitol',
		field: 'mannitol',
		unit: 'g',
	},
	{
		name: 'Xylitol',
		field: 'xylitol',
		unit: 'g',
	},
	{
		name: 'Maltodextrin',
		field: 'maltodextrin',
		unit: 'g',
	},
	{
		name: 'Oleic Acid',
		field: 'oleicAcid',
		unit: 'mg',
	},
	{
		name: 'Polydextrose',
		field: 'polydextrose',
		unit: 'g',
	},
	{
		name: 'Raffinose',
		field: 'raffinose',
		unit: 'g',
	},
	{
		name: 'Stachyose',
		field: 'stachyose',
		unit: 'g',
	},
	{
		name: 'Sorbitol',
		field: 'sorbitol',
		unit: 'g',
	},
	{
		name: 'Acetic Acid',
		field: 'aceticAcid',
		unit: 'g',
	},
	{
		name: 'Citric Acid',
		field: 'citricAcid',
		unit: 'g',
	},
	{
		name: 'Fumaric Acid',
		field: 'fumaricAcid',
		unit: 'g',
	},
	{
		name: 'Lactic Acid',
		field: 'lacticAcid',
		unit: 'g',
	},
	{
		name: 'Malic Acid',
		field: 'malicAcid',
		unit: 'g',
	},
	{
		name: 'Oxalic Acid',
		field: 'oxalicAcid',
		unit: 'g',
	},
	{
		name: 'Propionic Acid',
		field: 'propionicAcid',
		unit: 'g',
	},
	{
		name: 'Quinic Acid',
		field: 'quinicAcid',
		unit: 'g',
	},
	{
		name: 'Shikimic Acid',
		field: 'shikimicAcid',
		unit: 'g',
	},
	{
		name: 'Succinic Acid',
		field: 'succinicAcid',
		unit: 'g',
	},
	{
		name: 'Tartaric Acid',
		field: 'tartaricAcid',
		unit: 'g',
	},
	{
		name: 'Aluminium',
		field: 'aluminium',
		unit: 'ug',
	},
	{
		name: 'Antimony',
		field: 'antimony',
		unit: 'ug',
	},
	{
		name: 'Arsenic',
		field: 'arsenic',
		unit: 'ug',
	},
	{
		name: 'Cadmium',
		field: 'cadmium',
		unit: 'ug',
	},
	{
		name: 'Calcium',
		field: 'calcium',
		unit: 'mg',
	},
	{
		name: 'Chromium',
		field: 'chromium',
		unit: 'ug',
	},
	{
		name: 'Chloride',
		field: 'chloride',
		unit: 'mg',
	},
	{
		name: 'Cobalt',
		field: 'cobalt',
		unit: 'ug',
	},
	{
		name: 'Copper',
		field: 'copper',
		unit: 'mg',
	},
	{
		name: 'Fluoride',
		field: 'fluoride',
		unit: 'ug',
	},
	{
		name: 'Iodine',
		field: 'iodine',
		unit: 'ug',
	},
	{
		name: 'Iron',
		field: 'iron',
		unit: 'mg',
	},
	{
		name: 'Lead',
		field: 'lead',
		unit: 'ug',
	},
	{
		name: 'Magnesium',
		field: 'magnesium',
		unit: 'mg',
	},
	{
		name: 'Manganese',
		field: 'manganese',
		unit: 'mg',
	},
	{
		name: 'Mercury',
		field: ' mercury',
		unit: 'ug',
	},
	{
		name: 'Molybdenum',
		field: 'molybdenum',
		unit: 'ug',
	},
	{
		name: 'Nickel',
		field: 'nickel',
		unit: 'ug',
	},
	{
		name: 'Phosphorus',
		field: 'phosphorus',
		unit: 'mg',
	},
	{
		name: 'Potassium',
		field: 'potassium',
		unit: 'mg',
	},
	{
		name: 'Selenium',
		field: 'selenium',
		unit: 'ug',
	},
	{
		name: 'Sodium',
		field: 'sodium',
		unit: 'mg',
	},
	{
		name: 'Sulphur',
		field: 'sulphur',
		unit: 'mg',
	},
	{
		name: 'Tin',
		field: 'tin',
		unit: 'ug',
	},
	{
		name: 'Zinc',
		field: 'zinc',
		unit: 'mg',
	},
	{
		name: 'Retinol',
		field: 'retinol',
		unit: 'ug',
	},
	{
		name: 'Alpha Carotene',
		field: 'alphaCarotene',
		unit: 'ug',
	},
	{
		name: 'Beta Carotene',
		field: 'betaCarotene',
		unit: 'ug',
	},
	{
		name: 'Cryptoxanthin',
		field: 'cryptoxanthin',
		unit: 'ug',
	},
	{
		name: 'Beta Carotene Equivalents',
		field: 'betaCaroteneEquivalents',
		unit: 'ug',
	},
	{
		name: 'Vitamin ARetinol Equivalents',
		field: 'vitaminARetinolEquivalents',
		unit: 'ug',
	},
	{
		name: 'Lutein',
		field: 'lutein',
		unit: 'ug',
	},
	{
		name: 'Lycopene',
		field: 'lycopene',
		unit: 'ug',
	},
	{
		name: 'Xanthophyl',
		field: 'xanthophyl',
		unit: 'ug',
	},
	{
		name: 'Thiamin',
		field: 'thiamin',
		unit: 'mg',
	},
	{
		name: 'Riboflavin',
		field: 'riboflavin',
		unit: 'mg',
	},
	{
		name: 'Niacin',
		field: 'niacin',
		unit: 'mg',
	},
	{
		name: 'Niacin Derived From Tryptophan',
		field: 'niacinDerivedFromTryptophan',
		unit: 'mg',
	},
	{
		name: 'Niacin Derived Equivalents',
		field: 'niacinDerivedEquivalents',
		unit: 'mg',
	},
	{
		name: 'Pantothenic Acid',
		field: 'pantothenicAcid',
		unit: 'mg',
	},
	{
		name: 'Pyridoxine',
		field: 'pyridoxine',
		unit: 'mg',
	},
	{
		name: 'Biotin',
		field: 'biotin',
		unit: 'ug',
	},
	{
		name: 'Coalamin',
		field: 'cobalamin',
		unit: 'ug',
	},
	{
		name: 'Folate Natural',
		field: 'folateNatural',
		unit: 'ug',
	},
	{
		name: 'Folic Acid',
		field: 'folicAcid',
		unit: 'ug',
	},
	{
		name: 'Total Folates',
		field: 'totalFolates',
		unit: 'ug',
	},
	{
		name: 'Dietary Folate Equivalents',
		field: 'dietaryFolateEquivalents',
		unit: 'ug',
	},
	{
		name: 'Vitamin C',
		field: 'vitaminC',
		unit: 'mg',
	},
	{
		name: 'Cholecalciferol',
		field: 'cholecalciferol',
		unit: 'ug',
	},
	{
		name: 'Ergocalciferol',
		field: 'ergocalciferol',
		unit: 'ug',
	},
	{
		name: 'Hydroxy Cholecalciferol',
		field: 'hydroxyCholecalciferol',
		unit: 'ug',
	},
	{
		name: 'Hydroxy Ergocalciferol',
		field: 'hydroxyErgocalciferol',
		unit: 'ug',
	},
	{
		name: 'Vitamin DEquivalents',
		field: 'vitaminDEquivalents',
		unit: 'ug',
	},
	{
		name: 'Alpha Tocopherol',
		field: 'alphaTocopherol',
		unit: 'mg',
	},
	{
		name: 'Alpha Tocotrienol',
		field: 'alphaTocotrienol',
		unit: 'mg',
	},
	{
		name: 'Beta Tocopherol',
		field: 'betaTocopherol',
		unit: 'mg',
	},
	{
		name: 'Beta Tocotrienol',
		field: 'betaTocotrienol',
		unit: 'mg',
	},
	{
		name: 'Delta Tocopherol',
		field: 'deltaTocopherol',
		unit: 'mg',
	},
	{
		name: 'Delta Tocotrienol',
		field: 'deltaTocotrienol',
		unit: 'mg',
	},
	{
		name: 'Gamma Tocopherol',
		field: 'gammaTocopherol',
		unit: 'mg',
	},
	{
		name: 'Gamma Tocotrienol',
		field: 'gammaTocotrienol',
		unit: 'mg',
	},
	{
		name: 'Vitamin E',
		field: 'vitaminE',
		unit: 'mg',
	},
	{
		name: 'Total Saturated Fatty Acids',
		field: 'totalSaturatedFattyAcids',
		unit: 'g',
	},
	{
		name: 'Total Monounsaturated Fatty Acids',
		field: 'totalMonounsaturatedFattyAcids',
		unit: 'g',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids',
		field: 'totalPolyunsaturatedFattyAcids',
		unit: 'g',
	},
	{
		name: 'Total Long Chain Omega 3Fatty Acids',
		field: 'totalLongChainOmega3FattyAcids',
		unit: 'mg',
	},
	{
		name: 'Total Trans Fatty Acids',
		field: 'totalTransFattyAcids',
		unit: 'mg',
	},
	{
		name: 'Caffeine',
		field: 'caffeine',
		unit: 'mg',
	},
	{
		name: 'Cholesterol',
		field: 'cholesterol',
		unit: 'mg',
	},
	{
		name: 'Alanine',
		field: 'alanine',
		unit: 'mg/gN',
	},
	{
		name: 'Arginine',
		field: 'arginine',
		unit: 'mg/gN',
	},
	{
		name: 'Aspartic Acid',
		field: 'asparticAcid',
		unit: 'mg/gN',
	},
	{
		name: 'Cystine Plus Cysteine',
		field: 'cystinePlusCysteine',
		unit: 'mg/gN',
	},
	{
		name: 'Glutamic Acid',
		field: 'glutamicAcid',
		unit: 'mg/gN',
	},
	{
		name: 'Glycine',
		field: 'glycine',
		unit: 'mg/gN',
	},
	{
		name: 'Histidine',
		field: 'histidine',
		unit: 'mg/gN',
	},
	{
		name: 'Isoleucine',
		field: 'isoleucine',
		unit: 'mg/gN',
	},
	{
		name: 'Leucine',
		field: 'leucine',
		unit: 'mg/gN',
	},
	{
		name: 'Lysine',
		field: 'lysine',
		unit: 'mg/gN',
	},
	{
		name: 'Methionine',
		field: 'methionine',
		unit: 'mg/gN',
	},
	{
		name: 'Phenylalanine',
		field: 'phenylalanine',
		unit: 'mg/gN',
	},
	{
		name: 'Proline',
		field: 'proline',
		unit: 'mg/gN',
	},
	{
		name: 'Serine',
		field: 'serine',
		unit: 'mg/gN',
	},
	{
		name: 'Threonine',
		field: 'threonine',
		unit: 'mg/gN',
	},
	{
		name: 'Tyrosine',
		field: 'tyrosine',
		unit: 'mg/gN',
	},
	{
		name: 'Tryptophan',
		field: 'tryptophan',
		unit: 'mg/gN',
	},
	{
		name: 'Valine',
		field: 'valine',
		unit: 'mg/gN',
	},
	{
		name: 'C4',
		field: 'c4',
		unit: 'g',
	},
	{
		name: 'C6',
		field: 'c6',
		unit: 'g',
	},
	{
		name: 'C8',
		field: 'c8',
		unit: 'g',
	},
	{
		name: 'C10',
		field: 'c10',
		unit: 'g',
	},
	{
		name: 'C11',
		field: 'c11',
		unit: 'g',
	},
	{
		name: 'C12',
		field: 'c12',
		unit: 'g',
	},
	{
		name: 'C13',
		field: 'c13',
		unit: 'g',
	},
	{
		name: 'C14',
		field: 'c14',
		unit: 'g',
	},
	{
		name: 'C15',
		field: 'c15',
		unit: 'g',
	},
	{
		name: 'C16',
		field: 'c16',
		unit: 'g',
	},
	{
		name: 'C17',
		field: 'c17',
		unit: 'g',
	},
	{
		name: 'C18',
		field: 'c18',
		unit: 'g',
	},
	{
		name: 'C19',
		field: 'c19',
		unit: 'g',
	},
	{
		name: 'C20',
		field: 'c20',
		unit: 'g',
	},
	{
		name: 'C21',
		field: 'c21',
		unit: 'g',
	},
	{
		name: 'C22',
		field: 'c22',
		unit: 'g',
	},
	{
		name: 'C23',
		field: 'c23',
		unit: 'g',
	},
	{
		name: 'C24',
		field: 'c24',
		unit: 'g',
	},
	{
		name: 'Total Saturated Fatty Acids Equated',
		field: 'totalSaturatedFattyAcidsEquated',
		unit: 'g',
	},
	{
		name: 'C10 1',
		field: 'c10_1',
		unit: 'g',
	},
	{
		name: 'C12 1',
		field: 'c12_1',
		unit: 'g',
	},
	{
		name: 'C14 1',
		field: 'c14_1',
		unit: 'g',
	},
	{
		name: 'C15 1',
		field: 'c15_1',
		unit: 'g',
	},
	{
		name: 'C16 1',
		field: 'c16_1',
		unit: 'g',
	},
	{
		name: 'C17 1',
		field: 'c17_1',
		unit: 'g',
	},
	{
		name: 'C18 1',
		field: 'c18_1',
		unit: 'g',
	},
	{
		name: 'C18 1w5',
		field: 'c18_1w5',
		unit: 'mg',
	},
	{
		name: 'C18 1w6',
		field: 'c18_1w6',
		unit: 'mg',
	},
	{
		name: 'C18 1w7',
		field: 'c18_1w7',
		unit: 'g',
	},
	{
		name: 'C18 1w9',
		field: 'c18_1w9',
		unit: 'mg',
	},
	{
		name: 'C20 1',
		field: 'c20_1',
		unit: 'g',
	},
	{
		name: 'C20 1w9',
		field: 'c20_1w9',
		unit: 'mg',
	},
	{
		name: 'C20 1w13',
		field: 'c20_1w13',
		unit: 'mg',
	},
	{
		name: 'C20 1w11',
		field: 'c20_1w11',
		unit: 'mg',
	},
	{
		name: 'C22 1',
		field: 'c22_1',
		unit: 'g',
	},
	{
		name: 'C22 1w9',
		field: 'c22_1w9',
		unit: 'mg',
	},
	{
		name: 'C22 1w11',
		field: 'c22_1w11',
		unit: 'mg',
	},
	{
		name: 'C24 1',
		field: 'c24_1',
		unit: 'g',
	},
	{
		name: 'C24 1w9',
		field: 'c24_1w9',
		unit: 'mg',
	},
	{
		name: 'C24 1w11',
		field: 'c24_1w11',
		unit: 'mg',
	},
	{
		name: 'C24 1w13',
		field: 'c24_1w13',
		unit: 'mg',
	},
	{
		name: 'C12 2',
		field: 'c12_2',
		unit: 'g',
	},
	{
		name: 'C16 2w4',
		field: 'c16_2w4',
		unit: 'mg',
	},
	{
		name: 'C16 3',
		field: 'c16_3',
		unit: 'g',
	},
	{
		name: 'C18 2w6',
		field: 'c18_2w6',
		unit: 'g',
	},
	{
		name: 'C18 3w3',
		field: 'c18_3w3',
		unit: 'g',
	},
	{
		name: 'C18 3w4',
		field: 'c18_3w4',
		unit: 'g',
	},
	{
		name: 'C18 3w6',
		field: 'c18_3w6',
		unit: 'mg',
	},
	{
		name: 'C18 4w1',
		field: 'c18_4w1',
		unit: 'g',
	},
	{
		name: 'C18 4w3',
		field: 'c18_4w3',
		unit: 'mg',
	},
	{
		name: 'C20 2',
		field: 'c20_2',
		unit: 'mg',
	},
	{
		name: 'C20 2w6',
		field: 'c20_2w6',
		unit: 'mg',
	},
	{
		name: 'C20 3',
		field: 'c20_3',
		unit: 'mg',
	},
	{
		name: 'C20 3w3',
		field: 'c20_3w3',
		unit: 'mg',
	},
	{
		name: 'C20 3w6',
		field: 'c20_3w6',
		unit: 'mg',
	},
	{
		name: 'C20 4',
		field: 'c20_4',
		unit: 'g',
	},
	{
		name: 'C20 4w3',
		field: 'c20_4w3',
		unit: 'mg',
	},
	{
		name: 'C20 4w6',
		field: 'c20_4w6',
		unit: 'mg',
	},
	{
		name: 'C20 5w3',
		field: 'c20_5w3',
		unit: 'mg',
	},
	{
		name: 'C21 5w3',
		field: 'c21_5w3',
		unit: 'g',
	},
	{
		name: 'C22 2',
		field: 'c22_2',
		unit: 'g',
	},
	{
		name: 'C22 2w6',
		field: 'c22_2w6',
		unit: 'mg',
	},
	{
		name: 'C22 4w6',
		field: 'c22_4w6',
		unit: 'mg',
	},
	{
		name: 'C22 5w3',
		field: 'c22_5w3',
		unit: 'mg',
	},
	{
		name: 'C22 5w6',
		field: 'c22_5w6',
		unit: 'g',
	},
	{
		name: 'C22 6w3',
		field: 'c22_6w3',
		unit: 'mg',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids Equated',
		field: 'totalPolyunsaturatedFattyAcidsEquated',
		unit: 'g',
	},
	{
		name: 'Total Monounsaturated Fatty Acids Equated',
		field: 'totalMonounsaturatedFattyAcidsEquated',
		unit: 'g',
	},
]


export const formSchema = z.object({
	name: z.string().min(1),
	serveSize: z.number(),
	serveUnit: z.string().min(1),
	caloriesWFibre: z.number().nullable(),
	caloriesWOFibre: z.number().nullable(),
	protein: z.number().nullable(),
	fatTotal: z.number().nullable(),
	totalDietaryFibre: z.number().nullable(),
	totalSugars: z.number().nullable(),
	starch: z.number().nullable(),
	resistantStarch: z.number().nullable(),
	availableCarbohydrateWithoutSugarAlcohols: z.number().nullable(),
	availableCarbohydrateWithSugarAlcohols: z.number().nullable(),
	addedSugars: z.number().nullable(),
	freeSugars: z.number().nullable(),
	moisture: z.number().nullable(),
	nitrogen: z.number().nullable(),
	alcohol: z.number().nullable(),
	fructose: z.number().nullable(),
	glucose: z.number().nullable(),
	sucrose: z.number().nullable(),
	maltose: z.number().nullable(),
	lactose: z.number().nullable(),
	galactose: z.number().nullable(),
	maltotrios: z.number().nullable(),
	ash: z.number().nullable(),
	dextrin: z.number().nullable(),
	glycerol: z.number().nullable(),
	glycogen: z.number().nullable(),
	inulin: z.number().nullable(),
	erythritol: z.number().nullable(),
	maltitol: z.number().nullable(),
	mannitol: z.number().nullable(),
	xylitol: z.number().nullable(),
	maltodextrin: z.number().nullable(),
	oligosaccharides: z.number().nullable(),
	polydextrose: z.number().nullable(),
	raffinose: z.number().nullable(),
	stachyose: z.number().nullable(),
	sorbitol: z.number().nullable(),
	aceticAcid: z.number().nullable(),
	citricAcid: z.number().nullable(),
	fumaricAcid: z.number().nullable(),
	lacticAcid: z.number().nullable(),
	malicAcid: z.number().nullable(),
	oxalicAcid: z.number().nullable(),
	propionicAcid: z.number().nullable(),
	quinicAcid: z.number().nullable(),
	shikimicAcid: z.number().nullable(),
	succinicAcid: z.number().nullable(),
	tartaricAcid: z.number().nullable(),
	aluminium: z.number().nullable(),
	antimony: z.number().nullable(),
	arsenic: z.number().nullable(),
	cadmium: z.number().nullable(),
	calcium: z.number().nullable(),
	chromium: z.number().nullable(),
	chloride: z.number().nullable(),
	cobalt: z.number().nullable(),
	copper: z.number().nullable(),
	fluoride: z.number().nullable(),
	iodine: z.number().nullable(),
	iron: z.number().nullable(),
	lead: z.number().nullable(),
	magnesium: z.number().nullable(),
	manganese: z.number().nullable(),
	mercury: z.number().nullable(),
	molybdenum: z.number().nullable(),
	nickel: z.number().nullable(),
	phosphorus: z.number().nullable(),
	potassium: z.number().nullable(),
	selenium: z.number().nullable(),
	sodium: z.number().nullable(),
	sulphur: z.number().nullable(),
	tin: z.number().nullable(),
	zinc: z.number().nullable(),
	retinol: z.number().nullable(),
	alphaCarotene: z.number().nullable(),
	betaCarotene: z.number().nullable(),
	cryptoxanthin: z.number().nullable(),
	betaCaroteneEquivalents: z.number().nullable(),
	vitaminARetinolEquivalents: z.number().nullable(),
	lutein: z.number().nullable(),
	lycopene: z.number().nullable(),
	xanthophyl: z.number().nullable(),
	thiamin: z.number().nullable(),
	riboflavin: z.number().nullable(),
	niacin: z.number().nullable(),
	niacinDerivedFromTryptophan: z.number().nullable(),
	niacinDerivedEquivalents: z.number().nullable(),
	pantothenicAcid: z.number().nullable(),
	pyridoxine: z.number().nullable(),
	biotin: z.number().nullable(),
	cobalamin: z.number().nullable(),
	folateNatural: z.number().nullable(),
	folicAcid: z.number().nullable(),
	totalFolates: z.number().nullable(),
	dietaryFolateEquivalents: z.number().nullable(),
	vitaminC: z.number().nullable(),
	cholecalciferol: z.number().nullable(),
	ergocalciferol: z.number().nullable(),
	hydroxyCholecalciferol: z.number().nullable(),
	hydroxyErgocalciferol: z.number().nullable(),
	vitaminDEquivalents: z.number().nullable(),
	alphaTocopherol: z.number().nullable(),
	alphaTocotrienol: z.number().nullable(),
	betaTocopherol: z.number().nullable(),
	betaTocotrienol: z.number().nullable(),
	deltaTocopherol: z.number().nullable(),
	deltaTocotrienol: z.number().nullable(),
	gammaTocopherol: z.number().nullable(),
	gammaTocotrienol: z.number().nullable(),
	vitaminE: z.number().nullable(),
	totalSaturatedFattyAcids: z.number().nullable(),
	totalMonounsaturatedFattyAcids: z.number().nullable(),
	totalPolyunsaturatedFattyAcids: z.number().nullable(),
	totalLongChainOmega3FattyAcids: z.number().nullable(),
	totalTransFattyAcids: z.number().nullable(),
	caffeine: z.number().nullable(),
	cholesterol: z.number().nullable(),
	alanine: z.number().nullable(),
	arginine: z.number().nullable(),
	asparticAcid: z.number().nullable(),
	cystinePlusCysteine: z.number().nullable(),
	glutamicAcid: z.number().nullable(),
	glycine: z.number().nullable(),
	histidine: z.number().nullable(),
	isoleucine: z.number().nullable(),
	leucine: z.number().nullable(),
	lysine: z.number().nullable(),
	methionine: z.number().nullable(),
	phenylalanine: z.number().nullable(),
	proline: z.number().nullable(),
	serine: z.number().nullable(),
	threonine: z.number().nullable(),
	tyrosine: z.number().nullable(),
	tryptophan: z.number().nullable(),
	valine: z.number().nullable(),
	c4: z.number().nullable(),
	c6: z.number().nullable(),
	c8: z.number().nullable(),
	c10: z.number().nullable(),
	c11: z.number().nullable(),
	c12: z.number().nullable(),
	c13: z.number().nullable(),
	c14: z.number().nullable(),
	c15: z.number().nullable(),
	c16: z.number().nullable(),
	c17: z.number().nullable(),
	c18: z.number().nullable(),
	c19: z.number().nullable(),
	c20: z.number().nullable(),
	c21: z.number().nullable(),
	c22: z.number().nullable(),
	c23: z.number().nullable(),
	c24: z.number().nullable(),
	totalSaturatedFattyAcidsEquated: z.number().nullable(),
	c10_1: z.number().nullable(),
	c12_1: z.number().nullable(),
	c14_1: z.number().nullable(),
	c15_1: z.number().nullable(),
	c16_1: z.number().nullable(),
	c17_1: z.number().nullable(),
	c18_1: z.number().nullable(),
	c18_1w5: z.number().nullable(),
	c18_1w6: z.number().nullable(),
	c18_1w7: z.number().nullable(),
	c18_1w9: z.number().nullable(),
	c20_1: z.number().nullable(),
	c20_1w9: z.number().nullable(),
	c20_1w13: z.number().nullable(),
	c20_1w11: z.number().nullable(),
	c22_1: z.number().nullable(),
	c22_1w9: z.number().nullable(),
	c22_1w11: z.number().nullable(),
	c24_1: z.number().nullable(),
	c24_1w9: z.number().nullable(),
	c24_1w11: z.number().nullable(),
	c24_1w13: z.number().nullable(),
	totalMonounsaturatedFattyAcidsEquated: z.number().nullable(),
	c12_2: z.number().nullable(),
	c16_2w4: z.number().nullable(),
	c16_3: z.number().nullable(),
	c18_2w6: z.number().nullable(),
	c18_3w3: z.number().nullable(),
	c18_3w4: z.number().nullable(),
	c18_3w6: z.number().nullable(),
	c18_4w1: z.number().nullable(),
	c18_4w3: z.number().nullable(),
	c20_2: z.number().nullable(),
	c20_2w6: z.number().nullable(),
	c20_3: z.number().nullable(),
	c20_3w3: z.number().nullable(),
	c20_3w6: z.number().nullable(),
	c20_4: z.number().nullable(),
	c20_4w3: z.number().nullable(),
	c20_4w6: z.number().nullable(),
	c20_5w3: z.number().nullable(),
	c21_5w3: z.number().nullable(),
	c22_2: z.number().nullable(),
	c22_2w6: z.number().nullable(),
	c22_4w6: z.number().nullable(),
	c22_5w3: z.number().nullable(),
	c22_5w6: z.number().nullable(),
	c22_6w3: z.number().nullable(),
	totalPolyunsaturatedFattyAcidsEquated: z.number().nullable(),
})
