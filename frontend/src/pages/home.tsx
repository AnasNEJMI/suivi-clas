import { useAuth } from '@/contexts/auth/use-auth'
import BaseLayout from '@/layouts/base-layout'

const Home = () => {
  const {user, isAuthenticated, isLoading} = useAuth();


  
  return (
    <BaseLayout>
        <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
          {
            isLoading 
            ? 'Loading ...' 
            : !isAuthenticated
              ? 'Not authenticated'
              : <pre>
                  {JSON.stringify(user, null, 2)}
                </pre>
          }
        </main>
    </BaseLayout>
  )
}

export default Home