import { getPlatform } from './platform';
import { DefaultStoredStats, type StoredStats } from './syllabary';
import { BaseDirectory, exists, writeTextFile, readTextFile, createDir } from '@tauri-apps/api/fs';

/** Mapping of keys to their corresponding data type */
export interface Storage {
	keyset: string[] | null;
	stats: StoredStats;
	settings: {
		recentStatCount: number;
		maxRecallDuration: number;
	};
}

const storageKeys: (keyof Storage)[] = ['keyset', 'settings', 'stats'];

/** desktop: sessionStorage, other: localStorage (on desktop we write to disk and only need temporary storage) */
const storage = getPlatform() === 'desktop' ? sessionStorage : localStorage;

/** Default values for each key in the sessionStorage */
const StorageDefaults: { [key in keyof Storage]: Storage[key] } = {
	keyset: null,
	stats: DefaultStoredStats,
	settings: {
		recentStatCount: 30,
		maxRecallDuration: 5
	}
};

/** Union of keys which can be used to access the browser's store */
export type StorageKeys = keyof Storage;

/**
 * Typed wrapper around browser's storage api
 * @param key predefined key
 * @param data data with type matching predefined key
 */
export function setItem<T extends StorageKeys>(key: T, data: Storage[T]) {
	storage.setItem(key, JSON.stringify(data));
}

/**
 * Typed wrapper around browser's storage api
 * @param key predefined key
 * @param reset wheather to remove the item from the store after access. Default: false
 * @returns data belonging to that key, or the default value if its never been set
 */
export function getItem<T extends StorageKeys>(key: T, reset = false): Storage[T] {
	const data = storage.getItem(key);
	if (reset) storage.removeItem(key);
	if (data) return JSON.parse(data) as Storage[T];
	return StorageDefaults[key];
}

export function resetSession() {
	for (const key of storageKeys) {
		setItem(key, StorageDefaults[key]);
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
			) as Partial<Storage>;
			Object.entries(data).forEach(([key, value]) => {
				setItem(key as keyof Storage, value);
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
		} as Partial<Storage>;
		// BaseDir not found
		if (!(await exists('', { dir: BaseDirectory.AppData }))) {
			await createDir('', { dir: BaseDirectory.AppData, recursive: true });
		}
		await writeTextFile('data.conf', JSON.stringify(temp), { dir: BaseDirectory.AppData });
	}
}
