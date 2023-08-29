import { CharacteristicEntity } from '../../entities/characteristic.entity';
import { IBaseFactory } from '../../common/base.factory.interface';
import { IDisplayCharacteristic } from '../../characteristic/interfaces/display-characteristic.interface';
import { createCharacteristicEntityType } from '../../entities/types/create-characteristic-entity.type';

export class CharacteristicFactory implements IBaseFactory<CharacteristicEntity> {
	createEntity(schema: createCharacteristicEntityType): CharacteristicEntity | null {
		if (!schema) return null;
		return new CharacteristicEntity(schema);
	}

	createEntities(schemas: createCharacteristicEntityType[]): IDisplayCharacteristic[] {
		return schemas.map((schema) => new CharacteristicEntity(schema).getDisplay());
	}
}
