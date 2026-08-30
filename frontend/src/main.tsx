/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/root-layout.tsx'
import SignUp from './pages/signup.tsx'
import { guestRouteLoader } from './router/loaders/guest-route-loader.ts'
import About from './pages/about.tsx'
import Contact from './pages/contact.tsx'
import { RootErrorBoundary } from './pages/root-error-boundry.tsx'
import { studentPageLoader } from './router/loaders/student-page-loader.tsx'
import AnimatorWelcome from './pages/animator-page/animator-welcome.tsx'
import { AnimatorPageLoader } from './router/loaders/animator.loader.ts'
import AnimatorBilansPage from './pages/animator-page/animator-bilans/page.tsx'
import AnimatorSkillEvaluationPage from './pages/animator-page/animator-skill-evaluation/page.tsx'
import { associationPageLoader } from './router/loaders/association-page-loader.ts'
import AnimatorLessonEvaluationsPage from './pages/animator-page/animator-lesson-evaluations/page.tsx'
import AnimatorQcmPage from './pages/animator-page/animator-qcm-page/page.tsx'
import { lazy, Suspense, type FunctionComponent } from 'react'
import PageSkeleton from './pages/page-skeleton.tsx'


function lazify<T extends FunctionComponent<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Component = lazy(factory)
  return (props: React.ComponentPropsWithoutRef<T>) => (
    <Suspense fallback={<PageSkeleton />}>
      <Component {...(props as any)} />
    </Suspense>
  )
}

const HomePage        = lazify(() => import('./pages/home-page/page.tsx'))
const StudentPage     = lazify(() => import('./pages/student-page/page.tsx'))
const AnimatorPage    = lazify(() => import('./pages/animator-page/animator-page.tsx'))
const AssociationPage = lazify(() => import('./pages/association-page/association-page.tsx'))
const LoginPage       = lazify(() => import('./pages/login-page/page.tsx'))

const router = createBrowserRouter([
  {
    path : '/',
    Component : RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children : [
      {index : true, Component : HomePage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'contact', Component : Contact},
      {path : 'a-propos', Component : About},
      {path : 'connexion', Component : LoginPage, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'signup', Component : SignUp},
      {
        id : 'student',
        path : 'etudiant',
        Component : StudentPage,
        loader : studentPageLoader,
        shouldRevalidate: () => true,
      },
      {
        id : 'association',
        path : 'association',
        Component : AssociationPage,
        loader : associationPageLoader,
        shouldRevalidate: () => true,
      },
      {
        id: "animator",
        path : 'animateur',
        Component : AnimatorPage,
        loader : AnimatorPageLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : AnimatorWelcome},
          {path : 'bilans', Component : AnimatorBilansPage},
          {path : 'evaluation-lecons', Component : AnimatorLessonEvaluationsPage},
          {path : 'evaluation-competences', Component : AnimatorSkillEvaluationPage},
          {path : 'qcms', Component : AnimatorQcmPage},
        ]
      },
      // {
      //   id: "admin",
      //   path : 'admin',
      //   Component : Adminboard,
      //   loader : adminRouteLoader,
      //   shouldRevalidate: () => true,
      //   children : [
      //     {index : true, Component : OrgboardUsers},
      //     {path : 'users', Component : AdminboardUsers},
      //     {path : 'bilans', Component : AdminboardBilans},
      //     {path : 'skills', Component : AdminboardSkills},
      //     {path : 'lessons', Component : AdminboardLessons},
      //     {path : 'statistics', Component : AdminboardStatistics},
      //     {path : 'downloads', Component : AdminboardDownloads},
      //   ]
      // },
    ],
  }
])


const container = document.getElementById('root')
const root = createRoot(container!);
root.render(<RouterProvider router={router} />)

