import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import RootLayout from './layouts/root-layout.tsx'
import OrgBoardHome from './components/dashboard/dashboard-home.tsx'
import OrgBoardSettings from './components/dashboard/dashboard-settings.tsx'
import SignUp from './pages/signup.tsx'
import OrgBoard from './pages/dashboard.tsx'
import Adminboard from './pages/adminboard.tsx'
import AdminboardCreateUser from './components/adminboard/adminboard-create-user.tsx'
import { guestRouteLoader } from './router/loaders/guest-route-loader.ts'
import About from './pages/about.tsx'
import Contact from './pages/contact.tsx'
import Profile from './pages/profile.tsx'
import { RootErrorBoundary } from './pages/root-error-boundry.tsx'
import { adminRouteLoader } from './router/loaders/admin-route-loader.tsx'
import { profileRouteLoader } from './router/loaders/profile-route-loader.tsx'
import { orgRouteLoader } from './router/loaders/org-route-loader.tsx'



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
        path : 'profile',
        Component : Profile,
        loader : profileRouteLoader,
        shouldRevalidate: () => true,
      },
      {
        path : 'association',
        Component : OrgBoard,
        loader : orgRouteLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : OrgBoardHome},
          {path : 'settings', Component : OrgBoardSettings}
        ]
      },
      {
        path : 'admin',
        Component : Adminboard,
        loader : adminRouteLoader,
        shouldRevalidate: () => true,
        children : [
          {index : true, Component : OrgBoardHome},
          {path : 'create-user', Component : AdminboardCreateUser},
          {path : 'settings', Component : OrgBoardSettings}
        ]
      },
    ],
  }
])


const container = document.getElementById('root')
const root = createRoot(container!);
root.render(<RouterProvider router={router} />)

