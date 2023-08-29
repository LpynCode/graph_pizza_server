import { IsNumber, IsEmail } from 'class-validator';

export class UsersUpdateDto {
	@IsNumber()
	id: number;

	@IsEmail()
	email: string;
}
