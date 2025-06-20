import {ColumnDef} from "@tanstack/table-core";
import {UptimeEvent} from "@/type/System";
import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui";
import {MoreVertical} from "lucide-react";
import {EditUptimeEvent} from "@/app/(dashboard)/uptime-event/components/EditUptimeEvent";

export const Columns: ColumnDef<UptimeEvent>[] = [
	{
		id: "id",
		cell: ({ row }) => {
			const event = row.original;
			return (
				<div className="flex justify-start">
					<span className="text-xs text-muted-foreground">ID: {event.id}</span>
				</div>
			)
		}
	},
	{
		accessorKey: "checkName",
		header: "Check Name",
	},
	{
		accessorKey: "systemName",
		header: "System Name",
	},
	{
		accessorKey: "componentName",
		header: "Component Name",
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
	{
		id: 'actions',
		cell: ({ row }) => {
			const event = row.original;
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
							<EditUptimeEvent event={event} />
						</DropdownMenuContent>
					</DropdownMenu>
			);
		}
	},
]