'use client';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui";
import {FormSystem} from "@/app/(dashboard)/systems/components/FormSystem";
import {useState} from "react";

export const CreateSystem = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	return (
		<Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create System</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New System</DialogTitle>
					<FormSystem onSuccess={() => setCreateModalOpen(false)} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}