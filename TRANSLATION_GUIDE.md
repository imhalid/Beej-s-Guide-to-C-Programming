# Beej's Guide to C Programming — Türkçe Çeviri Rehberi ve Sözlüğü (Do Not Translate - DNT Listesi)

Bu rehber, **Beej's Guide to C Programming** kitabının ve HTML/Markdown içeriklerinin Türkçeye çevrilmesi sürecinde **kesinlikle çevrilmemesi gereken** ögeleri, teknik terim standartlarını ve dikkat edilmesi gereken kuralları içerir.

---

## 1. Kesinlikle Çevrilmeyecek Ögeler (Do Not Translate - DNT)

### 1.1. HTML & Markdown Sözdizim Ögeleri
* **HTML Etiketleri ve Öznitelikleri (Attributes)**:
  - `<kbd>`, `<code>`, `<pre>`, `<span>`, `<div>`, `<section>`, `<aside>`, `<nav>`, `<footer>` vb. tüm etiketler.
  - Etiket öznitelikleri: `id="..."`, `class="..."`, `href="..."`, `src="..."`, `role="..."`, `aria-*="..."`, `data-*="..."`.
  - *Örnek:* `<a href="hello-world.html#compilation-details" id="toc-compilation">` ifadesindeki `href` ve `id` değerleri **aynen kalmalıdır**.
* **Klavye Kısayolları ve Kbd İçerikleri**:
  - `<kbd>⌘⇧F</kbd>`, `<kbd>Ctrl + C</kbd>`, `<kbd>Enter</kbd>`, `<kbd>Esc</kbd>`, `<kbd>Tab</kbd>`.
* **Bağlantı Adresleri (URLs) ve Çapalar (Anchors)**:
  - Sayfa içi yönlendirme kimlikleri: `#cb1-1`, `#fnref24`, `#variables-and-statements`.
  - Harici bağlantı adresleri: `https://en.wikipedia.org/...` veya kütüphane dokümantasyon linkleri.

---

### 1.2. C Dili Sözdizimi, Kütüphaneler ve Kod Blokları
* **Kod Blokları (`<pre><code>...</code></pre>`) İçeriği**:
  - C kaynak kodları, değişken adları, fonksiyon gövdeleri ve mantıksal ifadeler çevrilmez.
  - **İstisna**: Kod içi yorum satırları (`// ...` ve `/* ... */`) anlaşılırlığı artırmak adına Türkçeye çevrilebilir.
* **Inline Kod İfadeleri (`<code>...</code>`)**:
  - C dili anahtar kelimeleri (Keywords): `int`, `char`, `float`, `double`, `short`, `long`, `void`, `struct`, `union`, `enum`, `typedef`, `const`, `volatile`, `register`, `static`, `extern`, `inline`, `restrict`, `sizeof`, `if`, `else`, `switch`, `case`, `default`, `while`, `for`, `do`, `break`, `continue`, `goto`, `return`, `_Alignas`, `_Alignof`, `_Atomic`, `_Bool`, `_Complex`, `_Generic`, `_Noreturn`, `_Static_assert`, `_Thread_local`.
  - Standart Header (Başlık) Dosyaları: `<stdio.h>`, `<stdlib.h>`, `<string.h>`, `<stdbool.h>`, `<stdint.h>`, `<stddef.h>`, `<stdarg.h>`, `<threads.h>`, `<stdatomic.h>`, `<time.h>`, `<math.h>`, `<errno.h>`, `<setjmp.h>`, `<signal.h>`, `<locale.h>`, `<wchar.h>`, `<wctype.h>`, `<uchar.h>`, `<assert.h>`, `<limits.h>`, `<float.h>`.
  - Standart Fonksiyon ve Makro Adları: `main()`, `printf()`, `scanf()`, `puts()`, `putchar()`, `fopen()`, `fclose()`, `fread()`, `fwrite()`, `fseek()`, `ftell()`, `malloc()`, `calloc()`, `realloc()`, `free()`, `memcpy()`, `memset()`, `strlen()`, `strcpy()`, `strcmp()`, `strcat()`, `qsort()`, `bsearch()`, `thrd_create()`, `mtx_lock()`, `atomic_store()`, `NULL`, `EOF`, `SEEK_SET`, `SEEK_CUR`, `SEEK_END`, `EXIT_SUCCESS`, `EXIT_FAILURE`, `INT_MAX`, `SIZE_MAX`, `true`, `false`, `__FILE__`, `__LINE__`, `__func__`, `__DATE__`, `__TIME__`, `__STDC_VERSION__`.
  - Format belirteçleri ve Kaçış Karakterleri: `%d`, `%s`, `%f`, `%p`, `%x`, `%zu`, `\n`, `\t`, `\0`, `\\`, `\"`.

---

### 1.3. Komut Satırı, Derleyici ve Geliştirici Araçları
* **Terminal / Kabuk Komutları**:
  - `gcc`, `clang`, `make`, `gdb`, `valgrind`, `man`, `ls`, `cd`, `cat`, `posix`, `cmake`.
  - Derleyici bayrakları (Flags): `-Wall`, `-Wextra`, `-std=c11`, `-std=c99`, `-O2`, `-g`, `-o`, `-lm`, `-lpthread`.
* **Dosya Uzantıları ve Yol İfadeleri**:
  - `.c`, `.h`, `.o`, `.a`, `.so`, `.dylib`, `.exe`, `a.out`, `stdin`, `stdout`, `stderr`.

---

## 2. Teknik Terim Sözlüğü (Çeviri Tercihleri)

Çeviri bütünlüğünü korumak için bazı teknik kavramların Türkçe karşılıkları veya parantez içinde kullanımı tercih edilmelidir.

| İngilizce Terim | Önerilen Türkçe Karşılığı / Parantez Kullanımı | Açıklama |
| :--- | :--- | :--- |
| **Pointer** | Gösterici *(Pointer)* | C'nin temel kavramı; ilk kullanımda *Gösterici (Pointer)*, sonrasında *Pointer* veya *Gösterici* kullanılabilir. |
| **Array** | Dizi | Standart kullanım. |
| **String** | Metin dizisi / String | *String* terimi yazılım dünyasında yaygın olduğu için direkt *String* olarak da bırakılabilir. |
| **Struct** | Yapı *(Struct)* | *Struct* olarak kalması veya *Yapı (Struct)* şeklinde verilmesi uygundur. |
| **Union** | Birlik *(Union)* | C dili dil ögesi. |
| **Enum / Enumeration** | Numaralandırma Türü *(Enum)* | |
| **Undefined Behavior (UB)** | Tanımsız Davranış *(Undefined Behavior)* | Kritik C kavramı; kısaltma olarak *UB* korunabilir. |
| **Implementation-Defined** | Uygulamaya Bağlı Davranış | Derleyiciye/Mimariye göre değişen davranış. |
| **Unspecified Behavior** | Belirtilmemiş Davranış | |
| **Buffer Overflow** | Tampon Bellek Taşması *(Buffer Overflow)* | |
| **Segmentation Fault (Segfault)** | Bölütleme Hatası *(Segmentation Fault / Segfault)* | |
| **Stack** | Yığın *(Stack)* | Bellek bölgesi. |
| **Heap** | Küme / Öbek *(Heap)* | Dinamik bellek bölgesi. |
| **Null Pointer** | Boş Gösterici *(Null Pointer)* | `NULL` makrosunu gösteren pointer. |
| **Dangling Pointer** | Askıda Kalan Gösterici *(Dangling Pointer)* | Serbest bırakılmış belleği gösteren pointer. |
| **NUL Byte / NUL Character** | NUL Baytı (`\0`) | String bitiren `\0` karakteri. |
| **Scope** | Kapsam *(Scope)* | Değişkenlerin geçerlilik alanı. |
| **Lifetime** | Yaşam Süresi *(Lifetime)* | Değişkenin bellekte kalma süresi. |
| **Typecasting / Cast** | Tür Dönüşümü *(Cast)* | |
| **Variable Length Array (VLA)** | Değişken Uzunluklu Dizi *(VLA)* | C99 ile gelen dizi türü. |
| **Atomic Operation** | Bölünemez İşlem *(Atomic Operation)* | Çoklu izlek (Multithreading) terimi. |
| **Thread** | İzlek *(Thread)* | *Thread* olarak bırakılması da yaygındır. |
| **Mutex / Lock** | Mutex / Kilit | Sync mekanizması. |
| **Header File** | Başlık Dosyası | `.h` uzantılı dosyalar. |
| **Preprocessor** | Ön İşlemci | C Preprocessor. |
| **Pass by Value / Pass by Reference** | Değer ile Geçme / Referans ile Geçme | Fonksiyon argüman aktarımı. |
| **Little-Endian / Big-Endian** | Little-Endian / Big-Endian | Bayt sıralaması; terim olarak aynen kalmalıdır. |

---

## 3. Metin Yapısı ve Ton Kuralları

1. **Yazarın Samimi Tonu (Beej's Voice)**: Yazar (Brian "Beej" Hall) okuyucuyla sohbet eder gibi, esprili ve samimi bir dille konuşmaktadır. Çeviri resmi bir akademik kitap dili yerine samimi, akıcı ve öğretici bir Türkçe ile yapılmalıdır.
2. **Dipnotlar (`<a href="..." class="footnote-ref"><sup>24</sup></a>`)**: Dipnot bağlantı numaraları ve yapıları kesinlikle bozulmamalıdır.
3. **Örnek Kod Açıklamaları**: Kod bloklarından sonra gelen `Line 3 does X...` açıklamalarındaki satır numaraları koddaki satırlarla tam uyuşmalıdır.
4. **Markdown Çapa Bağlantıları**: Başlıkların içindeki `id="..."` öznitelikleri (örneğin `id="hello-world-1"`) TOC navigasyonunun kırılmaması için **değiştirilmemelidir**.

---

*Bu rehber projedeki tüm çevirmenler ve katkıcılar için standart referans dökümanıdır.*
