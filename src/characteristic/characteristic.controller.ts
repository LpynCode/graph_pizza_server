import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';

@Controller('characteristics')
export class CharacteristicController {
	constructor(private readonly characteristicService: CharacteristicService) {}

	@Get()
	async getAllCharacteristics() {
		return await this.characteristicService.getAllCharacteristics();
	}

	@Post('create')
	async createCharacteristic(@Body() dto: CharacteristicCreateDto) {
		return await this.characteristicService.createCharacteristic(dto);
	}

	@Delete(':id')
	async DeleteCharacteristic(@Param('id', ParseIntPipe) id: number) {
		return await this.characteristicService.deleteCharacteristic(id);
	}
}
