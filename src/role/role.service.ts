import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { CREATE_ERROR } from '../common/crud.constants';

@Injectable()
export class RoleService {
	constructor(private readonly prismaService: PrismaService) {}

	async createRole({ value }: CreateRoleDto) {
		try {
			return this.prismaService.roleSchema.create({ data: { value } });
		} catch (e) {
			throw new UnprocessableEntityException(CREATE_ERROR);
		}
	}

	async addRoleToUser(addRoleDto: AddRoleDto) {
		try {
			return this.prismaService.userOnRolesSchema.create({ data: addRoleDto });
		} catch (e) {
			throw new UnprocessableEntityException(CREATE_ERROR);
		}
	}
}
