import type { Bilan, Doc, QcmWithQuestions, Skill } from '@/api/api.types';
import type { User } from '@/api/auth';
import Header from '@/components/header';
import BilanCard from '@/components/profile/bilan';
import { CompetencesMethodologiques } from '@/components/profile/competences-transversales';
import Presence from '@/components/profile/presence';
import Qcms from '@/components/profile/qcms';
import SubjectsHistory from '@/components/profile/subjets-history';
import Todo from '@/components/profile/todo';
import BaseLayout from '@/layouts/base-layout';
import { Navigate, useRouteLoaderData } from 'react-router';


const todoLinks = {
    fiche : '',
    qcm : '',
    exercices : ''
}

const profileDesc = 'Cet espace personnel met à votre disponibilité toutes les informations importantes et utiles concernant le déroulement des séances, les commentaires et les retours de notre encadrant, ainsi que la progression de chaque élève.'

const Profile = () => {
    const loaderData = useRouteLoaderData('profile') as {user : User, bilans : Bilan[], docs : Doc[], skill : Skill, qcmWithQuestions : QcmWithQuestions[]};

    if(!loaderData.user){
        return <Navigate to='/' replace/>;
    }

    console.log(loaderData.qcmWithQuestions);
  return (
    <BaseLayout>
        <Header/>
        <section className='w-full max-w-7xl pt-32 md:pt-48 px-6'>
            <span className='text-sm opacity-75 px-2 py-1 rounded-full bg-lime-200 text-lime-700'>Dernière connexion : 01/05/2026</span>
            <h1 className='font-semibold text-4xl mt-4'>Bienvenue {loaderData.user.username} !👋</h1>
            <p className='text-base mt-4 w-full text-balance opacity-65 max-w-md'>{profileDesc}</p>
        </section>
        <section className='relative w-full max-w-7xl mt-12 lg:mt-20 px-6 py-2 flex flex-col'>
            <SubjectsHistory bilans={loaderData.bilans}/>
        </section>
        <section className='w-full max-w-7xl mt-12 lg:mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 pb-6'>
            <div>
                <BilanCard bilans = {loaderData.bilans}/>
                <Todo student={'Bilal'} todoLinks={todoLinks} className='mt-12'/>
                <Qcms qcmWithQuestions={loaderData.qcmWithQuestions}/>
                <pre className='w-60'>{JSON.stringify(loaderData.qcmWithQuestions, null)}</pre>
            </div>
            <div>
                <Presence bilans={loaderData.bilans} student={loaderData.user.firstName}/>
                <CompetencesMethodologiques skill = {loaderData.skill} className='mt-12'/>
            </div>
        </section>
    </BaseLayout>
  )
}

export default Profile