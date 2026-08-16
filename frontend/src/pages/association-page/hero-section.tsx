import type { User } from '@/api/auth'
import { Separator } from '@/components/ui/separator'

const pageDescription = "Cet espace personnel met à votre disposition des informations et des statistiques détaillant le déroulement des séances et la participation des élèves, selon l'année scolaire et la classe concernées."

const AssociationMemberHeroSection = ({assocMember} : {assocMember : User}) => {
  return (
    <section className='w-full max-w-7xl pt-32 md:pt-48 px-6 flex flex-col items-start'>
        <h1 className='font-semibold text-3xl md:text-4xl mt-4'>Bienvenue {assocMember.firstName} !👋</h1>
        <div className='flex flex-row flex-wrap items-center justify-start gap-2 mt-4'>
            <p className='text-md opacity-75 px-4 py-1 rounded-full bg-sky-100 text-indigo-700 border border-indigo-200'><span className='font-bold opacity-90'>{assocMember.association?.label}</span></p>
        <p className='text-md opacity-75 px-4 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200'>Dernière connexion : <span className='font-bold'>01/05/2026</span></p>
        </div>
        <p className='text-base mt-4 w-full text-balance font-medium opacity-65 max-w-lg text-start'>{pageDescription}</p>
        <Separator className='my-6'/>
    </section>
  )
}

export default AssociationMemberHeroSection