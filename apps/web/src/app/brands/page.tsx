import { Suspense } from 'react';

import ButtonLink from '@webApp/components/ButtonLink';
import PageContainer from '@webApp/components/layout/PageContainer';
import BrandListContainer from '@webApp/components/list-containers/BrandListContainer';
import BrandsList from '@webApp/components/list-containers/BrandsList';

export default function BrandsPage() {
    return (
        <PageContainer title="Brands">
            <ButtonLink size="sm" href="/create/brand" text="Create a new Brand" />
            <hr />
            <Suspense fallback={<BrandsList />}>
                <BrandListContainer />
            </Suspense>
        </PageContainer>
    );
}
