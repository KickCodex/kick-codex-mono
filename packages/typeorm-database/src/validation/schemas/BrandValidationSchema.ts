import { InferType, object, string } from 'yup';

export const BrandValidationSchema = object({
    name: string().min(2).max(100).required(),
    description: string()
        .nullable()
        .min(10)
        .max(3000)
        .transform(value => (value ? value : null)),
});

export type BrandFormType = InferType<typeof BrandValidationSchema>;
