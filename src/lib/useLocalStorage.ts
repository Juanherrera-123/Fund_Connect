"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const readStoredValue = <T,>(key: string, initialValue: T): T => {
  if (typeof window === "undefined") return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage`, error);
    return initialValue;
  }
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue<T>(key, initialValue)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(key);
    if (existing === null) {
      try {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      } catch (error) {
        console.error(`Unable to seed ${key} in localStorage`, error);
      }
    } else {
      setStoredValue(readStoredValue(key, initialValue));
    }
  }, [initialValue, key]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prevValue) => {
        const nextValue = value instanceof Function ? value(prevValue) : value;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
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
