import { NextRequest } from 'next/server';

import { updateBrand } from '@webApp/queries/brandsQuery';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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
