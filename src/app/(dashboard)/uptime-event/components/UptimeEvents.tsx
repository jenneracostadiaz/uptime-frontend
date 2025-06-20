'use client';

import {useFetchChecks, useFetchUptimeEvents} from "@/hooks/Fetch";
import { useQuery } from '@tanstack/react-query';
import {Alert, AlertDescription, AlertTitle, SkeletonTable} from "@/components/ui";
import {Terminal} from "lucide-react";
import {DataTable} from "@/components/DataTable";
import {Columns} from "@/app/(dashboard)/uptime-event/components/Columns";
import {useUptimeEventsTableData} from "@/hooks/Components";

export const UptimeEvents = () => {
	const  {
		data: uptimeEvents,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['uptimeEvents'],
		queryFn: useFetchUptimeEvents,
	});

	const {
		data: checks
	} = useQuery({
		queryKey: ['checks'],
		queryFn: () => useFetchChecks(),
	});

	const {
		data: components
	} = useQuery({
		queryKey: ['components'],
		queryFn: () => useFetchChecks(),
	});

	const {
		data: systems
	} = useQuery({
		queryKey: ['systems'],
		queryFn: () => useFetchChecks(),
	});

	const tableData = useUptimeEventsTableData({uptimeEvents, checks, components, systems});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-2xl font-bold">Uptime Events</h1>
			</div>

			{isError && (
				<Alert variant="destructive">
					<Terminal />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>There was an error fetching the data. Please try again later.</AlertDescription>
				</Alert>
			)}

			{!isError && (isLoading
				? <SkeletonTable />
				: uptimeEvents && <DataTable columns={Columns} data={tableData} />
			)}
		</div>
	);
}