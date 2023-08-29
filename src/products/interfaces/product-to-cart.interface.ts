import { IDisplayPicture } from '../../pictures/interfaces/display-picture.interface';

export interface IProductToCart {
	id: number;
	categoryId: number;
	name: string;
	picture: IDisplayPicture;
}
