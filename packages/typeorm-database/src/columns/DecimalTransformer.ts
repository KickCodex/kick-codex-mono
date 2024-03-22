import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    to(decimal?: Decimal): string | undefined {
        return decimal?.toString() || undefined;
    }

    from(decimal?: string): Decimal | undefined {
        return decimal ? new Decimal(decimal) : undefined;
    }
}
