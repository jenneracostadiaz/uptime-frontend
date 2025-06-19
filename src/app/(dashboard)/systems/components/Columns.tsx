'use client';

import { DeleteSystem } from '@/app/(dashboard)/systems/components/DeleteSystem';
import { EditSystem } from '@/app/(dashboard)/systems/components/EditSystem';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import type { System } from '@/type/System';
import type { ColumnDef } from '@tanstack/table-core';
import { MoreVertical } from 'lucide-react';

export const columns: ColumnDef<System>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const system = row.original;
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
                        <EditSystem system={system} />
                        <DropdownMenuSeparator />
                        <DeleteSystem system={system} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
