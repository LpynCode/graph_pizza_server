import { IsArray, IsNumber } from 'class-validator';

export class CartItemCreateDto {
	userId: number;

	@IsNumber({}, { message: 'Некорректный productId!' })
	productId: number;

	@IsNumber({}, { message: 'Некорректный characteristicId!' })
	characteristicId: number;

	@IsArray({ message: 'Некорректный массив ингредиентов для добавления' })
	ingredientsToAdd: number[];
}
