const fs = require('node:fs');

const input = fs.readFileSync('input', 'utf8').split('\n');

// Holds the answer to the question
let counter = 0;

// Will hold the number of duplicate cards
let dupArr = [0];

input.forEach((line) => {
	// Catch empty lines
	if(line === '') {
		return;
	}

	// Iterate over each line
	do {
		// Increase the count as we are passing over a card
		counter++;

		// Parse the line first
		const remainderOfLine = line.split(':')[1];
		const winningNumbers = remainderOfLine.trim().split('|')[0].split(' ');
                const lineValues = remainderOfLine.trim().split('|')[1].split(' ');

                // Filter out the empty values
                const win = winningNumbers.filter((x) => x !== '');
                const vals = lineValues.filter((x) => x !== '');

		let winCount = 0;
		vals.forEach((val) => {
			// Check if the value is a winning number
			if(win.includes(val)) {
				// Add a repeat to the next card in line
				dupArr[winCount+1] === undefined ? dupArr[winCount+1] = 1 : dupArr[winCount+1]++;
				winCount++;
			}
		});
		
		dupArr[0]--;
	} while(dupArr[0] >= 0);

	// Remove the first element in the dupArr
	dupArr = dupArr.splice(1);

	// If the array is left with no elements, insert 0
	if(dupArr.length === 0) {
		dupArr[0] = 0;
	}
});

console.log('The total card count was:', counter);
