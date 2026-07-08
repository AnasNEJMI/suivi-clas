import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import RootLayout from './layouts/root-layout.tsx'
import OrgBoardSettings from './pages/orgboard/orgboard-settings.tsx'
import SignUp from './pages/signup.tsx'
import Orgboard from './pages/orgboard/orgboard.tsx'
import Adminboard from './pages/adminboard/adminboard.tsx'
import AdminboardUsers from './pages/adminboard/adminboard-users.tsx'
import { guestRouteLoader } from './router/loaders/guest-route-loader.ts'
import About from './pages/about.tsx'
import Contact from './pages/contact.tsx'
import StudentProfile from './pages/student-profile.tsx'
import { RootErrorBoundary } from './pages/root-error-boundry.tsx'
import { adminRouteLoader } from './router/loaders/admin-route-loader.tsx'
import { profileRouteLoader } from './router/loaders/profile-route-loader.tsx'
import { orgRouteLoader } from './router/loaders/org-route-loader.tsx'
import OrgboardUsers from './pages/orgboard/orgboard-users.tsx'
import AdminboardBilans from './pages/adminboard/adminboard-bilans.tsx'
import AdminboardSkills from './pages/adminboard/adminboard-skills.tsx'
import AdminboardLessons from './pages/adminboard/adminboard-lessons.tsx'
import AdminboardStatistics from './pages/adminboard/adminboard-statistics.tsx'
import AdminboardDownloads from './pages/adminboard/adminboard-downloads.tsx'



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
        Component : StudentProfile,
        loader : profileRouteLoader,
        shouldRevalidate: () => true,
      },
      {
        path : 'association',
        Component : Orgboard,
        loader : orgRouteLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : OrgboardUsers},
          {path : 'settings', Component : OrgBoardSettings}
        ]
      },
      {
        id: "admin",
        path : 'admin',
        Component : Adminboard,
        loader : adminRouteLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : OrgboardUsers},
          {path : 'users', Component : AdminboardUsers},
          {path : 'bilans', Component : AdminboardBilans},
          {path : 'skills', Component : AdminboardSkills},
          {path : 'lessons', Component : AdminboardLessons},
          {path : 'statistics', Component : AdminboardStatistics},
          {path : 'downloads', Component : AdminboardDownloads},
        ]
      },
    ],
  }
])


const container = document.getElementById('root')
const root = createRoot(container!);
root.render(<RouterProvider router={router} />)

