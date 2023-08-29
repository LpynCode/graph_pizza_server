import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PictureCreateDto } from './dtos/picture-create.dto';
import { PictureEntity } from '../entities/picture.entity';
import { PictureFactory } from '../factory/factories/picture.factory';

@Injectable()
export class PicturesRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly pictureFactory: PictureFactory,
	) {}

	async createPicture({ name, link }: PictureCreateDto): Promise<PictureEntity | null> {
		try {
			const picture = await this.prismaService.pictureSchema.create({ data: { name, link } });
			return this.pictureFactory.createEntity(picture);
		} catch (e) {
			return null;
		}
	}
}
