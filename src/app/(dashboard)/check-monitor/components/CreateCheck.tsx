'use client';

import { FormCheck } from '@/app/(dashboard)/check-monitor/components/FormCheck';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { useState } from 'react';

export const CreateCheck = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Check Monitor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Check Monitor</DialogTitle>
                    <FormCheck onSuccess={() => setCreateModalOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
