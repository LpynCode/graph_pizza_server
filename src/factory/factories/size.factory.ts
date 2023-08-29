import { SizeEntity } from '../../entities/size.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { SizeSchema, UnitSchema } from '@prisma/client';
import { IDisplaySize } from '../../sizes/interfaces/display-size.interface';

export class SizeFactory implements IBaseFactory<SizeEntity> {
	createEntity(schema: SizeSchema & { unit: UnitSchema }): SizeEntity | null {
		if (!schema) return null;
		return new SizeEntity(schema);
	}

	createEntities(schemas: (SizeSchema & { unit: UnitSchema })[]): IDisplaySize[] {
		return schemas.map((schema) => new SizeEntity(schema).getDisplay());
	}
}
