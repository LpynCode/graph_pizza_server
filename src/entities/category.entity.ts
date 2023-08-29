import { CategorySchema } from '@prisma/client';
import { IDisplayCategory } from 'src/category/interfaces/display-category.interface';
import { IBaseEntity } from '../common/base.entity.interface';

export class CategoryEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _alias: string;

	constructor({ id, name, alias }: CategorySchema) {
		this._id = id;
		this._name = name;
		this._alias = alias;
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	getDisplay(): IDisplayCategory {
		return {
			id: this._id,
			name: this._name,
			alias: this._alias,
		};
	}
}
