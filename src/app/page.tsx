import ScrollProgress from '@/components/ui/ScrollProgress'
import HeroSection from '@/components/sections/HeroSection'
import HistorySection from '@/components/sections/HistorySection'
import StylesSection from '@/components/sections/StylesSection'
import PatternsSection from '@/components/sections/PatternsSection'
import ArtisansSection from '@/components/sections/ArtisansSection'
import InteractiveSection from '@/components/sections/InteractiveSection'
import FutureSection from '@/components/sections/FutureSection'
import FooterSection from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <HistorySection />
      <StylesSection />
      <PatternsSection />
      <ArtisansSection />
      <InteractiveSection />
      <FutureSection />
      <FooterSection />
    </main>
  )
}
