import { prisma, PrismaDb } from '@repo/prisma-database/shared';

export const fetchBrand = (id: number): Promise<PrismaDb.Brand | null> =>
    prisma.brand.findFirst({
        where: { id },
    });
