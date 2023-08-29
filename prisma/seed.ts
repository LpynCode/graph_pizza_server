import { PrismaClient } from '@prisma/client';
import { UsersCreateDto } from '../src/users/dtos/users-create.dto';
import { IngredientCreateDto } from 'src/ingredient/dtos/ingredient-create.dto';

const prisma = new PrismaClient();
const default_roles = ['USER', 'ACTIVATED_USER', 'ADMIN'];
const default_units = ['см', 'л', 'кг', 'гр', 'мл'];

async function main() {
	for (const unit of default_units) {
		await prisma.unitSchema.upsert({
			where: { value: unit },
			update: {},
			create: { value: unit },
		});
	}

	for (const role of default_roles) {
		await prisma.roleSchema.upsert({
			where: { value: role },
			update: {},
			create: { value: role },
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
