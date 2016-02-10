# Declare all languages with there extension and name.

# Structure : {"language" : [ details, extension ]}

default_c = """#include <stdio.h>

int main()
{
    printf("Hello World!\\n");
    return 0;
} """

default_cpp = """#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}"""

default_py = """print "Hello World!"""

lang = {
	"C" :			["C", default_c],
	"CPP" :			["CPP", default_cpp],
	"CSHARP" :		["CSHARP", "X"],
	"CLOJURE" :		["CLOJURE", "X"],
	"CSS" :			["CSS", "X"],
	"HASKELL" :		["HASKELL", "X"],
	"JAVA" :		["Java (openjdk 1.7.0_09)", "X"],
	"JAVASCRIPT" :	["JAVASCRIPT", "X"],
	"OBJECTIVEC" :	["OBJECTIVEC", "X"],
	"PERL" :		["PERL", "X"],
	"PHP" :			["PHP (php 5.3.10)", "X"],
	"PYTHON" :		["Python (python 2.7.3)", default_py],
	"R" :			["R (RScript 2.14.1)","X"],
	"RUBY" :		["Ruby (ruby 2.1.1)","X"],
	"RUST" :		["Rust (rustc 1.4.0)","X"],
	"SCALA" :		["Scala (scalac 2.9.1)","X"],
	"Info" :		{"auth": 1, "code_id":	"XXXXX"}
}
