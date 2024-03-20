import { notFound } from 'next/navigation';

import { BrandForm } from '@webApp/components/forms/BrandForm';
import PageContainer from '@webApp/components/layout/PageContainer';
import { fetchBrand } from '@webApp/queries/brandsQuery';

export default async function BrandEditPage({ params }: { params: { id: string } }) {
    const brand = await fetchBrand(Number(params.id));
    if (!brand) notFound();
    return (
        <PageContainer title="Brand Edit">
            <BrandForm forEdit defaults={brand} />
        </PageContainer>
    );
}
