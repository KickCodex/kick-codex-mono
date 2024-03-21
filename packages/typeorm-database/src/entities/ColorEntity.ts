import { Column, Entity, ManyToMany, type Relation } from 'typeorm';

import { SneakerEntity } from './SneakerEntity';
import { EntityBase } from '../core/EntityBase';

@Entity()
export class ColorEntity extends EntityBase {
    @Column({ unique: true })
    declare name: string;

    @Column()
    declare hexCode: string;

    @ManyToMany(() => SneakerEntity, sneaker => sneaker.colors)
    declare sneakers: Relation<SneakerEntity>[];
}
