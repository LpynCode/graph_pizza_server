import { IsNumber } from 'class-validator';

export class CharacteristicCreateDto {
	@IsNumber({}, { message: 'Некорректная цена!' })
	price: number;

	@IsNumber({}, { message: 'Некорректный sizeId' })
	sizeId: number;
}
