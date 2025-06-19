'use client';

import { columns } from '@/app/(dashboard)/systems/components/Columns';
import { DataTable } from '@/app/(dashboard)/systems/components/DataTable';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    SkeletonTable,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    Button
} from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';

const fetchSystems = async () => {
    const response = await fetch('/api/systems');
    if (!response.ok) {
        throw new Error('Failed to fetch systems');
    }
    return response.json();
};

export const Systems = () => {
    const { data: systems, isLoading, isError } = useQuery({ queryKey: ['systems'], queryFn: fetchSystems });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Systems</h1>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">Create System</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New System</DialogTitle>
                            <DialogDescription>
                                Form to create a new system will go here. You can add fields like name, description, and other relevant details.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
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
