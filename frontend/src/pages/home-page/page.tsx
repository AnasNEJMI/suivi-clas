import StatsSection from './sections/stats-section';
import CTASection from './sections/cta-section';
import FooterSection from '../footer-section';
import ThreeActorsSection from './sections/actors-section';
import HowItWorksSection from './sections/how-it-works.section';
import FeaturesSection from './sections/features-section';
import HeroSection from './sections/hero-section';
import BaseLayout from '@/layouts/base-layout';
import { SEOHead } from '@/components/seo-head';

export default function HomePage() {
  return (
    <>
      {/* head */}
      <SEOHead
        title='Accompagnement scolaire conçu pour réussir'
        description="CoursParcours connecte animateurs, élèves et associations autour d'un objectif commun — transformer chaque séance en progrès mesurable et durable."
        canonical='/'
        includeOrgSchema = {true}
      />

      {/* page */}
      <BaseLayout>
        <HeroSection />
        <ThreeActorsSection />
        <HowItWorksSection />
        {/* <MissionSection /> */}
        <FeaturesSection />
        <StatsSection />
        {/* <QuoteSection /> */}
        <CTASection />
        <FooterSection />
      </BaseLayout>
      
    </>
  )
}