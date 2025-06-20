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
import type { Check } from '@/type/System';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {Checks_API_URL} from "@/conts/conts";

export const DeleteCheck = ({ check }: { check: Check }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${Checks_API_URL}/${check.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete check');
            }
            if (res.status === 204) {
                return null;
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['checks']}).then(r =>console.log(r));
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
