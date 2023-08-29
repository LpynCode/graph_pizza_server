import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
	ALREADY_REGISTERED_ERROR,
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { RegisterDto } from './dtos/register.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { IDisplayUser } from '../users/interfaces/display-user.interface';
import { IUserWithRoles } from '../users/interfaces/user-with-roles.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login({ email, password }: LoginDto): Promise<{ token: string; user: IUserWithRoles }> {
		const existedUser = await this.usersService.getUserByEmail(email);
		if (!existedUser) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		const comparedPasswords = await compare(password, existedUser.password);
		if (!comparedPasswords) throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		const user = existedUser.getUserWithRoles();
		const token = await this.generateToken(user);
		return { token, user };
	}

	async register(registerDto: RegisterDto): Promise<IDisplayUser> {
		const existedUser = await this.usersService.getUserByEmail(registerDto.email);
		if (existedUser) throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);
		const salt = await genSalt(10);
		const hashPassword = await hash(registerDto.password, salt);
		return await this.usersService.createUser({ ...registerDto, password: hashPassword });
	}

	async verifyToken(token: string): Promise<boolean> {
		try {
			await this.jwtService.verifyAsync(token);
			return true;
		} catch (e) {
			return false;
		}
	}

	private async generateToken(payload: JwtPayloadDto): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
}
