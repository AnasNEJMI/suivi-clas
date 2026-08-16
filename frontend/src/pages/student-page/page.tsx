import type { User } from '@/api/auth';
import Header from '@/components/header';
import BaseLayout from '@/layouts/base-layout';
import { useRouteLoaderData } from 'react-router';
import { ErrorBoundary }     from 'react-error-boundary'
import { Suspense } from 'react';
import BilansSkeleton from './bilans/bilans-skeleton';
import BilansSection from './bilans/bilans-section';
import SectionError from './section-error';
import SkillsEvalSection from './skills-eval/Skills-eval-section';
import LessonEvalSection from './lesson-eval/lesson-eval-section';
import StudentPageHeroSection from './hero-section';


const StudentPage = () => {
    const {user} = useRouteLoaderData('student') as {user : User};

  return (
    <BaseLayout>
        <Header/>
        <StudentPageHeroSection student={user}/>
        {/* <BilansSkeleton/> */}
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<BilansSkeleton/>}>
                <BilansSection student = {user}/>
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback = {<SectionError desc = 'des évaluations de la méthodologie'/>}>
            <Suspense fallback = {<BilansSkeleton/>}>
                <SkillsEvalSection student = {user}/>
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback = {<SectionError desc = 'des évaluations des leçons'/>}>
            <Suspense fallback = {<BilansSkeleton/>}>
                <LessonEvalSection student = {user}/>
            </Suspense>
        </ErrorBoundary>
        {/* <section className='relative w-full max-w-7xl mt-12 lg:mt-20 px-6 py-2 flex flex-col'>
            <SubjectsHistory bilans={bilans}/>
        </section>
        <section className='w-full max-w-7xl mt-12 lg:mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 pb-6'>
            <div>
                <BilanCard bilans = {bilans}/>
                <Todo student={'Bilal'} todoLinks={todoLinks} className='mt-12'/>
                <Qcms qcmWithQuestions={loaderData.qcmWithQuestions}/>
                <pre className='w-60'>{JSON.stringify(loaderData.qcmWithQuestions, null)}</pre>
            </div>
            <div>
                <Presence bilans={loaderData.bilans} student={user.firstName}/>
                <CompetencesMethodologiques skills = {skills} className='mt-12'/>
            </div>
        </section> */}
    </BaseLayout>
  )
}

export default StudentPage