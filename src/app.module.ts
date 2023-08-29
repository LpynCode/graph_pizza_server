import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/product.module';
import { FactoryModule } from './factory/factory.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { SizesModule } from './sizes/size.module';
import { PicturesModule } from './pictures/pictures.module';
import { CartModule } from './cart/cart.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { path } from 'app-root-path';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(path, 'static'),
			serveRoot: '/public',
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
		RoleModule,
		IngredientModule,
		CategoryModule,
		ProductsModule,
		FactoryModule,
		CharacteristicModule,
		SizesModule,
		PicturesModule,
		CartModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
