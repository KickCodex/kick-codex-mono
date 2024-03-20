import { prisma } from '@repo/prisma-database/src';
import { NextRequest } from 'next/server';

import { brandCreateSchema } from '@webApp/schemas/brandSchema';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await brandCreateSchema.validate(await request.json(), {
            abortEarly: false,
            stripUnknown: true,
            strict: true,
        });

        const result = await prisma.brand.create({
            data,
        });
        return Response.json(result);
    } catch (e) {
        const error = e as Error;
        if (error.name === 'ValidationError') {
            return Response.json(error, {
                status: 400,
            });
        }
        return Response.json(
            {
                error: error.message,
                previous: e,
            },
            {
                status: 500,
            },
        );
    }
}
