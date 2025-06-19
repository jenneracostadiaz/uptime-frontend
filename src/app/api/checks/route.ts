import type {UptimeCheck} from "@/type/System";

let data: UptimeCheck[] = [
	{
		id: 1,
		name: 'User Authentication Check',
		serviceSystemId: 1,
		componentId: 1,
		checkUrl: 'https://example.com/auth/status',
		checkInterval: 5,
		checkTimeout: 2,
		requestHeaders: '{"Authorization": "Bearer token"}',
		downAlertDelay: 10,
		downAlertResend: 30,
		downAlertMessage: 'User Authentication service is down!',
		alertEmail: 'dev@enner.pe'
	},
	{
		id: 2,
		name: 'Data Processing Check',
		serviceSystemId: 1,
		componentId: 2,
		checkUrl: 'https://example.com/data/status',
		checkInterval: 5,
		checkTimeout: 2,
		requestHeaders: '{"Authorization": "Bearer token"}',
		downAlertDelay: 10,
		downAlertResend: 30,
		downAlertMessage: 'Data Processing service is down!',
		alertEmail: 'dev@enner.pe'
	},
	{
		id: 3,
		name: 'Notification Service Check',
		serviceSystemId: 2,
		componentId: 3,
		checkUrl: 'https://example.com/notification/status',
		checkInterval: 5,
		checkTimeout: 2,
		requestHeaders: '{"Authorization": "Bearer token"}',
		downAlertDelay: 10,
		downAlertResend: 30,
		downAlertMessage: 'Notification Service is down!',
		alertEmail: 'dev@enner.pe'
	},
	{
		id: 4,
		name: 'Payment Gateway Check',
		serviceSystemId: 2,
		componentId: 4,
		checkUrl: 'https://example.com/payment/status',
		checkInterval: 5,
		checkTimeout: 2,
		requestHeaders: '{"Authorization": "Bearer token"}',
		downAlertDelay: 10,
		downAlertResend: 30,
		downAlertMessage: 'Payment Gateway is down!',
		alertEmail: 'dev@enner.pe'
	}
]

export async function GET() {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0'
		}
	});
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		if (!body.name || !body.serviceSystemId || !body.componentId || !body.checkUrl) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
		const newCheck: UptimeCheck = {
			id: newId,
			name: body.name,
			serviceSystemId: body.serviceSystemId,
			componentId: body.componentId,
			checkUrl: body.checkUrl,
			checkInterval: body.checkInterval || 5,
			checkTimeout: body.checkTimeout || 2,
			requestHeaders: body.requestHeaders || '{}',
			downAlertDelay: body.downAlertDelay || 10,
			downAlertResend: body.downAlertResend || 30,
			downAlertMessage: body.downAlertMessage || 'Service is down!',
			alertEmail: body.alertEmail || 'dev@jenner.pe'
		}
		data.push(newCheck);
		return new Response(JSON.stringify(newCheck), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});

	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		if (!body.id || !body.name || !body.serviceSystemId || !body.componentId || !body.checkUrl) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const checkIndex = data.findIndex(c => c.id === body.id);
		if (checkIndex === -1) {
			return new Response(JSON.stringify({ error: 'Check not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		data[checkIndex] = { ...data[checkIndex], ...body };
		return new Response(JSON.stringify(data[checkIndex]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});

	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();
		if (!id) {
			return new Response(JSON.stringify({ error: 'Id is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const checkIndex = data.findIndex(c => c.id === id);
		if (checkIndex === -1) {
			return new Response(JSON.stringify({ error: 'Check not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		data = data.filter(c => c.id !== id);

		return new Response(JSON.stringify({ message: 'Check deleted successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});

	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}