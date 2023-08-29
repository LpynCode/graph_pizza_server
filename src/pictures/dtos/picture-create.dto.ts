import { IsString } from 'class-validator';

export class PictureCreateDto {
	@IsString({ message: 'Некорректное имя для картинки!' })
	name: string;

	link: string;
	file: Express.Multer.File;
}
