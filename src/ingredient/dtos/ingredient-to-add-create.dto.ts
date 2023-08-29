import { IsNumber } from 'class-validator';

export class IngredientToAddCreateDto {
	@IsNumber({}, { message: 'Некорректный ingredientId!' })
	ingredientId: number;

	@IsNumber({}, { message: 'Некорректная цена!' })
	price: number;
}
