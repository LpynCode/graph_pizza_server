import { Injectable } from '@nestjs/common';
import { UsersCreateDto } from './dtos/users-create.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from '../entities/user.entity';
import { UserSchema } from '@prisma/client';
import { IDisplayUser } from './interfaces/display-user.interface';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async getAllUsers(): Promise<Omit<UserSchema, 'password'>[]> {
		return this.usersRepository.getAllUsers();
	}

	async getUserByEmail(email: string): Promise<UserEntity | null> {
		return this.usersRepository.getUserByEmail(email);
	}

	async getUserById(id: number): Promise<UserEntity | null> {
		return this.usersRepository.getUserById(id);
	}

	async createUser(dto: UsersCreateDto): Promise<IDisplayUser> {
		const user = await this.usersRepository.createUser(dto);
		if (!user) return null;
		return user.getDisplay();
	}
}
