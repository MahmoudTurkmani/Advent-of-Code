#include <bits/stdc++.h>

using namespace std;

int main() {
	// Getting the input file
	ifstream input("input");
	string line;

	const regex expression("[0-9]");

	// The output stuff
	int total = 0;

	while(getline(input, line)) {
		string first = "";
		string last = "";
		auto it = line.begin();
		match_results<string::iterator> out;
		while(regex_search(it, line.end(), out, expression)) {
			if(first == "") {
				 first = out[0];
				 last = first;
			} else {
				 last = out[0];
			}

			it = out[0].second;
		}
		total += stoi(first)*10 + stoi(last);	
	}	

	cout << total << endl;

	return 0;
}
