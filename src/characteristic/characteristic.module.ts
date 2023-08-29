import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';
import { CharacteristicRepository } from './characteristic.repository';

@Module({
	controllers: [CharacteristicController],
	providers: [CharacteristicService, CharacteristicRepository],
	imports: [PrismaModule, FactoryModule],
	exports: [CharacteristicService],
})
export class CharacteristicModule {}
