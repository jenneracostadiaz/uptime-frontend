'use client';
import {useState} from "react";
import {Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui";
import {FormComponent} from "@/app/(dashboard)/components/components/FormComponent";

export const CreateComponent = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	return (
		<Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create Component</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Component</DialogTitle>
					<FormComponent onSuccess={() => setCreateModalOpen(false)} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

