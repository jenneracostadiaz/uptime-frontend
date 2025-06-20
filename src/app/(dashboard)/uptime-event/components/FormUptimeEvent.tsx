'use client';

import {Alert, AlertDescription, AlertTitle, Button, Input, Label, Textarea} from "@/components/ui";
import {Checkbox} from "@/components/ui/checkbox";
import type {UptimeEvent} from "@/type/System";
import {FormEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UptimeEvents_API_URL} from "@/conts/conts";
import {Terminal} from "lucide-react";

interface FormUptimeEventProps {
	event?: UptimeEvent;
	onSuccess?: () => void;
}

export const FormUptimeEvent = ({event, onSuccess}: FormUptimeEventProps) => {
	const [isFalsePositive, setIsFalsePositive] = useState(event?.isFalsePositive || false);
	const [category, setCategory] = useState(event?.category || '');
	const [note, setNote] = useState(event?.note || '');
	const [jiraTicket, setJiraTicket] = useState(event?.jiraTicket || '');
	const [maintenanceType, setMaintenanceType] = useState(event?.maintenanceType || '');
	const queryClient = useQueryClient();

	const {mutate, isPending, error} = useMutation({
		mutationFn: async (newEvent: {
			isFalsePositive: boolean;
			category: string;
			note: string;
			jiraTicket: string;
			maintenanceType: string;
		}) => {
			const method = event ? 'PUT' : 'POST';
			const body = event
				? JSON.stringify({id: event.id, ...newEvent})
				: JSON.stringify(newEvent);
			const url = event ? `${UptimeEvents_API_URL}/${event.id}/partial` : UptimeEvents_API_URL;
			const res = await fetch(url, {
				method,
				headers: {'Content-Type': 'application/json'},
				body,
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || `Failed to ${event ? 'update' : 'create'} uptime event`);
			}
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['uptimeEvents']});
			if (onSuccess) onSuccess();
			setIsFalsePositive(false);
			setCategory('');
			setNote('');
			setJiraTicket('');
			setMaintenanceType('');
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({
			isFalsePositive,
			category,
			note,
			jiraTicket,
			maintenanceType,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-6">
				<div className="grid gap-3">
					<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-yellow-600 has-[[aria-checked=true]]:bg-yellow-50 dark:has-[[aria-checked=true]]:border-yellow-900 dark:has-[[aria-checked=true]]:bg-yellow-950">
						<Checkbox
							id="isFalsePositive"
							className="data-[state=checked]:border-yellow-600 data-[state=checked]:bg-yellow-600 data-[state=checked]:text-white dark:data-[state=checked]:border-yellow-700 dark:data-[state=checked]:bg-yellow-700"
							checked={isFalsePositive}
							onCheckedChange={checked => setIsFalsePositive(!!checked)}
						/>
						<div className="grid gap-1.5 font-normal">
							<p className="text-sm leading-none font-medium">
								Is False Positive
							</p>
							<p className="text-muted-foreground text-sm">
								This will prevent it from being counted in uptime statistics.
							</p>
						</div>
					</Label>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="category">Category</Label>
					<Input
						id="category"
						type="text"
						placeholder="Enter event category"
						value={category}
						onChange={e => setCategory(e.target.value)}
					/>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="note">Note</Label>
					<Textarea
						id="note"
						placeholder="Enter event note"
						rows={3}
						value={note}
						onChange={e => setNote(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="grid gap-3">
						<Label htmlFor="jiraTicket">Jira Ticket</Label>
						<Input
							id="jiraTicket"
							type="text"
							placeholder="(e.g., JIRA-1234)"
							value={jiraTicket}
							onChange={e => setJiraTicket(e.target.value)}
						/>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="maintenanceType">Maintenance Type</Label>
						<Input
							id="maintenanceType"
							type="text"
							placeholder="(e.g., Planned, Unplanned)"
							value={maintenanceType}
							onChange={e => setMaintenanceType(e.target.value)}
						/>
					</div>
				</div>

				{error && (
					<Alert variant="destructive">
						<Terminal />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}

				<div className="grid gap-3">
					<Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
						{isPending
							? event
								? 'Updating...'
								: 'Creating...'
							: event
								? 'Update Component'
								: 'Create Component'}
					</Button>
				</div>
			</div>
		</form>
	)
}