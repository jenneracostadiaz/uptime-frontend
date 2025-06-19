'use client';
import { FormSystem } from '@/app/(dashboard)/systems/components/FormSystem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { System } from '@/type/System';
import { useState } from 'react';

export const EditSystem = ({ system }: { system: System }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit System</DialogTitle>
                    <FormSystem system={system} onSuccess={() => setEditModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
