import { IngredientEntity } from '../../entities/ingredient.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IngredientSchema, IngredientsToAddSchema } from '@prisma/client';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';
import { IWithPriceIngredient } from '../../ingredient/interfaces/with-price-ingredient.interface';

export class IngredientFactory implements IBaseFactory<IngredientEntity> {
	createEntity(schema: IngredientSchema & { price?: number }): IngredientEntity {
		if (!schema) return null;
		return new IngredientEntity(schema);
	}

	createEntities(schemas: IngredientSchema[]): IDisplayIngredient[] {
		return schemas.map((schema) => new IngredientEntity(schema).getDisplay());
	}

	createEntitiesWithPrice(
		schemas: (IngredientsToAddSchema & { ingredient: { id: number; name: string } })[],
	): IWithPriceIngredient[] {
		return schemas.map(({ ingredient, price }) =>
			new IngredientEntity({
				...ingredient,
				price,
			}).getWithPrice(),
		);
	}
}
