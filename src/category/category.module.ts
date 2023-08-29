import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FactoryModule } from '../factory/factory.module';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository],
	imports: [PrismaModule, FactoryModule],
})
export class CategoryModule {}
