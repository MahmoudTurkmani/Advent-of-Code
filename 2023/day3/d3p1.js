const fs = require('node:fs');

const input = fs.readFileSync('input', 'utf8');

// split the input into lines to get 2D array
const lines = input.split('\n');
// The list of numbers that we might encounter
const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Split the lines into chars
const twoDim = [];
const queue = [];

const validNums = [];
lines.forEach((line) => {
	twoDim.push(line.split(''));
});

let valid = false;
let total = 0;

function getValid(x, y) {
		if(queue.length === 0) {
			return;
		}
		// We have reached the end of the number
		// Check right and left
		let left = twoDim[x][y-queue.length-1];
		if(left !== undefined && left !== '.' && !validNumbers.includes(left)) {
			valid = true;
		} else if(twoDim[x][y] !== undefined && twoDim[x][y] !== '.' && !validNumbers.includes(twoDim[x][y])) {
			valid = true;
		}

		if(!valid) {
			// Check up and down
			for(let u = 1; u <= queue.length; u++) {
				if(x !== 0 && twoDim[x-1][y-u] !== undefined && twoDim[x-1][y-u] !== '.' && !validNumbers.includes(twoDim[x-1][y-u])) {
					valid = true;
				} else if(x !== twoDim.length-1 && twoDim[x+1][y-u] !== undefined && twoDim[x+1][y-u] !== '.' && !validNumbers.includes(twoDim[x+1][y-u])) {
					valid = true;
				}
			}
		}

		if(!valid) {
			// Check diagonally
			if(x !== 0 && twoDim[x-1][y] !== undefined && twoDim[x-1][y] !== '.' && !validNumbers.includes(twoDim[x-1][y])) { // Top right
				valid = true;
			} else if(x !== twoDim.length-1 && twoDim[x+1][y] !== undefined && twoDim[x+1][y] !== '.' && !validNumbers.includes(twoDim[x+1][y])) { // Bottom right
				valid = true;
			} else if(x !== 0 && twoDim[x-1][y-queue.length-1] !== undefined && twoDim[x-1][y-queue.length-1] !== '.' && !validNumbers.includes(twoDim[x-1][y-queue.length-1])) { // Top left
				valid = true;
			} else if(x !== twoDim.length-1 && twoDim[x+1][y-queue.length-1] !== undefined && twoDim[x+1][y-queue.length-1] !== '.' && !validNumbers.includes(twoDim[x+1][y-queue.length-1])) { // Bottom left
				valid = true;
			}
		}
		// If any of these is valid, start to add the number
		if(valid) {
			queue.reverse();
			let finalNumber = '';
			
			// Get the queue number
			while(queue.length !== 0) {
				finalNumber += queue.pop();
			}
				
			// Add it to the total
			total += parseInt(finalNumber);
				
		}
		// Reset
		valid = false;
		queue.length = 0;

}

// Run on all the items
for(let x = 0; x < twoDim.length; x++) {
	for(let y = 0; y < twoDim[x].length; y++) {
		// Check if it's a number
		if(validNumbers.includes(twoDim[x][y])) {
			// Add it to the Queue
			queue.push(twoDim[x][y]);
		}
		// Check for validity
		if(!validNumbers.includes(twoDim[x][y]) || y === twoDim[x].length -1){
			getValid(x, y);
		}

	}
}

console.log('The total is: ', total);
