import { Checks_API_URL, Components_API_URL, Systems_API_URL, UptimeEvents_API_URL } from '@/conts/conts';
import type { Check, Component, System } from '@/type/System';

export const useFetchSystems = async (): Promise<System[]> => {
    const response = await fetch(Systems_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch systems');
    }
    return response.json();
};

export const useFetchComponents = async (): Promise<Component[]> => {
    const response = await fetch(Components_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch components');
    }
    return response.json();
};

export const useFetchComponentBySystemId = async (systemId: string): Promise<Component[]> => {
    const response = await fetch(`${Components_API_URL}/by-service-system/${systemId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch components for system');
    }
    return response.json();
};

export const useFetchChecks = async (): Promise<Check[]> => {
    const response = await fetch(Checks_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch checks');
    }
    return response.json();
};

export const useFetchUptimeEvents = async (filters: Record<string, string | number>): Promise<unknown[]> => {
    const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).map(([k, v]) => [k, String(v)]))
    ).toString();
    const response = await fetch(`${UptimeEvents_API_URL}?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch uptime events');
    }
    return response.json();
};
