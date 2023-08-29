import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';
import { CartRepository } from './cart.repository';
import { AuthModule } from '../auth/auth.module';
import { CharacteristicModule } from '../characteristic/characteristic.module';

@Module({
	controllers: [CartController],
	providers: [CartService, CartRepository],
	imports: [PrismaModule, FactoryModule, AuthModule, CharacteristicModule],
})
export class CartModule {}
