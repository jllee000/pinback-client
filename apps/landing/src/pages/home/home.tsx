// src/pages/Home.tsx
import Header from '../../shared/components/layout/Header';
import HeroSection from '../HeroSection';
import FeatureBookmarkSection from '../FeatureBookmarkSection';
import FeatureReminderSection from '../FeatureReminderSection';
import FeatureRewardSection from '../FeatureRewardSection';
import FinalCTASection from '../FinalCTASection';

const Home = () => {
  return (
    <div className="h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Header />

      {/* 각 섹션들 */}
      <section className="h-dvh snap-start">
        <HeroSection />
      </section>

      <section className="h-dvh snap-start" id="bookmark-section">
        <FeatureBookmarkSection />
      </section>

      <section className="h-dvh snap-start">
        <FeatureReminderSection />
      </section>

      <section className="h-dvh snap-start">
        <FeatureRewardSection />
      </section>

      <section className="h-dvh snap-start">
        <FinalCTASection />
      </section>
    </div>
  );
};

export default Home;
