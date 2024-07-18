type Platform = 'desktop' | 'web' | 'mobile';

export const getPlatform = (): Platform => {
	if (window.__TAURI__) {
		return 'desktop';
	}
	return 'web';
};

export const getContainerHeight = () => {
	const platform = getPlatform();
	return platform === 'web' ? '' : platform === 'desktop' ? 'h-[calc(100vh-30px)]' : '';
};
