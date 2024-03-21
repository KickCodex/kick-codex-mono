import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { BrandEntity } from '@repo/typeorm-database/entities';

import BrandsList from '@webApp/modules/brands/BrandsList';

export async function DataListContainer() {
    await connectIfNeeded();
    const brands = await BrandEntity.find();
    return <BrandsList brands={JSON.parse(JSON.stringify(brands))} />;
}

export default DataListContainer;
