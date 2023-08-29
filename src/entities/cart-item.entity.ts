import { IBaseEntity } from 'src/common/base.entity.interface';
import { createCartItemEntityType } from './types/create-cart-item-entity.type';
import { IProductToCart } from '../products/interfaces/product-to-cart.interface';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';
import { IDisplayCartItem } from '../cart/interfaces/display-cart-item.interface';
import { ProductEntity } from './product.entity';
import { CharacteristicEntity } from './characteristic.entity';
import { IWithPriceIngredient } from '../ingredient/interfaces/with-price-ingredient.interface';
import { IngredientEntity } from './ingredient.entity';

export class CartItemEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _product: IProductToCart;
	private readonly _characteristic: IDisplayCharacteristic;
	private readonly _count: number;
	private readonly _ingredientsToAdd?: IWithPriceIngredient[];

	constructor({
		id,
		product,
		characteristic,
		ingredientsToAdd,
		count,
	}: createCartItemEntityType) {
		this._id = id;
		this._product = new ProductEntity(product).getProductToCart();
		this._characteristic = new CharacteristicEntity(characteristic).getDisplay();
		this._count = count;
		this._ingredientsToAdd = ingredientsToAdd?.map(({ ingredient }) =>
			new IngredientEntity({
				...ingredient.ingredient,
				price: ingredient.price,
			}).getWithPrice(),
		);
	}

	get id(): number {
		return this._id;
	}

	get product(): IProductToCart {
		return this._product;
	}

	get characteristic(): IDisplayCharacteristic {
		return this._characteristic;
	}

	getDisplay(): IDisplayCartItem {
		return {
			id: this._id,
			product: this._product,
			characteristic: this._characteristic,
			count: this._count,
			addIngredients: this._ingredientsToAdd,
		};
	}
}
