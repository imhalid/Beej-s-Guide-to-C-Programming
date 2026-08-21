<div class="nav-header">

<a href="strings.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="file-inputoutput.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">8</span> Structs

In C, we have something called a `struct`, which is a user-definable type that holds multiple pieces of data, potentially of different types.

It’s a convenient way to bundle multiple variables into a single one. This can be beneficial for passing variables to functions (so you just have to pass one instead of many), and useful for organizing data and making code more readable.

If you’ve come from another language, you might be familiar with the idea of *classes* and *objects*. These don’t exist in C, natively<a href="function-specifiers-alignment-specifiersoperators.html#fn69" id="fnref69" class="footnote-ref" role="doc-noteref"><sup>69</sup></a>. You can think of a `struct` as a class with only data members, and no methods.

## <span class="header-section-number">8.1</span> Declaring a Struct

You can declare a `struct` in your code like so:

``` c
struct car {
    char *name;
    float price;
    int speed;
};
```

This is often done at the global scope outside any functions so that the `struct` is globally available.

When you do this, you’re making a new *type*. The full type name is `struct car`. (Not just `car`—that won’t work.)

There aren’t any variables of that type yet, but we can declare some:

``` c
struct car saturn;  // Variable "saturn" of type "struct car"
```

And now we have an uninitialized variable `saturn`<a href="function-specifiers-alignment-specifiersoperators.html#fn70" id="fnref70" class="footnote-ref" role="doc-noteref"><sup>70</sup></a> of type `struct car`.

We should initialize it! But how do we set the values of those individual fields?

Like in many other languages that stole it from C, we’re going to use the dot operator (`.`) to access the individual fields.

``` c
saturn.name = "Saturn SL/2";
saturn.price = 15999.99;
saturn.speed = 175;

printf("Name:           %s\n", saturn.name);
printf("Price (USD):    %f\n", saturn.price);
printf("Top Speed (km): %d\n", saturn.speed);
```

There on the first lines, we set the values in the `struct car`, and then in the next bit, we print those values out.

## <span class="header-section-number">8.2</span> Struct Initializers

That example in the previous section was a little unwieldy. There must be a better way to initialize that `struct` variable!

You can do it with an initializer by putting values in for the fields *in the order they appear in the `struct`* when you define the variable. (This won’t work after the variable has been defined—it has to happen in the definition).

``` c
struct car {
    char *name;
    float price;
    int speed;
};

// Now with an initializer! Same field order as in the struct declaration:
struct car saturn = {"Saturn SL/2", 16000.99, 175};

printf("Name:      %s\n", saturn.name);
printf("Price:     %f\n", saturn.price);
printf("Top Speed: %d km\n", saturn.speed);
```

The fact that the fields in the initializer need to be in the same order is a little freaky. If someone changes the order in `struct car`, it could break all the other code!

We can be more specific with our initializers:

``` c
struct car saturn = {.speed=175, .name="Saturn SL/2"};
```

Now it’s independent of the order in the `struct` declaration. Which is safer code, for sure.

Similar to array initializers, any missing field designators are initialized to zero (in this case, that would be `.price`, which I’ve omitted).

## <span class="header-section-number">8.3</span> Passing Structs to Functions

You can do a couple things to pass a `struct` to a function.

1.  Pass the `struct`.
2.  Pass a pointer to the `struct`.

Recall that when you pass something to a function, a *copy* of that thing gets made for the function to operate on, whether it’s a copy of a pointer, an `int`, a `struct`, or anything.

There are basically two cases when you’d want to pass a pointer to the `struct`:

1.  You need the function to be able to make changes to the `struct` that was passed in, and have those changes show in the caller.
2.  The `struct` is somewhat large and it’s more expensive to copy that onto the stack than it is to just copy a pointer<a href="function-specifiers-alignment-specifiersoperators.html#fn71" id="fnref71" class="footnote-ref" role="doc-noteref"><sup>71</sup></a>.

For those two reasons, it’s far more common to pass a pointer to a `struct` to a function, though its by no means illegal to pass the `struct` itself.

Let’s try passing in a pointer, making a function that will allow you to set the `.price` field of the `struct car`:

``` c
#include <stdio.h>

struct car {
    char *name;
    float price;
    int speed;
};

int main(void)
{
    struct car saturn = {.speed=175, .name="Saturn SL/2"};

    // Pass a pointer to this struct car, along with a new,
    // more realistic, price:
    set_price(&saturn, 799.99);

    printf("Price: %f\n", saturn.price);
}
```

You should be able to come up with the function signature for `set_price()` just by looking at the types of the arguments we have there.

`saturn` is a `struct car`, so `&saturn` must be the address of the `struct car`, AKA a pointer to a `struct car`, namely a `struct car*`.

And `799.99` is a `float`.

So the function declaration must look like this:

``` c
void set_price(struct car *c, float new_price)
```

We just need to write the body. One attempt might be:

``` c
void set_price(struct car *c, float new_price) {
    c.price = new_price;  // ERROR!!
}
```

That won’t work because the dot operator only works on `struct`s… it doesn’t work on *pointers* to `struct`s.

Ok, so we can dereference the variable `c` to de-pointer it to get to the `struct` itself. Dereferencing a `struct car*` results in the `struct car` that the pointer points to, which we should be able to use the dot operator on:

``` c
void set_price(struct car *c, float new_price) {
    (*c).price = new_price;  // Works, but is ugly and non-idiomatic :(
}
```

And that works! But it’s a little clunky to type all those parens and the asterisk. C has some syntactic sugar called the *arrow operator* that helps with that.

## <span class="header-section-number">8.4</span> The Arrow Operator

The arrow operator helps refer to fields in pointers to `struct`s.

``` c
void set_price(struct car *c, float new_price) {
    // (*c).price = new_price;  // Works, but non-idiomatic :(
    //
    // The line above is 100% equivalent to the one below:

    c->price = new_price;  // That's the one!
}
```

So when accessing fields, when do we use dot and when do we use arrow?

- If you have a `struct`, use dot (`.`).
- If you have a pointer to a `struct`, use arrow (`->`).

## <span class="header-section-number">8.5</span> Copying and Returning `struct`s

Here’s an easy one for you!

Just assign from one to the other!

``` c
struct car a, b;

b = a;  // Copy the struct
```

And returning a `struct` (as opposed to a pointer to one) from a function also makes a similar copy to the receiving variable.

This is not a “deep copy”<a href="function-specifiers-alignment-specifiersoperators.html#fn72" id="fnref72" class="footnote-ref" role="doc-noteref"><sup>72</sup></a>. All fields are copied as-is, including pointers to things.

## <span class="header-section-number">8.6</span> Comparing `struct`s

There’s only one safe way to do it: compare each field one at a time.

You might think you could use [`memcmp()`](https://beej.us/guide/bgclr/html/split/stringref.html#man-strcmp)<a href="function-specifiers-alignment-specifiersoperators.html#fn73" id="fnref73" class="footnote-ref" role="doc-noteref"><sup>73</sup></a>, but that doesn’t handle the case of the possible [padding bytes](structs-ii-more-fun-with-structs.html#struct-padding-bytes) that might be in there.

If you clear the `struct` to zero first with [`memset()`](https://beej.us/guide/bgclr/html/split/stringref.html#man-memset)<a href="function-specifiers-alignment-specifiersoperators.html#fn74" id="fnref74" class="footnote-ref" role="doc-noteref"><sup>74</sup></a>, then it *might* work, though there could be weird elements that [might not compare as you expect](https://stackoverflow.com/questions/141720/how-do-you-compare-structs-for-equality-in-c)<a href="function-specifiers-alignment-specifiersoperators.html#fn75" id="fnref75" class="footnote-ref" role="doc-noteref"><sup>75</sup></a>.

------------------------------------------------------------------------

<div class="nav-header">

<a href="strings.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="file-inputoutput.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
