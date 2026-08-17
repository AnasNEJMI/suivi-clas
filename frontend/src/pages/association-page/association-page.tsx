import type { User } from '@/api/auth';
import Header from '@/components/header';
import BaseLayout from '@/layouts/base-layout';
import {useRouteLoaderData } from 'react-router'
import AssociationMemberHeroSection from './hero-section';
import { ErrorBoundary } from 'react-error-boundary';
import SectionError from '../student-page/section-error';
import Skeleton from '../student-page/bilans/bilans-skeleton';
import { Suspense } from 'react';
import PresenceStatsSection from './presence-stats/presence-section';
import VisitStatsSection from './visit-stats/visit-section';


const AssociationPage = () => {
  const {user} = useRouteLoaderData('association') as {user : User};
    
  
  return (
    <BaseLayout>
        <Header/>
        <AssociationMemberHeroSection assocMember={user}/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans de présence'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <PresenceStatsSection/>
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans de consultation'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <VisitStatsSection/>
            </Suspense>
        </ErrorBoundary>
    </BaseLayout>
  )
}

export default AssociationPage