<div class="nav-header">

<a href="hello-world.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="functions.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">3</span> Variables and Statements

> *“It takes all kinds to make a world, does it not, Padre?”*\
> *“So it does, my son, so it does.”*
>
> —Pirate Captain Thomas Bartholomew Red to the Padre, Pirates

There sure can be lotsa stuff in a C program.

Yup.

And for various reasons, it’ll be easier for all of us if we classify some of the types of things you can find in a program, so we can be clear what we’re talking about.

## <span class="header-section-number">3.1</span> Variables

It’s said that “variables hold values”. But another way to think about it is that a variable is a human-readable name that refers to some data in memory.

We’re going to take a second here and take a peek down the rabbit hole that is pointers. Don’t worry about it.

You can think of memory as a big array of bytes<a href="function-specifiers-alignment-specifiersoperators.html#fn33" id="fnref33" class="footnote-ref" role="doc-noteref"><sup>33</sup></a>. Data is stored in this “array”<a href="function-specifiers-alignment-specifiersoperators.html#fn34" id="fnref34" class="footnote-ref" role="doc-noteref"><sup>34</sup></a>. If a number is larger than a single byte, it is stored in multiple bytes. Because memory is like an array, each byte of memory can be referred to by its index. This index into memory is also called an *address*, or a *location*, or a *pointer*.

When you have a variable in C, the value of that variable is in memory *somewhere*, at some address. Of course. After all, where else would it be? But it’s a pain to refer to a value by its numeric address, so we make a name for it instead, and that’s what the variable is.

The reason I’m bringing all this up is twofold:

1.  It’s going to make it easier to understand pointer variables later—they’re variables that hold the address of other variables!
2.  Also, it’s going to make it easier to understand pointers later.

So a variable is a name for some data that’s stored in memory at some address.

### <span class="header-section-number">3.1.1</span> Variable Names

You can use any characters in the range 0-9, A-Z, a-z, and underscore for variable names, with the following rules:

- You can’t start a variable with a digit 0-9.
- You can’t start a variable name with two underscores.
- You can’t start a variable name with an underscore followed by a capital A-Z.

For Unicode, just try it. There are some rules in the spec in §D.2 that talk about which Unicode codepoint ranges are allowed in which parts of identifiers, but that’s too much to write about here and is probably something you’ll never have to think about anyway.

### <span class="header-section-number">3.1.2</span> Variable Types

Depending on which languages you already have in your toolkit, you might or might not be familiar with the idea of types. But C’s kinda picky about them, so we should do a refresher.

Some example types, some of the most basic:

| Type | Example | C Type |
|:---|---:|:---|
| Integer | `3490` | `int` |
| Floating point | `3.14159` | `float`<a href="function-specifiers-alignment-specifiersoperators.html#fn35" id="fnref35" class="footnote-ref" role="doc-noteref"><sup>35</sup></a> |
| Character (single) | `'c'` | `char` |
| String | `"Hello, world!"` | `char *`<a href="function-specifiers-alignment-specifiersoperators.html#fn36" id="fnref36" class="footnote-ref" role="doc-noteref"><sup>36</sup></a> |

C makes an effort to convert automatically between most numeric types when you ask it to. But other than that, all conversions are manual, notably between string and numeric.

Almost all of the types in C are variants on these types.

Before you can use a variable, you have to *declare* that variable and tell C what type the variable holds. Once declared, the type of variable cannot be changed later at runtime. What you set it to is what it is until it falls out of scope and is reabsorbed into the universe.

Let’s take our previous “Hello, world” code and add a couple variables to it:

``` c
#include <stdio.h>

int main(void)
{
    int i;    // Holds signed integers, e.g. -3, -2, 0, 1, 10
    float f;  // Holds signed floating point numbers, e.g. -3.1416

    printf("Hello, World!\n");  // Ah, blessed familiarity
}
```

There! We’ve declared a couple of variables. We haven’t used them yet, and they’re both uninitialized. One holds an integer number, and the other holds a floating point number (a real number, basically, if you have a math background).

Uninitialized variables have indeterminate value<a href="function-specifiers-alignment-specifiersoperators.html#fn37" id="fnref37" class="footnote-ref" role="doc-noteref"><sup>37</sup></a>. They have to be initialized or else you must assume they contain some nonsense number.

> This is one of the places C can “get you”. Much of the time, in my experience, the indeterminate value is zero… but it can vary from run to run! Never assume the value will be zero, even if you see it is. *Always* explicitly initialize variables to some value before you use them<a href="function-specifiers-alignment-specifiersoperators.html#fn38" id="fnref38" class="footnote-ref" role="doc-noteref"><sup>38</sup></a>.

What’s this? You want to store some numbers in those variables? Insanity!

Let’s go ahead and do that:

``` c
int main(void)
{
    int i;

    i = 2; // Assign the value 2 into the variable i

    printf("Hello, World!\n");
}
```

Killer. We’ve stored a value. Let’s print it.

We’re going to do that by passing *two* amazing arguments to the `printf()` function. The first argument is a string that describes what to print and how to print it (called the *format string*), and the second is the value to print, namely whatever is in the variable `i`.

`printf()` hunts through the format string for a variety of special sequences which start with a percent sign (`%`) that tell it what to print. For example, if it finds a `%d`, it looks to the next parameter that was passed, and prints it out as an integer. If it finds a `%f`, it prints the value out as a float. If it finds a `%s`, it prints a string.

As such, we can print out the value of various types like so:

``` c
#include <stdio.h>

int main(void)
{
    int i = 2;
    float f = 3.14;
    char *s = "Hello, world!";  // char * ("char pointer") is the string type

    printf("%s  i = %d and f = %f!\n", s, i, f);
}
```

And the output will be:

``` default
Hello, world!  i = 2 and f = 3.14!
```

In this way, `printf()` might be similar to various types of format strings or parameterized strings in other languages you’re familiar with.

***NOTE:*** In the following sections, I just assume that you’ve declared the variables ahead of time. If the example uses integers `i` and `j`, just assume somewhere above the example I had:

``` c
int i, j;
```

### <span class="header-section-number">3.1.3</span> Boolean Types

C has Boolean types, true or false?

`1`!

Historically, C didn’t have a Boolean type, and some might argue it still doesn’t.

In C, `0` means “false”, and non-zero means “true”.

So `1` is true. And `-37` is true. And `0` is false.

You can just declare Boolean types as `int`s:

``` c
int x = 1;

if (x) {
    printf("x is true!\n");
}
```

In C23, you get actual `bool`, `true`, and `false`. Before that, if you have a modern-enough version of C, you can `#include <stdbool.h>` to get the same thing.

``` c
#include <stdio.h>
#include <stdbool.h>  // not needed in C23

int main(void) {
    bool x = true;

    if (x) {
        printf("x is true!\n");
    }
}
```

While technically you should be setting a `bool` variable to `true`, `false`, or the result of some expression that evaluates to true or false, you can actually convert all kinds of things to `bool`. There are some specific rules, but zero-ish things tend to evaluate to `false`, and non-zero-ish things to true.

But be careful if you mix and match since the numeric value of `true` is `1`, probably<a href="function-specifiers-alignment-specifiersoperators.html#fn39" id="fnref39" class="footnote-ref" role="doc-noteref"><sup>39</sup></a>, and if you’re relying on some other positive value to be true, you might get a mismatch. For example:

``` c
printf("%d\n", true == 12);  // Prints "0", false!
```

## <span class="header-section-number">3.2</span> Operators and Expressions

C operators should be familiar to you from other languages. Let’s blast through some of them here.

(There are a bunch more details than this, but we’re going to do enough in this section to get started.)

### <span class="header-section-number">3.2.1</span> Arithmetic

Hopefully these are familiar:

``` c
i = i + 3;  // Addition (+) and assignment (=) operators, add 3 to i
i = i - 8;  // Subtraction, subtract 8 from i
i = i * 9;  // Multiplication
i = i / 2;  // Division
i = i % 5;  // Modulo (division remainder)
```

There are shorthand variants for all of the above. Each of those lines could more tersely be written as:

``` c
i += 3;  // Same as "i = i + 3", add 3 to i
i -= 8;  // Same as "i = i - 8"
i *= 9;  // Same as "i = i * 9"
i /= 2;  // Same as "i = i / 2"
i %= 5;  // Same as "i = i % 5"
```

There is no exponentiation. You’ll have to use one of the `pow()` function variants from `math.h`.

Let’s get into some of the weirder stuff you might not have in your other languages!

### <span class="header-section-number">3.2.2</span> Ternary Operator

C also includes the *ternary operator*. This is an expression whose value depends on the result of a conditional embedded in it.

``` c
// If x > 10, add 17 to y. Otherwise add 37 to y.

y += x > 10? 17: 37;
```

What a mess! You’ll get used to it the more you read it. To help out a bit, I’ll rewrite the above expression using `if` statements:

``` c
// This expression:

y += x > 10? 17: 37;

// is equivalent to this non-expression:

if (x > 10)
    y += 17;
else
    y += 37;
```

Compare those two until you see each of the components of the ternary operator.

Or, another example that prints if a number stored in `x` is odd or even:

``` c
printf("The number %d is %s.\n", x, x % 2 == 0? "even": "odd");
```

The `%s` format specifier in `printf()` means print a string. If the expression `x % 2` evaluates to `0`, the value of the entire ternary expression evaluates to the string `"even"`. Otherwise it evaluates to the string `"odd"`. Pretty cool!

It’s important to note that the ternary operator isn’t flow control like the `if` statement is. It’s just an expression that evaluates to a value.

### <span class="header-section-number">3.2.3</span> Pre-and-Post Increment-and-Decrement

Now, let’s mess with another thing that you might not have seen.

These are the legendary post-increment and post-decrement operators:

``` c
i++;        // Add one to i (post-increment)
i--;        // Subtract one from i (post-decrement)
```

Very commonly, these are just used as shorter versions of:

``` c
i += 1;        // Add one to i
i -= 1;        // Subtract one from i
```

but they’re more subtly different than that, the clever scoundrels.

Let’s take a look at this variant, pre-increment and pre-decrement:

``` c
++i;        // Add one to i (pre-increment)
--i;        // Subtract one from i (pre-decrement)
```

With pre-increment and pre-decrement, the value of the variable is incremented or decremented *before* the expression is evaluated. Then the expression is evaluated with the new value.

With post-increment and post-decrement, the value of the expression is first computed with the value as-is, and *then* the value is incremented or decremented after the value of the expression has been determined.

You can actually embed them in expressions, like this:

``` c
i = 10;
j = 5 + i++;  // Compute 5 + i, _then_ increment i

printf("%d, %d\n", i, j);  // Prints 11, 15
```

Let’s compare this to the pre-increment operator:

``` c
i = 10;
j = 5 + ++i;  // Increment i, _then_ compute 5 + i

printf("%d, %d\n", i, j);  // Prints 11, 16
```

This technique is used frequently with array and pointer access and manipulation. It gives you a way to use the value in a variable, and also increment or decrement that value before or after it is used.

But by far the most common place you’ll see this is in a `for` loop:

``` c
for (i = 0; i < 10; i++)
    printf("i is %d\n", i);
```

But more on that later.

### <span class="header-section-number">3.2.4</span> The Comma Operator

This is an uncommonly-used way to separate expressions that will run left to right:

``` c
x = 10, y = 20;  // First assign 10 to x, then 20 to y
```

Seems a bit silly, since you could just replace the comma with a semicolon, right?

``` c
x = 10; y = 20;  // First assign 10 to x, then 20 to y
```

But that’s a little different. The latter is two separate expressions, while the former is a single expression!

With the comma operator, the value of the comma expression is the value of the rightmost expression:

``` c
x = (1, 2, 3);

printf("x is %d\n", x);  // Prints 3, because 3 is rightmost in the comma list
```

But even that’s pretty contrived. One common place the comma operator is used is in `for` loops to do multiple things in each section of the statement:

``` c
for (i = 0, j = 10; i < 100; i++, j++)
    printf("%d, %d\n", i, j);
```

We’ll revisit that later.

### <span class="header-section-number">3.2.5</span> Conditional Operators

For Boolean values, we have a raft of standard operators:

``` c
a == b;  // True if a is equivalent to b
a != b;  // True if a is not equivalent to b
a < b;   // True if a is less than b
a > b;   // True if a is greater than b
a <= b;  // True if a is less than or equal to b
a >= b;  // True if a is greater than or equal to b
```

Don’t mix up assignment (`=`) with comparison (`==`)! Use two equals to compare, one to assign.

We can use the comparison expressions with `if` statements:

``` c
if (a <= 10)
    printf("Success!\n");
```

### <span class="header-section-number">3.2.6</span> Boolean Operators

We can chain together or alter conditional expressions with Boolean operators for *and*, *or*, and *not*.

| Operator | Boolean meaning |
|:--------:|:---------------:|
|   `&&`   |       and       |
|   `||`   |       or        |
|   `!`    |       not       |

An example of Boolean “and”:

``` c
// Do something if x less than 10 and y greater than 20:

if (x < 10 && y > 20)
    printf("Doing something!\n");
```

An example of Boolean “not”:

``` c
if (!(x < 12))
    printf("x is not less than 12\n");
```

`!` has higher precedence than the other Boolean operators, so we have to use parentheses in that case.

Of course, that’s just the same as:

``` c
if (x >= 12)
    printf("x is not less than 12\n");
```

but I needed the example!

### <span class="header-section-number">3.2.7</span> The `sizeof` Operator

This operator tells you the size (in bytes) that a particular variable or data type uses in memory.

More particularly, it tells you the size (in bytes) that the *type of a particular expression* (which might be just a single variable) uses in memory.

This can be different on different systems, except for `char` and its variants (which are always 1 byte).

And this might not seem very useful now, but we’ll be making references to it here and there, so it’s worth covering.

Since this computes the number of bytes needed to store a type, you might think it would return an `int`. Or… since the size can’t be negative, maybe an `unsigned`?

But it turns out C has a special type to represent the return value from `sizeof`. It’s `size_t`, pronounced “*size tee*”<a href="function-specifiers-alignment-specifiersoperators.html#fn40" id="fnref40" class="footnote-ref" role="doc-noteref"><sup>40</sup></a>. All we know is that it’s an unsigned integer type that can hold the size in bytes of anything you can give to `sizeof`.

`size_t` shows up a lot of different places where counts of things are passed or returned. Think of it as a value that represents a count.

You can take the `sizeof` a variable or expression:

``` c
int a = 999;

// %zu is the format specifier for type size_t
// If your compiler balks at the "z" part, leave it off

printf("%zu\n", sizeof a);      // Prints 4 on my system
printf("%zu\n", sizeof(2 + 7)); // Prints 4 on my system
printf("%zu\n", sizeof 3.14);   // Prints 8 on my system

// If you need to print out negative size_t values, use %zd
```

Remember: it’s the size in bytes of the *type* of the expression, not the size of the expression itself. That’s why the size of `2+7` is the same as the size of `a`—they’re both type `int`. We’ll revisit this number `4` in the very next block of code…

…Where we’ll see you can take the `sizeof` a type (note the parentheses are required around a type name, unlike an expression):

``` c
printf("%zu\n", sizeof(int));   // Prints 4 on my system
printf("%zu\n", sizeof(char));  // Prints 1 on all systems
```

It’s important to note that `sizeof` is a *compile-time* operation<a href="function-specifiers-alignment-specifiersoperators.html#fn41" id="fnref41" class="footnote-ref" role="doc-noteref"><sup>41</sup></a>. The result of the expression is determined entirely at compile-time, not at runtime.

We’ll make use of this later on.

## <span class="header-section-number">3.3</span> Flow Control

Booleans are all good, but of course we’re nowhere if we can’t control program flow. Let’s take a look at a number of constructs: `if`, `for`, `while`, and `do-while`.

First, a general forward-looking note about statements and blocks of statements brought to you by your local friendly C developer:

After something like an `if` or `while` statement, you can either put a single statement to be executed, or a block of statements to all be executed in sequence.

Let’s start with a single statement:

``` c
if (x == 10) printf("x is 10\n");
```

This is also sometimes written on a separate line. (Whitespace is largely irrelevant in C—it’s not like Python.)

``` c
if (x == 10)
    printf("x is 10\n");
```

But what if you want multiple things to happen due to the conditional? You can use squirrelly braces to mark a *block* or *compound statement*.

``` c
if (x == 10) {
    printf("x is 10\n");
    printf("And also this happens when x is 10\n");
}
```

It’s a really common style to *always* use squirrelly braces even if they aren’t necessary:

``` c
if (x == 10) {
    printf("x is 10\n");
}
```

Some devs feel the code is easier to read and avoids errors like this where things visually look like they’re in the `if` block, but actually they aren’t.

``` c
// BAD ERROR EXAMPLE

if (x == 10)
    printf("This happens if x is 10\n");
    printf("This happens ALWAYS\n");  // Surprise!! Unconditional!
```

`while` and `for` and the other looping constructs work the same way as the examples above. If you want to do multiple things in a loop or after an `if`, wrap them up in squirrelly braces.

In other words, the `if` is going to run the one thing after the `if`. And that one thing can be a single statement or a block of statements.

### <span class="header-section-number">3.3.1</span> The `if`-`else` statement

We’ve already been using `if` for multiple examples, since it’s likely you’ve seen it in a language before, but here’s another:

``` c
int i = 10;

if (i > 10) {
    printf("Yes, i is greater than 10.\n");
    printf("And this will also print if i is greater than 10.\n");
}

if (i <= 10) printf("i is less than or equal to 10.\n");
```

In the example code, the message will print if `i` is greater than 10, otherwise execution continues to the next line. Notice the squirrley braces after the `if` statement; if the condition is true, either the first statement or expression right after the if will be executed, or else the collection of code in the squirlley braces after the `if` will be executed. This sort of *code block* behavior is common to all statements.

Of course, because C is fun this way, you can also do something if the condition is false with an `else` clause on your `if`:

``` c
int i = 99;

if (i == 10)
    printf("i is 10!\n");
else {
    printf("i is decidedly not 10.\n");
    printf("Which irritates me a little, frankly.\n");
}
```

And you can even cascade these to test a variety of conditions, like this:

``` c
int i = 99;

if (i == 10)
    printf("i is 10!\n");

else if (i == 20)
    printf("i is 20!\n");

else if (i == 99) {
    printf("i is 99! My favorite\n");
    printf("I can't tell you how happy I am.\n");
    printf("Really.\n");
}
    
else
    printf("i is some crazy number I've never heard of.\n");
```

Though if you’re going that route, be sure to check out the [`switch`](variables-and-statements.html#switch-statement) statement for a potentially better solution. The catch is `switch` only works with equality comparisons with constant numbers. The above `if`-`else` cascade could check inequality, ranges, variables, or anything else you can craft in a conditional expression.

### <span class="header-section-number">3.3.2</span> The `while` statement

`while` is your average run-of-the-mill looping construct. Do a thing while a condition expression is true.

Let’s do one!

``` c
// Print the following output:
//
//   i is now 0!
//   i is now 1!
//   [ more of the same between 2 and 7 ]
//   i is now 8!
//   i is now 9!

int i = 0;

while (i < 10) {
    printf("i is now %d!\n", i);
    i++;
}

printf("All done!\n");
```

That gets you a basic loop. C also has a `for` loop which would have been cleaner for that example.

A not-uncommon use of `while` is for infinite loops where you repeat while true:

``` c
while (1) {
    printf("1 is always true, so this repeats forever.\n");
}
```

### <span class="header-section-number">3.3.3</span> The `do-while` statement

So now that we’ve gotten the `while` statement under control, let’s take a look at its closely related cousin, `do-while`.

They are basically the same, except if the loop condition is false on the first pass, `do-while` will execute once, but `while` won’t execute at all. In other words, the test to see whether or not to execute the block happens at the *end* of the block with `do-while`. It happens at the *beginning* of the block with `while`.

Let’s see by example:

``` c
// Using a while statement:

i = 10;

// this is not executed because i is not less than 10:
while(i < 10) {
    printf("while: i is %d\n", i);
    i++;
}

// Using a do-while statement:

i = 10;

// this is executed once, because the loop condition is not checked until
// after the body of the loop runs:

do {
    printf("do-while: i is %d\n", i);
    i++;
} while (i < 10);

printf("All done!\n");
```

Notice that in both cases, the loop condition is false right away. So in the `while`, the loop fails, and the following block of code is never executed. With the `do-while`, however, the condition is checked *after* the block of code executes, so it always executes at least once. In this case, it prints the message, increments `i`, then fails the condition, and continues to the “All done!” output.

The moral of the story is this: if you want the loop to execute at least once, no matter what the loop condition, use `do-while`.

All these examples might have been better done with a `for` loop. Let’s do something less deterministic—repeat until a certain random number comes up!

``` c
#include <stdio.h>   // For printf
#include <stdlib.h>  // For rand

int main(void)
{
    int r;

    do {
        r = rand() % 100; // Get a random number between 0 and 99
        printf("%d\n", r);
    } while (r != 37);    // Repeat until 37 comes up
}
```

Side note: did you run that more than once? If you did, did you notice the same sequence of numbers came up again. And again. And again? This is because `rand()` is a pseudorandom number generator that must be *seeded* with a different number in order to generate a different sequence. Look up the [`srand()`](https://beej.us/guide/bgclr/html/split/stdlib.html#man-srand)<a href="function-specifiers-alignment-specifiersoperators.html#fn42" id="fnref42" class="footnote-ref" role="doc-noteref"><sup>42</sup></a> function for more details.

### <span class="header-section-number">3.3.4</span> The `for` statement

Welcome to one of the most popular loops in the world! The `for` loop!

This is a great loop if you know the number of times you want to loop in advance.

You could do the same thing using just a `while` loop, but the `for` loop can help keep the code cleaner.

Here are two pieces of equivalent code—note how the `for` loop is just a more compact representation:

``` c
// Print numbers between 0 and 9, inclusive...

// Using a while statement:

i = 0;
while (i < 10) {
    printf("i is %d\n", i);
    i++;
}

// Do the exact same thing with a for-loop:

for (i = 0; i < 10; i++) {
    printf("i is %d\n", i);
}
```

That’s right, folks—they do exactly the same thing. But you can see how the `for` statement is a little more compact and easy on the eyes. (JavaScript users will fully appreciate its C origins at this point.)

It’s split into three parts, separated by semicolons. The first is the initialization, the second is the loop condition, and the third is what should happen at the end of the block if the loop condition is true. All three of these parts are optional.

``` c
for (initialize things; loop if this is true; do this after each loop)
```

Note that the loop will not execute even a single time if the loop condition starts off false.

> **`for`-loop fun fact!**
>
> You can use the comma operator to do multiple things in each clause of the `for` loop!
>
> ``` c
> for (i = 0, j = 999; i < 10; i++, j--) {
>     printf("%d, %d\n", i, j);
> }
> ```

An empty `for` will run forever:

``` c
for(;;) {  // "forever"
    printf("I will print this again and again and again\n" );
    printf("for all eternity until the heat-death of the universe.\n");

    printf("Or until you hit CTRL-C.\n");
}
```

### <span class="header-section-number">3.3.5</span> The `switch` Statement

Depending on what languages you’re coming from, you might or might not be familiar with `switch`, or C’s version might even be more restrictive than you’re used to. This is a statement that allows you to take a variety of actions depending on the value of an integer expression.

Basically, it evaluates an expression to an integer value, jumps to the `case` that corresponds to that value. Execution resumes from that point. If a `break` statement is encountered, then execution jumps out of the `switch`.

Here’s an example where, for a given number of goats, we print out a gut-feel of how many goats that is.

``` c
#include <stdio.h>

int main(void)
{
    int goat_count = 2;

    switch (goat_count) {
        case 0:
            printf("You have no goats.\n");
            break;

        case 1:
            printf("You have a singular goat.\n");
            break;

        case 2:
            printf("You have a brace of goats.\n");
            break;

        default:
            printf("You have a bona fide plethora of goats!\n");
            break;
    }
}
```

In that example, the `switch` will jump to the `case 2` and execute from there. When (if) it hits a `break`, it jumps out of the `switch`.

Also, you might see that `default` label there at the bottom. This is what happens when no cases match.

Every `case`, including `default`, is optional. And they can occur in any order, but it’s really typical for `default`, if any, to be listed last.

So the whole thing acts like an `if`-`else` cascade:

``` c
if (goat_count == 0)
    printf("You have no goats.\n");
else if (goat_count == 1)
    printf("You have a singular goat.\n");
else if (goat_count == 2)
    printf("You have a brace of goats.\n");
else
    printf("You have a bona fide plethora of goats!\n");
```

With some key differences:

- `switch` is often faster to jump to the correct code (though the spec makes no such guarantee).
- `if`-`else` can do things like relational conditionals like `<` and `>=` and floating point and other types, while `switch` cannot.

There’s one more neat thing about switch that you sometimes see that is quite interesting: *fall through*.

Remember how `break` causes us to jump out of the switch?

Well, what happens if we *don’t* `break`?

Turns out we just keep on going into the next `case`! Demo!

``` c
switch (x) {
    case 1:
        printf("1\n");
        // Fall through!
    case 2:
        printf("2\n");
        break;
    case 3:
        printf("3\n");
        break;
}
```

If `x == 1`, this `switch` will first hit `case 1`, it’ll print the `1`, but then it just continues on to the next line of code… which prints `2`!

And then, at last, we hit a `break` so we jump out of the `switch`.

if `x == 2`, then we just hit the `case 2`, print `2`, and `break` as normal.

Not having a `break` is called *fall through*.

ProTip: *ALWAYS* put a comment in the code where you intend to fall through, like I did above. It will save other programmers from wondering if you meant to do that.

In fact, this is one of the common places to introduce bugs in C programs: forgetting to put a `break` in your `case`. You gotta do it if you don’t want to just roll into the next case<a href="function-specifiers-alignment-specifiersoperators.html#fn43" id="fnref43" class="footnote-ref" role="doc-noteref"><sup>43</sup></a>.

Earlier I said that `switch` works with integer types—keep it that way. Don’t use floating point or string types in there. One loophole-ish thing here is that you can use character types because those are secretly integers themselves. So this is perfectly acceptable:

``` c
char c = 'b';

switch (c) {
    case 'a':
        printf("It's 'a'!\n");
        break;

    case 'b':
        printf("It's 'b'!\n");
        break;

    case 'c':
        printf("It's 'c'!\n");
        break;
}
```

Finally, you can use `enum`s in `switch` since they are also integer types. But more on that in the `enum` chapter.

------------------------------------------------------------------------

<div class="nav-header">

<a href="hello-world.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="functions.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
