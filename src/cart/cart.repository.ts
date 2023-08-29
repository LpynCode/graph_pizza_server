import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartItemCreateDto } from './dtos/cart-item-create.dto';
import { CartItemFactory } from '../factory/factories/cart-item.factory';
import { includeToCartProductsQuery } from '../products/helpers/include-to-cart.products';
import { CartFactory } from '../factory/factories/cart.factory';
import { CartEntity } from '../entities/cart.entity';
import { defaultIncludeCharacteristicQuery } from '../characteristic/helpers/default-include-characteristic.query';
import { CartItemSchema } from '@prisma/client';
import { CartItemFindDto } from './dtos/cart-item-find.dto';
import { CartItemUpdateDto } from './dtos/cart-item.update.dto';

@Injectable()
export class CartRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cartItemFactory: CartItemFactory,
		private readonly cartFactory: CartFactory,
	) {}

	async findItem({
		userId,
		productId,
		characteristicId,
	}: CartItemFindDto): Promise<CartItemSchema | null> {
		try {
			const item = await this.prismaService.cartItemSchema.findFirst({
				where: { userId, productId, characteristicId },
			});
			if (!item) return null;
			return item;
		} catch (e) {
			return null;
		}
	}

	async findItemById(userId: number, itemId: number): Promise<CartItemSchema | null> {
		try {
			const item = await this.prismaService.cartItemSchema.findFirst({
				where: { AND: [{ userId }, { id: itemId }] },
			});
			if (!item) return null;
			return item;
		} catch (e) {
			return null;
		}
	}

	async updateCartItem({ itemId, userId, count }: CartItemUpdateDto): Promise<CartEntity | null> {
		try {
			await this.prismaService.cartItemSchema.updateMany({
				where: { AND: [{ userId }, { id: itemId }] },
				data: { count },
			});
			return this.getFullUserCart(userId);
		} catch (e) {
			return null;
		}
	}

	async createCartItem({
		ingredientsToAdd,
		...data
	}: CartItemCreateDto): Promise<CartEntity | null> {
		try {
			await this.prismaService.cartItemSchema.create({
				data: {
					...data,
					ingredientsToAdd: {
						create: ingredientsToAdd.map((ingredientId) => ({
							ingredientId,
						})),
					},
				},
			});
			return this.getFullUserCart(data.userId);
		} catch (e) {
			return null;
		}
	}

	async deleteCart(userId: number): Promise<CartEntity | null> {
		try {
			await this.prismaService.cartItemSchema.deleteMany({ where: { userId } });
			return this.getFullUserCart(userId);
		} catch (e) {
			return null;
		}
	}

	async deleteCartItem(userId: number, itemId: number): Promise<CartEntity | null> {
		try {
			await this.prismaService.cartItemSchema.deleteMany({
				where: { AND: [{ userId }, { id: itemId }] },
			});
			return this.getFullUserCart(userId);
		} catch (e) {
			return null;
		}
	}

	async getFullUserCart(userId: number): Promise<CartEntity | null> {
		try {
			const items = await this.prismaService.cartItemSchema.findMany({
				where: { userId },
				include: {
					product: { include: includeToCartProductsQuery },
					characteristic: { include: defaultIncludeCharacteristicQuery },
					ingredientsToAdd: {
						include: {
							ingredient: {
								include: {
									ingredient: true,
								},
							},
						},
					},
				},
				orderBy: { characteristicId: 'asc' },
			});
			return this.cartFactory.createEntity({ userId, items });
		} catch (e) {
			return null;
		}
	}
}
