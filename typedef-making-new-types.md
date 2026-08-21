<div class="nav-header">

<a href="file-inputoutput.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="pointers2.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">10</span> `typedef`: Making New Types

Well, not so much making *new* types as getting new names for existing types. Sounds kinda pointless on the surface, but we can really use this to make our code cleaner.

## <span class="header-section-number">10.1</span> `typedef` in Theory

Basically, you take an existing type and you make an alias for it with `typedef`.

Like this:

``` c
typedef int antelope;  // Make "antelope" an alias for "int"

antelope x = 10;       // Type "antelope" is the same as type "int"
```

You can take any existing type and do it. You can even make a number of types with a comma list:

``` c
typedef int antelope, bagel, mushroom;  // These are all "int"
```

That’s really useful, right? That you can type `mushroom` instead of `int`? You must be *super excited* about this feature!

OK, Professor Sarcasm—we’ll get to some more common applications of this in a moment.

### <span class="header-section-number">10.1.1</span> Scoping

`typedef` follows regular [scoping rules](scope.html#scope).

For this reason, it’s quite common to find `typedef` at file scope (“global”) so that all functions can use the new types at will.

## <span class="header-section-number">10.2</span> `typedef` in Practice

So renaming `int` to something else isn’t that exciting. Let’s see where `typedef` commonly makes an appearance.

### <span class="header-section-number">10.2.1</span> `typedef` and `struct`s

Sometimes a `struct` will be `typedef`’d to a new name so you don’t have to type the word `struct` over and over.

``` c
struct animal {
    char *name;
    int leg_count, speed;
};

//  original name      new name
//            |         |
//            v         v
//      |-----------| |----|
typedef struct animal animal;

struct animal y;  // This works
animal z;         // This also works because "animal" is an alias
```

Personally, I don’t care for this practice. I like the clarity the code has when you add the word `struct` to the type; programmers know what they’re getting. But it’s really common so I’m including it here.

Now I want to run the exact same example in a way that you might commonly see. We’re going to put the `struct animal` *in* the `typedef`. You can mash it all together like this:

``` c
//  original name
//            |
//            v
//      |-----------|
typedef struct animal {
    char *name;
    int leg_count, speed;
} animal;                         // <-- new name

struct animal y;  // This works
animal z;         // This also works because "animal" is an alias
```

That’s exactly the same as the previous example, just more concise.

But that’s not all! There’s another common shortcut that you might see in code using what are called *anonymous structures*<a href="function-specifiers-alignment-specifiersoperators.html#fn83" id="fnref83" class="footnote-ref" role="doc-noteref"><sup>83</sup></a>. It turns out you don’t actually need to name the structure in a variety of places, and with `typedef` is one of them.

Let’s do the same example with an anonymous structure:

``` c
//  Anonymous struct! It has no name!
//         |
//         v
//      |----|
typedef struct {
    char *name;
    int leg_count, speed;
} animal;                         // <-- new name

//struct animal y;  // ERROR: this no longer works--no such struct!
animal z;           // This works because "animal" is an alias
```

As another example, we might find something like this:

``` c
typedef struct {
    int x, y;
} point;

point p = {.x=20, .y=40};

printf("%d, %d\n", p.x, p.y);  // 20, 40
```

### <span class="header-section-number">10.2.2</span> `typedef` and Other Types

It’s not that using `typedef` with a simple type like `int` is completely useless… it helps you abstract the types to make it easier to change them later.

For example, if you have `float` all over your code in 100 zillion places, it’s going to be painful to change them all to `double` if you find you have to do that later for some reason.

But if you prepared a little with:

``` c
typedef float app_float;

// and

app_float f1, f2, f3;
```

Then if later you want to change to another type, like `long double`, you just need to change the `typedef`:

``` c
//        voila!
//      |---------|
typedef long double app_float;

// and no need to change this line:

app_float f1, f2, f3;  // Now these are all long doubles
```

### <span class="header-section-number">10.2.3</span> `typedef` and Pointers

You can make a type that is a pointer.

``` c
typedef int *intptr;

int a = 10;
intptr x = &a;  // "intptr" is type "int*"
```

I really don’t like this practice. It hides the fact that `x` is a pointer type because you don’t see a `*` in the declaration.

IMHO, it’s better to explicitly show that you’re declaring a pointer type so that other devs can clearly see it and don’t mistake `x` for having a non-pointer type.

But at last count, say, 832,007 people had a different opinion.

### <span class="header-section-number">10.2.4</span> `typedef` and Capitalization

I’ve seen all kinds of capitalization on `typedef`.

``` c
typedef struct {
    int x, y;
} my_point;          // lower snake case

typedef struct {
    int x, y;
} MyPoint;          // CamelCase

typedef struct {
    int x, y;
} Mypoint;          // Leading uppercase

typedef struct {
    int x, y;
} MY_POINT;          // UPPER SNAKE CASE
```

The C11 specification doesn’t dictate one way or another, and shows examples in all uppercase and all lowercase.

K&R2 uses leading uppercase predominantly, but show some examples in uppercase and snake case (with `_t`).

If you have a style guide in use, stick with it. If you don’t, grab one and stick with it.

## <span class="header-section-number">10.3</span> Arrays and `typedef`

The syntax is a little weird, and this is rarely seen in my experience, but you can `typedef` an array of some number of items.

``` c
// Make type five_ints an array of 5 ints
typedef int five_ints[5];

five_ints x = {11, 22, 33, 44, 55};
```

I don’t like it because it hides the array nature of the variable, but it’s possible to do.

------------------------------------------------------------------------

<div class="nav-header">

<a href="file-inputoutput.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="pointers2.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
