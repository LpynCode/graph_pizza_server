import { CategoryRepository } from './category.repository';
import { CategorySchema } from '@prisma/client';
import { CategoryCreateDto } from './dtos/category-create.dto';
import {
	BadRequestException,
	Delete,
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { CREATE_ERROR, DELETE_ERROR, NOT_FOUND_ERROR } from '../common/crud.constants';
import { CategoryEntity } from '../entities/category.entity';
import { IDisplayCategory } from './interfaces/display-category.interface';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async getAllCategories(): Promise<CategorySchema[]> {
		return this.categoryRepository.getAllCategories();
	}

	async getCategoryByAlias(alias: string): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.getCategoryByAlias(alias);
		if (!category) throw new NotFoundException(NOT_FOUND_ERROR);
		return category.getDisplay();
	}

	async createCategory(dto: CategoryCreateDto): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.createCategory(dto);
		if (!category) throw new UnprocessableEntityException(CREATE_ERROR);
		return category.getDisplay();
	}

	async deleteCategory(id: number): Promise<IDisplayCategory> {
		const category = await this.categoryRepository.deleteCategory(id);
		if (!category) throw new UnprocessableEntityException(DELETE_ERROR);
		return category.getDisplay();
	}
}
