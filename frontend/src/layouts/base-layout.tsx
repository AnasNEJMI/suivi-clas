

const BaseLayout = ({children} : {children : React.ReactNode}) => {

  return (
     <>
      {/* <Navigation/> */}
      <main className='relative z-10 w-full min-h-screen flex flex-col items-center px-6'>
        {children}
      </main>
    </>
  )
}

export default BaseLayout