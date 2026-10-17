import BaseLayout from '@/layouts/base-layout'
import { cn } from '@/lib/utils'
import { FrownIcon } from 'lucide-react'

interface ErrorProps{
    className ? : string,
    message : string,
    status : string,
    data : string,
    showData ? : boolean
}
const ErrorPage = ({className, message, status, data, showData = true} : ErrorProps) => {
  return (
    <BaseLayout>
      <section className={cn("w-full h-dvh flex items-center justify-center flex-col", className)}>
        <FrownIcon className="size-16"/>
        <span className='font-black text-4xl opacity-50'>{status}</span>
        <h1 className="text-2xl font-bold">
          {message}
        </h1>
        {
            showData && <p className='max-w-xs text-lg opacity-50'>{data}</p>
        }
      </section>
    </BaseLayout>
  )
}

export default ErrorPage