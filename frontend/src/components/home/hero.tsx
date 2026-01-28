import { Button } from '../ui/button'
import { useAuth } from '@/contexts/auth/use-auth'
import { Link } from 'react-router'
import { LoginForm } from '../login/login-form'

const title = 'Service Title'
const desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas iusto sunt exercitationem deserunt nisi eligendi'


const HomeHero = () => {
    const {user, isAuthenticated} = useAuth();

    console.log(user)
  return (
    <section className="w-full mt-20 max-w-7xl flex flex-col items-center">
        <div className='w-28 h-28 bg-zinc-800'></div>
        <h1 className="text-4xl lg:text-7xl font-bold mt-6">{title}</h1>
        <p className="max-w-xl font-regular text-lg mt-4 text-balance text-center">{desc}</p>
        <div className="w-full max-w-sm mt-20">
            {
                !isAuthenticated && <LoginForm />
            }
            {
                isAuthenticated &&
                <div className='border border-muted rounded-xl p-6 bg-zinc-100'>
                    <h2 className='text-3xl'>Bienvenue</h2>
                    <p className='text-muted-foreground mt-2'>Accéder à votre tableau de bord</p>
                    <Button size='lg' className='py-6 text-lg w-full mt-6'>
                        <Link to='/dashboard'>
                            Tableau de bord
                        </Link>
                    </Button>
                </div>
            }
        </div>
    </section>
  )
}

export default HomeHero