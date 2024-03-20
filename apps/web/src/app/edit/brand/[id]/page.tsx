import { notFound } from 'next/navigation';

import PageContainer from '@webApp/components/layout/PageContainer';
import { BrandForm } from '@webApp/modules/brands/BrandForm';
import { fetchBrand } from '@webApp/modules/brands/brandsQuery';

export default async function BrandEditPage({ params }: { params: { id: string } }) {
    const brand = await fetchBrand(Number(params.id));
    if (!brand) notFound();
    return (
        <PageContainer title="Brand Edit">
            <BrandForm forEdit defaults={brand} />
        </PageContainer>
    );
}
