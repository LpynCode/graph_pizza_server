import { UserFactory } from './user.factory';
import { ProductFactory } from './product.factory';
import { CategoryFactory } from './category.factory';
import { IngredientFactory } from './ingredient.factory';
import { CharacteristicFactory } from './characteristic.factory';
import { SizeFactory } from './size.factory';
import { PictureFactory } from './picture.factory';
import { CartItemFactory } from './cart-item.factory';
import { CartFactory } from './cart.factory';

export const factories = [
	UserFactory,
	ProductFactory,
	CategoryFactory,
	IngredientFactory,
	CharacteristicFactory,
	SizeFactory,
	PictureFactory,
	CartItemFactory,
	CartFactory,
];
