import { FC, PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';

type Props = {
    title: string;
};
const PageContainer: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <Container>
            <main>
                <h1>{title}</h1>
                {children}
            </main>
        </Container>
    );
};

export default PageContainer;
