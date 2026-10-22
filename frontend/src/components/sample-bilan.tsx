import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ClipWords } from '@/components/clip-words'
import { Band } from './band'

const paragraphs = [
  { label: 'La séance',  text: "Bonjour, lors de la séance d'aujourd'hui, nous avons relu la leçon « Théorème de Pythagore » avec Yasmine, puis fait des exercices. L'attention et la participation ont été très bonnes du début à la fin." },
  { label: 'La méthode', text: "Du côté de la méthode de travail, nous avons remarqué de nets progrès concernant l'autonomie. C'est un vrai plaisir de voir ces efforts porter leurs fruits." },
  { label: 'La suite',   text: "Pour la prochaine séance, nous conseillons à Yasmine de refaire à la maison les exercices vus ensemble. Cela aide à bien retenir la méthode. Merci pour votre confiance et à très bientôt !" },
]

const rules = [
  { title: 'Des mots simples',      text: 'Pas de jargon : tous les parents comprennent du premier coup.' },
  { title: 'Toujours encourageant', text: 'Même quand cela se passe moins bien, le bilan propose une piste pour avancer.' },
  { title: 'Honnête et précis',     text: "Ce qui a été fait, comment cela s'est passé et ce qu'il reste à faire." },
]

export function SampleBilan() {
  return (
    <Band tint>
      <div className='grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2'>
        <div>
          <ClipWords as='p' className='text-sm font-semibold uppercase tracking-widest text-lime-600'>Les bilans</ClipWords>
          <ClipWords as='h2' delay={120} className='mt-3 max-w-md text-balance text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-4xl'>
            Un compte rendu que les parents comprennent
          </ClipWords>
          <Reveal delay={300}>
            <p className='mt-4 max-w-md text-sm leading-relaxed text-zinc-500 md:text-base'>
              Après chaque séance, l'élève reçoit un bilan écrit sur le même modèle : trois paragraphes courts, chaleureux et clairs.
            </p>
            <ul className='mt-8 space-y-5'>
              {rules.map(r => (
                <li key={r.title} className='flex gap-3'>
                  <span className='mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime-300 text-zinc-900'><Check className='size-3.5' strokeWidth={3} aria-hidden /></span>
                  <span>
                    <span className='block font-semibold text-zinc-900'>{r.title}</span>
                    <span className='block text-sm text-zinc-500'>{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className='relative mx-auto w-full max-w-lg'>
          <div aria-hidden className='absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/50 blur-3xl' />
          <article className='relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-black/5 md:rotate-1'>
            <div className='flex items-center justify-between bg-lime-300 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-zinc-900'>
              <span>Exemple de bilan</span><span>Séance du 12 octobre</span>
            </div>
            <div className='flex items-center gap-3 border-b border-zinc-100 px-5 py-4'>
              <span className='grid size-10 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700'>Y</span>
              <div>
                <p className='text-sm font-bold text-zinc-900'>Yasmine</p>
                <p className='text-xs text-zinc-500'>Mathématiques · Théorème de Pythagore</p>
              </div>
            </div>
            <div className='space-y-5 px-5 py-5'>
              {paragraphs.map((p, i) => (
                <Reveal key={p.label} delay={i * 250}>
                  <span className='inline-block rounded-full bg-lime-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime-800'>{p.label}</span>
                  <p className='mt-1.5 text-sm leading-relaxed text-zinc-600'>{p.text}</p>
                </Reveal>
              ))}
            </div>
            <p className='border-t border-zinc-100 bg-zinc-50 px-5 py-2.5 text-xs italic text-zinc-400'>Exemple fictif, à titre d'illustration.</p>
          </article>
        </div>
      </div>
    </Band>
  )
}