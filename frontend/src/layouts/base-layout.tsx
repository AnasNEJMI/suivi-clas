import Header from "@/components/header"


const BaseLayout = ({children} : {children : React.ReactNode}) => {

  return (
    <main className='font-outfit flex flex-col items-center min-h-dvh bg-zinc-100'>
      <Header />
      {children}
    </main>
  )
}

export default BaseLayout