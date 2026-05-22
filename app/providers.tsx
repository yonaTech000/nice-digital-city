'use client';

import { ReactNode } from 'react';
import { AuthProvider, BookingProvider, ThemeProvider, NotificationProvider } from '@/lib/context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
