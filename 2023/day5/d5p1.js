const fs = require('node:fs');
// Getting the inputs first
const seeds = fs.readFileSync('seeds', 'utf8').split(' ');

const seedtosoil = fs.readFileSync('seedtosoil', 'utf8').split('\n');
const s2s = convertToMap(seedtosoil);

const soiltofert = fs.readFileSync('soiltofertilizer', 'utf8').split('\n');
const s2f = convertToMap(soiltofert);

const ferttowater = fs.readFileSync('fertilizertowater', 'utf8').split('\n');
const f2w = convertToMap(ferttowater);

const watertolight = fs.readFileSync('watertolight', 'utf8').split('\n');
const w2l = convertToMap(watertolight);

const lighttotemp = fs.readFileSync('lighttotemperature', 'utf8').split('\n');
const l2t = convertToMap(lighttotemp);

const temptohumid = fs.readFileSync('temperaturetohumidity', 'utf8').split('\n');
const t2h = convertToMap(temptohumid);

const humidtoloc = fs.readFileSync('humiditytolocation', 'utf8').split('\n');
const h2l = convertToMap(humidtoloc);

// Convert the items one by one
let curr = [];
let out = seeds[0];

// All the steps till you get destination
for(let x = 0; x < seeds.length; x++) {
	curr.push(getDest(parseInt(seeds[x]), s2s));
	curr[x] = getDest(curr[x], s2f);
	curr[x] = getDest(curr[x], f2w);
	curr[x] = getDest(curr[x], w2l);
	curr[x] = getDest(curr[x], l2t);
	curr[x] = getDest(curr[x], t2h);
	curr[x] = getDest(curr[x], h2l);
	out = out > curr[x] ? curr[x] : out;

}

console.log('Answer is:', out);

// Helper function to map all the items

// Source to dest
function getDest(item, map) {
	// Output container
	let out = item;

	// Need to check every entry in almanac
	for(const [k, v] of map) {
		// If it is in the range, get the dest
		if(item >= k && item < k + v[1]) {
			out = v[0] + item - k;
			break;
		}
	}

	// Return the dest
	return out;
}

// File to map
function convertToMap(original) {
	const out = new Map();
	original.forEach(line => {
		const t = line.split(' ');
		out.set(parseInt(t[1]), [parseInt(t[0]), parseInt(t[2])]);
	});

	return out;
}
