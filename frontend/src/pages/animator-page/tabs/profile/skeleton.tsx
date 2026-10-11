const ProfileTabSkeleton = () => {
  return (
    <div className="font-outfit space-y-6">
      {/* Carte de profil principale */}
      <div className="relative overflow-hidden border border-slate-200/80 p-6 lg:p-7 rounded-3xl bg-white shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="size-20 lg:size-22 rounded-2xl bg-slate-200/80 animate-pulse shrink-0" />
          <div className="space-y-3 flex-1 w-full text-center sm:text-left">
            <div className="h-5 w-32 bg-slate-200/60 rounded-full animate-pulse mx-auto sm:mx-0" />
            <div className="h-8 w-64 bg-slate-200/80 rounded-lg animate-pulse mx-auto sm:mx-0" />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <div className="h-7 w-36 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-7 w-40 bg-slate-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Squelette de statistiques secondaires du profil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-white border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-slate-200/80 animate-pulse" />
              <div className="h-4 w-32 bg-slate-200/80 rounded-md animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-100 rounded-md animate-pulse" />
              <div className="h-3.5 w-3/4 bg-slate-100 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileTabSkeleton