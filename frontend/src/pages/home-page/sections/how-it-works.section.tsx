import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, ChevronRight } from "lucide-react";

const steps = [
  {
    n: 1,
    title: 'La séance',
    desc: "L'animateur accompagne les élèves et soumet ensuite leurs bilans individuels avec des compléments à l'issue de la séance.",
  },
  {
    n: 2,
    title: "L'analyse",
    desc: 'La plateforme génère selon les consignes de l\'animateur des QCM, fiches et évaluations de compétences pour chaque élève.',
  },
  {
    n: 3,
    title: 'La vision',
    desc: "Chaque acteur accède à son espace personnalisé : progrès pour l'élève, suivi pour l'animateur, pilotage pour l'association.",
  },
]

function HowItWorksSection() {
    const isMobile = useIsMobile();

  return (
    <section className='bg-zinc-50 border border-zinc-200 px-6 w-full flex flex-col items-center p-24 mb-24 rounded-4xl max-w-7xl'>
      <p className='text-center text-sm font-medium uppercase tracking-wide text-lime-600'>
        Comment ça marche
      </p>
      <h2 className='mt-2 text-center font-bold text-3xl md:text-4xl text-zinc-900'>
        Trois étapes, un cycle complémentaire
      </h2>
      <p className='mt-2 mx-auto max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base text-center text-balance leading-relaxed text-zinc-500'>
        Chaque semaine, la plateforme transforme ce qui se passe en salle en informations pertinentes et concrètes pour tous les acteurs.
      </p>
      <div className='flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-7xl mt-6'>
        {steps.map((step, i) => (
          <>
            <div key={step.n} className='max-w-md flex-1 grow flex flex-col items-center justify-center rounded-xl border-2 border-lime-500 outline-lime-800 bg-white p-4 text-center dark:border-zinc-700 dark:bg-zinc-800'>
              <div className='mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-lime-600 text-[12px] font-medium text-white'>
                {step.n}
              </div>
              <h4 className='mt-4 text-xl font-bold text-zinc-900'>
                {step.title}
              </h4>
              <p className='text-sm md:text-base leading-[1.55] text-zinc-500 text-balance'>
                {step.desc}
              </p>
            </div>
            {!isMobile && i < 2 && (
              <div key={`arrow-${i}`} className='flex justify-center items-center text-lime-600'>
                <ChevronRight className='h-4 w-4' aria-hidden />
              </div>
            )}
            {isMobile && i < 2 && (
              <div key={`arrow-${i}`} className='flex justify-center items-center text-lime-600'>
                <ChevronDown className='h-4 w-4' aria-hidden />
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection;