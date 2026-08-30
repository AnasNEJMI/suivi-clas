import StatsCard from "../cards/stats-card";

function StatsSection() {
  return (
    <section className='bg-lime-300/90 px-6 py-24 w-full flex items-center flex-col'>
      <p className='text-center text-sm font-medium uppercase tracking-wide text-zinc-900/90'>
        Un impact réel
      </p>
      <h2 className='mt-2 text-center font-bold text-3xl text-zinc-900'>
        Séance après séance, les résultats parlent
      </h2>
      <p className='mt-2 mx-auto max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base text-center text-balance leading-relaxed text-zinc-900/75'>
        Après chaque séance, la platforme synthétise et transforme les retours des animateurs en repères utiles pour les séances qui suivent. 
      </p>
      <div className='flex flex-col md:flex-row gap-2 mt-12 max-w-xl w-full'>
        <StatsCard target={100}  suffix='+' label='Séances enregistrées' />
        <StatsCard target={50}   suffix='+' label='Élèves accompagnés' />
        <StatsCard target={500} suffix='+' label='Bilans soumis' />
      </div>
    </section>
  )
}

export default StatsSection;