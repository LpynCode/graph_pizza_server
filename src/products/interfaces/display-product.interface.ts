import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { IDisplayIngredient } from '../../ingredient/interfaces/display-ingredient.interface';
import { IDisplayPicture } from '../../pictures/interfaces/display-picture.interface';

export interface IDisplayProduct {
	id: number;
	name: string;
	categoryId: number;
	picture: IDisplayPicture;
	ingredients: IDisplayIngredient[];
	characteristics: IDisplayCharacteristic[];
}
