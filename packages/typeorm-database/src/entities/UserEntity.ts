import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { ContributionEntity } from './ContributionEntity';
import { EntityBase } from '../core/EntityBase';

@Entity('users')
export class UserEntity extends EntityBase {
    @Column({ unique: true })
    declare email: string;

    @Column({ nullable: true, type: 'varchar' })
    declare name: string | null;

    @Column({ default: false })
    declare isBanned: boolean;

    @Column({ nullable: true, type: 'text' })
    declare image: string | null;

    @Column({ nullable: true, type: 'varchar' })
    declare providerName: string | null;

    @Column({ nullable: true, type: 'varchar' })
    declare providerUid: string | null;

    @OneToMany(() => ContributionEntity, contribution => contribution.user)
    declare contributions: Relation<ContributionEntity>[];
}
