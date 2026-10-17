const UniversalTabSkeleton = () => {
  return (
    <div className="font-outfit space-y-4 sm:space-y-6 my-4 w-full overflow-hidden max-w-full">
      {/* En-tête de section simulé */}
      <div className="space-y-1.5">
        <div className="h-6 sm:h-7 w-48 sm:w-56 bg-slate-200/80 rounded-xl animate-pulse" />
        <div className="h-3.5 sm:h-4 w-64 sm:w-80 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      {/* Grille de cartes métriques simulées */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-2xl p-3.5 sm:p-5 bg-white border border-slate-200/80 shadow-2xs space-y-2 sm:space-y-3 ${
              i === 3 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="size-8 sm:size-10 rounded-xl bg-slate-200/80 animate-pulse" />
            <div className="h-5 sm:h-6 w-14 sm:w-16 bg-slate-200/80 rounded-md animate-pulse" />
            <div className="h-3 w-20 sm:w-24 bg-slate-100 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* Section de contenu principale simulée */}
      <div className="bg-slate-50/60 border border-slate-200/70 rounded-3xl p-3.5 sm:p-5 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="size-8 sm:size-10 rounded-2xl bg-slate-200/80 animate-pulse" />
            <div className="space-y-1">
              <div className="h-3.5 sm:h-4 w-32 sm:w-40 bg-slate-200/80 rounded-md animate-pulse" />
              <div className="h-3 w-20 sm:w-28 bg-slate-100 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="h-5 sm:h-6 w-16 sm:w-20 bg-slate-200/60 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="h-24 sm:h-36 rounded-2xl bg-white border border-slate-200/80 p-3 sm:p-4 space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <div className="size-7 sm:size-8 rounded-xl bg-slate-200/80 animate-pulse" />
                <div className="h-3.5 w-20 sm:w-24 bg-slate-200/80 rounded-md animate-pulse" />
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3 w-4/5 bg-slate-100 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UniversalTabSkeleton