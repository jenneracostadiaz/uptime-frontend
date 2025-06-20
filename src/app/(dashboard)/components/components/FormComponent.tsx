import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { useFetchSystems } from '@/hooks/Fetch';
import type { Component } from '@/type/System';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {Components_API_URL} from "@/conts/conts";

interface FormComponentProps {
    component?: Component;
    onSuccess?: () => void;
}

export const FormComponent = ({ component, onSuccess }: FormComponentProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceSystemId, setServiceSystemId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const {
        data: systems,
        isLoading: isLoadingSystems,
        isError: isErrorSystems,
    } = useQuery({ queryKey: ['systems'], queryFn: useFetchSystems });

    useEffect(() => {
        if (component) {
            setName(component.name);
            setDescription(component.description);
            setServiceSystemId(component.serviceSystemId);
        }
    }, [component]);

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (newComponent: { name: string; description: string; serviceSystemId: number }) => {
            const method = component ? 'PUT' : 'POST';
            const body = component
                ? JSON.stringify({ id: component.id, ...newComponent })
                : JSON.stringify(newComponent);

            const url = component ? `${Components_API_URL}/${component.id}` : Components_API_URL;
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to ${component ? 'update' : 'create'} component`);
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['components'] }).then(r => console.log(r));
            setName('');
            setDescription('');
            setServiceSystemId(null);
            if (onSuccess) onSuccess();
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (serviceSystemId === null) {
            alert('Please select a component');
            return;
        }
        mutate({ name, description, serviceSystemId: serviceSystemId });
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
                        onChange={e => setName(e.target.value)}
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
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="serviceSystemId">System</Label>
                    <select
                        id="serviceSystemId"
                        value={serviceSystemId?.toString() || ''}
                        onChange={e => setServiceSystemId(e.target.value ? Number.parseInt(e.target.value) : null)}
                        disabled={isLoadingSystems || isErrorSystems}
                        required
                        className="w-full p-2 text-sm border rounded-md dark:bg-gray-900 dark:text-gray-300"
                        >
                        <option value="" disabled>
                            Select a system
                        </option>
                        {!isLoadingSystems &&
                            !isErrorSystems &&
                            systems?.map(system => (
                                <option key={system.id} value={system.id.toString()}>
                                    {system.name}
                                </option>
                            ))}
                    </select>
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
    );
};
