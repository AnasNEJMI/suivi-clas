import type { User } from '@/api/auth'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import type { UserType } from '@/api/api.types'
const AuthWelcome = ({user} : {user : User}) => {

    const to = (userType : UserType) => {
        let to = '';
        if(userType === 'student'){
            to = '/etudiant';
        }else if(userType === 'animator'){
            to = '/animateur';
        }else if(userType === 'associationMember'){
            to = '/association';
        }

        return to;
    }
    const welcomeMessage = (userType : UserType) => {
        let message = '';
        if(userType === 'student'){
            message = "Accédez à la votre page élève avec le lien çi-dessous.";
        }else if(userType === 'animator'){
            message = "Accédez à la page animateur(trice) avec le lien çi-dessous.";
        }else if(userType === 'associationMember'){
            message = "Accédez à votre page association avec le lien çi-dessous.";
        }

        return message;
    }
    const linkLabel = (userType : UserType) => {
        let label = '';
        if(userType === 'student'){
            label = "Page Élève";
        }else if(userType === 'animator'){
            label = "Page Animateur(trice)";
        }else if(userType === 'associationMember'){
            label = "Page Association";
        }

        return label;
    }
  return (
    <div className='border rounded-xl px-6 py-16 bg-linear-135 from-25% from-yellow-100/75 to-95% to-lime-300/75 border-lime-400'>
        <h2 className='text-3xl w-full text-center'>Bienvenue {user.firstName ?? user.firstName}</h2>
        <p className='text-muted-foreground mt-2 w-full text-center'>{welcomeMessage(user.userType)}</p>
        <Link to={to(user.userType)} className='w-full'>
            <Button size='lg' className='w-full py-6 text-lg  cursor-pointer mt-6'>
                {linkLabel(user.userType)}
            </Button>
        </Link>
    </div>
)
}

export default AuthWelcome