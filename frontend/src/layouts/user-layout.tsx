import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile';
import type { UserLayoutTab, UserPageTheme } from '@/lib/types/data.types';
import React from 'react';
import UserMobileLayout from './user-mobile-layout';




interface UserLayoutProps{
    children : React.ReactNode,
    tabs : UserLayoutTab[],
    theme : UserPageTheme,
}
const UserLayout = ({children, tabs, theme} : UserLayoutProps) => {
    const isMobile = useIsMobile();

    if(isMobile){
        return (
            <UserMobileLayout
                tabs = {tabs}
                theme = {theme}
            >
                {children}
            </UserMobileLayout>
        )
    }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar tabs = {tabs} theme = {theme} variant="inset" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default UserLayout