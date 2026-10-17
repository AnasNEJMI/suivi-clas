import type { User } from '@/api/auth'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import SectionError from '../../../section-error'
import TabHeader from '../../../tab-header'
import AnimSkillEvalsTabSkeleton from '../skill-evals/skeleton'
import AnimLessonEvalsTabDataWrapper from './lesson-evals-data-wrapper'

const AnimLessonEvalsTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
    
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Programme' description="Retrouvez l'évolution du programme de chacun des élèves suivis cette année"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AnimSkillEvalsTabSkeleton/>}>
                <AnimLessonEvalsTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimLessonEvalsTab