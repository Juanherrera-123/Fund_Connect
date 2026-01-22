"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";

type SetValue<T> = Dispatch<SetStateAction<T>>;

type StoredPayload<T> = {
  value: T;
  updatedAt?: unknown;
};

const localOnlyKeys = new Set(["igatesCurrentSession", "preferredLanguage"]);

const deepEqual = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== "object") return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((value, index) => deepEqual(value, b[index]));
  }
  if (Array.isArray(b)) return false;
  const aRecord = a as Record<string, unknown>;
  const bRecord = b as Record<string, unknown>;
  const aKeys = Object.keys(aRecord);
  const bKeys = Object.keys(bRecord);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => deepEqual(aRecord[key], bRecord[key]));
};

const readLocalStorage = <T,>(key: string): T | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return undefined;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Unable to read ${key} from localStorage`, error);
    return undefined;
  }
};

const writeLocalStorage = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to write ${key} to localStorage`, error);
  }
};

const getStorageDoc = (key: string) => {
  const db = getFirestoreDb();
  if (!db) return null;
  return doc(db, "appStorage", key);
};

export function useFirebaseStorage<T>(
  key: string | null | undefined,
  initialValue: T
): [T, SetValue<T>] {
  const initialValueRef = useRef(initialValue);
  const isHydratedRef = useRef(false);
  const lastPersistedRef = useRef<T | undefined>(undefined);
  const [storedValue, setStoredValue] = useState<T>(initialValueRef.current);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!key) {
      isHydratedRef.current = false;
      lastPersistedRef.current = undefined;
      setStoredValue((prev) =>
        deepEqual(prev, initialValueRef.current) ? prev : initialValueRef.current
      );
      return;
    }

    isHydratedRef.current = false;
    lastPersistedRef.current = undefined;
    let unsubscribe = () => {};
    const localValue = readLocalStorage<T>(key);
    if (localValue !== undefined) {
      isHydratedRef.current = true;
      lastPersistedRef.current = localValue;
      setStoredValue((prev) => (deepEqual(prev, localValue) ? prev : localValue));
    }

    if (localOnlyKeys.has(key)) {
      return () => unsubscribe();
    }

    try {
      const docRef = getStorageDoc(key);
      if (!docRef) {
        return;
      }
      unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            isHydratedRef.current = true;
            lastPersistedRef.current = initialValueRef.current;
            setStoredValue((prev) =>
              deepEqual(prev, initialValueRef.current) ? prev : initialValueRef.current
            );
            void setDoc(
              docRef,
              {
                value: initialValueRef.current,
                updatedAt: serverTimestamp(),
              } satisfies StoredPayload<T>,
              { merge: true }
            ).catch((error) => {
              console.error(`Unable to seed ${key} in Firebase`, error);
            });
            return;
          }

          const data = snapshot.data() as StoredPayload<T> | undefined;
          if (data && "value" in data) {
            isHydratedRef.current = true;
            lastPersistedRef.current = data.value;
            setStoredValue((prev) => (deepEqual(prev, data.value) ? prev : data.value));
          }
        },
        (error) => {
          console.error(`Unable to subscribe to ${key} in Firebase`, error);
        }
      );
    } catch (error) {
      console.error(`Unable to read ${key} from Firebase`, error);
    }

    return () => unsubscribe();
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!key) return;
    if (!isHydratedRef.current) return;
    if (deepEqual(storedValue, lastPersistedRef.current)) return;

    writeLocalStorage(key, storedValue);
    lastPersistedRef.current = storedValue;

    if (localOnlyKeys.has(key)) {
      return;
    }
    try {
      const docRef = getStorageDoc(key);
      if (!docRef) {
        console.warn(`Skipping Firebase write for ${key} (missing configuration).`);
        return;
      }
      void setDoc(
        docRef,
        {
          value: storedValue,
          updatedAt: serverTimestamp(),
        } satisfies StoredPayload<T>,
        { merge: true }
      ).catch((error) => {
        console.error(`Unable to write ${key} to Firebase`, error);
      });
    } catch (error) {
      console.error(`Unable to write ${key} to Firebase`, error);
    }
  }, [key, storedValue]);

  const setValue: SetValue<T> = useCallback((value) => {
    setStoredValue((prevValue) => {
      const nextValue = value instanceof Function ? value(prevValue) : value;
      return deepEqual(prevValue, nextValue) ? prevValue : nextValue;
    });
  }, []);

  return [storedValue, setValue];
}
