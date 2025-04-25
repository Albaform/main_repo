import GlobalStyleProvider from '@/context/GlobalStyleProvider';
import StyledComponentsRegistry from '../lib/StyledRegistry';
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
      <body>
        <StyledComponentsRegistry>
          <GlobalStyleProvider>{children}</GlobalStyleProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
