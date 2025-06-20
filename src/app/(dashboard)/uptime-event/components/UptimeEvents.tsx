'use client';

import {useFetchUptimeEvents} from "@/hooks/Fetch";
import { useQuery } from '@tanstack/react-query';
import {Alert, AlertDescription, AlertTitle, SkeletonTable} from "@/components/ui";
import {Terminal} from "lucide-react";
import {DataTable} from "@/components/DataTable";
import {Columns} from "@/app/(dashboard)/uptime-event/components/Columns";

export const UptimeEvents = () => {
	const  {
		data: uptimeEvents,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['uptimeEvents'],
		queryFn: useFetchUptimeEvents,
	});

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

			{!isError && (isLoading ? <SkeletonTable /> : uptimeEvents && <DataTable columns={Columns} data={uptimeEvents} />)}
		</div>
	);
}