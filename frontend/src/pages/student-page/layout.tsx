import type { User } from '@/api/auth';
import BaseLayout from '@/layouts/base-layout';
import { Outlet, useRouteLoaderData } from 'react-router';
import { ErrorBoundary }     from 'react-error-boundary'
import { Suspense, useEffect } from 'react';
import Skeleton from './bilans/bilans-skeleton';
import BilansSection from './bilans/bilans-section';
import SectionError from './section-error';
import SkillsEvalSection from './skills-eval/Skills-eval-section';
import LessonEvalSection from './lesson-eval/lesson-eval-section';
import StudentPageHeroSection from './hero-section';
import { studentApiCalls } from '@/api/student/apiCalls';
import FooterSection from '../footer-section';
import { SEOHead } from '@/components/seo-head';
import { BicepsFlexedIcon, BookOpenTextIcon, FilePenLineIcon, GraduationCapIcon } from 'lucide-react';
import UserPageWrapper from './page-wrapper';
import type { UserPageTheme } from '@/lib/types/data.types';

const ROOT_PATH = '/etudiant';

const PAGE_TABS = [
    {
      title: "Séances",
      url: `${ROOT_PATH}`,
      icon: BookOpenTextIcon,
    }, 
    {
      title: "QCMs",
      url: `${ROOT_PATH}/qcms`,
      icon: FilePenLineIcon,
    },
    {
      title: "Methodologie",
      url: `${ROOT_PATH}/methodologie`,
      icon: BicepsFlexedIcon,
    },
    {
      title: "Programme",
      url: `${ROOT_PATH}/programme`,
      icon: GraduationCapIcon,
    }
]

const PAGE_THEME : UserPageTheme = {
    tabBorderHovered : 'border-zinc-300',
    tabBorderSelected : 'border-zinc-900',
    tabBgHovered : 'bg-zinc-200',
    tabBgSelected : 'bg-zinc-900',
    tabTextHovered : 'text-zinc-900',
    tabTextSelected : 'text-white',
}
const SEO_PAGE_TITLE = 'Mon espace étudiant';

const StudentPageLayout = () => {

    useEffect(() => {
      void studentApiCalls.trackVisit();
    }, [])
    

  return (
        <UserPageWrapper
            tabs={PAGE_TABS}
            seoTitle={SEO_PAGE_TITLE}
            theme  = {PAGE_THEME}
        >
            <Outlet/>
            {/* <BaseLayout>
                <StudentPageHeroSection student={user}/>
                <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
                    <Suspense fallback = {<Skeleton/>}>
                        <BilansSection student = {user}/>
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary fallback = {<SectionError desc = 'des évaluations de la méthodologie'/>}>
                    <Suspense fallback = {<Skeleton/>}>
                        <SkillsEvalSection student = {user}/>
                    </Suspense>
                </ErrorBoundary>
    
                <ErrorBoundary fallback = {<SectionError desc = 'des évaluations des leçons'/>}>
                    <Suspense fallback = {<Skeleton/>}>
                        <LessonEvalSection student = {user}/>
                    </Suspense>
                </ErrorBoundary>
                <LogoutSection/>
                <FooterSection/>
            </BaseLayout> */}
        </UserPageWrapper>
  )
}

export default StudentPageLayout