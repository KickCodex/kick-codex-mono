import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, type Relation } from 'typeorm';

import { UserEntity } from './UserEntity';
import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { EntityBase } from '../core/EntityBase';
import { UserContributionType } from '../enums/UserContributionType';
import { calculateDiff } from '../utils/calculateDiff';

@Entity()
export class ContributionEntity extends EntityBase {
    @ForeignIntColumn()
    declare userId: number;

    @Column()
    @Index()
    declare foreignModel: string;

    @ForeignIntColumn()
    declare foreignId: number;

    @Column({
        type: 'enum',
        enum: UserContributionType,
    })
    @Index()
    declare type: UserContributionType;

    @Column()
    declare description: string;

    @Column({ default: '{}', type: 'simple-json' })
    declare originalData: Record<string, any>;

    @Column({ default: '{}', type: 'simple-json' })
    declare currentData: Record<string, any>;

    @Column({ default: '{}', type: 'simple-json' })
    declare diff: Record<string, any>;

    @ManyToOne(() => UserEntity, user => user.contributions)
    @JoinColumn()
    declare user: Relation<UserEntity>;

    @BeforeInsert()
    setDefaults() {
        console.log({ esto: this });
        const { id, name } = this.currentData as { id: number; name?: string };
        this.description = `${this.type} ${this.foreignModel} ${name || id}`;
        this.originalData = this.originalData || {};
        const diff = calculateDiff(this.originalData, this.currentData);
        console.log({ diff });
        this.diff = diff;
    }
}
