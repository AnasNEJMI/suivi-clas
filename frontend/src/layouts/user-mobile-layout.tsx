import { Separator } from '@/components/ui/separator'
import type { UserLayoutTab, UserPageTheme } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation } from 'react-router'

interface UserMobileLayoutProps {
  children: React.ReactNode
  tabs: UserLayoutTab[]
  theme: UserPageTheme
}

const UserMobileLayout = ({ children, tabs, theme }: UserMobileLayoutProps) => {
  const location = useLocation()

  return (
    <main className="relative pb-24 font-outfit p-2 bg-white min-h-screen">
      <div className="rounded-2xl bg-zinc-100 min-h-[calc(100dvh-6.5rem)] w-full p-4 shadow-xs">
        {children}
      </div>

      <nav className="fixed w-full bottom-0 left-0 bg-white/90 backdrop-blur-md z-50 pb-safe">
        <Separator className="bg-zinc-200/60" />
        <ul className="flex items-center justify-around h-18 px-2 max-w-md mx-auto">
          {tabs.map((tab, index) => {
            const isActive = location.pathname === tab.url

            return (
              <li key={tab.url || index} className="flex-1 max-w-20">
                <Link
                  to={tab.url}
                  className="group flex flex-col items-center justify-center py-1 rounded-xl transition-transform duration-150 active:scale-90 select-none"
                >
                  {/* Container de l'icône + Pilule interactive */}
                  <div className="relative flex items-center justify-center w-14 h-8 my-0.5">
                    {/* Pilule (Active & Hover en CSS pur) */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-full transition-all duration-200 ease-out transform',
                        isActive
                          ? cn('scale-100 opacity-100', theme.tabBgSelected || 'bg-indigo-100')
                          : 'scale-75 opacity-0 bg-zinc-100/80 group-hover:opacity-100 group-hover:scale-100'
                      )}
                    />

                    {/* Icône */}
                    <tab.icon
                      className={cn(
                        'relative z-10 size-5 transition-transform duration-200 group-hover:scale-105',
                        isActive
                          ? theme.tabTextSelected || 'text-indigo-600'
                          : 'text-zinc-500 group-hover:text-zinc-800'
                      )}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      'text-[11px] tracking-tight transition-colors duration-200 mt-0.5',
                      isActive
                        ? cn('font-bold text-zinc-900-600')
                        : 'font-medium text-zinc-500 group-hover:text-zinc-800'
                    )}
                  >
                    {tab.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </main>
  )
}

export default UserMobileLayout