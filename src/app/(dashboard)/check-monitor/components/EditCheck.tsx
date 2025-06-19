'use client';
import type {UptimeCheck} from "@/type/System";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem} from "@/components/ui";
import {FormComponent} from "@/app/(dashboard)/components/components/FormComponent";

export const EditCheck = ({check}: {check: UptimeCheck}) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	return (
		<Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit System</DialogTitle>
					Hello World
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}