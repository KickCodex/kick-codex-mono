import { Column, Entity, Index } from 'typeorm';

import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { EntityBase } from '../core/EntityBase';

@Entity()
export class ImageEntity extends EntityBase {
    @ForeignIntColumn()
    declare userId: number;

    @Column()
    @Index()
    declare foreignModel: string;

    @ForeignIntColumn()
    declare foreignId: number;

    @Column()
    declare url: string;

    @Column({ nullable: true, type: 'text' })
    declare caption: string | null;
}
