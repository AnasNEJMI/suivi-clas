import { SignupForm } from '@/components/signup-form'
import BaseLayout from '@/layouts/base-layout'

const SignUp = () => {
  return (
    <BaseLayout>
         <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <SignupForm />
            </div>
          </div>
    </BaseLayout>
   
  )
}

export default SignUp