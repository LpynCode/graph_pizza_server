import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SizeCreateDto } from './dtos/size.create.dto';
import { SizeService } from './size.service';

@Controller('sizes')
export class SizeController {
	constructor(private readonly sizeService: SizeService) {}

	@Get()
	async getAllSizes() {
		return await this.sizeService.getAllSizes();
	}

	@Post('create')
	async createSize(@Body() dto: SizeCreateDto) {
		return await this.sizeService.createSize(dto);
	}

	@Delete(':id')
	async deleteSize(@Param('id', ParseIntPipe) id: number) {
		return await this.sizeService.deleteSize(id);
	}
}
