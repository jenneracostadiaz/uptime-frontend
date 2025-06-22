'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Check, Component, System } from '@/type/System';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const filterSchema = z.object({
    uptimeCheckId: z.string().optional(),
    systemId: z.string().optional(),
    componentId: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    status: z.string().optional(),
    isFalsePositive: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface FilterUptimeEventsProps {
    onFilterChangeAction: (filters: Partial<FilterFormValues>) => void;
    checks: Check[];
    systems: System[];
    components: Component[];
}

export const FilterUptimeEvents = ({ onFilterChangeAction, checks, systems, components }: FilterUptimeEventsProps) => {
    const form = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            uptimeCheckId: '',
            systemId: '',
            componentId: '',
            startTime: '',
            endTime: '',
            status: '',
            isFalsePositive: '',
        },
    });

    const onSubmit = (data: FilterFormValues) => {
        const cleanedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v !== ''));
        onFilterChangeAction(cleanedData);
    };

    const handleClear = () => {
        form.reset();
        onFilterChangeAction({});
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-4"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="uptimeCheckId">Uptime Check</Label>
                <Select
                    onValueChange={value => form.setValue('uptimeCheckId', value)}
                    value={form.watch('uptimeCheckId')}
                >
                    <SelectTrigger id="uptimeCheckId" className="w-full">
                        <SelectValue placeholder="Select a check" />
                    </SelectTrigger>
                    <SelectContent>
                        {checks?.map(check => (
                            <SelectItem key={check.id} value={String(check.id)}>
                                {check.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="systemId">System</Label>
                <Select onValueChange={value => form.setValue('systemId', value)} value={form.watch('systemId')}>
                    <SelectTrigger id="systemId" className="w-full">
                        <SelectValue placeholder="Select a system" />
                    </SelectTrigger>
                    <SelectContent>
                        {systems?.map(system => (
                            <SelectItem key={system.id} value={String(system.id)}>
                                {system.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="componentId">Component</Label>
                <Select onValueChange={value => form.setValue('componentId', value)} value={form.watch('componentId')}>
                    <SelectTrigger id="componentId" className="w-full">
                        <SelectValue placeholder="Select a component" />
                    </SelectTrigger>
                    <SelectContent>
                        {components?.map(component => (
                            <SelectItem key={component.id} value={String(component.id)}>
                                {component.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="datetime-local" {...form.register('startTime')} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="datetime-local" {...form.register('endTime')} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={value => form.setValue('status', value)} value={form.watch('status')}>
                    <SelectTrigger id="status" className="w-full">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">Up</SelectItem>
                        <SelectItem value="false">Down</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="isFalsePositive">False Positive</Label>
                <Select
                    onValueChange={value => form.setValue('isFalsePositive', value)}
                    value={form.watch('isFalsePositive')}
                >
                    <SelectTrigger id="isFalsePositive" className="w-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-end justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClear}>
                    Clear
                </Button>
                <Button type="submit">Filter</Button>
            </div>
        </form>
    );
};
