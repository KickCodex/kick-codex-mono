import { FC, PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';

import Pending from '@webApp/components/Pending';

type Props = {
    title?: string;
};
const PageContainer: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <Container>
            <main>
                <Pending
                    data={title}
                    placeHolderProps={{
                        as: 'h1',
                    }}
                    innerPlaceHolderProps={{
                        xs: 2,
                    }}
                >
                    <h1>{title}</h1>
                </Pending>

                {children}
            </main>
        </Container>
    );
};

export default PageContainer;
