import type { Component, System } from '@/type/System';
import { useMemo } from 'react';

interface useComponentsTableDataProps {
    components?: Component[];
    systems?: System[];
}

export function useComponentsTableData({ components, systems }: useComponentsTableDataProps) {
    return useMemo(() => {
        if (!components || !systems) return [];
        return components.map(component => {
            const system = systems.find(s => s.id === component.systemId);
            return {
                ...component,
                systemName: system ? system.name : 'Unlinked',
            };
        });
    }, [components, systems]);
}
