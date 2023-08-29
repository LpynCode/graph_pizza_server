import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator';

export class ProductUpdateDto {
	@IsNumber({}, { message: 'Некорректный ID' })
	id: number;

	@IsString({ message: 'Некорректное имя для продукта!' })
	name: string;

	@IsNumber({}, { message: 'Некорректный pictureId' })
	@ValidateIf((object, value) => value !== null)
	pictureId?: number;

	@IsNumber({}, { message: 'Некорректный categoryId' })
	categoryId: number;

	@IsArray({ message: 'Некорректный массив id ингредиентов' })
	ingredients: number[];

	@IsArray({ message: 'Некорректный массив id характеристик' })
	characteristics: number[];
}
