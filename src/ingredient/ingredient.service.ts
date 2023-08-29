import { IngredientSchema } from '@prisma/client';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientRepository } from './ingredient.repository';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { IngredientEntity } from '../entities/ingredient.entity';
import { IngredientToAddCreateDto } from './dtos/ingredient-to-add-create.dto';
import { IWithPriceIngredient } from './interfaces/with-price-ingredient.interface';
import { IDisplayIngredient } from './interfaces/display-ingredient.interface';

@Injectable()
export class IngredientService {
	constructor(private readonly ingredientRepository: IngredientRepository) {}

	async getAllIngredients(): Promise<IDisplayIngredient[]> {
		return this.ingredientRepository.getAllIngredients();
	}

	async getIngredientsToAdd(): Promise<IWithPriceIngredient[]> {
		return this.ingredientRepository.getIngredientsToAdd();
	}

	async createIngredient(dto: IngredientCreateDto): Promise<IDisplayIngredient | null> {
		const ingredient = await this.ingredientRepository.createIngredient(dto);
		if (!ingredient) throw new UnprocessableEntityException(CREATE_ERROR);
		return ingredient.getDisplay();
	}

	async deleteIngredient(id: number): Promise<IDisplayIngredient | null> {
		const ingredient = await this.ingredientRepository.deleteIngredient(id);
		if (!ingredient) throw new UnprocessableEntityException(DELETE_ERROR);
		return ingredient.getDisplay();
	}

	async createIngredientToAdd(
		dto: IngredientToAddCreateDto,
	): Promise<IWithPriceIngredient | null> {
		const ingredient = await this.ingredientRepository.createIngredientToAdd(dto);
		if (!ingredient) throw new UnprocessableEntityException(CREATE_ERROR);
		return ingredient.getWithPrice();
	}
}
