#include <bits/stdc++.h>

using namespace std;

int main() {
	// Numbers as letters and their equivalent
	map<string, string> values = {
		{"one", "1"}, {"two", "2"}, {"three", "3"}, {"four", "4"},
		{"five", "5"}, {"six", "6"}, {"seven", "7"}, {"eight", "8"}, 
		{"nine", "9"}
	};
	
	// Getting the input file
	ifstream input("input");
	//ifstream input("testinput");
	string line;

	const regex expression("one|two|three|four|five|six|seven|eight|nine|[0-9]");

	// The output stuff
	int total = 0;

	while(getline(input, line)) {
		// Some variables
		string first = "";
		string last = "";
		auto it = line.begin();
		match_results<string::iterator> out;
		// Match regex until no more
		while(regex_search(it, line.end(), out, expression)) {
			// Check if key is in the array
			bool inArr = values.find(out[0]) != values.end();

			if(first.empty()) {
				// Assign to both if first occurrence
				first = inArr ? values.at(out[0]) : out[0];
				last = first;
			} else {
				// Assign to last if not
				last = inArr ? values.at(out[0]) : out[0];
			}
			
			// In the case where it is a word, need to go back one character
			// This is to account for overlapping words like eightwo or oneight
			it = inArr ? out[0].second-1 : out[0].second;
		}
		//cout << first + last << endl;
		total += stoi(first+last);
		//cout << total << endl;	
	}	

	cout << total << endl;

	return 0;
}
