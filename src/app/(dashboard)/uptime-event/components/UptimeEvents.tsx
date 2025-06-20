'use client';

import {useFetchChecks, useFetchComponents, useFetchSystems, useFetchUptimeEvents} from "@/hooks/Fetch";
import { useQuery } from '@tanstack/react-query';
import {Alert, AlertDescription, AlertTitle, SkeletonTable} from "@/components/ui";
import {Terminal} from "lucide-react";
import {DataTable} from "@/components/DataTable";
import {Columns} from "@/app/(dashboard)/uptime-event/components/Columns";
import {useUptimeEventsTableData} from "@/hooks/Components";
import {FilterUptimeEvents} from "@/app/(dashboard)/uptime-event/components/FilterUptimeEvents";
import {useState} from "react";
import {ExportForm} from "@/app/(dashboard)/uptime-event/components/ExportForm";

export const UptimeEvents = () => {
    const [filters, setFilters] = useState({});

	const  {
		data: uptimeEvents,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['uptimeEvents', filters],
		queryFn: () => useFetchUptimeEvents(filters),
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
		queryFn: () => useFetchComponents(),
	});

	const {
		data: systems
	} = useQuery({
		queryKey: ['systems'],
		queryFn: () => useFetchSystems(),
	});

	const tableData = useUptimeEventsTableData({uptimeEvents, checks, components, systems});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-2xl font-bold">Uptime Events</h1>
				<ExportForm />
			</div>

            <FilterUptimeEvents
				onFilterChangeAction={setFilters}
                checks={checks ?? []}
                systems={systems ?? []}
                components={components ?? []}
            />

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