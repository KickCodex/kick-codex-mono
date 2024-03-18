/*
import SSRProvider from 'react-bootstrap/SSRProvider';
In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.
 */
'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
