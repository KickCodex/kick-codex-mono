import { Column, Entity, Index, ManyToOne, type Relation, Unique } from 'typeorm';

import { UserEntity } from './UserEntity';
import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { EntityBase } from '../core/EntityBase';

@Entity('social_profiles')
@Unique('social_profile.account', ['providerName', 'providerUid'])
export class SocialProfileEntity extends EntityBase {
    @Column({ nullable: true, type: 'varchar' })
    declare name: string | null;

    @Column({ unique: true })
    declare email: string;

    @Column({ nullable: true, type: 'text' })
    declare image: string | null;

    @Column({ type: 'varchar' })
    @Index()
    declare providerName: string;

    @Column({ type: 'varchar' })
    @Index()
    declare providerUid: string;

    @ForeignIntColumn()
    declare userId: number;

    @ManyToOne(() => UserEntity, user => user.socialProfiles)
    declare user: Relation<UserEntity>;
}
