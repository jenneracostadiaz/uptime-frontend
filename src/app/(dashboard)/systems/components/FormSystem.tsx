import {Button, Input, Label} from "@/components/ui";

export const FormSystem = () => {
	return (
		<form>
			<div className="flex flex-col gap-6">
				<div className="grid gap-3">
					<Label htmlFor="name">System Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="Enter system name"
						required
						/>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						type="text"
						placeholder="Enter system description"
						required
					/>
				</div>

				<div className="grid gap-3">
					<Button type="submit" className="w-full">
						Create System
					</Button>
				</div>
			</div>
		</form>
	)
}