import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

const ButtonLink: FC<ButtonProps & LinkProps & { text: string }> = ({ text, ...props }) => {
    const buttonProps = {
        ...props,
        as: Link,
    };
    // @ts-ignore
    return <Button {...buttonProps}>{text}</Button>;
};

export default ButtonLink;
