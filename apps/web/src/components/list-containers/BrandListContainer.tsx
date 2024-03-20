import BrandsList from '@webApp/components/list-containers/BrandsList';
import { fetchPaginatedBrands } from '@webApp/queries/brandsQuery';

export async function BrandListContainer() {
    const data = await fetchPaginatedBrands();
    return <BrandsList brands={data.items} />;
}

export default BrandListContainer;
