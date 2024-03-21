import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, type Relation } from 'typeorm';

import { BrandEntity } from './BrandEntity';
import { ColorEntity } from './ColorEntity';
import { ModelEntity } from './ModelEntity';
import { ForeignIntColumn } from '../columns/ForeignIntColumn';
import { MoneyColumn } from '../columns/MoneyColumn';
import { EntityBase } from '../core/EntityBase';

@Entity()
export class SneakerEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @ForeignIntColumn()
    declare modelId: number;

    @ForeignIntColumn()
    declare brandId: number;

    @Column({ nullable: true, type: 'date' })
    declare releaseDate: Date | null;

    @Column({ nullable: true, type: 'varchar' })
    declare colorway: string | null;

    @MoneyColumn({ nullable: true })
    declare retailPrice: number | null;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;

    @ManyToOne(() => BrandEntity, brand => brand.sneakers)
    @JoinColumn()
    declare brand: Relation<BrandEntity>;

    @ManyToOne(() => ModelEntity, model => model.sneakers)
    @JoinColumn()
    declare model: Relation<ModelEntity>;

    @ManyToMany(() => ColorEntity, color => color.sneakers)
    @JoinColumn()
    declare colors: Relation<ColorEntity>[];
}
