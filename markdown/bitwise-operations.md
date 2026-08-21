<div class="nav-header">

<a href="pointers-iii-pointers-to-pointers-and-more.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="variadic-functions.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">24</span> Bitwise Operations

These numeric operations effectively allow you to manipulate individual bits in variables, fitting since C is such a low-level langauge<a href="function-specifiers-alignment-specifiersoperators.html#fn152" id="fnref152" class="footnote-ref" role="doc-noteref"><sup>152</sup></a>.

If you’re not familiar with bitwise operations, [Wikipedia has a good bitwise article](https://en.wikipedia.org/wiki/Bitwise_operation)<a href="function-specifiers-alignment-specifiersoperators.html#fn153" id="fnref153" class="footnote-ref" role="doc-noteref"><sup>153</sup></a>.

## <span class="header-section-number">24.1</span> Bitwise AND, OR, XOR, and NOT

For each of these, the [usual arithmetic conversions](types-iii-conversions.html#usual-arithmetic-conversions) take place on the operands (which in this case must be an integer type), and then the appropriate bitwise operation is performed.

| Operation | Operator | Example     |
|-----------|:--------:|-------------|
| AND       |   `&`    | `a = b & c` |
| OR        |   `|`    | `a = b | c` |
| XOR       |   `^`    | `a = b ^ c` |
| NOT       |   `~`    | `a = ~c`    |

Note how they’re similar to the Boolean operators `&&` and `||`.

These have assignment shorthand variants similar to `+=` and `-=`:

| Operator | Example  | Longhand equivalent |
|----------|----------|---------------------|
| `&=`     | `a &= c` | `a = a & c`         |
| `|=`     | `a |= c` | `a = a | c`         |
| `^=`     | `a ^= c` | `a = a ^ c`         |

## <span class="header-section-number">24.2</span> Bitwise Shift

For these, the [integer promotions](types-iii-conversions.html#integer-promotions) are performed on each operand (which must be an integer type) and then a bitwise shift is executed. The type of the result is the type of the promoted left operand.

New bits are filled with zeros, with a possible exception noted in the implementation-defined behavior, below.

| Operation   | Operator | Example      |
|-------------|:--------:|--------------|
| Shift left  |   `<<`   | `a = b << c` |
| Shift right |   `>>`   | `a = b >> c` |

There’s also the same similar shorthand for shifting:

| Operator | Example   | Longhand equivalent |
|----------|-----------|---------------------|
| `>>=`    | `a >>= c` | `a = a >> c`        |
| `<<=`    | `a <<= c` | `a = a << c`        |

Watch for undefined behavior: no negative shifts, and no shifts that are larger than the size of the promoted left operand.

Also watch for implementation-defined behavior: if you right-shift a negative number, the results are implementation-defined. (It’s perfectly fine to right-shift a signed `int`, just make sure it’s positive.)

------------------------------------------------------------------------

<div class="nav-header">

<a href="pointers-iii-pointers-to-pointers-and-more.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="variadic-functions.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
