import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import Skeleton from '../../bilans/bilans-skeleton'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import SkillEvalsTabDataWrapper from './skill-evals-data-wrapper'
import TabHeader from '../../../tab-header'

const SkillEvalsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};
  return (
    <>
        <TabHeader student={student} title = 'Éspace élève' subTitle='Méthodologie' description = "Consulte l'évolution de compétences méthodologique"/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <SkillEvalsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default SkillEvalsTab