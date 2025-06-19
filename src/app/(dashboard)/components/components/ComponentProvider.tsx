'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import {Components} from "@/app/(dashboard)/components/components/Components";

export const ComponentProvider = () => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Components />
		</QueryClientProvider>
	);
};
