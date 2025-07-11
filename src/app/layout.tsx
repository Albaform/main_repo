import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import GlobalStyleProvider from '@/context/GlobalStyleProvider';
import StyledComponentsRegistry from '../lib/StyledRegistry';
import ClientLayout from '@/app/ClientLayout';
import '@/styles/tailwindStyle.css';
import DaumPostcodeScript from '@/components/common/DaumPostcodeScript';
import KakaoMapScript from '@/components/common/KakaoMapScript';
import Script from 'next/script';
import Navbar from '@/components/navbar/Navbar';
import GlobalToast from '@/components/tooltip/GlobalToast';

export const metadata: Metadata = {
  title: 'Albaform',
  description: '알바 구인 구직 플랫폼🏃‍♂️‍➡️',
  icons: {
    icon: '/images/favicon.ico',
  },
  openGraph: {
    title: 'Albaform',
    description: '알바 구인 구직 플랫폼🏃‍♂️‍➡️',
    url: '',
    siteName: 'Albaform',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: '썸네일',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albaform',
    description: '알바 구인 구직 플랫폼🏃‍♂️‍➡️',
    images: [''],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no, viewport-fit=cover'
        />
        <Script
          src='https://developers.kakao.com/sdk/js/kakao.js'
          strategy='beforeInteractive'
        />
      </head>
      <body>
        <Suspense fallback={<div />}>
          <DaumPostcodeScript />
          <KakaoMapScript />
          <StyledComponentsRegistry>
            <GlobalStyleProvider>
              <ClientLayout>
                <Navbar />
                {children}
                <GlobalToast />
              </ClientLayout>
            </GlobalStyleProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}
