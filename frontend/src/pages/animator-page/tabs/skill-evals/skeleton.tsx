const AnimSkillEvalsTabSkeleton = () => {
  return (
    <div className="font-outfit space-y-6">
      {/* En-tête de section simulé */}
      <div className="space-y-1.5">
        <div className="h-6 w-64 bg-slate-200/80 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-slate-100 rounded-md animate-pulse" />
      </div>

      {/* Bloc de statistiques simulé (Stats Card) */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="size-9 rounded-xl bg-slate-200/80 animate-pulse shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-12 bg-slate-200/60 rounded-xs animate-pulse" />
                <div className="h-5 w-8 bg-slate-200/80 rounded-xs animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full w-full animate-pulse mt-2" />
      </div>

      {/* Liste des groupes / carrousels simulés */}
      {[1, 2].map((group) => (
        <div key={group} className="bg-slate-50/60 border border-slate-200/70 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-slate-200/80 animate-pulse" />
              <div className="space-y-1">
                <div className="h-4 w-36 bg-slate-200/80 rounded-md animate-pulse" />
                <div className="h-3 w-24 bg-slate-100 rounded-md animate-pulse" />
              </div>
            </div>
            <div className="h-6 w-16 bg-slate-200/60 rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[1, 2, 3].map((card) => (
              <div key={card} className="h-32 rounded-2xl bg-white border border-slate-200/80 p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-slate-200/80 animate-pulse" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3.5 w-24 bg-slate-200/80 rounded-md animate-pulse" />
                    <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse" />
                  </div>
                </div>
                <div className="h-7 w-full bg-slate-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnimSkillEvalsTabSkeleton