import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import QcmsTabDataWrapper from './qcms-data-wrapper'
import TabHeader from '../../../tab-header'
import UniversalTabSkeleton from '@/pages/universal-tab-skeleton'

const QcmsTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={student} title = 'Éspace élève' subTitle='QCM' description = 'Complète les QCM soumis par tes animateurs, et consulte tes résultats'/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<UniversalTabSkeleton/>}>
                <QcmsTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default QcmsTab