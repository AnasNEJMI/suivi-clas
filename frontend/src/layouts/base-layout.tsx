import Navigation from '@/components/home/navigation'

const BaseLayout = ({children} : {children : React.ReactNode}) => {
  return (
     <>
      <Navigation/>
      <main className='relative z-10 w-full'>
        {children}
      </main>
    </>
  )
}

export default BaseLayout