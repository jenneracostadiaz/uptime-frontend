import { ComponentProvider } from '@/app/(dashboard)/components/components/ComponentProvider';
import HeaderComponents from '@/app/(dashboard)/components/components/HeaderComponents';

export default function ComponentPage() {
    return (
        <>
            <HeaderComponents />
            <ComponentProvider />
        </>
    );
}
