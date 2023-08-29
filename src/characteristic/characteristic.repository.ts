import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';
import { CharacteristicEntity } from '../entities/characteristic.entity';
import { CharacteristicFactory } from '../factory/factories/characteristic.factory';
import { IDisplayCharacteristic } from './interfaces/display-characteristic.interface';
import { CharacteristicSchema, UserSchema } from '@prisma/client';
import { defaultIncludeCharacteristicQuery } from './helpers/default-include-characteristic.query';

@Injectable()
export class CharacteristicRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly characteristicFactory: CharacteristicFactory,
	) {}

	async getAllCharacteristics(): Promise<IDisplayCharacteristic[]> {
		const characteristics = await this.prismaService.characteristicSchema.findMany({
			include: defaultIncludeCharacteristicQuery,
		});
		return this.characteristicFactory.createEntities(characteristics);
	}

	async checkCharacteristicToProduct(
		productId: number,
		characteristicId: number,
	): Promise<CharacteristicSchema | null> {
		try {
			return this.prismaService.characteristicSchema.findFirst({
				where: { id: characteristicId, products: { some: { productId } } },
			});
		} catch (e) {
			return null;
		}
	}

	async createCharacteristic(
		data: CharacteristicCreateDto,
	): Promise<CharacteristicEntity | null> {
		try {
			const characteristic = await this.prismaService.characteristicSchema.create({
				data,
				include: defaultIncludeCharacteristicQuery,
			});
			return this.characteristicFactory.createEntity(characteristic);
		} catch (e) {
			return null;
		}
	}

	async deleteCharacteristic(id: number): Promise<CharacteristicEntity | null> {
		try {
			const characteristic = await this.prismaService.characteristicSchema.delete({
				where: { id },
				include: defaultIncludeCharacteristicQuery,
			});
			return this.characteristicFactory.createEntity(characteristic);
		} catch (e) {
			return null;
		}
	}
}
