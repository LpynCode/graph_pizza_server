import { IngredientSchema } from '@prisma/client';
import { IDisplayIngredient } from 'src/ingredient/interfaces/display-ingredient.interface';
import { IBaseEntity } from '../common/base.entity.interface';
import { IWithPriceIngredient } from '../ingredient/interfaces/with-price-ingredient.interface';

export class IngredientEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _price?: number;

	constructor({ id, name, price }: IngredientSchema & { price?: number }) {
		this._id = id;
		this._name = name;
		this._price = price;
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

	getDisplay(): IDisplayIngredient {
		return {
			id: this._id,
			name: this._name,
		};
	}

	getWithPrice(): IWithPriceIngredient {
		return {
			id: this._id,
			name: this._name,
			price: this._price,
		};
	}
}
