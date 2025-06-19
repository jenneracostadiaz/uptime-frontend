'use client';

import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {Systems} from "@/app/(dashboard)/systems/components/Systems";

export const SystemProvider = () => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Systems />
		</QueryClientProvider>
	)

}