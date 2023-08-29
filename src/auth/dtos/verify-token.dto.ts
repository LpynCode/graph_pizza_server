import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
	@IsNotEmpty({ message: 'Невалидный токен!' })
	token: string;
}
