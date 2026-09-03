import { BrandButton } from '@/components/brand-button'
import { useAuth } from '@/contexts/auth/use-auth';
import { ApiError } from '@/lib/errors/apiError.class';
import React from 'react'
import { useNavigate } from 'react-router';

const LogoutSection = () => {
    const {requestLogout} = useAuth();
  const [isRequestingLoggingOut, setIsRequestingLoggingOut] = React.useState(false);
  const navigate = useNavigate();

  async function onLogout(){
      setIsRequestingLoggingOut(true);
      try{
        await requestLogout();
      }catch(error){
        if(ApiError.isUnauthorized(error)){
            navigate('/', {replace : true})
        }
      }finally{
        setIsRequestingLoggingOut(false);
      }
    }

  return (
    <section className='mt-12 px-6 w-full max-w-7xl'>
        <div className='border-2 border-red-500 p-6 bg-white rounded-xl shadow-card flex flex-col lg:flex-row items-center justify-between gap-4'>
            <p className='font-medium text-lg text-red-600 text-center lg:text-start text-balance'>Souhaitez-vous vous déconnecter? Appuyer sur le bouton "déconnecter"</p>
            <BrandButton variant='destructive' className='px-6' disabled = {isRequestingLoggingOut} onClick={onLogout}>Déconnecter</BrandButton>
        </div>
    </section>
  )
}

export default LogoutSection