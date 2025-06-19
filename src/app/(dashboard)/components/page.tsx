import HeaderComponents from "@/app/(dashboard)/components/components/HeaderComponents";
import {ComponentProvider} from "@/app/(dashboard)/components/components/ComponentProvider";

export default function ComponentPage() {
    return (
        <>
            <HeaderComponents />
            <ComponentProvider />
        </>
    );
}
