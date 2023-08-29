import { RoleSchema, UserSchema } from '@prisma/client';

export type createUserEntityType = UserSchema & { roles?: { role: RoleSchema }[] };
