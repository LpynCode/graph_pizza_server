import { IDisplayUser } from './display-user.interface';

export interface IUserWithRoles extends IDisplayUser {
	roles: string[];
}
