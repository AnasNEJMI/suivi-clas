import type { User } from '@/api/auth'
import { Link } from 'react-router'
import { Button } from '../ui/button'
const AuthWelcome = ({user} : {user : User}) => {

    const to = (role : 'admin' | 'org' | 'student') => {
        let to = '';
        if(role === 'admin'){
            to = '/admin';
        }else if(role === 'org'){
            to = '/association';
        }else if(role === 'student'){
            to = '/profile';
        }

        return to;
    }
    const welcomeMessage = (role : 'admin' | 'org' | 'student') => {
        let to = '';
        if(role === 'admin'){
            to = "Accédez à la page admin avec le lien çi-dessous.";
        }else if(role === 'org'){
            to = "Accédez à la page de l'association avec le lien çi-dessous.";
        }else if(role === 'student'){
            to = "Accédez à votre profile avec le lien çi-dessous.";
        }

        return to;
    }
    const linkLabel = (role : 'admin' | 'org' | 'student') => {
        let to = '';
        if(role === 'admin'){
            to = "Page Admin";
        }else if(role === 'org'){
            to = "Suivi Association";
        }else if(role === 'student'){
            to = "Profile";
        }

        return to;
    }
  return (
    <div className='border rounded-xl px-6 py-16 bg-linear-135 from-25% from-yellow-100/75 to-95% to-lime-300/75 border-lime-400'>
        <h2 className='text-3xl w-full text-center'>Bienvenue {user.firstName ?? user.firstName}</h2>
        <p className='text-muted-foreground mt-2 w-full text-center'>{welcomeMessage(user.role)}</p>
        <Link to={to(user.role)} className='w-full'>
            <Button size='lg' className='w-full py-6 text-lg  cursor-pointer mt-6'>
                {linkLabel(user.role)}
            </Button>
        </Link>
    </div>
)
}

export default AuthWelcome