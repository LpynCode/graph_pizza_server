import { PictureSchema } from '@prisma/client';
import { IBaseEntity } from '../common/base.entity.interface';
import { IDisplayPicture } from '../pictures/interfaces/display-picture.interface';

export class PictureEntity implements IBaseEntity {
	private readonly _id: number;
	private readonly _name: string;
	private readonly _link: string;

	constructor({ id, name, link }: PictureSchema) {
		this._id = id;
		this._name = name;
		this._link = link;
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get link(): string {
		return this._link;
	}

	getDisplay(): IDisplayPicture {
		return {
			id: this._id,
			name: this._name,
			link: this._link,
		};
	}
}
