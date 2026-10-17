import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import AnimSeancesTabDataWrapper from './seances-data-wrapper'
import SeancesTabSkeleton from './skeleton'

const AnimSeancesTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Séances' description='Retrouvez les données de toutes les séances réalisées cette année'/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<SeancesTabSkeleton/>}>
                <AnimSeancesTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimSeancesTab