import { Link} from 'react-router'
import NavBar from './navbar'
import { useAuth } from '@/contexts/auth/use-auth';
import BrandLink from './brand-link';
import { MoveUpRightIcon, UserIcon } from 'lucide-react';
import { BrandButton } from './brand-button';

const Header = () => {
  const {user, isAuthenticated} = useAuth();

  return (
    <header className='fixed z-50 w-full md:left-1/2 md:-translate-x-1/2 rounded-xl flex items-center justify-between gap-16 pt-6 px-6'>
        <Link to='/' className='w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-md flex items-center justify-center font-outfit font-bold'>LOGO</Link>
        {/* <div className='hidden lg:flex lg:items-center lg:justify-center lg:gap-2'>
          <BrandLink to='/a-propos' label='A Propos'/>
          <BrandLink to='/methode' label='Notre méthode'/>
          <BrandLink to='/contact' label='Contact'/>
        </div> */}
        <div className='flex gap-2 items-center'>
          <div className='flex items-center justify-center gap-4 '>
            {
              user && isAuthenticated && user.userType === 'student' &&
              <Link to='/etudiant' className='rounded-md flex items-center justify-center font-outfit font-bold  text-white gap-px'>
                <BrandButton variant={'black'}>
                  Mon Espace
                  <UserIcon className='size-6'/>
                </BrandButton>
              </Link>
            }
            {
              user && isAuthenticated && user.userType === 'animator' &&
              <Link to='/animateur' className='rounded-md flex items-center justify-center font-outfit font-bold  text-white gap-px'>
                <BrandButton variant={'black'}>
                  Mon Espace
                  <UserIcon className='size-6'/>
                </BrandButton>
              </Link>
            }
            {
              user && isAuthenticated && user.userType === 'associationMember' &&
              <Link to='/association' className='rounded-md flex items-center justify-center font-outfit font-bold  text-white gap-px'>
                <BrandButton variant={'black'}>
                  Mon Espace
                  <UserIcon className='size-6'/>
                </BrandButton>
              </Link>
            }
            {
              (!user || !isAuthenticated) &&
              <Link to='/connexion' className='rounded-md flex items-center justify-center font-outfit font-bold  text-white gap-px'>
                <BrandButton variant={'black'}>
                  Connexion
                  <MoveUpRightIcon className='size-6'/>
                </BrandButton>
              </Link>
            }
          </div>
          <NavBar/>
        </div>
    </header>
  )
}

export default Header