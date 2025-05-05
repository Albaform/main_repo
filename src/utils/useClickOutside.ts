'use client';

import { useEffect, useRef, useState } from 'react';

export function useClickOutside() {
  const [dropdown, setDropdown] = useState(false);

  const outRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (outRef.current && !outRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { outRef, dropdown, setDropdown };
}
