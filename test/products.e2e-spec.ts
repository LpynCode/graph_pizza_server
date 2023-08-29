import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CategoryCreateDto } from '../src/category/dtos/category-create.dto';
import { IngredientCreateDto } from '../src/ingredient/dtos/ingredient-create.dto';
import { CharacteristicCreateDto } from '../src/characteristic/dtos/characteristic.create.dto';
import { SizeCreateDto } from '../src/sizes/dtos/size.create.dto';
import { ProductCreateDto } from '../src/products/dtos/product-create.dto';
import { IDisplayCharacteristic } from '../src/characteristic/interfaces/display-characteristic.interface';
import { IDisplayIngredient } from '../src/ingredient/interfaces/display-ingredient.interface';
import { IngredientEntity } from '../src/entities/ingredient.entity';
import { CharacteristicEntity } from '../src/entities/characteristic.entity';
import { ProductUpdateDto } from '../src/products/dtos/product-update.dto';
import { PictureCreateDto } from '../src/pictures/dtos/picture-create.dto';
import { rm } from 'fs-extra';
import { join } from 'path';
import { path } from 'app-root-path';
import { IDisplayPicture } from '../src/pictures/interfaces/display-picture.interface';
import { PictureEntity } from '../src/entities/picture.entity';
import { LoginDto } from '../src/auth/dtos/login.dto';

const unitId = 1;
const ingredientIds: number[] = [];
const characteristicIds: number[] = [];

let productId: number;
let displayIngredient: IDisplayIngredient;
let displayCharacteristic: IDisplayCharacteristic;
let displayPicture: IDisplayPicture;

const createCategoryDto: CategoryCreateDto = {
	name: 'Пицца',
	alias: 'pizza',
};

const createSizeDto: SizeCreateDto = {
	value: '25',
	unitId,
};

const createIngredientDto: IngredientCreateDto = {
	name: 'Моцарелла',
};

const createCharacteristicDto: CharacteristicCreateDto = {
	price: 569,
	sizeId: null,
};

const createProductDto: ProductCreateDto = {
	name: 'Пепперони',
	categoryId: null,
	pictureId: null,
	ingredients: ingredientIds,
	characteristics: characteristicIds,
};

const updateProductDto: ProductUpdateDto = {
	...createProductDto,
	id: null,
};

const createPictureDto: PictureCreateDto = {
	name: 'Пицца Пепперони',
	link: null,
	file: null,
};

const testLoginDto: LoginDto = {
	email: 'graph@graph.com',
	password: 'graph',
};

let token: string;

const picturePath = join(__dirname, 'pictures', '1.webp');

describe('Products (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		await app.init();
	});

	afterAll(async () => {
		await rm(join(path, 'static_test', displayPicture.link));
	});

	it('/categories/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/categories/create')
			.send(createCategoryDto);
		expect(body.name).toBe(createCategoryDto.name);
		expect(body.alias).toBe(createCategoryDto.alias);
		createProductDto.categoryId = body.id;
		updateProductDto.categoryId = body.id;
	});

	it('/sizes/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/sizes/create')
			.send(createSizeDto);
		expect(body.value).toBe(createSizeDto.value);
		createCharacteristicDto.sizeId = body.id;
	});

	it('/ingredients/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/ingredients/create')
			.send(createIngredientDto);
		expect(body.name).toBe(createIngredientDto.name);
		ingredientIds.push(body.id);
		displayIngredient = new IngredientEntity(body).getDisplay();
	});

	it('/characteristics/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/characteristics/create')
			.send(createCharacteristicDto);
		expect(body.price).toBe(createCharacteristicDto.price);
		characteristicIds.push(body.id);
		displayCharacteristic = new CharacteristicEntity(body).getDisplay();
	});

	it('/products/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/products/create')
			.send(createProductDto);
		expect(body.name).toBe(createProductDto.name);
		expect(body.categoryId).toBe(createProductDto.categoryId);
		expect(body.ingredients[0].id).toBe(displayIngredient.id);
		expect(body.ingredients[0].name).toBe(displayIngredient.name);
		expect(body.characteristics[0].id).toBe(displayCharacteristic.id);
		expect(body.characteristics[0].price).toBe(displayCharacteristic.price);
		expect(body.characteristics[0].size.id).toBe(displayCharacteristic.size.id);
		expect(body.characteristics[0].size.value).toBe(displayCharacteristic.size.value);
		productId = body.id;
		updateProductDto.id = body.id;
	});

	it('/pictures/create (POST) - success', async () => {
		const lengthOfLink = 36 + '.webp'.length;
		const { body } = await request(app.getHttpServer())
			.post('/pictures/create')
			.field('name', createPictureDto.name)
			.attach('file', picturePath);
		expect(body.name).toBe(createPictureDto.name);
		expect(body.link).toHaveLength(lengthOfLink);
		updateProductDto.pictureId = body.id;
		displayPicture = new PictureEntity(body).getDisplay();
	});

	it('/products/update (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.put('/products/update')
			.send(updateProductDto);
		expect(body.id).toBe(productId);
		expect(body.name).toBe(updateProductDto.name);
		expect(body.categoryId).toBe(updateProductDto.categoryId);
		expect(body.picture.id).toBe(displayPicture.id);
		expect(body.picture.name).toBe(displayPicture.name);
		expect(body.picture.link).toBe(displayPicture.link);
		expect(body.ingredients[0].id).toBe(displayIngredient.id);
		expect(body.ingredients[0].name).toBe(displayIngredient.name);
		expect(body.characteristics[0].id).toBe(displayCharacteristic.id);
		expect(body.characteristics[0].price).toBe(displayCharacteristic.price);
		expect(body.characteristics[0].size.id).toBe(displayCharacteristic.size.id);
		expect(body.characteristics[0].size.value).toBe(displayCharacteristic.size.value);
	});

	it('/products/:alias (GET) - success', async () => {
		const { body } = await request(app.getHttpServer()).get('/products/pizza');
		expect(body[0].id).toBe(productId);
	});
});
