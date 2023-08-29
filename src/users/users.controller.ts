import { Controller, Get, Param, ParseIntPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../role/role.decorator';
import { RolesAuthGuard } from '../auth/guards/roles.auth.guard';
import { NOT_FOUND_ERROR } from '../common/crud.constants';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Roles('ADMIN')
	@UseGuards(RolesAuthGuard)
	@Get()
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Roles('ADMIN')
	@UseGuards(RolesAuthGuard)
	@Get(':id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		const user = await this.usersService.getUserById(id);
		if (!user) throw new NotFoundException(NOT_FOUND_ERROR);
		return user.getDisplay();
	}
}
