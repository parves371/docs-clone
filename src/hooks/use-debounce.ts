import { useCallback, useEffect, useRef } from "react";

export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
  const timeOutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export function useDebounceTwo<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ); // Only delay needs to be in dependencies
}
