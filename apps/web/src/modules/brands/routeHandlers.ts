import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { BrandEntity } from '@repo/typeorm-database/entities';
import { BrandValidationSchema } from '@repo/typeorm-database/validation';
import { NextRequest } from 'next/server';

import { getUserId } from '@webApp/modules/shared/sharedQuery';

export async function createRoute(request: NextRequest) {
    try {
        await connectIfNeeded();
        const userId = await getUserId();
        const payload = await request.json();
        const result = await BrandEntity.createByUser({
            payload,
            userId,
            schema: BrandValidationSchema,
        });
        return Response.json(result);
    } catch (e) {
        return Response.json(e, {
            status: 500,
        });
    }
}

export async function updateRoute(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectIfNeeded();
        const userId = await getUserId();
        const payload = await request.json();
        const result = await BrandEntity.updateByUser(Number(params.id), {
            payload,
            userId,
            schema: BrandValidationSchema,
        });
        return Response.json(result);
    } catch (e) {
        return Response.json(e, {
            status: 500,
        });
    }
}
