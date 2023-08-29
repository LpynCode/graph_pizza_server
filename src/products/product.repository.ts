import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { IDisplayProduct } from './interfaces/display-product.interface';
import { ProductFactory } from '../factory/factories/product.factory';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductUpdateDto } from './dtos/product-update.dto';
import { defaultIncludeProductsQuery } from './helpers/default-include.products';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productFactory: ProductFactory,
	) {}

	async getAllProducts(): Promise<IDisplayProduct[]> {
		const products = await this.prismaService.productSchema.findMany({
			include: defaultIncludeProductsQuery,
		});

		return this.productFactory.createEntities(products);
	}

	async createProduct({
		ingredients,
		characteristics,
		...dto
	}: ProductCreateDto): Promise<ProductEntity> {
		try {
			const product = await this.prismaService.productSchema.create({
				data: {
					...dto,
					ingredients: {
						create: ingredients.map((el) => ({ ingredientId: el })),
					},
					characteristics: {
						create: characteristics.map((el) => ({ characteristicId: el })),
					},
				},
				include: defaultIncludeProductsQuery,
			});

			return this.productFactory.createEntity(product);
		} catch (e) {
			return null;
		}
	}

	async updateProduct({
		id,
		ingredients,
		categoryId,
		characteristics,
		pictureId,
		name,
	}: ProductUpdateDto): Promise<ProductEntity | null> {
		try {
			const product = await this.prismaService.productSchema.update({
				where: {
					id,
				},
				data: {
					name: { set: name },
					categoryId: { set: categoryId },
					pictureId: { set: pictureId },
					ingredients: {
						deleteMany: {},
						createMany: { data: ingredients.map((ingredientId) => ({ ingredientId })) },
					},
					characteristics: {
						deleteMany: {},
						createMany: {
							data: characteristics.map((characteristicId) => ({ characteristicId })),
						},
					},
				},
				include: defaultIncludeProductsQuery,
			});

			return this.productFactory.createEntity(product);
		} catch (e) {
			return null;
		}
	}

	async deleteProduct(id: number): Promise<ProductEntity> {
		try {
			const product = await this.prismaService.productSchema.findFirst({
				where: {
					id,
				},
				include: defaultIncludeProductsQuery,
			});

			return this.productFactory.createEntity(product);
		} catch (e) {
			return null;
		}
	}

	async getProductsByCategory(alias: string): Promise<IDisplayProduct[]> {
		try {
			const products = await this.prismaService.productSchema.findMany({
				where: {
					category: {
						alias,
					},
				},
				include: defaultIncludeProductsQuery,
			});

			return this.productFactory.createEntities(products);
		} catch (e) {
			return null;
		}
	}
}
