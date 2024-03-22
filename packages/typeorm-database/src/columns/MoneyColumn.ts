import { Transform, TransformOptions } from 'class-transformer';
import Decimal from 'decimal.js';
import { Column, ColumnOptions } from 'typeorm';

import { DecimalTransformer } from './DecimalTransformer';

export function MoneyColumn(options: ColumnOptions & TransformOptions = {}): PropertyDecorator {
    const defaultColumnOptions: ColumnOptions = {
        nullable: false,
        unsigned: true,
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    };

    const { toPlainOnly = true, ...transformOptions } = options;
    const columnOptions: ColumnOptions = { ...defaultColumnOptions, ...options };

    return function (target: object, propertyName: string | symbol): void {
        Column({
            ...columnOptions,
            transformer: new DecimalTransformer(),
        })(target, propertyName);

        Transform(({ value }: { value?: Decimal }) => value?.toFixed?.(2) || value, {
            toPlainOnly,
            ...transformOptions,
        })(target, propertyName);
    };
}
