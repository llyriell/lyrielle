import { useState, useEffect } from 'react';

const SECTION_IDS = ['work', 'archive', 'practice'];

// 'work' illuminates when fully in view (top at 20% viewport);
// others use midpoint (50%) — keep existing feel
const SECTION_THRESHOLD: Record<string, number> = {
  work: 0.2,
  archive: 0.5,
  practice: 0.5,
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [leHovered, setLeHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [reachedWork, setReachedWork] = useState(false);
  const [leVisible, setLeVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section: per-section threshold, resets to '' in hero
  useEffect(() => {
    const check = () => {
      const vh = window.innerHeight;
      let current = '';
      for (const id of [...SECTION_IDS].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= vh * (SECTION_THRESHOLD[id] ?? 0.5)) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  // One-way latch: mobile nav drops when #work top hits viewport midpoint
  useEffect(() => {
    if (reachedWork) return;
    const check = () => {
      const el = document.getElementById('work');
      if (!el) return;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
        setReachedWork(true);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [reachedWork]);

  // Mobile LE reveal: fires when heroReborn event dispatched, then waits for "Le" to finish
  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    const onReborn = () => {
      setTimeout(() => setLeVisible(true), 2400);
    };
    window.addEventListener('heroReborn', onReborn as EventListener);
    return () => window.removeEventListener('heroReborn', onReborn as EventListener);
  }, []);

  const mobileExpanded = scrolled && reachedWork;

  // Nav background: suppress on mobile until LE is visible
  const showBackground = scrolled && (!isMobile || leVisible);

  const items = [
    { label: 'Reflections', href: '#work',     id: 'work' },
    { label: 'Archives',    href: '#archive',  id: 'archive' },
    { label: 'In Orbit',    href: '#practice', id: 'practice' },
  ];

  const navLink = (item: typeof items[0], size: string) => {
    const active = activeSection === item.id;
    return (
      <a
        key={item.label}
        href={item.href}
        className={`${size} tracking-[0.28em] uppercase font-[300] transition-colors duration-300`}
        style={{ color: active ? '#111111' : '#AAAAAA' }}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBackground ? 'bg-[#F9F9F7]/95 backdrop-blur-sm border-b border-[#EBEBEB]' : ''
      }`}
    >
      {/* ── Desktop ── */}
      <div className="hidden md:flex max-w-screen-xl mx-auto px-16 h-16 items-center">
        <div className="flex-1">
          <a
            href="#top"
            onMouseEnter={() => setLeHovered(true)}
            onMouseLeave={() => setLeHovered(false)}
            className="text-[10px] tracking-[0.2em] uppercase font-[400] whitespace-nowrap"
            style={{ color: leHovered ? '#4D6844' : '#111111' }}
          >
            <span key={leHovered ? 'full' : 'short'} className="le-text-slide">
              {leHovered ? 'Lyriel x Evol' : 'LE'}
            </span>
          </a>
        </div>

        <div className="flex items-center gap-10">
          {items.map(item => navLink(item, 'text-[11px]'))}
        </div>

        <div className="flex-1 flex justify-end">
          <span className="text-[10px] tracking-[0.2em] uppercase font-[300] text-[#B8B8B4] heartbeat-pulse">
            A Growing Practice
          </span>
        </div>
      </div>

      {/* ── Mobile ── absent from DOM until heroReborn + "Le" animation finishes */}
      {leVisible && (
        <div className="flex md:hidden flex-col max-w-screen-xl mx-auto px-8">
          <div className="h-12 flex items-center">
            <a
              href="#top"
              className="le-nav-blink-in text-[10px] tracking-[0.2em] uppercase font-[400] whitespace-nowrap"
              style={{ color: mobileExpanded ? '#4D6844' : '#111111' }}
            >
              <span key={mobileExpanded ? 'full' : 'short'} className="le-text-slide">
                {mobileExpanded ? 'Lyriel x Evol' : 'LE'}
              </span>
            </a>
          </div>

          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: mobileExpanded ? '100px' : '0px', opacity: mobileExpanded ? 1 : 0 }}
          >
            <div className="flex justify-center items-center gap-7 pb-3">
              {items.map(item => {
                const active = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[10px] tracking-[0.22em] uppercase font-[300] transition-colors duration-300"
                    style={{ color: active ? '#111111' : '#AAAAAA' }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="flex justify-center pb-3 border-t border-[#EBEBEB] pt-2.5">
              <span className="text-[9px] tracking-[0.22em] uppercase font-[300] text-[#C8C8C4]">
                A Growing Practice
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
