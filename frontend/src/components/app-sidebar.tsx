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
import { BicepsFlexedIcon, BookOpenIcon, ChartNoAxesCombinedIcon, CircleQuestionMarkIcon, DownloadIcon, NotebookTextIcon, UserIcon,} from "lucide-react"
import { Separator } from "./ui/separator"
import { useAuth } from "@/contexts/auth/use-auth"
import { IconLogout } from "@tabler/icons-react"
import { ApiError } from "@/lib/errors/apiError.class"
import { BrandButton } from "./brand-button"

const data = {
  welcome : [
    {
      title: "Acceuil",
      url: "/animateur",
      icon: UserIcon,
    } 
  ],
  navMain: [
    {
      title: "Bilans",
      url: "/animateur/bilans",
      icon: NotebookTextIcon,
    },
    {
      title: "Compétences",
      url: "/animateur/evaluation-competences",
      icon: BicepsFlexedIcon,
    },
    {
      title: "Évaluation de leçons",
      url: "/animateur/evaluation-lecons",
      icon: BookOpenIcon,
    },
    {
      title: "Qcms",
      url: "/animateur/qcms",
      icon: CircleQuestionMarkIcon,
    },
  ],
  usefulLinks: [
    {
      title: "Liens utiles",
      url: "/animateur/liens-utiles",
      icon: ChartNoAxesCombinedIcon,
    },
    {
      title: "Téléchargements",
      url: "/animateur/liens-telechargements",
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
      <SidebarContent>
      <Separator className="mb-4"/>
        <NavMain title="" items={data.welcome} />
        <Separator className="my-4"/>
        <NavMain title="Soumettre" items={data.navMain} />
        {/* <Separator className="my-4"/> */}
        {/* <NavMain title="Supports" items={data.usefulLinks}/> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <BrandButton variant={'destructive'} className="w-full" disabled = {isRequestingLoggingOut} onClick={onLogout}>
          <IconLogout className="text-background"/>
          {isRequestingLoggingOut ? 'Déconnexion ...' : 'Se déconnecter'}
        </BrandButton>
      </SidebarFooter>
    </Sidebar>
  )
}
