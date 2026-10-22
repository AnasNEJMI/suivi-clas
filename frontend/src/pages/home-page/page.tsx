import StatsSection from './sections/stats-section';
import FooterSection from '../footer-section';
import ThreeActorsSection from './sections/actors-section';
import HowItWorksSection from './sections/how-it-works.section';
import FeaturesSection from './sections/features-section';
import HeroSection from './sections/hero-section';
import BaseLayout from '@/layouts/base-layout';
import { SEOHead } from '@/components/seo-head';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.scroll(0,0);
  },[])
  return (
    <>
      {/* head */}
      <SEOHead
        title="Page d'acceuil"
        description="Mon Suivi Scolaire connecte animateurs, élèves et associations autour d'un objectif commun — transformer chaque séance en progrès mesurable et durable."
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
        {/* <CTASection /> */}
        <FooterSection />
      </BaseLayout>
      
    </>
  )
}