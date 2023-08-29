import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('SECRET_JWT_KEY'),
				signOptions: {
					expiresIn: '10m',
				},
			}),
			inject: [ConfigService],
		}),
		forwardRef(() => UsersModule),
	],
	exports: [JwtModule],
})
export class AuthModule {}
