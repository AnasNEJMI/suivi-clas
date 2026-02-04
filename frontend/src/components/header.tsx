import { Link} from 'react-router'
import NavBar from './navbar'
import { useAuth } from '@/contexts/auth/use-auth';

const Header = () => {
  const {user, isAuthenticated} = useAuth();
  return (
    <header className='fixed z-50 top-2 left-2 w-[calc(100%-1rem)] max-w-7xl md:left-1/2 md:-translate-x-1/2 h-16 md:h-20 rounded-xl flex items-center justify-between gap-16 px-2 '>
        <Link to='/' className='w-12 h-12 md:w-16 md:h-16 bg-lime-100 rounded-lg'></Link>
        <div className='hidden md:flex items-center justify-center gap-4 rounded-xl bg-lime-200 h-16 px-4'>
          <Link to='/a-propos' className='text-nowrap  px-4'>A propos</Link>
          {
            isAuthenticated && user &&
            <Link to='/profile' className='px-4'>Profile</Link>
          }
          <Link to='/contact' className='px-4'>Contact</Link>
        </div>
        <NavBar className='inline-block md:hidden'/>
    </header>
  )
}

export default Header