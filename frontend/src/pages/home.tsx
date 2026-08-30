import Header from '@/components/header';
import HeroSection from '@/components/home/sections/hero-section';

const Home = () => {
  
  return (
    <main className='relative z-10 w-full min-h-screen flex flex-col items-center'>
      <Header/>
      <HeroSection/>
    </main>
  )
}

export default Home