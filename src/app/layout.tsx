import { ReactNode } from 'react';
import type { Metadata } from 'next';
import GlobalStyleProvider from '@/context/GlobalStyleProvider';
import StyledComponentsRegistry from '../lib/StyledRegistry';
import ClientLayout from '@/app/ClientLayout';
import '@/styles/tailwindStyle.css';
import DaumPostcodeScript from '@/components/common/DaumPostcodeScript';
import KakaoMapScript from '@/components/common/KakaoMapScript';

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
        <DaumPostcodeScript />
        <KakaoMapScript />
        <StyledComponentsRegistry>
          <GlobalStyleProvider>
            <ClientLayout>{children}</ClientLayout>
          </GlobalStyleProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
