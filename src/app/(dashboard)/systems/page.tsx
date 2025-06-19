import HeaderSystems from '@/app/(dashboard)/systems/components/HeaderSystems';
import { SystemProvider } from '@/app/(dashboard)/systems/components/SystemProvider';

export default async function SystemsPage() {

    return (
        <>
            <HeaderSystems />
            <SystemProvider />
        </>
    );
}
