export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn('Unable to read storage key', key, error);
      return null;
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Unable to persist storage key', key, error);
    }
  },
  remove(key: string) {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Unable to remove storage key', key, error);
    }
  },
};
