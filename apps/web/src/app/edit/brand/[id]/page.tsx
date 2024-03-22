import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { BrandEntity } from '@repo/typeorm-database/entities';
import { notFound } from 'next/navigation';

import PageContainer from '@webApp/components/layout/PageContainer';
import { BrandForm } from '@webApp/modules/brands/BrandForm';
import { toJson } from '@webApp/utils/toJson';

export default async function BrandEditPage({ params }: { params: { id: string } }) {
    await connectIfNeeded();
    const brand = await BrandEntity.findOneBy({ id: Number(params.id) });
    if (!brand) notFound();
    return (
        <PageContainer title="Brand Edit">
            <BrandForm forEdit defaults={toJson(brand)} />
        </PageContainer>
    );
}
