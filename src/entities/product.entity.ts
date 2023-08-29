import { IDisplayProduct } from '../products/interfaces/display-product.interface';
import { IDisplayIngredient } from '../ingredient/interfaces/display-ingredient.interface';
import { IngredientEntity } from './ingredient.entity';
import { CharacteristicEntity } from './characteristic.entity';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';
import { IDisplayPicture } from '../pictures/interfaces/display-picture.interface';
import { PictureEntity } from './picture.entity';
import { createProductEntityType } from './types/create-product-entity.type';
import { IProductToCart } from '../products/interfaces/product-to-cart.interface';

export class ProductEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _categoryId: number;
	private readonly _picture: IDisplayPicture;
	private readonly _ingredients?: IDisplayIngredient[];
	private readonly _characteristics?: IDisplayCharacteristic[];

	constructor({
		id,
		name,
		categoryId,
		ingredients,
		characteristics,
		picture,
	}: createProductEntityType) {
		this._id = id;
		this._name = name;
		this._categoryId = categoryId;
		this._picture = picture ? new PictureEntity(picture).getDisplay() : null;
		this._ingredients = ingredients?.map((ingredient) =>
			new IngredientEntity(ingredient.ingredient).getDisplay(),
		);
		this._characteristics = characteristics?.map((ch) =>
			new CharacteristicEntity(ch.characteristic).getDisplay(),
		);
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get ingredients(): IDisplayIngredient[] {
		return this._ingredients;
	}

	getProductToCart(): IProductToCart {
		return {
			id: this.id,
			name: this._name,
			categoryId: this._categoryId,
			picture: this._picture,
		};
	}

	getDisplay(): IDisplayProduct {
		return {
			id: this._id,
			name: this._name,
			categoryId: this._categoryId,
			picture: this._picture,
			ingredients: this._ingredients,
			characteristics: this._characteristics,
		};
	}
}
