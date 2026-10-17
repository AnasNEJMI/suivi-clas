import { Loader2Icon } from 'lucide-react'
const AppLoader = () => {
  return (
    <div className='h-dvh w-full flex items-center justify-center'>
        <Loader2Icon className='text-lime-600 animate-spin'/>
    </div>
  )
}

export default AppLoader