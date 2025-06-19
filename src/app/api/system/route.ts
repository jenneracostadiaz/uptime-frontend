import type {System} from "@/type/System";

const data: System[] = [
	{
		id: 1,
		name: 'System Status',
		description: 'Check the current status of the system.',
	},
	{
		id: 2,
		name: 'System Logs',
		description: 'View the logs for system activities.',
	},
	{
		id: 3,
		name: 'System Settings',
		description: 'Configure system settings and preferences.',
	},
	{
		id: 4,
		name: 'User Management',
		description: 'Manage user accounts and permissions.',
	},
	{
		id: 5,
		name: 'Backup and Restore',
		description: 'Create backups and restore system data.',
	},
	{
		id: 6,
		name: 'System Updates',
		description: 'Check for and apply system updates.',
	},
	{
		id: 7,
		name: 'Performance Monitoring',
		description: 'Monitor system performance metrics.',
	},
	{
		id: 8,
		name: 'Security Settings',
		description: 'Configure security settings for the system.',
	}
];

export async function GET() {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}