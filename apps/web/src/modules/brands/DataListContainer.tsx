import BrandsList from '@webApp/modules/brands/BrandsList';
import { fetchPaginatedBrands } from '@webApp/modules/brands/brandsQuery';

export async function DataListContainer() {
    const data = await fetchPaginatedBrands();
    return <BrandsList brands={data.items} />;
}

export default DataListContainer;
