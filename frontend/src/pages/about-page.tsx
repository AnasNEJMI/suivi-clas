import Header from '@/components/header'
import { SEOHead } from '@/components/seo-head'
import BaseLayout from '@/layouts/base-layout'
import { Construction } from 'lucide-react'

const AboutPage = () => {
  return (
    <>
      <SEOHead title='À Propos' canonical = '/a-propos'/>
      <BaseLayout>
          <Header/>
          <section className='w-full h-dvh flex items-center justify-center flex-col'>
              <Construction className='size-20'/>
              <span className='font-bold text-3xl'>En Construction ...</span>
          </section>
      </BaseLayout>
    </>
  )
}

export default AboutPage