import { CharacteristicSchema, SizeSchema, UnitSchema } from '@prisma/client';
import { IBaseEntity } from 'src/common/base.entity.interface';
import { IDisplaySize } from '../sizes/interfaces/display-size.interface';
import { SizeEntity } from './size.entity';
import { IDisplayCharacteristic } from '../characteristic/interfaces/display-characteristic.interface';
import { createCharacteristicEntityType } from './types/create-characteristic-entity.type';

export class CharacteristicEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _size: IDisplaySize;
	private readonly _price: number;

	constructor({ id, price, size }: createCharacteristicEntityType) {
		this._id = id;
		this._size = new SizeEntity(size).getDisplay();
		this._price = price;
	}

	get id(): number {
		return this._id;
	}

	get size(): IDisplaySize {
		return this._size;
	}

	getDisplay(): IDisplayCharacteristic {
		return {
			id: this._id,
			price: this._price,
			size: this._size,
		};
	}
}
