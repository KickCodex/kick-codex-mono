import { FC, Suspense } from 'react';

import ButtonLink from '@webApp/components/ButtonLink';
import PageContainer from '@webApp/components/layout/PageContainer';
import BrandsList from '@webApp/modules/brands/BrandsList';
import DataListContainer from '@webApp/modules/brands/DataListContainer';

const ListPage: FC = () => {
    return (
        <PageContainer title="Brands">
            <ButtonLink size="sm" href="/create/brand" text="Create a new Brand" />
            <hr />
            <Suspense fallback={<BrandsList />}>
                <DataListContainer />
            </Suspense>
        </PageContainer>
    );
};

export default ListPage;
