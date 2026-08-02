import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import RootLayout from './layouts/root-layout.tsx'
import SignUp from './pages/signup.tsx'
import AssociationPage from './pages/association-page/association-page.tsx'
import { guestRouteLoader } from './router/loaders/guest-route-loader.ts'
import About from './pages/about.tsx'
import Contact from './pages/contact.tsx'
import StudentPage from './pages/student-page.tsx'
import { RootErrorBoundary } from './pages/root-error-boundry.tsx'
import { studentPageLoader } from './router/loaders/student-page-loader.tsx'
import AnimatorWelcome from './pages/animator-page/animator-welcome.tsx'
import AnimatorPage from './pages/animator-page/animator-page.tsx'
import { AnimatorPageLoader } from './router/loaders/animator.loader.ts'
import BilansPage from './pages/animator-page/animator-bilans/page.tsx'
import AnimatorSkills from './pages/animator-page/animator-skills.tsx'
import AnimatorLessonDocuments from './pages/animator-page/animator-lesson-documents.tsx'
import AnimatorStatistics from './pages/animator-page/animator-statisics.tsx'
import { associationPageLoader } from './router/loaders/association-page-loader.ts'



const router = createBrowserRouter([
  {
    path : '/',
    Component : RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children : [
      {index : true, Component : Home, loader : guestRouteLoader,  shouldRevalidate: () => true,},
      {path : 'contact', Component : Contact},
      {path : 'a-propos', Component : About},
      {path : 'login', Component : Login, loader : guestRouteLoader,  shouldRevalidate: () => true,},
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
          {path : 'bilans', Component : BilansPage},
          {path : 'evaluation-competences', Component : AnimatorSkills},
          {path : 'liens-documents', Component : AnimatorLessonDocuments},
          {path : 'statistics', Component : AnimatorStatistics},
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

