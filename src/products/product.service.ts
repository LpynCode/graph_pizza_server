import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { IDisplayProduct } from './interfaces/display-product.interface';
import { ProductUpdateDto } from './dtos/product-update.dto';
import {
	CREATE_ERROR,
	DELETE_ERROR,
	NOT_FOUND_ERROR,
	UPDATE_ERROR,
} from '../common/crud.constants';

@Injectable()
export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async getAllProducts(): Promise<IDisplayProduct[]> {
		return this.productRepository.getAllProducts();
	}

	async createProduct(dto: ProductCreateDto): Promise<IDisplayProduct> {
		const product = await this.productRepository.createProduct(dto);
		if (!product) throw new UnprocessableEntityException(CREATE_ERROR);
		return product.getDisplay();
	}

	async updateProduct(dto: ProductUpdateDto): Promise<IDisplayProduct> {
		const product = await this.productRepository.updateProduct(dto);
		if (!product) throw new UnprocessableEntityException(UPDATE_ERROR);
		return product.getDisplay();
	}

	async deleteProduct(id: number): Promise<IDisplayProduct> {
		const product = await this.productRepository.deleteProduct(id);
		if (!product) throw new UnprocessableEntityException(DELETE_ERROR);
		return product.getDisplay();
	}

	async getProductsByCategory(alias: string): Promise<IDisplayProduct[]> {
		const products = await this.productRepository.getProductsByCategory(alias);
		if (!products) throw new NotFoundException(NOT_FOUND_ERROR);
		return products;
	}
}
