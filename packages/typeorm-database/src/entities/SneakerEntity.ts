import { Column, Entity } from 'typeorm';

import { EntityBase } from './EntityBase';
import { MoneyColumn } from '../columns/MoneyColumn';

@Entity('sneakers')
export class SneakerEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @Column({ name: 'model_id' })
    declare modelId: number;

    @Column({ name: 'release_date', nullable: true, type: 'date' })
    declare releaseDate: Date | null;

    @Column({ nullable: true, type: 'varchar' })
    declare colorway: string | null;

    @MoneyColumn({ name: 'retail_price', nullable: true })
    declare retailPrice: number | null;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;
}
