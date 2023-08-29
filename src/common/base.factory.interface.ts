import { IBaseEntity } from './base.entity.interface';

export interface IBaseFactory<T extends IBaseEntity> {
	createEntity: (schema: any) => T | null;
	createEntities: (schemas: any[]) => Record<string, any>[];
}
