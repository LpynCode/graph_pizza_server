import { IProductToCart } from '../../products/interfaces/product-to-cart.interface';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { IWithPriceIngredient } from '../../ingredient/interfaces/with-price-ingredient.interface';

export interface IDisplayCartItem {
	id: number;
	product: IProductToCart;
	characteristic: IDisplayCharacteristic;
	count: number;
	addIngredients?: IWithPriceIngredient[];
}
