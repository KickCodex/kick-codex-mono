import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { BrandEntity } from '@repo/typeorm-database/entities';
import { Debug } from '@repo/ui/debug';
import { notFound } from 'next/navigation';

import ButtonLink from '@webApp/components/ButtonLink';
import PageContainer from '@webApp/components/layout/PageContainer';

export default async function DetailPage({ params }: { params: { id: string } }) {
    await connectIfNeeded();
    const brand = await BrandEntity.findOneBy({ id: Number(params.id) });
    if (!brand) notFound();
    return (
        <PageContainer title={brand.name}>
            <ButtonLink size="sm" href={`/edit/brand/${brand.id}`} text="Edit this Brand" className="me-2" />
            <ButtonLink variant="secondary" size="sm" href="/brands" text="Back to Brands" />
            <hr />
            <Debug data={brand} />
        </PageContainer>
    );
}
