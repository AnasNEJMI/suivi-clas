import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon, RotateCcwIcon } from 'lucide-react'

const SectionError = () => {
  return (
    <div className="font-outfit w-full flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg rounded-3xl border border-rose-200/80 bg-white shadow-lg shadow-rose-500/5 p-6 sm:p-8 text-center space-y-4">
        {/* Icône d'erreur stylisée */}
        <div className="mx-auto size-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-2xs">
          <AlertCircleIcon className="size-7" />
        </div>

        {/* Message explicatif */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Impossible de charger les données
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">
            Une erreur est survenue lors de la récupération des informations. Veuillez réessayer ou actualiser la page.
          </p>
        </div>

        {/* Bouton d'action de secours */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-10 px-4 rounded-xl font-bold text-xs sm:text-sm border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 gap-2 cursor-pointer shadow-2xs transition-colors"
          >
            <RotateCcwIcon className="size-4 text-slate-500" />
            <span>Actualiser la page</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SectionError