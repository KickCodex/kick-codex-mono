import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AnyObjectSchema, InferType, ObjectSchema, ValidationError } from 'yup';

import { AppDataSource } from '../data-source';
import { ContributionEntity } from '../entities';
import { UserContributionType } from '../enums/UserContributionType';

interface ByUserParams<Schema extends ObjectSchema<any> = AnyObjectSchema> {
    userId: number;
    schema: Schema;
    payload: InferType<Schema>;
}

interface ByUserReturn<T extends EntityBase> {
    data?: T;
    error?: Error;
    validationError?: ValidationError;
}

export abstract class EntityBase extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    declare id: number;

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;

    @DeleteDateColumn()
    declare deletedAt: Date | null;

    static async byUser<T extends EntityBase>(
        this: { new (): T } & typeof EntityBase,
        type: UserContributionType,
        { payload, schema, userId }: ByUserParams<ObjectSchema<any>>,
        id?: number,
    ): Promise<ByUserReturn<T>> {
        try {
            const entity = id ? await this.findOneByOrFail({ id }) : undefined;
            // Using the provided schema to validate payload, ensuring flexibility.
            const validatedPayload = await schema.validate(payload, {
                abortEarly: false,
                stripUnknown: true,
                strict: true,
            });

            // Creating an instance of the entity with the validated payload.
            const payloadInstance = this.create(validatedPayload);

            return AppDataSource.transaction(async transactionalEntityManager => {
                if (entity) {
                    await transactionalEntityManager.update(this, { id }, payloadInstance);
                } else {
                    await transactionalEntityManager.save(payloadInstance);
                }
                // Logging the contribution.
                const contribution = ContributionEntity.create({
                    userId,
                    foreignModel: this.name,
                    foreignId: this.getId(payloadInstance),
                    type,
                    currentData: payloadInstance,
                    originalData: entity,
                });

                await transactionalEntityManager.save(contribution);
                return { data: payloadInstance };
            });
        } catch (e) {
            console.log({ e });
            if (e instanceof ValidationError) {
                return { validationError: e };
            }
            return { error: e as Error };
        }
    }

    static createByUser<T extends EntityBase>(this: { new (): T } & typeof EntityBase, params: ByUserParams) {
        return this.byUser<T>(UserContributionType.CREATED, params);
    }

    static updateByUser<T extends EntityBase>(
        this: { new (): T } & typeof EntityBase,
        id: number,
        params: ByUserParams,
    ): Promise<ByUserReturn<T>> {
        return this.byUser<T>(UserContributionType.UPDATED, params, id);
    }
}
