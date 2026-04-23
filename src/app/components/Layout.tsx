import { Outlet } from 'react-router';
import { Header } from './Header';
import { Banner } from './Banner';
import { Categories } from './Categories';
import { DiscountPrediction } from './DiscountPrediction';
import { AIAssistant } from './AIAssistant';

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner />
      <Categories />
      <main>
        <Outlet />
      </main>
      <DiscountPrediction />
      <AIAssistant />
    </div>
  );
}
