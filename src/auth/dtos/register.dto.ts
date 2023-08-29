import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
	@IsEmail({}, { message: 'Некорректный email!' })
	readonly email: string;

	@IsString({ message: 'Некорректный пароль!' })
	@Length(5, 24, { message: 'Пароль должен быть более 5 и менее 24 символов!' })
	readonly password: string;
}
