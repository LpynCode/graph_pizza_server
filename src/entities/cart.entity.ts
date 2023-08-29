import { IBaseEntity } from '../common/base.entity.interface';
import { createCartEntityType } from './types/create-cart-entity.type';
import { IDisplayCartItem } from '../cart/interfaces/display-cart-item.interface';
import { IDisplayCart } from '../cart/interfaces/display-cart.interface';
import { CartItemEntity } from './cart-item.entity';

export class CartEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _userId: number;
	private readonly _items: IDisplayCartItem[];
	private readonly _total_price: number;

	constructor({ userId, items }: createCartEntityType) {
		this._id = Date.now();
		this._userId = userId;
		this._items = items.map((item) => new CartItemEntity(item).getDisplay());
		this._total_price = items.reduce(
			(acc, item) =>
				acc +
				item.characteristic.price * item.count +
				item.ingredientsToAdd?.reduce(
					(accumulator, { ingredient }) => accumulator + ingredient.price,
					0,
				),
			0,
		);
	}

	get id(): number {
		return this._id;
	}

	get userId(): number {
		return this._userId;
	}

	getDisplay(): IDisplayCart {
		return {
			userId: this._userId,
			items: this._items,
			total_price: this._total_price,
		};
	}
}
