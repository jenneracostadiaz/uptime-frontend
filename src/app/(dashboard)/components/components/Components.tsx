'use client';

import { columns } from './Columns';
import { CreateComponent } from './CreateComponent';
import { Alert, AlertDescription, AlertTitle, SkeletonTable } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';
import {DataTable} from "@/components/DataTable";
import {useFetchComponents, useFetchSystems} from "@/hooks/Fetch";
import {useComponentsTableData} from "@/hooks/Components";

export const Components = () => {
    const { data: components, isLoading: isLoadingComponents, isError: isErrorComponents } = useQuery({ queryKey: ['components'], queryFn: useFetchComponents });
    const { data: systems, isLoading: isLoadingSystems, isError: isErrorSystems } = useQuery({ queryKey: ['systems'], queryFn: useFetchSystems });

    const isLoading = isLoadingComponents || isLoadingSystems;
    const isError = isErrorComponents || isErrorSystems;

    const tableData = useComponentsTableData({components, systems});

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Components</h1>
                <CreateComponent />
            </div>
            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        There was an error fetching the data. Please try again later.
                    </AlertDescription>
                </Alert>
            )}
            {!isError && (isLoading ? <SkeletonTable /> : tableData && <DataTable data={tableData} columns={columns} />)}
        </div>
    );
};
