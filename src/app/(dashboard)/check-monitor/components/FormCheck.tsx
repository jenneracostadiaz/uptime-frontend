import type{Check} from "@/type/System";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useFetchComponents, useFetchSystems} from "@/hooks/Fetch";
import {Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";

interface FormCheckProps {
	check?: Check;
	onSuccess?: () => void;
}

export const FormCheck = ({check, onSuccess}:FormCheckProps) => {
	const [name, setName] = useState('');
	const [serviceSystemId, setServiceSystemId] = useState<number | null>(null);
	const [componentId, setComponentId] = useState<number | null>(null);
	const [checkUrl, setCheckUrl] = useState('');
	const [checkInterval, setCheckInterval] = useState(60);
	const [checkTimeout, setCheckTimeout] = useState(10);
	const [requestHeaders, setRequestHeaders] = useState('');
	const [downAlertDelay, setDownAlertDelay] = useState(60);
	const [downAlertResend, setDownAlertResend] = useState(60);
	const [downAlertMessage, setDownAlertMessage] = useState('');
	const [alertEmail, setAlertEmail] = useState('');
	const queryClient = useQueryClient();

	const {
		data: systems,
		isLoading: isLoadingSystems,
		isError: isErrorSystems,
	} = useQuery({queryKey: ['systems'], queryFn: useFetchSystems});

	const {
		data: components,
		isLoading: isLoadingComponents,
		isError: isErrorComponents,
	} = useQuery({queryKey: ['components'], queryFn: useFetchComponents});

	useEffect(() => {
		if(check){
			setName(check.name);
			setServiceSystemId(check.serviceSystemId);
			setComponentId(check.componentId);
			setCheckUrl(check.checkUrl);
			setCheckInterval(check.checkInterval);
			setCheckTimeout(check.checkTimeout);
			setRequestHeaders(check.requestHeaders);
			setDownAlertDelay(check.downAlertDelay);
			setDownAlertResend(check.downAlertResend);
			setDownAlertMessage(check.downAlertMessage);
			setAlertEmail(check.alertEmail);
		}
	}, [check]);

	const { mutate, isPending, error } = useMutation({
		mutationFn: async (newCheck: {
			name: string;
			serviceSystemId: number;
			componentId: number;
			checkUrl: string;
			checkInterval: number;
			checkTimeout: number;
			requestHeaders: string;
			downAlertDelay: number;
			downAlertResend: number;
			downAlertMessage: string;
			alertEmail: string;
		}) => {
			const method = check ? 'PUT' : 'POST';
			const body = check
				? JSON.stringify({ id: check.id, ...newCheck })
				: JSON.stringify(newCheck);

			const res = await fetch('/api/checks', {
				method,
				headers: { 'Content-Type': 'application/json' },
				body,
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || `Failed to ${check ? 'update' : 'create'} check`);
			}
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['checks'] }).then(r => console.log(r));
			setName('');
			setServiceSystemId(null);
			setComponentId(null);
			setCheckUrl('');
			setCheckInterval(60);
			setCheckTimeout(10);
			setRequestHeaders('');
			setDownAlertDelay(60);
			setDownAlertResend(60);
			setDownAlertMessage('');
			setAlertEmail('');
			if (onSuccess) onSuccess();
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (serviceSystemId === null || componentId === null) {
			alert('Please select a system and component');
			return;
		}
		mutate({
			name,
			serviceSystemId,
			componentId,
			checkUrl,
			checkInterval,
			checkTimeout,
			requestHeaders,
			downAlertDelay,
			downAlertResend,
			downAlertMessage,
			alertEmail
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-6">
				<div className="grid gap-3">
					<Label htmlFor="name">Check Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="Enter check name"
						required
						value={name}
						onChange={e => setName(e.target.value)}
						/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="grid gap-3">
						<Label htmlFor="serviceSystemId">Service System</Label>
						<Select
							value={serviceSystemId?.toString()}
							onValueChange={value => setServiceSystemId(value ? Number.parseInt(value) : null)}
							disabled={isLoadingSystems || isErrorSystems}
							required
							>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select system" />
							</SelectTrigger>
							<SelectContent>
								{!isLoadingSystems && !isErrorSystems && systems?.map(system => (
									<SelectItem key={system.id} value={system.id.toString()}>
										{system.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="componentId">Component</Label>
						<Select
							value={componentId?.toString()}
							onValueChange={value => setComponentId(value ? Number.parseInt(value) : null)}
							disabled={isLoadingComponents || isErrorComponents}
							required
							>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select component" />
							</SelectTrigger>
							<SelectContent>
								{!isLoadingComponents && !isErrorComponents && components?.map(component => (
									<SelectItem key={component.id} value={component.id.toString()}>
										{component.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>


				<div className="grid gap-3">
					<Label htmlFor="checkUrl">Check URL</Label>
					<Input
						id="checkUrl"
						type="text"
						placeholder="Enter check URL"
						required
						value={checkUrl}
						onChange={e => setCheckUrl(e.target.value)}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="grid gap-3">
						<Label htmlFor="checkInterval">Check Interval (seconds)</Label>
						<Input
							id="checkInterval"
							type="number"
							min={1}
							value={checkInterval}
							onChange={e => setCheckInterval(Number.parseInt(e.target.value))}
						/>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="checkTimeout">Check Timeout (seconds)</Label>
						<Input
							id="checkTimeout"
							type="number"
							min={1}
							value={checkTimeout}
							onChange={e => setCheckTimeout(Number.parseInt(e.target.value))}
						/>
					</div>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="requestHeaders">Request Headers (JSON)</Label>
					<Input
						id="requestHeaders"
						type="text"
						placeholder="Enter request headers as JSON"
						value={requestHeaders}
						onChange={e => setRequestHeaders(e.target.value)}
					/>
				</div>
			</div>
		</form>
	);
}