import HeaderSystems from '@/app/(dashboard)/systems/components/HeaderSystems';
import { SystemProvider } from '@/app/(dashboard)/systems/components/SystemProvider';

export default function SystemsPage() {
    return (
        <>
            <HeaderSystems />
            <SystemProvider />
        </>
    );
}
