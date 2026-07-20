import type { Animator, Class, Seance } from '@/api/association';
import type { User } from '@/api/auth';
import Header from '@/components/header';
import BaseLayout from '@/layouts/base-layout';
import { Navigate,useRouteLoaderData } from 'react-router'

const associationPageDescription = "Cet espace met à votre disponibilité toutes les informations importantes et utiles concernant le déroulement des séances, la participation des élèves, et les commentaires des animateurs(trices)."

const AssociationPage = () => {
  const loaderData = useRouteLoaderData('association') as {user : User, animators : Animator[], seances : Seance[], classes : Class[]};
    const {user} = loaderData;
    if(!user){
        return <Navigate to='/' replace/>;
    }
  
  return (
    <BaseLayout>
        <Header/>
        <section className='max-w-7xl pt-32 md:pt-48 px-6 flex flex-col items-center'>
            <h1 className='font-semibold text-3xl md:text-4xl mt-4'>Bienvenue {user.firstName} !👋</h1>
            <div className='flex flex-row flex-wrap items-center justify-center gap-2 mt-4'>
                <p className='text-md opacity-75 px-4 py-2 rounded-full bg-sky-100 text-indigo-700'><span className='font-bold opacity-90'>{user.association?.label}</span></p>
                <p className='text-md opacity-75 px-4 py-2 rounded-full bg-sky-100 text-indigo-700'><span className='font-bold opacity-90'>{user.class?.label}</span></p>
            </div>
            <p className='text-md opacity-75 px-4 py-1 rounded-full bg-zinc-100 text-zinc-700 mt-4'>Dernière connexion : <span className='font-bold'>01/05/2026</span></p>
            <p className='text-base mt-4 w-full text-balance font-medium opacity-65 max-w-md text-justify'>{associationPageDescription}</p>
        </section>
        <section className='relative w-full max-w-7xl mt-12 lg:mt-20 px-6 py-2 flex flex-col'>
            
        </section>
    </BaseLayout>
  )
}

export default AssociationPage