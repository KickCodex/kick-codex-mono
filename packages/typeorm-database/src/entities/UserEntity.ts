import { Column, Entity } from 'typeorm';

import { EntityBase } from './EntityBase'; // Adjust the path as needed

@Entity('users')
export class UserEntity extends EntityBase {
    @Column({ unique: true })
    declare email: string;

    @Column({ nullable: true, type: 'varchar' })
    declare name: string | null;

    @Column({ default: false, name: 'is_banned' })
    declare isBanned: boolean;

    @Column({ nullable: true, type: 'text' })
    declare image: string | null;

    @Column({ nullable: true, name: 'provider_name', type: 'varchar' })
    declare providerName: string | null;

    @Column({ nullable: true, name: 'provider_uid', type: 'varchar' })
    declare providerUid: string | null;
}
