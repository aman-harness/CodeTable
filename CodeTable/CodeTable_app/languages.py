# Declare all languages with there extension and name.

# Structure : {'language' : [ details, extension ]}

default_c = '''#include <stdio.h>

int main()
{
    printf("Hello World!\n");
    return 0;
} '''

default_cpp = ''''#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}'''

lang = {
	'c' : ["GCC (4.8.4) ", default_c],
	'C++' : ["G++ (4.8.4)", default_cpp]
}