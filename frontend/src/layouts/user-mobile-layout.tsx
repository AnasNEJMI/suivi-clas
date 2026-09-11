import { Separator } from '@/components/ui/separator'
import type { UserLayoutTab, UserPageTheme } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation } from 'react-router'

interface UserMobileLayoutProps{
    children : React.ReactNode,
    tabs : UserLayoutTab[],
    theme : UserPageTheme,
}

const UserMobileLayout = ({children, tabs, theme} : UserMobileLayoutProps) => {
    const location = useLocation();
  return (
    <main className='relative pb-22 font-outfit p-2 bg-white'>
        <div className='rounded-lg bg-zinc-100 min-h-[calc(100dvh-6rem)] w-full p-4'>
            {children}
        </div>
        <nav className='fixed w-full bottom-0 left-0 bg-white z-50'>
            <Separator/>
            <ul className='flex items-center justify-evenly h-full'>
                {
                    tabs.map((tab, index)=>(
                        <li key={index} className='py-2 h-20 max-w-18 rounded-md flex-1'>
                            <Link
                                to={tab.url}
                                className={cn('group flex flex-col items-center justify-center gap-1 border-2 p-2 rounded-md transition-all duration-100 ease-out',
                                    location.pathname === tab.url
                                    ?`${theme.tabBgSelected} ${theme.tabBorderSelected} ${theme.tabTextSelected} hover:${theme.tabBgSelected} hover:${theme.tabBorderSelected} hover:${theme.tabTextSelected}`
                                    :`border-transparent bg-transparent hover:bg-zinc-100`
                                )}
                            >  
                                <tab.icon  className={cn('size-6 transition-transform duration-100 ease-out', location.pathname === tab.url && '-translate-y-0.5')}/>
                                <span className={cn('text-xs tracking-tighter', location.pathname === tab.url && '-translate-y-0.5')}>{tab.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </main>
  )
}

export default UserMobileLayout