import type { User } from '@/api/auth';
import Header from '@/components/header';
import Bilan from '@/components/profile/bilan';
import { CompetencesMethodologiques } from '@/components/profile/competences-transversales';
import Presence from '@/components/profile/presence';
import SubjectsHistory from '@/components/profile/subjets-history';
import Todo from '@/components/profile/todo';
import { useAuth } from '@/contexts/auth/use-auth';
import BaseLayout from '@/layouts/base-layout';
import { Navigate, useLoaderData } from 'react-router';

const data = [
    {
        date : '01/01',
        present : true,
        bilan : {
            subject : 'math',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '02/01',
        present : false,
    },
    {
        date : '03/01',
        present : true,
        bilan : {
            subject : 'math',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '04/01',
        present : false,
    },
    {
        date : '05/01',
        present : true,
        bilan : {
            subject : 'math',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '06/01',
        present : false,
    },
    {
        date : '07/01',
        present : true,
        bilan : {
            subject : 'pc',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '08/01',
        present : true,
        bilan : {
            subject : 'math',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '09/01',
        present : true,
        bilan : {
            subject : 'svt',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '10/01',
        present : false,
    },
    {
        date : '11/01',
        present : false,
    },
    {
        date : '12/01',
        present : true,
        bilan : {
            subject : 'svt',
            lesson : 'Nombres relatifs',
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '13/01',
        present : false,
    },
]

const todoLinks = {
    fiche : '',
    qcm : '',
    exercices : ''
}

const profileDesc = 'Cet espace personnel met à votre disponibilité toutes les informations importantes et utiles concernant le déroulement des séances, les commentaires et les retours de notre encadrant, ainsi que la progression de chaque élève.'

const Profile = () => {
    const loaderData = useLoaderData() as {user : User};
    const {user : contextUser, isAuthenticated} = useAuth();

    if(!loaderData?.user && !isAuthenticated){
        return <Navigate to='/' replace/>;
    }

    const user = loaderData.user || contextUser;

    if(!user){
        return <Navigate to='/' replace/>;
    }

  return (
    <BaseLayout>
        <Header/>
        <section className='w-full max-w-7xl pt-32 md:pt-48 px-6'>
            <span className='text-sm opacity-75 px-2 py-1 rounded-full bg-lime-200 text-lime-700'>Dernière connexion : 01/05/2026</span>
            <h1 className='font-semibold text-4xl mt-4'>Bienvenue {user.username} !👋</h1>
            <p className='text-base mt-4 w-full text-balance opacity-65 max-w-md'>{profileDesc}</p>
        </section>
        <section className='relative w-full max-w-7xl mt-12 lg:mt-20 px-6 py-2 flex flex-col'>
            <SubjectsHistory data={data}/>
        </section>
        <section className='w-full max-w-7xl mt-12 lg:mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 pb-6'>
            <div>
                <Bilan/>
                <Todo student={'Bilal'} todoLinks={todoLinks} className='mt-12'/>
            </div>
            <div>
                <Presence data={data} student={'Bilal'}/>
                <CompetencesMethodologiques className='mt-12'/>
            </div>
        </section>
    </BaseLayout>
  )
}

export default Profile