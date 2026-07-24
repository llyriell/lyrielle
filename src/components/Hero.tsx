import { useEffect, useState, useRef } from 'react';
import { essayBlocks } from '../data/essay';

/*
  NameState machine:
    normal      → "Lyriel Le"
    le-frag     → "Le" fragmenting (horizontal pixel slices), resolves into "Todd"
    todd-frag   → "Todd" glitching in (fragmenting then settling)
    todd-hold   → "Lyriel Todd" displayed cleanly (brief)
    full-frag   → whole "Lyriel Todd" fragment-glitches out
    gone        → hidden
    reborn      → "Lyriel An Le" fades in (opacity only)
*/
type NameState = 'normal' | 'le-frag' | 'todd-frag' | 'todd-hold' | 'full-frag' | 'gone' | 'reborn';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [nameState, setNameState] = useState<NameState>('normal');
  const [descWord, setDescWord] = useState(0);
  const [photoZoomed, setPhotoZoomed] = useState(false);
  const [photoOpacity, setPhotoOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [glitchBlock, setGlitchBlock] = useState<number | null>(null);
  const glitchKey = useRef(0);
  const glitchedBlocks = useRef<Set<number>>(new Set());
  const hasGlitched = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  // Mobile headshot: zoom in when scrolled into view
  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    const el = photoRef.current;
    if (!el) return;
    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = (rect.top + rect.bottom) / 2;
      setPhotoZoomed(center > vh * 0.15 && center < vh * 0.85);
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Headshot anchored at top, travels down with scroll, fades out as you read.
  // Resets when you scroll back to the top — fades out again on the next scroll down.
  useEffect(() => {
    if (isMobile) return;
    const check = () => {
      const hero = document.getElementById('top');
      if (!hero) return;
      const heroTop = hero.getBoundingClientRect().top;
      const heroHeight = hero.offsetHeight;
      // Scroll progress through the hero: 0 at start, 1 at the very end
      const progress = Math.max(0, -heroTop / heroHeight);
      // Hold full opacity for the first 10%, then fade to 0 by 75% through
      const t = 1 - Math.min(1, Math.max(0, (progress - 0.1) / 0.65));
      setPhotoOpacity(t);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [isMobile]);

  // Staged descriptor — Architecture at 800ms, +1s to Ecology (1800ms), +2s to Memory (3800ms)
  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setDescWord(1), 800);
    const t2 = setTimeout(() => setDescWord(2), 1800);
    const t3 = setTimeout(() => setDescWord(3), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const pushTimer = (ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  // === Name glitch sequence ===
  const runGlitch = () => {
    if (hasGlitched.current) return;
    hasGlitched.current = true;
    clearTimers();

    // Le fragments (250ms), then resolves into Todd
    setNameState('le-frag');
    pushTimer(260, () => setNameState('todd-frag'));

    // Todd glitches in (250ms), then holds briefly
    pushTimer(520, () => setNameState('todd-hold'));

    // Hold cut in half again — ~175ms
    pushTimer(695, () => setNameState('full-frag'));

    // Full name glitches out (280ms = slightly shorter), then gone
    pushTimer(975, () => setNameState('gone'));

    // Pause — "someone thinking" (~1700ms gap before reborn)
    pushTimer(2675, () => {
      setNameState('reborn');
      window.dispatchEvent(new CustomEvent('heroReborn'));
    });
  };

  // Desktop: hover trigger; Mobile: scroll trigger
  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      if (window.scrollY > 1 && !hasGlitched.current) {
        runGlitch();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // Desktop only: occasional idle "Le" glitch before hover triggers the full reborn
  useEffect(() => {
    if (isMobile) return;
    let cycleTimer: ReturnType<typeof setTimeout>;
    let resetTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 5000 + Math.random() * 7000;
      cycleTimer = setTimeout(() => {
        if (hasGlitched.current) return;
        if (Math.random() < 0.5) {
          setNameState('le-frag');
          resetTimer = setTimeout(() => {
            if (!hasGlitched.current) setNameState('normal');
          }, 260);
        }
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => { clearTimeout(cycleTimer); clearTimeout(resetTimer); };
  }, [isMobile]);

  const fade = (v: boolean, delay = 0) => ({
    opacity: v ? 1 : 0,
    transition: `opacity 0.8s ease-out ${delay}ms`,
  });

  const renderName = () => {
    switch (nameState) {
      case 'normal':
        return (
          <span onMouseEnter={runGlitch} className="cursor-default">
            Lyriel Le
          </span>
        );
      case 'le-frag':
        return (
          <span>
            Lyriel <span className="pixel-frag">Le</span>
          </span>
        );
      case 'todd-frag':
        return (
          <span>
            Lyriel <span className="pixel-frag">Todd</span>
          </span>
        );
      case 'todd-hold':
        return <span>Lyriel Todd</span>;
      case 'full-frag':
        return <span className="full-frag-out">Lyriel Todd</span>;
      case 'gone':
        return <span style={{ opacity: 0 }}>Lyriel was here</span>;
      case 'reborn':
        return (
          <span>
            <span className="name-reborn-word" style={{ animationDelay: '0ms' }}>Lyriel</span>
            {' '}
            <span className="name-reborn-word" style={{ animationDelay: '700ms' }}>was</span>
            {' '}
            <span className="name-reborn-word" style={{ animationDelay: '1000ms' }}>here</span>
          </span>
        );
    }
  };

  return (
    <section
      id="top"
      className="relative flex flex-col justify-start px-8 md:px-16 pt-24 pb-20 max-w-screen-xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">

        {/* Left — text intro */}
        <div className="md:col-span-7">
          <p style={fade(visible, 200)} className="text-[13px] text-[#AAAAAA] font-[300] tracking-[0.04em] mb-3">
            Hello, I am
          </p>

          <h1
            className="text-[clamp(2.4rem,6vw,4.2rem)] font-[200] text-[#111111] leading-[1.05] tracking-[-0.02em] mb-4 cursor-default"
            style={fade(visible, 0)}
          >
            <span className="sr-only">Lyriel An Le, also known as Lyriel Todd.</span>
            {renderName()}
          </h1>

          {/* Architecture · Ecology · Memory — staged fade-in */}
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#CCCCCC] font-[300] mb-8 min-h-[1.5em]">
            <span style={{ opacity: descWord >= 1 ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>Architecture</span>
            <span style={{ opacity: descWord >= 1 ? 1 : 0, transition: 'opacity 0.4s ease-out' }}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <span style={{ opacity: descWord >= 2 ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>Ecology</span>
            <span style={{ opacity: descWord >= 2 ? 1 : 0, transition: 'opacity 0.4s ease-out' }}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <span style={{ opacity: descWord >= 3 ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>Memory</span>
          </p>

          <div style={fade(visible, 1000)} className="max-w-xl">
            <div className="w-8 h-px bg-botanical mb-6" />
            <div className="space-y-6">
              {essayBlocks.map((block, blockIdx) => (
                <div
                  key={blockIdx}
                  className={`${block.indent ? 'pl-6' : ''} ${block.spacer ? 'mb-7' : ''} ${block.spacerCount === 2 ? 'mb-14' : ''} ${block.divider ? 'border-t border-[#EFEFEC]' : ''}`}
                  onMouseEnter={() => {
                    if (block.glitch && !glitchedBlocks.current.has(blockIdx)) {
                      glitchedBlocks.current.add(blockIdx);
                      glitchKey.current += 1;
                      setGlitchBlock(blockIdx);
                    }
                  }}
                  onMouseLeave={() => setGlitchBlock(null)}
                >
                  <div className={`space-y-[0.15em] relative ${block.blockquote && !block.plain ? 'pl-8 md:pl-10 border-l border-[#D4D4D0]' : block.blockquote ? 'pl-8 md:pl-10' : ''}`}>
                    {block.lines.map((line, i) => (
                      <p
                        key={i}
                        className={`text-[15px] font-[300] leading-[1.85] tracking-wide ${
                          block.blockquote && !block.plain
                            ? 'text-[#999999] italic text-[14px]'
                            : 'text-[#777777]'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                    {block.glitch && glitchBlock === blockIdx && (
                      <span
                        key={glitchKey.current}
                        className="glitch-flash absolute -top-5 right-0 text-[13px] text-[#4D6844]/50 font-[300] tracking-[0.15em] pointer-events-none select-none"
                      >
                        {block.glitch}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — headshot (larger, aligned with left content) */}
        <div
          className="md:col-span-5 flex flex-col items-center md:items-end md:sticky md:top-20 md:self-start"
          style={fade(visible, 1200)}
        >
          <div
            ref={photoRef}
            className="relative w-[240px] md:w-[300px] cursor-default"
            style={{ opacity: photoOpacity }}
            onMouseEnter={() => !isMobile && setPhotoZoomed(true)}
            onMouseLeave={() => !isMobile && setPhotoZoomed(false)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#EBEBE8]">
              <img
                src="/images/headshot.jpg"
                alt="2026 Kaira Looro Finalist Headshot, Lyriel An Le"
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                  photoZoomed ? 'scale-[1.05]' : 'scale-100'
                }`}
              />
            </div>
          </div>

          {/* Headshot caption */}
          <div className="mt-3 max-w-[300px]" />
        </div>
      </div>
    </section>
  );
}
