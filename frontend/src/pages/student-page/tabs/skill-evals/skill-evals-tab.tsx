import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import SkillEvalsTabDataWrapper from './skill-evals-data-wrapper'
import TabHeader from '../../../tab-header'
import UniversalTabSkeleton from '@/pages/universal-tab-skeleton'

const SkillEvalsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={student} title = 'Éspace élève' subTitle='Méthodologie' description = "Consulte l'évolution de compétences méthodologique"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<UniversalTabSkeleton/>}>
                <SkillEvalsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default SkillEvalsTab