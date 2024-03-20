import { prisma, PrismaDb, PrismaPaginatedResult } from '@repo/prisma-database/src';
import { ValidationError } from 'yup';

import { BrandFormData, brandSchema } from '@webApp/schemas/brandSchema';

export const fetchBrand = (id: number): Promise<PrismaDb.Brand | null> =>
    prisma.brand.findFirst({
        where: { id },
    });

export const fetchPaginatedBrands = (
    { page, limit }: { page: number; limit: number } = { page: 1, limit: 20 },
): Promise<PrismaPaginatedResult<PrismaDb.Brand>> =>
    prisma.brand.paginate({
        pagination: {
            page,
            limit,
        },
    });

export const createBrand = async (
    payload: BrandFormData,
): Promise<{
    data?: PrismaDb.Brand;
    error?: Error;
    validationError?: ValidationError;
}> => {
    try {
        const data = await brandSchema.validate(payload, {
            abortEarly: false,
            stripUnknown: true,
            strict: true,
        });

        const result = await prisma.brand.create({
            data,
        });

        return { data: result };
    } catch (e) {
        const error = e as Error;
        if (error.name === 'ValidationError') {
            return { validationError: error as ValidationError };
        }
        return { error };
    }
};

export const updateBrand = async (
    id: number,
    payload: BrandFormData,
): Promise<{
    data?: PrismaDb.Brand;
    error?: Error;
    validationError?: ValidationError;
}> => {
    try {
        const data = await brandSchema.validate(payload, {
            abortEarly: false,
            stripUnknown: true,
            strict: true,
        });

        const result = await prisma.brand.update({
            where: { id },
            data,
        });

        return { data: result };
    } catch (e) {
        const error = e as Error;
        if (error.name === 'ValidationError') {
            return { validationError: error as ValidationError };
        }
        return { error };
    }
};
