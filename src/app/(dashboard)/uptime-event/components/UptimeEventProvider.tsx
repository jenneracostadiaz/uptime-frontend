'use client';
import { UptimeEvents } from '@/app/(dashboard)/uptime-event/components/UptimeEvents';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const UptimeEventProvider = () => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <UptimeEvents />
        </QueryClientProvider>
    );
};
