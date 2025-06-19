import type {Component} from "@/type/System";
import { useEffect, useState} from "react";
import type { FormEvent } from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
	Alert, AlertDescription, AlertTitle,
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui";
import {useFetchSystems} from "@/hooks/Fetch";
import {Terminal} from "lucide-react";

interface FormComponentProps {
	component?: Component;
	onSuccess?: () => void;
}

export const FormComponent = ({component, onSuccess}: FormComponentProps) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [systemId, setSystemId] = useState<number | null>(null);

	const { data: systems, isLoading: isLoadingSystems, isError: isErrorSystems } = useQuery({ queryKey: ['systems'], queryFn: useFetchSystems });

	useEffect(() => {
		if (component) {
			setName(component.name);
			setDescription(component.description);
			setSystemId(component.systemId);
		}
	}, [component])

	const {mutate, isPending, error} = useMutation({
		mutationFn: async (newComponent: { name: string; description: string; systemId: number }) => {
			const method = component ? 'PUT' : 'POST';
			const body = component ? JSON.stringify({ id: component.id, ...newComponent }) : JSON.stringify(newComponent);

			const res = await fetch('/api/components', {
				method,
				headers: {'Content-Type': 'application/json'},
				body,
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || `Failed to ${component ? 'update' : 'create'} component`);
			}
			return res.json();
		},
		onSuccess: () => {
			setName('');
			setDescription('');
			setSystemId(null);
			if (onSuccess) onSuccess();
		},
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (systemId === null) {
			alert('Please select a component');
			return;
		}
		mutate({name, description, systemId});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-6">
				<div className="grid gap-3">
					<Label htmlFor="name">Component Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="Enter component name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						/>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						type="text"
						placeholder="Enter component description"
						required
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="systemId">System</Label>
					<Select
						value={systemId?.toString() ?? ''}
						onValueChange={(value) => setSystemId(value ? Number.parseInt(value) : null)}
						disabled={isLoadingSystems || isErrorSystems}
						required
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="System" />
						</SelectTrigger>
						<SelectContent>
							{!isLoadingSystems && !isErrorSystems && systems?.map(system => (
								<SelectItem key={system.id} value={system.id.toString()}>{system.name}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{error && (
					<Alert variant="destructive">
						<Terminal />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							{error.message}
						</AlertDescription>
					</Alert>
				)}

				<div className="grid gap-3">
					<Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
						{isPending
							? component
								? 'Updating...'
								: 'Creating...'
							: component
								? 'Update Component'
								: 'Create Component'}
					</Button>
				</div>

			</div>
		</form>
	)
}