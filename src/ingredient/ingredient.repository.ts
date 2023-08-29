import { PrismaService } from '../prisma/prisma.service';
import { IngredientSchema } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientEntity } from '../entities/ingredient.entity';
import { IngredientFactory } from '../factory/factories/ingredient.factory';
import { IDisplayIngredient } from './interfaces/display-ingredient.interface';
import { IWithPriceIngredient } from './interfaces/with-price-ingredient.interface';
import { IngredientToAddCreateDto } from './dtos/ingredient-to-add-create.dto';

@Injectable()
export class IngredientRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly ingredientFactory: IngredientFactory,
	) {}

	async getAllIngredients(): Promise<IDisplayIngredient[]> {
		const ingredients = await this.prismaService.ingredientSchema.findMany();
		return this.ingredientFactory.createEntities(ingredients);
	}

	async createIngredient(data: IngredientCreateDto): Promise<IngredientEntity | null> {
		try {
			const ingredient = await this.prismaService.ingredientSchema.create({ data });
			return this.ingredientFactory.createEntity(ingredient);
		} catch (e) {
			return null;
		}
	}

	async deleteIngredient(id: number): Promise<IngredientEntity | null> {
		try {
			const ingredient = await this.prismaService.ingredientSchema.delete({ where: { id } });
			return this.ingredientFactory.createEntity(ingredient);
		} catch (e) {
			return null;
		}
	}

	async createIngredientToAdd({
		ingredientId,
		price,
	}: IngredientToAddCreateDto): Promise<IngredientEntity | null> {
		try {
			const { ingredient } = await this.prismaService.ingredientsToAddSchema.create({
				data: { price, ingredientId },
				include: { ingredient: true },
			});
			return this.ingredientFactory.createEntity({ ...ingredient, price });
		} catch (e) {
			return null;
		}
	}

	async getIngredientsToAdd(): Promise<IWithPriceIngredient[]> {
		const ingredients = await this.prismaService.ingredientsToAddSchema.findMany({
			include: { ingredient: true },
		});
		return this.ingredientFactory.createEntitiesWithPrice(ingredients);
	}

	// async getAddIngredients(ingredientsId: number[]): Promise<IWithPriceIngredient[]> {
	// 	const ingredients = await this.prismaService.ingredientsToAddSchema.findMany({
	// 		where: { id: { in: ingredientsId } },
	// 		include: { ingredient: true },
	// 	});
	// 	return this.ingredientFactory.createEntitiesWithPrice(ingredients);
	// }
}
