import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import HowItWorks from '../components/home/HowItWorks';
import PricingPreview from '../components/home/PricingPreview';
import Testimonials from '../components/home/Testimonials';
import { EthicsSection, ContactCTA } from '../components/home/EthicsAndCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <PricingPreview />
      <Testimonials />
      <EthicsSection />
      <ContactCTA />
    </>
  );
}
