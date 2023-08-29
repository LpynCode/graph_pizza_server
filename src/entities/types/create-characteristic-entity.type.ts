import { CharacteristicSchema, SizeSchema, UnitSchema } from '@prisma/client';

export type createCharacteristicEntityType = CharacteristicSchema & {
	size: SizeSchema & { unit: UnitSchema };
};
