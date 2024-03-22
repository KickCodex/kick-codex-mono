import { BrandEntity } from '@repo/typeorm-database/entities';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import BrandCard from '@webApp/modules/brands/BrandCard';

type BrandsListProps = {
    brands?: BrandEntity[];
};
const BrandsList: FC<BrandsListProps> = ({ brands }) => {
    const collection = brands ? brands : Array(16).fill({ id: -1 });
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
