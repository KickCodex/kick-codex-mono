import { Column, Entity, Index, JoinColumn, ManyToOne, type Relation } from 'typeorm';

import { UserEntity } from './UserEntity';
import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { EntityBase } from '../core/EntityBase';

@Entity()
export class ContributionEntity extends EntityBase {
    @ForeignIntColumn()
    declare userId: number;

    @Column()
    @Index()
    declare foreignModel: string;

    @ForeignIntColumn()
    declare foreignId: number;

    @Column()
    @Index()
    declare type: string;

    @Column()
    declare description: string;

    @Column({ default: '{}', type: 'simple-json' })
    declare originalData: string;

    @Column({ default: '{}', type: 'simple-json' })
    declare currentData: string;

    @Column({ default: '{}', type: 'simple-json' })
    declare diff: string;

    @ManyToOne(() => UserEntity, user => user.contributions)
    @JoinColumn()
    declare user: Relation<UserEntity>;
}
