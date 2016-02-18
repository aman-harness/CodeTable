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

default_py = """print "Hello World!\""""

default_clojure = """(println "Hello World!")"""

default_csharp = """using System; 
using System.Numerics;
class MyClass {
    static void Main(string[] args) {
        /*
         * Read input from stdin and provide input before running
        var line1 = System.Console.ReadLine().Trim();
        var N = Int32.Parse(line1);
        for (var i = 0; i < N; i++) {
            System.Console.WriteLine("hello world");
        }
        */

        System.Console.WriteLine("Hello World!\n");
    }
}
"""

default_css = """p {
    font-size: 18px;
}
"""

default_go = """package main

import "fmt"

func main() {
        fmt.Println("Hello World")
}
"""

default_haskell = """module Main
  where

main=putStrLn "Hello World!\n"
"""


default_java = """/* IMPORTANT: class must not be public. */

/*
 * uncomment this if you want to read input.
import java.io.BufferedReader;
import java.io.InputStreamReader;
*/

class TestClass {
    public static void main(String args[] ) throws Exception {
        /*
         * Read input from stdin and provide input before running

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int N = Integer.parseInt(line);
        for (int i = 0; i < N; i++) {
            System.out.println("hello world");
        }
        */

        System.out.println("Hello World!");
    }
}
"""
extra_data = []
code_lang = "C"
lang = {
	"C" :			["C", default_c],
	"CPP" :			["CPP", default_cpp],
	"CSHARP" :		["CSHARP", default_csharp],
	"CLOJURE" :		["CLOJURE", default_clojure],
	"CSS" :			["CSS", default_css],
	"HASKELL" :		["HASKELL", default_haskell],
	"JAVA" :		["Java (openjdk 1.7.0_09)", default_java],
	"JAVASCRIPT" :	["JAVASCRIPT", "X"],
	"OBJECTIVEC" :	["OBJECTIVEC", "X"],
	"PERL" :		["PERL", "X"],
	"PHP" :			["PHP (php 5.3.10)", "X"],
	"PYTHON" :		["Python (python 2.7.3)", default_py],
	"R" :			["R (RScript 2.14.1)","X"],
	"RUBY" :		["Ruby (ruby 2.1.1)","X"],
	"RUST" :		["Rust (rustc 1.4.0)","X"],
	"SCALA" :		["Scala (scalac 2.9.1)","X"],
	"Go":			["Go (go 1.4.2)", default_go],
    # using this to pass context in form of json to teomplate
	"Info" :		{"auth": 1, "code_id":	"XXXXX","code_lang": code_lang, "extra": extra_data }
}


lang_to_ext = {
    "C":"c",
    "CPP":"cpp",
    "CSS":"css",
    "HASKELL":"hs",
    "JAVA":"java",
    "JAVASCRIPT":"js",
    "OBJECTIVEC":"m",
    "PERL":"pl",
    "CLOJURE":"clj",
    "PHP":"php",
    "PYTHON":"py",
    "R":"r",
    "RUBY":"rb",
    "RUST":"rs",
    "SCALA":"scala",
    "CSHARP":"cs"
}