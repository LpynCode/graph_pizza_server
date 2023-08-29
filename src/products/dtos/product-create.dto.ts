import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator';

export class ProductCreateDto {
	@IsString({ message: 'Некорректное имя для продукта!' })
	name: string;

	@IsNumber({}, { message: 'Некорректный categoryId' })
	categoryId: number;

	@IsNumber({}, { message: 'Некорректный pictureId' })
	@ValidateIf((object, value) => value !== null)
	pictureId?: number;

	@IsArray({ message: 'Некорректный массив id ингредиентов' })
	ingredients: number[];

	@IsArray({ message: 'Некорректный массив id характеристик' })
	characteristics: number[];
}
