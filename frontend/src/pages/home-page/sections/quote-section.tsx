function QuoteSection() {
  return (
    <section className='px-6 py-24 max-w-md'>
      <div className='rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-700 dark:bg-zinc-800'>
        <p className='mb-1.5 font-serif text-[44px] leading-none text-emerald-200'>"</p>
        <p className='mb-4 font-serif text-[14px] leading-[1.7] text-zinc-800 dark:text-zinc-200'>
          Suivi CLAS a transformé notre façon de travailler. Les animateurs sont plus investis,
          les élèves plus engagés, et nous avons enfin une vision claire de ce qui se passe dans
          nos séances. C'est l'outil qu'il nous manquait depuis le début.
        </p>
        <div className='flex items-center gap-2.5'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-medium text-emerald-700'>
            A
          </div>
          <p className='text-[12px] text-zinc-500'>
            Amina B. — Responsable pédagogique, Association Avenir Jeunes
          </p>
        </div>
      </div>
    </section>
  )
}

export default QuoteSection;