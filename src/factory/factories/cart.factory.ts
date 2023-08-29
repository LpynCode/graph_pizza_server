import { IBaseFactory } from '../../common/base.factory.interface';
import { CartEntity } from '../../entities/cart.entity';
import { createCartEntityType } from '../../entities/types/create-cart-entity.type';

export class CartFactory implements IBaseFactory<CartEntity> {
	createEntities(schemas: createCartEntityType[]): Record<string, any>[] {
		return schemas.map((schema) => new CartEntity(schema));
	}

	createEntity(schema: createCartEntityType): CartEntity | null {
		if (!schema) {
			return null;
		}
		return new CartEntity(schema);
	}
}
