import StatsSection from './sections/stats-section';
import CTASection from './sections/cta-section';
import FooterSection from '../footer-section';
import ThreeActorsSection from './sections/actors-section';
import HowItWorksSection from './sections/how-it-works.section';
import FeaturesSection from './sections/features-section';
import HeroSection from './sections/hero-section';
import BaseLayout from '@/layouts/base-layout';


export default function HomePage() {
  return (
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
  )
}