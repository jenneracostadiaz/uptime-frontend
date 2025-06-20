'use client';
import { CheckMonitors } from '@/app/(dashboard)/check-monitor/components/CheckMonitors';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const MonitorProvider = () => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <CheckMonitors />
        </QueryClientProvider>
    );
};
