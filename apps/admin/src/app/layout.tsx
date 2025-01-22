import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@slabs/ds-utils';

import RootProvider from '@/components/providers/rootProviders';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-querybuilder/dist/query-builder.css';
import '@slabs/ds-core/src/styles.scss';
import './globals.scss';

import { ColorSchemeScript } from '@slabs/ds-core';

import { GLOBAL } from '@/constants/global.constants';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: GLOBAL.ORGANIZATION.name,
//     description: GLOBAL.ORGANIZATION.name,
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
                    integrity='sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=='
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
                <ColorSchemeScript />
            </head>
            <body
                className={cn(
                    inter.className,
                    'bg-background text-foreground min-h-screen text-base'
                )}
            >
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
