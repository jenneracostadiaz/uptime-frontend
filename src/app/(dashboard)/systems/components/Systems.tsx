'use client';

import {useQuery} from "@tanstack/react-query";
import {DataTable} from "@/app/(dashboard)/systems/components/DataTable";
import {columns} from "@/app/(dashboard)/systems/components/Columns";
import {Alert, AlertDescription, AlertTitle, SkeletonTable} from "@/components/ui";
import {Terminal} from "lucide-react";

const fetchSystems = async () => {
	const response = await fetch('/api/systems');
	if (!response.ok) {
		throw new Error('Failed to fetch systems');
	}
	return response.json();
}

export const Systems = () => {

	const { data: systems, isLoading, isError, } = useQuery({ queryKey: ['systems'], queryFn: fetchSystems });
	console.log('systems', systems);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Systems</h1>
			{isError && (
				<Alert variant="destructive">
					<Terminal />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>
						There was an error fetching the systems. Please try again later.
					</AlertDescription>
				</Alert>
			)}
			{!isError && (
				isLoading ? (
					<SkeletonTable />
				) : (
					systems && <DataTable data={systems} columns={columns} />
				)
			)}

		</div>
	);
}