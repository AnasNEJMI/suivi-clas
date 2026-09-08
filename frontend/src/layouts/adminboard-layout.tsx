import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { UserPageTheme } from '@/lib/types/data.types';
import { BicepsFlexedIcon, BookOpenIcon, NotebookTextIcon, User2Icon, UserIcon } from 'lucide-react';
import React from 'react'

interface AdminboardLayoutProps{
    children : React.ReactNode
}

const ROOT_PATH = '/etudiant';

const PAGE_TABS = [
    {
      title: "Acceuil",
      url: "/animateur",
      icon: UserIcon,
    } , 
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
      title: "Profile",
      url: `${ROOT_PATH}/profile`,
      icon: User2Icon,
    }
]

const PAGE_THEME : UserPageTheme = {
    tabBorderHovered : 'border-zinc-300',
    tabBorderSelected : 'border-zinc-900',
    tabBgHovered : 'bg-zinc-200',
    tabBgSelected : 'bg-zinc-900',
    tabTextHovered : 'text-zinc-900',
    tabTextSelected : 'text-white',
}

const AdminboardLayout = ({children} : AdminboardLayoutProps) => {
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar tabs={PAGE_TABS} theme={PAGE_THEME} variant="inset" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminboardLayout