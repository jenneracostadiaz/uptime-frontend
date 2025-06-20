import type { Check, Component, System } from '@/type/System';

export const useFetchComponents = async (): Promise<Component[]> => {
    const response = await fetch('/api/components');
    if (!response.ok) {
        throw new Error('Failed to fetch components');
    }
    return response.json();
};

export const useFetchComponentBySystemId = async (systemId: string): Promise<Component[]> => {
    const response = await fetch(`/api/components?systemId=${systemId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch components for system');
    }
    return response.json();
}

export const useFetchSystems = async (): Promise<System[]> => {
    const response = await fetch('/api/systems');
    if (!response.ok) {
        throw new Error('Failed to fetch systems');
    }
    return response.json();
};

export const useFetchChecks = async (): Promise<Check[]> => {
    const response = await fetch('/api/checks');
    if (!response.ok) {
        throw new Error('Failed to fetch checks');
    }
    return response.json();
};
