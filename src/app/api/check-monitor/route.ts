import type {UptimeCheck} from "@/type/System";

const data: UptimeCheck[] = [
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