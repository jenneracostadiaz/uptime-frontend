'use client';

import {useState} from "react";
import {Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui";
import {FormCheck} from "@/app/(dashboard)/check-monitor/components/FormCheck";

export const CreateCheck = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	return (
		<Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create Component</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Component</DialogTitle>
					<FormCheck onSuccess={() => setCreateModalOpen(true)} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}