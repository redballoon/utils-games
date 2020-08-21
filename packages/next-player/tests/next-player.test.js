jest.mock('../src/random');

const RandomUtil = require('../src/random');

import { NextList, NextPlayer } from '../src/next-player.js';

describe('NextPlayer:', () => {
	describe('NextList Class', () => {
		test('call', () => {

		});
	});

	describe('NextPlayer Class', () => {
		let teamList, teamMap;

		beforeEach(() => {
			teamList = ['red', 'blue', 'yellow'];

			teamMap = {
				blue: [{ userId: 'A' }, { userId: 'C' }, { userId: 'E' }, { userId: 'G' }],
				red: [{ userId: 'B' }, { userId: 'D' }, { userId: 'F' }],
				yellow: [{ userId: '1' }, { userId: '2' }, { userId: '3' }],
			};
		});

		test('when there are 2 teams, test various scenarios', () => {
			let results;

			teamList.length = 2;

			// force blue on initial
			RandomUtil.random.mockImplementationOnce(() => 1);
			// force 'E' on initial for blue team
			RandomUtil.random.mockImplementationOnce(() => 2);
			// force 'D' on initial for red team
			RandomUtil.random.mockImplementationOnce(() => 1);

			const nextPlayer = new NextPlayer(teamList, teamMap);

			results = nextPlayer.next();
			expect(results.team).toEqual('blue');
			expect(results.player.userId).toEqual('E');

			results = nextPlayer.next();
			expect(results.team).toEqual('red');
			expect(results.player.userId).toEqual('D');

			results = nextPlayer.next();
			expect(results.team).toEqual('blue');
			expect(results.player.userId).toEqual('G');

			results = nextPlayer.next();
			expect(results.team).toEqual('red');
			expect(results.player.userId).toEqual('F');

			results = nextPlayer.next();
			expect(results.team).toEqual('blue');
			expect(results.player.userId).toEqual('A');

			results = nextPlayer.next();
			expect(results.team).toEqual('red');
			expect(results.player.userId).toEqual('B');

			// skip player
			results = nextPlayer.skipPlayer();
			expect(results.team).toEqual('red');
			expect(results.player.userId).toEqual('D');

			// skip player
			results = nextPlayer.skipPlayer();
			expect(results.team).toEqual('red');
			expect(results.player.userId).toEqual('F');

			// skip Team
			results = nextPlayer.skipTeam();
			expect(results.team).toEqual('blue');
			expect(results.player.userId).toEqual('C');
		});
	});
});
