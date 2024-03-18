import React, { FC } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            xmp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export const Debug: FC<{ data?: object }> = ({ data }) => {
    return <xmp>{JSON.stringify(data, null, 2)}</xmp>;
};
