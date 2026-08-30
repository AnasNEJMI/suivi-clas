import type { User } from '@/api/auth';
import BaseLayout from '@/layouts/base-layout';
import { useRouteLoaderData } from 'react-router';
import { ErrorBoundary }     from 'react-error-boundary'
import { Suspense, useEffect } from 'react';
import Skeleton from './bilans/bilans-skeleton';
import BilansSection from './bilans/bilans-section';
import SectionError from './section-error';
import SkillsEvalSection from './skills-eval/Skills-eval-section';
import LessonEvalSection from './lesson-eval/lesson-eval-section';
import StudentPageHeroSection from './hero-section';
import { studentApiCalls } from '@/api/student/apiCalls';
import FooterSection from '../footer-section';
import LogoutSection from './logout-section';


const StudentPage = () => {
    const {user} = useRouteLoaderData('student') as {user : User};

    useEffect(() => {
      void studentApiCalls.trackVisit();
    }, [])
    

  return (
    <BaseLayout>
        <StudentPageHeroSection student={user}/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <BilansSection student = {user}/>
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback = {<SectionError desc = 'des évaluations de la méthodologie'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <SkillsEvalSection student = {user}/>
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback = {<SectionError desc = 'des évaluations des leçons'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <LessonEvalSection student = {user}/>
            </Suspense>
        </ErrorBoundary>
        <LogoutSection/>
        <FooterSection/>
    </BaseLayout>
  )
}

export default StudentPage