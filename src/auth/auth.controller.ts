import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return await this.authService.login(loginDto);
	}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return await this.authService.register(registerDto);
	}

	@Post('verifyToken')
	async verifyToken(@Body() { token }: VerifyTokenDto) {
		return this.authService.verifyToken(token);
	}
}
