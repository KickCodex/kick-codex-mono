import { Transform, TransformOptions } from 'class-transformer';
import Decimal from 'decimal.js';
import { Column, ColumnOptions } from 'typeorm';

import { DecimalTransformer } from './DecimalTransformer';

export function CoordinateColumn(options: ColumnOptions & TransformOptions = {}): PropertyDecorator {
    const defaultColumnOptions: ColumnOptions = {
        nullable: true,
        type: 'decimal',
        precision: 19, // Adjust the precision based on your requirements
        scale: 15, // Adjust the scale based on your precision requirements
        default: null,
    };

    const { toPlainOnly = true, ...transformOptions } = options;
    const columnOptions: ColumnOptions = { ...defaultColumnOptions, ...options };

    return function (target: object, propertyName: string | symbol): void {
        Column({
            ...columnOptions,
            transformer: new DecimalTransformer(),
        })(target, propertyName);

        Transform(({ value }: { value?: Decimal }) => value?.toNumber?.() || value, {
            toPlainOnly,
            ...transformOptions,
        })(target, propertyName);
    };
}
