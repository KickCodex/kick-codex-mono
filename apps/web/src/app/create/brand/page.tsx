import { BrandForm } from '@webApp/components/forms/BrandForm';
import PageContainer from '@webApp/components/layout/PageContainer';

export default function Page(): JSX.Element {
    return (
        <PageContainer title="Brand Create">
            <BrandForm />
        </PageContainer>
    );
}
