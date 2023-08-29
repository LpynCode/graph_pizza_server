import { IsString } from 'class-validator';

export class CreateRoleDto {
	@IsString({ message: 'Некорректное значение роли!' })
	value: string;
}
