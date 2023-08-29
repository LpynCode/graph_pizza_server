import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CharacteristicCreateDto } from './dtos/characteristic.create.dto';
import { CharacteristicRepository } from './characteristic.repository';
import { IDisplayCharacteristic } from './interfaces/display-characteristic.interface';
import { CREATE_ERROR, DELETE_ERROR } from '../common/crud.constants';

@Injectable()
export class CharacteristicService {
	constructor(private readonly characteristicRepository: CharacteristicRepository) {}

	async getAllCharacteristics(): Promise<IDisplayCharacteristic[]> {
		return this.characteristicRepository.getAllCharacteristics();
	}

	async checkProductToCharacteristic(
		productId: number,
		characteristicId: number,
	): Promise<boolean> {
		const isExist = await this.characteristicRepository.checkCharacteristicToProduct(
			productId,
			characteristicId,
		);
		return !!isExist;
	}

	async createCharacteristic(dto: CharacteristicCreateDto): Promise<IDisplayCharacteristic> {
		const characteristic = await this.characteristicRepository.createCharacteristic(dto);
		if (!characteristic) throw new UnprocessableEntityException(CREATE_ERROR);
		return characteristic.getDisplay();
	}

	async deleteCharacteristic(id: number): Promise<IDisplayCharacteristic> {
		const characteristic = await this.characteristicRepository.deleteCharacteristic(id);
		if (!characteristic) throw new UnprocessableEntityException(DELETE_ERROR);
		return characteristic.getDisplay();
	}
}
