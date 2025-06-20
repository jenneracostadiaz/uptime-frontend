import {ColumnDef} from "@tanstack/table-core";
import {UptimeEvent} from "@/type/System";
import {Badge} from "@/components/ui";

export const Columns: ColumnDef<UptimeEvent>[] = [
	{
		accessorKey: "uptimeCheckId",
		header: "Check ID",
	},
	{
		accessorKey: "startTime",
		header: "Start Time",
		cell: ({ row }) => {
			const date = new Date(row.original.startTime);
			return date.toLocaleString('es-PE',{
				timeZone: 'America/Lima',
			});
		},
	},
	{
		accessorKey: "endTime",
		header: "End Time",
		cell: ({ row }) => {
			const date = new Date(row.original.endTime);
			return date.toLocaleString('es-PE',{
				timeZone: 'America/Lima',
			});
		},
	},
	{
		accessorKey: "isUp",
		header: "Status",
		cell: ({ row }) => (row.original.isUp
			? <Badge variant="success">Up</Badge>
			: <Badge variant="destructive">Down</Badge>
		),
	},
	{
		accessorKey: "isFalsePositive",
		header: "False Positive",
		cell: ({ row }) => (row.original.isFalsePositive
			? <Badge variant="warning">Yes</Badge>
			: <Badge variant="secondary">No</Badge>
		),
	},
	{
		accessorKey: "note",
		header: "Note",
	},
]