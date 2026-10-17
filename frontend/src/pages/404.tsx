import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeftIcon, HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="font-outfit relative min-h-dvh w-full flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* Halos lumineux animés très subtils en arrière-plan */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 bg-lime-300/20 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none animate-pulse duration-700" />

      {/* Motif de points (Dot Pattern) conservé et adouci */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#65a30d 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
        }}
      />

      {/* Carte d'erreur principale aux teintes lime/émeraude */}
      <Card className="relative z-10 w-full max-w-lg rounded-3xl border border-lime-200/60 bg-white/90 backdrop-blur-xl shadow-xl shadow-lime-950/5 p-6 sm:p-10 text-center space-y-6">
        
        {/* En-tête avec badge d'erreur */}
        <div className="space-y-3">

          <h1 className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 via-emerald-600 to-lime-500 tracking-tight">
            404
          </h1>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Page introuvable
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée vers une autre adresse.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto h-11 px-5 rounded-2xl font-bold text-xs sm:text-sm border-slate-200 bg-white hover:bg-lime-50/60 hover:text-lime-900 text-slate-700 gap-2 cursor-pointer shadow-2xs transition-all duration-200"
          >
            <ArrowLeftIcon className="size-4 text-slate-500" />
            <span>Page précédente</span>
          </Button>

          <Button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto h-11 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-md shadow-lime-500/20 hover:shadow-lime-500/35 border-t border-white/20 gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <HomeIcon className="size-4" />
            <span>Retour à l'accueil</span>
          </Button>
        </div>

      </Card>
    </div>
  )
}

export default NotFoundPage