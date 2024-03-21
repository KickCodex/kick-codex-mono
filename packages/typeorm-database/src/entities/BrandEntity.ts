import { Column, Entity } from 'typeorm';

import { EntityBase } from './EntityBase';

@Entity('brands')
export class BrandEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;
}
