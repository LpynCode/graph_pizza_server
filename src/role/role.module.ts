import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [PrismaModule, AuthModule],
})
export class RoleModule {}
