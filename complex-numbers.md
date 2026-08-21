<div class="nav-header">

<a href="incomplete-types.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="fixed-width-integer-types.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">36</span> Complex Numbers

A tiny primer on [Complex numbers](https://en.wikipedia.org/wiki/Complex_number)<a href="function-specifiers-alignment-specifiersoperators.html#fn185" id="fnref185" class="footnote-ref" role="doc-noteref"><sup>185</sup></a> stolen directly from Wikipedia:

> A **complex number** is a number that can be expressed in the form <span class="math inline">\\a+bi\\</span>, where <span class="math inline">\\a\\</span> and <span class="math inline">\\b\\</span> are real numbers \[i.e. floating point types in C\], and <span class="math inline">\\i\\</span> represents the imaginary unit, satisfying the equation <span class="math inline">\\i^2=−1\\</span>. Because no real number satisfies this equation, <span class="math inline">\\i\\</span> is called an imaginary number. For the complex number <span class="math inline">\\a+bi\\</span>, <span class="math inline">\\a\\</span> is called the **real part**, and <span class="math inline">\\b\\</span> is called the **imaginary part**.

But that’s as far as I’m going to go. We’ll assume that if you’re reading this chapter, you know what a complex number is and what you want to do with them.

And all we need to cover is C’s faculties for doing so.

Turns out, though, that complex number support in a compiler is an *optional* feature. Not all compliant compilers can do it. And the ones that do, might do it to various degrees of completeness.

You can test if your system supports complex numbers with:

``` c
#ifdef __STDC_NO_COMPLEX__
#error Complex numbers not supported!
#endif
```

Furthermore, there is a macro that indicates adherence to the ISO 60559 (IEEE 754) standard for floating point math with complex numbers, as well as the presence of the `_Imaginary` type.

``` c
#if __STDC_IEC_559_COMPLEX__ != 1
#error Need IEC 60559 complex support!
#endif
```

More details on that are spelled out in Annex G in the C11 spec.

## <span class="header-section-number">36.1</span> Complex Types

To use complex numbers, `#include <complex.h>`.

With that, you get at least two types:

``` c
_Complex
complex
```

Those both mean the same thing, so you might as well use the prettier `complex`.

You also get some types for imaginary numbers if you implementation is IEC 60559-compliant:

``` c
_Imaginary
imaginary
```

These also both mean the same thing, so you might as well use the prettier `imaginary`.

You also get values for the imaginary number <span class="math inline">\\i\\</span>, itself:

``` c
I
_Complex_I
_Imaginary_I
```

The macro `I` is set to `_Imaginary_I` (if available), or `_Complex_I`. So just use `I` for the imaginary number.

One aside: I’ve said that if a compiler has `__STDC_IEC_559_COMPLEX__` set to `1`, it must support `_Imaginary` types to be compliant. That’s my read of the spec. However, I don’t know of a single compiler that actually supports `_Imaginary` even though they have `__STDC_IEC_559_COMPLEX__` set. So I’m going to write some code with that type in here I have no way of testing. Sorry!

OK, so now we know there’s a `complex` type, how can we use it?

## <span class="header-section-number">36.2</span> Assigning Complex Numbers

Since the complex number has a real and imaginary part, but both of them rely on floating point numbers to store values, we need to also tell C what precision to use for those parts of the complex number.

We do that by just pinning a `float`, `double`, or `long double` to the `complex`, either before or after it.

Let’s define a complex number that uses `float` for its components:

``` c
float complex c;   // Spec prefers this way
complex float c;   // Same thing--order doesn't matter
```

So that’s great for declarations, but how do we initialize them or assign to them?

Turns out we get to use some pretty natural notation. Example!

``` c
double complex x = 5 + 2*I;
double complex y = 10 + 3*I;
```

For <span class="math inline">\\5+2i\\</span> and <span class="math inline">\\10+3i\\</span>, respectively.

## <span class="header-section-number">36.3</span> Constructing, Deconstructing, and Printing

We’re getting there…

We’ve already seen one way to write a complex number:

``` c
double complex x = 5 + 2*I;
```

There’s also no problem using other floating point numbers to build it:

``` c
double a = 5;
double b = 2;
double complex x = a + b*I;
```

There is also a set of macros to help build these. The above code could be written using the `CMPLX()` macro, like so:

``` c
double complex x = CMPLX(5, 2);
```

As far as I can tell in my research, these are *almost* equivalent:

``` c
double complex x = 5 + 2*I;
double complex x = CMPLX(5, 2);
```

But the `CMPLX()` macro will handle negative zeros in the imaginary part correctly every time, whereas the other way might convert them to positive zeros. I *think*<a href="function-specifiers-alignment-specifiersoperators.html#fn186" id="fnref186" class="footnote-ref" role="doc-noteref"><sup>186</sup></a> This seems to imply that if there’s a chance the imaginary part will be zero, you should use the macro… but someone should correct me on this if I’m mistaken!

The `CMPLX()` macro works on `double` types. There are two other macros for `float` and `long double`: `CMPLXF()` and `CMPLXL()`. (These “f” and “l” suffixes appear in virtually all the complex-number-related functions.)

Now let’s try the reverse: if we have a complex number, how do we break it apart into its real and imaginary parts?

Here we have a couple functions that will extract the real and imaginary parts from the number: `creal()` and `cimag()`:

``` c
double complex x = 5 + 2*I;
double complex y = 10 + 3*I;

printf("x = %f + %fi\n", creal(x), cimag(x));
printf("y = %f + %fi\n", creal(y), cimag(y));
```

for the output:

``` default
x = 5.000000 + 2.000000i
y = 10.000000 + 3.000000i
```

Note that the `i` I have in the `printf()` format string is a literal `i` that gets printed—it’s not part of the format specifier. Both return values from `creal()` and `cimag()` are `double`.

And as usual, there are `float` and `long double` variants of these functions: `crealf()`, `cimagf()`, `creall()`, and `cimagl()`.

## <span class="header-section-number">36.4</span> Complex Arithmetic and Comparisons

Arithmetic can be performed on complex numbers, though how this works mathematically is beyond the scope of the guide.

``` c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex x = 1 + 2*I;
    double complex y = 3 + 4*I;
    double complex z;

    z = x + y;
    printf("x + y = %f + %fi\n", creal(z), cimag(z));

    z = x - y;
    printf("x - y = %f + %fi\n", creal(z), cimag(z));

    z = x * y;
    printf("x * y = %f + %fi\n", creal(z), cimag(z));

    z = x / y;
    printf("x / y = %f + %fi\n", creal(z), cimag(z));
}
```

for a result of:

``` default
x + y = 4.000000 + 6.000000i
x - y = -2.000000 + -2.000000i
x * y = -5.000000 + 10.000000i
x / y = 0.440000 + 0.080000i
```

You can also compare two complex numbers for equality (or inequality):

``` c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex x = 1 + 2*I;
    double complex y = 3 + 4*I;

    printf("x == y = %d\n", x == y);  // 0
    printf("x != y = %d\n", x != y);  // 1
}
```

with the output:

``` default
x == y = 0
x != y = 1
```

They are equal if both components test equal. Note that as with all floating point, they could be equal if they’re close enough due to rounding error<a href="function-specifiers-alignment-specifiersoperators.html#fn187" id="fnref187" class="footnote-ref" role="doc-noteref"><sup>187</sup></a>.

## <span class="header-section-number">36.5</span> Complex Math

But wait! There’s more than just simple complex arithmetic!

Here’s a summary table of all the math functions available to you with complex numbers.

I’m only going to list the `double` version of each function, but for all of them there is a `float` version that you can get by appending `f` to the function name, and a `long double` version that you can get by appending `l`.

For example, the `cabs()` function for computing the absolute value of a complex number also has `cabsf()` and `cabsl()` variants. I’m omitting them for brevity.

### <span class="header-section-number">36.5.1</span> Trigonometry Functions

| Function   | Description              |
|------------|--------------------------|
| `ccos()`   | Cosine                   |
| `csin()`   | Sine                     |
| `ctan()`   | Tangent                  |
| `cacos()`  | Arc cosine               |
| `casin()`  | Arc sine                 |
| `catan()`  | Play *Settlers of Catan* |
| `ccosh()`  | Hyperbolic cosine        |
| `csinh()`  | Hyperbolic sine          |
| `ctanh()`  | Hyperbolic tangent       |
| `cacosh()` | Arc hyperbolic cosine    |
| `casinh()` | Arc hyperbolic sine      |
| `catanh()` | Arc hyperbolic tangent   |

### <span class="header-section-number">36.5.2</span> Exponential and Logarithmic Functions

| Function | Description                                                     |
|----------|-----------------------------------------------------------------|
| `cexp()` | Base-<span class="math inline">\\e\\</span> exponential         |
| `clog()` | Natural (base-<span class="math inline">\\e\\</span>) logarithm |

### <span class="header-section-number">36.5.3</span> Power and Absolute Value Functions

| Function  | Description    |
|-----------|----------------|
| `cabs()`  | Absolute value |
| `cpow()`  | Power          |
| `csqrt()` | Square root    |

### <span class="header-section-number">36.5.4</span> Manipulation Functions

| Function | Description |
|----|----|
| `creal()` | Return real part |
| `cimag()` | Return imaginary part |
| `CMPLX()` | Construct a complex number |
| `carg()` | Argument/phase angle |
| `conj()` | Conjugate<a href="function-specifiers-alignment-specifiersoperators.html#fn188" id="fnref188" class="footnote-ref" role="doc-noteref"><sup>188</sup></a> |
| `cproj()` | Projection on Riemann sphere |

------------------------------------------------------------------------

<div class="nav-header">

<a href="incomplete-types.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="fixed-width-integer-types.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
