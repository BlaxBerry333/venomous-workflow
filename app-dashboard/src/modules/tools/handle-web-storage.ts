import { isValidJSON } from "./handle-json";

type WetStorageType = "localStorage" | "sessionStorage";

export default function handleWebStorage(storageType: WetStorageType) {
  return {
    get: <T = string>(key: string, options: { defaultValue: T }): T => {
      let storedValue: string | null = null;
      if (storageType === "localStorage") {
        storedValue = localStorage.getItem(key);
      }
      if (storageType === "sessionStorage") {
        storedValue = sessionStorage.getItem(key);
      }
      if (storedValue === null) {
        return options.defaultValue;
      }
      try {
        if (isValidJSON(storedValue)) {
          return JSON.parse(storedValue) as T;
        }
        return storedValue as T;
      } catch (error) {
        throw error as Error;
      }
    },

    set: <T = string>(key: string, data: T): void => {
      const dataToSave = typeof data === "object" ? JSON.stringify(data) : String(data);
      if (storageType === "localStorage") {
        localStorage.setItem(key, dataToSave);
      }
      if (storageType === "sessionStorage") {
        sessionStorage.setItem(key, dataToSave);
      }
    },

    remove: (key: string): void => {
      if (storageType === "localStorage") {
        localStorage.removeItem(key);
      }
      if (storageType === "sessionStorage") {
        sessionStorage.removeItem(key);
      }
    },
  };
}
