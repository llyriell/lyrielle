import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkGallery from './components/WorkGallery';
import Archive from './components/Archive';
import Practice from './components/Practice';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      <Navigation />
      <main>
        <Hero />
        <WorkGallery />
        <Archive />
        <Practice />
        <footer className="px-8 md:px-16 py-12 max-w-screen-xl mx-auto border-t border-[#EBEBEB]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-[11px] text-[#CCCCCC] font-[300] tracking-[0.18em] uppercase">Lyriel x Evol</p>
            <p className="text-[11px] text-[#CCCCCC] font-[300] tracking-wide">A Growing Practice</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
