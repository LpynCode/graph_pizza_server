import { IBaseFactory } from '../../common/base.factory.interface';
import { IDisplayProduct } from '../../products/interfaces/display-product.interface';
import { createProductEntityType } from '../../entities/types/create-product-entity.type';
import { ProductEntity } from '../../entities/product.entity';

export class ProductFactory implements IBaseFactory<ProductEntity> {
	createEntity(schema: createProductEntityType): ProductEntity | null {
		if (!schema) return null;
		return new ProductEntity(schema);
	}

	createEntities(schemas: createProductEntityType[]): IDisplayProduct[] {
		return schemas.map((schema) => new ProductEntity(schema).getDisplay());
	}
}
