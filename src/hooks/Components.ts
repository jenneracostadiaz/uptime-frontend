import type { Check, Component, System, UptimeEvent } from '@/type/System';
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

interface useUptimeEventsTableDataProps {
    uptimeEvents?: UptimeEvent[];
    checks?: Check[];
    components?: Component[];
    systems?: System[];
}

export function useUptimeEventsTableData({ uptimeEvents, checks, components, systems }: useUptimeEventsTableDataProps) {
    return useMemo(() => {
        if (!uptimeEvents || !systems) return [];
        return uptimeEvents.map((event: UptimeEvent) => {
            const check = checks?.find(c => c.id === event.uptimeCheckId);
            const system = systems?.find(s => s.id === check?.serviceSystemId);
            const component = components?.find(c => c.id === check?.componentId);
            return {
                ...event,
                checkName: check ? check.name : 'Unknown Check',
                systemName: system ? system.name : 'Unknown System',
                componentName: component ? component.name : 'Unknown Component',
            };
        });
    }, [uptimeEvents, checks, components, systems]);
}
