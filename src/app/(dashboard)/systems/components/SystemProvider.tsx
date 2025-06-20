'use client';

import { Systems } from '@/app/(dashboard)/systems/components/Systems';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const SystemProvider = () => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <Systems />
        </QueryClientProvider>
    );
};
