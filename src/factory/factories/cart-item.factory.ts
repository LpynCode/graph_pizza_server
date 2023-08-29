import { IBaseFactory } from '../../common/base.factory.interface';
import { CartItemEntity } from '../../entities/cart-item.entity';
import { createCartItemEntityType } from '../../entities/types/create-cart-item-entity.type';

export class CartItemFactory implements IBaseFactory<CartItemEntity> {
	createEntity(schema?: createCartItemEntityType): CartItemEntity | null {
		if (!schema) return null;
		return new CartItemEntity(schema);
	}

	createEntities(schemas: createCartItemEntityType[]): Record<string, any>[] {
		return schemas.map((schema) => new CartItemEntity(schema));
	}
}
