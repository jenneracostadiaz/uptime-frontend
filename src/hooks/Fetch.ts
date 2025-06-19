import type { Component, System } from '@/type/System';

export const useFetchComponents = async (): Promise<Component[]> => {
    const response = await fetch('/api/components');
    if (!response.ok) {
        throw new Error('Failed to fetch components');
    }
    return response.json();
};

export const useFetchSystems = async (): Promise<System[]> => {
    const response = await fetch('/api/systems');
    if (!response.ok) {
        throw new Error('Failed to fetch systems');
    }
    return response.json();
};
