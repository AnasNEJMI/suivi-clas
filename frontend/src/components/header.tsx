import { Link} from 'react-router'
import NavBar from './navbar'
import { useAuth } from '@/contexts/auth/use-auth';

const Header = () => {
  const {user, isAuthenticated} = useAuth();
  return (
    <header className='fixed z-50 top-2 left-2 w-[calc(100%-1rem)] max-w-7xl md:left-1/2 md:-translate-x-1/2 h-16 md:h-20 rounded-xl flex items-center justify-between gap-16 px-2 '>
        <Link to='/' className='w-12 h-12 md:w-16 md:h-16 bg-lime-100 rounded-lg'></Link>
        <div className='hidden md:flex items-center justify-center gap-4 rounded-xl bg-lime-200 h-16 px-4 font-outfit font-bold border border-lime-300/50 shadow-md text-shadow-2xs text-shadow-white'>
          <Link to='/a-propos' className='text-nowrap  px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>À propos</Link>
          {
            isAuthenticated && user && user.userType === 'admin' &&
            <Link to='/admin' className='px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>Page Admin</Link>
          }
          {
            isAuthenticated && user && user.userType === 'associationMember' &&
            <Link to='/association' className='px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>Association</Link>
          }
          {
            isAuthenticated && user && user.userType === 'student' &&
            <Link to='/etudiant' className='px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>Profile</Link>
          }
          {
            isAuthenticated && user && user.userType === 'animator' &&
            <Link to='/animateur' className='px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>Profile</Link>
          }
          <Link to='/contact' className='px-4 py-2 border rounded-xl border-lime-500/30 bg-white/40 hover:bg-white/60 hover:border-lime-500/50'>Contact</Link>
        </div>
        <NavBar className='inline-block md:hidden'/>
    </header>
  )
}

export default Header