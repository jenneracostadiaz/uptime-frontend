import type {Component, System, UptimeCheck} from '@/type/System';
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

interface useChecksTableDataProps {
    checks?: UptimeCheck[];
    components?: Component[];
    systems?: System[];
}

export function useChecksTableData({ checks, components, systems }: useChecksTableDataProps) {
    return useMemo(() => {
        if (!checks || !components || !systems) return [];
        return checks.map((check: UptimeCheck) => {
            const component = components.find(c => c.id === check.componentId);
            const system = systems.find(s => s.id === (component ? component.systemId : null));
            return {
                ...check,
                systemName: system ? system.name : 'Unlinked',
                componentName: component ? component.name : 'Unlinked',
            };
        });
    }, [checks, components, systems]);
}