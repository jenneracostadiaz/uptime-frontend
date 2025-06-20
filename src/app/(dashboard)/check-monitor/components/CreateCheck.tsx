'use client';

import {useState} from "react";
import {Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui";

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
					New check form goes here
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}