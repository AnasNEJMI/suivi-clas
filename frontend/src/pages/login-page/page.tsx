import BaseLayout from '@/layouts/base-layout'
import { LoginForm } from '@/components/login/login-form'
import FooterSection from '../footer-section'

const LoginPage = () => {
  return (
    <BaseLayout>
        <div className='relative w-full flex flex-col items-center pb-12'>
            <div className='absolute top-0 left-0 z-10 w-full h-[calc(90dvh)] lg:h-[calc(65dvh)] rounded-bl-[10rem] rounded-br-[10rem] lg:rounded-bl-[20rem] lg:rounded-br-none bg-lime-300'></div>
            <div className='relative pt-48 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center px-6 z-20'>
                <div className='flex flex-col'>
                    <h1 className='mt-6 mx-auto lg:mx-0 lg:text-start mb-4 max-w-md md:max-w-xl lg:max-w-xl text-4xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight text-zinc-900 text-center text-balance'>
                    Bienvenue à la page de connexion
                    </h1>
                    <p className='mx-auto lg:mx-0 lg:text-start mb-8 max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base leading-relaxed text-zinc-900/90 text-center text-balance'>
                        Vous êtes un élève, un membre d'une association partenaire, ou un animateur ou animatrice ? Connectez-vous pour accéder à votre espace personnel.
                    </p>
                </div>
                <LoginForm/>
            </div>
        </div>
        <FooterSection/>
    </BaseLayout>
  )
}

export default LoginPage