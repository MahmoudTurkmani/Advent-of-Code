const reader = require('node:fs');
const input = reader.readFileSync('input', 'utf8');

const totalValues = {red: 12, green: 13, blue: 14};
let total = 0;

input.split('\n').forEach((line) => {
	// Initialize the variables for each loop
	let [first, ...rest] = line.split(';');
	let min = {red: 0, green: 0, blue: 0};
	const gameNumber = first.split(':')[0].split(' ')[1];

	// Start looping each round of a game
	let rounds = [...rest, first.split(':')[1]];
	rounds.forEach((round) => {
		if(round !== undefined) {
			const roundValues = round.split(',');
			roundValues.forEach((value) => {
				const [num, col] = value.trim().split(' ');
				if(parseInt(num) > min[col]) {
					min[col] = parseInt(num);
				}
			});
		}
	});

	// If the round is valid, add it to the total
	if(gameNumber !== undefined) {
		let power = min.red * min.green * min.blue;
		total += power;
	}
});

console.log('The total is', total);
