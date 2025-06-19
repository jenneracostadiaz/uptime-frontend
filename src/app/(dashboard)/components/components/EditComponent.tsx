import type { Component } from "@/type/System";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem} from "@/components/ui";
import {FormComponent} from "@/app/(dashboard)/components/components/FormComponent";

export const EditComponent = ({ component }: { component: Component }) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	return (
		<Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit System</DialogTitle>
					<FormComponent component={component} onSuccess={() => setEditModalOpen(false)} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
