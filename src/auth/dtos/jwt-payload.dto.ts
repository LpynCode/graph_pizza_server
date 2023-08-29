export class JwtPayloadDto {
	readonly id: number;
	readonly email: string;
	readonly roles: string[];
}
