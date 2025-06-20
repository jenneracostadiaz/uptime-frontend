import { Button, Input, Label } from '@/components/ui';
import type { System } from '@/type/System';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type FormEvent, useEffect, useState } from 'react';
import {SystemAPI_URL} from "@/conts/conts";

interface FormSystemProps {
    system?: System;
    onSuccess?: () => void;
}

export const FormSystem = ({ system, onSuccess }: FormSystemProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        if (system) {
            setName(system.name);
            setDescription(system.description);
        }
    }, [system]);

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (newSystem: { name: string; description: string }) => {
            const method = system ? 'PUT' : 'POST';
            const body = system ? JSON.stringify({ id: system.id, ...newSystem }) : JSON.stringify(newSystem);

            const url = system ? `${SystemAPI_URL}/${system.id}` : SystemAPI_URL;
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to ${system ? 'update' : 'create'} system`);
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['systems'] }).then(r => console.log(r));
            setName('');
            setDescription('');
            if (onSuccess) onSuccess();
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        mutate({ name, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">System Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter system name"
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
                        placeholder="Enter system description"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                {error && <div className="text-red-500 text-sm">{error.message}</div>}

                <div className="grid gap-3">
                    <Button type="submit" className="w-full" disabled={isPending} aria-haspopup="dialog">
                        {isPending
                            ? system
                                ? 'Updating...'
                                : 'Creating...'
                            : system
                              ? 'Update System'
                              : 'Create System'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
