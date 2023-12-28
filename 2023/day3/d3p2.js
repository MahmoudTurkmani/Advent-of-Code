const fs = require('node:fs');

const input = fs.readFileSync('input', 'utf8');

const lines = input.split('\n');
const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let twoDim = [];
let total = 0;

lines.forEach((line) => {
	twoDim.push(line.split(''));
});

for(let y = 0; y < twoDim.length; y++) {
	for(let x = 0; x < twoDim[y].length; x++) {
		// Check for the location of a star
		if(twoDim[y][x] === '*') {
			// Perform the validity checking
			checkValidity(y, x);
		}
	}
}

function checkValidity(y, x) {
	// Need to be surrounded by two numbers
	// Check boundaries first
	let below = false;
	
	let firstNumber = 0, secondNumber = 0;
	// Check above the asterisk
	if(y !== 0) {
		// Right above it
		if(validNumbers.includes(twoDim[y-1][x])) {
			firstNumber = getFullNumber(y-1, x);
		}
		// If there was one on top, then we dtr and dtl are part of it
		if(!firstNumber) {
			// Check top left
			if(x !== 0 && validNumbers.includes(twoDim[y-1][x-1])) {
				firstNumber = getFullNumber(y-1, x-1);
			}
			// Check top right
			if(x !== twoDim[y].length-1 && validNumbers.includes(twoDim[y-1][x+1])) {
				if(firstNumber) {
					secondNumber = getFullNumber(y-1, x+1);
				} else {
					firstNumber = getFullNumber(y-1, x+1);
				}
			}
		}
	}

	// Check below
	// NOTE: MIGHT NEED TO CHANGE THIS TO -2 LATER... KEEP AN EYE OUT FOR THIS
	if(y !== twoDim.length-1 && (!firstNumber || !secondNumber)) {
		// Check right below
		if(validNumbers.includes(twoDim[y+1][x])) {
			if(firstNumber) {
				secondNumber = getFullNumber(y+1, x);			
			} else {
				firstNumber = getFullNumber(y+1, x);
			}

			below = true;
		}

		if(!below) {
			// Check the bottom right
			if(x !== twoDim[y].length-1 && validNumbers.includes(twoDim[y+1][x+1])) {
				if(firstNumber) {
					secondNumber = getFullNumber(y+1, x+1);
				} else {
					firstNumber = getFullNumber(y+1, x+1);
				}
			}
			// Check bottom left
			if(x !== 0 && validNumbers.includes(twoDim[y+1][x-1])) {
				if(firstNumber) {
					secondNumber = getFullNumber(y+1, x-1);
				} else {
					firstNumber = getFullNumber(y+1, x-1);
				}
			}
		}
	}

	// Check the left
	if(x !== 0 && validNumbers.includes(twoDim[y][x-1]) && (!firstNumber || !secondNumber)) {
		if(firstNumber) {
			secondNumber = getFullNumber(y, x-1);
		} else {
			firstNumber = getFullNumber(y, x-1);
		}
	}
	// Check the right
	if(x !== twoDim[y].length-1 && validNumbers.includes(twoDim[y][x+1]) && (!firstNumber || !secondNumber)) {
		if(firstNumber) {
			secondNumber = getFullNumber(y, x+1);
		} else {
			firstNumber = getFullNumber(y, x+1);
		}
	}

	// Add to the total
	total += firstNumber*secondNumber;
}

function getFullNumber(y, x) {
	// Assuming a number is found, we need to find the rest of it
	let number = '';
	number += twoDim[y][x];

	let hasLeft = false, hasRight = false;
	// Is there anything to its left?
	if(x !== 0) {
		if(validNumbers.includes(twoDim[y][x-1])) {
			number = twoDim[y][x-1] + number;
			hasLeft = true;
		}
		if(hasLeft && x !== 1 && validNumbers.includes(twoDim[y][x-2])) {
			number = twoDim[y][x-2] + number;
		}
	}

	// Is there anything to its right?
	if(x !== twoDim[y].length-1) {
		if(validNumbers.includes(twoDim[y][x+1])) {
			number += twoDim[y][x+1];
			hasRight = true;
		}
		if(hasRight && x !== twoDim[y].length-2 && validNumbers.includes(twoDim[y][x+2])) {
			number += twoDim[y][x+2];
		}
	}
	return parseInt(number);
}


console.log('The total is: ', total);
