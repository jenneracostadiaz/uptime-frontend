import {Button, Input, Label, Textarea} from "@/components/ui";
import {Checkbox} from "@/components/ui/checkbox";

export const FormUptimeEvent = () => {
	return (
		<form>
			<div className="flex flex-col gap-6">
				<div className="grid gap-3">
					<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-yellow-600 has-[[aria-checked=true]]:bg-yellow-50 dark:has-[[aria-checked=true]]:border-yellow-900 dark:has-[[aria-checked=true]]:bg-yellow-950">
						<Checkbox
							id="isFalsePositive"
							className="data-[state=checked]:border-yellow-600 data-[state=checked]:bg-yellow-600 data-[state=checked]:text-white dark:data-[state=checked]:border-yellow-700 dark:data-[state=checked]:bg-yellow-700"
						/>
						<div className="grid gap-1.5 font-normal">
							<p className="text-sm leading-none font-medium">
								Is False Positive
							</p>
							<p className="text-muted-foreground text-sm">
								This will prevent it from being counted in uptime statistics.
							</p>
						</div>
					</Label>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="category">Category</Label>
					<Input
						id="category"
						type="text"
						placeholder="Enter event category"
					/>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="note">Note</Label>
					<Textarea
						id="note"
						placeholder="Enter event note"
						rows={3}
						/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="grid gap-3">
						<Label htmlFor="jiraTicket">Jira Ticket</Label>
						<Input
							id="jiraTicket"
							type="text"
							placeholder="(e.g., JIRA-1234)"
						/>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="maintenanceType">Maintenance Type</Label>
						<Input
							id="maintenanceType"
							type="text"
							placeholder="(e.g., Planned, Unplanned)"
						/>
					</div>
				</div>

				<div className="grid gap-3">
					<Button type="submit" className="w-full">
						Update Event
					</Button>
				</div>
			</div>
		</form>
	)
}