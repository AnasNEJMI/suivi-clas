import type { User } from '@/api/auth'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { useEffect } from 'react'

const AuthWelcome = ({user} : {user : User}) => {
    useEffect(() => {
        console.log('auth user ', JSON.stringify(user))
        console.log('username ', user.username)
    })
  return (
    <div className='border rounded-xl px-6 py-16 bg-linear-135 from-25% from-yellow-100/75 to-95% to-lime-300/75 border-lime-400'>
        <h2 className='text-3xl w-full text-center'>Bienvenue {user.username ?? user.firstName}</h2>
        <p className='text-muted-foreground mt-2 w-full text-center'>Accéder à votre profile</p>
        <Link to='/profile' className='w-full'>
            <Button size='lg' className='w-full py-6 text-lg  cursor-pointer mt-6'>
                Profile
            </Button>
        </Link>
    </div>
)
}

export default AuthWelcome