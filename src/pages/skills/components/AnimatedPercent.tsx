import { useEffect, useRef, useState } from "react";

export function AnimatedPercent({ target, animKey }: { target: number; animKey: number }) {
  const [current, setCurrent] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const duration = 700;
    const start = Date.now();
    let frame: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCurrent(Math.round(from + (target - from) * p));
      if (p < 1) frame = requestAnimationFrame(tick);
      else prevRef.current = target;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, animKey]);

  return (
    <span className="pixel-label text-secondary" style={{ fontSize: 12 }}>
      {current}%
    </span>
  );
}
