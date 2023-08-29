import { SizeSchema, UnitSchema } from '@prisma/client';
import { IBaseEntity } from 'src/common/base.entity.interface';
import { IDisplaySize } from '../sizes/interfaces/display-size.interface';

export class SizeEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _value: string;
	private readonly _unit: string;

	constructor({ id, value, unit }: SizeSchema & { unit: UnitSchema }) {
		this._id = id;
		this._value = value;
		this._unit = unit.value;
	}

	get id(): number {
		return this._id;
	}

	get value(): string {
		return this._value;
	}

	getDisplay(): IDisplaySize {
		return {
			id: this._id,
			value: this._value,
			unit: this._unit,
		};
	}
}
