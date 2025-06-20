'use client';

import { columns } from '@/app/(dashboard)/systems/components/Columns';
import { CreateSystem } from '@/app/(dashboard)/systems/components/CreateSystem';
import { DataTable } from '@/components/DataTable';
import { Alert, AlertDescription, AlertTitle, SkeletonTable } from '@/components/ui';
import { useFetchSystems } from '@/hooks/Fetch';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';

export const Systems = () => {
    const { data: systems, isLoading, isError } = useQuery({ queryKey: ['systems'], queryFn: useFetchSystems });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Systems</h1>
                <CreateSystem />
            </div>
            {isError && (
                <Alert variant="destructive">
                    <Terminal />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        There was an error fetching the systems. Please try again later.
                    </AlertDescription>
                </Alert>
            )}
            {!isError && (isLoading ? <SkeletonTable /> : systems && <DataTable data={systems} columns={columns} />)}
        </div>
    );
};
