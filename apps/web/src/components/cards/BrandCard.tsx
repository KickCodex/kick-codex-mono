'use client';
import { PrismaDb } from '@repo/prisma-database/src';
import Link from 'next/link';
import { FC } from 'react';
import Card from 'react-bootstrap/Card';

import Pending from '@webApp/components/Pending';

type BrandCardProps = {
    brand?: PrismaDb.Brand;
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
                >
                    <Card.Title>{brand?.name}</Card.Title>
                </Pending>

                <Pending
                    data={brand?.name}
                    placeHolderProps={{
                        as: Card.Subtitle,
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
