import {Clock, LaptopMinimal, LucideLayoutDashboard, Monitor, Package2, Settings, Terminal} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui';

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
            title: 'Reports',
            icon: LaptopMinimal,
            children: [
                {
                    title: 'Uptime Event',
                    url: '/uptime-event',
                    icon: Clock,
                },
            ],
        },
        {
            title: 'Settings',
            icon: Settings,
            children: [
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
                    icon: Monitor,
                },
            ],
        },
    ];

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
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
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) =>
                                item.children ? (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton>
                                            <div className="flex items-center gap-2">
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </div>
                                        </SidebarMenuButton>
                                        <SidebarMenu>
                                            {item.children.map((child) => (
                                                <SidebarMenuItem key={child.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={child.url}>
                                                            <div className="flex items-center gap-2 ml-4">
                                                                <child.icon className="size-4" />
                                                                <span className="text-xs">{child.title}</span>
                                                            </div>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarMenuItem>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="size-4" />
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
