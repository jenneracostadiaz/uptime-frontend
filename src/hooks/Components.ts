import type { Check, Component, System } from '@/type/System';
import { useMemo } from 'react';

interface useComponentsTableDataProps {
    components?: Component[];
    systems?: System[];
}

export function useComponentsTableData({ components, systems }: useComponentsTableDataProps) {
    return useMemo(() => {
        if (!components || !systems) return [];
        return components.map(component => {
            const system = systems.find(s => s.id === component.serviceSystemId);
            return {
                ...component,
                systemName: system ? system.name : 'Unlinked',
            };
        });
    }, [components, systems]);
}

interface useChecksTableDataProps {
    checks?: Check[];
    components?: Component[];
    systems?: System[];
}

export function useChecksTableData({ checks, components, systems }: useChecksTableDataProps) {
    return useMemo(() => {
        if (!checks || !components || !systems) return [];
        return checks.map((check: Check) => {
            const component = components.find(c => c.id === check.componentId);
            const system = systems.find(s => s.id === check.serviceSystemId);
            return {
                ...check,
                systemName: system?.name ?? '',
                componentName: component?.name ?? '',
            };
        });
    }, [checks, components, systems]);
}

export function useUptimeEventsTableData({ uptimeEvents, checks, components, systems }) {
    return useMemo(() => {
        if (!uptimeEvents || !systems) return [];
        return uptimeEvents.map(event => {
            const check = checks?.find(c => c.id === event.uptimeCheckId);
            const component = components?.find(c => c.id === event.componentId);
            const system = systems?.find(s => s.id === event.serviceSystemId);
            return {
                ...event,
                checkName: check ? check.name : 'Unknown Check',
                componentName: component ? component.name : 'Unknown Component',
                systemName: system ? system.name : 'Unknown System',
            };
        });
    }, [uptimeEvents, systems]);
}
