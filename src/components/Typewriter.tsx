import { useEffect, useRef, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  commaPause?: number;
  periodPause?: number;
  onDone?: () => void;
};

export function Typewriter({ text, speed = 40, commaPause = 200, periodPause = 400, onDone }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    idxRef.current = 0;

    const step = () => {
      const i = idxRef.current;
      if (i >= text.length) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      const ch = text[i];
      setDisplayed((d) => d + ch);
      idxRef.current = i + 1;

      let delay = speed;
      if (ch === ',') delay = commaPause;
      else if (ch === '.') delay = periodPause;

      timer = setTimeout(step, delay);
    };

    let timer = setTimeout(step, speed);
    return () => clearTimeout(timer);
  }, [text, speed, commaPause, periodPause]);

  return (
    <span>
      {displayed}
      {!done && <span className="caret-blink">▋</span>}
    </span>
  );
}
