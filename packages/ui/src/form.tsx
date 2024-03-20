import { Form, InputGroup } from 'react-bootstrap';
import { Control, Controller, Path } from 'react-hook-form';

type FieldValues = Record<string, any>;
type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

interface InputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name?: TName;
    label?: string;
    placeholder?: string;
    control?: Control<TFieldValues>;
    type?: string;
}

interface TextInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps<TFieldValues> {
    name: TName;
    label: string;
}

interface PasswordInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps<TFieldValues> {
    name: TName;
    label: string;
    type: 'password';
}

interface EmailInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps<TFieldValues> {
    name: TName;
    label: string;
    type: 'email';
}

interface TextareaInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps<TFieldValues> {
    name: TName;
    label: string;
    height?: number;
}

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    control,
    placeholder = '',
    type = 'text',
}: TextInputProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState, formState }) => {
                const isTouched = fieldState.isTouched;
                const isDirty = fieldState.isDirty;
                const error = formState.errors[name];
                const isInValid = !!error;
                const isValid = isTouched && isDirty && !isInValid;
                const as = type === 'textarea' ? 'textarea' : undefined;
                return (
                    <>
                        <Form.Label htmlFor={name}>{label}</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                {...field}
                                id={name}
                                value={field.value || ''}
                                as={as}
                                type={type}
                                placeholder={placeholder}
                                aria-label={label}
                                aria-describedby={`${label}-${placeholder}`}
                                isInvalid={isInValid}
                                isValid={isValid}
                            />
                            {isInValid && (
                                <Form.Control.Feedback type="invalid">{String(error.message)}</Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </>
                );
            }}
        />
    );
}

export function PasswordInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues>) {
    const parentProps: PasswordInputProps<TFieldValues> = {
        name: 'password' as TName,
        label: 'Password',
        placeholder: 'your password',
        ...props,
        type: 'password',
    };
    return <TextInput {...parentProps} />;
}

export function EmailInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues>) {
    const parentProps: EmailInputProps<TFieldValues> = {
        name: 'email' as TName,
        label: 'Email Address',
        placeholder: 'your email address',
        ...props,
        type: 'email',
    };
    return <TextInput {...parentProps} />;
}

export function NameInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues>) {
    const parentProps: TextInputProps<TFieldValues> = {
        name: 'name' as TName,
        label: 'Full Name',
        placeholder: 'your full name',
        ...props,
        type: 'text',
    };
    return <TextInput {...parentProps} />;
}

export function TextAreaInput<TFieldValues extends FieldValues = FieldValues>({
    height,
    ...props
}: TextareaInputProps<TFieldValues>) {
    const parentProps: TextInputProps<TFieldValues> = {
        ...props,
        type: 'textarea',
    };
    return <TextInput {...parentProps} />;
}
