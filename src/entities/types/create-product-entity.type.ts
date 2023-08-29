import {
	CharacteristicSchema,
	IngredientSchema,
	PictureSchema,
	ProductSchema,
	SizeSchema,
	UnitSchema,
} from '@prisma/client';

export type createProductEntityType = ProductSchema & {
	picture?: PictureSchema;
	ingredients?: { ingredient: IngredientSchema }[];
	characteristics?: {
		characteristic: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } };
	}[];
};
