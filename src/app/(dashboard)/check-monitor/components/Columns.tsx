import type {ColumnDef} from "@tanstack/table-core";
import type {Component} from "@/type/System";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui";
import {MoreVertical} from "lucide-react";
import {EditComponent} from "@/app/(dashboard)/components/components/EditComponent";
import {DeleteComponent} from "@/app/(dashboard)/components/components/DeleteComponent";

export const Columns: ColumnDef<Component & { systemName: string }>[] = [
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
		accessorKey: 'checkUrl',
		header: 'Check URL',
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
						{/*<EditComponent component={component} /> // */}
						<DropdownMenuSeparator />
						{/*<DeleteComponent component={component} />*/}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
]