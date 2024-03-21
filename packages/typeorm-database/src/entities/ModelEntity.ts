import { Entity, Column } from 'typeorm';

import { EntityBase } from './EntityBase';

@Entity('models')
export class ModelEntity extends EntityBase {
    @Column()
    declare name: string;

    @Column({ name: 'brand_id' })
    declare brandId: number;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;
}
