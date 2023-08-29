import { Controller, Get, Param, Body, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientCreateDto } from './dtos/ingredient-create.dto';
import { IngredientToAddCreateDto } from './dtos/ingredient-to-add-create.dto';

@Controller('ingredients')
export class IngredientController {
	constructor(private readonly ingredientService: IngredientService) {}

	@Get()
	async getAllIngredient() {
		return await this.ingredientService.getAllIngredients();
	}

	@Get('toAdd')
	async getAddIngredients() {
		return await this.ingredientService.getIngredientsToAdd();
	}

	@Post('create')
	async createIngredient(@Body() dto: IngredientCreateDto) {
		return await this.ingredientService.createIngredient(dto);
	}

	@Delete(':id')
	async deleteIngredient(@Param('id', ParseIntPipe) id: number) {
		return await this.ingredientService.deleteIngredient(id);
	}

	@Post('create/toAdd')
	async createAddIngredient(@Body() dto: IngredientToAddCreateDto) {
		return await this.ingredientService.createIngredientToAdd(dto);
	}
}
