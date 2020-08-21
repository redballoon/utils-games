import { random } from './random';


/** List */
export const NextList = class NextList {
	constructor(list = []) {
		this.idx = null;
		this.list = list;
	}

	next() {
		if (!this.list.length) {
			throw new Error('NextList: list can not be empty.');
		}

		if (this.idx === null) {
			return this.nextRandom();
		}

		return this.nextSequential();
	}

	nextRandom() {
		const MAX_LENGTH = this.list.length - 1;
		const nextIdx = Math.round(random(0, MAX_LENGTH));

		this.idx = nextIdx;

		return this.value();
	}

	nextSequential() {
		const MAX_LENGTH = this.list.length - 1;
		const idx = this.idx + 1;
		const nextIdx = idx > MAX_LENGTH ? 0 : idx;

		this.idx = nextIdx;

		return this.value();
	}

	value() {
		if (this.idx === null) {
			return '';
		}

		return this.list[this.idx];
	}
}


/** Next Player */
export const NextPlayer = class NextPlayer {
	constructor(teamList = [], teamMap = {}) {
		this.teamList = new NextList(teamList);

		this.teamMap = teamList.reduce((map, team) => {
			map[team] = new NextList(teamMap[team]);
			return map;
		}, {});
	}

	next() {
		const team = this.teamList.next();

		const player = this.teamMap[team].next();

		return { team, player };
	}

	skipTeam() {
		return this.next();
	}

	skipPlayer() {
		const team = this.teamList.value();

		const player = this.teamMap[team].next();

		return { team, player };
	}

	value() {
		const team = this.teamList.value();

		const player = this.teamMap[team].value();

		return { team, player };
	}
}
