import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../section-error'
import Skeleton from '../../bilans/bilans-skeleton'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import LessonEvalsTabDataWrapper from './lesson-evals-data-wrapper'
import TabHeader from '../tab-header'

const LessonEvalsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};
  return (
    <>
        <TabHeader student={student} tabLabel='Évalution des leçons' description = "Retrouve ton niveau d'acquisition des leçons abordées lors des séances."/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <LessonEvalsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default LessonEvalsTab