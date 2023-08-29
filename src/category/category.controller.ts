import { Controller, Get, Param, Body, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dtos/category-create.dto';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAllCategory() {
		return await this.categoryService.getAllCategories();
	}

	@Get(':alias')
	async getCategory(@Param('alias') alias: string) {
		return await this.categoryService.getCategoryByAlias(alias);
	}

	@Post('create')
	async createCategory(@Body() dto: CategoryCreateDto) {
		return await this.categoryService.createCategory(dto);
	}

	@Delete(':id')
	async deleteCategory(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.deleteCategory(id);
	}
}
