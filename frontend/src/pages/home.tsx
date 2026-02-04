import Header from '@/components/header';
import HomeHero from '@/components/home/hero';
import BaseLayout from '@/layouts/base-layout'

const Home = () => {
  
  return (
    <BaseLayout>
      <Header/>
      <HomeHero/>
    </BaseLayout>
  )
}

export default Home