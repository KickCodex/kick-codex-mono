import { Entity, Column } from 'typeorm';

import { EntityBase } from './EntityBase';

@Entity('contributions')
export class ContributionEntity extends EntityBase {
    @Column({ name: 'user_id' })
    declare userId: number;

    @Column({ name: 'foreign_table' })
    declare foreignModel: string;

    @Column({ name: 'foreign_id' })
    declare foreignId: number;

    @Column()
    declare type: string;

    @Column()
    declare description: string;

    @Column({ name: 'original_data', default: '{}' })
    declare originalData: string;

    @Column({ name: 'current_data', default: '{}' })
    declare currentData: string;

    @Column({ default: '{}' })
    declare diff: string;
}
