'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    DropdownMenuItem,
} from '@/components/ui';
import type { Component } from '@/type/System';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const DeleteComponent = ({ component }: { component: Component }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/components', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: component.id }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete component');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['components'] });
            setOpen(false);
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem variant="destructive" onSelect={e => e.preventDefault()}>
                    Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the component and remove its data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
