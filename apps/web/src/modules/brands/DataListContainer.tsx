import { connectIfNeeded } from '@repo/typeorm-database/conn';
import { BrandEntity } from '@repo/typeorm-database/entities';

import BrandsList from '@webApp/modules/brands/BrandsList';
import { toJson } from '@webApp/utils/toJson';

export async function DataListContainer() {
    await connectIfNeeded();
    const brands = await BrandEntity.find();
    return <BrandsList brands={toJson(brands)} />;
}

export default DataListContainer;
