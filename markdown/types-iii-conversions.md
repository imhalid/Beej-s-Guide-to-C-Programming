<div class="nav-header">

<a href="types-ii-way-more-types.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="types-iv-qualifiers-and-specifiers.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">15</span> Types III: Conversions

In this chapter, we want to talk all about converting from one type to another. C has a variety of ways of doing this, and some might be a little different that you’re used to in other languages.

Before we talk about how to make conversions happen, let’s talk about how they work when they *do* happen.

## <span class="header-section-number">15.1</span> String Conversions

Unlike many languages, C doesn’t do string-to-number (and vice-versa) conversions in quite as streamlined a manner as it does numeric conversions.

For these, we’ll have to call functions to do the dirty work.

### <span class="header-section-number">15.1.1</span> Numeric Value to String

When we want to convert a number to a string, we can use either `sprintf()` (pronounced *SPRINT-f*) or `snprintf()` (*s-n-print-f*)<a href="function-specifiers-alignment-specifiersoperators.html#fn107" id="fnref107" class="footnote-ref" role="doc-noteref"><sup>107</sup></a>

These basically work like `printf()`, except they output to a string instead, and you can print that string later, or whatever.

For example, turning part of the value π into a string:

``` c
#include <stdio.h>

int main(void)
{
    char s[10];
    float f = 3.14159;

    // Convert "f" to string, storing in "s", writing at most 10 characters
    // including the NUL terminator

    snprintf(s, 10, "%f", f);

    printf("String value: %s\n", s);  // String value: 3.141590
}
```

So you can use `%d` or `%u` like you’re used to for integers.

### <span class="header-section-number">15.1.2</span> String to Numeric Value

There are a couple families of functions to do this in C. We’ll call these the `atoi` (pronounced *a-to-i*) family and the `strtol` (*stir-to-long*) family.

For basic conversion from a string to a number, try the `atoi` functions from `<stdlib.h>`. These have bad error-handling characteristics (including undefined behavior if you pass in a bad string), so use them carefully.

| Function | Description               |
|:---------|:--------------------------|
| `atoi`   | String to `int`           |
| `atof`   | String to `float`         |
| `atol`   | String to `long int`      |
| `atoll`  | String to `long long int` |

Though the spec doesn’t cop to it, the `a` at the beginning of the function stands for [ASCII](https://en.wikipedia.org/wiki/ASCII)<a href="function-specifiers-alignment-specifiersoperators.html#fn108" id="fnref108" class="footnote-ref" role="doc-noteref"><sup>108</sup></a>, so really `atoi()` is “ASCII-to-integer”, but saying so today is a bit ASCII-centric.

Here’s an example converting a string to a `float`:

``` c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char *pi = "3.14159";
    float f;

    f = atof(pi);

    printf("%f\n", f);
}
```

But, like I said, we get undefined behavior from weird things like this:

``` c
int x = atoi("what");  // "What" ain't no number I ever heard of
```

(When I run that, I get `0` back, but you really shouldn’t count on that in any way. You could get something completely different.)

For better error handling characteristics, let’s check out all those `strtol` functions, also in `<stdlib.h>`. Not only that, but they convert to more types and more bases, too!

| Function   | Description                        |
|:-----------|:-----------------------------------|
| `strtol`   | String to `long int`               |
| `strtoll`  | String to `long long int`          |
| `strtoul`  | String to `unsigned long int`      |
| `strtoull` | String to `unsigned long long int` |
| `strtof`   | String to `float`                  |
| `strtod`   | String to `double`                 |
| `strtold`  | String to `long double`            |

These functions all follow a similar pattern of use, and are a lot of people’s first experience with pointers to pointers! But never fret—it’s easier than it looks.

Let’s do an example where we convert a string to an `unsigned long`, discarding error information (i.e. information about bad characters in the input string):

``` c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char *s = "3490";

    // Convert string s, a number in base 10, to an unsigned long int.
    // NULL means we don't care to learn about any error information.

    unsigned long int x = strtoul(s, NULL, 10);

    printf("%lu\n", x);  // 3490
}
```

Notice a couple things there. Even though we didn’t deign to capture any information about error characters in the string, `strtoul()` won’t give us undefined behavior; it will just return `0`.

Also, we specified that this was a decimal (base 10) number.

Does this mean we can convert numbers of different bases? Sure! Let’s do binary!

``` c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char *s = "101010";  // What's the meaning of this number?

    // Convert string s, a number in base 2, to an unsigned long int.

    unsigned long int x = strtoul(s, NULL, 2);

    printf("%lu\n", x);  // 42
}
```

OK, that’s all fun and games, but what’s with that `NULL` in there? What’s that for?

That helps us figure out if an error occurred in the processing of the string. It’s a pointer to a pointer to a `char`, which sounds scary, but isn’t once you wrap your head around it.

Let’s do an example where we feed in a deliberately bad number, and we’ll see how `strtol()` lets us know where the first invalid digit is.

``` c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char *s = "34x90";  // "x" is not a valid digit in base 10!
    char *badchar;

    // Convert string s, a number in base 10, to an unsigned long int.

    unsigned long int x = strtoul(s, &badchar, 10);

    // It tries to convert as much as possible, so gets this far:

    printf("%lu\n", x);  // 34

    // But we can see the offending bad character because badchar
    // points to it!

    printf("Invalid character: %c\n", *badchar);  // "x"
}
```

So there we have `strtoul()` modifying what `badchar` points to in order to show us where things went wrong<a href="function-specifiers-alignment-specifiersoperators.html#fn109" id="fnref109" class="footnote-ref" role="doc-noteref"><sup>109</sup></a>.

But what if nothing goes wrong? In that case, `badchar` will point to the `NUL` terminator at the end of the string. So we can test for it:

``` c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char *s = "3490";  // "x" is not a valid digit in base 10!
    char *badchar;

    // Convert string s, a number in base 10, to an unsigned long int.

    unsigned long int x = strtoul(s, &badchar, 10);

    // Check if things went well

    if (*badchar == '\0') {
        printf("Success! %lu\n", x);
    } else  {
        printf("Partial conversion: %lu\n", x);
        printf("Invalid character: %c\n", *badchar);
    }
}
```

So there you have it. The `atoi()`-style functions are good in a controlled pinch, but the `strtol()`-style functions give you far more control over error handling and the base of the input.

## <span class="header-section-number">15.2</span> `char` Conversions

What if you have a single character with a digit in it, like `'5'`… Is that the same as the value `5`?

Let’s try it and see.

``` c
printf("%d %d\n", 5, '5');
```

On my UTF-8 system, this prints:

``` default
5 53
```

So… no. And 53? What is that? That’s the UTF-8 (and ASCII) code point for the character symbol `'5'`<a href="function-specifiers-alignment-specifiersoperators.html#fn110" id="fnref110" class="footnote-ref" role="doc-noteref"><sup>110</sup></a>

So how do we convert the character `'5'` (which apparently has value 53) into the value `5`?

With one clever trick, that’s how!

The C Standard guarantees that these character will have code points that are in sequence and in this order:

``` default
0  1  2  3  4  5  6  7  8  9
```

Ponder for a second–how can we use that? Spoilers ahead…

Let’s take a look at the characters and their code points in UTF-8:

``` default
0  1  2  3  4  5  6  7  8  9
48 49 50 51 52 53 54 55 56 57
```

You see there that `'5'` is `53`, just like we were getting. And `'0'` is `48`.

So we can subtract `'0'` from any digit character to get its numeric value:

``` c
char c = '6';

int x = c;  // x has value 54, the code point for '6'

int y = c - '0'; // y has value 6, just like we want
```

And we can convert the other way, too, just by adding the value on.

``` c
int x = 6;

char c = x + '0';  // c has value 54

printf("%d\n", c);  // prints 54
printf("%c\n", c);  // prints 6 with %c
```

You might think this is a weird way to do this conversion, and by today’s standards, it certainly is. But back in the olden days when computers were made literally out of wood, this was the method for doing this conversion. And it wasn’t broke, so C never fixed it.

## <span class="header-section-number">15.3</span> Numeric Conversions

### <span class="header-section-number">15.3.1</span> Boolean

If you convert a zero to `bool`, the result is `0`. Otherwise it’s `1`.

### <span class="header-section-number">15.3.2</span> Integer to Integer Conversions

If an integer type is converted to unsigned and doesn’t fit in it, the unsigned result wraps around odometer-style until it fits in the unsigned<a href="function-specifiers-alignment-specifiersoperators.html#fn111" id="fnref111" class="footnote-ref" role="doc-noteref"><sup>111</sup></a>.

If an integer type is converted to a signed number and doesn’t fit, the result is implementation-defined! Something documented will happen, but you’ll have to look it up<a href="function-specifiers-alignment-specifiersoperators.html#fn112" id="fnref112" class="footnote-ref" role="doc-noteref"><sup>112</sup></a>

### <span class="header-section-number">15.3.3</span> Integer and Floating Point Conversions

If a floating point type is converted to an integer type, the fractional part is discarded with prejudice<a href="function-specifiers-alignment-specifiersoperators.html#fn113" id="fnref113" class="footnote-ref" role="doc-noteref"><sup>113</sup></a>.

But—and here’s the catch—if the number is too large to fit in the integer, you get undefined behavior. So don’t do that.

Going From integer or floating point to floating point, C makes a best effort to find the closest floating point number to the integer that it can.

Again, though, if the original value can’t be represented, it’s undefined behavior.

## <span class="header-section-number">15.4</span> Implicit Conversions

These are conversions the compiler does automatically for you when you mix and match types.

### <span class="header-section-number">15.4.1</span> The Integer Promotions

In a number of places, if an `int` can be used to represent a value from `char` or `short` (signed or unsigned), that value is *promoted* up to `int`. If it doesn’t fit in an `int`, it’s promoted to `unsigned int`.

This is how we can do something like this:

``` c
char x = 10, y = 20;
int i = x + y;
```

In that case, `x` and `y` get promoted to `int` by C before the math takes place.

The integer promotions take place during The Usual Arithmetic Conversions, with variadic functions<a href="function-specifiers-alignment-specifiersoperators.html#fn114" id="fnref114" class="footnote-ref" role="doc-noteref"><sup>114</sup></a>, unary `+` and `-` operators, or when passing values to functions without prototypes<a href="function-specifiers-alignment-specifiersoperators.html#fn115" id="fnref115" class="footnote-ref" role="doc-noteref"><sup>115</sup></a>.

### <span class="header-section-number">15.4.2</span> The Usual Arithmetic Conversions

These are automatic conversions that C does around numeric operations that you ask for. (That’s actually what they’re called, by the way, by C11 §6.3.1.8.) Note that for this section, we’re just talking about numeric types—strings will come later.

These conversions answer questions about what happens when you mix types, like this:

``` c
int x = 3 + 1.2;   // Mixing int and double
                   // 4.2 is converted to int
                   // 4 is stored in x

float y = 12 * 2;  // Mixing float and int
                   // 24 is converted to float
                   // 24.0 is stored in y
```

Do they become `int`s? Do they become `float`s? How does it work?

Here are the steps, paraphrased for easy consumption.

1.  If one thing in the expression is a floating type, convert the other things to that floating type.

2.  Otherwise, if both types are integer types, perform the integer promotions on each, then make the operand types as big as they need to be hold the common largest value. Sometimes this involves changing signed to unsigned.

If you want to know the gritty details, check out C11 §6.3.1.8. But you probably don’t.

Just generally remember that int types become float types if there’s a floating point type anywhere in there, and the compiler makes an effort to make sure mixed integer types don’t overflow.

Finally, if you convert from one floating point type to another, the compiler will try to make an exact conversion. If it can’t, it’ll do the best approximation it can. If the number is too large to fit in the type you’re converting into, *boom*: undefined behavior!

### <span class="header-section-number">15.4.3</span> `void*`

The `void*` type is interesting because it can be converted from or to any pointer type.

``` c
int x = 10;

void *p = &x;  // &x is type int*, but we store it in a void*

int *q = p;    // p is void*, but we store it in an int*
```

## <span class="header-section-number">15.5</span> Explicit Conversions

These are conversions from type to type that you have to ask for; the compiler won’t do it for you.

You can convert from one type to another by assigning one type to another with an `=`.

You can also convert explicitly with a *cast*.

### <span class="header-section-number">15.5.1</span> Casting

You can explicitly change the type of an expression by putting a new type in parentheses in front of it. Some C devs frown on the practice unless absolutely necessary, but it’s likely you’ll come across some C code with these in it.

Let’s do an example where we want to convert an `int` into a `long` so that we can store it in a `long`.

Note: this example is contrived and the cast in this case is completely unnecessary because the `x + 12` expression would automatically be changed to `long int` to match the wider type of `y`.

``` c
int x = 10;
long int y = (long int)x + 12;
```

In that example, even those `x` was type `int` before, the expression `(long int)x` has type `long int`. We say, “We cast `x` to `long int`.”

More commonly, you might see a cast being used to convert a `void*` into a specific pointer type so it can be dereferenced.

A callback from the built-in `qsort()` function might display this behavior since it has `void*`s passed into it:

``` c
int compar(const void *elem1, const void *elem2)
{
    if (*((const int*)elem2) > *((const int*)elem1)) return 1;
    if (*((const int*)elem2) < *((const int*)elem1)) return -1;
    return 0;
}
```

But you could also clearly write it with an assignment:

``` c
int compar(const void *elem1, const void *elem2)
{
    const int *e1 = elem1;
    const int *e2 = elem2;

    return *e2 - *e1;
}
```

One place you’ll see casts more commonly is to avoid a warning when printing pointer values with the rarely-used `%p` which gets picky with anything other than a `void*`:

``` c
int x = 3490;
int *p = &x;

printf("%p\n", p);
```

generates this warning:

``` default
warning: format ‘%p’ expects argument of type ‘void *’, but argument
         2 has type ‘int *’
```

You can fix it with a cast:

``` c
printf("%p\n", (void *)p);
```

Another place is with explicit pointer changes, if you don’t want to use an intervening `void*`, but these are also pretty uncommon:

``` c
long x = 3490;
long *p = &x;
unsigned char *c = (unsigned char *)p;
```

A third place it’s often required is with the character conversion functions in [`<ctype.h>`](https://beej.us/guide/bgclr/html/split/ctype.html)<a href="function-specifiers-alignment-specifiersoperators.html#fn116" id="fnref116" class="footnote-ref" role="doc-noteref"><sup>116</sup></a> where you should cast questionably-signed values to `unsigned char` to avoid undefined behavior.

Again, casting is rarely *needed* in practice. If you find yourself casting, there might be another way to do the same thing, or maybe you’re casting unnecessarily.

Or maybe it is necessary. Personally, I try to avoid it, but am not afraid to use it if I have to.

------------------------------------------------------------------------

<div class="nav-header">

<a href="types-ii-way-more-types.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="types-iv-qualifiers-and-specifiers.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
