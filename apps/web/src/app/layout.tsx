import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import type { Metadata } from 'next';

import { Providers } from '@webApp/app/providers';
import Navigation from '@webApp/components/layout/Navigation';

export const metadata: Metadata = {
    title: 'KickCodex',
    description: 'Generated by create turbo',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navigation />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
