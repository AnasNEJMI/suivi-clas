import type { User } from '@/api/auth'
import { Card } from '@/components/ui/card'
import { AtSignIcon, CalendarIcon, ShieldCheckIcon } from 'lucide-react'

interface AnimProfileCardProps {
  animator: User
}

const AnimProfileCard = ({ animator }: AnimProfileCardProps) => {
  const firstName = animator.firstName || ''
  const lastName = animator.lastName || ''
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  const roleLabel = animator.gender === 'f' ? 'Animatrice' : 'Animateur'

  const formattedDate = animator.createdAt
    ? new Date(animator.createdAt).toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Card className="relative overflow-hidden border-slate-200/80 p-6 lg:p-7 rounded-3xl shadow-xs bg-linear-to-r from-indigo-50/40 via-purple-50/30 to-sky-50/40 bg-size-[200%_200%] animate-[gradient-shift_12s_ease_infinite]">
      {/* MOTIF SUBTIL D'ARRIÈRE-PLAN (Dot Pattern SVG/CSS) */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#6366f1 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* Avatar carré-arrondi avec bordure */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-2xl bg-linear-to-tr from-indigo-600 via-purple-600 to-indigo-400 text-white flex items-center justify-center font-extrabold text-2xl lg:text-3xl shadow-md border-4 border-white">
            {initials}
          </div>
        </div>

        {/* Informations Animateur */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-indigo-700 border border-indigo-200/80 text-xs font-bold shadow-2xs">
              <ShieldCheckIcon className="size-3.5 text-indigo-600" />
              Compte {roleLabel}
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            <span className="capitalize">{firstName}</span>{' '}
            <span className="uppercase">{lastName}</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs lg:text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-slate-200/80 px-3 py-1 rounded-xl shadow-2xs">
              <AtSignIcon className="size-4 text-indigo-500" />
              {animator.username}
            </span>
            {formattedDate && (
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-slate-200/80 px-3 py-1 rounded-xl shadow-2xs">
                <CalendarIcon className="size-4 text-emerald-500" />
                Membre depuis {formattedDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AnimProfileCard