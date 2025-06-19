import type {Component} from "@/type/System";

let data: Component[] = [
	{
		id: 1,
		name: 'User Authentication',
		description: 'Handles user login and registration processes.',
		status: true,
		systemId: 1
	},
	{
		id: 2,
		name: 'Data Processing',
		description: 'Processes and analyzes user data for insights.',
		status: true,
		systemId: 1
	},
	{
		id: 3,
		name: 'Notification Service',
		description: 'Sends notifications to users via email and SMS.',
		status: false,
		systemId: 2
	},
	{
		id: 4,
		name: 'Payment Gateway',
		description: 'Manages payment transactions securely.',
		status: true,
		systemId: 2
	},
	{
		id: 5,
		name: 'API Management',
		description: 'Handles API requests and responses.',
		status: true,
		systemId: 3
	},
	{
		id: 6,
		name: 'Content Delivery',
		description: 'Delivers content to users efficiently.',
		status: false,
		systemId: 3
	},
	{
		id: 7,
		name: 'Analytics Dashboard',
		description: 'Provides insights into user behavior and system performance.',
		status: true,
		systemId: 4
	},
	{
		id: 8,
		name: 'User Feedback',
		description: 'Collects and manages user feedback and suggestions.',
		status: true,
		systemId: 4
	},
];

export async function GET() {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		if( !body.name || !body.description || !body.systemId) {
			return new Response(JSON.stringify({ error: 'Invalid input data' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
		const newComponent: Component = {
			id: newId,
			name: body.name,
			description: body.description,
			status: true,
			systemId: body.systemId
		};
		data.push(newComponent);
		return new Response(JSON.stringify(newComponent), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		if (!body.id || !body.name || !body.description || !body.systemId) {
			return new Response(JSON.stringify({ error: 'Id, name, description and systemId are required.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const componentIndex = data.findIndex(c => c.id === body.id);
		if (componentIndex === -1) {
			return new Response(JSON.stringify({ error: 'Component not found.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		data[componentIndex] = { ...data[componentIndex], ...body };
		return new Response(JSON.stringify(data[componentIndex]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();
		if (!id) {
			return new Response(JSON.stringify({ error: 'Id is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const componentIndex = data.findIndex(c => c.id === id);

		if (componentIndex === -1) {
			return new Response(JSON.stringify({ error: 'Component not found.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		data = data.filter(c => c.id !== id);

		return new Response(JSON.stringify({ message: 'Component deleted successfully.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}