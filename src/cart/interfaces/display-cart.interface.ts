import { IDisplayCartItem } from './display-cart-item.interface';

export interface IDisplayCart {
	userId: number;
	items: IDisplayCartItem[];
	total_price: number;
}
