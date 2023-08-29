import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { FactoryModule } from '../factory/factory.module';

@Module({
	controllers: [IngredientController],
	providers: [IngredientService, IngredientRepository],
	imports: [PrismaModule, FactoryModule],
	exports: [IngredientRepository],
})
export class IngredientModule {}
