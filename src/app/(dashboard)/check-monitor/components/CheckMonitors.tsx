'use client';

import { Columns } from '@/app/(dashboard)/check-monitor/components/Columns';
import { DataTable } from '@/components/DataTable';
import { Alert, AlertDescription, AlertTitle, SkeletonTable } from '@/components/ui';
import { useChecksTableData } from '@/hooks/Components';
import { useFetchChecks, useFetchComponents, useFetchSystems } from '@/hooks/Fetch';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';

export const CheckMonitors = () => {
    const {
        data: checks,
        isLoading: isLoadingChecks,
        isError: isErrorChecks,
    } = useQuery({
        queryKey: ['checks'],
        queryFn: useFetchChecks,
    });

    const { data: components } = useQuery({
        queryKey: ['components'],
        queryFn: useFetchComponents,
    });

    const { data: systems } = useQuery({
        queryKey: ['systems'],
        queryFn: useFetchSystems,
    });

    const isLoading = isLoadingChecks;
    const isError = isErrorChecks;

    const tableData = useChecksTableData({ checks, components, systems });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Check Monitors</h1>
            </div>

            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>There was an error fetching the data. Please try again later.</AlertDescription>
                </Alert>
            )}

            {!isError && (isLoading ? <SkeletonTable /> : checks && <DataTable data={tableData} columns={Columns} />)}
        </div>
    );
};
