'use client';

import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';

const NAVBAR_VARIANTS = {
  DEFAULT: 'default',
  LOGIN: 'login',
} as const;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const pathname = usePathname();
  const isLoginPage = pathname === '/signin' || pathname === '/signup';

  return (
    <QueryClientProvider client={queryClientRef.current!}>
      <Navbar variant={isLoginPage ? NAVBAR_VARIANTS.LOGIN : NAVBAR_VARIANTS.DEFAULT} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
