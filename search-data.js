window.SEARCH_INDEX = [
  {
    "file": "arrays-part-ii.html",
    "title": "33 Arrays Part II",
    "headings": [
      {
        "id": "type-qualifiers-for-arrays-in-parameter-lists",
        "title": "33.1 Type Qualifiers for Arrays in Parameter Lists"
      },
      {
        "id": "static-for-arrays-in-parameter-lists",
        "title": "33.2 static for Arrays in Parameter Lists"
      },
      {
        "id": "equivalent-initializers",
        "title": "33.3 Equivalent Initializers"
      }
    ],
    "text": "Beej's Guide to C Programming 33 Arrays Part II We’re going to go over a few extra misc things this chapter concerning arrays. Type qualifiers with array parameters The static keyword with array parameters Partial multi-dimensional array initializers They’re not super-commonly seen, but we’ll peek at them since they’re part of the newer spec. 33.1 Type Qualifiers for Arrays in Parameter Lists If you recall from earlier, these two things are equivalent in function parameter lists: int func ( int * p ) {...} int func ( int p []) {...} And you might also recall that you can add type qualifiers to a pointer variable like so: int * const p ; int * volatile p ; int * const volatile p ; // etc. But how can we do that when we’re using array notation in your parameter list? Turns out it goes in the brackets. And you can put the optional count after. The two following lines are equivalent: int func ( int * const volatile p ) {...} int func ( int p [ const volatile ]) {...} int func ( int p [ const volatile 10 ]) {...} If you have a multidimensional array, you need to put the type qualifiers in the first set of brackets. 33.2 static for Arrays in Parameter Lists Similarly, you can use the key"
  },
  {
    "file": "arrays.html",
    "title": "6 Arrays",
    "headings": [
      {
        "id": "easy-example",
        "title": "6.1 Easy Example"
      },
      {
        "id": "getting-the-length-of-an-array",
        "title": "6.2 Getting the Length of an Array"
      },
      {
        "id": "array-initializers",
        "title": "6.3 Array Initializers"
      },
      {
        "id": "out-of-bounds",
        "title": "6.4 Out of Bounds!"
      },
      {
        "id": "multidimensional-arrays",
        "title": "6.5 Multidimensional Arrays"
      },
      {
        "id": "arrays-and-pointers",
        "title": "6.6 Arrays and Pointers"
      },
      {
        "id": "getting-a-pointer-to-an-array",
        "title": "6.6.1 Getting a Pointer to an Array"
      },
      {
        "id": "passing1darrays",
        "title": "6.6.2 Passing Single Dimensional Arrays to Functions"
      },
      {
        "id": "changing-arrays-in-functions",
        "title": "6.6.3 Changing Arrays in Functions"
      },
      {
        "id": "passing-multidimensional-arrays-to-functions",
        "title": "6.6.4 Passing Multidimensional Arrays to Functions"
      }
    ],
    "text": "Beej's Guide to C Programming 6 Arrays “Should array indices start at 0 or 1? My compromise of 0.5 was rejected without, I thought, proper consideration.” —Stan Kelly-Bootle, computer scientist Luckily, C has arrays. I mean, I know it’s considered a low-level language 54 but it does at least have the concept of arrays built-in. And since a great many languages drew inspiration from C’s syntax, you’re probably already familiar with using [ and ] for declaring and using arrays. But C only barely has arrays! As we’ll find out later, arrays are just syntactic sugar in C—they’re actually all pointers and stuff deep down. Freak out! But for now, let’s just use them as arrays. Phew . 6.1 Easy Example Let’s just crank out an example: #include &lt;stdio.h&gt; int main ( void ) { int i ; float f [ 4 ]; // Declare an array of 4 floats f [ 0 ] = 3.14159 ; // Indexing starts at 0, of course. f [ 1 ] = 1.41421 ; f [ 2 ] = 1.61803 ; f [ 3 ] = 2.71828 ; // Print them all out: for ( i = 0 ; i &lt; 4 ; i ++) { printf ( &quot; %f\\n &quot; , f [ i ]); } } When you declare an array, you have to give it a size. And the size has to be fixed 55 . In the above example, we made an array of 4 float s. The va"
  },
  {
    "file": "bitwise-operations.html",
    "title": "24 Bitwise Operations",
    "headings": [
      {
        "id": "bitwise-and-or-xor-and-not",
        "title": "24.1 Bitwise AND, OR, XOR, and NOT"
      },
      {
        "id": "bitwise-shift",
        "title": "24.2 Bitwise Shift"
      }
    ],
    "text": "Beej's Guide to C Programming 24 Bitwise Operations These numeric operations effectively allow you to manipulate individual bits in variables, fitting since C is such a low-level langauge 152 . If you’re not familiar with bitwise operations, Wikipedia has a good bitwise article 153 . 24.1 Bitwise AND, OR, XOR, and NOT For each of these, the usual arithmetic conversions take place on the operands (which in this case must be an integer type), and then the appropriate bitwise operation is performed. Operation Operator Example AND &amp; a = b &amp; c OR | a = b | c XOR ^ a = b ^ c NOT ~ a = ~c Note how they’re similar to the Boolean operators &amp;&amp; and || . These have assignment shorthand variants similar to += and -= : Operator Example Longhand equivalent &amp;= a &amp;= c a = a &amp; c |= a |= c a = a | c ^= a ^= c a = a ^ c 24.2 Bitwise Shift For these, the integer promotions are performed on each operand (which must be an integer type) and then a bitwise shift is executed. The type of the result is the type of the promoted left operand. New bits are filled with zeros, with a possible exception noted in the implementation-defined behavior, below. Operation Operator Example Shif"
  },
  {
    "file": "chapter-atomics.html",
    "title": "40 Atomics",
    "headings": [
      {
        "id": "testing-for-atomic-support",
        "title": "40.1 Testing for Atomic Support"
      },
      {
        "id": "atomic-variables",
        "title": "40.2 Atomic Variables"
      },
      {
        "id": "synchronization",
        "title": "40.3 Synchronization"
      },
      {
        "id": "acquire-and-release",
        "title": "40.4 Acquire and Release"
      },
      {
        "id": "sequential-consistency",
        "title": "40.5 Sequential Consistency"
      },
      {
        "id": "atomic-assignments-and-operators",
        "title": "40.6 Atomic Assignments and Operators"
      },
      {
        "id": "library-functions-that-automatically-synchronize",
        "title": "40.7 Library Functions that Automatically Synchronize"
      },
      {
        "id": "atomic-type-specifier-qualifier",
        "title": "40.8 Atomic Type Specifier, Qualifier"
      },
      {
        "id": "lock-free-atomic",
        "title": "40.9 Lock-Free Atomic Variables"
      },
      {
        "id": "signal-handlers-and-lock-free-atomics",
        "title": "40.9.1 Signal Handlers and Lock-Free Atomics"
      },
      {
        "id": "atomic-flags",
        "title": "40.10 Atomic Flags"
      },
      {
        "id": "atomic-structs-and-unions",
        "title": "40.11 Atomic structs and unions"
      },
      {
        "id": "atomic-pointers",
        "title": "40.12 Atomic Pointers"
      },
      {
        "id": "memory-order",
        "title": "40.13 Memory Order"
      },
      {
        "id": "sequential-consistency-1",
        "title": "40.13.1 Sequential Consistency"
      },
      {
        "id": "acquire",
        "title": "40.13.2 Acquire"
      },
      {
        "id": "release",
        "title": "40.13.3 Release"
      },
      {
        "id": "consume",
        "title": "40.13.4 Consume"
      },
      {
        "id": "acquirerelease",
        "title": "40.13.5 Acquire/Release"
      },
      {
        "id": "relaxed",
        "title": "40.13.6 Relaxed"
      },
      {
        "id": "fences",
        "title": "40.14 Fences"
      },
      {
        "id": "references",
        "title": "40.15 References"
      }
    ],
    "text": "Beej's Guide to C Programming 40 Atomics “They tried and failed, all of them?” “Oh, no.” She shook her head. “They tried and died.” —Paul Atreides and The Reverend Mother Gaius Helen Mohiam, Dune This is one of the more challenging aspects of multithreading with C. But we’ll try to take it easy. Basically, I’ll talk about the more straightforward uses of atomic variables, what they are, and how they work, etc. And I’ll mention some of the more insanely-complex paths that are available to you. But I won’t go down those paths. Not only am I barely qualified to even write about them, but I figure if you know you need them, you already know more than I do. But there are some weird things out here even in the basics. So buckle your seatbelts, everyone, ‘cause Kansas is goin’ bye-bye. 40.1 Testing for Atomic Support Atomics are an optional feature. There’s a macro __STDC_NO_ATOMICS__ that’s 1 if you don’t have atomics. That macro might not exist pre-C11, so we should test the language version with __STDC_VERSION__ 209 . #if __STDC_VERSION__ &lt; 201112L || __STDC_NO_ATOMICS__ == 1 #define HAS_ATOMICS 0 #else #define HAS_ATOMICS 1 #endif If those tests pass, then you can safely include &l"
  },
  {
    "file": "characters-and-strings-ii.html",
    "title": "21 Characters and Strings II",
    "headings": [
      {
        "id": "escape-sequences",
        "title": "21.1 Escape Sequences"
      },
      {
        "id": "frequently-used-escapes",
        "title": "21.1.1 Frequently-used Escapes"
      },
      {
        "id": "rarely-used-escapes",
        "title": "21.1.2 Rarely-used Escapes"
      },
      {
        "id": "numeric-escapes",
        "title": "21.1.3 Numeric Escapes"
      }
    ],
    "text": "Beej's Guide to C Programming 21 Characters and Strings II We’ve talked about how char types are actually just small integer types… but it’s the same for a character in single quotes. But a string in double quotes is type const char * . Turns out there are few more types of strings and characters, and it leads down one of the most infamous rabbit holes in the language: the whole multibyte/wide/Unicode/localization thingy. We’re going to peer into that rabbit hole, but not go in. …Yet! 21.1 Escape Sequences We’re used to strings and characters with regular letters, punctuation, and numbers: char * s = &quot;Hello!&quot; ; char t = &#39;c&#39; ; But what if we want some special characters in there that we can’t type on the keyboard because they don’t exist (e.g. “€”), or even if we want a character that’s a single quote? We clearly can’t do this: char t = &#39; &#39; &#39;; To do these things, we use something called escape sequences . These are the backslash character ( \\ ) followed by another character. The two (or more) characters together have special meaning. For our single quote character example, we can put an escape (that is, \\ ) in front of the central single quote to solve "
  },
  {
    "file": "complex-numbers.html",
    "title": "36 Complex Numbers",
    "headings": [
      {
        "id": "complex-types",
        "title": "36.1 Complex Types"
      },
      {
        "id": "assigning-complex-numbers",
        "title": "36.2 Assigning Complex Numbers"
      },
      {
        "id": "constructing-deconstructing-and-printing",
        "title": "36.3 Constructing, Deconstructing, and Printing"
      },
      {
        "id": "complex-arithmetic-and-comparisons",
        "title": "36.4 Complex Arithmetic and Comparisons"
      },
      {
        "id": "complex-math",
        "title": "36.5 Complex Math"
      },
      {
        "id": "trigonometry-functions",
        "title": "36.5.1 Trigonometry Functions"
      },
      {
        "id": "exponential-and-logarithmic-functions",
        "title": "36.5.2 Exponential and Logarithmic Functions"
      },
      {
        "id": "power-and-absolute-value-functions",
        "title": "36.5.3 Power and Absolute Value Functions"
      },
      {
        "id": "manipulation-functions",
        "title": "36.5.4 Manipulation Functions"
      }
    ],
    "text": "Beej's Guide to C Programming 36 Complex Numbers A tiny primer on Complex numbers 185 stolen directly from Wikipedia: A complex number is a number that can be expressed in the form \\(a+bi\\) , where \\(a\\) and \\(b\\) are real numbers [i.e. floating point types in C], and \\(i\\) represents the imaginary unit, satisfying the equation \\(i^2=−1\\) . Because no real number satisfies this equation, \\(i\\) is called an imaginary number. For the complex number \\(a+bi\\) , \\(a\\) is called the real part , and \\(b\\) is called the imaginary part . But that’s as far as I’m going to go. We’ll assume that if you’re reading this chapter, you know what a complex number is and what you want to do with them. And all we need to cover is C’s faculties for doing so. Turns out, though, that complex number support in a compiler is an optional feature. Not all compliant compilers can do it. And the ones that do, might do it to various degrees of completeness. You can test if your system supports complex numbers with: #ifdef __STDC_NO_COMPLEX__ #error Complex numbers not supported! #endif Furthermore, there is a macro that indicates adherence to the ISO 60559 (IEEE 754) standard for floating point math with comple"
  },
  {
    "file": "date-and-time-functionality.html",
    "title": "38 Date and Time Functionality",
    "headings": [
      {
        "id": "quick-terminology-and-information",
        "title": "38.1 Quick Terminology and Information"
      },
      {
        "id": "date-types",
        "title": "38.2 Date Types"
      },
      {
        "id": "initialization-and-conversion-between-types",
        "title": "38.3 Initialization and Conversion Between Types"
      },
      {
        "id": "converting-time_t-to-struct-tm",
        "title": "38.3.1 Converting time_t to struct tm"
      },
      {
        "id": "converting-struct-tm-to-time_t",
        "title": "38.3.2 Converting struct tm to time_t"
      },
      {
        "id": "formatted-date-output",
        "title": "38.4 Formatted Date Output"
      },
      {
        "id": "more-resolution-with-timespec_get",
        "title": "38.5 More Resolution with timespec_get()"
      },
      {
        "id": "differences-between-times",
        "title": "38.6 Differences Between Times"
      }
    ],
    "text": "Beej's Guide to C Programming 38 Date and Time Functionality “Time is an illusion. Lunchtime doubly so.” —Ford Prefect, The Hitchhikers Guide to the Galaxy This isn’t too complex, but it can be a little intimidating at first, both with the different types available and the way we can convert between them. Mix in GMT (UTC) and local time and we have all the Usual Fun ™ one gets with times and dates. And of course never forget the golden rule of dates and times: Never attempt to write your own date and time functionality. Only use what the library gives you. Time is too complex for mere mortal programmers to handle correctly. Seriously, we all owe a point to everyone who worked on any date and time library, so put that in your budget. 38.1 Quick Terminology and Information Just a couple quick terms in case you don’t have them down. UTC : Coordinated Universal Time is a universally 191 agreed upon, absolute time. Everyone on the planet thinks it’s the same time right now in UTC… even though they have different local times. GMT : Greenwich Mean Time, effectively the same as UTC 192 . You probably want to say UTC, or “universal time”. If you’re talking specifically about the GMT time zo"
  },
  {
    "file": "enumerated-types-enum.html",
    "title": "22 Enumerated Types: enum",
    "headings": [
      {
        "id": "behavior-of-enum",
        "title": "22.1 Behavior of enum"
      },
      {
        "id": "numbering",
        "title": "22.1.1 Numbering"
      },
      {
        "id": "trailing-commas",
        "title": "22.1.2 Trailing Commas"
      },
      {
        "id": "scope-1",
        "title": "22.1.3 Scope"
      },
      {
        "id": "style",
        "title": "22.1.4 Style"
      },
      {
        "id": "your-enum-is-a-type",
        "title": "22.2 Your enum is a Type"
      }
    ],
    "text": "Beej's Guide to C Programming 22 Enumerated Types: enum C offers us another way to have constant integer values by name: enum . For example: enum { ONE = 1 , TWO = 2 }; printf ( &quot; %d %d &quot; , ONE , TWO ); // 1 2 In some ways, it can be better—or different—than using a #define . Key differences: enum s can only be integer types. #define can define anything at all. enum s are often shown by their symbolic identifier name in a debugger. #define d numbers just show as raw numbers which are harder to know the meaning of while debugging. Since they’re integer types, they can be used any place integers can be used, including in array dimensions and case statements. Let’s tear into this more. 22.1 Behavior of enum 22.1.1 Numbering enum s are automatically numbered unless you override them. They start at 0 , and autoincrement up from there, by default: enum { SHEEP , // Value is 0 WHEAT , // Value is 1 WOOD , // Value is 2 BRICK , // Value is 3 ORE // Value is 4 }; printf ( &quot; %d %d\\n &quot; , SHEEP , BRICK ); // 0 3 You can force particular integer values, as we saw earlier: enum { X = 2 , Y = 18 , Z =- 2 }; Duplicates are not a problem: enum { X = 2 , Y = 2 , Z = 2 }; if value"
  },
  {
    "file": "exiting-a-program.html",
    "title": "28 Exiting a Program",
    "headings": [
      {
        "id": "normal-exits",
        "title": "28.1 Normal Exits"
      },
      {
        "id": "returning-from-main",
        "title": "28.1.1 Returning From main()"
      },
      {
        "id": "exit",
        "title": "28.1.2 exit()"
      },
      {
        "id": "setting-up-exit-handlers-with-atexit",
        "title": "28.1.3 Setting Up Exit Handlers with atexit()"
      },
      {
        "id": "quicker-exits-with-quick_exit",
        "title": "28.2 Quicker Exits with quick_exit()"
      },
      {
        "id": "nuke-it-from-orbit-_exit",
        "title": "28.3 Nuke it from Orbit: _Exit()"
      },
      {
        "id": "exiting-sometimes-assert",
        "title": "28.4 Exiting Sometimes: assert()"
      },
      {
        "id": "abnormal-exit-abort",
        "title": "28.5 Abnormal Exit: abort()"
      }
    ],
    "text": "Beej's Guide to C Programming 28 Exiting a Program Turns out there are a lot of ways to do this, and even ways to set up “hooks” so that a function runs when a program exits. In this chapter we’ll dive in and check them out. We already covered the meaning of the exit status code in the Exit Status section, so jump back there and review if you have to. All the functions in this section are in &lt;stdlib.h&gt; . 28.1 Normal Exits We’ll start with the regular ways to exit a program, and then jump to some of the rarer, more esoteric ones. When you exit a program normally, all open I/O streams are flushed and temporary files removed. Basically it’s a nice exit where everything gets cleaned up and handled. It’s what you want to do almost all the time unless you have reasons to do otherwise. 28.1.1 Returning From main() If you’ve noticed, main() has a return type of int … and yet I’ve rarely, if ever, been return ing anything from main() at all. This is because for main() only (and I can’t stress enough this special case only applies to main() and no other functions anywhere) has an implicit return 0 if you fall off the end. You can explicitly return from main() any time you want, and som"
  },
  {
    "file": "file-inputoutput.html",
    "title": "9 File Input/Output",
    "headings": [
      {
        "id": "the-file-data-type",
        "title": "9.1 The FILE* Data Type"
      },
      {
        "id": "reading-text-files",
        "title": "9.2 Reading Text Files"
      },
      {
        "id": "end-of-file-eof",
        "title": "9.3 End of File: EOF"
      },
      {
        "id": "reading-a-line-at-a-time",
        "title": "9.3.1 Reading a Line at a Time"
      },
      {
        "id": "formatted-input",
        "title": "9.4 Formatted Input"
      },
      {
        "id": "writing-text-files",
        "title": "9.5 Writing Text Files"
      },
      {
        "id": "binary-file-io",
        "title": "9.6 Binary File I/O"
      },
      {
        "id": "struct-and-number-caveats",
        "title": "9.6.1 struct and Number Caveats"
      }
    ],
    "text": "Beej's Guide to C Programming 9 File Input/Output We’ve already seen some examples of I/O with printf() for doing I/O at the console. But we’ll push those concepts a little farther this chapter. 9.1 The FILE* Data Type When we do any kind of I/O in C, we do so through a piece of data that you get in the form of a FILE* type. This FILE* holds all the information needed to communicate with the I/O subsystem about which file you have open, where you are in the file, and so on. The spec refers to these as streams , i.e. a stream of data from a file or from any source. I’m going to use “files” and “streams” interchangeably, but really you should think of a “file” as a special case of a “stream”. There are other ways to stream data into a program than just reading from a file. We’ll see in a moment how to go from having a filename to getting an open FILE* for it, but first I want to mention three streams that are already open for you and ready for use. FILE* name Description stdin Standard Input, generally the keyboard by default stdout Standard Output, generally the screen by default stderr Standard Error, generally the screen by default, as well We’ve actually been using these implicit"
  },
  {
    "file": "fixed-width-integer-types.html",
    "title": "37 Fixed Width Integer Types",
    "headings": [
      {
        "id": "the-bit-sized-types",
        "title": "37.1 The Bit-Sized Types"
      },
      {
        "id": "maximum-integer-size-type",
        "title": "37.2 Maximum Integer Size Type"
      },
      {
        "id": "using-fixed-size-constants",
        "title": "37.3 Using Fixed Size Constants"
      },
      {
        "id": "limits-of-fixed-size-integers",
        "title": "37.4 Limits of Fixed Size Integers"
      },
      {
        "id": "format-specifiers",
        "title": "37.5 Format Specifiers"
      }
    ],
    "text": "Beej's Guide to C Programming 37 Fixed Width Integer Types C has all those small, bigger, and biggest integer types like int and long and all that. And you can look in the section on limits to see what the largest int is with INT_MAX and so on. How big are those types? That is, how many bytes do they take up? We could use sizeof to get that answer. But what if I wanted to go the other way? What if I needed a type that was exactly 32 bits (4 bytes) or at least 16 bits or somesuch? How can we declare a type that’s a certain size? The header &lt;stdint.h&gt; gives us a way. 37.1 The Bit-Sized Types For both signed and unsigned integers, we can specify a type that is a certain number of bits, with some caveats, of course. And there are three main classes of these types (in these examples, the N would be replaced by a certain number of bits): Integers of exactly a certain size ( intN_t ) Integers that are at least a certain size ( int_leastN_t ) Integers that are at least a certain size and are as fast as possible ( int_fastN_t ) 189 How much faster is fast ? Definitely maybe some amount faster. Probably. The spec doesn’t say how much faster, just that they’ll be the fastest on this arc"
  },
  {
    "file": "foreword.html",
    "title": "1 Foreword",
    "headings": [
      {
        "id": "audience",
        "title": "1.1 Audience"
      },
      {
        "id": "how-to-read-this-book",
        "title": "1.2 How to Read This Book"
      },
      {
        "id": "platform-and-compiler",
        "title": "1.3 Platform and Compiler"
      },
      {
        "id": "official-homepage",
        "title": "1.4 Official Homepage"
      },
      {
        "id": "email-policy",
        "title": "1.5 Email Policy"
      },
      {
        "id": "mirroring",
        "title": "1.6 Mirroring"
      },
      {
        "id": "note-for-translators",
        "title": "1.7 Note for Translators"
      },
      {
        "id": "copyright-and-distribution",
        "title": "1.8 Copyright and Distribution"
      },
      {
        "id": "dedication",
        "title": "1.9 Dedication"
      }
    ],
    "text": "Beej's Guide to C Programming 1 Foreword C is not a big language, and it is not well served by a big book. –Brian W. Kernighan, Dennis M. Ritchie No point in wasting words here, folks, let’s jump straight into the C code: E (( ck ? main (( z ?( stat ( M ,&amp; t )? P += a + &#39;{&#39; ? 0 : 3 : execv ( M , k ), a = G , i = P , y = G &amp; 255 , sprintf ( Q , y / &#39;@&#39; - 3 ? A (* L ( V (% d +% d )+% d , 0 ) And they lived happily ever after. The End. What’s this? You say something’s still not clear about this whole C programming language thing? Well, to be quite honest, I’m not even sure what the above code does. It’s a snippet from one of the entries in the 2001 International Obfuscated C Code Contest 1 , a wonderful competition wherein the entrants attempt to write the most unreadable C code possible, with often surprising results. The bad news is that if you’re a beginner in this whole thing, all C code you see probably looks obfuscated! The good news is, it’s not going to be that way for long. What we’ll try to do over the course of this guide is lead you from complete and utter sheer lost confusion on to the sort of enlightened bliss that can only be obtained through pur"
  },
  {
    "file": "function-specifiers-alignment-specifiersoperators.html",
    "title": "41 Function Specifiers, Alignment Specifiers/Operators",
    "headings": [
      {
        "id": "function-specifiers",
        "title": "41.1 Function Specifiers"
      },
      {
        "id": "inline-for-speedmaybe",
        "title": "41.1.1 inline for Speed—Maybe"
      },
      {
        "id": "noreturn",
        "title": "41.1.2 noreturn and _Noreturn"
      },
      {
        "id": "alignment-specifiers-and-operators",
        "title": "41.2 Alignment Specifiers and Operators"
      },
      {
        "id": "alignas-and-_alignas",
        "title": "41.2.1 alignas and _Alignas"
      },
      {
        "id": "alignof-and-_alignof",
        "title": "41.2.2 alignof and _Alignof"
      },
      {
        "id": "memalignment-function",
        "title": "41.3 memalignment() Function"
      }
    ],
    "text": "Beej's Guide to C Programming 41 Function Specifiers, Alignment Specifiers/Operators These don’t see a heck of a lot of use in my experience, but we’ll cover them here for the sake of completeness. 41.1 Function Specifiers When you declare a function, you can give the compiler a couple tips about how the functions could or will be used. This enables or encourages the compiler to make certain optimizations. 41.1.1 inline for Speed—Maybe You can declare a function to be inline like this: static inline int add ( int x , int y ) { return x + y ; } This is meant to encourage the compiler to make this function call as fast as possible. And, historically, one way to do this was inlining , which means that the body of the function would be embedded in its entirety where the call was made. This would avoid all the overhead of setting up the function call and tearing it down at the expense of larger code size as the function was copied all over the place instead of being reused. The quick-and-dirty things to remember are: You probably don’t need to use inline for speed. Modern compilers know what’s best. If you do use it for speed, use it with file scope, i.e. static inline . This avoids the"
  },
  {
    "file": "functions.html",
    "title": "4 Functions",
    "headings": [
      {
        "id": "passvalue",
        "title": "4.1 Passing by Value"
      },
      {
        "id": "prototypes",
        "title": "4.2 Function Prototypes"
      },
      {
        "id": "empty-parameter-lists",
        "title": "4.3 Empty Parameter Lists"
      }
    ],
    "text": "Beej's Guide to C Programming 4 Functions “Sir, not in an environment such as this. That’s why I’ve also been programmed for over thirty secondary functions that—” —C3PO, before being rudely interrupted, reporting a now-unimpressive number of additional functions, Star Wars script Very much like other languages you’re used to, C has the concept of functions . Functions can accept a variety of arguments and return a value. One important thing, though: the arguments and return value types are predeclared—because that’s how C likes it! Let’s take a look at a function. This is a function that takes an int as an argument, and returns an int . #include &lt;stdio.h&gt; int plus_one ( int n ) // The &quot;definition&quot; { return n + 1 ; } The int before the plus_one indicates the return type. The int n indicates that this function takes one int argument, stored in parameter n . A parameter is a special type of local variable into which the arguments are copied. I’m going to drive home the point that the arguments are copied into the parameters, here. Lots of things in C are easier to understand if you know that the parameter is a copy of the argument, not the argument itself. More on tha"
  },
  {
    "file": "goto.html",
    "title": "31 goto",
    "headings": [
      {
        "id": "a-simple-example",
        "title": "31.1 A Simple Example"
      },
      {
        "id": "labeled-continue",
        "title": "31.2 Labeled continue"
      },
      {
        "id": "bailing-out",
        "title": "31.3 Bailing Out"
      },
      {
        "id": "labeled-break",
        "title": "31.4 Labeled break"
      },
      {
        "id": "multi-level-cleanup",
        "title": "31.5 Multi-level Cleanup"
      },
      {
        "id": "tail-call-optimization",
        "title": "31.6 Tail Call Optimization"
      },
      {
        "id": "restarting-interrupted-system-calls",
        "title": "31.7 Restarting Interrupted System Calls"
      },
      {
        "id": "goto-and-thread-preemption",
        "title": "31.8 goto and Thread Preemption"
      },
      {
        "id": "goto-and-variable-scope",
        "title": "31.9 goto and Variable Scope"
      },
      {
        "id": "goto-and-variable-length-arrays",
        "title": "31.10 goto and Variable-Length Arrays"
      }
    ],
    "text": "Beej's Guide to C Programming 31 goto The goto statement is universally revered and can be here presented without contest. Just kidding! Over the years, there has been a lot of back-and-forth over whether or not (often not) goto is considered harmful 176 . In this programmer’s opinion, you should use whichever constructs leads to the best code, factoring in maintainability and speed. And sometimes this might be goto ! In this chapter, we’ll see how goto works in C, and then check out some of the common cases where it is used 177 . 31.1 A Simple Example In this example, we’re going to use goto to skip a line of code and jump to a label . The label is the identifier that can be a goto target—it ends with a colon ( : ). #include &lt;stdio.h&gt; int main ( void ) { printf ( &quot;One \\n &quot; ); printf ( &quot;Two \\n &quot; ); goto skip_3 ; printf ( &quot;Three \\n &quot; ); skip_3 : printf ( &quot;Five! \\n &quot; ); } The output is: One Two Five! goto sends execution jumping to the specified label, skipping everything in between. You can jump forward or backward with goto . infinite_loop : print ( &quot;Hello, world! \\n &quot; ); goto infinite_loop ; Labels are skipped over during exe"
  },
  {
    "file": "hello-world.html",
    "title": "2 Hello, World!",
    "headings": [
      {
        "id": "what-to-expect-from-c",
        "title": "2.1 What to Expect from C"
      },
      {
        "id": "hello-world-1",
        "title": "2.2 Hello, World!"
      },
      {
        "id": "compilation-details",
        "title": "2.3 Compilation Details"
      },
      {
        "id": "building-with-gcc",
        "title": "2.4 Building with gcc"
      },
      {
        "id": "building-with-clang",
        "title": "2.5 Building with clang"
      },
      {
        "id": "building-from-ides",
        "title": "2.6 Building from IDEs"
      },
      {
        "id": "c-versions",
        "title": "2.7 C Versions"
      }
    ],
    "text": "Beej's Guide to C Programming 2 Hello, World! 2.1 What to Expect from C “Where do these stairs go?” “They go up.” —Ray Stantz and Peter Venkman, Ghostbusters C is a low-level language. It didn’t use to be. Back in the day when people carved punch cards out of granite, C was an incredible way to be free of the drudgery of lower-level languages like assembly 19 . But now in these modern times, current-generation languages offer all kinds of features that didn’t exist in 1972 when C was invented. This means C is a pretty basic language with not a lot of features. It can do anything , but it can make you work for it. So why would we even use it today? As a learning tool: not only is C a venerable piece of computing history, but it is connected to the bare metal 20 in a way that present-day languages are not. When you learn C, you learn about how software interfaces with computer memory at a low level. There are no seatbelts. You’ll write software that crashes, I assure you. And that’s all part of the fun! As a useful tool: C still is used for certain applications, such as building operating systems 21 or in embedded systems 22 . (Though the Rust 23 programming language is eyeing both t"
  },
  {
    "file": "incomplete-types.html",
    "title": "35 Incomplete Types",
    "headings": [
      {
        "id": "use-case-self-referential-structures",
        "title": "35.1 Use Case: Self-Referential Structures"
      },
      {
        "id": "incomplete-type-error-messages",
        "title": "35.2 Incomplete Type Error Messages"
      },
      {
        "id": "other-incomplete-types",
        "title": "35.3 Other Incomplete Types"
      },
      {
        "id": "use-case-arrays-in-header-files",
        "title": "35.4 Use Case: Arrays in Header Files"
      },
      {
        "id": "completing-incomplete-types",
        "title": "35.5 Completing Incomplete Types"
      }
    ],
    "text": "Beej's Guide to C Programming 35 Incomplete Types It might surprise you to learn that this builds without error: extern int a []; int main ( void ) { struct foo * x ; union bar * y ; enum baz * z ; } We never gave a size for a . And we have pointers to struct s foo , bar , and baz that never seem to be declared anywhere. And the only warnings I get are that x , y , and z are unused. These are examples of incomplete types . An incomplete type is a type the size (i.e. the size you’d get back from sizeof ) for which is not known. Another way to think of it is a type that you haven’t finished declaring. You can have a pointer to an incomplete type, but you can’t dereference it or use pointer arithmetic on it. And you can’t sizeof it. So what can you do with it? 35.1 Use Case: Self-Referential Structures I only know of one real use case: forward references to struct s or union s with self-referential or co-dependent structures. (I’m going to use struct for the rest of these examples, but they all apply equally to union s, as well.) Let’s do the classic example first. But before I do, know this! As you declare a struct , the struct is incomplete until the closing brace is reached! struct"
  },
  {
    "file": "locale-and-internationalization.html",
    "title": "26 Locale and Internationalization",
    "headings": [
      {
        "id": "setting-the-localization-quick-and-dirty",
        "title": "26.1 Setting the Localization, Quick and Dirty"
      },
      {
        "id": "getting-the-monetary-locale-settings",
        "title": "26.2 Getting the Monetary Locale Settings"
      },
      {
        "id": "monetary-digit-grouping",
        "title": "26.2.1 Monetary Digit Grouping"
      },
      {
        "id": "separators-and-sign-position",
        "title": "26.2.2 Separators and Sign Position"
      },
      {
        "id": "example-values",
        "title": "26.2.3 Example Values"
      },
      {
        "id": "localization-specifics",
        "title": "26.3 Localization Specifics"
      }
    ],
    "text": "Beej's Guide to C Programming 26 Locale and Internationalization Localization is the process of making your app ready to work well in different locales (or countries). As you might know, not everyone uses the same character for decimal points or for thousands separators… or for currency. These locales have names, and you can select one to use. For example, a US locale might write a number like: 100,000.00 Whereas in Brazil, the same might be written with the commas and decimal points swapped: 100.000,00 Makes it easier to write your code so it ports to other nationalities with ease! Well, sort of. Turns out C only has one built-in locale, and it’s limited. The spec really leaves a lot of ambiguity here; it’s hard to be completely portable. But we’ll do our best! 26.1 Setting the Localization, Quick and Dirty For these calls, include &lt;locale.h&gt; . There is basically one thing you can portably do here in terms of declaring a specific locale. This is likely what you want to do if you’re going to do locale anything: setlocale ( LC_ALL , &quot;&quot; ); // Use this environment&#39;s locale for everything You’ll want to call that so that the program gets initialized with your curren"
  },
  {
    "file": "manual-memory-allocation.html",
    "title": "12 Manual Memory Allocation",
    "headings": [
      {
        "id": "allocating-and-deallocating-malloc-and-free",
        "title": "12.1 Allocating and Deallocating, malloc() and free()"
      },
      {
        "id": "error-checking",
        "title": "12.2 Error Checking"
      },
      {
        "id": "allocating-space-for-an-array",
        "title": "12.3 Allocating Space for an Array"
      },
      {
        "id": "an-alternative-calloc",
        "title": "12.4 An Alternative: calloc()"
      },
      {
        "id": "changing-allocated-size-with-realloc",
        "title": "12.5 Changing Allocated Size with realloc()"
      },
      {
        "id": "reading-in-lines-of-arbitrary-length",
        "title": "12.5.1 Reading in Lines of Arbitrary Length"
      },
      {
        "id": "realloc-with-null",
        "title": "12.5.2 realloc() with NULL"
      },
      {
        "id": "aligned-allocations",
        "title": "12.6 Aligned Allocations"
      }
    ],
    "text": "Beej's Guide to C Programming 12 Manual Memory Allocation This is one of the big areas where C likely diverges from languages you already know: manual memory management . Other languages uses reference counting, garbage collection, or other means to determine when to allocate new memory for some data—and when to deallocate it when no variables refer to it. And that’s nice. It’s nice to be able to not worry about it, to just drop all the references to an item and trust that at some point the memory associated with it will be freed. But C’s not like that, entirely. Of course, in C, some variables are automatically allocated and deallocated when they come into scope and leave scope. We call these automatic variables. They’re your average run-of-the-mill block scope “local” variables. No problem. But what if you want something to persist longer than a particular block? This is where manual memory management comes into play. You can tell C explicitly to allocate for you a certain number of bytes that you can use as you please. And these bytes will remain allocated until you explicitly free that memory 90 . It’s important to free the memory you’re done with! If you don’t, we call that a "
  },
  {
    "file": "multifile-projects.html",
    "title": "17 Multifile Projects",
    "headings": [
      {
        "id": "includes-func-protos",
        "title": "17.1 Includes and Function Prototypes"
      },
      {
        "id": "dealing-with-repeated-includes",
        "title": "17.2 Dealing with Repeated Includes"
      },
      {
        "id": "static-and-extern",
        "title": "17.3 static and extern"
      },
      {
        "id": "compiling-with-object-files",
        "title": "17.4 Compiling with Object Files"
      }
    ],
    "text": "Beej's Guide to C Programming 17 Multifile Projects So far we’ve been looking at toy programs that for the most part fit in a single file. But complex C programs are made up of many files that are all compiled and linked together into a single executable. In this chapter we’ll check out some of the common patterns and practices for putting together larger projects. 17.1 Includes and Function Prototypes A really common situation is that some of your functions are defined in one file, and you want to call them from another. This actually works out of the box with a warning… let’s first try it and then look at the right way to fix the warning. To compile them, you’ll need to specify all the sources on the command line: # output file source files # v v # |----| |---------| gcc -o foo foo.c bar.c In that example, foo.c and bar.c get built into the executable named foo . For these examples, we’ll put the filename as the first comment in the source. Let’s take a look at the source file bar.c : // File bar.c int add ( int x , int y ) { return x + y ; } And the file foo.c with main in it: // File foo.c #include &lt;stdio.h&gt; int main ( void ) { printf ( &quot; %d\\n &quot; , add ( 2 , 3 ))"
  },
  {
    "file": "multithreading.html",
    "title": "39 Multithreading",
    "headings": [
      {
        "id": "background",
        "title": "39.1 Background"
      },
      {
        "id": "things-you-can-do",
        "title": "39.2 Things You Can Do"
      },
      {
        "id": "data-races-and-the-standard-library",
        "title": "39.3 Data Races and the Standard Library"
      },
      {
        "id": "creating-and-waiting-for-threads",
        "title": "39.4 Creating and Waiting for Threads"
      },
      {
        "id": "detaching-threads",
        "title": "39.5 Detaching Threads"
      },
      {
        "id": "thread-local-data",
        "title": "39.6 Thread Local Data"
      },
      {
        "id": "thread-local",
        "title": "39.6.1 _Thread_local Storage-Class"
      },
      {
        "id": "another-option-thread-specific-storage",
        "title": "39.6.2 Another Option: Thread-Specific Storage"
      },
      {
        "id": "mutex",
        "title": "39.7 Mutexes"
      },
      {
        "id": "different-mutex-types",
        "title": "39.7.1 Different Mutex Types"
      },
      {
        "id": "condition-variables",
        "title": "39.8 Condition Variables"
      },
      {
        "id": "timed-condition-wait",
        "title": "39.8.1 Timed Condition Wait"
      },
      {
        "id": "broadcast-wake-up-all-waiting-threads",
        "title": "39.8.2 Broadcast: Wake Up All Waiting Threads"
      },
      {
        "id": "running-a-function-one-time",
        "title": "39.9 Running a Function One Time"
      }
    ],
    "text": "Beej's Guide to C Programming 39 Multithreading C11 introduced, formally, multithreading to the C language. It’s very eerily similar to POSIX threads 197 , if you’ve ever used those. And if you’ve not, no worries. We’ll talk it through. Do note, however, that I’m not intending this to be a full-blown classic multithreading how-to 198 ; you’ll have to pick up a different very thick book for that, specifically. Sorry! Threading is an optional feature. If a C11+ compiler defines __STDC_NO_THREADS__ , threads will not be present in the library. Why they decided to go with a negative sense in that macro is beyond me, but there we are. You can test for it like this: #ifdef __STDC_NO_THREADS__ #error I need threads to build this program! #endif Also, you might need to specify certain linker options when building. In the case of Unix-likes, try appending a -lpthreads to the end of the command line to link the pthreads library 199 : gcc -std = c11 -o foo foo.c -lpthreads If you’re getting linker errors on your system, it could be because the appropriate library wasn’t included. 39.1 Background Threads are a way to have all those shiny CPU cores you paid for do work for you in the same progr"
  },
  {
    "file": "pointers-iii-pointers-to-pointers-and-more.html",
    "title": "23 Pointers III: Pointers to Pointers and More",
    "headings": [
      {
        "id": "pointers-to-pointers",
        "title": "23.1 Pointers to Pointers"
      },
      {
        "id": "pointer-pointers-and-const",
        "title": "23.1.1 Pointer Pointers and const"
      },
      {
        "id": "multibyte-values",
        "title": "23.2 Multibyte Values"
      },
      {
        "id": "the-null-pointer-and-zero",
        "title": "23.3 The NULL Pointer and Zero"
      },
      {
        "id": "pointers-as-integers",
        "title": "23.4 Pointers as Integers"
      },
      {
        "id": "casting-pointers-to-other-pointers",
        "title": "23.5 Casting Pointers to other Pointers"
      },
      {
        "id": "ptr_differences",
        "title": "23.6 Pointer Differences"
      },
      {
        "id": "pointers-to-functions",
        "title": "23.7 Pointers to Functions"
      }
    ],
    "text": "Beej's Guide to C Programming 23 Pointers III: Pointers to Pointers and More Here’s where we cover some intermediate and advanced pointer usage. If you don’t have pointers down well, review the previous chapters on pointers and pointer arithmetic before starting on this stuff. 23.1 Pointers to Pointers If you can have a pointer to a variable, and a variable can be a pointer, can you have a pointer to a variable that it itself a pointer? Yes! This is a pointer to a pointer, and it’s held in variable of type pointer-pointer. Before we tear into that, I want to try for a gut feel for how pointers to pointers work. Remember that a pointer is just a number. It’s a number that represents an index in computer memory, typically one that holds a value we’re interested in for some reason. That pointer, which is a number, has to be stored somewhere. And that place is memory, just like everything else 141 . But because it’s stored in memory, it must have an index it’s stored at, right? The pointer must have an index in memory where it is stored. And that index is a number. It’s the address of the pointer. It’s a pointer to the pointer. Let’s start with a regular pointer to an int , back from t"
  },
  {
    "file": "pointers.html",
    "title": "5 Pointers—Cower In Fear!",
    "headings": [
      {
        "id": "ptmem",
        "title": "5.1 Memory and Variables"
      },
      {
        "id": "pttypes",
        "title": "5.2 Pointer Types"
      },
      {
        "id": "deref",
        "title": "5.3 Dereferencing"
      },
      {
        "id": "ptpass",
        "title": "5.4 Passing Pointers as Arguments"
      },
      {
        "id": "the-null-pointer",
        "title": "5.5 The NULL Pointer"
      },
      {
        "id": "a-note-on-declaring-pointers",
        "title": "5.6 A Note on Declaring Pointers"
      },
      {
        "id": "sizeof-and-pointers",
        "title": "5.7 sizeof and Pointers"
      }
    ],
    "text": "Beej's Guide to C Programming 5 Pointers—Cower In Fear! “How do you get to Carnegie Hall?” “Practice!” —20th-century joke of unknown origin Pointers are one of the most feared things in the C language. In fact, they are the one thing that makes this language challenging at all. But why? Because they, quite honestly, can cause electric shocks to come up through the keyboard and physically weld your arms permanently in place, cursing you to a life at the keyboard in this language from the 70s! Really? Well, not really. I’m just trying to set you up for success. Depending on what language you came from, you might already understand the concept of references , where a variable refers to an object of some type. This is very much the same, except we have to be more explicit with C about when we’re talking about the reference or the thing it refers to. 5.1 Memory and Variables Computer memory holds data of all kinds, right? It’ll hold float s, int s, or whatever you have. To make memory easy to cope with, each byte of memory is identified by an integer. These integers increase sequentially as you move up through memory 45 . You can think of it as a bunch of numbered boxes, where each box "
  },
  {
    "file": "pointers2.html",
    "title": "11 Pointers II: Arithmetic",
    "headings": [
      {
        "id": "pointer-arithmetic",
        "title": "11.1 Pointer Arithmetic"
      },
      {
        "id": "adding-to-pointers",
        "title": "11.1.1 Adding to Pointers"
      },
      {
        "id": "changing-pointers",
        "title": "11.1.2 Changing Pointers"
      },
      {
        "id": "subtracting-pointers",
        "title": "11.1.3 Subtracting Pointers"
      },
      {
        "id": "arraypointerequiv",
        "title": "11.2 Array/Pointer Equivalence"
      },
      {
        "id": "arraypointer-equivalence-in-function-calls",
        "title": "11.2.1 Array/Pointer Equivalence in Function Calls"
      },
      {
        "id": "void-pointers",
        "title": "11.3 void Pointers"
      }
    ],
    "text": "Beej's Guide to C Programming 11 Pointers II: Arithmetic Time to get more into it with a number of new pointer topics! If you’re not up to speed with pointers, check out the first section in the guide on the matter . 11.1 Pointer Arithmetic Turns out you can do math on pointers, notably addition and subtraction. But what does it mean when you do that? In short, if you have a pointer to a type, adding one to the pointer moves to the next item of that type directly after it in memory. It’s important to remember that as we move pointers around and look at different places in memory, we need to make sure that we’re always pointing to a valid place in memory before we dereference. If we’re off in the weeds and we try to see what’s there, the behavior is undefined and a crash is a common result. This is a little chicken-and-eggy with Array/Pointer Equivalence, below , but we’re going to give it a shot, anyway. 11.1.1 Adding to Pointers First, let’s take an array of numbers. int a [ 5 ] = { 11 , 22 , 33 , 44 , 55 }; Then let’s get a pointer to the first element in that array: int a [ 5 ] = { 11 , 22 , 33 , 44 , 55 }; int * p = &amp; a [ 0 ]; // Or &quot;int *p = a;&quot; works just as wel"
  },
  {
    "file": "scope.html",
    "title": "13 Scope",
    "headings": [
      {
        "id": "block-scope",
        "title": "13.1 Block Scope"
      },
      {
        "id": "where-to-define-variables",
        "title": "13.1.1 Where To Define Variables"
      },
      {
        "id": "variable-hiding",
        "title": "13.1.2 Variable Hiding"
      },
      {
        "id": "file-scope",
        "title": "13.2 File Scope"
      },
      {
        "id": "for-loop-scope",
        "title": "13.3 for-loop Scope"
      },
      {
        "id": "a-note-on-function-scope",
        "title": "13.4 A Note on Function Scope"
      }
    ],
    "text": "Beej's Guide to C Programming 13 Scope Scope is all about what variables are visible in what contexts. 13.1 Block Scope This is the scope of almost all the variables devs define. It includes what other languages might call “function scope”, i.e. variables that are declared inside functions. The basic rule is that if you’ve declared a variable in a block delimited by squirrelly braces, the scope of that variable is that block. If there’s a block inside a block, then variables declared in the inner block are local to that block, and cannot be seen in the outer scope. Once a variable’s scope ends, that variable can no longer be referenced, and you can consider its value to be gone into the great bit bucket 92 in the sky. An example with nested scope: #include &lt;stdio.h&gt; int main ( void ) { int a = 12 ; // Local to outer block, but visible in inner block if ( a == 12 ) { int b = 99 ; // Local to inner block, not visible in outer block printf ( &quot; %d %d\\n &quot; , a , b ); // OK: &quot;12 99&quot; } printf ( &quot; %d\\n &quot; , a ); // OK, we&#39;re still in a&#39;s scope printf ( &quot; %d\\n &quot; , b ); // ILLEGAL, out of b&#39;s scope } 13.1.1 Where To Define Variables Ano"
  },
  {
    "file": "setjmp-longjmp.html",
    "title": "34 Long Jumps with setjmp, longjmp",
    "headings": [
      {
        "id": "using-setjmp-and-longjmp",
        "title": "34.1 Using setjmp and longjmp"
      },
      {
        "id": "pitfalls",
        "title": "34.2 Pitfalls"
      },
      {
        "id": "the-values-of-local-variables",
        "title": "34.2.1 The Values of Local Variables"
      },
      {
        "id": "how-much-state-is-saved",
        "title": "34.2.2 How Much State is Saved?"
      },
      {
        "id": "you-cant-name-anything-setjmp",
        "title": "34.2.3 You Can’t Name Anything setjmp"
      },
      {
        "id": "you-cant-setjmp-in-a-larger-expression",
        "title": "34.2.4 You Can’t setjmp() in a Larger Expression"
      },
      {
        "id": "when-cant-you-longjmp",
        "title": "34.2.5 When Can’t You longjmp()?"
      },
      {
        "id": "you-cant-pass-0-to-longjmp",
        "title": "34.2.6 You Can’t Pass 0 to longjmp()"
      },
      {
        "id": "longjmp-and-variable-length-arrays",
        "title": "34.2.7 longjmp() and Variable Length Arrays"
      }
    ],
    "text": "Beej's Guide to C Programming 34 Long Jumps with setjmp , longjmp We’ve already seen goto , which jumps in function scope. But longjmp() allows you to jump back to an earlier point in execution, back to a function that called this one. There are a lot of limitations and caveats, but this can be a useful function for bailing out from deep in the call stack back up to an earlier state. In my experience, this is very rarely-used functionality. 34.1 Using setjmp and longjmp The dance we’re going to do here is to basically put a bookmark in execution with setjmp() . Later on, we’ll call longjmp() and it’ll jump back to the earlier point in execution where we set the bookmark with setjmp() . And it can do this even if you’ve called subfunctions. Here’s a quick demo where we call into functions a couple levels deep and then bail out of it. We’re going to use a file scope variable env to keep the state of things when we call setjmp() so we can restore them when we call longjmp() later. This is the variable in which we remember our “place”. The variable env is of type jmp_buf , an opaque type declared in &lt;setjmp.h&gt; . #include &lt;stdio.h&gt; #include &lt;setjmp.h&gt; jmp_buf env ; voi"
  },
  {
    "file": "signal-handling.html",
    "title": "29 Signal Handling",
    "headings": [
      {
        "id": "what-are-signals",
        "title": "29.1 What Are Signals?"
      },
      {
        "id": "handling-signals-with-signal",
        "title": "29.2 Handling Signals with signal()"
      },
      {
        "id": "writing-signal-handlers",
        "title": "29.3 Writing Signal Handlers"
      },
      {
        "id": "what-can-we-actually-do",
        "title": "29.4 What Can We Actually Do?"
      },
      {
        "id": "friends-dont-let-friends-signal",
        "title": "29.5 Friends Don’t Let Friends signal()"
      }
    ],
    "text": "Beej's Guide to C Programming 29 Signal Handling Before we start, I’m just going to advise you to generally ignore this entire chapter and use your OS’s (very likely) superior signal handling functions. Unix-likes have the sigaction() family of functions, and Windows has… whatever it does 172 . With that out of the way, what are signals? 29.1 What Are Signals? A signal is raised on a variety of external events. Your program can be configured to be interrupted to handle the signal, and, optionally, continue where it left off once the signal has been handled. Think of it like a function that’s automatically called when one of these external events occurs. What are these events? On your system, there are probably a lot of them, but in the C spec there are just a few: Signal Description SIGABRT Abnormal termination—what happens when abort() is called. SIGFPE Floating point exception. SIGILL Illegal instruction. SIGINT Interrupt—usually the result of CTRL-C being hit. SIGSEGV “Segmentation Violation”: invalid memory access. SIGTERM Termination requested. You can set up your program to ignore, handle, or allow the default action for each of these by using the signal() function. 29.2 Hand"
  },
  {
    "file": "strings.html",
    "title": "7 Strings",
    "headings": [
      {
        "id": "string-literals",
        "title": "7.1 String Literals"
      },
      {
        "id": "string-variables",
        "title": "7.2 String Variables"
      },
      {
        "id": "string-variables-as-arrays",
        "title": "7.3 String Variables as Arrays"
      },
      {
        "id": "string-initializers",
        "title": "7.4 String Initializers"
      },
      {
        "id": "getting-string-length",
        "title": "7.5 Getting String Length"
      },
      {
        "id": "string-termination",
        "title": "7.6 String Termination"
      },
      {
        "id": "copying-a-string",
        "title": "7.7 Copying a String"
      }
    ],
    "text": "Beej's Guide to C Programming 7 Strings Finally! Strings! What could be simpler? Well, turns out strings aren’t actually strings in C. That’s right! They’re pointers! Of course they are! Much like arrays, strings in C barely exist . But let’s check it out—it’s not really such a big deal. 7.1 String Literals Before we start, let’s talk about string literals in C. These are sequences of characters in double quotes ( \" ). (Single quotes enclose characters, and are a different animal entirely.) Examples: &quot;Hello, world! \\n &quot; &quot;This is a test.&quot; &quot;When asked if this string had quotes in it, she replied, \\&quot; It does. \\&quot; &quot; The first one has a newline at the end—quite a common thing to see. The last one has quotes embedded within it, but you see each is preceded by (we say “escaped by”) a backslash ( \\ ) indicating that a literal quote belongs in the string at this point. This is how the C compiler can tell the difference between printing a double quote and the double quote at the end of the string. 7.2 String Variables Now that we know how to make a string literal, let’s assign it to a variable so we can do something with it. char * s = &quot;Hello, worl"
  },
  {
    "file": "structs-ii-more-fun-with-structs.html",
    "title": "20 structs II: More Fun with structs",
    "headings": [
      {
        "id": "initializers-of-nested-structs-and-arrays",
        "title": "20.1 Initializers of Nested structs and Arrays"
      },
      {
        "id": "anonymous-structs",
        "title": "20.2 Anonymous structs"
      },
      {
        "id": "self-referential-structs",
        "title": "20.3 Self-Referential structs"
      },
      {
        "id": "flexible-array-members",
        "title": "20.4 Flexible Array Members"
      },
      {
        "id": "struct-padding-bytes",
        "title": "20.5 Padding Bytes"
      },
      {
        "id": "offsetof",
        "title": "20.6 offsetof"
      },
      {
        "id": "fake-oop",
        "title": "20.7 Fake OOP"
      },
      {
        "id": "bit-fields",
        "title": "20.8 Bit-Fields"
      },
      {
        "id": "non-adjacent-bit-fields",
        "title": "20.8.1 Non-Adjacent Bit-Fields"
      },
      {
        "id": "signed-or-unsigned-ints",
        "title": "20.8.2 Signed or Unsigned ints"
      },
      {
        "id": "unnamed-bit-fields",
        "title": "20.8.3 Unnamed Bit-Fields"
      },
      {
        "id": "zero-width-unnamed-bit-fields",
        "title": "20.8.4 Zero-Width Unnamed Bit-Fields"
      },
      {
        "id": "unions",
        "title": "20.9 Unions"
      },
      {
        "id": "union-type-punning",
        "title": "20.9.1 Unions and Type Punning"
      },
      {
        "id": "pointers-to-unions",
        "title": "20.9.2 Pointers to unions"
      },
      {
        "id": "common-initial-sequences-in-unions",
        "title": "20.9.3 Common Initial Sequences in Unions"
      },
      {
        "id": "unions-and-unnamed-structs",
        "title": "20.10 Unions and Unnamed Structs"
      },
      {
        "id": "passing-and-returning-structs-and-unions",
        "title": "20.11 Passing and Returning structs and unions"
      }
    ],
    "text": "Beej's Guide to C Programming 20 struct s II: More Fun with struct s Turns out there’s a lot more you can do with struct s than we’ve talked about, but it’s just a big pile of miscellaneous things. So we’ll throw them in this chapter. If you’re good with struct basics, you can round out your knowledge here. 20.1 Initializers of Nested struct s and Arrays Remember how you could initialize structure members along these lines ? struct foo x = {. a = 12 , . b = 3.14 }; Turns out we have more power in these initializers than we’d originally shared. Exciting! For one thing, if you have a nested substructure like the following, you can initialize members of that substructure by following the variable names down the line: struct foo x = {. a . b . c = 12 }; Let’s look at an example: #include &lt;stdio.h&gt; struct cabin_information { int window_count ; int o2level ; }; struct spaceship { char * manufacturer ; struct cabin_information ci ; }; int main ( void ) { struct spaceship s = { . manufacturer = &quot;General Products&quot; , . ci . window_count = 8 , // &lt;-- NESTED INITIALIZER! . ci . o2level = 21 }; printf ( &quot; %s : %d seats, %d%% oxygen \\n &quot; , s . manufacturer , s . ci ."
  },
  {
    "file": "structs.html",
    "title": "8 Structs",
    "headings": [
      {
        "id": "declaring-a-struct",
        "title": "8.1 Declaring a Struct"
      },
      {
        "id": "struct-initializers",
        "title": "8.2 Struct Initializers"
      },
      {
        "id": "passing-structs-to-functions",
        "title": "8.3 Passing Structs to Functions"
      },
      {
        "id": "the-arrow-operator",
        "title": "8.4 The Arrow Operator"
      },
      {
        "id": "copying-and-returning-structs",
        "title": "8.5 Copying and Returning structs"
      },
      {
        "id": "comparing-structs",
        "title": "8.6 Comparing structs"
      }
    ],
    "text": "Beej's Guide to C Programming 8 Structs In C, we have something called a struct , which is a user-definable type that holds multiple pieces of data, potentially of different types. It’s a convenient way to bundle multiple variables into a single one. This can be beneficial for passing variables to functions (so you just have to pass one instead of many), and useful for organizing data and making code more readable. If you’ve come from another language, you might be familiar with the idea of classes and objects . These don’t exist in C, natively 69 . You can think of a struct as a class with only data members, and no methods. 8.1 Declaring a Struct You can declare a struct in your code like so: struct car { char * name ; float price ; int speed ; }; This is often done at the global scope outside any functions so that the struct is globally available. When you do this, you’re making a new type . The full type name is struct car . (Not just car —that won’t work.) There aren’t any variables of that type yet, but we can declare some: struct car saturn ; // Variable &quot;saturn&quot; of type &quot;struct car&quot; And now we have an uninitialized variable saturn 70 of type struct car . "
  },
  {
    "file": "the-c-preprocessor.html",
    "title": "19 The C Preprocessor",
    "headings": [
      {
        "id": "include",
        "title": "19.1 #include"
      },
      {
        "id": "simple-macros",
        "title": "19.2 Simple Macros"
      },
      {
        "id": "conditional-compilation",
        "title": "19.3 Conditional Compilation"
      },
      {
        "id": "if-defined-ifdef-and-endif",
        "title": "19.3.1 If Defined, #ifdef and #endif"
      },
      {
        "id": "if-not-defined-ifndef",
        "title": "19.3.2 If Not Defined, #ifndef"
      },
      {
        "id": "else",
        "title": "19.3.3 #else"
      },
      {
        "id": "else-if-elifdef-elifndef",
        "title": "19.3.4 Else-If: #elifdef, #elifndef"
      },
      {
        "id": "general-conditional-if-elif",
        "title": "19.3.5 General Conditional: #if, #elif"
      },
      {
        "id": "losing-a-macro-undef",
        "title": "19.3.6 Losing a Macro: #undef"
      },
      {
        "id": "built-in-macros",
        "title": "19.4 Built-in Macros"
      },
      {
        "id": "mandatory-macros",
        "title": "19.4.1 Mandatory Macros"
      },
      {
        "id": "optional-macros",
        "title": "19.4.2 Optional Macros"
      },
      {
        "id": "macros-with-arguments",
        "title": "19.5 Macros with Arguments"
      },
      {
        "id": "macros-with-one-argument",
        "title": "19.5.1 Macros with One Argument"
      },
      {
        "id": "macros-with-more-than-one-argument",
        "title": "19.5.2 Macros with More than One Argument"
      },
      {
        "id": "macros-with-variable-arguments",
        "title": "19.5.3 Macros with Variable Arguments"
      },
      {
        "id": "stringification",
        "title": "19.5.4 Stringification"
      },
      {
        "id": "concatenation",
        "title": "19.5.5 Concatenation"
      },
      {
        "id": "multiline-macros",
        "title": "19.6 Multiline Macros"
      },
      {
        "id": "my-assert",
        "title": "19.7 Example: An Assert Macro"
      },
      {
        "id": "the-error-directive",
        "title": "19.8 The #error Directive"
      },
      {
        "id": "the-embed-directive",
        "title": "19.9 The #embed Directive"
      },
      {
        "id": "embed-parameters",
        "title": "19.9.1 #embed Parameters"
      },
      {
        "id": "the-limit-parameter",
        "title": "19.9.2 The limit() Parameter"
      },
      {
        "id": "the-if_empty-parameter",
        "title": "19.9.3 The if_empty Parameter"
      },
      {
        "id": "the-prefix-and-suffix-parameters",
        "title": "19.9.4 The prefix() and suffix() Parameters"
      },
      {
        "id": "the-__has_embed-identifier",
        "title": "19.9.5 The __has_embed() Identifier"
      },
      {
        "id": "other-parameters",
        "title": "19.9.6 Other Parameters"
      },
      {
        "id": "embedding-multi-byte-values",
        "title": "19.9.7 Embedding Multi-Byte Values"
      },
      {
        "id": "pragma",
        "title": "19.10 The #pragma Directive"
      },
      {
        "id": "non-standard-pragmas",
        "title": "19.10.1 Non-Standard Pragmas"
      },
      {
        "id": "standard-pragmas",
        "title": "19.10.2 Standard Pragmas"
      },
      {
        "id": "pragma-operator",
        "title": "19.10.3 _Pragma Operator"
      },
      {
        "id": "the-line-directive",
        "title": "19.11 The #line Directive"
      },
      {
        "id": "the-null-directive",
        "title": "19.12 The Null Directive"
      }
    ],
    "text": "Beej's Guide to C Programming 19 The C Preprocessor Before your program gets compiled, it actually runs through a phase called preprocessing . It’s almost like there’s a language on top of the C language that runs first. And it outputs the C code, which then gets compiled. We’ve already seen this to an extent with #include ! That’s the C Preprocessor! Where it sees that directive, it includes the named file right there, just as if you’d typed it in there. And then the compiler builds the whole thing. But it turns out it’s a lot more powerful than just being able to include things. You can define macros that are substituted… and even macros that take arguments! 19.1 #include Let’s start with the one we’ve already seen a bunch. This is, of course, a way to include other sources in your source. Very commonly used with header files. While the spec allows for all kinds of behavior with #include , we’re going to take a more pragmatic approach and talk about the way it works on every system I’ve ever seen. We can split header files into two categories: system and local. Things that are built-in, like stdio.h , stdlib.h , math.h , and so on, you can include with angle brackets: #include &l"
  },
  {
    "file": "the-outside-environment.html",
    "title": "18 The Outside Environment",
    "headings": [
      {
        "id": "command-line-arguments",
        "title": "18.1 Command Line Arguments"
      },
      {
        "id": "the-last-argv-is-null",
        "title": "18.1.1 The Last argv is NULL"
      },
      {
        "id": "the-alternate-char-argv",
        "title": "18.1.2 The Alternate: char **argv"
      },
      {
        "id": "fun-facts",
        "title": "18.1.3 Fun Facts"
      },
      {
        "id": "exit-status",
        "title": "18.2 Exit Status"
      },
      {
        "id": "other-exit-status-values",
        "title": "18.2.1 Other Exit Status Values"
      },
      {
        "id": "env-var",
        "title": "18.3 Environment Variables"
      },
      {
        "id": "setting-environment-variables",
        "title": "18.3.1 Setting Environment Variables"
      },
      {
        "id": "unix-like-alternative-environment-variables",
        "title": "18.3.2 Unix-like Alternative Environment Variables"
      }
    ],
    "text": "Beej's Guide to C Programming 18 The Outside Environment When you run a program, it’s actually you talking to the shell, saying, “Hey, please run this thing.” And the shell says, “Sure,” and then tells the operating system, “Hey, could you please make a new process and run this thing?” And if all goes well, the OS complies and your program runs. But there’s a whole world outside your program in the shell that can be interacted with from within C. We’ll look at a few of those in this chapter. 18.1 Command Line Arguments Many command line utilities accept command line arguments . For example, if we want to see all files that end in .txt , we can type something like this on a Unix-like system: ls * .txt (or dir instead of ls on a Windows system). In this case, the command is ls , but its arguments are all files that end with .txt 120 . So how can we see what is passed into program from the command line? Say we have a program called add that adds all numbers passed on the command line and prints the result: ./add 10 30 5 45 That’s gonna pay the bills for sure! But seriously, this is a great tool for seeing how to get those arguments from the command line and break them down. First, let"
  },
  {
    "file": "typedef-making-new-types.html",
    "title": "10 typedef: Making New Types",
    "headings": [
      {
        "id": "typedef-in-theory",
        "title": "10.1 typedef in Theory"
      },
      {
        "id": "scoping",
        "title": "10.1.1 Scoping"
      },
      {
        "id": "typedef-in-practice",
        "title": "10.2 typedef in Practice"
      },
      {
        "id": "typedef-struct",
        "title": "10.2.1 typedef and structs"
      },
      {
        "id": "typedef-and-other-types",
        "title": "10.2.2 typedef and Other Types"
      },
      {
        "id": "typedef-and-pointers",
        "title": "10.2.3 typedef and Pointers"
      },
      {
        "id": "typedef-and-capitalization",
        "title": "10.2.4 typedef and Capitalization"
      },
      {
        "id": "arrays-and-typedef",
        "title": "10.3 Arrays and typedef"
      }
    ],
    "text": "Beej's Guide to C Programming 10 typedef : Making New Types Well, not so much making new types as getting new names for existing types. Sounds kinda pointless on the surface, but we can really use this to make our code cleaner. 10.1 typedef in Theory Basically, you take an existing type and you make an alias for it with typedef . Like this: typedef int antelope ; // Make &quot;antelope&quot; an alias for &quot;int&quot; antelope x = 10 ; // Type &quot;antelope&quot; is the same as type &quot;int&quot; You can take any existing type and do it. You can even make a number of types with a comma list: typedef int antelope , bagel , mushroom ; // These are all &quot;int&quot; That’s really useful, right? That you can type mushroom instead of int ? You must be super excited about this feature! OK, Professor Sarcasm—we’ll get to some more common applications of this in a moment. 10.1.1 Scoping typedef follows regular scoping rules . For this reason, it’s quite common to find typedef at file scope (“global”) so that all functions can use the new types at will. 10.2 typedef in Practice So renaming int to something else isn’t that exciting. Let’s see where typedef commonly makes an appearance"
  },
  {
    "file": "types-ii-way-more-types.html",
    "title": "14 Types II: Way More Types!",
    "headings": [
      {
        "id": "signed-and-unsigned-integers",
        "title": "14.1 Signed and Unsigned Integers"
      },
      {
        "id": "character-types",
        "title": "14.2 Character Types"
      },
      {
        "id": "more-integer-types-short-long-long-long",
        "title": "14.3 More Integer Types: short, long, long long"
      },
      {
        "id": "more-float-double-and-long-double",
        "title": "14.4 More Float: double and long double"
      },
      {
        "id": "how-many-decimal-digits",
        "title": "14.4.1 How Many Decimal Digits?"
      },
      {
        "id": "converting-to-decimal-and-back",
        "title": "14.4.2 Converting to Decimal and Back"
      },
      {
        "id": "constant-numeric-types",
        "title": "14.5 Constant Numeric Types"
      },
      {
        "id": "hexadecimal-and-octal",
        "title": "14.5.1 Hexadecimal and Octal"
      },
      {
        "id": "integer-constants",
        "title": "14.5.2 Integer Constants"
      },
      {
        "id": "floating-point-constants",
        "title": "14.5.3 Floating Point Constants"
      }
    ],
    "text": "Beej's Guide to C Programming 14 Types II: Way More Types! We’re used to char , int , and float types, but it’s now time to take that stuff to the next level and see what else we have out there in the types department! 14.1 Signed and Unsigned Integers So far we’ve used int as a signed type, that is, a value that can be either negative or positive. But C also has specific unsigned integer types that can only hold positive numbers. These types are prefaced by the keyword unsigned . int a ; // signed signed int a ; // signed signed a ; // signed, &quot;shorthand&quot; for &quot;int&quot; or &quot;signed int&quot;, rare unsigned int b ; // unsigned unsigned c ; // unsigned, shorthand for &quot;unsigned int&quot; Why? Why would you decide you only wanted to hold positive numbers? Answer: you can get larger numbers in an unsigned variable than you can in a signed ones. But why is that? You can think of integers being represented by a certain number of bits 93 . On my computer, an int is represented by 64 bits. And each permutation of bits that are either 1 or 0 represents a number. We can decide how to divvy up these numbers. With signed numbers, we use (roughly) half the permutations t"
  },
  {
    "file": "types-iii-conversions.html",
    "title": "15 Types III: Conversions",
    "headings": [
      {
        "id": "string-conversions",
        "title": "15.1 String Conversions"
      },
      {
        "id": "numeric-value-to-string",
        "title": "15.1.1 Numeric Value to String"
      },
      {
        "id": "string-to-numeric-value",
        "title": "15.1.2 String to Numeric Value"
      },
      {
        "id": "char-conversions",
        "title": "15.2 char Conversions"
      },
      {
        "id": "numeric-conversions",
        "title": "15.3 Numeric Conversions"
      },
      {
        "id": "boolean",
        "title": "15.3.1 Boolean"
      },
      {
        "id": "integer-to-integer-conversions",
        "title": "15.3.2 Integer to Integer Conversions"
      },
      {
        "id": "integer-and-floating-point-conversions",
        "title": "15.3.3 Integer and Floating Point Conversions"
      },
      {
        "id": "implicit-conversions",
        "title": "15.4 Implicit Conversions"
      },
      {
        "id": "integer-promotions",
        "title": "15.4.1 The Integer Promotions"
      },
      {
        "id": "usual-arithmetic-conversions",
        "title": "15.4.2 The Usual Arithmetic Conversions"
      },
      {
        "id": "void",
        "title": "15.4.3 void*"
      },
      {
        "id": "explicit-conversions",
        "title": "15.5 Explicit Conversions"
      },
      {
        "id": "casting",
        "title": "15.5.1 Casting"
      }
    ],
    "text": "Beej's Guide to C Programming 15 Types III: Conversions In this chapter, we want to talk all about converting from one type to another. C has a variety of ways of doing this, and some might be a little different that you’re used to in other languages. Before we talk about how to make conversions happen, let’s talk about how they work when they do happen. 15.1 String Conversions Unlike many languages, C doesn’t do string-to-number (and vice-versa) conversions in quite as streamlined a manner as it does numeric conversions. For these, we’ll have to call functions to do the dirty work. 15.1.1 Numeric Value to String When we want to convert a number to a string, we can use either sprintf() (pronounced SPRINT-f ) or snprintf() ( s-n-print-f ) 107 These basically work like printf() , except they output to a string instead, and you can print that string later, or whatever. For example, turning part of the value π into a string: #include &lt;stdio.h&gt; int main ( void ) { char s [ 10 ]; float f = 3.14159 ; // Convert &quot;f&quot; to string, storing in &quot;s&quot;, writing at most 10 characters // including the NUL terminator snprintf ( s , 10 , &quot; %f &quot; , f ); printf ( &quot;St"
  },
  {
    "file": "types-iv-qualifiers-and-specifiers.html",
    "title": "16 Types IV: Qualifiers and Specifiers",
    "headings": [
      {
        "id": "type-qualifiers",
        "title": "16.1 Type Qualifiers"
      },
      {
        "id": "const",
        "title": "16.1.1 const"
      },
      {
        "id": "restrict",
        "title": "16.1.2 restrict"
      },
      {
        "id": "volatile",
        "title": "16.1.3 volatile"
      },
      {
        "id": "atomic",
        "title": "16.1.4 _Atomic"
      },
      {
        "id": "storage-class-specifiers",
        "title": "16.2 Storage-Class Specifiers"
      },
      {
        "id": "auto",
        "title": "16.2.1 auto"
      },
      {
        "id": "static",
        "title": "16.2.2 static"
      },
      {
        "id": "extern",
        "title": "16.2.3 extern"
      },
      {
        "id": "register",
        "title": "16.2.4 register"
      },
      {
        "id": "thread_local",
        "title": "16.2.5 _Thread_local"
      }
    ],
    "text": "Beej's Guide to C Programming 16 Types IV: Qualifiers and Specifiers Now that we have some more types under our belts, turns out we can give these types some additional attributes that control their behavior. These are the type qualifiers and storage-class specifiers . 16.1 Type Qualifiers These are going to allow you to declare constant values, and also to give the compiler optimization hints that it can use. 16.1.1 const This is the most common type qualifier you’ll see. It means the variable is constant, and any attempt to modify it will result in a very angry compiler. const int x = 2 ; x = 4 ; // COMPILER PUKING SOUNDS, can&#39;t assign to a constant You can’t change a const value. Often you see const in parameter lists for functions: void foo ( const int x ) { printf ( &quot; %d\\n &quot; , x + 30 ); // OK, doesn&#39;t modify &quot;x&quot; } 16.1.1.1 const and Pointers This one gets a little funky, because there are two usages that have two meanings when it comes to pointers. For one thing, we can make it so you can’t change the thing the pointer points to. You do this by putting the const up front with the type name (before the asterisk) in the type declaration. int x [] = { "
  },
  {
    "file": "types-part-v-compound-literals-and-generic-selections.html",
    "title": "32 Types Part V: Compound Literals and Generic Selections",
    "headings": [
      {
        "id": "compound-literals",
        "title": "32.1 Compound Literals"
      },
      {
        "id": "passing-unnamed-objects-to-functions",
        "title": "32.1.1 Passing Unnamed Objects to Functions"
      },
      {
        "id": "unnamed-structs",
        "title": "32.1.2 Unnamed structs"
      },
      {
        "id": "pointers-to-unnamed-objects",
        "title": "32.1.3 Pointers to Unnamed Objects"
      },
      {
        "id": "unnamed-objects-and-scope",
        "title": "32.1.4 Unnamed Objects and Scope"
      },
      {
        "id": "silly-unnamed-object-example",
        "title": "32.1.5 Silly Unnamed Object Example"
      },
      {
        "id": "type-generics",
        "title": "32.2 Generic Selections"
      }
    ],
    "text": "Beej's Guide to C Programming 32 Types Part V: Compound Literals and Generic Selections This is the final chapter for types! We’re going to talk about two things: How to have “anonymous” unnamed objects and how that’s useful. How to generate type-dependent code. They’re not particularly related, but don’t really each warrant their own chapters. So I crammed them in here like a rebel! 32.1 Compound Literals This is a neat feature of the language that allows you to create an object of some type on the fly without ever assigning it to a variable. You can make simple types, arrays, struct s, you name it. One of the main uses for this is passing complex arguments to functions when you don’t want to make a temporary variable to hold the value. The way you create a compound literal is to put the type name in parentheses, and then put an initializer list after. For example, an unnamed array of int s, might look like this: ( int []){ 1 , 2 , 3 , 4 } Now, that line of code doesn’t do anything on its own. It creates an unnamed array of 4 int s, and then throws them away without using them. We could use a pointer to store a reference to the array… int * p = ( int []){ 1 , 2 , 3 , 4 }; printf ("
  },
  {
    "file": "unicode-wide-characters-and-all-that.html",
    "title": "27 Unicode, Wide Characters, and All That",
    "headings": [
      {
        "id": "what-is-unicode",
        "title": "27.1 What is Unicode?"
      },
      {
        "id": "code-points",
        "title": "27.2 Code Points"
      },
      {
        "id": "encoding",
        "title": "27.3 Encoding"
      },
      {
        "id": "src-exec-charset",
        "title": "27.4 Source and Execution Character Sets"
      },
      {
        "id": "unicode-in-c",
        "title": "27.5 Unicode in C"
      },
      {
        "id": "utf8-quick",
        "title": "27.6 A Quick Note on UTF-8 Before We Swerve into the Weeds"
      },
      {
        "id": "different-character-types",
        "title": "27.7 Different Character Types"
      },
      {
        "id": "multibyte-characters",
        "title": "27.7.1 Multibyte Characters"
      },
      {
        "id": "wide-characters",
        "title": "27.7.2 Wide Characters"
      },
      {
        "id": "using-wide-characters-and-wchar_t",
        "title": "27.8 Using Wide Characters and wchar_t"
      },
      {
        "id": "multibyte-to-wchar_t-conversions",
        "title": "27.8.1 Multibyte to wchar_t Conversions"
      },
      {
        "id": "wide-character-functionality",
        "title": "27.9 Wide Character Functionality"
      },
      {
        "id": "wint_t",
        "title": "27.9.1 wint_t"
      },
      {
        "id": "io-stream-orientation",
        "title": "27.9.2 I/O Stream Orientation"
      },
      {
        "id": "io-functions",
        "title": "27.9.3 I/O Functions"
      },
      {
        "id": "type-conversion-functions",
        "title": "27.9.4 Type Conversion Functions"
      },
      {
        "id": "string-and-memory-copying-functions",
        "title": "27.9.5 String and Memory Copying Functions"
      },
      {
        "id": "string-and-memory-comparing-functions",
        "title": "27.9.6 String and Memory Comparing Functions"
      },
      {
        "id": "string-searching-functions",
        "title": "27.9.7 String Searching Functions"
      },
      {
        "id": "lengthmiscellaneous-functions",
        "title": "27.9.8 Length/Miscellaneous Functions"
      },
      {
        "id": "character-classification-functions",
        "title": "27.9.9 Character Classification Functions"
      },
      {
        "id": "parse-state-restartable-functions",
        "title": "27.10 Parse State, Restartable Functions"
      },
      {
        "id": "unicode-encodings-and-c",
        "title": "27.11 Unicode Encodings and C"
      },
      {
        "id": "utf-8",
        "title": "27.11.1 UTF-8"
      },
      {
        "id": "utf-16-utf-32-char16_t-and-char32_t",
        "title": "27.11.2 UTF-16, UTF-32, char16_t, and char32_t"
      },
      {
        "id": "multibyte-conversions",
        "title": "27.11.3 Multibyte Conversions"
      },
      {
        "id": "utf-3rd-party",
        "title": "27.11.4 Third-Party Libraries"
      }
    ],
    "text": "Beej's Guide to C Programming 27 Unicode, Wide Characters, and All That Before we begin, note that this is an active area of language development in C as it works to get past some, erm, growing pains . Now that C23 has come out, updates here are probable. Most people are basically interested in the deceptively simple question, “How do I use such-and-such character set in C?” We’ll get to that. But as we’ll see, it might already work on your system. Or you might have to punt to a third-party library. We’re going to talk about a lot of things this chapter—some are platform agnostic, and some are C-specific. Let’s get an outline first of what we’re going to look at: Unicode background Character encoding background Source and Execution character Sets Using Unicode and UTF-8 Using other character types like wchar_t , char16_t , and char32_t Let’s dive in! 27.1 What is Unicode? Back in the day, it was popular in the US and much of the world to use a 7-bit or 8-bit encoding for characters in memory. This meant we could have 128 or 256 characters (including non-printable characters) total. That was fine for a US-centric world, but it turns out there are actually other alphabets out there—w"
  },
  {
    "file": "variable-length-arrays-vlas.html",
    "title": "30 Variable-Length Arrays (VLAs)",
    "headings": [
      {
        "id": "the-basics",
        "title": "30.1 The Basics"
      },
      {
        "id": "sizeof-and-vlas",
        "title": "30.2 sizeof and VLAs"
      },
      {
        "id": "multidimensional-vlas",
        "title": "30.3 Multidimensional VLAs"
      },
      {
        "id": "passing-one-dimensional-vlas-to-functions",
        "title": "30.4 Passing One-Dimensional VLAs to Functions"
      },
      {
        "id": "passing-multi-dimensional-vlas-to-functions",
        "title": "30.5 Passing Multi-Dimensional VLAs to Functions"
      },
      {
        "id": "partial-multidimensional-vlas",
        "title": "30.5.1 Partial Multidimensional VLAs"
      },
      {
        "id": "compatibility-with-regular-arrays",
        "title": "30.6 Compatibility with Regular Arrays"
      },
      {
        "id": "typedef-and-vlas",
        "title": "30.7 typedef and VLAs"
      },
      {
        "id": "jumping-pitfalls",
        "title": "30.8 Jumping Pitfalls"
      },
      {
        "id": "vla-general-issues",
        "title": "30.9 General Issues"
      }
    ],
    "text": "Beej's Guide to C Programming 30 Variable-Length Arrays (VLAs) C provides a way for you to declare an array whose size is determined at runtime. This gives you the benefits of dynamic runtime sizing like you get with malloc() , but without needing to worry about free() ing the memory after. Now, a lot of people don’t like VLAs. They’ve been banned from the Linux kernel, for example. We’ll dig into more of that rationale later . This is an optional feature of the language. The macro __STDC_NO_VLA__ is set to 1 if VLAs are not present. (They were mandatory in C99, and then became optional in C11.) #if __STDC_NO_VLA__ == 1 #error Sorry, need VLAs for this program! #endif But since neither GCC nor Clang bother to define this macro, you may get limited mileage from this. Let’s dive in first with an example, and then we’ll look for the devil in the details. 30.1 The Basics A normal array is declared with a constant size, like this: int v [ 10 ]; But with VLAs, we can use a size determined at runtime to set the array, like this: int n = 10 ; int v [ n ]; Now, that looks like the same thing, and in many ways is, but this gives you the flexibility to compute the size you need, and then get "
  },
  {
    "file": "variables-and-statements.html",
    "title": "3 Variables and Statements",
    "headings": [
      {
        "id": "variables",
        "title": "3.1 Variables"
      },
      {
        "id": "variable-names",
        "title": "3.1.1 Variable Names"
      },
      {
        "id": "variable-types",
        "title": "3.1.2 Variable Types"
      },
      {
        "id": "boolean-types",
        "title": "3.1.3 Boolean Types"
      },
      {
        "id": "operators",
        "title": "3.2 Operators and Expressions"
      },
      {
        "id": "arithmetic",
        "title": "3.2.1 Arithmetic"
      },
      {
        "id": "ternary-operator",
        "title": "3.2.2 Ternary Operator"
      },
      {
        "id": "pre-and-post-increment-and-decrement",
        "title": "3.2.3 Pre-and-Post Increment-and-Decrement"
      },
      {
        "id": "the-comma-operator",
        "title": "3.2.4 The Comma Operator"
      },
      {
        "id": "conditional-operators",
        "title": "3.2.5 Conditional Operators"
      },
      {
        "id": "boolean-operators",
        "title": "3.2.6 Boolean Operators"
      },
      {
        "id": "sizeof-operator",
        "title": "3.2.7 The sizeof Operator"
      },
      {
        "id": "flow-control",
        "title": "3.3 Flow Control"
      },
      {
        "id": "ifstat",
        "title": "3.3.1 The if-else statement"
      },
      {
        "id": "whilestat",
        "title": "3.3.2 The while statement"
      },
      {
        "id": "dowhilestat",
        "title": "3.3.3 The do-while statement"
      },
      {
        "id": "forstat",
        "title": "3.3.4 The for statement"
      },
      {
        "id": "switch-statement",
        "title": "3.3.5 The switch Statement"
      }
    ],
    "text": "Beej's Guide to C Programming 3 Variables and Statements “It takes all kinds to make a world, does it not, Padre?” “So it does, my son, so it does.” —Pirate Captain Thomas Bartholomew Red to the Padre, Pirates There sure can be lotsa stuff in a C program. Yup. And for various reasons, it’ll be easier for all of us if we classify some of the types of things you can find in a program, so we can be clear what we’re talking about. 3.1 Variables It’s said that “variables hold values”. But another way to think about it is that a variable is a human-readable name that refers to some data in memory. We’re going to take a second here and take a peek down the rabbit hole that is pointers. Don’t worry about it. You can think of memory as a big array of bytes 33 . Data is stored in this “array” 34 . If a number is larger than a single byte, it is stored in multiple bytes. Because memory is like an array, each byte of memory can be referred to by its index. This index into memory is also called an address , or a location , or a pointer . When you have a variable in C, the value of that variable is in memory somewhere , at some address. Of course. After all, where else would it be? But it’s a pa"
  },
  {
    "file": "variadic-functions.html",
    "title": "25 Variadic Functions",
    "headings": [
      {
        "id": "ellipses-in-function-signatures",
        "title": "25.1 Ellipses in Function Signatures"
      },
      {
        "id": "getting-the-extra-arguments",
        "title": "25.2 Getting the Extra Arguments"
      },
      {
        "id": "va_list-functionality",
        "title": "25.3 va_list Functionality"
      },
      {
        "id": "library-functions-that-use-va_lists",
        "title": "25.4 Library Functions That Use va_lists"
      },
      {
        "id": "variadic-macro-gotchas",
        "title": "25.5 Variadic Macro Gotchas"
      }
    ],
    "text": "Beej's Guide to C Programming 25 Variadic Functions Variadic is a fancy word for functions that take arbitrary numbers of arguments. A regular function takes a specific number of arguments, for example: int add ( int x , int y ) { return x + y ; } You can only call that with exactly two arguments which correspond to parameters x and y . add ( 2 , 3 ); add ( 5 , 12 ); But if you try it with more, the compiler won’t let you: add ( 2 , 3 , 4 ); // ERROR add ( 5 ); // ERROR Variadic functions get around this limitation to a certain extent. We’ve already seen a famous example in printf() ! You can pass all kinds of things to it. printf ( &quot;Hello, world! \\n &quot; ); printf ( &quot;The number is %d\\n &quot; , 2 ); printf ( &quot;The number is %d and pi is %f\\n &quot; , 2 , 3.14159 ); It seems to not care how many arguments you give it! Well, that’s not entirely true. Zero arguments will give you an error: printf (); // ERROR This leads us to one of the limitations of variadic functions in C: they must have at least one argument. But aside from that, they’re pretty flexible, even allows arguments to have different types just like printf() does. Let’s see how they work! 25.1 Ellipses i"
  }
];
