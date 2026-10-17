/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { guestRouteLoader } from './router/loaders/guest-route-loader.ts'
import AboutPage from './pages/about-page.tsx'
import ContactPage from './pages/contact-page.tsx'
import { RootErrorBoundary } from './pages/root-error-boundry.tsx'
import { studentPageLoader } from './router/loaders/student-page-loader.tsx'
import { AnimatorPageLoader } from './router/loaders/animator.loader.ts'
import { associationPageLoader } from './router/loaders/association-page-loader.ts'
import { lazy, StrictMode, Suspense, type FunctionComponent } from 'react'
import MethodPage from './pages/method-page.tsx'
import StudentSeancesTab from './pages/student-page/tabs/seances/seances-tab.tsx'
import QcmsTab from './pages/student-page/tabs/qcms/qcms-tab.tsx'
import SkillEvalsTab from './pages/student-page/tabs/skill-evals/skill-evals-tab.tsx'
import LessonEvalsTab from './pages/student-page/tabs/lesson-evals/lesson-evals-tab.tsx'
import StudentProfileTab from './pages/student-page/tabs/profile/profile-tab.tsx'
import AssocProfileTab from './pages/association-page/tabs/profile-tab/profile-tab.tsx'
import AssocAnimatorsTab from './pages/association-page/tabs/animators-tab/animators-tab.tsx'
import AssocPresenceTab from './pages/association-page/tabs/presence-tab/presence-tab.tsx'
import AssocVisitsTab from './pages/association-page/tabs/visits-tab/visits-tab.tsx'
import AssocQcmTab from './pages/association-page/tabs/qcms-tab/qcm-tab.tsx'
import AnimSeancesTab from './pages/animator-page/tabs/seances/seances-tab.tsx'
import AnimProfileTab from './pages/animator-page/tabs/profile/profile-tab.tsx'
import AnimQcmsTab from './pages/animator-page/tabs/qcms/qcms-tab.tsx'
import AnimSkillEvalsTab from './pages/animator-page/tabs/skill-evals/skill-evals-tab.tsx'
import AnimLessonEvalsTab from './pages/animator-page/tabs/lesson-evals/lesson-evals-tab.tsx'
import AppLoader from './pages/app-loader.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query/client';
import RootLayout from './layouts/root-layout.tsx'
import NotFoundPage from './pages/404.tsx'

function lazify<T extends FunctionComponent<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Component = lazy(factory)
  return (props: React.ComponentPropsWithoutRef<T>) => (
    <Suspense fallback={<AppLoader />}>
      <Component {...(props as any)} />
    </Suspense>
  )
}

const HomePage = lazify(() => import('./pages/home-page/page.tsx'))
const StudentPageLayout = lazify(() => import('./pages/student-page/layout.tsx'))
const AssociationPageLayout = lazify(() => import('./pages/association-page/layout.tsx'))
const AnimatorPageLayout = lazify(() => import('./pages/animator-page/layout.tsx'))
const LoginPage = lazify(() => import('./pages/login-page/page.tsx'))

const router = createBrowserRouter([
  {
    path : '/',
    Component : RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children : [
      {index : true, Component : HomePage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'contact', Component : ContactPage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'a-propos', Component : AboutPage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'connexion', Component : LoginPage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'methode', Component : MethodPage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {
        id : 'student',
        path : 'etudiant',
        Component : StudentPageLayout,
        loader : studentPageLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : StudentSeancesTab},
          {path : 'qcms', Component : QcmsTab},
          {path : 'methodologie', Component : SkillEvalsTab},
          {path : 'programme', Component : LessonEvalsTab},
          {path : 'profile', Component : StudentProfileTab},
        ]
      },
      {
        id : 'association',
        path : 'association',
        Component : AssociationPageLayout,
        loader : associationPageLoader,
        shouldRevalidate: () => true,
        children :[
          {index : true, Component : AssocProfileTab},
          {path : 'seances', Component : AssocAnimatorsTab},
          {path : 'presence', Component : AssocPresenceTab},
          {path : 'visites', Component : AssocVisitsTab},
          {path : 'qcms', Component : AssocQcmTab},
        ]
      },
      {
        id: "animator",
        path : 'animateur',
        Component : AnimatorPageLayout,
        loader : AnimatorPageLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : AnimProfileTab},
          {path : 'seances', Component : AnimSeancesTab},
          {path : 'qcms', Component : AnimQcmsTab},
          {path : 'methodologie', Component : AnimSkillEvalsTab},
          {path : 'programme', Component : AnimLessonEvalsTab},
        ]
      },
      {
        path: '*',
        Component: () => (
          <NotFoundPage />
        ),
      },
    ],
  }
])


const container = document.getElementById('root')
const root = createRoot(container!);
root.render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
)

