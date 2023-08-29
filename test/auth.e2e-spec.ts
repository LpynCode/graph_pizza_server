import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/auth/dtos/register.dto';
import { LoginDto } from '../src/auth/dtos/login.dto';

const testRegisterDto: RegisterDto = {
	email: 'graph@graph.com',
	password: 'graph',
};

const testLoginDto: LoginDto = {
	email: 'graph@graph.com',
	password: 'graph',
};

let userId: number;

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		await app.init();
	});

	it('/auth/register (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/register')
			.send(testRegisterDto);
		userId = body.id;
		expect(body.email).toBe(testRegisterDto.email);
	});

	it('/auth/register (POST) - failed', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/register')
			.send({ ...testRegisterDto, email: '123' });
		expect(res.status).toBe(400);
	});

	it('/auth/register (POST) - failed', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/register')
			.send({ ...testRegisterDto, password: '123' });
		expect(res.status).toBe(400);
	});

	it('/auth/login (POST) - success', async () => {
		const { body } = await request(app.getHttpServer()).post('/auth/login').send(testLoginDto);
		expect(body.user.email).toBe(testRegisterDto.email);
		expect(body.user.id).toBe(userId);
		expect(body.token).toBeDefined();
	});

	it('/auth/login (POST) - failed', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...testLoginDto, email: '123' });
		expect(res.status).toBe(400);
	});

	it('/auth/login (POST) - failed', async () => {
		const res = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...testLoginDto, password: '123' });
		expect(res.status).toBe(401);
	});
});
