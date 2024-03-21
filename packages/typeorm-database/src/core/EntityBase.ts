import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBase extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    declare id: number;

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;

    @DeleteDateColumn()
    declare deletedAt: Date | null;
}
