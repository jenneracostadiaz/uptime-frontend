'use client';

import {useFetchChecks, useFetchComponents, useFetchSystems} from "@/hooks/Fetch";
import {useQuery} from "@tanstack/react-query";
import {Alert, AlertDescription, AlertTitle, SkeletonTable} from "@/components/ui";
import {Terminal} from "lucide-react";
import {DataTable} from "@/components/DataTable";
import {Columns} from "@/app/(dashboard)/check-monitor/components/Columns";
import {useChecksTableData} from "@/hooks/Components";

export const CheckMonitors = () => {

	const {data: checks, isLoading: isLoadingChecks, isError: isErrorChecks} = useQuery({
		queryKey: ['checks'],
		queryFn: useFetchChecks,
	});

	const isLoading = isLoadingChecks;
	const isError = isErrorChecks;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-2xl font-bold">Check Monitors</h1>
			</div>

			{isError && (
				<Alert variant="destructive">
					<Terminal/>
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>There was an error fetching the data. Please try again later.</AlertDescription>
				</Alert>
			)}

			{!isError &&
				(isLoading ? <SkeletonTable /> : checks && <DataTable data={checks} columns={Columns} />)}
		</div>
	);
}