import { Injectable } from '@nestjs/common';
import { IBaseFactory } from '../../common/base.factory.interface';
import { PictureEntity } from '../../entities/picture.entity';
import { PictureSchema } from '@prisma/client';

@Injectable()
export class PictureFactory implements IBaseFactory<PictureEntity> {
	createEntity(schema: PictureSchema): PictureEntity {
		if (!schema) return null;
		return new PictureEntity(schema);
	}

	createEntities(schemas: PictureSchema[]): Record<string, any>[] {
		return schemas.map((schema) => new PictureEntity(schema).getDisplay());
	}
}
