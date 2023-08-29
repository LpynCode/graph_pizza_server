import { Injectable } from '@nestjs/common';
import { PictureCreateDto } from './dtos/picture-create.dto';
import { PicturesRepository } from './pictures.repository';
import { randomUUID } from 'crypto';
import { ensureDir, remove, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import * as pth from 'path';
import { path } from 'app-root-path';
import { PictureEntity } from '../entities/picture.entity';

@Injectable()
export class PicturesService {
	staticDirPath: string;
	constructor(private readonly picturesRepository: PicturesRepository) {
		this.staticDirPath =
			process.env.NODE_ENV === 'test'
				? pth.join(path, 'static_test')
				: pth.join(path, 'static');
	}

	async createPicture(data: PictureCreateDto): Promise<PictureEntity | null> {
		const preparedFile = await this.convertToWebP(data.file);
		if (!preparedFile) return null;
		await ensureDir(this.staticDirPath);
		const link = randomUUID() + '.webp';
		await writeFile(pth.join(this.staticDirPath, link), preparedFile);
		return this.picturesRepository.createPicture({ ...data, link });
	}

	private async convertToWebP(file: Express.Multer.File): Promise<Buffer | null> {
		try {
			if (!file.mimetype.includes('image')) return null;
			return sharp(file.buffer).webp().toBuffer();
		} catch (e) {
			return null;
		}
	}
}
