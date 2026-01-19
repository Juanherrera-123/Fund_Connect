"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Unable to read ${key} from localStorage`, error);
    }
  }, [key]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prevValue) => {
        const nextValue = value instanceof Function ? value(prevValue) : value;
        if (typeof window !== "undefined") {
          try {
            if (nextValue === null) {
              window.localStorage.removeItem(key);
            } else {
              window.localStorage.setItem(key, JSON.stringify(nextValue));
            }
          } catch (error) {
            console.error(`Unable to write ${key} to localStorage`, error);
          }
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
