'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrismaDb } from '@repo/prisma-database/src';
import { TextAreaInput, TextInput } from '@repo/ui/form';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ValidationError } from 'yup';

import { BrandCreateFormData, brandCreateSchema } from '@webApp/schemas/brandSchema';

export function BrandForm() {
    const router = useRouter();
    const { control, handleSubmit, setError } = useForm<BrandCreateFormData>({
        mode: 'onBlur',
        resolver: yupResolver(brandCreateSchema),
    });

    const onSubmit = handleSubmit(async formData => {
        const response = await fetch('/api/data/brands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const { data, error, validationError } = (await response.json()) as {
            data?: PrismaDb.Brand;
            error?: Error;
            validationError?: ValidationError;
        };
        if (validationError) {
            validationError.inner.forEach(verror => {
                const { path, message } = verror;
                if (path) {
                    setError(path as FieldPath<BrandCreateFormData>, { message });
                }
                toast.error(validationError.message);
            });
        } else if (error) {
            toast.error(error.message || error.name || (error as any).error);
        } else if (data) {
            toast.success('Brand creation successful');
            router.push(`/brands/${data.id}`);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <TextInput control={control} name="name" label="Brand" placeholder="name of the brand" />

            <TextAreaInput
                control={control}
                name="description"
                label="Description"
                placeholder="description of the brand"
            />
            <Button type="submit" variant="success">
                Create Brand
            </Button>
        </form>
    );
}
