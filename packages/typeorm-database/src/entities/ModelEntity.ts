import { Column, Entity, JoinColumn, ManyToOne, OneToMany, type Relation } from 'typeorm';

import { BrandEntity } from './BrandEntity';
import { SneakerEntity } from './SneakerEntity';
import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { EntityBase } from '../core/EntityBase';

@Entity('models')
export class ModelEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @ForeignIntColumn()
    declare brandId: number;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;

    @ManyToOne(() => BrandEntity, brand => brand.sneakers, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn()
    declare brand: Relation<BrandEntity>;

    @OneToMany(() => SneakerEntity, sneaker => sneaker.model)
    declare sneakers: Relation<SneakerEntity>[];
}
