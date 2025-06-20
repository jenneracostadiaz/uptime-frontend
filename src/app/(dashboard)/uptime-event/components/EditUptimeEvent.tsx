import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem} from "@/components/ui";
import {FormUptimeEvent} from "@/app/(dashboard)/uptime-event/components/FormUptimeEvent";
import {UptimeEvent} from "@/type/System";

interface EditUptimeEventProps {
	event: UptimeEvent;
}

export const EditUptimeEvent = ({event}:EditUptimeEventProps) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	return (
		<Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit System</DialogTitle>
					<FormUptimeEvent event={event} onSuccess={() => setEditModalOpen(false)} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}