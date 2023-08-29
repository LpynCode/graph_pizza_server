import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';
import { Roles } from './role.decorator';
import { RolesAuthGuard } from '../auth/guards/roles.auth.guard';
import { AddRoleDto } from './dtos/add-role.dto';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Roles('ADMIN')
	@UseGuards(RolesAuthGuard)
	@Post('add')
	async addRoleToUser(@Body() addRoleDto: AddRoleDto) {
		return this.roleService.addRoleToUser(addRoleDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesAuthGuard)
	@Post('create')
	async createRole(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}
}
