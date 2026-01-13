import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import RootLayout from './layouts/root-layout.tsx'
import DashboardHome from './components/dashboard/dashboard-home.tsx'
import DashboardSettings from './components/dashboard/dashboard-settings.tsx'
import SignUp from './pages/signup.tsx'
import Dashboard from './pages/dashboard.tsx'



const router = createBrowserRouter([
  {
    path : '/',
    Component : RootLayout,
    children : [
      {index : true, Component : Home},
      {path : 'login', Component : Login},
      {path : 'signup', Component : SignUp},
      {
        path : 'dashboard',
        Component : Dashboard,
        children : [
          {index : true, Component : DashboardHome},
          {path : 'settings', Component : DashboardSettings}
        ]
      }
    ],
  }
])


const container = document.getElementById('root')
const root = createRoot(container!);
root.render(<RouterProvider router={router} />)