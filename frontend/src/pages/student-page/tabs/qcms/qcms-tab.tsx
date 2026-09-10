import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import Skeleton from '../../bilans/bilans-skeleton'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import QcmsTabDataWrapper from './qcms-data-wrapper'
import TabHeader from '../../../tab-header'

const QcmsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};
  return (
    <>
        <TabHeader student={student} title = 'Éspace élève' subTitle='QCMs' description = 'Complète les QCMs soumis par tes animateurs, et consulte tes résultats'/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <QcmsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default QcmsTab