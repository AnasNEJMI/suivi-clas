const SeancesTabSkeleton = () => {
  return (
    <div className="font-outfit space-y-6">
      {/* En-tête de section simulé */}
      <div className="space-y-1.5">
        <div className="h-6 w-56 bg-slate-200/80 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-slate-100 rounded-md animate-pulse" />
      </div>

      {/* Grille de statistiques des séances */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl p-5 bg-white border border-slate-200/80 shadow-2xs space-y-3 flex flex-col items-center justify-center">
            <div className="size-10 rounded-xl bg-slate-200/80 animate-pulse" />
            <div className="h-7 w-12 bg-slate-200/80 rounded-md animate-pulse" />
            <div className="h-3.5 w-24 bg-slate-100 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* Groupes de séances */}
      <div className="bg-slate-50/60 border border-slate-200/70 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-slate-200/80 animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-40 bg-slate-200/80 rounded-md animate-pulse" />
              <div className="h-3 w-24 bg-slate-100 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-20 bg-slate-200/60 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[1, 2, 3].map((card) => (
            <div key={card} className="h-36 rounded-2xl bg-white border border-slate-200/80 p-4 space-y-3">
              <div className="h-4 w-28 bg-slate-200/80 rounded-md animate-pulse" />
              <div className="h-3 w-full bg-slate-100 rounded-md animate-pulse" />
              <div className="h-8 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeancesTabSkeleton