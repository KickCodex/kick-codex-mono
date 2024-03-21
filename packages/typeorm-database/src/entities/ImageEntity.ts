import { Entity, Column } from 'typeorm';

import { EntityBase } from './EntityBase';

@Entity('images')
export class ImageEntity extends EntityBase {
    @Column({ name: 'user_id' })
    declare userId: number;

    @Column({ name: 'foreign_table' })
    declare foreignModel: string;

    @Column({ name: 'foreign_id' })
    declare foreignId: number;

    @Column()
    declare url: string;

    @Column({ nullable: true, type: 'text' })
    declare caption: string | null;
}
