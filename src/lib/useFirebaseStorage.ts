"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";

type SetValue<T> = Dispatch<SetStateAction<T>>;

type StoredPayload<T> = {
  value: T;
  updatedAt?: unknown;
};

const localOnlyKeys = new Set(["igatesCurrentSession", "preferredLanguage"]);

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

export function useFirebaseStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let unsubscribe = () => {};
    const localValue = readLocalStorage<T>(key);
    if (localValue !== undefined) {
      setStoredValue(localValue);
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
            void setDoc(
              docRef,
              {
                value: initialValue,
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
            setStoredValue(data.value);
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
  }, [initialValue, key]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prevValue) => {
        const nextValue = value instanceof Function ? value(prevValue) : value;
        writeLocalStorage(key, nextValue);
        if (localOnlyKeys.has(key)) {
          return nextValue;
        }
        if (typeof window !== "undefined") {
          try {
            const docRef = getStorageDoc(key);
            if (!docRef) {
              console.warn(`Skipping Firebase write for ${key} (missing configuration).`);
              return nextValue;
            }
            void setDoc(
              docRef,
              {
                value: nextValue,
                updatedAt: serverTimestamp(),
              } satisfies StoredPayload<T>,
              { merge: true }
            ).catch((error) => {
              console.error(`Unable to write ${key} to Firebase`, error);
            });
          } catch (error) {
            console.error(`Unable to write ${key} to Firebase`, error);
          }
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
