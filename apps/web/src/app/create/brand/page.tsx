import PageContainer from '@webApp/components/layout/PageContainer';
import { BrandForm } from '@webApp/modules/brands/BrandForm';

export default function BrandCreatePage() {
    return (
        <PageContainer title="Brand Create">
            <BrandForm />
        </PageContainer>
    );
}
