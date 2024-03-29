'use client';
import { BrandEntity } from '@repo/typeorm-database/entities';
import Link from 'next/link';
import { FC } from 'react';
import Card from 'react-bootstrap/Card';

import Pending from '@webApp/components/Pending';

type BrandCardProps = {
    brand?: BrandEntity;
};

const BrandCard: FC<BrandCardProps> = ({ brand }) => {
    return (
        <Card>
            <Card.Body>
                <Pending
                    data={brand?.name}
                    placeHolderProps={{
                        as: Card.Title,
                    }}
                    innerPlaceHolderProps={{
                        xs: 6,
                    }}
                >
                    <Card.Title>{brand?.name}</Card.Title>
                </Pending>

                <Pending
                    data={brand?.name}
                    placeHolderProps={{
                        as: Card.Subtitle,
                    }}
                    innerPlaceHolderProps={{
                        xs: 6,
                    }}
                >
                    <Card.Subtitle>{brand?.description || '-'}</Card.Subtitle>
                </Pending>
                {brand?.id && <Link href={`/brands/${brand.id}`} className="stretched-link" />}
            </Card.Body>
        </Card>
    );
};

export default BrandCard;
