import {
	Body,
	Controller,
	Post,
	UnprocessableEntityException,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PictureCreateDto } from './dtos/picture-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CREATE_ERROR } from '../common/crud.constants';

@Controller('pictures')
export class PicturesController {
	constructor(private readonly picturesService: PicturesService) {}

	@Post('create')
	@UseInterceptors(FileInterceptor('file'))
	async createPicture(
		@UploadedFile() file: Express.Multer.File,
		@Body() createDto: PictureCreateDto,
	) {
		const picture = await this.picturesService.createPicture({ ...createDto, file });
		if (!picture) throw new UnprocessableEntityException(CREATE_ERROR);
		return picture.getDisplay();
	}
}
