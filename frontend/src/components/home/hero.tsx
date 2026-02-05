import { Button } from '../ui/button'
import { useAuth } from '@/contexts/auth/use-auth'
import { Link, useLoaderData } from 'react-router'
import { LoginForm } from '../login/login-form'
import AuthWelcome from './auth-welcome'
import type { User } from '@/api/auth'
const organisation = 'Fleurs du Lys'
const title = 'Bienvenue au pôle scientifique'
const desc = 'Cet espace est dédié au suivi des séances du pôle scientifique de Fleurs du Lys, vous offrant des bilans, des supports et de la méthodologie afin de mieux aborder vos révisions et vos éxamens.'


const HomeHero = () => {
    const loaderData = useLoaderData() as {user : User | null};
    const {user : contextUser, isAuthenticated} = useAuth();

    let user = null;
    if(loaderData){
        user = loaderData.user  || contextUser;
    }

    console.log('snapshot:', JSON.stringify(user))
    console.log('isAuthenticated:', isAuthenticated)
    console.log('firstName value:', JSON.stringify(user?.username))
  return (
    <section className="w-full min-h-dvh pt-28 lg:pt-20 max-w-7xl flex flex-col items-center justify-center px-6">
        <svg viewBox='0 0 100 100' className='absolute bottom-0 left-1/2 -translate-x-1/2 aspect-5/4 lg:w-full h-dvh -z-10' preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="28%"   stopColor="oklch(84.1% 0.238 128.85)"/>
                    <stop offset="72%" stopColor="oklch(89.7% 0.196 126.665)"/>
                </linearGradient>
                <linearGradient id="gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="28%"   stopColor="oklch(89.7% 0.196 126.665)"/>
                    <stop offset="72%" stopColor="oklch(76.8% 0.233 130.85)"/>
                </linearGradient>
                <linearGradient id="gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="28%"   stopColor="oklch(76.8% 0.233 130.85)"/>
                    <stop offset="72%" stopColor="oklch(84.1% 0.238 128.85)"/>
                </linearGradient>
            </defs>
            <path d='M0 55C30 35 30 75 50 75 70 75 75 35 100 100L100 100 0 100 0 55Z' className='stroke-none fill-[url("#gradient-1")]'></path>
            <path d='M0 100C30 35 30 75 50 75 70 75 75 35 100 20L100 100 0 100 0 100Z' className='stroke-none fill-[url("#gradient-2")]'></path>
            <path d='M0 100C20 70 32 85 50 85 72 85 65 50 100 40L100 100 0 100 0 100Z' className='stroke-none fill-[url("#gradient-3")]'></path>
        </svg>
        <div className='flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-start max-w-7xl gap-24 lg:gap-12 pb-6'>
            <div className='flex flex-col items-center lg:items-start'>
                <span className="bg-lime-100 py-1 px-4 font-bold text-lime-600 text-lg rounded-full border border-lime-300">{organisation}</span>
                <h1 className="text-4xl lg:text-5xl font-bold mt-4 text-center lg:text-start">{title}</h1>
                <p className="max-w-xl font-regular text-lg font-medium mt-6 text-balance text-center lg:text-start opacity-75">{desc}</p>
                <Link to='/a-propos' className='mt-8'>
                    <Button className='text-lg py-6 px-8'>À propos de nous</Button>
                </Link>
            </div>
            <div className="w-full max-w-sm">
                {
                    isAuthenticated && user ?
                    <AuthWelcome user = {user} />
                    : <LoginForm/>
                }
            </div>
        </div>
        
    </section>
  )
}

export default HomeHero