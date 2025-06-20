import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</SidebarInset>
        </SidebarProvider>
    );
}
