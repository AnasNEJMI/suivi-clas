import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import AnimSkillEvalsTabDataWrapper from './skill-evals-data-wrapper'
import AnimSkillEvalsTabSkeleton from './skeleton'

const AnimSkillEvalsTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Méthodologie' description='Retrouvez les évaluations méthodologiques des élèves suivis cette année'/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AnimSkillEvalsTabSkeleton/>}>
                <AnimSkillEvalsTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimSkillEvalsTab