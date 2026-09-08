import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {useNavigate } from "react-router"
import {LogOutIcon} from "lucide-react"
import { Separator } from "./ui/separator"
import { useAuth } from "@/contexts/auth/use-auth"
import { ApiError } from "@/lib/errors/apiError.class"
import { BrandButton } from "./brand-button"
import { useState } from "react"
import type { UserLayoutTab, UserPageTheme } from "@/lib/types/data.types"

// const data = {
//   welcome : [
//     {
//       title: "Acceuil",
//       url: "/animateur",
//       icon: UserIcon,
//     } 
//   ],
//   navMain: [
//     {
//       title: "Bilans",
//       url: "/animateur/bilans",
//       icon: NotebookTextIcon,
//     },
//     {
//       title: "Compétences",
//       url: "/animateur/evaluation-competences",
//       icon: BicepsFlexedIcon,
//     },
//     {
//       title: "Évaluation de leçons",
//       url: "/animateur/evaluation-lecons",
//       icon: BookOpenIcon,
//     },
//     {
//       title: "Qcms",
//       url: "/animateur/qcms",
//       icon: CircleQuestionMarkIcon,
//     },
//     {
//       title: "Profile",
//       url: `${ROOT_PATH}/profile`,
//       icon: User2Icon,
//     }
//   ],
//   usefulLinks: [
//     {
//       title: "Liens utiles",
//       url: "/animateur/liens-utiles",
//       icon: ChartNoAxesCombinedIcon,
//     },
//     {
//       title: "Téléchargements",
//       url: "/animateur/liens-telechargements",
//       icon: DownloadIcon,
//     },
//   ],
// }

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar>{
  tabs : UserLayoutTab[],
  theme : UserPageTheme,
}

export function AppSidebar({tabs,theme, ...props }: AppSidebarProps) {
  const {requestLogout} = useAuth();
  const [isRequestingLoggingOut, setIsRequestingLoggingOut] = useState(false);
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
        <div className="w-full font-outfit flex items-stretch justify-start gap-2">
          <div className="w-10 h-10 rounded-md bg-zinc-900 flex items-center font-bold text-sm justify-center text-white">CPC</div>
          <div className="flex flex-col justify-between">
            <span className="font-medium tracking-tight leading-4">CoursParcours</span>
            <span className="text-sm tracking-tight">Mon espace étudiant</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
      <Separator className="my-4"/>
        <NavMain title="" items={tabs} theme = {theme}/>
        {/* <Separator className="my-4"/>
        <NavMain title="Soumettre" items={data.navMain} /> */}
        {/* <Separator className="my-4"/> */}
        {/* <NavMain title="Supports" items={data.usefulLinks}/> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <BrandButton variant={'destructive'} className="w-full" disabled = {isRequestingLoggingOut} onClick={onLogout}>
          <LogOutIcon className="text-background"/>
          {isRequestingLoggingOut ? 'Déconnexion ...' : 'Se déconnecter'}
        </BrandButton>
      </SidebarFooter>
    </Sidebar>
  )
}
