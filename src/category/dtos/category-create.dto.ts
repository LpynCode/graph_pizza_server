import { IsString } from 'class-validator';

export class CategoryCreateDto {
	@IsString({ message: 'Некорректное имя категории!' })
	name: string;

	@IsString({ message: 'Некорректный alias' })
	alias: string;
}
