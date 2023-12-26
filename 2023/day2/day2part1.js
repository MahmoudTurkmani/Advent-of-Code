const reader = require('node:fs');
const input = reader.readFileSync('input', 'utf8');

const totalValues = {red: 12, green: 13, blue: 14};
let total = 0;

input.split('\n').forEach((line) => {
	// Initialize the variables for each loop
	let valid = true;
	let [first, ...rest] = line.split(';');
	const gameNumber = first.split(':')[0].split(' ')[1];
	
	// Start looping each round of a game
	let rounds = [...rest, first.split(':')[1]];
	rounds.forEach((round) => {
		if(round !== undefined) {
			const roundValues = round.split(',');
			roundValues.forEach((value) => {
				const [num, col] = value.trim().split(' ');
				if(parseInt(num) > totalValues[col]) {
					valid = false;
				}
			});
		}
	});

	// If the round is valid, add it to the total
	if(valid && gameNumber !== undefined) {
		total += parseInt(gameNumber);
	}
});

console.log('The total is', total);
