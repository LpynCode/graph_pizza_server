import { IsNumber, IsString } from 'class-validator';

export class SizeCreateDto {
	@IsString({ message: 'Некорректное значение' })
	value: string;

	@IsNumber({}, { message: 'Некорректный unitId' })
	unitId: number;
}
