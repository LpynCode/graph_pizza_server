import { IDisplayCharacteristic } from 'src/characteristic/interfaces/display-characteristic.interface';
import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { createProductEntityType } from './create-product-entity.type';
import {
	CharacteristicSchema,
	SizeSchema,
	UnitSchema,
	IngredientSchema,
	IngredientsToAddSchema,
} from '@prisma/client';
import { IWithPriceIngredient } from '../../ingredient/interfaces/with-price-ingredient.interface';

export type createCartItemEntityType = {
	id: number;
	product: createProductEntityType;
	characteristic: CharacteristicSchema & { size: SizeSchema & { unit: UnitSchema } };
	count: number;
	ingredientsToAdd: { ingredient: { price: number; ingredient: IngredientSchema } }[];
};
