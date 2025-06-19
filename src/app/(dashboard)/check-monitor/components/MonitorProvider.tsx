'use client';
import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {CheckMonitors} from "@/app/(dashboard)/check-monitor/components/CheckMonitors";

export const MonitorProvider = () => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<CheckMonitors />
		</QueryClientProvider>
	);
}