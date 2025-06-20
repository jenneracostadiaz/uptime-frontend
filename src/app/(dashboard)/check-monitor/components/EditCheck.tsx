'use client';
import { FormCheck } from '@/app/(dashboard)/check-monitor/components/FormCheck';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem } from '@/components/ui';
import type { Check } from '@/type/System';
import { useState } from 'react';

interface EditCheckProps {
    check: Check;
}

export const EditCheck = ({ check }: EditCheckProps) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit System</DialogTitle>
                    <FormCheck check={check} onSuccess={() => setEditModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
