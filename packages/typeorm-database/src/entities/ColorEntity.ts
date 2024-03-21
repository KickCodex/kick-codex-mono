import { Entity, Column } from 'typeorm';

import { EntityBase } from './EntityBase';

@Entity('colors')
export class ColorEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @Column({ name: 'hex_code' })
    declare hexCode: string;
}
