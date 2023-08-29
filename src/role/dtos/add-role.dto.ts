import { IsNumber } from 'class-validator';

export class AddRoleDto {
	@IsNumber({}, { message: 'Некорректный userId' })
	userId: number;

	@IsNumber({}, { message: 'Некорректный roleId' })
	roleId: number;
}
