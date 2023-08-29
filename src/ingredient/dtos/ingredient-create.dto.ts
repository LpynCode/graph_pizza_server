import { IsString } from 'class-validator';

export class IngredientCreateDto {
	@IsString({ message: 'Некорректное имя для ингредиента!' })
	name: string;
}
