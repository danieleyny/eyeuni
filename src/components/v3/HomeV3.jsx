import HeaderV3 from './HeaderV3'
import HeroV3 from './HeroV3'
import CostV3 from './CostV3'
import ServicesV3 from './ServicesV3'
import PortfolioV3 from './PortfolioV3'
import LogoCloudV3 from './LogoCloudV3'
import TestimonialsV3 from './TestimonialsV3'
import DemoCTAV3 from './DemoCTAV3'
import FAQV3 from './FAQV3'
import ContactV3 from './ContactV3'
import FooterV3 from './FooterV3'
import StickyMobileCTAV3 from './StickyMobileCTAV3'

// V3 — the trimmed site in a Stripe/Apple-grade light theme. Same section order
// as the public trimmed page, all light-styled.
export default function HomeV3() {
  return (
    <div className="bg-white text-[#4b5568]">
      <HeaderV3 />
      <main>
        <HeroV3 />
        <CostV3 />
        <ServicesV3 />
        <PortfolioV3 />
        <LogoCloudV3 />
        <TestimonialsV3 />
        <DemoCTAV3 />
        <FAQV3 />
        <ContactV3 />
      </main>
      <FooterV3 />
      <StickyMobileCTAV3 />
    </div>
  )
}
