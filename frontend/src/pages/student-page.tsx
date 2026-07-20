import type { Bilan, Doc, QcmWithQuestions, Skill } from '@/api/api.types';
import type { User } from '@/api/auth';
import Header from '@/components/header';
import BilanCard from '@/components/student-profile/bilan';
import { CompetencesMethodologiques } from '@/components/student-profile/competences-transversales';
import Presence from '@/components/student-profile/presence';
import SubjectsHistory from '@/components/student-profile/subjets-history';
import Todo from '@/components/student-profile/todo';
import BaseLayout from '@/layouts/base-layout';
import { Navigate, useRouteLoaderData } from 'react-router';


const todoLinks = {
    fiche : '',
    qcm : '',
    exercices : ''
}

const studentPageDescription = "Cet espace personnel met à votre disponibilité toutes les informations importantes et utiles concernant le déroulement des séances, les commentaires et les retours de nos animateurs(trices), ainsi que l'évolution de vos compétences."

const StudentPage = () => {
    const loaderData = useRouteLoaderData('student') as {user : User, bilans : Bilan[], docs : Doc[], skill : Skill, qcmWithQuestions : QcmWithQuestions[]};
    const {user, bilans,skill} = loaderData;
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
            <p className='text-base mt-4 w-full text-balance font-medium opacity-65 max-w-md text-justify'>{studentPageDescription}</p>
        </section>
        <section className='relative w-full max-w-7xl mt-12 lg:mt-20 px-6 py-2 flex flex-col'>
            <SubjectsHistory bilans={bilans}/>
        </section>
        <section className='w-full max-w-7xl mt-12 lg:mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 pb-6'>
            <div>
                <BilanCard bilans = {bilans}/>
                <Todo student={'Bilal'} todoLinks={todoLinks} className='mt-12'/>
                {/* <Qcms qcmWithQuestions={loaderData.qcmWithQuestions}/> */}
                {/* <pre className='w-60'>{JSON.stringify(loaderData.qcmWithQuestions, null)}</pre> */}
            </div>
            <div>
                <Presence bilans={loaderData.bilans} student={user.firstName}/>
                <CompetencesMethodologiques skill = {skill} className='mt-12'/>
            </div>
        </section>
    </BaseLayout>
  )
}

export default StudentPage