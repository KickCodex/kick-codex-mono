import { NextRequest } from 'next/server';

import { createBrand } from '@webApp/queries/brandsQuery';

export async function POST(request: NextRequest) {
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
