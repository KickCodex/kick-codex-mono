import { InferType, object, string } from 'yup';

export const brandCreateSchema = object({
    name: string().min(2).max(100).required(),
    description: string().min(10).max(3000).optional(),
});

export type BrandCreateFormData = InferType<typeof brandCreateSchema>;
