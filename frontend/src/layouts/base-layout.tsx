

const BaseLayout = ({children} : {children : React.ReactNode}) => {

  return (
     <>
      {/* <Navigation/> */}
      <main className='relative z-10 w-full min-h-screen flex flex-col items-center overflow-hidden bg-zinc-100'>
        {children}
      </main>
    </>
  )
}

export default BaseLayout