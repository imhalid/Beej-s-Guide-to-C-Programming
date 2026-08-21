<div class="nav-header">

<a href="arrays.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="structs.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">7</span> Strings

Finally! Strings! What could be simpler?

Well, turns out strings aren’t actually strings in C. That’s right! They’re pointers! Of course they are!

Much like arrays, strings in C *barely exist*.

But let’s check it out—it’s not really such a big deal.

## <span class="header-section-number">7.1</span> String Literals

Before we start, let’s talk about string literals in C. These are sequences of characters in *double* quotes (`"`). (Single quotes enclose characters, and are a different animal entirely.)

Examples:

``` c
"Hello, world!\n"
"This is a test."
"When asked if this string had quotes in it, she replied, \"It does.\""
```

The first one has a newline at the end—quite a common thing to see.

The last one has quotes embedded within it, but you see each is preceded by (we say “escaped by”) a backslash (`\`) indicating that a literal quote belongs in the string at this point. This is how the C compiler can tell the difference between printing a double quote and the double quote at the end of the string.

## <span class="header-section-number">7.2</span> String Variables

Now that we know how to make a string literal, let’s assign it to a variable so we can do something with it.

``` c
char *s = "Hello, world!";
```

Check out that type: pointer to a `char`. The string variable `s` is actually a pointer to the first character in that string, namely the `H`.

And we can print it with the `%s` (for “string”) format specifier:

``` c
char *s = "Hello, world!";

printf("%s\n", s);  // "Hello, world!"
```

## <span class="header-section-number">7.3</span> String Variables as Arrays

Another option is this, nearly equivalent to the above `char*` usage:

``` c
char s[14] = "Hello, world!";

// or, if we were properly lazy and have the compiler
// figure the length for us:

char s[] = "Hello, world!";
```

This means you can use array notation to access characters in a string. Let’s do exactly that to print all the characters in a string on the same line:

``` c
#include <stdio.h>

int main(void)
{
    char s[] = "Hello, world!";

    for (int i = 0; i < 13; i++)
        printf("%c", s[i]);
    printf("\n");
}
```

Note that we’re using the format specifier `%c` to print a single character.

Also, check this out. The program will still work fine if we change the definition of `s` to be a `char*` type:

``` c
#include <stdio.h>

int main(void)
{
    char *s = "Hello, world!";   // char* here

    for (int i = 0; i < 13; i++)
        printf("%c", s[i]);    // But still use arrays here...?
    printf("\n");
}
```

And we still can use array notation to get the job done when printing it out! This is surprising, but is still only because we haven’t talked about array/pointer equivalence yet. But this is yet another hint that arrays and pointers are the same thing, deep down.

## <span class="header-section-number">7.4</span> String Initializers

We’ve already seen some examples with initializing string variables with string literals:

``` c
char *s = "Hello, world!";
char t[] = "Hello, again!";
```

But these two initializations are subtly different. A string literal, similar to an integer literal, has its memory automatically managed by the compiler for you! With an integer, i.e. a fixed size piece of data, the compiler can pretty easily manage it. But strings are a variable-byte beast which the compiler tames by tossing into a chunk of memory, and giving you a pointer to it.

This form points to wherever that string was placed. Typically, that place is in a land faraway from the rest of your program’s memory – read-only memory – for reasons related to performance & safety.

``` c
char *s = "Hello, world!";
```

So, if you try to mutate that string with this:

``` c
char *s = "Hello, world!";

s[0] = 'z';  // BAD NEWS: tried to mutate a string literal!
```

The behavior is undefined. Probably, depending on your system, a crash will result.

But declaring it as an array is different. The compiler doesn’t stow those bytes in another part of town, they’re right down the street. This one is a mutable *copy* of the string – one we can change at will:

``` c
char t[] = "Hello, again!";  // t is an array copy of the string 
t[0] = 'z'; //  No problem

printf("%s\n", t);  // "zello, again!"
```

So remember: if you have a pointer to a string literal, don’t try to change it! And if you use a string in double quotes to initialize an array, that’s not actually a string literal.

## <span class="header-section-number">7.5</span> Getting String Length

You can’t, since C doesn’t track it for you. And when I say “can’t”, I actually mean “can”<a href="function-specifiers-alignment-specifiersoperators.html#fn64" id="fnref64" class="footnote-ref" role="doc-noteref"><sup>64</sup></a>. There’s a function in `<string.h>` called `strlen()` that can be used to compute the length of any string in bytes<a href="function-specifiers-alignment-specifiersoperators.html#fn65" id="fnref65" class="footnote-ref" role="doc-noteref"><sup>65</sup></a>.

``` c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char *s = "Hello, world!";

    printf("The string is %zu bytes long.\n", strlen(s));
}
```

The `strlen()` function returns type `size_t`, which is an integer type so you can use it for integer math. We print `size_t` with `%zu`.

The above program prints:

``` default
The string is 13 bytes long.
```

Great! So it *is* possible to get the string length!

But… if C doesn’t track the length of the string anywhere, how does it know how long the string is?

## <span class="header-section-number">7.6</span> String Termination

C does strings a little differently than many programming languages, and in fact differently than almost every modern programming language.

When you’re making a new language, you have basically two options for storing a string in memory:

1.  Store the bytes of the string along with a number indicating the length of the string.

2.  Store the bytes of the string, and mark the end of the string with a special byte called the *terminator*.

If you want strings longer than 255 characters, option 1 requires at least two bytes to store the length. Whereas option 2 only requires one byte to terminate the string. So a bit of savings there.

Of course, these days it seems ridiculous to worry about saving a byte (or 3—lots of languages will happily let you have strings that are 4 gigabytes in length). But back in the day, it was a bigger deal.

So C took approach \#2. In C, a “string” is defined by two basic characteristics:

- A pointer to the first character in the string.
- A zero-valued byte (or `NUL` character<a href="function-specifiers-alignment-specifiersoperators.html#fn66" id="fnref66" class="footnote-ref" role="doc-noteref"><sup>66</sup></a>) somewhere in memory after the pointer that indicates the end of the string.

A `NUL` character can be written in C code as `\0`, though you don’t often have to do this.

When you include a string in double quotes in your code, the `NUL` character is automatically, implicitly included.

``` c
char *s = "Hello!";  // Actually "Hello!\0" behind the scenes
```

So with this in mind, let’s write our own `strlen()` function that counts `char`s in a string until it finds a `NUL`.

The procedure is to look down the string for a single `NUL` character, counting as we go<a href="function-specifiers-alignment-specifiersoperators.html#fn67" id="fnref67" class="footnote-ref" role="doc-noteref"><sup>67</sup></a>:

``` c
int my_strlen(char *s)
{
    int count = 0;

    while (s[count] != '\0')  // Single quotes for single char
        count++;

    return count;
}
```

And that’s basically how the built-in `strlen()` gets the job done.

## <span class="header-section-number">7.7</span> Copying a String

You can’t copy a string through the assignment operator (`=`). All that does is make a copy of the pointer to the first character… so you end up with two pointers to the same string:

``` c
#include <stdio.h>

int main(void)
{
    char s[] = "Hello, world!";
    char *t;

    // This makes a copy of the pointer, not a copy of the string!
    t = s;

    // We modify t
    t[0] = 'z';

    // But printing s shows the modification!
    // Because t and s point to the same string!

    printf("%s\n", s);  // "zello, world!"
}
```

If you want to make a copy of a string, you have to copy it a byte at a time—this means that you’re going to take the individual bytes of the string from one place in memory and duplicate them somewhere else in memory. This is made easier with the `strcpy()` function.<a href="function-specifiers-alignment-specifiersoperators.html#fn68" id="fnref68" class="footnote-ref" role="doc-noteref"><sup>68</sup></a>

Before you copy the string, make sure you have room to copy it into, i.e. the destination array that’s going to hold the characters needs to be at least as long as the string you’re copying.

``` c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char s[] = "Hello, world!";
    char t[100];  // Each char is one byte, so plenty of room

    // This makes a copy of the string!
    strcpy(t, s);

    // We modify t
    t[0] = 'z';

    // And s remains unaffected because it's a different string
    printf("%s\n", s);  // "Hello, world!"

    // But t has been changed
    printf("%s\n", t);  // "zello, world!"
}
```

Notice with `strcpy()`, the destination pointer is the first argument, and the source pointer is the second. A mnemonic I use to remember this is that it’s the order you would have put `t` and `s` if an assignment `=` worked for strings, with the source on the right and the destination on the left.

------------------------------------------------------------------------

<div class="nav-header">

<a href="arrays.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="structs.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
