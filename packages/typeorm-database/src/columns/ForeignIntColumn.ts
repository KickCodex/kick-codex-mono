import { Column, Index } from 'typeorm';

export function ForeignIntColumn(options: { index?: boolean } = { index: true }): PropertyDecorator {
    return function (target: object, propertyName: string | symbol) {
        // Apply the column options
        Column({ type: 'int', unsigned: true })(target, propertyName);

        // If index option is provided or true by default, apply indexing
        if (options.index) {
            Index()(target, propertyName);
        }
    };
}
