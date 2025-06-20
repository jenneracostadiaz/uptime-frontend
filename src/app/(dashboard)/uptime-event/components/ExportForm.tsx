'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UptimeEvents_API_URL } from '@/conts/conts';

const exportSchema = z.object({
  dateFrom: z.string().min(1, 'Start date is required'),
  dateTo: z.string().min(1, 'End date is required'),
});

type ExportFormValues = z.infer<typeof exportSchema>;

export const ExportForm = () => {
  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
        dateFrom: '',
        dateTo: '',
    },
  });

  const onSubmit = (data: ExportFormValues) => {
    const { dateFrom, dateTo } = data;
    const exportUrl = `${UptimeEvents_API_URL}/export?dateFrom=${dateFrom}&dateTo=${dateTo}`;
	  console.log(`Export URL: ${exportUrl}`);
    window.open(exportUrl, '_blank');
  };

  return (
	<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">
		<div className="flex flex-col space-y-1.5">
			<Label htmlFor="dateFrom">Start Date</Label>
			<Input id="dateFrom" type="date" {...form.register('dateFrom')} />
			{form.formState.errors.dateFrom && <p className="text-red-500 text-xs">{form.formState.errors.dateFrom.message}</p>}
		</div>

		<div className="flex flex-col space-y-1.5">
			<Label htmlFor="dateTo">End Date</Label>
			<Input id="dateTo" type="date" {...form.register('dateTo')} />
			{form.formState.errors.dateTo && <p className="text-red-500 text-xs">{form.formState.errors.dateTo.message}</p>}
		</div>
		<div className="col-span-full flex justify-end">
			<Button type="submit">Export</Button>
		</div>
	</form>
  );
};
