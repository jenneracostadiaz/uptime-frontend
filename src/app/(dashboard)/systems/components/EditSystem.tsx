'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui';
import { FormSystem } from '@/app/(dashboard)/systems/components/FormSystem';
import { useState } from 'react';
import type { System } from '@/type/System';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

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

