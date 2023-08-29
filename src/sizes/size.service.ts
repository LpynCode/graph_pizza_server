import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SizeEntity } from '../entities/size.entity';
import { SizeRepository } from './size.repository';
import { SizeCreateDto } from './dtos/size.create.dto';
import { IDisplaySize } from './interfaces/display-size.interface';
import { CREATE_ERROR, DELETE_ERROR } from '../common/crud.constants';

@Injectable()
export class SizeService {
	constructor(private readonly sizeRepository: SizeRepository) {}

	async getAllSizes(): Promise<IDisplaySize[]> {
		return this.sizeRepository.getAllSizes();
	}

	async createSize(dto: SizeCreateDto): Promise<IDisplaySize> {
		const size = await this.sizeRepository.createSize(dto);
		if (!size) throw new UnprocessableEntityException(CREATE_ERROR);
		return size.getDisplay();
	}

	async deleteSize(id: number): Promise<IDisplaySize> {
		const size = await this.sizeRepository.deleteSize(id);
		if (!size) throw new UnprocessableEntityException(DELETE_ERROR);
		return size.getDisplay();
	}
}
