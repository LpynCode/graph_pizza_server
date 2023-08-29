import { Module } from '@nestjs/common';
import { UserFactory } from './factories/user.factory';
import { factories } from './factories';

@Module({
	providers: [...factories],
	exports: [...factories],
})
export class FactoryModule {}
