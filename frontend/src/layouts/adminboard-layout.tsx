import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

interface AdminboardLayoutProps{
    children : React.ReactNode
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
      <AppSidebar variant="inset" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminboardLayout