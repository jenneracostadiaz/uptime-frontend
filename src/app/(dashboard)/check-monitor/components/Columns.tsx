import type {ColumnDef} from "@tanstack/table-core";
import type {Component} from "@/type/System";

export const Columns: ColumnDef<Component & { systemName: string }>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'checkUrl',
		header: 'Check URL',
	}
]