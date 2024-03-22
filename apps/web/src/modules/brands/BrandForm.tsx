'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { BrandEntity } from '@repo/typeorm-database/entities';
import { BrandFormType, BrandValidationSchema } from '@repo/typeorm-database/validation';
import { TextAreaInput, TextInput } from '@repo/ui/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ValidationError } from 'yup';

import ButtonLink from '@webApp/components/ButtonLink';

type BrandFormProps = {
    forEdit?: boolean;
    defaults?: BrandEntity;
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
    const { control, handleSubmit, setError, formState } = useForm<BrandFormType>({
        mode: 'onBlur',
        resolver: yupResolver(BrandValidationSchema),
        defaultValues: defaults as BrandFormType,
    });

    const onSubmit = handleSubmit(async (formData: BrandFormType, qw) => {
        await new Promise(f => setTimeout(f, 3000));

        const response = await fetch(submitUrl, {
            method: submitMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const { data, error, validationError } = (await response.json()) as {
            data?: BrandEntity;
            error?: Error;
            validationError?: ValidationError;
        };
        if (validationError) {
            validationError.inner.forEach(verror => {
                const { path, message } = verror;
                if (path) {
                    setError(path as FieldPath<BrandFormType>, { message });
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
            <Button type="submit" variant="success" disabled={formState.isSubmitting}>
                {buttonLabel} {formState.isSubmitting && <Spinner size="sm" />}
            </Button>
        </form>
    );
};
