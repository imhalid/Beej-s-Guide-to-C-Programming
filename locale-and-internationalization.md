<div class="nav-header">

<a href="variadic-functions.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="unicode-wide-characters-and-all-that.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">26</span> Locale and Internationalization

*Localization* is the process of making your app ready to work well in different locales (or countries).

As you might know, not everyone uses the same character for decimal points or for thousands separators… or for currency.

These locales have names, and you can select one to use. For example, a US locale might write a number like:

100,000.00

Whereas in Brazil, the same might be written with the commas and decimal points swapped:

100.000,00

Makes it easier to write your code so it ports to other nationalities with ease!

Well, sort of. Turns out C only has one built-in locale, and it’s limited. The spec really leaves a lot of ambiguity here; it’s hard to be completely portable.

But we’ll do our best!

## <span class="header-section-number">26.1</span> Setting the Localization, Quick and Dirty

For these calls, include `<locale.h>`.

There is basically one thing you can portably do here in terms of declaring a specific locale. This is likely what you want to do if you’re going to do locale anything:

``` c
setlocale(LC_ALL, "");  // Use this environment's locale for everything
```

You’ll want to call that so that the program gets initialized with your current locale.

Getting into more details, there is one more thing you can do and stay portable:

``` c
setlocale(LC_ALL, "C");  // Use the default C locale
```

but that’s called by default every time your program starts, so there’s not much need to do it yourself.

In that second string, you can specify any locale supported by your system. This is completely system-dependent, so it will vary. On my system, I can specify this:

``` c
setlocale(LC_ALL, "en_US.UTF-8");  // Non-portable!
```

And that’ll work. But it’s only portable to systems which have that exact same name for that exact same locale, and you can’t guarantee it.

By passing in an empty string (`""`) for the second argument, you’re telling C, “Hey, figure out what the current locale on this system is so I don’t have to tell you.”

## <span class="header-section-number">26.2</span> Getting the Monetary Locale Settings

Because moving green pieces of paper around promises to be the key to happiness<a href="function-specifiers-alignment-specifiersoperators.html#fn156" id="fnref156" class="footnote-ref" role="doc-noteref"><sup>156</sup></a>, let’s talk about monetary locale. When you’re writing portable code, you have to know what to type for cash, right? Whether that’s “\$”, “€”, “¥”, or “£”.

How can you write that code without going insane? Luckily, once you call `setlocale(LC_ALL, "")`, you can just look these up with a call to `localeconv()`:

``` c
struct lconv *x = localeconv();
```

This function returns a pointer to a statically-allocated `struct lconv` that has all that juicy information you’re looking for.

Here are the fields of `struct lconv` and their meanings.

First, some conventions. An `_p_` means “positive”, and `_n_` means “negative”, and `int_` means “international”. Though a lot of these are type `char` or `char*`, most (or the strings they point to) are actually treated as integers<a href="function-specifiers-alignment-specifiersoperators.html#fn157" id="fnref157" class="footnote-ref" role="doc-noteref"><sup>157</sup></a>.

Before we go further, know that `CHAR_MAX` (from `<limits.h>`) is the maximum value that can be held in a `char`. And that many of the following `char` values use that to indicate the value isn’t available in the given locale.

| Field | Description |
|----|----|
| `char *mon_decimal_point` | Decimal pointer character for money, e.g. `"."`. |
| `char *mon_thousands_sep` | Thousands separator character for money, e.g. `","`. |
| `char *mon_grouping` | Grouping description for money (see below). |
| `char *positive_sign` | Positive sign for money, e.g. `"+"` or `""`. |
| `char *negative_sign` | Negative sign for money, e.g. `"-"`. |
| `char *currency_symbol` | Currency symbol, e.g. `"$"`. |
| `char frac_digits` | When printing monetary amounts, how many digits to print past the decimal point, e.g. `2`. |
| `char p_cs_precedes` | `1` if the `currency_symbol` comes before the value for a non-negative monetary amount, `0` if after. |
| `char n_cs_precedes` | `1` if the `currency_symbol` comes before the value for a negative monetary amount, `0` if after. |
| `char p_sep_by_space` | Determines the separation of the `currency symbol` from the value for non-negative amounts (see below). |
| `char n_sep_by_space` | Determines the separation of the `currency symbol` from the value for negative amounts (see below). |
| `char p_sign_posn` | Determines the `positive_sign` position for non-negative values. |
| `char n_sign_posn` | Determines the `positive_sign` position for negative values. |
| `char *int_curr_symbol` | International currency symbol, e.g. `"USD "`. |
| `char int_frac_digits` | International value for `frac_digits`. |
| `char int_p_cs_precedes` | International value for `p_cs_precedes`. |
| `char int_n_cs_precedes` | International value for `n_cs_precedes`. |
| `char int_p_sep_by_space` | International value for `p_sep_by_space`. |
| `char int_n_sep_by_space` | International value for `n_sep_by_space`. |
| `char int_p_sign_posn` | International value for `p_sign_posn`. |
| `char int_n_sign_posn` | International value for `n_sign_posn`. |

### <span class="header-section-number">26.2.1</span> Monetary Digit Grouping

OK, this is a trippy one. `mon_grouping` is a `char*`, so you might be thinking it’s a string. But in this case, no, it’s really an array of `char`s. It should always end either with a `0` or `CHAR_MAX`.

These values describe how to group sets of numbers in currency to the *left* of the decimal (the whole number part).

For example, we might have:

``` default
  2   1   0
 --- --- ---
$100,000,000.00
```

These are groups of three. Group 0 (just left of the decimal) has 3 digits. Group 1 (next group to the left) has 3 digits, and the last one also has 3.

So we could describe these groups, from the right (the decimal) to the left with a bunch of integer values representing the group sizes:

``` default
3 3 3
```

And that would work for values up to \$100,000,000.

But what if we had more? We could keep adding `3`s…

``` default
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
```

but that’s crazy. Luckily, we can specify `0` to indicate that the previous group size repeats:

``` default
3 0
```

Which means to repeat every 3. That would handle \$100, \$1,000, \$10,000, \$10,000,000, \$100,000,000,000, and so on.

You can go legitimately crazy with these to indicate some weird groupings.

For example:

``` default
4 3 2 1 0
```

would indicate:

``` default
$1,0,0,0,0,00,000,0000.00
```

One more value that can occur is `CHAR_MAX`. This indicates that no more grouping should occur, and can appear anywhere in the array, including the first value.

``` default
3 2 CHAR_MAX
```

would indicate:

``` default
100000000,00,000.00
```

for example.

And simply having `CHAR_MAX` in the first array position would tell you there was to be no grouping at all.

### <span class="header-section-number">26.2.2</span> Separators and Sign Position

All the `sep_by_space` variants deal with spacing around the currency sign. Valid values are:

| Value | Description |
|:--:|----|
| `0` | No space between currency symbol and value. |
| `1` | Separate the currency symbol (and sign, if any) from the value with a space. |
| `2` | Separate the sign symbol from the currency symbol (if adjacent) with a space, otherwise separate the sign symbol from the value with a space. |

The `sign_posn` variants are determined by the following values:

| Value | Description                                                    |
|:-----:|----------------------------------------------------------------|
|  `0`  | Put parens around the value and the currency symbol.           |
|  `1`  | Put the sign string in front of the currency symbol and value. |
|  `2`  | Put the sign string after the currency symbol and value.       |
|  `3`  | Put the sign string directly in front of the currency symbol.  |
|  `4`  | Put the sign string directly behind the currency symbol.       |

### <span class="header-section-number">26.2.3</span> Example Values

When I get the values on my system, this is what I see (grouping string displayed as individual byte values):

``` c
mon_decimal_point  = "."
mon_thousands_sep  = ","
mon_grouping       = 3 3 0
positive_sign      = ""
negative_sign      = "-"
currency_symbol    = "$"
frac_digits        = 2
p_cs_precedes      = 1
n_cs_precedes      = 1
p_sep_by_space     = 0
n_sep_by_space     = 0
p_sign_posn        = 1
n_sign_posn        = 1
int_curr_symbol    = "USD "
int_frac_digits    = 2
int_p_cs_precedes  = 1
int_n_cs_precedes  = 1
int_p_sep_by_space = 1
int_n_sep_by_space = 1
int_p_sign_posn    = 1
int_n_sign_posn    = 1
```

## <span class="header-section-number">26.3</span> Localization Specifics

Notice how we passed the macro `LC_ALL` to `setlocale()` earlier… this hints that there might be some variant that allows you to be more precise about which *parts* of the locale you’re setting.

Let’s take a look at the values you can see for these:

| Macro | Description |
|----|----|
| `LC_ALL` | Set all of the following to the given locale. |
| `LC_COLLATE` | Controls the behavior of the `strcoll()` and `strxfrm()` functions. |
| `LC_CTYPE` | Controls the behavior of the character-handling functions<a href="function-specifiers-alignment-specifiersoperators.html#fn158" id="fnref158" class="footnote-ref" role="doc-noteref"><sup>158</sup></a>. |
| `LC_MONETARY` | Controls the values returned by `localeconv()`. |
| `LC_NUMERIC` | Controls the decimal point for the `printf()` family of functions. |
| `LC_TIME` | Controls time formatting of the `strftime()` and `wcsftime()` time and date printing functions. |

It’s pretty common to see `LC_ALL` being set, but, hey, at least you have options.

Also I should point out that `LC_CTYPE` is one of the biggies because it ties into wide characters, a significant can of worms that we’ll talk about later.

------------------------------------------------------------------------

<div class="nav-header">

<a href="variadic-functions.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="unicode-wide-characters-and-all-that.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
