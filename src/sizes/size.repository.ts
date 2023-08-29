import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SizeEntity } from '../entities/size.entity';
import { SizeFactory } from '../factory/factories/size.factory';
import { SizeCreateDto } from './dtos/size.create.dto';
import { IDisplaySize } from './interfaces/display-size.interface';

@Injectable()
export class SizeRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly sizeFactory: SizeFactory,
	) {}

	async getAllSizes(): Promise<IDisplaySize[]> {
		const sizes = await this.prismaService.sizeSchema.findMany({
			include: { unit: true },
		});
		return this.sizeFactory.createEntities(sizes);
	}

	async createSize({ value, unitId }: SizeCreateDto): Promise<SizeEntity | null> {
		try {
			const size = await this.prismaService.sizeSchema.create({
				data: {
					value: value,
					unit: { connect: { id: unitId } },
				},
				include: {
					unit: true,
				},
			});
			return this.sizeFactory.createEntity(size);
		} catch (e) {
			return null;
		}
	}

	async deleteSize(id: number): Promise<SizeEntity | null> {
		try {
			const size = await this.prismaService.sizeSchema.delete({
				where: { id },
				include: {
					unit: true,
				},
			});

			return this.sizeFactory.createEntity(size);
		} catch (e) {
			return null;
		}
	}
}
