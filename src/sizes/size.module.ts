import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';
import { SizeRepository } from './size.repository';

@Module({
	controllers: [SizeController],
	imports: [PrismaModule, FactoryModule],
	providers: [SizeService,SizeRepository],
	exports: [SizeService],
})
export class SizesModule {}
