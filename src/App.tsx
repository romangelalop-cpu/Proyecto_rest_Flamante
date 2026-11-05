import { useCallback, useState } from 'react';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import OrderSection from '@/components/OrderSection';
import ReviewsSection from '@/components/ReviewsSection';
import SplashScreen from '@/components/SplashScreen';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { NAV_ITEMS, type SectionId } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [active, selectSection] = useActiveSection(SECTION_IDS);

  const navigateTo = useCallback(
    (id: SectionId) => {
      selectSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [selectSection],
  );

  const orderDish = useCallback(
    (dishName: string) => {
      setSelectedDish(dishName);
      navigateTo('ordenar');
    },
    [navigateTo],
  );

  return (
    <div className="min-h-screen bg-crema-100">
      {!splashDone && <SplashScreen onFinished={() => setSplashDone(true)} />}
      <SiteHeader activeId={active} onNavigate={navigateTo} />

      <main>
        <HeroSection onOrderNow={() => navigateTo('ordenar')} onViewMenu={() => navigateTo('menu')} />
        <MenuSection onOrderDish={orderDish} />
        <OrderSection preselectedDish={selectedDish} />
        <ReviewsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
