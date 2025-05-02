import GlobalStyleProvider from '@/context/GlobalStyleProvider';
import StyledComponentsRegistry from '../lib/StyledRegistry';
import ClientLayout from '@/app/ClientLayout';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Albaform',
  description: '알바 구인 구직 플랫폼',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no, viewport-fit=cover'
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyleProvider>
           <ClientLayout>{children}</ClientLayout>
          </GlobalStyleProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
