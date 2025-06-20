import { DeleteComponent } from '@/app/(dashboard)/components/components/DeleteComponent';
import { EditComponent } from '@/app/(dashboard)/components/components/EditComponent';
import {
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui';
import type { Component } from '@/type/System';
import type { ColumnDef } from '@tanstack/table-core';
import { CircleCheckBig, CircleOff, MoreVertical } from 'lucide-react';

export const columns: ColumnDef<Component & { systemName: string }>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const component = row.original;
            return component.status ? (
                <Badge variant="outline">
                    <CircleCheckBig className="text-green-500 dark:text-green-400" /> Active
                </Badge>
            ) : (
                <Badge variant="destructive">
                    <CircleOff /> Inactive
                </Badge>
            );
        },
    },
    {
        accessorKey: 'systemName',
        header: 'System',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const component = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <EditComponent component={component} />
                        <DropdownMenuSeparator />
                        <DeleteComponent component={component} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
