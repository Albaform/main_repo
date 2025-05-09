import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  shouldFetch: boolean,
  fetchNextPage: () => void,
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [shouldFetch, fetchNextPage]);

  return observerRef;
};
