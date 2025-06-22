import { HeaderUptimeEvent } from '@/app/(dashboard)/uptime-event/components/HeaderUptimeEvent';
import { UptimeEventProvider } from '@/app/(dashboard)/uptime-event/components/UptimeEventProvider';

export default function uptimeEventPage() {
    return (
        <>
            <HeaderUptimeEvent />
            <UptimeEventProvider />
        </>
    );
}
