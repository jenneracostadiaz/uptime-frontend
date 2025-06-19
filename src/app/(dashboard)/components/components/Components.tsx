'use client';

import { columns } from './Columns';
import { CreateComponent } from './CreateComponent';
import { Alert, AlertDescription, AlertTitle, SkeletonTable } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';
import {DataTable} from "@/components/DataTable";
import type { Component, System } from '@/type/System';

const fetchComponents = async (): Promise<Component[]> => {
    const response = await fetch('/api/components');
    if (!response.ok) {
        throw new Error('Failed to fetch components');
    }
    return response.json();
};

const fetchSystems = async (): Promise<System[]> => {
    const response = await fetch('/api/systems');
    if (!response.ok) {
        throw new Error('Failed to fetch systems');
    }
    return response.json();
};

export const Components = () => {
    const { data: components, isLoading: isLoadingComponents, isError: isErrorComponents } = useQuery({ queryKey: ['components'], queryFn: fetchComponents });
    const { data: systems, isLoading: isLoadingSystems, isError: isErrorSystems } = useQuery({ queryKey: ['systems'], queryFn: fetchSystems });

    const isLoading = isLoadingComponents || isLoadingSystems;
    const isError = isErrorComponents || isErrorSystems;

    const tableData = components && systems ? components.map(component => {
        const system = systems.find(s => s.id === component.systemId);
        return {
            ...component,
            systemName: system ? system.name : 'Unlinked',
        };
    }) : [];

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
