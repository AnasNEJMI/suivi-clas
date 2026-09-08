import { useAuth } from "@/contexts/auth/use-auth";
import { ApiError } from "@/lib/errors/apiError.class";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from '@/components/ui/card'
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import { BrandButton } from "@/components/brand-button";

const LogoutCard = () => {
    const {requestLogout} = useAuth();
    const [isRequestingLoggingOut, setIsRequestingLoggingOut] = useState(false);
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
    <Card className='mt-6 bg-red-100/75 border border-red-400'>
        <CardContent className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className='flex gap-2 font-outfit'>
                <div className={cn(' rounded-full flex items-center justify-center font-bold text-xl text-red-400')}>
                    <LogOutIcon/>
                </div>
                <div className='flex flex-col justify-evenly'>
                    <span className='font-semibold text-lg'>Se déconnecter</span>
                    <p className='leading-4 tracking-tight flex items-center justify-start gap-2 text-red-500'>Tu seras redirigé vers la page d'acceuil.</p>
                </div>
            </div>
            <BrandButton variant='destructive' className='px-6' disabled = {isRequestingLoggingOut} onClick={onLogout}>Déconnexion</BrandButton>
        </CardContent>
    </Card>
  )
}

export default LogoutCard