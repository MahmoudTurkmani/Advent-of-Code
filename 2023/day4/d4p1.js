const fs = require('node:fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

// Output Variable
let result = 0;

file.forEach((line) => {
	// Parse the input values
	const remainderOfLine = line.split(':')[1];
	if(remainderOfLine) {
		const winningNumbers = remainderOfLine.trim().split('|')[0].split(' ');
		const lineValues = remainderOfLine.trim().split('|')[1].split(' ');

		// Filter out the empty values
		const win = winningNumbers.filter((x) => x !== '');
		const vals = lineValues.filter((x) => x !== '');
		
		// Declare vars
		let count = 0;
		let cardWorth = 0;
		
		// Check for each value and calculate
		vals.forEach((val) => {
			if(win.includes(val)) {
				cardWorth += (count === 0 ? 1 : cardWorth);
				count++;
			}
		});
		result += cardWorth;
	}
});

console.log(`Your cards are worth: ${result}`);
