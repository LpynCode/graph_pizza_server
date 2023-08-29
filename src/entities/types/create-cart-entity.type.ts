import { CartItemSchema } from '@prisma/client';
import { createCartItemEntityType } from './create-cart-item-entity.type';

export type createCartEntityType = { userId: number; items: createCartItemEntityType[] };
