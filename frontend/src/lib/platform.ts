type Platform = 'desktop' | 'web' | 'mobile';

export const getPlatform = (): Platform => {
	if (window.__TAURI__) {
		return 'desktop';
	}
	return 'web';
};
