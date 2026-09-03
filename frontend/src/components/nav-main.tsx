import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation, } from "react-router"
import type { UserLayoutTab, UserPageTheme } from "@/lib/types/data.types"
import { cn } from "@/lib/utils";

export function NavMain({
  items,
  title,
  theme,
}: {
  title : string,
  theme : UserPageTheme,
  items: UserLayoutTab[]
}) {
  const location = useLocation();
  console.log('pathname ',location.pathname);
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <span className="font-bold text-xs uppercase opacity-50">{title}</span>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} 
                asChild 
                className={
                  cn('h-12 px-6 border-2', 
                    location.pathname === item.url 
                    ?`${theme.tabBgSelected} ${theme.tabBorderSelected} ${theme.tabTextSelected} hover:${theme.tabBgSelected} hover:${theme.tabBorderSelected} hover:${theme.tabTextSelected}`
                    :`bg-transparent border-transparent text-zinc-900 hover:bg-zinc-100`)}
              >
                {
                  <Link to={item.url} className="font-medium font-outfit">
                    {item.icon && <item.icon />}
                    <span className="text-base">{item.title}</span>
                  </Link>
                }
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
