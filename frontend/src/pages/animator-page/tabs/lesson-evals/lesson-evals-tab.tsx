import type { User } from '@/api/auth'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import SectionError from '../../../section-error'
import TabHeader from '../../../tab-header'
import AnimSkillEvalsTabSkeleton from '../skill-evals/skeleton'
import AnimLessonEvalsTabDataWrapper from './lesson-evals-data-wrapper'

const AnimLessonEvalsTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Programme' description="Retrouve l'évolution du programme de chacun des élèves suivis cette année."/>
        <ErrorBoundary fallback = {<SectionError desc = 'des évaluations des leçons'/>}>
            <Suspense fallback = {<AnimSkillEvalsTabSkeleton/>}>
                <AnimLessonEvalsTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimLessonEvalsTab