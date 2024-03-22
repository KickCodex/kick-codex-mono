import { Column, Entity, OneToMany, type Relation } from 'typeorm';

import { ContributionEntity } from './ContributionEntity';
import { SocialProfileEntity } from './SocialProfileEntity';
import { EntityBase } from '../core/EntityBase';

@Entity('users')
export class UserEntity extends EntityBase {
    @Column({ nullable: true, type: 'varchar' })
    declare name: string | null;

    @Column({ unique: true })
    declare email: string;

    @Column({ default: false })
    declare isBanned: boolean;

    @Column({ nullable: true, type: 'text' })
    declare image: string | null;

    @OneToMany(() => ContributionEntity, contribution => contribution.user)
    declare contributions: Relation<ContributionEntity>[];

    @OneToMany(() => SocialProfileEntity, socialProfile => socialProfile.user)
    declare socialProfiles: Relation<SocialProfileEntity>[];
}
