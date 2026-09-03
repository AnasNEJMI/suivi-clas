import type { User } from '@/api/auth';
import BaseLayout from '@/layouts/base-layout';
import {useRouteLoaderData } from 'react-router'
import AssociationMemberHeroSection from './hero-section';
import { ErrorBoundary } from 'react-error-boundary';
import SectionError from '../student-page/section-error';
import Skeleton from '../student-page/bilans/bilans-skeleton';
import { Suspense } from 'react';
import PresenceStatsSection from './presence-stats/presence-section';
import VisitStatsSection from './visit-stats/visit-section';
import AnimatorSection from './animator-stats/animator-section';
import QcmStatsSection from './qcm-stats/qcm-stats-section';
import FooterSection from '../footer-section';
import { SEOHead } from '@/components/seo-head';
import LogoutSection from '../logout-section';


const AssociationPage = () => {
  const {user} = useRouteLoaderData('association') as {user : User};
    
  
  return (
    <>
        <SEOHead noIndex title='Mon espace association' />
        <BaseLayout>
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
            <ErrorBoundary fallback = {<SectionError desc = 'des bilans de qcms'/>}>
                <Suspense fallback = {<Skeleton/>}>
                    <QcmStatsSection/>
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback = {<SectionError desc = 'des données des animateur(trice)s participants'/>}>
                <Suspense fallback = {<Skeleton/>}>
                    <AnimatorSection/>
                </Suspense>
            </ErrorBoundary>
            <LogoutSection/>
            <FooterSection/>
        </BaseLayout>
    </>
  )
}

export default AssociationPage