import { useUpdatingRef } from "localboast";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseDelayOptions {
  delay: number;
  immediateIf?: (value: unknown) => boolean;
}
export const useDelayedValue = <T>(value: T, options: UseDelayOptions) => {
  const [storedValue, setStoredValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastValueRef = useRef(value);
  const immediateIfRef = useUpdatingRef(options.immediateIf);

  useEffect(() => {
    if (lastValueRef.current !== value) {
      const update = () => {
        setStoredValue(value);
        timeoutRef.current = undefined;
        lastValueRef.current = value;
      };
      if (immediateIfRef.current && immediateIfRef.current(value)) {
        update();
      } else {
        timeoutRef.current = setTimeout(update, options.delay);
      }
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, options.delay, immediateIfRef]);

  const setImmediate = useCallback((immediateValue: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStoredValue(immediateValue);
    lastValueRef.current = immediateValue;
  }, []);

  return [storedValue, setImmediate] as const;
};

export default useDelayedValue;
