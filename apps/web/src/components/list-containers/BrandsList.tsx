import { PrismaDb } from '@repo/prisma-database/src';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import BrandCard from '@webApp/components/cards/BrandCard';

type BrandsListProps = {
    brands?: PrismaDb.Brand[];
};
const BrandsList: FC<BrandsListProps> = ({ brands }) => {
    const collection = brands ? brands : Array(10).fill({ id: 0 });
    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {collection.map((brand, index) => (
                <Col key={`brandCard-${brand.id}-${index}`}>
                    <BrandCard key={brand.id} brand={brand} />
                </Col>
            ))}
        </Row>
    );
};

export default BrandsList;
