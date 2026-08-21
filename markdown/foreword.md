<div class="nav-header">

<a href="index.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="hello-world.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>

------------------------------------------------------------------------

# <span class="header-section-number">1</span> Foreword

> *C is not a big language, and it is not well served by a big book.*
>
> –Brian W. Kernighan, Dennis M. Ritchie

No point in wasting words here, folks, let’s jump straight into the C code:

``` c
E((ck?main((z?(stat(M,&t)?P+=a+'{'?0:3:
execv(M,k),a=G,i=P,y=G&255,
sprintf(Q,y/'@'-3?A(*L(V(%d+%d)+%d,0)
```

And they lived happily ever after. The End.

What’s this? You say something’s still not clear about this whole C programming language thing?

Well, to be quite honest, I’m not even sure what the above code does. It’s a snippet from one of the entries in the 2001 [International Obfuscated C Code Contest](https://www.ioccc.org/)<a href="function-specifiers-alignment-specifiersoperators.html#fn1" id="fnref1" class="footnote-ref" role="doc-noteref"><sup>1</sup></a>, a wonderful competition wherein the entrants attempt to write the most unreadable C code possible, with often surprising results.

The bad news is that if you’re a beginner in this whole thing, all C code you see probably looks obfuscated! The good news is, it’s not going to be that way for long.

What we’ll try to do over the course of this guide is lead you from complete and utter sheer lost confusion on to the sort of enlightened bliss that can only be obtained through pure C programming. Right on.

In the old days, C was a simpler language. A good number of the features contained in this book and a *lot* of the features in the Library Reference volume didn’t exist when K&R wrote the famous second edition of their book in 1988. Nevertheless, the language remains small at its core, and I hope I’ve presented it here in a way that starts with that simple core and builds outward.

And that’s my excuse for writing such a hilariously large book for such a small, concise language.

## <span class="header-section-number">1.1</span> Audience

This guide assumes that you’ve already got some programming knowledge under your belt from another language, such as [Python](https://en.wikipedia.org/wiki/Python_(programming_language))<a href="function-specifiers-alignment-specifiersoperators.html#fn2" id="fnref2" class="footnote-ref" role="doc-noteref"><sup>2</sup></a>, [JavaScript](https://en.wikipedia.org/wiki/JavaScript)<a href="function-specifiers-alignment-specifiersoperators.html#fn3" id="fnref3" class="footnote-ref" role="doc-noteref"><sup>3</sup></a>, [Java](https://en.wikipedia.org/wiki/Java_(programming_language))<a href="function-specifiers-alignment-specifiersoperators.html#fn4" id="fnref4" class="footnote-ref" role="doc-noteref"><sup>4</sup></a>, [Rust](https://en.wikipedia.org/wiki/Rust_(programming_language))<a href="function-specifiers-alignment-specifiersoperators.html#fn5" id="fnref5" class="footnote-ref" role="doc-noteref"><sup>5</sup></a>, [Go](https://en.wikipedia.org/wiki/Go_(programming_language))<a href="function-specifiers-alignment-specifiersoperators.html#fn6" id="fnref6" class="footnote-ref" role="doc-noteref"><sup>6</sup></a>, [Swift](https://en.wikipedia.org/wiki/Swift_(programming_language))<a href="function-specifiers-alignment-specifiersoperators.html#fn7" id="fnref7" class="footnote-ref" role="doc-noteref"><sup>7</sup></a>, etc. ([Objective-C](https://en.wikipedia.org/wiki/Objective-C)<a href="function-specifiers-alignment-specifiersoperators.html#fn8" id="fnref8" class="footnote-ref" role="doc-noteref"><sup>8</sup></a> devs will have a particularly easy time of it!)

We’re going to assume you know what variables are, what loops do, how functions work, and so on.

If that’s not you for whatever reason the best I can hope to provide is some honest entertainment for your reading pleasure. The only thing I can reasonably promise is that this guide won’t end on a cliffhanger… or *will* it?

## <span class="header-section-number">1.2</span> How to Read This Book

The guide is in two volumes, and this is the first: the tutorial volume!

The second volume is the [library reference](https://beej.us/guide/bgclr/)<a href="function-specifiers-alignment-specifiersoperators.html#fn9" id="fnref9" class="footnote-ref" role="doc-noteref"><sup>9</sup></a>, and it’s far more reference than tutorial.

If you’re new, go through the tutorial part in order, generally. The higher you get in chapters, the less important it is to go in order.

And no matter your skill level, the reference part is there with complete examples of the standard library function calls to help refresh your memory whenever needed. Good for reading over a bowl of cereal or other time.

Finally, glancing at the index (if you’re reading the print version), the reference section entries are italicized.

## <span class="header-section-number">1.3</span> Platform and Compiler

I’ll try to stick to Plain Ol’-Fashioned [ISO-standard C](https://en.wikipedia.org/wiki/ANSI_C)<a href="function-specifiers-alignment-specifiersoperators.html#fn10" id="fnref10" class="footnote-ref" role="doc-noteref"><sup>10</sup></a>. Well, for the most part. Here and there I might go crazy and start talking about [POSIX](https://en.wikipedia.org/wiki/POSIX)<a href="function-specifiers-alignment-specifiersoperators.html#fn11" id="fnref11" class="footnote-ref" role="doc-noteref"><sup>11</sup></a> or something, but we’ll see.

**Unix** users (e.g. Linux, BSD, etc.) try running `cc` or `gcc` from the command line–you might already have a compiler installed. If you don’t, search your distribution for installing `gcc` or `clang`.

**Windows** users should check out [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)<a href="function-specifiers-alignment-specifiersoperators.html#fn12" id="fnref12" class="footnote-ref" role="doc-noteref"><sup>12</sup></a>. Or, if you’re looking for a more Unix-like experience (recommended!), install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)<a href="function-specifiers-alignment-specifiersoperators.html#fn13" id="fnref13" class="footnote-ref" role="doc-noteref"><sup>13</sup></a> and `gcc`.

**Mac** users will want to install [XCode](https://developer.apple.com/xcode/)<a href="function-specifiers-alignment-specifiersoperators.html#fn14" id="fnref14" class="footnote-ref" role="doc-noteref"><sup>14</sup></a>, and in particular the command line tools.

There are a lot of compilers out there, and virtually all of them will work for this book. And a C++ compiler will compile a lot of (but not all!) C code. Best use a proper C compiler if you can.

## <span class="header-section-number">1.4</span> Official Homepage

This official location of this document is <https://beej.us/guide/bgc/><a href="function-specifiers-alignment-specifiersoperators.html#fn15" id="fnref15" class="footnote-ref" role="doc-noteref"><sup>15</sup></a>. Maybe this’ll change in the future, but it’s more likely that all the other guides are migrated off Chico State computers.

## <span class="header-section-number">1.5</span> Email Policy

I’m generally available to help out with email questions so feel free to write in, but I can’t guarantee a response. I lead a pretty busy life and there are times when I just can’t answer a question you have. When that’s the case, I usually just delete the message. It’s nothing personal; I just won’t ever have the time to give the detailed answer you require.

As a rule, the more complex the question, the less likely I am to respond. If you can narrow down your question before mailing it and be sure to include any pertinent information (like platform, compiler, error messages you’re getting, and anything else you think might help me troubleshoot), you’re much more likely to get a response.

If you don’t get a response, hack on it some more, try to find the answer, and if it’s still elusive, then write me again with the information you’ve found and hopefully it will be enough for me to help out.

Now that I’ve badgered you about how to write and not write me, I’d just like to let you know that I *fully* appreciate all the praise the guide has received over the years. It’s a real morale boost, and it gladdens me to hear that it is being used for good! `:-)` Thank you!

## <span class="header-section-number">1.6</span> Mirroring

You are more than welcome to mirror this site, whether publicly or privately. If you publicly mirror the site and want me to link to it from the main page, drop me a line at [`beej@beej.us`](mailto:beej@beej.us).

## <span class="header-section-number">1.7</span> Note for Translators

If you want to translate the guide into another language, write me at [`beej@beej.us`](beej@beej.us) and I’ll link to your translation from the main page. Feel free to add your name and contact info to the translation.

Please note the license restrictions in the Copyright and Distribution section, below.

## <span class="header-section-number">1.8</span> Copyright and Distribution

Beej’s Guide to C is Copyright © 2021 Brian “Beej Jorgensen” Hall.

With specific exceptions for source code and translations, below, this work is licensed under the Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License. To view a copy of this license, visit [`https://creativecommons.org/licenses/by-nc-nd/3.0/`](https://creativecommons.org/licenses/by-nc-nd/3.0/) or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.

One specific exception to the “No Derivative Works” portion of the license is as follows: this guide may be freely translated into any language, provided the translation is accurate, and the guide is reprinted in its entirety. The same license restrictions apply to the translation as to the original guide. The translation may also include the name and contact information for the translator.

The C source code presented in this document is hereby granted to the public domain, and is completely free of any license restriction.

Educators are freely encouraged to recommend or supply copies of this guide to their students.

Contact [`beej@beej.us`](beej@beej.us) for more information.

## <span class="header-section-number">1.9</span> Dedication

The hardest things about writing these guides are:

- Learning the material in enough detail to be able to explain it
- Figuring out the best way to explain it clearly, a seemingly-endless iterative process
- Putting myself out there as a so-called *authority*, when really I’m just a regular human trying to make sense of it all, just like everyone else
- Keeping at it when so many other things draw my attention

A lot of people have helped me through this process, and I want to acknowledge those who have made this book possible.

- Everyone on the Internet who decided to help share their knowledge in one form or another. The free sharing of instructive information is what makes the Internet the great place that it is.
- The volunteers at [cppreference.com](https://en.cppreference.com/)<a href="function-specifiers-alignment-specifiersoperators.html#fn16" id="fnref16" class="footnote-ref" role="doc-noteref"><sup>16</sup></a> who provide the bridge that leads from the spec to the real world.
- The helpful and knowledgeable folks on [comp.lang.c](https://groups.google.com/g/comp.lang.c)<a href="function-specifiers-alignment-specifiersoperators.html#fn17" id="fnref17" class="footnote-ref" role="doc-noteref"><sup>17</sup></a> and [r/C_Programming](https://www.reddit.com/r/C_Programming/)<a href="function-specifiers-alignment-specifiersoperators.html#fn18" id="fnref18" class="footnote-ref" role="doc-noteref"><sup>18</sup></a> who got me through the tougher parts of the language.
- Everyone who submitted corrections and pull-requests on everything from misleading instructions to typos.

Thank you! ♥

------------------------------------------------------------------------

<div class="nav-header">

<a href="index.html" class="nav-btn" rel="prev" title="Önceki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjE1IDE4IDkgMTIgMTUgNiI+PC9wb2x5bGluZT48L3N2Zz4=" /></a><a href="hello-world.html" class="nav-btn" rel="next" title="Sonraki Bölüm"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjkgMTggMTUgMTIgOSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==" /></a>

</div>
