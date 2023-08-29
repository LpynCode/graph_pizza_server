import { Controller, Get, Param, Body, Post, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductUpdateDto } from './dtos/product-update.dto';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAllProducts() {
		return await this.productService.getAllProducts();
	}

	@Post('create')
	async createProduct(@Body() dto: ProductCreateDto) {
		return await this.productService.createProduct(dto);
	}

	@Put('update')
	async updateProduct(@Body() dto: ProductUpdateDto) {
		return await this.productService.updateProduct(dto);
	}

	@Get(':alias')
	async getProductsByCategory(@Param('alias') alias: string) {
		return await this.productService.getProductsByCategory(alias);
	}
}
