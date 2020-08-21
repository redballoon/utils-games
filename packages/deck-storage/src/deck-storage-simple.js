import debug from 'debug';

import Storage from 'node-persist';


// namespace logger
const logger = debug('DP-Utils:Deck-Storage:Simple');


export const SimpleStorage = class SimpleStorage {
	constructor({ dir }) {
		logger('trace:', 'directory:', dir);

		if (!dir) {
			throw new Error('requires dir param');
		}

		this.initilized = false;
		this.storage = null;
		this.dir = dir;
	}

	async setup() {
		logger('trace:', 'setup:...');

		try {
			await Storage.init({ dir: this.dir });
		} catch(error) {
			logger('error:', 'setup: failed to initilize.', error);
			throw error;
		}

		this.initilized = true;

		return true;
	}

	async getKeys() {
		if (!SimpleStorage.cache.keys) {
			logger('debug:', 'getKeys: not cached, will HIT...');
			SimpleStorage.cache.keys = await Storage.keys();
		}

		return SimpleStorage.cache.keys;
	}

	async getItem(key) {
		return await Storage.getItem(key);
	}
}

SimpleStorage.cache = {};
