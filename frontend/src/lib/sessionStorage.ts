import { getPlatform } from './platform';
import { DefaultStoredStats, type StoredStats } from './syllabary';
import { BaseDirectory, exists, writeTextFile, readTextFile, createDir } from '@tauri-apps/api/fs';

/** Mapping of keys to their corresponding data type */
export interface SessionStorage {
	keyset: string[] | null;
	stats: StoredStats;
	settings: {
		recentStatCount: number;
		maxRecallDuration: number;
	};
}

const sessionStorageKeys: (keyof SessionStorage)[] = ['keyset', 'settings', 'stats'];

/** Default values for each key in the sessionStorage */
const SessionStorageDefaults: { [key in keyof SessionStorage]: SessionStorage[key] } = {
	keyset: null,
	stats: DefaultStoredStats,
	settings: {
		recentStatCount: 30,
		maxRecallDuration: 5
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

export function resetSession() {
	for (const key of sessionStorageKeys) {
		setItem(key, SessionStorageDefaults[key]);
	}
}

/**
 * Platform: desktop
 */
export async function readFromDisk() {
	if (getPlatform() === 'desktop') {
		if (await exists('data.conf', { dir: BaseDirectory.AppData })) {
			const data = JSON.parse(
				await readTextFile('data.conf', { dir: BaseDirectory.AppData })
			) as Partial<SessionStorage>;
			Object.entries(data).forEach(([key, value]) => {
				setItem(key as keyof SessionStorage, value);
			});
		}
	}
}

/**
 * Platform: desktop
 */
export async function writeToDisk() {
	if (getPlatform() === 'desktop') {
		const temp = {
			settings: getItem('settings'),
			stats: getItem('stats')
		} as Partial<SessionStorage>;
		// BaseDir not found
		if (!(await exists('', { dir: BaseDirectory.AppData }))) {
			await createDir('', { dir: BaseDirectory.AppData, recursive: true });
		}
		await writeTextFile('data.conf', JSON.stringify(temp), { dir: BaseDirectory.AppData });
	}
}
