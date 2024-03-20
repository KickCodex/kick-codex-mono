import { NextRequest } from 'next/server';

import { createBrand, updateBrand } from '@webApp/modules/brands/brandsQuery';

export async function createRoute(request: NextRequest) {
    try {
        const payload = await request.json();
        const result = await createBrand(payload);
        return Response.json(result);
    } catch (e) {
        return Response.json(e, {
            status: 500,
        });
    }
}

export async function updateRoute(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const payload = await request.json();
        const result = await updateBrand(Number(params.id), payload);
        return Response.json(result);
    } catch (e) {
        return Response.json(e, {
            status: 500,
        });
    }
}
