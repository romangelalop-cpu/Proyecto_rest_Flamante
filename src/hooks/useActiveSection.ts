import { useCallback, useEffect, useRef, useState } from 'react';

const CLICK_LOCK_MS = 1200;

export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T>(ids[0]);
  const lockUntil = useRef(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const select = useCallback((id: T) => {
    lockUntil.current = Date.now() + CLICK_LOCK_MS;
    setActive(id);
  }, []);

  return [active, select] as const;
}
