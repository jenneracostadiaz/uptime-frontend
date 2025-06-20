'use client';
import type {Check} from "@/type/System";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem} from "@/components/ui";

interface EditCheckProps {
	check: Check;
}

export const EditCheck = ({check}: EditCheckProps) => {
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	return (
		<Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit System</DialogTitle>
					{check.name}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}