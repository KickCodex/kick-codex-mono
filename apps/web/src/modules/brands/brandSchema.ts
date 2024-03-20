import { InferType, object, string } from 'yup';

export const brandSchema = object({
    name: string().min(2).max(100).required(),
    description: string().min(10).max(3000).optional().nullable(),
});

export type BrandFormData = InferType<typeof brandSchema>;
