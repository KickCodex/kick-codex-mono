import { Debug } from '@repo/ui/debug';
import { notFound } from 'next/navigation';

import PageContainer from '@webApp/components/layout/PageContainer';
import { fetchBrand } from '@webApp/queries/brandsQuery';

export default async function BrandPage({ params }: { params: { id: string } }) {
    const brand = await fetchBrand(Number(params.id));
    if (!brand) notFound();
    return (
        <PageContainer title={brand.name}>
            <Debug data={brand} />
        </PageContainer>
    );
}
