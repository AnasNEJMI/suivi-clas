import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { LucideProps } from "lucide-react"

export function NavMain({
  items,
  title,
}: {
  title : string,
  items: {
    title: string
    url: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <span className="font-bold text-xs uppercase opacity-50">{title}</span>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild className="h-10">
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
