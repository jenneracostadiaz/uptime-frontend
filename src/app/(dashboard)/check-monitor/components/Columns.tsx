import { DeleteCheck } from '@/app/(dashboard)/check-monitor/components/DeleteCheck';
import { EditCheck } from '@/app/(dashboard)/check-monitor/components/EditCheck';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui';
import type { Check } from '@/type/System';
import type { ColumnDef } from '@tanstack/table-core';
import { MoreVertical } from 'lucide-react';

export const Columns: ColumnDef<Check>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'systemName',
        header: 'System',
    },
    {
        accessorKey: 'componentName',
        header: 'Component',
    },
    {
        accessorKey: 'alertEmail',
        header: 'Alert Email',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const check = row.original;
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
                        <EditCheck check={check} />
                        <DropdownMenuSeparator />
                        <DeleteCheck check={check} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
