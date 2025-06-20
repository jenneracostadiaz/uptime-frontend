import { HeaderCheckMonitor } from '@/app/(dashboard)/check-monitor/components/HeaderCheckMonitor';
import { MonitorProvider } from '@/app/(dashboard)/check-monitor/components/MonitorProvider';

export default function checkMonitorPage() {
    return (
        <>
            <HeaderCheckMonitor />
            <MonitorProvider />
        </>
    );
}
