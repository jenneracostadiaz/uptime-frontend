import type { System } from '@/type/System';

let data: System[] = [
    {
        id: 1,
        name: 'System Status',
        description: 'Check the current status of the system.',
        status: true,
    },
    {
        id: 2,
        name: 'System Logs',
        description: 'View the logs for system activities.',
        status: true,
    },
    {
        id: 3,
        name: 'System Settings',
        description: 'Configure system settings and preferences.',
        status: true,
    },
    {
        id: 4,
        name: 'User Management',
        description: 'Manage user accounts and permissions.',
        status: true,
    },
    {
        id: 5,
        name: 'Backup and Restore',
        description: 'Create backups and restore system data.',
        status: false,
    },
    {
        id: 6,
        name: 'System Updates',
        description: 'Check for and apply system updates.',
        status: true,
    },
    {
        id: 7,
        name: 'Performance Monitoring',
        description: 'Monitor system performance metrics.',
        status: false,
    },
    {
        id: 8,
        name: 'Security Settings',
        description: 'Configure security settings for the system.',
        status: true,
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
        if (!body.name || !body.description) {
            return new Response(JSON.stringify({ error: 'Name and description are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        // Generate a new id (find max id and add 1)
        const newId = data.length > 0 ? Math.max(...data.map(s => s.id)) + 1 : 1;
        const newSystem = {
            id: newId,
            name: body.name,
            description: body.description,
            status: true,
        };
        data.push(newSystem);
        return new Response(JSON.stringify(newSystem), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
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
        if (!body.id || !body.name || !body.description) {
            return new Response(JSON.stringify({ error: 'Id, name and description are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const systemIndex = data.findIndex(s => s.id === body.id);
        if (systemIndex === -1) {
            return new Response(JSON.stringify({ error: 'System not found.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const updatedSystem = { ...data[systemIndex], name: body.name, description: body.description };
        data[systemIndex] = updatedSystem;

        return new Response(JSON.stringify(updatedSystem), {
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

        const systemIndex = data.findIndex(s => s.id === id);

        if (systemIndex === -1) {
            return new Response(JSON.stringify({ error: 'System not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        data = data.filter(s => s.id !== id);

        return new Response(JSON.stringify({ message: 'System deleted successfully' }), {
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
