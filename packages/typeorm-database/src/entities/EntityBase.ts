import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBase extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    declare id: number;

    @CreateDateColumn({ name: 'created_at' })
    declare createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    declare updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    declare deletedAt: Date | null;
}
