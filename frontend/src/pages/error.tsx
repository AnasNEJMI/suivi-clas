import BaseLayout from '@/layouts/base-layout'
import { cn } from '@/lib/utils'
import { FrownIcon } from 'lucide-react'
import { Link } from 'react-router'

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
      <header className='fixed z-50 top-2 left-2 w-[calc(100%-1rem)] max-w-7xl md:left-1/2 md:-translate-x-1/2 h-16 md:h-20 rounded-xl flex items-center justify-between gap-16 px-2 '>
        <Link to='/' className='w-12 h-12 md:w-16 md:h-16 bg-lime-100 rounded-lg'></Link>
        <div className='hidden md:flex items-center justify-center gap-4 rounded-xl bg-lime-200 h-16 px-4'>
          <Link to='/a-propos' className='text-nowrap  px-4'>A propos</Link>
          <Link to='/contact' className='px-4'>Contact</Link>
        </div>
        {/* <NavBar className='inline-block md:hidden'/> */}
        </header>
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