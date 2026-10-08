import { PageShell } from '../components/layout/PageShell';
import { HomeHero } from '../components/home/HomeHero';
import { TherapeuticAreas } from '../components/home/TherapeuticAreas';
import { ExpertsCarousel } from '../components/home/ExpertsCarousel';
import { FeaturedContent } from '../components/home/FeaturedContent';
import { Stats } from '../components/home/Stats';
import { BrandBanners } from '../components/home/BrandBanners';
import { LegalNotice } from '../components/home/LegalNotice';

export function HomePage() {
  return (
    <PageShell
      title="Opella | Hub científico para profissionais de saúde"
      description="Hub científico com evidências, insights clínicos e ferramentas práticas nas áreas de dor, alergia, saúde óssea e saúde digestiva."
    >
      <HomeHero />
      <TherapeuticAreas />
      <ExpertsCarousel />
      <FeaturedContent />
      <Stats />
      <BrandBanners />
      <LegalNotice />
    </PageShell>
  );
}
