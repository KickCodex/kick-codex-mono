import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { ModelEntity } from './ModelEntity';
import { SneakerEntity } from './SneakerEntity';
import { EntityBase } from '../core/EntityBase';

@Entity('brands')
export class BrandEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @Column({ nullable: true, type: 'text' })
    declare description: string | null;

    @OneToMany(() => SneakerEntity, sneaker => sneaker.brand)
    declare sneakers: Relation<SneakerEntity>[];

    @OneToMany(() => ModelEntity, model => model.brand)
    declare models: Relation<ModelEntity>[];
}
