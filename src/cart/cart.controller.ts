import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Delete,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemCreateDto } from './dtos/cart-item-create.dto';
import { User } from '../decorators/user.decorator';
import { IUserWithRoles } from '../users/interfaces/user-with-roles.interface';
import { RolesAuthGuard } from '../auth/guards/roles.auth.guard';
import { Roles } from '../role/role.decorator';

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Post('create')
	async createCartItem(@User() user: IUserWithRoles, @Body() createDto: CartItemCreateDto) {
		return await this.cartService.createCartItem({ ...createDto, userId: user.id });
	}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Delete()
	async clearCart(@User() user: IUserWithRoles) {
		return await this.cartService.deleteCart(user.id);
	}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Delete('decrease/:itemId')
	async decrease(@User() user: IUserWithRoles, @Param('itemId', ParseIntPipe) itemId: number) {
		return await this.cartService.decreaseItemCount(user.id, itemId);
	}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Delete(':itemId')
	async deleteCartItem(
		@User() user: IUserWithRoles,
		@Param('itemId', ParseIntPipe) itemId: number,
	) {
		return await this.cartService.deleteCartItem(user.id, itemId);
	}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Get()
	async getCart(@User() user: IUserWithRoles) {
		return await this.cartService.getFullUserCart(user.id);
	}
}
