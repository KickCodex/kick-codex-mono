import { PrismaClient } from '@prisma/client';

import { afterLogIn } from './extensions/afterLogIn';
import { paginate } from './extensions/paginate';

export const prisma = new PrismaClient().$extends(afterLogIn).$extends(paginate);
