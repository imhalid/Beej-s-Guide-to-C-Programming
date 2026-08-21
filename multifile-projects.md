<div class="nav-header">

<a href="types-iv-qualifiers-and-specifiers.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="the-outside-environment.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">17</span> Multifile Projects

So far we’ve been looking at toy programs that for the most part fit in a single file. But complex C programs are made up of many files that are all compiled and linked together into a single executable.

In this chapter we’ll check out some of the common patterns and practices for putting together larger projects.

## <span class="header-section-number">17.1</span> Includes and Function Prototypes

A really common situation is that some of your functions are defined in one file, and you want to call them from another.

This actually works out of the box with a warning… let’s first try it and then look at the right way to fix the warning.

To compile them, you’ll need to specify all the sources on the command line:

``` zsh
# output file   source files
#     v            v
#   |----| |---------|
gcc -o foo foo.c bar.c
```

In that example, `foo.c` and `bar.c` get built into the executable named `foo`.

For these examples, we’ll put the filename as the first comment in the source. Let’s take a look at the source file `bar.c`:

``` c
// File bar.c

int add(int x, int y)
{
    return x + y;
}
```

And the file `foo.c` with main in it:

``` c
// File foo.c

#include <stdio.h>

int main(void)
{
    printf("%d\n", add(2, 3));  // 5!
}
```

See how from `main()` we call `add()`—but `add()` is in a completely different source file! It’s in `bar.c`, while the call to it is in `foo.c`!

If we build this with:

``` zsh
gcc -o foo foo.c bar.c
```

we get this error:

``` default
error: implicit declaration of function 'add' is invalid in C99
```

(Or you might get a warning. Which you should not ignore. Never ignore warnings in C; address them all.)

If you recall from the [section on prototypes](functions.html#prototypes), implicit declarations are banned in modern C and there’s no legitimate reason to introduce them into new code. We should fix it.

What `implicit declaration` means is that we’re using a function, namely `add()` in this case, without letting C know anything about it ahead of time. C wants to know what it returns, what types it takes as arguments, and things such as that.

We saw how to fix that earlier with a *function prototype*. Indeed, if we add one of those to `foo.c` before we make the call, everything works well:

``` c
// File foo.c

#include <stdio.h>

int add(int, int);  // Add the prototype

int main(void)
{
    printf("%d\n", add(2, 3));  // 5!
}
```

No more error!

But that’s a pain—needing to type in the prototype every time you want to use a function. I mean, we used `printf()` right there and didn’t need to type in a prototype; what gives?

*We actually did include the prototype for `printf()`*! It’s in the file `stdio.h`! And we included that with `#include`!

Can we do the same with our `add()` function? Make a prototype for it and put it in a header file?

Sure!

Header files in C have a `.h` extension by convention. And they often, but not always, have the same name as their corresponding `.c` file. So let’s make a `bar.h` file for our `bar.c` file, and we’ll stick the prototype in it:

``` c
// File bar.h

int add(int, int);
```

And now let’s modify `foo.c` to include that file. Assuming it’s in the same directory, we include it inside double quotes (as opposed to angle brackets):

``` c
// File foo.c

#include <stdio.h>

#include "bar.h"  // Include from current directory

int main(void)
{
    printf("%d\n", add(2, 3));  // 5!
}
```

Notice how we don’t have the prototype in `foo.c` anymore—we included it from `bar.h`. Now *any* file that wants that `add()` functionality can just `#include "bar.h"` to get it, and you don’t need to worry about typing in the function prototype.

As you might have guessed, `#include` literally includes the named file *right there* in your source code, just as if you’d typed it in.

And building and running:

``` zsh
./foo
5
```

Indeed, we get the result of <span class="math inline">\\2+3\\</span>! Yay!

But don’t crack open your drink of choice quite yet. We’re almost there! There’s just one more piece of boilerplate we have to add.

## <span class="header-section-number">17.2</span> Dealing with Repeated Includes

It’s not uncommon that a header file will itself `#include` other headers needed for the functionality of its corresponding C files. I mean, why not?

And it could be that you have a header `#include`d multiple times from different places. Maybe that’s no problem, but maybe it would cause compiler errors. And we can’t control how many places `#include` it!

Even, worse we might get into a crazy situation where header `a.h` includes header `b.h`, and `b.h` includes `a.h`! It’s an `#include` infinite cycle!

Trying to build such a thing gives an error:

``` default
error: #include nested depth 200 exceeds maximum of 200
```

Maybe it would have resolved the cycle on the 201st step…

What we need to do is make it so that if a file gets included once, subsequent `#include`s for that file are ignored.

**The stuff that we’re about to do is so common that you should just automatically do it every time you make a header file!**

And the common way to do this is with a preprocessor variable that we set the first time we `#include` the file. And then for subsequent `#include`s, we first check to make sure that the variable isn’t defined.

For that variable name, it’s super common to take the name of the header file, like `bar.h`, make it uppercase, and replace the period with an underscore: `BAR_H`.

So put a check at the very, very top of the file where you see if it’s already been included, and effectively comment the whole thing out if it has.

(Don’t put a leading underscore (because a leading underscore followed by a capital letter is reserved) or a double leading underscore (because that’s also reserved.))

``` c
#ifndef BAR_H   // If BAR_H isn't defined...
#define BAR_H   // Define it (with no particular value)

// File bar.h

int add(int, int);

#endif          // End of the #ifndef BAR_H
```

This will effectively cause the header file to be included only a single time, no matter how many places try to `#include` it.

## <span class="header-section-number">17.3</span> `static` and `extern`

You can refer to objects in other files with `extern`.

You can make sure file-scope variables and functions are *not* visible from other source files (even if `extern` is used) with the `static` keyword.

For more info, check out the sections in the book on the [`static`](types-iv-qualifiers-and-specifiers.html#static) and [`extern`](types-iv-qualifiers-and-specifiers.html#extern) storage-class specifiers.

## <span class="header-section-number">17.4</span> Compiling with Object Files

This isn’t part of the spec, but it’s 99.999% common in the C world.

You can compile C files into intermediate representations called *object files*. These hold the machine code (that is, 1s and 0s of the actual instructions) that haven’t been built into an executable yet.

Object files in Windows have a `.OBJ` extension; in Unix-likes, they’re `.o`.

In gcc, we can build some like this, with the `-c` (compile only!) flag:

``` zsh
gcc -c foo.c     # produces foo.o
gcc -c bar.c     # produces bar.o
```

And then we can *link* those together into a single executable:

``` zsh
gcc -o foo foo.o bar.o
```

*Voila*, we’ve produced an executable `foo` from the two object files.

But you’re thinking, why bother? Can’t we just:

``` zsh
gcc -o foo foo.c bar.c
```

and kill two [boids](https://en.wikipedia.org/wiki/Boids)<a href="function-specifiers-alignment-specifiersoperators.html#fn119" id="fnref119" class="footnote-ref" role="doc-noteref"><sup>119</sup></a> with one stone?

For little programs, that’s fine. I do it all the time.

But for larger programs, we can take advantage of the fact that compiling from source to object files is relatively slow, and linking together a bunch of object files is relatively fast.

This really shows with the `make` utility that only rebuilds sources that are newer than their outputs.

Let’s say you had a thousand C files. You could compile them all to object files to start (slowly) and then combine all those object files into an executable (fast).

Now say you modified just one of those C source files—here’s the magic: *you only have to rebuild that one object file for that source file*! And then you rebuild the executable (fast). All the other C files don’t have to be touched.

In other words, by only rebuilding the object files we need to, we cut down on compilation times radically. (Unless of course you’re doing a “clean” build, in which case all the object files have to be created.)

------------------------------------------------------------------------

<div class="nav-header">

<a href="types-iv-qualifiers-and-specifiers.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="the-outside-environment.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
