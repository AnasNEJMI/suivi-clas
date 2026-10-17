import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import LessonEvalsTabDataWrapper from './lesson-evals-data-wrapper'
import TabHeader from '../../../tab-header'
import UniversalTabSkeleton from '@/pages/universal-tab-skeleton'

const LessonEvalsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={student} title = 'Éspace élève' subTitle='Évalution des leçons' description = "Retrouve ton niveau d'acquisition des leçons abordées lors des séances."/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<UniversalTabSkeleton/>}>
                <LessonEvalsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default LessonEvalsTab