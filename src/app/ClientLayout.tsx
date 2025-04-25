'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import Navbar from '@/app/components/navbar/navbar';

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/signin' || pathname === '/signup';
  const isMainPage = pathname === '/';

  const navbarVariant = isLoginPage ? 'login' : 'default';

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar variant={navbarVariant} />
      <div className={`${!isLoginPage && 'app'}`}>
        <div className={`${!isMainPage && 'layout'}`}>{children}</div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
