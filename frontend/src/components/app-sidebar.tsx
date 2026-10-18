import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import {
  LogOutIcon,
  Loader2Icon,
  SparklesIcon,
  MailPenIcon,
  PhoneCallIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth/use-auth'
import { ApiError } from '@/lib/errors/apiError.class'
import { cn } from '@/lib/utils'
import type { UserLayoutTab, UserPageTheme} from '@/lib/types/data.types'
import type { User } from '@/api/auth'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tabs: UserLayoutTab[]
  theme: UserPageTheme
}

/**
 * Génère le titre (Prénom Nom) et les informations secondaires
 * selon le type d'utilisateur (Étudiant, Animateur, Membre d'association).
 */
function getUserCardDetails(user: User) {
  const name = `${user.firstName} ${user.lastName}`
  const userTypeStr = String(user.userType).toUpperCase()

  // 1. Animateur / Animatrice
  if (userTypeStr.includes('ANIMAT')) {
    const roleTitle = user.gender === 'f' ? 'Animatrice' : 'Animateur'
    return {
      name,
      subtitle: roleTitle,
    }
  }

  // 2. Membre d'association
  if (userTypeStr.includes('ASSOC')) {
    return {
      name,
      subtitle: user.association?.label || 'Membre Association',
    }
  }

  // 3. Étudiant (ou par défaut)
  const studentDetails = [user.association?.label, user.level?.label]
    .filter(Boolean)
    .join(' • ')

  return {
    name,
    subtitle: studentDetails || 'Étudiant',
  }
}

export function AppSidebar({ tabs, theme, ...props }: AppSidebarProps) {
  const { user, requestLogout } = useAuth()
  const [isRequestingLogout, setIsRequestingLogout] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function onLogout() {
    setIsRequestingLogout(true)
    try {
      await requestLogout()
    } catch (error) {
      if (ApiError.isUnauthorized(error)) {
        navigate('/', { replace: true })
      }
    } finally {
      setIsRequestingLogout(false)
    }
  }

  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U'

  const userDetails = user ? getUserCardDetails(user) : null

  return (
    <Sidebar
      collapsible="offcanvas"
      className="font-outfit border-r border-zinc-200/80 bg-white"
      {...props}
    >
      {/* EN-TÊTE DE MARQUE */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-100/80 border border-zinc-200/60">
          <div className="size-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            CPC
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm tracking-tight text-zinc-900 truncate">
                Mon Suivi Scolaire
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                PRO
              </span>
            </div>
            <span className="text-xs font-medium text-zinc-500 truncate">
              Espace Moteur
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* NAVIGATION DES ONGLETS */}
      <SidebarContent className="px-3 py-2 space-y-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Menu principal
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            {tabs.map((tab, index) => {
              const isActive = location.pathname === tab.url

              return (
                <SidebarMenuItem key={tab.url || index}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="relative group h-11 w-full flex items-center gap-3 px-3.5 py-2 rounded-xl transition-transform duration-150 active:scale-95 select-none bg-transparent hover:bg-transparent"
                  >
                    <Link to={tab.url}>
                      {/* Pilule d'arrière-plan animée */}
                      <div
                        className={cn(
                          'absolute inset-0 rounded-xl transition-all duration-200 ease-out transform',
                          isActive
                            ? cn(
                                'scale-100 opacity-100',
                                theme.tabBgSelected || 'bg-indigo-100',
                                theme.tabBorderSelected
                              )
                            : cn(
                                'scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100',
                                theme.tabBorderHovered
                              )
                        )}
                      />

                      {/* Icône */}
                      <tab.icon
                        className={cn(
                          'relative z-10 size-5 shrink-0 transition-transform duration-200',
                          isActive
                            ? theme.tabTextSelected || 'text-indigo-600'
                            : cn('text-zinc-500 group-hover:text-zinc-800', theme.tabTextHovered)
                        )}
                      />

                      {/* Libellé */}
                      <span
                        className={cn(
                          'relative z-10 text-base tracking-tight transition-colors duration-200',
                          isActive
                            ? cn('font-bold', theme.tabTextSelected || 'text-indigo-600')
                            : cn('font-medium text-zinc-500 group-hover:text-zinc-800', theme.tabTextHovered)
                        )}
                      >
                        {tab.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="bg-zinc-200/60" />

        {/* CARTE D'AIDE */}
        <div className="p-3.5 rounded-2xl bg-linear-to-br from-indigo-50/80 via-zinc-50 to-indigo-50/40 border border-indigo-100 space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
            <SparklesIcon className="size-4 shrink-0" />
            <span>Besoin d'aide ?</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Contacter <strong>Anas</strong> pour plus de renseignement.
          </p>
          <div className='flex flex-col'>
            <a
              href="mailto:anasnejmi@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline pt-1"
            >
              <MailPenIcon className="size-3.5" />
              <span>Envoyer un e-mail</span>
            </a>
            <a
              href="tel:0780126077"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline pt-1"
            >
              <PhoneCallIcon className="size-3.5" />
              <span>Envoyer un SMS</span>
            </a>
          </div>
        </div>
      </SidebarContent>

      {/* PIED DE PAGE : CARTE UTILISATEUR & BOUTON DÉCONNEXION */}
      <SidebarFooter className="p-3 space-y-2 border-t border-zinc-100">
        {user && userDetails && (
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
            <div className="size-9 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-zinc-800 truncate capitalize">
                {userDetails.name}
              </span>
              <span className="text-[11px] font-medium text-zinc-500 truncate">
                {userDetails.subtitle}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={isRequestingLogout}
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/60 hover:bg-rose-100/80 border border-rose-200/60 transition-transform duration-150 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isRequestingLogout ? (
            <>
              <Loader2Icon className="size-4 animate-spin text-rose-600" />
              <span>Déconnexion...</span>
            </>
          ) : (
            <>
              <LogOutIcon className="size-4" />
              <span>Se déconnecter</span>
            </>
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}