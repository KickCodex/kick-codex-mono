'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrismaDb } from '@repo/prisma-database/shared';
import { TextAreaInput, TextInput } from '@repo/ui/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ValidationError } from 'yup';

import ButtonLink from '@webApp/components/ButtonLink';
import { BrandFormData, brandSchema } from '@webApp/modules/brands/brandSchema';

type BrandFormProps = {
    forEdit?: boolean;
    defaults?: PrismaDb.Brand;
};
export const BrandForm: FC<BrandFormProps> = ({ forEdit = false, defaults }) => {
    let buttonLabel = 'Create Brand';
    let cancelHref = '/brands';
    let submitUrl = '/api/data/brands';
    let submitMethod = 'Post';
    let successMessage = 'Brand creation successful';
    if (forEdit && defaults?.id) {
        buttonLabel = 'Edit Brand';
        cancelHref = `/brands/${defaults.id}`;
        submitUrl = `/api/data/brands/${defaults.id}`;
        submitMethod = 'PATCH';
        successMessage = 'Brand edit successful';
    }
    const router = useRouter();
    const { control, handleSubmit, setError } = useForm<BrandFormData>({
        mode: 'onBlur',
        resolver: yupResolver(brandSchema),
        defaultValues: defaults as BrandFormData,
    });

    const onSubmit = handleSubmit(async formData => {
        const response = await fetch(submitUrl, {
            method: submitMethod,
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
                    setError(path as FieldPath<BrandFormData>, { message });
                }
            });
            toast.error(validationError.message);
        } else if (error) {
            toast.error(error?.message || error?.name || (error as any).error || 'Unknown Error');
        } else if (data) {
            toast.success(successMessage);
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
            <ButtonLink variant="secondary" text="Cancel" href={cancelHref} className="me-2" />
            <Button type="submit" variant="success">
                {buttonLabel}
            </Button>
        </form>
    );
};
