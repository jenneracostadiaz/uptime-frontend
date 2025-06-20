import { LaptopMinimal, LucideLayoutDashboard, Package2, Terminal } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui';

import { NavSecondary } from '@/components/sidebar/NavSecondary';
import { NavUser } from '@/components/sidebar/NavUser';
import Link from 'next/link';

export async function AppSidebar() {

    const user = {
        id: 1,
        name: 'Guest',
        email: 'guest@example.com',
    };

    const navItems = [
        {
            title: 'Dashboard',
            url: '/',
            icon: LucideLayoutDashboard,
        },
        {
            title: 'Systems',
            url: '/systems',
            icon: LaptopMinimal,
        },
        {
            title: 'Components',
            url: '/components',
            icon: Package2,
        },
        {
            title: 'Check Monitor',
            url: '/check-monitor',
            icon: Terminal,
        },
    ];

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/public">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Terminal className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Uptime</span>
                                    <span className="truncate text-xs">Real-time monitoring</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavSecondary items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
