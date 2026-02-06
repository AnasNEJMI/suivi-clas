import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useNavigate } from "react-router"
import { BicepsFlexedIcon, BookOpenIcon, ChartNoAxesCombinedIcon, DownloadIcon, NotebookTextIcon, UserIcon,} from "lucide-react"
import { Separator } from "./ui/separator"
import { useAuth } from "@/contexts/auth/use-auth"
import { Button } from "./ui/button"
import { IconLogout } from "@tabler/icons-react"
import { ApiError } from "@/lib/errors/apiError.class"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: UserIcon,
    },
    {
      title: "Bilans",
      url: "/admin/bilans",
      icon: NotebookTextIcon,
    },
    {
      title: "Compétences",
      url: "/admin/skills",
      icon: BicepsFlexedIcon,
    },
    {
      title: "Sujets",
      url: "/admin/lessons",
      icon: BookOpenIcon,
    },
  ],
  analytics: [
    {
      title: "Statistiques",
      url: "/admin/statistics",
      icon: ChartNoAxesCombinedIcon,
    },
    {
      title: "Téléchargements",
      url: "/admin/downloads",
      icon: DownloadIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {requestLogout} = useAuth();
  const [isRequestingLoggingOut, setIsRequestingLoggingOut] = React.useState(false);
  const navigate = useNavigate();

  async function onLogout(){
    setIsRequestingLoggingOut(true);
    try{
      await requestLogout();
    }catch(error){
      if(ApiError.isUnauthorized(error)){
          navigate('/', {replace : true})
      }
    }finally{
      setIsRequestingLoggingOut(false);
    }
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="p-0 bg-lime-200 hover:bg-lime-100"
            >
              <Link to="/" className="h-16 w-min p-0 ">
                <div className="w-16 h-16"></div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator className="my-4"/>
      <SidebarContent>
        <NavMain title="Suivi" items={data.navMain} />
        <Separator className="my-4"/>
        <NavMain title="Statistiques" items={data.analytics}/>
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <Button className="w-full" disabled = {isRequestingLoggingOut} onClick={onLogout}>
          <IconLogout className="text-background"/>
          {isRequestingLoggingOut ? 'Logging out ...' : 'Log out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
