import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList, BreadcrumbPage,
	Separator,
	SidebarTrigger
} from "@/components/ui";
import {ModeToggle} from "@/components/ModeToggle";

export const Header = () => {
	return (
		<header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex-1 flex items-center gap-2">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Uptime</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center gap-2">
				<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
				<ModeToggle />
			</div>
		</header>
	)
}