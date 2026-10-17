import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import ProfileTabDataWrapper from './profile-data-wrapper'
import AssocTabSkelton from '../../../universal-tab-skeleton'

const AssocProfileTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='Profile' description="Retrouvez le récapitulatif des animateurs et des élèves participants cette année"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AssocTabSkelton/>}>
                <ProfileTabDataWrapper association = {association}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocProfileTab