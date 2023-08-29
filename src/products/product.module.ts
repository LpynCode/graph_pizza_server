import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { FactoryModule } from '../factory/factory.module';

@Module({
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	imports: [PrismaModule, FactoryModule],
	exports: [ProductService],
})
export class ProductsModule {}
