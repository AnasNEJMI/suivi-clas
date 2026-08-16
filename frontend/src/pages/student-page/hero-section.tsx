import type { User } from '@/api/auth'

const studentPageDescription = "Cet espace personnel met à votre disponibilité toutes les informations importantes et utiles concernant le déroulement des séances, les commentaires et les retours de nos animateurs(trices), ainsi que l'évolution de vos compétences."

const StudentPageHeroSection = ({student} : {student : User}) => {
  return (
    <section className='max-w-7xl pt-32 md:pt-48 px-6 flex flex-col items-center'>
        <h1 className='font-semibold text-3xl md:text-4xl mt-4'>Bienvenue {student.firstName} !👋</h1>
        <div className='flex flex-row flex-wrap items-center justify-center gap-2 mt-4'>
            <p className='text-md opacity-75 px-4 py-2 rounded-full bg-sky-100 text-indigo-700'><span className='font-bold opacity-90'>{student.association?.label}</span></p>
            <p className='text-md opacity-75 px-4 py-2 rounded-full bg-sky-100 text-indigo-700'><span className='font-bold opacity-90'>{student.class?.label}</span></p>
        </div>
        <p className='text-md opacity-75 px-4 py-1 rounded-full bg-zinc-100 text-zinc-700 mt-4'>Dernière connexion : <span className='font-bold'>01/05/2026</span></p>
        <p className='text-base mt-4 w-full text-balance font-medium opacity-65 max-w-md text-justify'>{studentPageDescription}</p>
    </section>
  )
}

export default StudentPageHeroSection