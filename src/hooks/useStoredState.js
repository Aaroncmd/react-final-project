import { useEffect, useState } from "react";

export default function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Failed to read ${key} from localStorage`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to store ${key} in localStorage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
