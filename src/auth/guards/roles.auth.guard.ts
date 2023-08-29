import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../../role/role.decorator';
import { FORBIDDEN_UNAUTHORIZED_ERROR } from '../auth.constants';

@Injectable()
export class RolesAuthGuard implements CanActivate {
	constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader = req.headers.authorization;
			const [bearer, token] = authHeader.split(' ');
			const user = await this.jwtService.verifyAsync(token);
			req.user = user;
			const authorized = user.roles.some((role) => requiredRoles.includes(role));
			if (!authorized) throw new Error();
			return true;
		} catch (e) {
			throw new ForbiddenException(FORBIDDEN_UNAUTHORIZED_ERROR);
		}
	}
}
