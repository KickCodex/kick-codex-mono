import { BrandEntity, connectIfNeeded } from '@repo/typeorm-database/core';

import BrandsList from '@webApp/modules/brands/BrandsList';

export async function DataListContainer() {
    await connectIfNeeded();
    const brands = await BrandEntity.find();
    return <BrandsList brands={JSON.parse(JSON.stringify(brands))} />;
}

export default DataListContainer;
