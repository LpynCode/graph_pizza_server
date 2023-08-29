import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartItemCreateDto } from './dtos/cart-item-create.dto';
import { CharacteristicService } from '../characteristic/characteristic.service';
import { PRODUCT_NOT_CHECKED_CHARACTERISTIC_ID } from './cart.constants';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { IDisplayCart } from './interfaces/display-cart.interface';

@Injectable()
export class CartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly characteristicService: CharacteristicService,
	) {}

	async createCartItem(data: CartItemCreateDto): Promise<IDisplayCart> {
		const existed = await this.cartRepository.findItem(data);
		if (existed) {
			const item = await this.cartRepository.updateCartItem({
				userId: data.userId,
				itemId: existed.id,
				count: existed.count + 1,
			});
			if (!item) throw new UnprocessableEntityException(CREATE_ERROR);
			return item.getDisplay();
		}
		const checked = await this.characteristicService.checkProductToCharacteristic(
			data.productId,
			data.characteristicId,
		);
		if (!checked) throw new UnprocessableEntityException(PRODUCT_NOT_CHECKED_CHARACTERISTIC_ID);

		const cart = await this.cartRepository.createCartItem(data);
		if (!cart) throw new UnprocessableEntityException(CREATE_ERROR);
		return cart.getDisplay();
	}

	async decreaseItemCount(userId: number, itemId: number): Promise<IDisplayCart> {
		const existed = await this.cartRepository.findItemById(userId, itemId);
		if (!existed) {
			throw new UnprocessableEntityException(DELETE_ERROR);
		}
		if (existed.count == 1) {
			return await this.deleteCartItem(userId, itemId);
		}
		const cart = await this.cartRepository.updateCartItem({
			userId,
			itemId,
			count: existed.count - 1,
		});
		if (!cart) throw new UnprocessableEntityException(DELETE_ERROR);
		return cart.getDisplay();
	}

	async deleteCart(userId: number): Promise<IDisplayCart> {
		const cart = await this.cartRepository.deleteCart(userId);
		if (!cart) throw new UnprocessableEntityException(DELETE_ERROR);
		return cart.getDisplay();
	}

	async deleteCartItem(userId: number, itemId: number): Promise<IDisplayCart> {
		const cart = await this.cartRepository.deleteCartItem(userId, itemId);
		if (!cart) throw new UnprocessableEntityException(DELETE_ERROR);
		return cart.getDisplay();
	}

	async getFullUserCart(userId: number): Promise<IDisplayCart> {
		const cart = await this.cartRepository.getFullUserCart(userId);
		if (!cart) throw new UnprocessableEntityException(NOT_FOUND_ERROR);
		return cart.getDisplay();
	}
}
