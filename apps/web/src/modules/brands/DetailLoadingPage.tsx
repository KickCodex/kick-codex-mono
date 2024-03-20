import ButtonLink from '@webApp/components/ButtonLink';
import PageContainer from '@webApp/components/layout/PageContainer';

export default function DetailLoadingPage({ params }: { params: { id: string } }) {
    return (
        <PageContainer>
            <ButtonLink size="sm" href="/" text="Edit this Brand" className="me-2" disabled />
            <ButtonLink variant="secondary" size="sm" href="/brands" text="Back to Brands" disabled />
            <hr />
        </PageContainer>
    );
}
