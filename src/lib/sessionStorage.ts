/** Mapping of keys to their corresponding data type */
export interface SessionStorage {
	keyset: string[];
}
/** Union of keys which can be used to access the sessionStore */
export type StorageKeys = keyof SessionStorage;

/**
 * Typed wrapper around sessionStorage
 * @param key predefined key
 * @param data data with type matching predefined key
 */
export function setItem<T extends StorageKeys>(key: T, data: SessionStorage[T]) {
	sessionStorage.setItem(key, JSON.stringify(data));
}

/**
 * Typed wrapper around sessionStorage
 * @param key predefined key
 * @param reset wheather to remove the item from the store after access. Default: false
 * @returns data belonging to that key, or null if it was never set
 */
export function getItem<T extends StorageKeys>(key: T, reset = false): SessionStorage[T] | null {
	const data = sessionStorage.getItem(key);
	if (reset) sessionStorage.removeItem(key);
	if (data) return JSON.parse(data) as SessionStorage[T];
	return null;
}
