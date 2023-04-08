import { DefaultStoredStats, type StoredStats } from './syllabary';
import { BaseDirectory, exists, writeTextFile, readTextFile } from '@tauri-apps/api/fs';

/** Mapping of keys to their corresponding data type */
export interface SessionStorage {
	keyset: string[] | null;
	stats: StoredStats;
	settings: {
		recentStatCount: number;
	};
}

/** Default values for each key in the sessionStorage */
const SessionStorageDefaults: { [key in keyof SessionStorage]: SessionStorage[key] } = {
	keyset: null,
	stats: DefaultStoredStats,
	settings: {
		recentStatCount: 30
	}
};

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
 * @returns data belonging to that key, or the default value if its never been set
 */
export function getItem<T extends StorageKeys>(key: T, reset = false): SessionStorage[T] {
	const data = sessionStorage.getItem(key);
	if (reset) sessionStorage.removeItem(key);
	if (data) return JSON.parse(data) as SessionStorage[T];
	return SessionStorageDefaults[key];
}

export async function readFromDisk() {
	if (await exists('data.conf', { dir: BaseDirectory.AppData })) {
		const data = JSON.parse(
			await readTextFile('data.conf', { dir: BaseDirectory.AppData })
		) as Partial<SessionStorage>;
		console.log(data);
		Object.entries(data).forEach(([key, value]) => {
			console.log(key);
			console.log(value);
			setItem(key as keyof SessionStorage, value);
		});
	}
}

export async function writeToDisk() {
	const temp = {
		settings: getItem('settings'),
		stats: getItem('stats')
	} as Partial<SessionStorage>;
	await writeTextFile('data.conf', JSON.stringify(temp), { dir: BaseDirectory.AppData });
}
