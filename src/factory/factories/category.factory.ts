import { CategoryEntity } from '../../entities/category.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { CategorySchema } from '@prisma/client';
import { IDisplayCategory } from '../../category/interfaces/display-category.interface';

export class CategoryFactory implements IBaseFactory<CategoryEntity> {
	createEntity(schema: CategorySchema): CategoryEntity {
		if (!schema) return null;
		return new CategoryEntity(schema);
	}

	createEntities(schemas: CategorySchema[]): IDisplayCategory[] {
		return schemas.map((schema) => new CategoryEntity(schema).getDisplay());
	}
}
