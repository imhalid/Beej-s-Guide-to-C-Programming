window.SEARCH_INDEX = [
  {
    "file": "arrays-part-ii.html",
    "title": "33 Diziler Bölüm II",
    "headings": [
      {
        "id": "type-qualifiers-for-arrays-in-parameter-lists",
        "title": "33.1 Parametre Listelerindeki Diziler İçin Tür Niteleyicileri"
      },
      {
        "id": "static-for-arrays-in-parameter-lists",
        "title": "33.2 Parametre Listelerindeki Diziler İçin static"
      },
      {
        "id": "equivalent-initializers",
        "title": "33.3 Eşdeğer İlklendiriciler"
      }
    ],
    "text": "Beej's Guide to C Programming 33 Diziler Bölüm II Bu bölümde dizilerle ilgili birkaç ek ve çeşitli konunun üzerinden geçeceğiz. Dizi parametreleri ile tür niteleyicileri (type qualifiers) Dizi parametreleri ile static anahtar kelimesi Kısmi çok boyutlu dizi ilklendiricileri (initializers) Bunlar çok yaygın olarak görülmezler, ancak daha yeni spesifikasyonun bir parçası olduklarından onlara bir göz atacağız. 33.1 Parametre Listelerindeki Diziler İçin Tür Niteleyicileri Daha önceden hatırlayacağınız üzere, fonksiyon parametre listelerinde şu iki ifade birbirine eşdeğerdir: int func(int *p) {...} int func(int p[]) {...} Ve ayrıca bir pointer değişkenine tür niteleyicilerini şu şekilde ekleyebileceğinizi de hatırlayabilirsiniz: int *const p; int *volatile p; int *const volatile p; // vb. Peki, parametre listenizde dizi gösterimi kullanırken bunu nasıl yapabiliriz? Görünüşe göre bu niteleyiciler köşeli parantezlerin içine girer. Ve isteğe bağlı eleman sayısını sonrasına koyabilirsiniz. Aşağıdaki satırlar birbirine eşdeğerdir: int func(int *const volatile p) {...} int func(int p[const volatile]) {...} int func(int p[const volatile 10]) {...} Çok boyutlu bir diziniz varsa, tür niteleyicilerini ilk köşeli parantez setine koymanız gerekir. 33.2 Parametre Listelerindeki Diziler İçin static Benzer şekilde, parametre listesindeki dizide static anahtar kelimesini kullanabilirsiniz. Bu, gerçek projelerde (in the wild) daha önce hiç görmediğim bir şeydir. Her zaman ardından bir boyut gelir: int func(int p[static 4]) {...} Bunun anlamı, yukarıdaki örnekte, derleyicinin fonksiyona geçirdiğiniz herhangi bir dizinin en az 4 elemanlı olacağını varsayacak olmasıdır. Bunun dışındaki her şey tanımsız davranıştır (undefined behavior). int func(int p[static 4]) {...} int main(void) { int a[] = {11, 22, 33, 44}; int b[] = {11, 22, 33, 44, 55}; int c[] = {11, 22}; func(a); // OK! a 4 elemanlıdır, gereken minimum boyut func(b); // OK! b en az 4 elemanlıdır func(c); // Tanımsız davranış! c 4 elemanın altındadır! } Bu temel olarak sahip olabileceğiniz minimum dizi boyutunu belirler. Önemli not: Derleyicide daha küçük bir dizi geçirmenizi engelleyen hiçbir şey yoktur. Derleyici muhtemelen sizi uyarmaz ve bunu çalışma zamanında tespit edemez. Orada static kullanarak, \"Bundan daha küçük bir dizi ASLA geçirmeyeceğime çifte gizli yemin ederim,\" demiş oluyorsunuz. Ve derleyici de \"Tamam, güzel,\" diyerek doğru olanı yapacağınız konusunda size güvenir. Ve böylece derleyici, siz programcının her zaman doğru şeyi yapacağı bilgisinin rahatlığıyla belirli kod optimizasyonlarını gerçekleştirebilir. 33.3 Eşdeğer İlklendiriciler C, dizi ilklendiricileri (initializers) söz konusu olduğunda biraz, nasıl desek, esnektir. Eksik değerlerin sıfır ile değiştirildiği bu durumların bazılarını zaten görmüştük. Örneğin, 5 elemanlı bir diziyi şu şekilde 1,2,0,0,0 olarak ilklendirebiliriz: int a[5] = {1, 2}; Veya bir diziyi tamamen sıfıra ayarlamak için: int a[5] = {0}; Fakat çok boyutlu dizileri ilklen"
  },
  {
    "file": "arrays.html",
    "title": "6 Diziler (Arrays)",
    "headings": [
      {
        "id": "easy-example",
        "title": "6.1 Kolay Bir Örnek"
      },
      {
        "id": "getting-the-length-of-an-array",
        "title": "6.2 Bir Dizinin Uzunluğunu Almak"
      },
      {
        "id": "array-initializers",
        "title": "6.3 Dizi İlklendiricileri (Array Initializers)"
      },
      {
        "id": "out-of-bounds",
        "title": "6.4 Sınırların Dışında! (Out of Bounds)"
      },
      {
        "id": "multidimensional-arrays",
        "title": "6.5 Çok Boyutlu Diziler (Multidimensional Arrays)"
      },
      {
        "id": "arrays-and-pointers",
        "title": "6.6 Diziler ve Pointer'lar (Göstericiler)"
      },
      {
        "id": "getting-a-pointer-to-an-array",
        "title": "6.6.1 Bir Diziye Pointer (Gösterici) Elde Etmek"
      },
      {
        "id": "passing1darrays",
        "title": "6.6.2 Fonksiyonlara Tek Boyutlu Dizileri Geçirmek"
      },
      {
        "id": "changing-arrays-in-functions",
        "title": "6.6.3 Fonksiyonlarda Dizileri Değiştirmek"
      },
      {
        "id": "passing-multidimensional-arrays-to-functions",
        "title": "6.6.4 Fonksiyonlara Çok Boyutlu Dizileri Geçirmek"
      }
    ],
    "text": "Beej's Guide to C Programming 6 Diziler (Arrays) “Dizi indeksleri 0 ile mi yoksa 1 ile mi başlamalı? Benim 0.5 uzlaşmam, bence yeterli bir değerlendirme yapılmadan reddedildi.” —Stan Kelly-Bootle, bilgisayar bilimci Şanslıyız ki C'de diziler var. Yani düşük seviyeli bir dil olarak kabul edildiğini biliyorum54 ama en azından bünyesinde yerleşik bir dizi kavramı barındırıyor. Ve pek çok dil C'nin sözdiziminden ilham aldığı için, dizi tanımlamak ve kullanmak için [ ve ] kullanmaya muhtemelen zaten aşinasınızdır. Ama C'de diziler var derken zar zor var! Daha sonra göreceğimiz gibi, diziler C'de yalnızca sözdizimsel şekerdir (syntactic sugar)—derinlerde aslında hepsi göstericilerden (pointers) ve benzeri şeylerden ibarettir. Dehşete düşebilirsiniz! Ama şimdilik onları sadece dizi olarak kullanalım. Derin bir nefes. 6.1 Kolay Bir Örnek Hemen bir örnek patlatalım: #include <stdio.h> int main(void) { int i; float f[4]; // 4 elemanlı float dizisi tanımla f[0] = 3.14159; // İndeksleme tabii ki 0 ile başlar. f[1] = 1.41421; f[2] = 1.61803; f[3] = 2.71828; // Hepsini ekrana yazdır: for (i = 0; i < 4; i++) { printf(\"%f\\n\", f[i]); } } Bir dizi tanımladığınızda ona bir boyut vermeniz gerekir. Ve bu boyut sabit olmalıdır55. Yukarıdaki örnekte 4 elemanlı float türünde bir dizi oluşturduk. Tanımlamadaki köşeli parantezler içindeki değer bunu görmemizi sağlar. Daha sonraki satırlarda, yine köşeli parantezleri kullanarak dizideki değerlere erişiyor, onları ayarlıyor veya okuyoruz. Umarım bu, zaten bildiğiniz dillerden tanıdık gelmiştir! 6.2 Bir Dizinin Uzunluğunu Almak Alamazsınız… gibi bir şey. C bu bilgiyi kaydetmez56. Bunu başka bir değişkende kendiniz ayrı olarak yönetmek zorundasınız. “Alamazsınız” derken, aslında alabileceğiniz bazı durumlar olduğunu kastettim. Bir dizinin tanımlandığı kapsam (scope) içindeyken eleman sayısını bulmak için kullanılan bir numara var. Ancak genel olarak konuşmak gerekirse, diziyi bir fonksiyona geçirdiğinizde bu yöntem istediğiniz şekilde çalışmayacaktır57. Gelin bu numaraya bir göz atalım. Temel fikir, dizinin sizeof değerini alıp bunu her bir elemanın boyutuna bölerek uzunluğu elde etmektir. Örneğin, bir int 4 baytsa ve dizi 32 bayt uzunluğundaysa, orada \\(\\frac{32}{4}\\) yani \\(8\\) adet int için yer olmalıdır. int x[12]; // 12 adet int printf(\"%zu\\n\", sizeof x); // Toplam 48 bayt printf(\"%zu\\n\", sizeof(int)); // int başına 4 bayt printf(\"%zu\\n\", sizeof x / sizeof(int)); // 48/4 = 12 adet int! Eğer bu bir char dizisiyse, sizeof(char) 1 olarak tanımlandığı için dizinin sizeof değeri doğrudan eleman sayısına eşittir. Diğer her tür için her bir elemanın boyutuna bölmeniz gerekir. Ancak bu numara sadece dizinin tanımlandığı kapsam (scope) içinde çalışır. Diziyi bir fonksiyona geçirirseniz çalışmaz. Fonksiyon imzasında diziyi \"büyük\" tanımlasanız bile: void foo(int x[12]) { printf(\"%zu\\n\", sizeof x); // 8?! 48'e ne oldu? printf(\"%zu\\n\", sizeof(int)); // int başına 4 bayt printf(\"%zu\\n\", sizeof x / sizeof(int)); // 8/4 = 2 int?? YANLI"
  },
  {
    "file": "bitwise-operations.html",
    "title": "24 Bit Düzeyinde İşlemler",
    "headings": [
      {
        "id": "bitwise-and-or-xor-and-not",
        "title": "24.1 Bit Düzeyinde AND, OR, XOR ve NOT"
      },
      {
        "id": "bitwise-shift",
        "title": "24.2 Bit Kaydırma"
      }
    ],
    "text": "Beej's Guide to C Programming 24 Bit Düzeyinde İşlemler Bu sayısal işlemler, C'nin bu kadar alt seviye bir dil olmasına uygun şekilde, değişkenlerdeki tekil bitleri manipüle etmenize etkili bir şekilde olanak tanır152. Bit düzeyinde işlemlere alışkın değilseniz, Wikipedia'da güzel bir bitwise makalesi var153. 24.1 Bit Düzeyinde AND, OR, XOR ve NOT Bunların her biri için, işlenenler üzerinde (ki bu durumda bir tamsayı türü olmalıdırlar) olağan aritmetik dönüşümler gerçekleşir ve ardından uygun bit düzeyinde işlem yürütülür. İşlem Operatör Örnek AND & a = b & c OR | a = b | c XOR ^ a = b ^ c NOT ~ a = ~c Bunların && ve || Mantıksal (Boolean) operatörlerine ne kadar benzediğine dikkat edin. Bunların += ve -= operatörlerine benzer kısa atama eşdeğerleri vardır: Operatör Örnek Uzun Yazım Eşdeğeri &= a &= c a = a & c |= a |= c a = a | c ^= a ^= c a = a ^ c 24.2 Bit Kaydırma Bunlar için, her bir işlenen üzerinde (ki bir tamsayı türü olmalıdır) tamsayı terfileri (integer promotions) gerçekleştirilir ve ardından bit kaydırma işlemi yürütülür. Sonucun türü, terfi ettirilmiş sol işlenenin türüdür. Yeni bitler sıfırlarla doldurulur; aşağıda belirtilen uygulamaya bağlı davranıştaki olası bir istisna hariç. İşlem Operatör Örnek Sola kaydırma << a = b << c Sağa kaydırma >> a = b >> c Kaydırma için de benzer kısa yazımlar mevcuttur: Operatör Örnek Uzun Yazım Eşdeğeri >>= a >>= c a = a >> c <<= a <<= c a = a << c Tanımsız davranışa (undefined behavior) dikkat edin: Negatif kaydırma yapılamaz ve terfi ettirilmiş sol işlenenin boyutundan daha büyük kaydırma yapılamaz. Ayrıca uygulamaya bağlı davranışa (implementation-defined behavior) dikkat edin: Negatif bir sayıyı sağa kaydırırsanız, sonuçlar uygulamaya bağlıdır. (İşaretli [signed] bir int türünü sağa kaydırmakta bir sakınca yoktur, sadece pozitif olduğundan emin olun.)"
  },
  {
    "file": "chapter-atomics.html",
    "title": "40 Atomik İşlemler (Atomics)",
    "headings": [
      {
        "id": "testing-for-atomic-support",
        "title": "40.1 Atomik Destek Testi"
      },
      {
        "id": "atomic-variables",
        "title": "40.2 Atomik Değişkenler"
      },
      {
        "id": "synchronization",
        "title": "40.3 Senkronizasyon"
      },
      {
        "id": "acquire-and-release",
        "title": "40.4 Edinme ve Serbest Bırakma (Acquire and Release)"
      },
      {
        "id": "sequential-consistency",
        "title": "40.5 Sıralı Tutarlılık (Sequential Consistency)"
      },
      {
        "id": "atomic-assignments-and-operators",
        "title": "40.6 Atomik Atamalar ve Operatörler"
      },
      {
        "id": "library-functions-that-automatically-synchronize",
        "title": "40.7 Otomatik Olarak Senkronize Olan Kütüphane Fonksiyonları"
      },
      {
        "id": "atomic-type-specifier-qualifier",
        "title": "40.8 Atomik Tür Belirteci ve Niteleyicisi (Type Specifier, Qualifier)"
      },
      {
        "id": "lock-free-atomic",
        "title": "40.9 Kilitsiz (Lock-Free) Atomik Değişkenler"
      },
      {
        "id": "signal-handlers-and-lock-free-atomics",
        "title": "40.9.1 Sinyal İşleyiciler ve Kilitsiz Atomikler"
      },
      {
        "id": "atomic-flags",
        "title": "40.10 Atomik Bayraklar (Atomic Flags)"
      },
      {
        "id": "atomic-structs-and-unions",
        "title": "40.11 Atomik struct ve union Yapıları"
      },
      {
        "id": "atomic-pointers",
        "title": "40.12 Atomik Pointer'lar"
      },
      {
        "id": "memory-order",
        "title": "40.13 Bellek Sıralaması (Memory Order)"
      },
      {
        "id": "sequential-consistency-1",
        "title": "40.13.1 Sıralı Tutarlılık (Sequential Consistency)"
      },
      {
        "id": "acquire",
        "title": "40.13.2 Acquire (Edinme)"
      },
      {
        "id": "release",
        "title": "40.13.3 Release (Serbest Bırakma)"
      },
      {
        "id": "consume",
        "title": "40.13.4 Consume (Tüketme)"
      },
      {
        "id": "acquirerelease",
        "title": "40.13.5 Acquire/Release (Edinme/Serbest Bırakma)"
      },
      {
        "id": "relaxed",
        "title": "40.13.6 Relaxed (Gevşetilmiş)"
      },
      {
        "id": "fences",
        "title": "40.14 Çitler (Fences)"
      },
      {
        "id": "references",
        "title": "40.15 Kaynakça"
      }
    ],
    "text": "Beej's Guide to C Programming 40 Atomik İşlemler (Atomics) “Denediler ve başarısız mı oldular, hepsi mi?” “Oh, hayır.” Başını salladı. “Denediler ve öldüler.” —Paul Atreides ve Rahibe Ana Gaius Helen Mohiam, Dune Bu, C'de çoklu izlek (multithreading) kullanmanın en zorlu yönlerinden biridir. Ancak ağırdan almaya çalışacağız. Temel olarak, atomik değişkenlerin daha açık kullanım yollarından, ne olduklarından, nasıl çalıştıklarından vb. bahsedeceğim. Ve erişebileceğiniz daha delice karmaşık yollardan bazılarına da değineceğim. Ancak o yollara girmeyeceğim. Sadece onlar hakkında yazmak için zar zor kalifiye olmakla kalmıyorum, aynı zamanda onlara ihtiyacınız olduğunu biliyorsanız, zaten benden daha fazlasını bildiğinizi tahmin ediyorum. Ancak temel konularda bile tuhaf şeyler var. Bu yüzden kemerlerinizi bağlayın millet, çünkü Kansas elden gidiyor. 40.1 Atomik Destek Testi Atomikler isteğe bağlı bir özelliktir. Atomik desteğine sahip değilseniz 1 olan bir __STDC_NO_ATOMICS__ makrosu vardır. Bu makro C11 öncesinde bulunmayabilir, bu yüzden dil sürümünü __STDC_VERSION__ ile test etmeliyiz209. #if __STDC_VERSION__ < 201112L || __STDC_NO_ATOMICS__ == 1 #define HAS_ATOMICS 0 #else #define HAS_ATOMICS 1 #endif Bu testler geçerse, bu bölümün geri kalanının dayandığı <stdatomic.h> başlık dosyasını güvenle dahil edebilirsiniz. Ancak atomik destek yoksa, bu başlık dosyası hiç var olmayabilir. Bazı sistemlerde, başlık dosyasındaki herhangi bir fonksiyonu kullanmak için derleme komut satırınızın sonuna -latomic eklemeniz gerekebilir. 40.2 Atomik Değişkenler İşte atomik değişkenlerin nasıl çalıştığının bir kısmı: Paylaşılan bir atomik değişkeniniz varsa ve buna bir thread'den yazarsanız, bu yazma başka bir thread'de ya hep ya hiç (all-or-nothing) şeklinde gerçekleşir. Yani diğer thread, örneğin 32-bitlik bir değerin yazılmasının tamamını görür. Yarısını değil. Bir thread'in, atomik bir çoklu bayt yazımının ortasında olan başka bir thread'i kesintiye uğratmasının hiçbir yolu yoktur. Neredeyse o tek değişkeni alma ve ayarlama işlemlerinin etrafında küçük bir kilit varmış gibidir. (Ve olabilir de! Aşağıdaki Kilitsiz (Lock-Free) Atomik Değişkenler bölümüne bakın.) Ve bu hususta, kritik bölümlerinizi kilitlemek için mutex'ler kullanıyorsanız, atomikleri hiç kullanmadan da idare edebilirsiniz. Sadece bir mutex tarafından engellenmek yerine diğer thread'lerin her zaman ilerlemesine izin veren bir kilitsiz veri yapıları (lock-free data structures) sınıfı vardır… fakat bunları sıfırdan doğru şekilde oluşturmak zordur ve ne yazık ki bu rehberin kapsamı dışında kalan şeylerden biridir. Bu hikayenin sadece bir parçası. Ancak başlayacağımız kısım bu. Daha ileri gitmeden önce, bir değişkeni nasıl atomik olarak tanımlarsınız? İlk olarak, <stdatomic.h> dosyasını dahil edin. Bu bize atomic_int gibi türler sağlar. Ve ardından değişkenleri sadece bu türde tanımlayabiliriz. Ancak iki thread'imizin olduğu bir gösteri yapalım. Birincisi bir süre çalışır ve ardından bir değişkeni beli"
  },
  {
    "file": "characters-and-strings-ii.html",
    "title": "21 Karakterler ve Metin Dizileri II",
    "headings": [
      {
        "id": "escape-sequences",
        "title": "21.1 Kaçış Dizileri (Escape Sequences)"
      },
      {
        "id": "frequently-used-escapes",
        "title": "21.1.1 Sık Kullanılan Kaçış İfadeleri"
      },
      {
        "id": "rarely-used-escapes",
        "title": "21.1.2 Nadir Kullanılan Kaçış İfadeleri"
      },
      {
        "id": "numeric-escapes",
        "title": "21.1.3 Sayısal Kaçış İfadeleri"
      }
    ],
    "text": "Beej's Guide to C Programming 21 Karakterler ve Metin Dizileri II char türlerinin aslında küçük tamsayı türleri olduğundan bahsetmiştik… ancak tek tırnak içindeki bir karakter için de durum aynıdır. Fakat çift tırnak içindeki bir metin dizisi (string) const char * türündedir. Görünüşe göre birkaç farklı metin dizisi ve karakter türü daha var ve bu da dildeki en meşhur tavşan deliklerinden birine yol açıyor: tüm o çok baytlı/geniş/Unicode/yerelleştirme muhabbeti. O tavşan deliğine şöyle bir göz atacağız ama içine girmeyeceğiz. …Henüz! 21.1 Kaçış Dizileri (Escape Sequences) Normal harfler, noktalama işaretleri ve sayılar içeren metin dizilerine ve karakterlere alışkınız: char *s = \"Hello!\"; char t = 'c'; Peki ya içinde klavyede yazamadığımız çünkü var olmayan bazı özel karakterler istemişsek (örneğin “€”) ya da tek tırnak olan bir karakter istiyorsak? Açıkça görülüyor ki şunu yapamayız: char t = '''; Bu şeyleri yapmak için kaçış dizileri (escape sequences) adını verdiğimiz bir şey kullanırız. Bunlar, ters eğik çizgi (backslash) karakterini (\\) takip eden başka bir karakterden oluşur. İki (veya daha fazla) karakter birlikte özel bir anlama sahiptir. Tek tırnak karakteri örneğimiz için, bunu çözmek amacıyla ortadaki tek tırnağın önüne bir kaçış karakteri (yani \\) koyabiliriz: char t = '\\''; Artık C, \\' ifadesinin karakter dizisinin sonu değil, yalnızca yazdırmak istediğimiz sıradan bir tırnak işareti anlamına geldiğini bilir. Bu bağlamda \"ters eğik çizgi\" (backslash) veya \"kaçış\" (escape) diyebilirsiniz (\"o tırnağı kaçır / escape et\") ve C geliştiricileri neyden bahsettiğinizi anlayacaktır. Ayrıca bu bağlamdaki \"escape\", klavyenizdeki Esc tuşundan veya ASCII ESC kodundan farklıdır. 21.1.1 Sık Kullanılan Kaçış İfadeleri Benim mütevazı görüşüme göre, bu kaçış karakterleri tüm kaçış ifadelerinin %99.2'sini140 oluşturur. Kod Açıklama \\n Yeni satır karakteri—yazdırırken, sonraki çıktıyı bir sonraki satırdan devam ettirir \\' Tek tırnak—tek tırnak karakter sabiti için kullanılır \\\" Çift tırnak—bir metin sabiti içindeki çift tırnak için kullanılır \\\\ Ters eğik çizgi—bir metin dizisi veya karakter içinde düz \\ için kullanılır İşte kaçış ifadelerine ve yazdırıldıklarında ne çıktı verdiklerine dair bazı örnekler. printf(\"Use \\\\n for newline\\n\"); // Yeni satır için \\n kullanın printf(\"Say \\\"hello\\\"!\\n\"); // \"hello\" deyin! printf(\"%c\\n\", '\\''); // ' 21.1.2 Nadir Kullanılan Kaçış İfadeleri Ancak daha fazla kaçış ifadesi var! Sadece bunları o kadar sık görmezsiniz. Kod Açıklama \\a Uyarı (Alert). Terminalin ses çıkarmasını veya yanıp sönmesini (ya da her ikisini) sağlar! \\b Geri al (Backspace). İmleci bir karakter geriye taşır. Karakteri silmez. \\f Sayfa ilerletme (Formfeed). Bir sonraki \"sayfaya\" geçer, ancak bunun modern zamanlarda pek bir anlamı yoktur. Benim sistemimde bu \\v gibi davranır. \\r Satır başı (Return). Aynı satırın başına taşır. \\t Yatay sekme (Horizontal tab). Bir sonraki yatay sekme durağına geçer. Benim makinemde bu 8'in katları olan sütunlarda hiz"
  },
  {
    "file": "complex-numbers.html",
    "title": "36 Karmaşık Sayılar",
    "headings": [
      {
        "id": "complex-types",
        "title": "36.1 Karmaşık Türler (Complex Types)"
      },
      {
        "id": "assigning-complex-numbers",
        "title": "36.2 Karmaşık Sayılara Değer Atama"
      },
      {
        "id": "constructing-deconstructing-and-printing",
        "title": "36.3 Oluşturma, Ayrıştırma ve Yazdırma"
      },
      {
        "id": "complex-arithmetic-and-comparisons",
        "title": "36.4 Karmaşık Aritmetik ve Karşılaştırmalar"
      },
      {
        "id": "complex-math",
        "title": "36.5 Karmaşık Matematik"
      },
      {
        "id": "trigonometry-functions",
        "title": "36.5.1 Trigonometri Fonksiyonları"
      },
      {
        "id": "exponential-and-logarithmic-functions",
        "title": "36.5.2 Üstel ve Logaritmik Fonksiyonlar"
      },
      {
        "id": "power-and-absolute-value-functions",
        "title": "36.5.3 Kuvvet ve Mutlak Değer Fonksiyonları"
      },
      {
        "id": "manipulation-functions",
        "title": "36.5.4 İşleme Fonksiyonları"
      }
    ],
    "text": "Beej's Guide to C Programming 36 Karmaşık Sayılar Doğrudan Wikipedia'dan aşırdığım, Karmaşık sayılar (Complex numbers) üzerine küçük bir ön bilgi185: Bir karmaşık sayı (complex number), \\(a\\) ve \\(b\\) gerçel sayılar [yani C'deki kayan nokta (floating point) türleri] ve \\(i\\), \\(i^2=−1\\) eşitliğini sağlayan sanal birim olmak üzere \\(a+bi\\) biçiminde ifade edilebilen bir sayıdır. Hiçbir gerçel sayı bu denklemi sağlamadığından \\(i\\) sayısına sanal (imajiner) sayı denir. \\(a+bi\\) karmaşık sayısı için \\(a\\) ifadesine gerçel kısım (real part), \\(b\\) ifadesine ise sanal kısım (imaginary part) denir. Ama gideceğim tek yer burası. Bu bölümü okuyorsanız, karmaşık sayının ne olduğunu ve onlarla ne yapmak istediğinizi bildiğinizi varsayacağız. Bizim tek ele almamız gereken şey, C'nin bunun için sunduğu imkanlar. Ancak bir derleyicide karmaşık sayı desteğinin isteğe bağlı (optional) bir özellik olduğu ortaya çıkıyor. Uyumlu derleyicilerin tümü bunu yapamaz. Yapanlar da bunu farklı tamamlanma derecelerinde yapabilir. Sisteminizin karmaşık sayıları destekleyip desteklemediğini şununla test edebilirsiniz: #ifdef __STDC_NO_COMPLEX__ #error Complex numbers not supported! #endif Ayrıca, karmaşık sayılarla kayan nokta matematiği için ISO 60559 (IEEE 754) standardına uyulduğunu ve _Imaginary türünün varlığını belirten bir makro bulunmaktadır. #if __STDC_IEC_559_COMPLEX__ != 1 #error Need IEC 60559 complex support! #endif Bununla ilgili daha fazla ayrıntı C11 spesifikasyonundaki Ek G'de (Annex G) açıklanmıştır. 36.1 Karmaşık Türler (Complex Types) Karmaşık sayıları kullanmak için #include <complex.h> ekleyin. Bununla birlikte en az iki tür elde edersiniz: _Complex complex Bu ikisi de aynı anlama gelir, bu yüzden daha şık olan complex türünü kullanabilirsiniz. Ayrıca uygulamanız IEC 60559 uyumluysa, sanal sayılar için de bazı türler elde edersiniz: _Imaginary imaginary Bunların ikisi de aynı anlama gelir, bu yüzden daha şık olan imaginary kullanabilirsiniz. Ayrıca sanal sayının kendisi olan \\(i\\) için de değerler elde edersiniz: I _Complex_I _Imaginary_I I makrosu _Imaginary_I (varsa) veya _Complex_I olarak ayarlanır. Yani sanal sayı için sadece I kullanın. Küçük bir not: Bir derleyicinin __STDC_IEC_559_COMPLEX__ değerini 1 olarak ayarlaması durumunda, uyumlu olması için _Imaginary türlerini desteklemesi gerektiğini söylemiştim. Spesifikasyondan anladığım kadarıyla böyle. Ancak, __STDC_IEC_559_COMPLEX__ ayarlanmış olmasına rağmen _Imaginary türünü gerçekten destekleyen tek bir derleyici bile bilmiyorum. Bu yüzden buraya test etme imkanımın olmadığı bu türle ilgili bazı kodlar yazacağım. Üzgünüm! Tamam, artık bir complex türü olduğunu biliyoruz, peki bunu nasıl kullanabiliriz? 36.2 Karmaşık Sayılara Değer Atama Karmaşık sayının gerçel ve sanal bir kısmı olduğundan ve her ikisi de değerleri saklamak için kayan noktalı sayılara dayandığından, C'ye karmaşık sayının bu kısımları için hangi hassasiyetin (precision) kullanılacağını da söylememiz gerekir. Bunu, karmaşık sayıda"
  },
  {
    "file": "date-and-time-functionality.html",
    "title": "38 Tarih ve Zaman İşlevselliği",
    "headings": [
      {
        "id": "quick-terminology-and-information",
        "title": "38.1 Hızlı Terminoloji ve Bilgi"
      },
      {
        "id": "date-types",
        "title": "38.2 Tarih Türleri"
      },
      {
        "id": "initialization-and-conversion-between-types",
        "title": "38.3 Türler Arasında Başlatma ve Dönüştürme"
      },
      {
        "id": "converting-time_t-to-struct-tm",
        "title": "38.3.1 time_t Türünü struct tm Yapısına Dönüştürme"
      },
      {
        "id": "converting-struct-tm-to-time_t",
        "title": "38.3.2 struct tm Yapısını time_t Türüne Dönüştürme"
      },
      {
        "id": "formatted-date-output",
        "title": "38.4 Biçimlendirilmiş Tarih Çıktısı"
      },
      {
        "id": "more-resolution-with-timespec_get",
        "title": "38.5 timespec_get() ile Daha Yüksek Çözünürlük"
      },
      {
        "id": "differences-between-times",
        "title": "38.6 Zamanlar Arasındaki Farklar"
      }
    ],
    "text": "Beej's Guide to C Programming 38 Tarih ve Zaman İşlevselliği “Zaman bir yanılsamadır. Öğle yemeği zamanı iki kat öyle.” —Ford Prefect, Otostopçunun Galaksi Rehberi Bu çok karmaşık değildir, ancak hem mevcut farklı türler hem de aralarında dönüşüm yapma şeklimiz nedeniyle ilk başta biraz ürkütücü olabilir. GMT (UTC) ve yerel saati de işin içine kattığınızda, tarih ve saatlerle elde edilen tüm o Alışılagelmiş Eğlence™ ile karşılaşırız. Ve elbette tarih ve saatlerin altın kuralını asla unutmayın: Asla kendi tarih ve saat işlevselliğinizi yazmaya çalışmayın. Yalnızca kütüphanenin size sunduğu şeyleri kullanın. Zaman, sadece ölümlü programcıların doğru bir şekilde yönetemeyeceği kadar karmaşıktır. Cidden, herhangi bir tarih ve saat kütüphanesi üzerinde çalışan herkese bir puan borçluyuz, bu yüzden bunu bütçenize koyun. 38.1 Hızlı Terminoloji ve Bilgi Tam olarak hakim olamama ihtimalinize karşı birkaç hızlı terim. UTC: Koordine Edilmiş Evrensel Zaman (Coordinated Universal Time) evrensel olarak191 üzerinde anlaşmaya varılmış, mutlak bir zamandır. Gezegendeki herkes şu anda farklı yerel saatlere sahip olsalar bile UTC'de aynı saat olduğunu düşünür… GMT: Greenwich Ortalama Zamanı (Greenwich Mean Time), esasen UTC ile aynıdır192. Muhtemelen UTC veya \"evrensel zaman\" demek istersiniz. Özellikle GMT saat diliminden bahsediyorsanız, GMT deyin. Kafa karıştırıcı bir şekilde, C'nin UTC fonksiyonlarının birçoğu UTC'den öncesine dayanır ve hâlâ Greenwich Ortalama Zamanı'na atıfta bulunur. Bunu gördüğünüzde, C'nin UTC'yi kastettiğini bilin. Yerel zaman (Local time): Programı çalıştıran bilgisayarın bulunduğu yerdeki saatin kaç olduğudur. Bu, UTC'den bir fark (offset) olarak tanımlanır. Dünyada birçok saat dilimi olmasına rağmen, çoğu bilgisayar yerel saat veya UTC ile çalışır. Genel bir kural olarak, bir günlük kaydı (log entry), bir roket fırlatılması veya göstericilerin (pointers) nihayet kafanıza yattığı an gibi bir kez gerçekleşen bir olayı tarif ediyorsanız, UTC kullanın. Öte yandan, Yılbaşı gecesi veya akşam yemeği zamanı gibi her saat diliminde aynı saatte gerçekleşen bir şeyse, yerel saat kullanın. Birçok dil yalnızca UTC ile yerel saat arasında dönüşüm yapmakta iyi olduğundan, tarihlerinizi yanlış biçimde saklamayı seçerek kendinize çok fazla acı çektirebilirsiniz. (Nereden bildiğimi sorun.) 38.2 Tarih Türleri Tarihler söz konusu olduğunda C'de iki193 ana tür vardır: time_t ve struct tm. Spesifikasyon aslında bunlar hakkında pek bir şey söylemiyor: time_t: bir zamanı tutmaya yetkin gerçek bir tür. Dolayısıyla spesifikasyona göre bu bir kayan nokta türü veya tamsayı türü olabilir. POSIX'te (Unix benzeri sistemlerde) bu bir tamsayıdır. Bu tür takvim zamanını (calendar time) tutar. Bunu UTC zamanı olarak düşünebilirsiniz. struct tm: bir takvim zamanının bileşenlerini tutar. Bu bir ayrıştırılmış zamandır (broken-down time), yani saat, dakika, saniye, gün, ay, yıl vb. gibi zamanın bileşenleridir. Birçok sistemde time_t, Epoch'tan bu yana geçen saniye sayısını "
  },
  {
    "file": "enumerated-types-enum.html",
    "title": "22 Numaralandırma Türleri: enum",
    "headings": [
      {
        "id": "behavior-of-enum",
        "title": "22.1 enum Davranışı"
      },
      {
        "id": "numbering",
        "title": "22.1.1 Numaralandırma"
      },
      {
        "id": "trailing-commas",
        "title": "22.1.2 Sona Gelen Virgüller"
      },
      {
        "id": "scope-1",
        "title": "22.1.3 Kapsam"
      },
      {
        "id": "style",
        "title": "22.1.4 Stil"
      },
      {
        "id": "your-enum-is-a-type",
        "title": "22.2 enum Yapınız Bir Türdür"
      }
    ],
    "text": "Beej's Guide to C Programming 22 Numaralandırma Türleri: enum C bize isim verilmiş sabit tamsayı değerlerine sahip olmanın başka bir yolunu sunar: enum. Örneğin: enum { ONE=1, TWO=2 }; printf(\"%d %d\", ONE, TWO); // 1 2 Bazı açılardan #define kullanmaktan daha iyi—veya farklı—olabilir. Temel farklar: enum’lar yalnızca tamsayı türleri olabilir. #define herhangi bir şeyi tanımlayabilir. enum’lar bir hata ayıklayıcıda (debugger) genellikle sembolik tanımlayıcı adlarıyla gösterilir. #define ile tanımlanmış sayılar ise yalnızca ham sayılar olarak görünür ve hata ayıklama sırasında ne anlama geldiklerini bilmek daha zordur. Tamsayı türleri olduklarından, dizi boyutları ve case ifadeleri de dahil olmak üzere tamsayıların kullanılabildiği her yerde kullanılabilirler. Buna biraz daha yakından bakalım. 22.1 enum Davranışı 22.1.1 Numaralandırma Siz üzerlerine yazıp değiştirmediğiniz sürece enum’lar otomatik olarak numaralandırılır. Varsayılan olarak 0 ile başlar ve oradan itibaren birer birer artarlar: enum { SHEEP, // Değeri 0 WHEAT, // Değeri 1 WOOD, // Değeri 2 BRICK, // Değeri 3 ORE // Değeri 4 }; printf(\"%d %d\\n\", SHEEP, BRICK); // 0 3 Daha önce gördüğümüz gibi belirli tamsayı değerlerini zorunlu kılabilirsiniz: enum { X=2, Y=18, Z=-2 }; Yinelenen değerler sorun teşkil etmez: enum { X=2, Y=2, Z=2 }; Değerler atlanırsa, numaralandırma en son belirtilen değerden itibaren pozitif yönde saymaya devam eder. Örneğin: enum { A, // 0, varsayılan başlangıç değeri B, // 1 C=4, // 4, elle ayarlanmış D, // 5 E, // 6 F=3, // 3, elle ayarlanmış G, // 4 H // 5 } 22.1.2 Sona Gelen Virgüller Tarzınız buysa, bu tamamen sorunsuzdur: enum { X=2, Y=18, Z=-2, // <-- Sona gelen virgül }; Son on yılların dillerinde daha popüler hale geldi, bu yüzden bunu görmek hoşunuza gidebilir. 22.1.3 Kapsam enum’ların kapsamı (scope) beklediğiniz gibidir. Dosya kapsamındaysa (file scope), tüm dosya görebilir. Bir blok içindeyse, o bloğa yereldir (local). enum’ların başlık dosyalarında (header files) tanımlanması ve böylece dosya kapsamında #include edilmesi son derece yaygındır. 22.1.4 Stil Fark ettiğiniz üzere, enum sembollerini büyük harflerle (alt çizgiler kullanarak) bildirmek yaygındır. Bu bir zorunluluk değildir, ancak çok ama çok yaygın bir yaklaşımdır. 22.2 enum Yapınız Bir Türdür Bu, enum hakkında bilinmesi gereken önemli bir şeydir: bir struct yapısının bir tür olmasına benzer şekilde, onlar da bir türdür. Türe daha sonra başvurabilmek ve o türde değişkenler bildirebilmek için onlara bir etiket adı (tag name) verebilirsiniz. Şimdi, enum’lar tamsayı türleri olduğuna göre, neden doğrudan int kullanmıyoruz? C dilinde bunun en iyi nedeni kodun netliğidir—düşüncelerinizi kodda ifade etmenin güzel ve tür güvenlikli bir yoludur. C (C++'ın aksine), belirli bir enum için değerlerin aralıkta olmasını fiilen zorunlu kılmaz. Bu değerleri tutabilen enum resource türünde bir r değişkeni bildirdiğimiz bir örnek yapalım: // İsimlendirilmiş enum, tür \"enum resource\" enum resource { SHEEP, WHEAT, "
  },
  {
    "file": "exiting-a-program.html",
    "title": "28 Bir Programdan Çıkış Yapmak",
    "headings": [
      {
        "id": "normal-exits",
        "title": "28.1 Normal Çıkışlar"
      },
      {
        "id": "returning-from-main",
        "title": "28.1.1 main() Fonksiyonundan Dönmek"
      },
      {
        "id": "exit",
        "title": "28.1.2 exit()"
      },
      {
        "id": "setting-up-exit-handlers-with-atexit",
        "title": "28.1.3 atexit() ile Çıkış İşleyicileri (Exit Handlers) Tanımlamak"
      },
      {
        "id": "quicker-exits-with-quick_exit",
        "title": "28.2 quick_exit() ile Daha Hızlı Çıkışlar"
      },
      {
        "id": "nuke-it-from-orbit-_exit",
        "title": "28.3 Yörüngeden Bombalamak: _Exit()"
      },
      {
        "id": "exiting-sometimes-assert",
        "title": "28.4 Bazen Çıkış Yapmak: assert()"
      },
      {
        "id": "abnormal-exit-abort",
        "title": "28.5 Anormal Çıkış: abort()"
      }
    ],
    "text": "Beej's C Programlama Rehberi 28 Bir Programdan Çıkış Yapmak Meğer bunu yapmanın pek çok yolu varmış, hatta bir program sonlandığında bir fonksiyonun çalışmasını sağlayacak \"kancalar\" (hook) kurmanın bile yolları bulunuyormuş. Bu bölümde konunun derinliklerine dalıp hepsine göz atacağız. Çıkış durum kodunun (exit status code) ne anlama geldiğine Çıkış Durumu bölümünde değinmiştik; ihtiyaç duyarsanız geriye dönüp tekrar göz atabilirsiniz. Bu bölümdeki tüm fonksiyonlar <stdlib.h> başlık dosyasında yer almaktadır. 28.1 Normal Çıkışlar İşe bir programdan çıkmanın standart yollarıyla başlayacağız, ardından daha nadir ve sıra dışı olanlarına geçeceğiz. Bir programdan normal şekilde çıktığınızda, tüm açık G/Ç akışları (I/O streams) boşaltılır (flush edilir) ve geçici dosyalar silinir. Temelde her şeyin temizlendiği ve düzgünce halledildiği nazik bir çıkıştır. Aksini yapmak için özel bir sebebiniz yoksa neredeyse her zaman tercih etmek isteyeceğiniz yöntem budur. 28.1.1 main() Fonksiyonundan Dönmek Fark ettiyseniz main() fonksiyonunun dönüş türü int... yine de main() içinden neredeyse hiç return ile bir değer döndürmedim. Bunun sebebi, yalnızca main() fonksiyonuna özel olarak (ve bu özel durumun sadece ve sadece main() için geçerli olduğunu, başka hiçbir fonksiyon için geçerli olmadığını ne kadar vurgulasam azdır), bloğun sonuna ulaştığınızda örtük (implicit) bir return 0 bulunmasıdır. İstediğiniz zaman main() içinden açıkça (explicit) return yapabilirsiniz; hatta bazı programcılar main() sonunda her zaman bir return bulunmasının daha Doğru olduğunu düşünür. Ancak koymazsanız, C sizin yerinize bir tane ekleyecektir. Yani... main() için return kuralları şunlardır: Bir return ifadesi ile main() fonksiyonundan bir çıkış durumu döndürebilirsiniz. main() bu özel davranışa sahip tek fonksiyondur. Başka herhangi bir fonksiyonda return kullanmak, yalnızca o fonksiyondan çağıran yere geri dönülmesini sağlar. Açıkça return kullanmazsanız ve main() fonksiyonunun sonuna ulaşırsanız, sanki 0 veya EXIT_SUCCESS döndürmüşsünüz gibi davranılır. 28.1.2 exit() Bu fonksiyon da daha önce birkaç kez karşımıza çıktı. Programınızın herhangi bir yerinden exit() fonksiyonunu çağırırsanız, program tam o noktada sonlanır. exit() fonksiyonuna verdiğiniz argüman, çıkış durumudur (exit status). 28.1.3 atexit() ile Çıkış İşleyicileri (Exit Handlers) Tanımlamak İster main() fonksiyonundan dönerek ister exit() fonksiyonunu çağırarak olsun, program sonlandığında çağrılacak fonksiyonlar kaydedebilirsiniz. İşleyici (handler) fonksiyon adı ile atexit() çağrısı yapmak bu işi halleder. Birden fazla çıkış işleyicisi kaydedebilirsiniz; bunlar kayıt sırasının tersi sırayla çağrılırlar. İşte bir örnek: #include <stdio.h> #include <stdlib.h> void on_exit_1(void) { printf(\"Exit handler 1 called!\\n\"); } void on_exit_2(void) { printf(\"Exit handler 2 called!\\n\"); } int main(void) { atexit(on_exit_1); atexit(on_exit_2); printf(\"About to exit...\\n\"); } Ve çıktı şu şekildedir: About to exit... Exit handler"
  },
  {
    "file": "file-inputoutput.html",
    "title": "9 Dosya Girdi/Çıktısı (File Input/Output)",
    "headings": [
      {
        "id": "the-file-data-type",
        "title": "9.1 FILE* Veri Türü"
      },
      {
        "id": "reading-text-files",
        "title": "9.2 Metin Dosyalarını Okumak"
      },
      {
        "id": "end-of-file-eof",
        "title": "9.3 Dosya Sonu: EOF"
      },
      {
        "id": "reading-a-line-at-a-time",
        "title": "9.3.1 Her Seferinde Bir Satır Okumak"
      },
      {
        "id": "formatted-input",
        "title": "9.4 Biçimlendirilmiş Girdi (Formatted Input)"
      },
      {
        "id": "writing-text-files",
        "title": "9.5 Metin Dosyalarına Yazmak"
      },
      {
        "id": "binary-file-io",
        "title": "9.6 İkili Dosya G/Ç (Binary File I/O)"
      },
      {
        "id": "struct-and-number-caveats",
        "title": "9.6.1 struct ve Sayı Uyarıları (Caveats)"
      }
    ],
    "text": "Beej's Guide to C Programming 9 Dosya Girdi/Çıktısı (File Input/Output) Konsolda G/Ç (I/O) yapmak için printf() ile G/Ç'nin bazı örneklerini zaten gördük. Ancak bu bölümde bu kavramları biraz daha ileri taşıyacağız. 9.1 FILE* Veri Türü C'de herhangi bir G/Ç (I/O) işlemi yaptığımızda, bunu FILE* türü şeklinde elde ettiğiniz bir veri vasıtasıyla yaparız. Bu FILE*, hangi dosyanın açık olduğu, dosyada nerede olduğunuz ve benzeri konularda G/Ç alt sistemiyle iletişim kurmak için gereken tüm bilgileri tutar. Standart bunlara akışlar (streams) adını verir, yani bir dosyadan veya herhangi bir kaynaktan gelen veri akışı. \"Dosyalar\" ve \"akışlar\" terimlerini birbirinin yerine kullanacağım, ancak gerçekten bir \"dosyayı\" bir \"akışın\" özel bir durumu olarak düşünmelisiniz. Bir programa veri akışı sağlamanın yalnızca bir dosyadan okumaktan başka yolları da vardır. Bir dosya adına sahip olmaktan onun için açık bir FILE* elde etmeye nasıl geçileceğini birazdan göreceğiz, ancak önce sizin için zaten açık ve kullanıma hazır olan üç akıştan bahsetmek istiyorum. FILE* adı Açıklama stdin Standard Input (Standart Girdi), varsayılan olarak genellikle klavye stdout Standard Output (Standart Çıktı), varsayılan olarak genellikle ekran stderr Standard Error (Standart Hata), yine varsayılan olarak genellikle ekran Meğer bunları zaten zımnen (implicitly) kullanıyormuşuz. Örneğin, şu iki çağrı aynıdır: printf(\"Hello, world!\\n\"); fprintf(stdout, \"Hello, world!\\n\"); // bir dosyaya printf Ama bu konuda daha fazlası birazdan. Ayrıca hem stdout hem de stderr akışlarının ekrana gittiğini fark edeceksiniz. Bu ilk bakışta bir gözden kaçırma veya gereksiz bir tekrarlama gibi görünse de aslında öyle değildir. Tipik işletim sistemleri, bunlardan herhangi birinin çıktısını farklı dosyalara yönlendirmenize (redirect) izin verir ve hata mesajlarını normal hata olmayan çıktıdan ayırabilmek oldukça elverişlidir. Örneğin, Unix benzeri bir sistemdeki POSIX kabuğunda (sh, ksh, bash, zsh vb.) bir program çalıştırabilir ve yalnızca hata olmayan (stdout) çıktıyı bir dosyaya, tüm hata (stderr) çıktısını ise başka bir dosyaya gönderebiliriz. ./foo > output.txt 2> errors.txt # Bu komut Unix'e özeldir Bu nedenle, ciddi hata mesajlarını stdout yerine stderr akışına göndermelisiniz. Bunu nasıl yapacağınız hakkında daha fazlası birazdan. 9.2 Metin Dosyalarını Okumak Akışlar büyük ölçüde iki farklı şekilde sınıflandırılır: metin (text) ve ikili (binary). Metin akışlarının veriler üzerinde önemli dönüştürmeler yapmasına izin verilir, bunların en dikkat çekeni yeni satır karakterlerinin farklı temsil şekillerine dönüştürülmesidir76. Metin dosyaları mantıksal olarak yeni satırlarla ayrılmış bir satırlar (lines) dizisidir. Taşınabilir (portable) olması için girdi verileriniz her zaman bir yeni satır karakteri ile bitmelidir. Ancak genel kural şudur ki, dosyayı sıradan bir metin düzenleyicide düzenleyebiliyorsanız, o bir metin dosyasıdır. Aksi takdirde ikilidir. İkili dosyalar hakkında daha fazlası birazdan. Öy"
  },
  {
    "file": "fixed-width-integer-types.html",
    "title": "37 Sabit Genişlikli Tamsayı Türleri",
    "headings": [
      {
        "id": "the-bit-sized-types",
        "title": "37.1 Bit Boyutlu Türler"
      },
      {
        "id": "maximum-integer-size-type",
        "title": "37.2 Maksimum Tamsayı Boyutu Türü"
      },
      {
        "id": "using-fixed-size-constants",
        "title": "37.3 Sabit Boyutlu Sabitlerin Kullanımı"
      },
      {
        "id": "limits-of-fixed-size-integers",
        "title": "37.4 Sabit Boyutlu Tamsayıların Sınırları"
      },
      {
        "id": "format-specifiers",
        "title": "37.5 Format Belirteçleri"
      }
    ],
    "text": "Beej's Guide to C Programming 37 Sabit Genişlikli Tamsayı Türleri C, int ve long gibi küçük, daha büyük ve en büyük tamsayı türlerinin tümüne sahiptir. Ve INT_MAX ile en büyük int'in ne olduğunu görmek için sınırlar bölümüne bakabilirsiniz. Bu türler ne kadar büyüktür? Yani kaç bayt kaplarlar? Bu cevabı almak için sizeof kullanabiliriz. Peki ya diğer yoldan gitmek isteseydim? Ya tam olarak 32 bit (4 bayt) veya en az 16 bitlik ya da buna benzer bir türe ihtiyacım olsaydı? Belli bir boyutta olan bir türü nasıl bildirebiliriz? <stdint.h> başlık dosyası bize bir yol sunar. 37.1 Bit Boyutlu Türler Hem işaretli (signed) hem de işaretsiz (unsigned) tamsayılar için, elbette bazı uyarılara rağmen belirli sayıda bitten oluşan bir tür belirtebiliriz. Ve bu türlerin üç ana sınıfı vardır (bu örneklerde N yerine belirli bir bit sayısı gelecektir): Tam olarak belirli bir boyuttaki tamsayılar (intN_t) En az belirli bir boyuttaki tamsayılar (int_leastN_t) En az belirli bir boyutta olan ve mümkün olduğunca hızlı olan tamsayılar (int_fastN_t)189 fast ne kadar daha hızlıdır? Kesinlikle belki bir miktar daha hızlıdır. Muhtemelen. Spesifikasyon ne kadar hızlı olduğunu söylemez, sadece bu mimaride en hızlısı olacağını söyler. Çoğu C derleyicisi oldukça iyidir, bu nedenle bunu muhtemelen yalnızca mümkün olan en yüksek hızın garanti edilmesi gereken yerlerde görürsünüz (derleyicinin oldukça hızlı bir kod ürettiğini ummak yerine, ki zaten öyle yapar). Son olarak, bu işaretsiz sayı türleri, onları ayırt etmek için başında bir u harfine sahiptir. Örneğin, bu türler listelenen karşılık gelen anlamlara sahiptir: int32_t w; // w tam olarak 32 bittir, işaretli uint16_t x; // x tam olarak 16 bittir, işaretsiz int_least8_t y; // y en az 8 bittir, işaretli uint_fast64_t z; // z en az 64 bitlik en hızlı temsil şeklidir, işaretsiz Aşağıdaki türlerin tanımlanmış olması garanti edilir: int_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_t int_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_t uint_fast32_t int_fast64_t uint_fast64_t Farklı genişliklerde başkaları da olabilir, ancak bunlar isteğe bağlıdır. Hey! int16_t gibi sabit türler nerede? Görünüşe göre bunlar tamamen isteğe bağlıdır… belirli koşullar karşılanmadığı sürece190. Ve sıradan modern bir bilgisayar sistemine sahipseniz, bu koşullar muhtemelen karşılanıyordur. Ve eğer karşılanıyorsa, şu türlere sahip olursunuz: int8_t uint8_t int16_t uint16_t int32_t uint32_t int64_t uint64_t Farklı genişliklere sahip diğer varyantlar tanımlanabilir, ancak bunlar isteğe bağlıdır. 37.2 Maksimum Tamsayı Boyutu Türü Sistemde temsil edilebilen hem işaretli hem de işaretsiz en büyük tamsayıları tutan kullanabileceğiniz bir tür vardır: intmax_t uintmax_t Mümkün olduğunca büyük değerlerle çalışmak istediğinizde bu türleri kullanın. Aynı işarete sahip diğer tamsayı türlerinden gelen değerler, zorunlu olarak bu türe sığacaktır. 37.3 Sabit Boyutlu Sabitlerin Kullanımı Belirli sa"
  },
  {
    "file": "foreword.html",
    "title": "1 Önsöz",
    "headings": [
      {
        "id": "audience",
        "title": "1.1 Hedef Kitle"
      },
      {
        "id": "how-to-read-this-book",
        "title": "1.2 Bu Kitap Nasıl Okunmalı"
      },
      {
        "id": "platform-and-compiler",
        "title": "1.3 Platform ve Derleyici"
      },
      {
        "id": "official-homepage",
        "title": "1.4 Resmi Ana Sayfa"
      },
      {
        "id": "email-policy",
        "title": "1.5 E-posta Politikası"
      },
      {
        "id": "mirroring",
        "title": "1.6 Yansıtma (Mirroring)"
      },
      {
        "id": "note-for-translators",
        "title": "1.7 Çevirmenler İçin Not"
      },
      {
        "id": "copyright-and-distribution",
        "title": "1.8 Telif Hakkı ve Dağıtım"
      },
      {
        "id": "dedication",
        "title": "1.9 İthaf"
      }
    ],
    "text": "Beej's Guide to C Programming 1 Önsöz C büyük bir dil değildir ve büyük bir kitap tarafından iyi sunulamaz. –Brian W. Kernighan, Dennis M. Ritchie Sözü uzatmanın alemi yok arkadaşlar, doğrudan C koduna dalalım: E((ck?main((z?(stat(M,&t)?P+=a+'{'?0:3: execv(M,k),a=G,i=P,y=G&255, sprintf(Q,y/'@'-3?A(*L(V(%d+%d)+%d,0) Ve sonsuza kadar mutlu yaşadılar. Son. O da ne? Bu C programlama dili işiyle ilgili hâlâ netleşmeyen bir şeyler olduğunu mu söylüyorsunuz? Açıkçası yukarıdaki kodun tam olarak ne yaptığından ben bile emin değilim. Bu, katılımcıların yazılabilecek en okunmaz C kodunu yazmaya çalıştığı ve sıklıkla şaşırtıcı sonuçlar elde ettiği harika bir yarışma olan 2001 Uluslararası Anlaşılmaz C Kodu Yarışması’ndaki (International Obfuscated C Code Contest)1 girdilerden bir parçadır. Kötü haber şu ki, eğer bu işte yeniyseniz gördüğünüz tüm C kodları muhtemelen anlaşılmaz (obfuscated) görünüyordur! İyi haber ise bunun uzun sürmeyeceğidir. Bu rehber boyunca yapmaya çalışacağımız şey, sizi tam ve katıksız bir kafa karışıklığından alıp yalnızca saf C programlama yoluyla elde edilebilecek o aydınlanmış huzura ulaştırmaktır. Harika! Eski günlerde C daha basit bir dildi. Bu kitapta yer alan özelliklerin önemli bir kısmı ve Kütüphane Referansı cildindeki özelliklerin çoğu, K&R 1988'de ünlü kitaplarının ikinci baskısını yazdığında henüz yoktu. Yine de dil, özünde küçük kalmaya devam ediyor ve umarım bunu burada o basit özle başlayıp dışarıya doğru genişleyen bir şekilde sunabilmişimdir. Ve işte bu kadar küçük, öz bir dil için komik derecede devasa bir kitap yazmamın mazereti de budur. 1.1 Hedef Kitle Bu rehber, Python2, JavaScript3, Java4, Rust5, Go6, Swift7 vb. başka bir dilden halihazırda biraz programlama bilginiz olduğunu varsayar. (Objective-C8 geliştiricileri için bu süreç özellikle kolay olacaktır!) Değişkenlerin ne olduğunu, döngülerin ne işe yaradığını, fonksiyonların nasıl çalıştığını ve benzeri şeyleri bildiğinizi varsayacağız. Her ne sebepten olursa olsun bu tanıma uymuyorsanız, sağlayabileceğimi umduğum tek şey okuma keyfiniz için biraz samimi eğlencedir. Makul bir şekilde söz verebileceğim tek şey, bu rehberin ucu açık (cliffhanger) bir sonla bitmeyeceğidir... yoksa bitecek mi? 1.2 Bu Kitap Nasıl Okunmalı Rehber iki cilttendir ve bu ilk cilttir: ders (tutorial) cildi! İkinci cilt ise kütüphane referansıdır9 ve bir ders kitabından ziyade çok daha fazla referans niteliğindedir. Yeni başlayan biriyseniz, genel olarak ders bölümünü sırayla takip edin. Bölümlerde ilerledikçe sırayla gitmek o kadar da kritik olmayacaktır. Ve yetenek seviyeniz ne olursa olsun, referans bölümü, gerektiğinde hafızanızı tazelemeye yardımcı olmak için standart kütüphane fonksiyon çağrılarının eksiksiz örnekleriyle oradadır. Bir kase gevrek yerken ya da başka bir zamanda göz atmak için harikadır. Son olarak, dizine göz atarsanız (baskı versiyonunu okuyorsanız), referans bölümü girdilerinin eğik (italik) yazıldığını görürsünüz. 1.3 Platform ve Derleyici Sade, eski usul ISO st"
  },
  {
    "file": "function-specifiers-alignment-specifiersoperators.html",
    "title": "41 Fonksiyon Belirteçleri, Hizalama Belirteçleri/Operatörleri",
    "headings": [
      {
        "id": "function-specifiers",
        "title": "41.1 Fonksiyon Belirteçleri"
      },
      {
        "id": "inline-for-speedmaybe",
        "title": "41.1.1 Hız İçin inline—Belki"
      },
      {
        "id": "noreturn",
        "title": "41.1.2 noreturn ve _Noreturn"
      },
      {
        "id": "alignment-specifiers-and-operators",
        "title": "41.2 Hizalama Belirteçleri ve Operatörleri"
      },
      {
        "id": "alignas-and-_alignas",
        "title": "41.2.1 alignas ve _Alignas"
      },
      {
        "id": "alignof-and-_alignof",
        "title": "41.2.2 alignof ve _Alignof"
      },
      {
        "id": "memalignment-function",
        "title": "41.3 memalignment() Fonksiyonu"
      }
    ],
    "text": "Beej's Guide to C Programming 41 Fonksiyon Belirteçleri, Hizalama Belirteçleri/Operatörleri Deneyimlerime göre bunlar pek fazla kullanılmaz, ancak eksiksizlik olsun diye burada ele alacağız. 41.1 Fonksiyon Belirteçleri Bir fonksiyon tanımladığınızda, derleyiciye fonksiyonların nasıl kullanılabileceği veya kullanılacağı hakkında birkaç ipucu verebilirsiniz. Bu, derleyicinin belirli optimizasyonlar yapmasını sağlar veya teşvik eder. 41.1.1 Hız İçin inline—Belki Bir fonksiyonu şu şekilde inline (satır içi) olarak tanımlayabilirsiniz: static inline int add(int x, int y) { return x + y; } Bu, derleyiciyi bu fonksiyon çağrısını mümkün olduğunca hızlı yapmaya teşvik etmeyi amaçlar. Ve tarihsel olarak bunu yapmanın bir yolu inlining (satır içine alma) idi; yani fonksiyonun gövdesi, çağrının yapıldığı yere tamamen gömülürdü. Bu, fonksiyonun tekrar kullanılmak yerine her yere kopyalanması nedeniyle kod boyutunun büyümesi pahasına, fonksiyon çağrısını kurma ve kaldırma ek yükünün tamamını önlerdi. Hatırlanması gereken pratik ve kestirme noktalar şunlardır: Hız için inline kullanmanıza muhtemelen gerek yoktur. Modern derleyiciler neyin en iyisi olduğunu bilir. Hız için kullanıyorsanız, dosya kapsamında (file scope) kullanın, yani static inline. Bu, harici bağlama (external linkage) ve inline fonksiyonların karmaşık kurallarını önler. Bu bölümü okumayı şimdi bırakın. Eziyete meraklısınız, değil mi? static ifadesini çıkarmayı deneyelim. #include <stdio.h> inline int add(int x, int y) { return x + y; } int main(void) { printf(\"%d\\n\", add(1, 2)); } gcc, add() üzerinde bir bağlayıcı (linker) hatası verir232. Spesifikasyon, extern olmayan bir inline fonksiyonunuz varsa, harici bağlama (external linkage) sahip bir sürüm de sağlamanızı gerektirir. Bu yüzden bunun çalışması için başka bir yerde bir extern sürümüne sahip olmanız gerekir. Derleyici hem geçerli dosyada bir inline fonksiyona hem de başka bir yerde aynı fonksiyonun harici bir sürümüne sahipse, hangisini çağıracağını kendisi seçer. Bu yüzden bunların aynı olmasını şiddetle tavsiye ederim. Yapabileceğiniz başka bir şey de fonksiyonu extern inline olarak tanımlamaktır. Bu, aynı dosyada satır içine almaya çalışır (hız için), ancak harici bağlama sahip bir sürüm de oluşturur. 41.1.2 noreturn ve _Noreturn Bu, derleyiciye belirli bir fonksiyonun kendisini çağıran fonksiyona asla geri dönmeyeceğini, yani fonksiyon dönmeden önce programın bir mekanizmayla çıkış yapacağını belirtir. Derleyicinin fonksiyon çağrısı etrafında belki bazı optimizasyonlar yapmasına izin verir. Ayrıca diğer geliştiricilere, bazı program mantıklarının bir fonksiyonun geri dönmemesine bağlı olduğunu belirtmenizi sağlar. Bunu kullanmaya muhtemelen hiç ihtiyaç duymayacaksınız, ancak exit()233 ve abort()234 gibi bazı kütüphane çağrılarında göreceksiniz. Yerleşik anahtar kelime _Noreturn'dür, ancak mevcut kodunuzu bozmuyorsa herkes <stdnoreturn.h> başlık dosyasını dahil edip yerine daha kolay okunan noreturn kullanmanızı önerir. noreturn olarak"
  },
  {
    "file": "functions.html",
    "title": "4 Fonksiyonlar",
    "headings": [
      {
        "id": "passvalue",
        "title": "4.1 Değer ile Geçme (Passing by Value)"
      },
      {
        "id": "prototypes",
        "title": "4.2 Fonksiyon Prototipleri"
      },
      {
        "id": "empty-parameter-lists",
        "title": "4.3 Boş Parametre Listeleri"
      }
    ],
    "text": "Beej's Guide to C Programming 4 Fonksiyonlar “Efendim, böyle bir ortamda olmaz. Bu yüzden otuzdan fazla ikincil işlev için de programlandım ki—” —C3PO, kaba bir şekilde sözü kesilmeden önce, şimdi etkileyici görünmeyen sayıda ek fonksiyon bildirirken, Yıldız Savaşları (Star Wars) senaryosu Alışkın olduğunuz diğer dillere çok benzer şekilde, C de fonksiyonlar (functions) kavramına sahiptir. Fonksiyonlar çeşitli argümanları kabul edebilir ve bir değer döndürebilir. Ancak önemli bir şey var: argümanlar ve dönüş değeri türleri önceden bildirilmelidir—çünkü C bundan hoşlanır! Bir fonksiyona göz atalım. Bu, argüman olarak bir int alan ve bir int döndüren bir fonksiyondur. #include <stdio.h> int plus_one(int n) // \"Tanım\" { return n + 1; } plus_one kelimesinden önceki int, dönüş türünü gösterir. int n kısmı, bu fonksiyonun n parametresinde saklanan tek bir int argümanı aldığını gösterir. Parametre, argümanların içine kopyalandığı özel bir yerel değişken türüdür. Burada argümanların parametrelere kopyalandığı noktasına dikkat çekmek istiyorum. Parametrenin argümanın kendisi değil, argümanın bir kopyası olduğunu bilirseniz C'deki pek çok şeyi anlamak daha kolay olur. Bu konuda daha fazlası bir dakika içinde gelecek. Programı main() fonksiyonuna doğru sürdürürsek, dönüş değerini yerel değişken j'ye atadığımız fonksiyon çağrısını görebiliriz: int main(void) { int i = 10, j; j = plus_one(i); // \"Çağrı\" printf(\"i + 1 is %d\\n\", j); } Unutmadan önce, fonksiyonu kullanmadan önce tanımladığıma dikkat edin. Bunu yapmamış olsaydım, derleyici main() fonksiyonunu derlerken henüz bundan haberdar olmayacak ve bilinmeyen fonksiyon çağrısı hatası verecekti. Yukarıdaki kodu fonksiyon prototipleri ile yapmanın daha uygun bir yolu var, ancak bundan daha sonra bahsedeceğiz. Ayrıca main() fonksiyonunun da bir fonksiyon olduğuna dikkat edin! Bir int döndürür. Peki bu void olayı nedir? Bu, fonksiyonun hiçbir argüman kabul etmediğini belirtmek için kullanılan bir anahtar kelimedir. Bir değer döndürmediğinizi belirtmek için de void döndürebilirsiniz: #include <stdio.h> // Bu fonksiyon hiç argüman almaz ve hiçbir değer döndürmez: void hello(void) { printf(\"Hello, world!\\n\"); } int main(void) { hello(); // \"Hello, world!\" yazdırır } 4.1 Değer ile Geçme (Passing by Value) Daha önce bir fonksiyona bir argüman geçirdiğinizde, o argümanın bir kopyasının oluşturulup ilgili parametrede saklandığını belirtmiştim. Eğer argüman bir değişkense, o değişkenin değerinin bir kopyası oluşturulur ve parametrede saklanır. Daha genel olarak, tüm argüman ifadesi değerlendirilir ve değeri belirlenir. Bu değer parametreye kopyalanır. Her halükarda, parametredeki değer kendi başına bir şeydir. Fonksiyon çağrısını yaparken argüman olarak kullandığınız değerlerden veya değişkenlerden bağımsızdır. Şimdi burada bir örneğe bakalım. Çalıştırmadan önce çıktıyı belirleyip belirleyemeyeceğinizi görmek için inceleyin: #include <stdio.h> void increment(int a) { a++; } int main(void) { int i = 10; increment(i); pri"
  },
  {
    "file": "goto.html",
    "title": "31 goto",
    "headings": [
      {
        "id": "a-simple-example",
        "title": "31.1 Basit Bir Örnek"
      },
      {
        "id": "labeled-continue",
        "title": "31.2 Etiketli continue"
      },
      {
        "id": "bailing-out",
        "title": "31.3 Erken Çıkış Yapmak"
      },
      {
        "id": "labeled-break",
        "title": "31.4 Etiketli break"
      },
      {
        "id": "multi-level-cleanup",
        "title": "31.5 Çok Seviyeli Temizlik"
      },
      {
        "id": "tail-call-optimization",
        "title": "31.6 Kuyruk Çağrısı Optimizasyonu"
      },
      {
        "id": "restarting-interrupted-system-calls",
        "title": "31.7 Kesintiye Uğrayan Sistem Çağrılarını Yeniden Başlatma"
      },
      {
        "id": "goto-and-thread-preemption",
        "title": "31.8 goto ve İzlek Öncelikleme (Thread Preemption)"
      },
      {
        "id": "goto-and-variable-scope",
        "title": "31.9 goto ve Değişken Kapsamı"
      },
      {
        "id": "goto-and-variable-length-arrays",
        "title": "31.10 goto ve Değişken Uzunluklu Diziler"
      }
    ],
    "text": "Beej's Guide to C Programming 31 goto goto ifadesi evrensel olarak el üstünde tutulur ve burada tartışmasız bir şekilde sunulabilir. Şaka yapıyorum! Yıllar boyunca, goto kullanımının zararlı kabul edilip edilmeyeceği176 üzerine (çoğunlukla zararlı olduğu yönünde) çok fazla tartışma yapılmıştır. Bu programcının fikrine göre, bakımı kolaylık ve hızı göz önünde bulundurarak en iyi koda ulaştıran hangi yapıysa onu kullanmalısınız. Ve bazen bu yapı goto olabilir! Bu bölümde goto yapısının C'de nasıl çalıştığını göreceğiz ve ardından yaygın olarak kullanıldığı bazı durumlara göz atacağız177. 31.1 Basit Bir Örnek Bu örnekte, bir kod satırını atlamak ve bir etikete (label) atlamak için goto kullanacağız. Etiket, bir goto hedefi olabilen tanımlayıcıdır—sonunda iki nokta üst üste (:) bulunur. #include <stdio.h> int main(void) { printf(\"One\\n\"); printf(\"Two\\n\"); goto skip_3; printf(\"Three\\n\"); skip_3: printf(\"Five!\\n\"); } Çıktı şöyledir: One Two Five! goto, aradaki her şeyi atlayarak yürütmeyi belirtilen etikete atlatır. goto ile ileriye veya geriye atlayabilirsiniz. infinite_loop: print(\"Hello, world!\\n\"); goto infinite_loop; Etiketler yürütme sırasında atlanır. Aşağıdaki kod, sanki etiketler hiç yokmuş gibi üç sayıyı da sırayla yazdıracaktır: printf(\"Zero\\n\"); label_1: label_2: printf(\"One\\n\"); label_3: printf(\"Two\\n\"); label_4: printf(\"Three\\n\"); Fark ettiğiniz üzere, etiketleri en sola hizalamak yaygın bir kuraldır. Bu, okuyucunun hedefi bulmak için hızlıca göz gezdirmesini kolaylaştırarak okunabilirliği artırır. Etiketler fonksiyon kapsamına (function scope) sahiptir. Yani, blokların ne kadar derininde görünürlerse görünsünler, fonksiyondaki herhangi bir yerden onlara goto yapabilirsiniz. Bu aynı zamanda yalnızca goto ifadesiyle aynı fonksiyonda bulunan etiketlere goto yapabileceğiniz anlamına gelir. Başka fonksiyonlardaki etiketler goto açısından kapsam dışındadır. Ve aynı etiket adını iki farklı fonksiyonda kullanabileceğiniz—ancak aynı fonksiyonda aynı etiket adını kullanamayacağınız—anlamına gelir. 31.2 Etiketli continue Bazı dillerde, bir continue ifadesi için aslında bir etiket belirtebilirsiniz. C buna izin vermez, ancak bunun yerine goto ifadesini kolayca kullanabilirsiniz. Sorunu göstermek için, bu iç içe döngüdeki continue ifadesine göz atın: for (int i = 0; i < 3; i++) { for (int j = 0; j < 3; j++) { printf(\"%d, %d\\n\", i, j); continue; // Her zaman bir sonraki j'ye gider } } Gördüğümüz gibi, bu continue, tüm continue ifadeleri gibi en içteki kapsayan döngünün bir sonraki yinelemesine gider. Peki ya bir dıştaki döngüde, yani i döngüsünde continue yapmak istersek? Peki, dış döngüye geri dönmek için break kullanabiliriz, değil mi? for (int i = 0; i < 3; i++) { for (int j = 0; j < 3; j++) { printf(\"%d, %d\\n\", i, j); break; // Bizi i'nin bir sonraki yinelemesine ulaştırır } } Bu bize iki seviyeli iç içe döngü olanağı sağlar. Ancak bir döngü daha iç içe koyarsak, seçeneklerimiz tükenir. Bizi i'nin bir sonraki yinelemesine ulaştıracak hiçbir ifadem"
  },
  {
    "file": "hello-world.html",
    "title": "2 Hello, World!",
    "headings": [
      {
        "id": "what-to-expect-from-c",
        "title": "2.1 C'den Ne Beklemeli?"
      },
      {
        "id": "hello-world-1",
        "title": "2.2 Hello, World!"
      },
      {
        "id": "compilation-details",
        "title": "2.3 Derleme Detayları"
      },
      {
        "id": "building-with-gcc",
        "title": "2.4 gcc ile Derleme"
      },
      {
        "id": "building-with-clang",
        "title": "2.5 clang ile Derleme"
      },
      {
        "id": "building-from-ides",
        "title": "2.6 IDE'lerden Derleme"
      },
      {
        "id": "c-versions",
        "title": "2.7 C Sürümleri"
      }
    ],
    "text": "Beej's Guide to C Programming 2 Hello, World! 2.1 C'den Ne Beklemeli? “Bu merdivenler nereye gidiyor?” “Yukarı gidiyor.” —Ray Stantz ve Peter Venkman, Hayalet Avcıları (Ghostbusters) C düşük seviyeli (low-level) bir dildir. Eskiden öyle değildi. İnsanların granitten delikli kartlar yonttuğu o eski günlerde C, assembly19 gibi daha alt seviye dillerin angaryasından kurtulmak için inanılmaz bir yoldu. Ancak günümüzde modern nesil diller, C'nin icat edildiği 1972 yılında var olmayan her türlü özelliği sunuyor. Bu da C'nin pek fazla özelliği olmayan oldukça temel bir dil olduğu anlamına gelir. C her şeyi yapabilir, ancak bunun için sizi çalıştırabilir. Peki bugün neden C kullanalım ki? Bir öğrenme aracı olarak: C, yalnızca bilgisayar tarihinin saygın bir parçası olmakla kalmaz, aynı zamanda günümüz dillerinin olmadığı bir şekilde doğrudan donanıma (bare metal)20 bağlıdır. C öğrendiğinizde, yazılımın bilgisayar belleğiyle alt seviyede nasıl etkileşime girdiğini öğrenirsiniz. Emniyet kemeri yoktur. Çöken yazılımlar yazacaksınız, sizi temin ederim. Ve bunların hepsi eğlencenin bir parçası! Kullanışlı bir araç olarak: C, işletim sistemleri21 veya gömülü sistemler22 (embedded systems) inşa etmek gibi belirli uygulamalar için hâlâ kullanılmaktadır. (Her ne kadar Rust23 programlama dili bu iki alana da göz dikmiş olsa da!) Başka bir dile aşinaysanız, C ile ilgili pek çok şey kolay gelecektir. C birçok dile ilham vermiştir; Go, Rust, Swift, Python, JavaScript, Java ve her türlü diğer dilde C'den parçalar göreceksiniz. Bu kısımlar tanıdık gelecektir. C hakkında insanları takılan tek şey göstericilerdir (pointers). Neredeyse diğer her şey tanıdıktır, ancak pointer'lar garip olandır. Pointer'ların arkasındaki kavram muhtemelen zaten bildiğiniz bir kavramdır, ancak C sizi muhtemelen daha önce hiç görmediğiniz operatörleri kullanarak bu konuda açık (explicit) olmaya zorlar. Bu özellikle sinsidir çünkü pointer'ları bir kez kavradığınızda (grok)24, aniden kolaylaşırlar. Ancak o an gelene kadar kaygan yılan balıkları gibidirler. C'deki diğer her şey, zaten yaptığınız bir şeyi yapmanın başka bir yolunu (veya bazen aynı yolunu!) ezberlemekten ibarettir. Pointer'lar garip kısımdır. Ve muhtemelen aşina olduğunuz bir temanın çeşitlemeleridir. Assembly kullanmadan bilgisayarın çekirdeğine yaklaşabileceğiniz en büyük maceraya, tüm zamanların en etkili bilgisayar diline25 hazır olun. Sıkı tutunun! 2.2 Hello, World! Bu bir C programının standart (kanonik) örneğidir. Herkes bunu kullanır. (Soldaki sayıların yalnızca okuyucuya referans amaçlı olduğunu ve kaynak kodun bir parçası olmadığını unutmayın.) /* Hello world programı */ #include <stdio.h> int main(void) { printf(\"Hello, World!\\n\"); // Asıl işi burada yap } Uzun kollu, dayanıklı kauçuk eldivenlerimizi giyeceğiz, neşterimizi alacağız ve onu neyin çalıştırdığını görmek için içini açacağız. O halde yıkanıp hazırlanın, çünkü başlıyoruz. Çok nazikçe kesiyoruz… Kolay kısmı aradan çıkaralım: /* ve */ karakter dizilimleri arasın"
  },
  {
    "file": "incomplete-types.html",
    "title": "35 Eksik Türler (Incomplete Types)",
    "headings": [
      {
        "id": "use-case-self-referential-structures",
        "title": "35.1 Kullanım Durumu: Öz-Referanslı Yapılar"
      },
      {
        "id": "incomplete-type-error-messages",
        "title": "35.2 Eksik Tür Hata Mesajları"
      },
      {
        "id": "other-incomplete-types",
        "title": "35.3 Diğer Eksik Türler"
      },
      {
        "id": "use-case-arrays-in-header-files",
        "title": "35.4 Kullanım Durumu: Başlık Dosyalarındaki Diziler"
      },
      {
        "id": "completing-incomplete-types",
        "title": "35.5 Eksik Türleri Tamamlama"
      }
    ],
    "text": "Beej's Guide to C Programming 35 Eksik Türler (Incomplete Types) Bunun hatasız derlendiğini öğrenmek sizi şaşırtabilir: extern int a[]; int main(void) { struct foo *x; union bar *y; enum baz *z; } a dizisi için hiçbir zaman bir boyut vermedik. Ve hiçbir yerde bildirilmemiş gibi görünen foo, bar ve baz yapılarına göstericilerimiz var. Ve aldığım tek uyarı x, y ve z değişkenlerinin kullanılmadığı yönünde. Bunlar eksik türlerin (incomplete types) örnekleridir. Eksik tür, boyutu (yani sizeof ile elde edeceğiniz boyut) bilinmeyen bir türdür. Bunu düşünmenin başka bir yolu, bildirimini henüz tamamlamadığınız bir türdür. Eksik bir türe göstericiniz (pointer) olabilir, ancak onu dolaylı yoldan erişemezsiniz (dereference), üzerinde gösterici aritmetiği kullanamazsınız ve ona sizeof uygulayamazsınız. Peki onunla ne yapabilirsiniz? 35.1 Kullanım Durumu: Öz-Referanslı Yapılar Bildiğim tek gerçek kullanım durumu var: Öz-referanslı (self-referential) veya karşılıklı bağımlı yapılara sahip struct veya union yapılarına ileriye dönük referanslar (forward references). (Bu örneklerin geri kalanında struct kullanacağım, ancak bunların hepsi union için de aynı şekilde geçerlidir.) Önce klasik örneği yapalım. Ama bunu yapmadan önce şunu bilin! Bir struct bildirirken, struct kapanış süslü parantezine ulaşılana kadar eksiktir! struct antelope { // struct antelope burada eksiktir int leg_count; // Hâlâ eksik float stomach_fullness; // Hâlâ eksik float top_speed; // Hâlâ eksik char *nickname; // Hâlâ eksik }; // ŞİMDİ tamlandı. Ee yani? Yeterince mantıklı görünüyor. Peki ya bağlı bir liste (linked list) yapıyorsak? Her bağlı liste düğümünün başka bir düğüme referansı olması gerekir. Ancak düğümü henüz bildirmeyi bitirmediysek başka bir düğüme nasıl referans oluşturabiliriz? C'nin eksik türlere izin vermesi bunu mümkün kılar. Bir düğüm bildiremeyiz, ancak eksik olsa bile bir düğüme gösterici (pointer) bildirebiliriz! struct node { int val; struct node *next; // struct node eksiktir, ama bu sorun değil! }; struct node 3. satırda eksik olsa bile, yine de ona gösterici bildirebiliriz184. Birbirine referans veren iki farklı struct yapımız varsa aynı şeyi yapabiliriz: struct a { struct b *x; // Bir `struct b` yapısına referans verir }; struct b { struct a *x; // Bir `struct a` yapısına referans verir }; Eksik türler için esnetilmiş kurallar olmasaydı, bu yapı çiftini asla oluşturamazdık. 35.2 Eksik Tür Hata Mesajları Şunlar gibi hatalar alıyor musunuz? invalid application of ‘sizeof’ to incomplete type invalid use of undefined type dereferencing pointer to incomplete type Muhtemel suçlu: Türü bildiren başlık dosyasını (header file) #include etmeyi muhtemelen unuttunuz. 35.3 Diğer Eksik Türler Gövdesi olmayan bir struct veya union bildirmek eksik bir tür oluşturur, örn. struct foo;. enum türleri kapanış parantezine kadar eksiktir. void eksik bir türdür. Boyutsuz olarak extern bildirilen diziler eksiktir, örn.: extern int a[]; Boyutu olmayan ve ardından bir başlatıcı (initializer"
  },
  {
    "file": "locale-and-internationalization.html",
    "title": "26 Yerel Düzen (Locale) ve Uluslararasılaştırma",
    "headings": [
      {
        "id": "setting-the-localization-quick-and-dirty",
        "title": "26.1 Hızlı ve Pratik Yerelleştirme Ayarı"
      },
      {
        "id": "getting-the-monetary-locale-settings",
        "title": "26.2 Parasal Yerel Ayarları Alma"
      },
      {
        "id": "monetary-digit-grouping",
        "title": "26.2.1 Parasal Basamak Gruplaması"
      },
      {
        "id": "separators-and-sign-position",
        "title": "26.2.2 Ayırıcılar ve İşaret Konumu"
      },
      {
        "id": "example-values",
        "title": "26.2.3 Örnek Değerler"
      },
      {
        "id": "localization-specifics",
        "title": "26.3 Yerelleştirme Detayları"
      }
    ],
    "text": "Beej's Guide to C Programming 26 Yerel Düzen (Locale) ve Uluslararasılaştırma Yerelleştirme (Localization), uygulamanızı farklı yerel bölgelerde (veya ülkelerde) iyi çalışacak şekilde hazır hale getirme sürecidir. Bileceğiniz üzere, herkes ondalık noktaları veya binlik ayırıcıları… ya da para birimleri için aynı karakteri kullanmaz. Bu yerel ayarların (locales) isimleri vardır ve kullanmak için birini seçebilirsiniz. Örneğin, bir ABD yerel ayarı bir sayıyı şöyle yazabilir: 100,000.00 Brezilya'da ise aynı sayı virgüller ve ondalık noktaları yer değiştirmiş olarak yazılabilir: 100.000,00 Kodunuzu diğer uluslara kolayca taşınabilir kılacak şekilde yazmayı kolaylaştırır! Sayılır. Görünüşe göre C dilinde yalnızca bir adet yerleşik yerel ayar bulunur ve o da sınırlıdır. Standart spesifikasyonu burada gerçekten çok fazla belirsizlik bırakmaktadır; tamamen taşınabilir olmak zordur. Ama elimizden gelenin en iyisini yapacağız! 26.1 Hızlı ve Pratik Yerelleştirme Ayarı Bu çağrılar için <locale.h> başlık dosyasını dahil edin. Belirli bir yerel ayarı bildirmek açısından burada taşınabilir bir şekilde yapabileceğiniz temel olarak bir şey vardır. Yerel ayarla ilgili bir şey yapacaksanız muhtemelen yapmak istediğiniz şey şudur: setlocale(LC_ALL, \"\"); // Her şey için bu ortamın yerel ayarını kullan Programın mevcut yerel ayarınızla başlatılması için bunu çağırmak isteyeceksiniz. Daha fazla detaya girecek olursak, taşınabilir kalarak yapabileceğiniz bir şey daha var: setlocale(LC_ALL, \"C\"); // Varsayılan C yerel ayarını kullan ancak bu zaten programınız her başladığında varsayılan olarak çağrılır, bu yüzden kendiniz yapmanıza pek gerek yoktur. O ikinci metin dizisinde sisteminiz tarafından desteklenen herhangi bir yerel ayarı belirtebilirsiniz. Bu tamamen sisteme bağlıdır, dolayısıyla değişiklik gösterecektir. Benim sistemimde şunları belirtebilirim: setlocale(LC_ALL, \"en_US.UTF-8\"); // Taşınabilir değil! Ve bu çalışacaktır. Ancak yalnızca o aynı yerel ayar için tam olarak aynı ada sahip olan sistemlerde taşınabilirdir ve bunu garanti edemezsiniz. İkinci argüman için boş bir metin dizisi (\"\") geçerek C'ye şunu söylemiş olursunuz: \"Hey, bu sistemdeki mevcut yerel ayarın ne olduğunu kendin bul da ben sana söylemek zorunda kalmayayım.\" 26.2 Parasal Yerel Ayarları Alma Yeşil kağıt parçalarını etrafta dolaştırmak mutluluğun anahtarı olmayı vaat ettiği için156, parasal yerel ayarlardan bahsedelim. Taşınabilir kod yazarken, nakit para için ne yazacağınızı bilmeniz gerekir, değil mi? İster \"$\", ister \"€\", ister \"¥\", ister \"£\" olsun. Delirmeden bu kodu nasıl yazabilirsiniz? Şansımıza, bir kez setlocale(LC_ALL, \"\") çağırdığınızda, tek bir localeconv() çağrısıyla bunlara bakabilirsiniz: struct lconv *x = localeconv(); Bu fonksiyon, aradığınız tüm o harika bilgileri içeren statik olarak tahsis edilmiş bir struct lconv göstericisi (pointer) döndürür. İşte struct lconv alanları ve anlamları. Önce bazı adlandırma kuralları. Bir _p_ \"pozitif\" (positive) anlamına gelir, _n_ \"negati"
  },
  {
    "file": "manual-memory-allocation.html",
    "title": "12 Elle Bellek Tahsisi (Manual Memory Allocation)",
    "headings": [
      {
        "id": "allocating-and-deallocating-malloc-and-free",
        "title": "12.1 Tahsis Etme ve Serbest Bırakma: malloc() ve free()"
      },
      {
        "id": "error-checking",
        "title": "12.2 Hata Kontrolü"
      },
      {
        "id": "allocating-space-for-an-array",
        "title": "12.3 Bir Dizi İçin Alan Tahsis Etmek"
      },
      {
        "id": "an-alternative-calloc",
        "title": "12.4 Bir Alternatif: calloc()"
      },
      {
        "id": "changing-allocated-size-with-realloc",
        "title": "12.5 Tahsis Edilen Boyutu realloc() ile Değiştirmek"
      },
      {
        "id": "reading-in-lines-of-arbitrary-length",
        "title": "12.5.1 Rastgele Uzunluktaki Satırları Okumak"
      },
      {
        "id": "realloc-with-null",
        "title": "12.5.2 NULL ile realloc()"
      },
      {
        "id": "aligned-allocations",
        "title": "12.6 Hizalanmış Tahsisler (Aligned Allocations)"
      }
    ],
    "text": "Beej's Guide to C Programming 12 Elle Bellek Tahsisi (Manual Memory Allocation) C'nin bildiğiniz diğer dillerden muhtemelen ayrıldığı büyük alanlardan biri şudur: elle bellek yönetimi (manual memory management). Başka diller, bazı veriler için ne zaman yeni bellek tahsis edileceğini (allocate) ve hiçbir değişken onu referans göstermediğinde ne zaman serbest bırakılacağını (deallocate) belirlemek için referans sayma (reference counting), çöp toplama (garbage collection) veya başka yöntemler kullanır. Ve bu güzeldir. Bunun için endişelenmek zorunda kalmamak, bir öğeye olan tüm referansları bırakıp ilişkili belleğin bir noktada serbest bırakılacağına güvenmek güzeldir. Ancak C tamamen böyle değildir. Elbette C'de bazı değişkenler kapsama girdiklerinde ve kapsamdan çıktıklarında otomatik olarak tahsis edilir ve serbest bırakılır. Bunlara otomatik değişkenler deriz. Bunlar sıradan blok kapsamlı \"yerel\" (local) değişkenlerinizdir. Problem yok. Peki ya bir şeyin belirli bir bloktan daha uzun süre kalıcı olmasını istiyorsanız? İşte elle bellek yönetiminin devreye girdiği yer burasıdır. C'ye dilediğiniz gibi kullanabileceğiniz belirli sayıda baytı sizin için tahsis etmesini açıkça söyleyebilirsiniz. Ve siz o belleği açıkça serbest bırakana (free) kadar bu baytlar tahsis edilmiş olarak kalacaktır90. İşinizin bittiği belleği serbest bırakmak önemlidir! Yapmazsanız buna bellek sızıntısı (memory leak) deriz ve süreciniz (process) çıkana kadar o belleği rezerve etmeye devam eder. Elle tahsis ettiyseniz, işiniz bittiğinde elle serbest bırakmanız gerekir. Peki bunu nasıl yapacağız? Birkaç yeni fonksiyon öğreneceğiz ve kaç bayt tahsis edeceğimizi öğrenmemize yardımcı olması için sizeof operatöründen yararlanacağız. Yaygın C jargonunda geliştiriciler, otomatik yerel değişkenlerin \"yığında (stack)\" ve elle tahsis edilen belleğin \"kümede/öbekte (heap)\" tahsis edildiğini söyler. Standart bu iki şeyden de bahsetmez, ancak konuyu açarsanız tüm C geliştiricileri neyden bahsettiğinizi anlayacaktır. Bu bölümde öğreneceğimiz tüm fonksiyonlar <stdlib.h> içinde bulunabilir. 12.1 Tahsis Etme ve Serbest Bırakma: malloc() ve free() malloc() fonksiyonu tahsis edilecek bayt sayısını kabul eder ve yeni tahsis edilen bellek bloğuna bir void pointer döndürür. Bir void* olduğu için onu istediğiniz pointer türüne atayabilirsiniz… normalde bu, tahsis ettiğiniz bayt sayısına bir şekilde karşılık gelecektir. Peki… kaç bayt tahsis etmeliyim? Buna yardımcı olması için sizeof kullanabiliriz. Tek bir int için yeterli alan tahsis etmek istiyorsak sizeof(int) kullanabilir ve bunu malloc()'a geçirebiliriz. Tahsis edilen bir bellekle işimiz bittiğinde, o bellekle işimizin bittiğini ve başka bir şey için kullanılabileceğini belirtmek için free() fonksiyonunu çağırabiliriz. Argüman olarak malloc()'tan aldığınız aynı pointer'ı (veya bir kopyasını) geçirirsiniz. Bir bellek bölgesini free() ettikten sonra kullanmak tanımsız davranıştır (undefined behavior). Hadi deneyelim. Bir int için yeterli bellek"
  },
  {
    "file": "multifile-projects.html",
    "title": "17 Çok Dosyalı Projeler",
    "headings": [
      {
        "id": "includes-func-protos",
        "title": "17.1 Dahil Etmeler ve Fonksiyon Prototipleri"
      },
      {
        "id": "dealing-with-repeated-includes",
        "title": "17.2 Tekrarlanan Dahil Etmelerle Başa Çıkmak"
      },
      {
        "id": "static-and-extern",
        "title": "17.3 static ve extern"
      },
      {
        "id": "compiling-with-object-files",
        "title": "17.4 Nesne Dosyaları ile Derleme"
      }
    ],
    "text": "Beej's C Programlama Rehberi 17 Çok Dosyalı Projeler Şimdiye kadar çoğunlukla tek bir dosyaya sığan oyuncak programlara baktık. Ancak karmaşık C programları, hepsi derlenip tek bir yürütülebilir dosyada bağlanan (link edilen) birçok dosyadan oluşur. Bu bölümde, daha büyük projeleri bir araya getirmek için kullanılan bazı yaygın kalıplara ve uygulamalara göz atacağız. 17.1 Dahil Etmeler ve Fonksiyon Prototipleri Çok yaygın bir durum, bazı fonksiyonlarınızın bir dosyada tanımlanmış olması ve bunları başka bir dosyadan çağırmak istemenizdir. Bu aslında kutudan çıktığı haliyle bir uyarı ile çalışır... Önce bunu deneyelim, ardından uyarıyı düzeltmenin doğru yoluna bakalım. Bunları derlemek için komut satırında tüm kaynak dosyalarını belirtmeniz gerekir: # çıktı dosyası kaynak dosyaları # v v # |----| |---------| gcc -o foo foo.c bar.c Bu örnekte foo.c ve bar.c, foo adındaki yürütülebilir dosyada derlenir. Bu örnekler için dosya adını kaynağın ilk yorum satırı olarak koyacağız. bar.c kaynak dosyasına bir göz atalım: // Dosya bar.c int add(int x, int y) { return x + y; } Ve içinde main bulunan foo.c dosyası: // Dosya foo.c #include <stdio.h> int main(void) { printf(\"%d\\n\", add(2, 3)); // 5! } main() içinden add() fonksiyonunu nasıl çağırdığımıza bakın — ancak add() tamamen farklı bir kaynak dosyadadır! Çağrı foo.c içindeyken o bar.c içindedir! Bunu şununla derlersek: gcc -o foo foo.c bar.c şu hatayı alırız: error: implicit declaration of function 'add' is invalid in C99 (Veya bir uyarı alabilirsiniz. Ki bunu göz ardı etmemelisiniz. C dilinde uyarıları asla göz ardı etmeyin; hepsini çözün.) Prototipler hakkındaki bölümden hatırlayacağınız üzere, örtük bildirimler (implicit declarations) modern C dilinde yasaklanmıştır ve bunları yeni koda dahil etmek için hiçbir geçerli neden yoktur. Düzeltmeliyiz. implicit declaration (örtük bildirim) ifadesinin anlamı, bu durumda add() fonksiyonunu, C diline önceden onun hakkında hiçbir şey bildirmeden kullanıyor olmamızdır. C ne döndürdüğünü, argüman olarak ne türler aldığını ve buna benzer şeyleri bilmek ister. Bunu bir fonksiyon prototipi ile nasıl düzelteceğimizi daha önce görmüştük. Gerçekten de çağrıyı yapmadan önce foo.c dosyasına bunlardan birini eklersek her şey yolunda gider: // Dosya foo.c #include <stdio.h> int add(int, int); // Prototipi ekleyin int main(void) { printf(\"%d\\n\", add(2, 3)); // 5! } Artık hata yok! Ama bir fonksiyonu her kullanmak istediğinizde prototipini yazmak zorunda kalmak sıkıcıdır. Yani orada printf() kullandık ve bir prototip yazmamıza gerek kalmadı; bu nasıl oluyor? Aslında printf() için prototipi dahil ettik! O stdio.h dosyasının içinde! Ve biz onu #include ile dahil ettik! Kendi add() fonksiyonumuz için de aynı şeyi yapabilir miyiz? Onun için bir prototip oluşturup bir başlık dosyasına (header file) koyabilir miyiz? Elbette! C dilindeki başlık dosyaları geleneksel olarak .h uzantısına sahiptir. Ve sıklıkla, ama her zaman değil, karşılık gelen .c dosyasıyla aynı adı taşırlar. Bu yüz"
  },
  {
    "file": "multithreading.html",
    "title": "39 Çoklu İzlek (Multithreading)",
    "headings": [
      {
        "id": "background",
        "title": "39.1 Arka Plan"
      },
      {
        "id": "things-you-can-do",
        "title": "39.2 Yapabileceğiniz Şeyler"
      },
      {
        "id": "data-races-and-the-standard-library",
        "title": "39.3 Veri Yarışları (Data Races) ve Standart Kütüphane"
      },
      {
        "id": "creating-and-waiting-for-threads",
        "title": "39.4 Thread Oluşturma ve Bekleme"
      },
      {
        "id": "detaching-threads",
        "title": "39.5 Thread'leri Ayırmak (Detaching Threads)"
      },
      {
        "id": "thread-local-data",
        "title": "39.6 İzleğe Özel Veri (Thread Local Data)"
      },
      {
        "id": "thread-local",
        "title": "39.6.1 _Thread_local Depolama Sınıfı"
      },
      {
        "id": "another-option-thread-specific-storage",
        "title": "39.6.2 Başka Bir Seçenek: İzleğe Özel Depolama (Thread-Specific Storage)"
      },
      {
        "id": "mutex",
        "title": "39.7 Mutex'ler"
      },
      {
        "id": "different-mutex-types",
        "title": "39.7.1 Farklı Mutex Türleri"
      },
      {
        "id": "condition-variables",
        "title": "39.8 Koşul Değişkenleri (Condition Variables)"
      },
      {
        "id": "timed-condition-wait",
        "title": "39.8.1 Zaman Ayarlı Koşul Beklemesi (Timed Condition Wait)"
      },
      {
        "id": "broadcast-wake-up-all-waiting-threads",
        "title": "39.8.2 Yayın (Broadcast): Bekleyen Tüm Thread'leri Uyandırın"
      },
      {
        "id": "running-a-function-one-time",
        "title": "39.9 Bir Fonksiyonu Bir Kez Çalıştırmak"
      }
    ],
    "text": "Beej's Guide to C Programming 39 Çoklu İzlek (Multithreading) C11, C diline resmi olarak çoklu izlek (multithreading) desteğini getirdi. Daha önce kullandıysanız, POSIX threads yapısına ürpertici derecede benzerdir197. Kullanmadıysanız da endişelenmeyin. Üzerinde ayrıntılı olarak konuşacağız. Yine de belirtmek isterim ki bunun tam kapsamlı bir klasik multithreading rehberi olmasını amaçlamıyorum198; bunun için özellikle başka bir çok kalın kitap edinmeniz gerekecektir. Üzgünüm! İzlekler (threading) isteğe bağlı bir özelliktir. Bir C11+ derleyicisi __STDC_NO_THREADS__ tanımlıyorsa, kütüphanede izlekler (threads) bulunmayacaktır. O makroda neden olumsuz bir anlam kullanmaya karar verdiler akıl sır erdiremiyorum, ama durum bu. Bunu şu şekilde test edebilirsiniz: #ifdef __STDC_NO_THREADS__ #error Bu programı derlemek için izleklere (threads) ihtiyacım var! #endif Ayrıca derlerken belirli bağlayıcı (linker) seçeneklerini belirtmeniz gerekebilir. Unix benzeri sistemlerde pthreads kütüphanesini bağlamak için komut satırının sonuna -lpthreads eklemeyi deneyin199: gcc -std=c11 -o foo foo.c -lpthreads Sisteminizde bağlayıcı hataları alıyorsanız, bunun nedeni uygun kütüphanenin dahil edilmemiş olması olabilir. 39.1 Arka Plan Thread'ler, parasını ödediğiniz tüm o gıcır gıcır CPU çekirdeklerinin aynı program içinde sizin için çalışmasını sağlamanın bir yoludur. Normalde bir C programı sadece tek bir CPU çekirdeğinde çalışır. Ancak işi nasıl böleceğinizi biliyorsanız, parçalarını bir dizi thread'e verebilir ve bunların işi eş zamanlı olarak yapmasını sağlayabilirsiniz. Spesifikasyon bunu söylemese de sisteminizde C'nin (veya emri üzerine işletim sisteminin) thread'leri tüm CPU çekirdeklerinize dengelemeye çalışması çok muhtemeldir. Ve çekirdeklerinizden daha fazla thread'iniz varsa, bu sorun değil. Hepsi CPU süresi için rekabet etmeye çalışıyorsa tüm o kazançları elde edemezsiniz. 39.2 Yapabileceğiniz Şeyler Bir thread oluşturabilirsiniz. Belirttiğiniz fonksiyonu çalıştırmaya başlayacaktır. Onu başlatan parent (üst) thread de çalışmaya devam edecektir. Ve thread'in tamamlanmasını bekleyebilirsiniz. Buna katılma/bekleme (joining) denir. Veya thread'in ne zaman tamamlandığını umursamıyorsanız ve beklemek istemiyorsanız, onu ayırabilirsiniz (detach). Bir thread açıkça çıkış yapabilir (exit) veya ana fonksiyonundan dönerek zımnen sonlanabilir. Bir thread ayrıca diğer thread'ler çalışırken hiçbir şey yapmadan belirli bir süre uyuyabilir (sleep). main() programı da bir thread'dir. Ayrıca izleğe özel depolama (thread local storage), mutex'ler ve koşul değişkenlerimiz (condition variables) vardır. Ancak bunlara daha sonra değineceğiz. Şimdilik sadece temel bilgilere bakalım. 39.3 Veri Yarışları (Data Races) ve Standart Kütüphane Standart kütüphanedeki bazı fonksiyonlar (örn. asctime() ve strtok()) izlek güvenli (thread-safe) olmayan static veri elemanları döndürür veya kullanır. Ancak genel olarak aksi belirtilmedikçe standart kütüphane izlek güvenli olmaya çaba göste"
  },
  {
    "file": "pointers-iii-pointers-to-pointers-and-more.html",
    "title": "23 Pointer'lar III: Pointer'lara Pointer'lar ve Daha Fazlası",
    "headings": [
      {
        "id": "pointers-to-pointers",
        "title": "23.1 Pointer'lara Pointer'lar"
      },
      {
        "id": "pointer-pointers-and-const",
        "title": "23.1.1 Pointer Pointer'lar ve const"
      },
      {
        "id": "multibyte-values",
        "title": "23.2 Çoklu Bayt Değerler"
      },
      {
        "id": "the-null-pointer-and-zero",
        "title": "23.3 NULL Pointer ve Sıfır"
      },
      {
        "id": "pointers-as-integers",
        "title": "23.4 Tam Sayı Olarak Pointer'lar"
      },
      {
        "id": "casting-pointers-to-other-pointers",
        "title": "23.5 Pointer'ları Başka Pointer'lara Dönüştürmek (Cast)"
      },
      {
        "id": "ptr_differences",
        "title": "23.6 Pointer Farkları"
      },
      {
        "id": "pointers-to-functions",
        "title": "23.7 Fonksiyon Pointer'ları"
      }
    ],
    "text": "Beej's Guide to C Programming 23 Pointer'lar III: Pointer'lara Pointer'lar ve Daha Fazlası Burada bazı orta ve ileri düzey pointer kullanımlarını ele alıyoruz. Pointer konusunu henüz tam kavrayamadıysanız, bu konulara başlamadan önce pointer'lar ve pointer aritmetiği hakkındaki önceki bölümleri gözden geçirin. 23.1 Pointer'lara Pointer'lar Bir değişkene işaret eden bir pointer'ınız olabiliyorsa ve bir değişken de bir pointer olabiliyorsa, kendisi de bir pointer olan bir değişkene işaret eden bir pointer'ınız olabilir mi? Evet! Bu bir pointer'a işaret eden pointer'dır (pointer-to-pointer) ve pointer-pointer türündeki bir değişkende tutulur. Buna daldırmadan önce, pointer'lara pointer'ların nasıl çalıştığına dair sezgisel bir his edinmenizi istiyorum. Bir pointer'ın sadece bir sayı olduğunu unutmayın. Bilgisayar belleğindeki bir indeksi temsil eden bir sayıdır; genellikle bir nedenden ötürü ilgilendiğimiz bir değeri tutan bir adrestir. Bir sayı olan o pointer'ın bir yerde saklanması gerekir. Ve o yer, diğer her şey gibi bellektir141. Fakat bellekte saklandığı için, saklandığı bir indeks de olmalı, değil mi? Pointer'ın saklandığı bellekte bir indeksi olmalıdır. Ve bu indeks bir sayıdır. O, pointer'ın adresidir. Yani pointer'a işaret eden bir pointer'dır. Önceki bölümlere dönüp bir int değişkenine işaret eden normal bir pointer ile başlayalım: #include <stdio.h> int main(void) { int x = 3490; // Tür: int int *p = &x; // Tür: int'e pointer printf(\"%d\\n\", *p); // 3490 } Yeterince açık, değil mi? Temsil edilen iki türümüz var: int ve int*; ve p'yi x'i gösterecek şekilde ayarlıyoruz. Ardından 8. satırda p'nin değerini alabilir (dereference) ve 3490 değerini yazdırabiliriz. Ancak söylediğimiz gibi, herhangi bir değişkene işaret eden bir pointer'ımız olabilir… yani bu p'ye işaret eden bir pointer'ımız olabileceği anlamına mı gelir? Başka bir deyişle, bu ifadenin türü nedir? int x = 3490; // Tür: int int *p = &x; // Tür: int'e pointer &p // <-- p'nin adresi hangi türdedir? Yani p'ye işaret eden bir pointer? Eğer x bir int ise, &x bir int pointer'ıdır ve bunu int* türündeki p içinde sakladık. Anlaşıldı mı? (Anlayana kadar bu paragrafı tekrar okuyun!) Ve bu nedenle &p, bir int* pointer'ına işaret eder; yani \"bir int pointer'ına işaret eden pointer\". Yani \"int-pointer-pointer\". Kavradınız mı? (Kavrayana kadar önceki paragrafı tekrarlayın!) Bu türü iki yıldız işaretiyle yazarız: int **. Şimdi bunu eylem halinde görelim. #include <stdio.h> int main(void) { int x = 3490; // Tür: int int *p = &x; // Tür: int'e pointer int **q = &p; // Tür: int'e pointer'a pointer printf(\"%d %d\\n\", *p, **q); // 3490 3490 } Örnek olarak yukarıdaki değerler için uydurma bazı adresler oluşturalım ve bu üç değişkenin bellekte nasıl görünebileceğine bakalım. Aşağıdaki adres değerleri yalnızca örnek amacıyla tarafımdan uydurulmuştur: Değişken Saklandığı Adres Orada Saklanan Değer x 28350 3490—koddan gelen değer p 29122 28350—x'in adresi! q 30840 29122—p'nin adresi! Nitekim, bunu bilgisay"
  },
  {
    "file": "pointers.html",
    "title": "5 Göstericiler (Pointers)—Korkudan Büzüşün!",
    "headings": [
      {
        "id": "ptmem",
        "title": "5.1 Bellek ve Değişkenler"
      },
      {
        "id": "pttypes",
        "title": "5.2 Gösterici Türleri (Pointer Types)"
      },
      {
        "id": "deref",
        "title": "5.3 Dereferencing (Değere Erişme / Adresten Okuma)"
      },
      {
        "id": "ptpass",
        "title": "5.4 Göstericileri (Pointers) Argüman Olarak Geçirmek"
      },
      {
        "id": "the-null-pointer",
        "title": "5.5 Boş Gösterici (The NULL Pointer)"
      },
      {
        "id": "a-note-on-declaring-pointers",
        "title": "5.6 Göstericileri Bildirmek Üzerine Bir Not"
      },
      {
        "id": "sizeof-and-pointers",
        "title": "5.7 sizeof ve Göstericiler (Pointers)"
      }
    ],
    "text": "Beej's Guide to C Programming 5 Göstericiler (Pointers)—Korkudan Büzüşün! “Carnegie Hall'a nasıl gidilir?” “Pratik yaparak!” —Kökeni bilinmeyen 20. yüzyıl esprisi Göstericiler (pointers), C dilindeki en korkulan şeylerden biridir. Aslında bu dili zorlu kılan tek şey onlardır. Ama neden? Çünkü dürüst olmak gerekirse, klavyeden elektrik çarpmasına neden olup kollarınızı fiziksel olarak kalıcı olarak yerine kaynatabilir ve sizi 70'lerden kalma bu dilde klavye başında bir hayata mahkum edebilirler! Gerçekten mi? Şey, pek sayılmaz. Sadece sizi başarıya hazırlamaya çalışıyorum. Geldiğiniz dile bağlı olarak, bir değişkenin bir türdeki bir nesneye atıfta bulunduğu referanslar kavramını zaten anlıyor olabilirsiniz. Bu da neredeyse aynıdır, tek fark ne zaman referanstan ne zaman referans gösterdiği şeyden bahsettiğimiz konusunda C ile daha açık (explicit) olmamız gerektiğidir. 5.1 Bellek ve Değişkenler Bilgisayar belleği her türlü veriyi tutar, değil mi? float'ları, int'leri veya elinizde ne varsa tutar. Belleğin üstesinden gelmeyi kolaylaştırmak için, belleğin her bir baytı bir tam sayı ile tanımlanır. Bu tam sayılar siz bellekte yukarı doğru ilerledikçe sırayla artar45. Bunu her bir kutunun bir bayt46 veri tuttuğu numaralandırılmış kutular dizisi olarak düşünebilirsiniz. Veya dizileri (arrays) olan bir dilden geliyorsanız, her bir elemanın bir bayt tuttuğu büyük bir dizi gibi. Her bir kutuyu temsil eden sayıya o kutunun adresi denir. Şimdi, tüm veri türleri yalnızca tek bir bayt kullanmaz. Örneğin bir int sıklıkla dört bayttır, tıpkı bir float gibi, ancak bu gerçekten sisteme bağlıdır. Belirli bir türün kaç bayt bellek kullandığını belirlemek için sizeof operatörünü kullanabilirsiniz. // %zu, size_t türü için format belirtecidir printf(\"an int uses %zu bytes of memory\\n\", sizeof(int)); // Bu benim için \"4\" yazdırır, ancak sisteme göre değişebilir. Bellek Eğlenceli Bilgileri: Tek bir bayttan daha fazla bellek kullanan bir veri türünüz (tipik int gibi) olduğunda, veriyi oluşturan baytlar bellekte her zaman birbirine komşudur. Bazen beklediğiniz sıradadırlar, bazen ise değildirler47. C belirli bir bellek sırası garanti etmese de (platforma bağlıdır), yine de bu can sıkıcı bayt sıralamalarını düşünmek zorunda kalmayacağınız platformdan bağımsız bir şekilde kod yazmak genel olarak mümkündür. Her neyse, davul zurnayı çalabilir ve bir göstericinin (pointer) tanımı için o kasvetli müziği başlatabilirsek, gösterici (pointer) bir adres tutan değişkendir. Bu noktada 2001: A Space Odyssey filmindeki klasik müziği hayal edin. Da dum da dum da dum DAAA! Tamam, belki burada biraz abartmış olabilirim, değil mi? Pointer'lar hakkında o kadar da büyük bir gizem yok. Onlar verinin adresidir. Tıpkı bir int değişkeninin 12 değerini tutabilmesi gibi, bir pointer değişkeni de verinin adresini tutabilir. Bu, tüm bu şeylerin aynı anlama geldiği anlamına gelir, yani bellekteki bir noktayı temsil eden bir sayı: Bellek indeksi (belleği büyük bir dizi gibi düşünüyorsanız) Adres Konum"
  },
  {
    "file": "pointers2.html",
    "title": "11 Pointer'lar II: Aritmetik",
    "headings": [
      {
        "id": "pointer-arithmetic",
        "title": "11.1 Pointer Aritmetiği"
      },
      {
        "id": "adding-to-pointers",
        "title": "11.1.1 Pointer'lara Ekleme Yapmak"
      },
      {
        "id": "changing-pointers",
        "title": "11.1.2 Pointer'ları Değiştirmek"
      },
      {
        "id": "subtracting-pointers",
        "title": "11.1.3 Pointer Çıkarma"
      },
      {
        "id": "arraypointerequiv",
        "title": "11.2 Dizi/Pointer Eşdeğerliği"
      },
      {
        "id": "arraypointer-equivalence-in-function-calls",
        "title": "11.2.1 Fonksiyon Çağrılarında Dizi/Pointer Eşdeğerliği"
      },
      {
        "id": "void-pointers",
        "title": "11.3 void Pointer'ları"
      }
    ],
    "text": "Beej's Guide to C Programming 11 Pointer'lar II: Aritmetik Yeni pointer konularıyla konunun daha da derinlerine inme zamanı! Eğer pointer'lar konusunda henüz tam değilseniz, rehberin bu konudaki ilk bölümüne göz atın. 11.1 Pointer Aritmetiği Meğer pointer'lar üzerinde matematik yapabiliyormuşuz; özellikle de toplama ve çıkarma. Peki bunu yaptığınızda bu ne anlama gelir? Kısacası, bir türe pointer'ınız varsa, pointer'a bir eklemek bellekte hemen ardından gelen bir sonraki aynı türden elemana geçmenizi sağlar. Pointer'ları hareket ettirip bellekteki farklı yerlere bakarken, dereference etmeden (gösterdiği değere erişmeden) önce her zaman geçerli bir bellek konumunu gösterdiğimizden emin olmamız gerektiğini hatırlamak önemlidir. Eğer sınırı aşıp yoldan saparsak ve orada ne olduğuna bakmaya çalışırsak, davranış tanımsızdır (undefined behavior) ve genellikle programın çökmesiyle sonuçlanır. Bu durum aşağıdaki Dizi/Pointer Eşdeğerliği konusuyla biraz yumurta-tavuk ikilemi gibidir, ama yine de bir şans vereceğiz. 11.1.1 Pointer'lara Ekleme Yapmak İlk olarak bir sayı dizisi ele alalım. int a[5] = {11, 22, 33, 44, 55}; Ardından bu dizinin ilk elemanını gösteren bir pointer alalım: int a[5] = {11, 22, 33, 44, 55}; int *p = &a[0]; // Veya \"int *p = a;\" da aynı şekilde çalışır Şimdi pointer'ı dereference ederek oradaki değeri yazdıralım: printf(\"%d\\n\", *p); // 11 yazdırır Şimdi dizideki bir sonraki elemanı, yani 1 indeksindeki elemanı yazdırmak için pointer aritmetiğini kullanalım: printf(\"%d\\n\", *(p + 1)); // 22 yazdırır!! Orada ne oldu? C, p'nin bir int pointer'ı olduğunu bilir. Dolayısıyla bir int türünün sizeof değerini bilir84 ve ilk int'ten sonraki bir sonraki int'e ulaşmak için kaç bayt atlaması gerektiğini bilir! Hatta önceki örnek şu iki eşdeğer şekilde yazılabilirdi: printf(\"%d\\n\", *p); // 11 yazdırır printf(\"%d\\n\", *(p + 0)); // 11 yazdırır çünkü bir pointer'a 0 eklemek yine aynı pointer'ı verir. Buradaki asıl kazancı düşünelim. Dizi indeksleri kullanmak yerine bu şekilde bir dizinin elemanları üzerinde gezinebiliriz (iterate edebiliriz): int a[5] = {11, 22, 33, 44, 55}; int *p = &a[0]; // Veya \"int *p = a;\" da aynı şekilde çalışır for (int i = 0; i < 5; i++) { printf(\"%d\\n\", *(p + i)); // p[i] ile aynı! } Ve bu, dizi notasyonunu kullanmışız gibi aynı şekilde çalışır! Oooo! Şu dizi/pointer eşdeğerliği mevzusuna giderek yaklaşıyoruz! Bu bölümde ilerleyen kısımlarda bununla ilgili daha fazlasını göreceğiz. Peki burada gerçekte ne oluyor? Nasıl çalışıyor? Erken konularımızdan hatırlayın: bellek, her dizi indeksinde bir baytın saklandığı büyük bir dizi gibidir. Ve bellekteki bu dizi indeksinin birkaç farklı adı vardır: Bellek indeksi Konum (Location) Adres Pointer! (Gösterici) Yani bir pointer, bellekteki herhangi bir yerin indeksidir. Rastgele bir örnek vermek gerekirse, diyelim ki 3490 sayısı 23.237.489.202 adresinde (\"indeksinde\") saklanıyor. O 3490 sayısını gösteren bir int pointer'ımız varsa, o pointer'ın değeri 23.237.489.202'dir... çünkü pointe"
  },
  {
    "file": "scope.html",
    "title": "13 Kapsam (Scope)",
    "headings": [
      {
        "id": "block-scope",
        "title": "13.1 Blok Kapsamı (Block Scope)"
      },
      {
        "id": "where-to-define-variables",
        "title": "13.1.1 Değişkenler Nerede Tanımlanmalı"
      },
      {
        "id": "variable-hiding",
        "title": "13.1.2 Değişken Gizleme (Variable Hiding)"
      },
      {
        "id": "file-scope",
        "title": "13.2 Dosya Kapsamı (File Scope)"
      },
      {
        "id": "for-loop-scope",
        "title": "13.3 for Döngüsü Kapsamı"
      },
      {
        "id": "a-note-on-function-scope",
        "title": "13.4 Fonksiyon Kapsamı Üzerine Bir Not"
      }
    ],
    "text": "Beej's Guide to C Programming 13 Kapsam (Scope) Kapsam (Scope), hangi değişkenlerin hangi bağlamlarda görünür olduğunu konu alır. 13.1 Blok Kapsamı (Block Scope) Bu, geliştiricilerin tanımladığı hemen hemen tüm değişkenlerin kapsamıdır. Başka dillerin \"fonksiyon kapsamı\" (function scope) dediği şeyi, yani fonksiyonların içinde bildirilen değişkenleri de kapsar. Temel kural şudur: Bir değişkeni süslü parantezlerle sınırlandırılmış bir blok içinde bildirdiyseniz, o değişkenin kapsamı o bloktur. Bir bloğun içinde başka bir blok varsa, içteki blokta bildirilen değişkenler o bloğa yereldir (local) ve dış kapsamdan görülemez. Bir değişkenin kapsamı sona erdiğinde, o değişkene artık başvurulamaz ve değerinin gökyüzündeki o büyük bit kovasına (bit bucket)92 uçup gittiğini düşünebilirsiniz. İç içe kapsam içeren bir örnek: #include <stdio.h> int main(void) { int a = 12; // Dış bloğa yerel, ama iç blokta görünür if (a == 12) { int b = 99; // İç bloğa yerel, dış blokta görünmez printf(\"%d %d\\n\", a, b); // OK: \"12 99\" } printf(\"%d\\n\", a); // OK, hala a'nın kapsamındayız printf(\"%d\\n\", b); // GEÇERSİZ, b'nin kapsamı dışında } 13.1.1 Değişkenler Nerede Tanımlanmalı Diğer eğlenceli bir gerçek de, değişkenleri mantık sınırları dahilinde bloğun herhangi bir yerinde tanımlayabilmenizdir—o bloğun kapsamına sahiptirler, ancak tanımlanmadan önce kullanılamazlar. #include <stdio.h> int main(void) { int i = 0; printf(\"%d\\n\", i); // OK: \"0\" //printf(\"%d\\n\", j); // GEÇERSİZ--j tanımlanmadan önce kullanılamaz int j = 5; printf(\"%d %d\\n\", i, j); // OK: \"0 5\" } Tarihsel olarak C, bloktaki herhangi bir koddan önce tüm değişkenlerin tanımlanmasını gerektiriyordu, ancak C99 standardında durum artık böyle değildir. 13.1.2 Değişken Gizleme (Variable Hiding) İç kapsamda, dış kapsamdaki bir değişkenle aynı ada sahip bir değişkeniniz varsa, iç kapsamda çalıştığınız sürece iç kapsamdaki değişken öncelik alır. Yani yaşam süresi boyunca dış kapsamdaki değişkeni gizler (hides). #include <stdio.h> int main(void) { int i = 10; { int i = 20; printf(\"%d\\n\", i); // İç kapsamdaki i, 20 (dış kapsamdaki i gizlenir) } printf(\"%d\\n\", i); // Dış kapsamdaki i, 10 } Bu örnekte, satır 7'de başlatmak için bir for veya if ifadesi bile kullanmadan oraya öylece bir blok koyduğumu fark etmiş olabilirsiniz! Bu tamamen yasaldır. Bazen bir geliştirici hızlı bir hesaplama için bir grup yerel değişkeni bir arada gruplamak ister ve bunu yapar, ancak bunu görmek nadirdir. 13.2 Dosya Kapsamı (File Scope) Bir değişkeni bir bloğun dışında tanımlarsanız, o değişken dosya kapsamına (file scope) sahip olur. Kendisinden sonra gelen dosyadaki tüm fonksiyonlarda görünürdür ve aralarında paylaşılır. (Bir istisna: Bir blok aynı isimde bir değişken tanımlarsa, dosya kapsamındakini gizler.) Bu, başka bir dilde \"küresel\" (global) kapsam olarak değerlendirebileceğiniz şeye en yakın olanıdır. Örneğin: #include <stdio.h> int shared = 10; // Dosya kapsamı! Bundan sonra tüm dosyada görünür! void func1(void) { shared += 100; // Art"
  },
  {
    "file": "setjmp-longjmp.html",
    "title": "34 setjmp, longjmp ile Uzak Atlamalar (Long Jumps)",
    "headings": [
      {
        "id": "using-setjmp-and-longjmp",
        "title": "34.1 setjmp ve longjmp Kullanımı"
      },
      {
        "id": "pitfalls",
        "title": "34.2 Tuzaklar ve Dikkat Edilmesi Gerekenler"
      },
      {
        "id": "the-values-of-local-variables",
        "title": "34.2.1 Yerel Değişkenlerin Değerleri"
      },
      {
        "id": "how-much-state-is-saved",
        "title": "34.2.2 Ne Kadar Durum Saklanır?"
      },
      {
        "id": "you-cant-name-anything-setjmp",
        "title": "34.2.3 Hiçbir Şeyi setjmp Olarak Adlandıramazsınız"
      },
      {
        "id": "you-cant-setjmp-in-a-larger-expression",
        "title": "34.2.4 Daha Büyük Bir İfade İçinde setjmp() Kullanamazsınız"
      },
      {
        "id": "when-cant-you-longjmp",
        "title": "34.2.5 Ne Zaman longjmp() Yapamazsınız?"
      },
      {
        "id": "you-cant-pass-0-to-longjmp",
        "title": "34.2.6 longjmp() Fonksiyonuna 0 Geçiremezsiniz"
      },
      {
        "id": "longjmp-and-variable-length-arrays",
        "title": "34.2.7 longjmp() ve Değişken Uzunluklu Diziler"
      }
    ],
    "text": "Beej's C Programlama Rehberi 34 setjmp, longjmp ile Uzak Atlamalar (Long Jumps) Fonksiyon kapsamında atlama yapan goto ifadesini zaten görmüştük. Ancak longjmp(), yürütme sürecinde daha önceki bir noktaya, bu fonksiyonu çağıran fonksiyona geri atlamanıza olanak tanır. Birçok sınırlama ve dikkat edilmesi gereken nokta (caveat) vardır, ancak bu fonksiyon, çağrı yığınının (call stack) derinliklerinden daha önceki bir duruma güvenli bir şekilde dönmek (çıkmak) için oldukça kullanışlı olabilir. Benim deneyimlerime göre, bu çok nadir kullanılan bir işlevselliktir. 34.1 setjmp ve longjmp Kullanımı Burada yapacağımız dans, temel olarak setjmp() ile yürütme sürecine bir yer imi (bookmark) koymaktır. Daha sonra longjmp() fonksiyonunu çağıracağız ve bu, yürütmede setjmp() ile yer imini koyduğumuz önceki noktaya geri atlayacak. Ve bunu alt fonksiyonları çağırmış olsanız bile yapabilir. İşte birkaç seviye derinlikteki fonksiyonları çağırdığımız ve ardından oradan çıkış yaptığımız hızlı bir gösterim. setjmp() fonksiyonunu çağırdığımızda durumların durumunu (state) korumak için dosya kapsamlı (file scope) bir env değişkeni kullanacağız, böylece daha sonra longjmp() çağırdığımızda bunları geri yükleyebiliriz. Bu, \"yerimizi\" hatırladığımız değişkendir. env değişkeni, <setjmp.h> başlık dosyasında tanımlanan opak (opaque) bir tür olan jmp_buf türündendir. #include <stdio.h> #include <setjmp.h> jmp_buf env; void depth2(void) { printf(\"Entering depth 2\\n\"); longjmp(env, 3490); // Çıkış yap / Erken dön printf(\"Leaving depth 2\\n\"); // Bu çalışmayacak } void depth1(void) { printf(\"Entering depth 1\\n\"); depth2(); printf(\"Leaving depth 1\\n\"); // Bu çalışmayacak } int main(void) { switch (setjmp(env)) { case 0: printf(\"Calling into functions, setjmp() returned 0\\n\"); depth1(); printf(\"Returned from functions\\n\"); // Bu çalışmayacak break; case 3490: printf(\"Bailed back to main, setjmp() returned 3490\\n\"); break; } } Çalıştırıldığında şu çıktıyı verir: Calling into functions, setjmp() returned 0 Entering depth 1 Entering depth 2 Bailed back to main, setjmp() returned 3490 Bu çıktıyı alıp kodla eşleştirmeye çalışırsanız, ortalıkta gerçekten tuhaf (funky) şeylerin döndüğü açıktır. En dikkat çekici şeylerden biri setjmp() fonksiyonunun iki kez değer döndürmesidir. Ne oluyor orada? Bu nasıl bir büyü?! İşte durum şu: Eğer setjmp() 0 döndürürse, bu, o noktada \"yer imini\" başarıyla oluşturduğunuz anlamına gelir. Sıfır dışında bir değer döndürürse, daha önce ayarlanan \"yer imine\" yeni döndüğünüz anlamına gelir. (Ve dönen değer, longjmp() fonksiyonuna ilettiğiniz değerdir.) Bu sayede yer imini ayarlamak ile daha sonra ona geri dönmek arasındaki farkı anlayabilirsiniz. Böylece yukarıdaki kod setjmp() fonksiyonunu ilk kez çağırdığında, setjmp() durumu env değişkeninde saklar ve 0 döndürür. Daha sonra aynı env ile longjmp() çağırdığımızda, durumu geri yükler ve setjmp(), longjmp() fonksiyonuna geçirilen değeri döndürür. 34.2 Tuzaklar ve Dikkat Edilmesi Gerekenler İşin mutfağında (arka "
  },
  {
    "file": "signal-handling.html",
    "title": "29 Sinyal İşleme",
    "headings": [
      {
        "id": "what-are-signals",
        "title": "29.1 Sinyal Nedir?"
      },
      {
        "id": "handling-signals-with-signal",
        "title": "29.2 signal() ile Sinyalleri İşleme"
      },
      {
        "id": "writing-signal-handlers",
        "title": "29.3 Sinyal İşleyicileri Yazma"
      },
      {
        "id": "what-can-we-actually-do",
        "title": "29.4 Gerçekte Ne Yapabiliriz?"
      },
      {
        "id": "friends-dont-let-friends-signal",
        "title": "29.5 Dostlar Dostlarının signal() Kullanmasına İzin Vermez"
      }
    ],
    "text": "Beej's Guide to C Programming 29 Sinyal İşleme Başlamadan önce, genel olarak bu bölümün tamamını görmezden gelmenizi ve işletim sisteminizin (büyük olasılıkla) üstün sinyal işleme fonksiyonlarını kullanmanızı tavsiye edeceğim. Unix benzeri sistemlerde sigaction() fonksiyon ailesi vardır ve Windows'ta ise… her ne yapıyorsa o vardır172. Bunu aradan çıkardıktan sonra, sinyal nedir? 29.1 Sinyal Nedir? Çeşitli harici olaylarda bir sinyal yükseltilir (raised). Programınız sinyali işlemek (handle) için kesintiye uğrayacak şekilde yapılandırılabilir ve isteğe bağlı olarak, sinyal işlendikten sonra kaldığı yerden devam edebilir. Bunu, bu harici olaylardan biri meydana geldiğinde otomatik olarak çağrılan bir fonksiyon gibi düşünün. Bu olaylar nelerdir? Sisteminizde muhtemelen bunlardan çok sayıda vardır, ancak C spesifikasyonunda yalnızca birkaçı bulunur: Sinyal Açıklama SIGABRT Anormal sonlanma—abort() çağrıldığında olan şey. SIGFPE Kayan nokta istisnası (Floating point exception). SIGILL Geçersiz talimat (Illegal instruction). SIGINT Kesme (Interrupt)—genellikle CTRL-C tuşuna basılmasının sonucu. SIGSEGV “Bölütleme İhlali (Segmentation Violation)”: geçersiz bellek erişimi. SIGTERM Sonlandırma istendi. signal() fonksiyonunu kullanarak programınızı bunların her birini yok sayacak, işleyecek veya varsayılan eyleme izin verecek şekilde ayarlayabilirsiniz. 29.2 signal() ile Sinyalleri İşleme signal() çağrısı iki parametre alır: söz konusu sinyal ve o sinyal yükseltildiğinde alınacak bir eylem. Eylem üç şeyden biri olabilir: Bir işleyici (handler) fonksiyona gösterici. Sinyali yok saymak için SIG_IGN. Sinyal için varsayılan işleyiciyi geri yüklemek için SIG_DFL. CTRL-C ile çıkamayacağınız bir program yazalım. (Üzülmeyin—aşağıdaki programda RETURN tuşuna da basabilirsiniz ve çıkacaktır.) #include <stdio.h> #include <signal.h> int main(void) { char s[1024]; signal(SIGINT, SIG_IGN); // ^C ile tetiklenen SIGINT sinyalini yok say printf(\"Try hitting ^C... (hit RETURN to exit)\\n\"); // Programın hemen çıkmaması için bir satırlık girdi bekle fgets(s, sizeof s, stdin); } 8. satıra göz atın—programa CTRL-C tuşuna basıldığında yükseltilen kesme sinyali olan SIGINT sinyalini yok saymasını söylüyoruz. Ne kadar basarsanız basın, sinyal yok sayılmaya devam eder. 8. satırı yorum satırına alırsanız, cezasız bir şekilde CTRL-C yapabileceğinizi ve programdan anında çıkabileceğinizi görürsünüz. 29.3 Sinyal İşleyicileri Yazma Sinyal yükseltildiğinde çağrılan bir işleyici fonksiyon da yazabileceğinizden bahsetmiştim. Bunlar oldukça basittir, ancak spesifikasyon söz konusu olduğunda yetenekleri çok sınırlıdır. Başlamadan önce signal() çağrısının fonksiyon prototipine bakalım: void (*signal(int sig, void (*func)(int)))(int); Okuması oldukça kolay, değil mi? YANLIŞ! :) Pratik yapmak için bunu parçalarına ayırmaya bir anımızı ayıralım. signal() iki argüman alır: sinyali temsil eden bir tamsayı sig ve işleyiciye bir gösterici olan func (işleyici void döndürür ve argüman olarak bir int a"
  },
  {
    "file": "strings.html",
    "title": "7 Metin Dizileri (Strings)",
    "headings": [
      {
        "id": "string-literals",
        "title": "7.1 String Sabitleri (String Literals)"
      },
      {
        "id": "string-variables",
        "title": "7.2 String Değişkenleri"
      },
      {
        "id": "string-variables-as-arrays",
        "title": "7.3 Dizi Olarak String Değişkenleri"
      },
      {
        "id": "string-initializers",
        "title": "7.4 String İlklendiricileri (String Initializers)"
      },
      {
        "id": "getting-string-length",
        "title": "7.5 String Uzunluğunu Almak"
      },
      {
        "id": "string-termination",
        "title": "7.6 String Sonlandırma (String Termination)"
      },
      {
        "id": "copying-a-string",
        "title": "7.7 Bir String'i Kopyalamak"
      }
    ],
    "text": "Beej's Guide to C Programming 7 Metin Dizileri (Strings) Nihayet! String'ler (metin dizileri)! Bundan daha basit ne olabilir ki? Şey, meğer C'de string'ler aslında bildiğimiz string'ler değilmiş. Aynen öyle! Onlar da pointer! Tabii ki öyleler! Tıpkı diziler gibi, C'de string'ler de zar zor var olurlar. Ama gelin inceleyelim—aslında o kadar da büyük bir olay değil. 7.1 String Sabitleri (String Literals) Başlamadan önce C'deki string sabitleri (string literals) hakkında konuşalım. Bunlar çift tırnak (\") içindeki karakter dizileridir. (Tek tırnaklar karakterleri kapsar ve tamamen farklı bir canlı türüdür.) Örnekler: \"Hello, world!\\n\" \"This is a test.\" \"When asked if this string had quotes in it, she replied, \\\"It does.\\\"\" İlki sonunda yeni satır karakteri içerir—görmesi oldukça yaygın bir şey. Sonuncusu içinde tırnak işaretleri barındırır, ancak her birinin önünde bu noktada string'e literal bir tırnak işaretinin ait olduğunu belirten bir ters eğik çizgi (\\) (kaçış karakteri / escaped) görürsünüz. C derleyicisi bir çift tırnak yazdırmak ile string'in sonundaki çift tırnak arasındaki farkı bu şekilde anlar. 7.2 String Değişkenleri Artık bir string sabiti oluşturmayı bildiğimize göre, onunla bir şeyler yapabilmek için onu bir değişkene atayalım. char *s = \"Hello, world!\"; Şu türe dikkat edin: char göstericisi (pointer to char). s string değişkeni aslında o string'deki ilk karaktere, yani H harfine bir pointer'dır. Ve onu %s (\"string\" için) format belirteci ile yazdırabiliriz: char *s = \"Hello, world!\"; printf(\"%s\\n\", s); // \"Hello, world!\" 7.3 Dizi Olarak String Değişkenleri Başka bir seçenek de yukarıdaki char* kullanımıyla neredeyse eşdeğer olan şudur: char s[14] = \"Hello, world!\"; // veya tam anlamıyla tembellik edip derleyicinin // uzunluğu bizim yerimize hesaplamasını istersek: char s[] = \"Hello, world!\"; Bu, bir string'deki karakterlere erişmek için dizi notasyonunu kullanabileceğiniz anlamına gelir. Bir string'deki tüm karakterleri aynı satırda yazdırmak için tam olarak bunu yapalım: #include <stdio.h> int main(void) { char s[] = \"Hello, world!\"; for (int i = 0; i < 13; i++) printf(\"%c\", s[i]); printf(\"\\n\"); } Tek bir karakter yazdırmak için %c format belirtecini kullandığımıza dikkat edin. Ayrıca şuna da bakın. s tanımını bir char* türü yapacak şekilde değiştirsek bile program yine sorunsuz çalışacaktır: #include <stdio.h> int main(void) { char *s = \"Hello, world!\"; // Burası char* for (int i = 0; i < 13; i++) printf(\"%c\", s[i]); // Ama yine de dizileri mi kullanıyoruz...? printf(\"\\n\"); } Ve ekrana yazdırırken işi halletmek için hala dizi notasyonunu kullanabiliyoruz! Bu şaşırtıcıdır, ancak sadece henüz dizi/pointer eşdeğerliği hakkında konuşmadığımız içindir. Bu da derinlerde dizilerin ve pointer'ların aynı şey olduğuna dair bir başka ipucudur. 7.4 String İlklendiricileri (String Initializers) String değişkenlerini string sabitleriyle ilklendirmeye dair bazı örnekler görmüştük: char *s = \"Hello, world!\"; char t[] = \"Hello, again!\"; Ancak bu i"
  },
  {
    "file": "structs-ii-more-fun-with-structs.html",
    "title": "20 struct II: struct Yapıları ile Daha Fazla Eğlence",
    "headings": [
      {
        "id": "initializers-of-nested-structs-and-arrays",
        "title": "20.1 İç İçe Geçmiş struct Yapılarının ve Dizilerin İlklendiricileri"
      },
      {
        "id": "anonymous-structs",
        "title": "20.2 Adsız (Anonim) struct Yapıları"
      },
      {
        "id": "self-referential-structs",
        "title": "20.3 Öz-Referanslı (Self-Referential) struct Yapıları"
      },
      {
        "id": "flexible-array-members",
        "title": "20.4 Esnek Dizi Üyeleri (Flexible Array Members)"
      },
      {
        "id": "struct-padding-bytes",
        "title": "20.5 struct Doldurma Baytları (Padding Bytes)"
      },
      {
        "id": "offsetof",
        "title": "20.6 offsetof"
      },
      {
        "id": "fake-oop",
        "title": "20.7 Sahte OOP (Nesne Yönelimli Programlama)"
      },
      {
        "id": "bit-fields",
        "title": "20.8 Bit Alanları (Bit-Fields)"
      },
      {
        "id": "non-adjacent-bit-fields",
        "title": "20.8.1 Bitişik Olmayan Bit Alanları"
      },
      {
        "id": "signed-or-unsigned-ints",
        "title": "20.8.2 İşaretli veya İşaretsiz int Türleri"
      },
      {
        "id": "unnamed-bit-fields",
        "title": "20.8.3 İsimsiz Bit Alanları"
      },
      {
        "id": "zero-width-unnamed-bit-fields",
        "title": "20.8.4 Sıfır Genişlikli İsimsiz Bit Alanları"
      },
      {
        "id": "unions",
        "title": "20.9 Birlikler: union"
      },
      {
        "id": "union-type-punning",
        "title": "20.9.1 Birlikler ve Tür Kelime Oyunu (Type Punning)"
      },
      {
        "id": "pointers-to-unions",
        "title": "20.9.2 union Göstericileri (Pointers)"
      },
      {
        "id": "common-initial-sequences-in-unions",
        "title": "20.9.3 Birliklerde Ortak Başlangıç Dizilimleri (Common Initial Sequences)"
      },
      {
        "id": "unions-and-unnamed-structs",
        "title": "20.10 Birlikler ve İsimsiz Struct Yapıları"
      },
      {
        "id": "passing-and-returning-structs-and-unions",
        "title": "20.11 struct ve union Yapılarını Fonksiyonlara Geçirme ve Döndürme"
      }
    ],
    "text": "Beej's Guide to C Programming 20 struct II: struct Yapıları ile Daha Fazla Eğlence Görünen o ki struct yapılarıyla yapabileceğiniz şeylerin sayısı şimdiye kadar bahsettiğimizden çok daha fazla; ancak bunlar çeşitli konuların bir araya geldiği bir yığın. Bu yüzden hepsini bu bölümde toplayacağız. Eğer struct temellerine hakimseniz, bilginizi burada tamamlayabilirsiniz. 20.1 İç İçe Geçmiş struct Yapılarının ve Dizilerin İlklendiricileri Yapı üyelerini şu şekilde ilklendirebildiğinizi (initialize) hatırlıyor musunuz? struct foo x = {.a=12, .b=3.14}; Meğer bu ilklendiricilerde başlangıçta paylaştığımızdan çok daha fazla güce sahipmişiz. Heyecan verici! Birincisi, aşağıdaki gibi iç içe geçmiş bir alt yapınız (substructure) varsa, değişken adlarını sırayla takip ederek o alt yapının üyelerini ilklendirebilirsiniz: struct foo x = {.a.b.c=12}; Bir örneğe bakalım: #include <stdio.h> struct cabin_information { int window_count; int o2level; }; struct spaceship { char *manufacturer; struct cabin_information ci; }; int main(void) { struct spaceship s = { .manufacturer=\"General Products\", .ci.window_count = 8, // <-- İÇ İÇE GEÇMİŞ İLKLENDİRİCİ! .ci.o2level = 21 }; printf(\"%s: %d seats, %d%% oxygen\\n\", s.manufacturer, s.ci.window_count, s.ci.o2level); } 17-18. satırlara göz atın! struct spaceship türündeki s değişkenimizin tanımı içinde struct cabin_information üyelerini tam orada ilklendiriyoruz. Ve işte aynı ilklendirici için başka bir seçenek—bu sefer daha standart görünen bir şey yapacağız, ancak her iki yaklaşım da çalışır: struct spaceship s = { .manufacturer=\"General Products\", .ci={ .window_count = 8, .o2level = 21 } }; Şimdi, yukarıdaki bilgiler yeterince muhteşem değilmiş gibi, işin içine dizi ilklendiricilerini de katabiliriz. Araya bir yolcu bilgisi dizisi eklemek için bunu biraz değiştirelim ve ilklendiricilerin burada da nasıl çalıştığını görelim. #include <stdio.h> struct passenger { char *name; int covid_vaccinated; // Mantıksal (Boolean) }; #define MAX_PASSENGERS 8 struct spaceship { char *manufacturer; struct passenger passenger[MAX_PASSENGERS]; }; int main(void) { struct spaceship s = { .manufacturer=\"General Products\", .passenger = { // Her seferinde bir alanı ilklendir [0].name = \"Gridley, Lewis\", [0].covid_vaccinated = 0, // Veya hepsini tek seferde [7] = {.name=\"Brown, Teela\", .covid_vaccinated=1}, } }; printf(\"Passengers for %s ship:\\n\", s.manufacturer); for (int i = 0; i < MAX_PASSENGERS; i++) if (s.passenger[i].name != NULL) printf(\" %s (%svaccinated)\\n\", s.passenger[i].name, s.passenger[i].covid_vaccinated? \"\": \"not \"); } 20.2 Adsız (Anonim) struct Yapıları Bunlar “adı olmayan struct” yapılarıdır. Bunlardan typedef bölümünde de bahsetmiştik, ama burada hafızamızı tazeleyeceğiz. İşte normal bir struct: struct animal { char *name; int leg_count, speed; }; Ve işte anonim karşılığı: struct { // <-- Adı yok! char *name; int leg_count, speed; }; Tamammm. Yani bir struct yapımız var ama adı yok, bu yüzden daha sonra kullanmamızın bir yolu y"
  },
  {
    "file": "structs.html",
    "title": "8 Yapılar (Structs)",
    "headings": [
      {
        "id": "declaring-a-struct",
        "title": "8.1 Bir Struct (Yapı) Bildirmek"
      },
      {
        "id": "struct-initializers",
        "title": "8.2 Struct İlklendiricileri (Struct Initializers)"
      },
      {
        "id": "passing-structs-to-functions",
        "title": "8.3 Struct'ları Fonksiyonlara Geçirmek"
      },
      {
        "id": "the-arrow-operator",
        "title": "8.4 Ok Operatörü (The Arrow Operator)"
      },
      {
        "id": "copying-and-returning-structs",
        "title": "8.5 Struct'ları Kopyalamak ve Döndürmek"
      },
      {
        "id": "comparing-structs",
        "title": "8.6 Struct'ları Karşılaştırmak"
      }
    ],
    "text": "Beej's Guide to C Programming 8 Yapılar (Structs) C'de struct (yapı) adı verilen, muhtemelen farklı türlerde birden fazla veri parçasını tutan ve kullanıcı tarafından tanımlanabilen bir türümüz vardır. Birden fazla değişkeni tek bir değişken içinde toplamak için uygun bir yoldur. Bu, değişkenleri fonksiyonlara geçirmek açısından yararlı olabilir (böylece birden çok değişken yerine yalnızca bir tane geçirmek zorunda kalırsınız) ve verileri organize etmek ile kodu daha okunabilir hale getirmek için faydalıdır. Başka bir dilden geldiyseniz sınıflar (classes) ve nesneler (objects) fikrine aşina olabilirsiniz. Bunlar C'de yerleşik (yerel) olarak mevcut değildir69. Bir struct yapısını yalnızca veri üyeleri (data members) içeren ve metotları olmayan bir sınıf olarak düşünebilirsiniz. 8.1 Bir Struct (Yapı) Bildirmek Kodunuzda bir struct yapısını şu şekilde bildirebilirsiniz: struct car { char *name; float price; int speed; }; Bu genellikle herhangi bir fonksiyonun dışında genel kapsamda (global scope) yapılır, böylece struct her yerden erişilebilir olur. Bunu yaptığınızda yeni bir tür (type) oluşturmuş olursunuz. Tam tür adı struct car şeklindedir. (Yalnızca car değil—bu şekilde çalışmaz.) Henüz bu türde herhangi bir değişken yok, ancak birkaç tane bildirebiliriz: struct car saturn; // \"struct car\" türünde \"saturn\" değişkeni Ve artık struct car türünde ilklendirilmemiş bir saturn değişkenimiz var70. Onu ilklendirmeliyiz! Ama bu münferit alanların (fields) değerlerini nasıl ayarlayabiliriz? C'den bunu alan diğer birçok dilde olduğu gibi, münferit alanlara erişmek için nokta operatörünü (.) kullanacağız. saturn.name = \"Saturn SL/2\"; saturn.price = 15999.99; saturn.speed = 175; printf(\"Name: %s\\n\", saturn.name); printf(\"Price (USD): %f\\n\", saturn.price); printf(\"Top Speed (km): %d\\n\", saturn.speed); İlk satırlarda struct car içindeki değerleri ayarlıyoruz ve ardından bir sonraki kısımda bu değerleri ekrana yazdırıyoruz. 8.2 Struct İlklendiricileri (Struct Initializers) Önceki bölümdeki örnek biraz hantaldı. O struct değişkenini ilklendirmenin daha iyi bir yolu olmalı! Değişkeni tanımlarken alanların değerlerini struct içinde yer alma sıralarına göre süslü parantez içine koyarak bir ilklendirici (initializer) ile yapabilirsiniz. (Bu işlem değişken tanımlandıktan sonra çalışmaz—tanımlama anında gerçekleşmelidir). struct car { char *name; float price; int speed; }; // Şimdi bir ilklendirici ile! struct bildirimindeki alan sırasıyla aynı: struct car saturn = {\"Saturn SL/2\", 16000.99, 175}; printf(\"Name: %s\\n\", saturn.name); printf(\"Price: %f\\n\", saturn.price); printf(\"Top Speed: %d km\\n\", saturn.speed); İlklendiricideki alanların aynı sırada olması gerektiği gerçeği biraz tuhaftır. Biri struct car içindeki sırayı değiştirirse, tüm diğer kodları bozabilir! İlklendiricilerimizle daha spesifik (belirgin) olabiliriz: struct car saturn = {.speed=175, .name=\"Saturn SL/2\"}; Artık struct bildirimindeki sıradan bağımsızdır. Bu da kesinlikle daha güvenli bir koddur. Dizi"
  },
  {
    "file": "the-c-preprocessor.html",
    "title": "19 C Ön İşlemcisi",
    "headings": [
      {
        "id": "include",
        "title": "19.1 #include"
      },
      {
        "id": "simple-macros",
        "title": "19.2 Basit Makrolar"
      },
      {
        "id": "conditional-compilation",
        "title": "19.3 Koşullu Derleme"
      },
      {
        "id": "if-defined-ifdef-and-endif",
        "title": "19.3.1 Tanımlanmışsa, #ifdef ve #endif"
      },
      {
        "id": "if-not-defined-ifndef",
        "title": "19.3.2 Tanımlanmamışsa, #ifndef"
      },
      {
        "id": "else",
        "title": "19.3.3 #else"
      },
      {
        "id": "else-if-elifdef-elifndef",
        "title": "19.3.4 Else-If: #elifdef, #elifndef"
      },
      {
        "id": "general-conditional-if-elif",
        "title": "19.3.5 Genel Koşullu: #if, #elif"
      },
      {
        "id": "losing-a-macro-undef",
        "title": "19.3.6 Bir Makroyu Kaybetmek (Tanımını Kaldırmak): #undef"
      },
      {
        "id": "built-in-macros",
        "title": "19.4 Yerleşik Makrolar"
      },
      {
        "id": "mandatory-macros",
        "title": "19.4.1 Zorunlu Makrolar"
      },
      {
        "id": "optional-macros",
        "title": "19.4.2 İsteğe Bağlı Makrolar"
      },
      {
        "id": "macros-with-arguments",
        "title": "19.5 Argümanlı Makrolar"
      },
      {
        "id": "macros-with-one-argument",
        "title": "19.5.1 Tek Argümanlı Makrolar"
      },
      {
        "id": "macros-with-more-than-one-argument",
        "title": "19.5.2 Birden Fazla Argümanlı Makrolar"
      },
      {
        "id": "macros-with-variable-arguments",
        "title": "19.5.3 Değişken Argümanlı Makrolar"
      },
      {
        "id": "stringification",
        "title": "19.5.4 String Yapma"
      },
      {
        "id": "concatenation",
        "title": "19.5.5 Birleştirme"
      },
      {
        "id": "multiline-macros",
        "title": "19.6 Çok Satırlı Makrolar"
      },
      {
        "id": "my-assert",
        "title": "19.7 Örnek: Bir Assert Makrosu"
      },
      {
        "id": "the-error-directive",
        "title": "19.8 #error Direktifi"
      },
      {
        "id": "the-embed-directive",
        "title": "19.9 #embed Direktifi"
      },
      {
        "id": "embed-parameters",
        "title": "19.9.1 #embed Parametreleri"
      },
      {
        "id": "the-limit-parameter",
        "title": "19.9.2 limit() Parametresi"
      },
      {
        "id": "the-if_empty-parameter",
        "title": "19.9.3 if_empty Parametresi"
      },
      {
        "id": "the-prefix-and-suffix-parameters",
        "title": "19.9.4 prefix() ve suffix() Parametreleri"
      },
      {
        "id": "the-__has_embed-identifier",
        "title": "19.9.5 __has_embed() Tanımlayıcısı"
      },
      {
        "id": "other-parameters",
        "title": "19.9.6 Diğer Parametreler"
      },
      {
        "id": "embedding-multi-byte-values",
        "title": "19.9.7 Çok Baytlı Değerleri Gömmek"
      },
      {
        "id": "pragma",
        "title": "19.10 #pragma Direktifi"
      },
      {
        "id": "non-standard-pragmas",
        "title": "19.10.1 Standart Olmayan Pragma'lar"
      },
      {
        "id": "standard-pragmas",
        "title": "19.10.2 Standart Pragma'lar"
      },
      {
        "id": "pragma-operator",
        "title": "19.10.3 _Pragma Operatörü"
      },
      {
        "id": "the-line-directive",
        "title": "19.11 #line Direktifi"
      },
      {
        "id": "the-null-directive",
        "title": "19.12 Boş Direktif"
      }
    ],
    "text": "Beej's C Programlama Rehberi 19 C Ön İşlemcisi Programınız derlenmeden önce, aslında ön işleme (preprocessing) adı verilen bir aşamadan geçer. Neredeyse C dilinin üzerinde çalışan ve önce yürütülen başka bir dil varmış gibidir. Ve C derleyicisi tarafından derlenecek olan C kodunu üretir. Bunu #include ile bir dereceye kadar zaten görmüştük! Bu C Ön İşlemcisidir! O direktifi gördüğü yerde, sanki kendiniz yazmışsınız gibi adı geçen dosyayı tam o noktaya dahil eder. Ve ardından derleyici her şeyi inşa eder. Ancak meğer sadece dosyaları dahil edebilmekten çok daha güçlüymüş. Değiştirilen makrolar (macros) ve hatta argüman alan makrolar tanımlayabilirsiniz! 19.1 #include Zaten bolca gördüğümüzle başlayalım. Bu elbette diğer kaynakları kendi kaynağınıza dahil etmenin bir yoludur. Çok yaygın olarak başlık dosyalarıyla kullanılır. Spesifikasyon #include ile her türlü davranışa izin verse de, daha pratik bir yaklaşım benimseyeceğiz ve gördüğüm her sistemde çalışma şekli hakkında konuşacağız. Başlık dosyalarını iki kategoriye ayırabiliriz: sistem ve yerel. stdio.h, stdlib.h, math.h gibi yerleşik (built-in) şeyleri açılı parantezlerle dahil edebilirsiniz: #include <stdio.h> #include <stdlib.h> Açılı parantezler C'ye \"Hey, bu başlık dosyası için mevcut dizine bakma — bunun yerine sistem genelindeki include dizinine bak\" der. Bu da elbette mevcut dizinden yerel dosyaları dahil etmenin bir yolu olması gerektiğini gösterir. Ve var: çift tırnak ile: #include \"myheader.h\" Ya da büyük olasılıkla şöyle taksim işaretleri ve noktalar kullanarak bağıntılı (relative) dizinlere bakabilirsiniz: #include \"mydir/myheader.h\" #include \"../someheader.py\" #include içindeki yol ayırıcılarınız için ters eğik çizgi (\\) kullanmayın! Bu tanımsız davranıştır (undefined behavior)! Windows'ta bile yalnızca düz eğik çizgi (/) kullanın. Özetle, sistem dahil etmeleri için açılı parantezleri (< ve >), kişisel dahil etmeleriniz için çift tırnağı (\") kullanın. 19.2 Basit Makrolar Bir makro, derleyici onu görmeden önce başka bir kod parçasına genişletilen (expanded) bir tanımlayıcıdır. Bunu bir yer tutucu gibi düşünün — ön işlemci bu tanımlayıcılardan birini gördüğünde, onu tanımladığınız başka bir değerle değiştirir. Bunu #define ile yaparız (sıklıkla \"pound define\" veya belki \"hash define\" olarak okunur). İşte bir örnek: #include <stdio.h> #define HELLO \"Hello, world\" #define PI 3.14159 int main(void) { printf(\"%s, %f\\n\", HELLO, PI); } 3. ve 4. satırlarda birkaç makro tanımladık. Bunlar kodun başka neresinde görünürse görünsün (satır 8), tanımlanan değerlerle değiştirileceklerdir. C derleyicisinin perspektifinden bakıldığında, sanki şöyle yazmışız gibi aynısıdır: #include <stdio.h> int main(void) { printf(\"%s, %f\\n\", \"Hello, world\", 3.14159); } HELLO makrosunun \"Hello, world\" ile ve PI makrosunun 3.14159 ile nasıl değiştirildiğini gördünüz mü? Derleyicinin perspektifinden bakıldığında, tam olarak o değerler kodun o noktasında görünmüş gibidir. Makroların kendiliğinden belirli bir türü olma"
  },
  {
    "file": "the-outside-environment.html",
    "title": "18 Dış Çevre",
    "headings": [
      {
        "id": "command-line-arguments",
        "title": "18.1 Komut Satırı Argümanları"
      },
      {
        "id": "the-last-argv-is-null",
        "title": "18.1.1 Son argv Değeri NULL'dır"
      },
      {
        "id": "the-alternate-char-argv",
        "title": "18.1.2 Alternatif: char **argv"
      },
      {
        "id": "fun-facts",
        "title": "18.1.3 Eğlenceli Gerçekler"
      },
      {
        "id": "exit-status",
        "title": "18.2 Çıkış Durumu"
      },
      {
        "id": "other-exit-status-values",
        "title": "18.2.1 Diğer Çıkış Durum Değerleri"
      },
      {
        "id": "env-var",
        "title": "18.3 Çevre Değişkenleri"
      },
      {
        "id": "setting-environment-variables",
        "title": "18.3.1 Çevre Değişkenlerini Ayarlamak"
      },
      {
        "id": "unix-like-alternative-environment-variables",
        "title": "18.3.2 Unix Benzeri Alternatif Çevre Değişkenleri"
      }
    ],
    "text": "Beej's C Programlama Rehberi 18 Dış Çevre Bir programı çalıştırdığınızda, aslında siz kabuğa (shell) \"Hey, lütfen bunu çalıştır\" dersiniz. Kabuk da \"Tabii ki\" der ve ardından işletim sistemine \"Hey, lütfen yeni bir süreç (process) oluşturup bunu çalıştırır mısın?\" der. Eğer her şey yolunda giderse, işletim sistemi bunu kabul eder ve programınız çalışır. Ancak programınızın dışında, kabuk içinde C kodunun içinden etkileşime girilebilecek koca bir dünya vardır. Bu bölümde bunlardan birkaçına göz atacağız. 18.1 Komut Satırı Argümanları Birçok komut satırı aracı komut satırı argümanları kabul eder. Örneğin, Unix benzeri bir sistemde .txt ile biten tüm dosyaları görmek istersek şöyle bir şey yazabiliriz: ls *.txt (veya Windows sisteminde ls yerine dir). Bu durumda komut lstir, ancak argümanları .txt ile biten tüm dosyalardır120. Peki komut satırından programa ne aktarıldığını nasıl görebiliriz? Diyelim ki komut satırında iletilen tüm sayıları toplayan ve sonucu yazdıran add adında bir programımız var: ./add 10 30 5 45 Faturaları ödeyeceği kesin! Ama ciddileşmek gerekirse, bu komut satırından o argümanları nasıl alacağımızı ve onları nasıl ayrıştıracağımızı görmek için harika bir araçtır. Öncelikle, onları nasıl elde edeceğimize bakalım. Bunun için yeni bir main() fonksiyonuna ihtiyacımız olacak! İşte tüm komut satırı argümanlarını yazdıran bir program. Örneğin, yürütülebilir dosyayı foo olarak adlandırırsak, onu şöyle çalıştırabiliriz: ./foo i like turtles ve şu çıktıyı görürüz: arg 0: ./foo arg 1: i arg 2: like arg 3: turtles Biraz garip görünebilir, çünkü sıfırıncı argüman yürütülebilir dosyanın kendisinin adıdır. Ama bu sadece alışılması gereken bir durumdur. Argümanların kendileri hemen ardından gelir. Kaynak kod: #include <stdio.h> int main(int argc, char *argv[]) { for (int i = 0; i < argc; i++) { printf(\"arg %d: %s\\n\", i, argv[i]); } } Vay canına! main() fonksiyon imzasında neler oluyor? argc ve argv121 (arg-si ve arg-vi olarak okunur) nedir? Kolay olanla başlayalım: argc. Bu, program adının kendisi de dahil olmak üzere argüman sayısıdır (argument count). Tüm argümanları bir metin dizisi (string) dizisi olarak düşünürseniz — ki tam olarak öyledirler —, argc değerini o dizinin uzunluğu olarak düşünebilirsiniz — ki tam olarak öyledir. Dolayısıyla bu döngüde yaptığımız şey, tüm argv ögelerini dolaşmak ve onları teker teker yazdırmaktır, böylece verilen bir girdi için: ./foo i like turtles karşılık gelen çıktıyı elde ederiz: arg 0: ./foo arg 1: i arg 2: like arg 3: turtles Bunu aklımızda tutarak, toplama programımızla devam etmeye hazırız. Planımız: Tüm komut satırı argümanlarına bakın (argv[0] yani program adından sonrakilere) Onları tamsayılara dönüştürün Onları yürütülen bir toplama ekleyin Sonucu yazdırın Hadi yapalım! #include <stdio.h> #include <stdlib.h> int main(int argc, char **argv) { int total = 0; for (int i = 1; i < argc; i++) { // 1'den başla, ilk argüman int value = atoi(argv[i]); // Daha iyi hata yönetimi için strtol() kullanın tota"
  },
  {
    "file": "typedef-making-new-types.html",
    "title": "10 typedef: Yeni Türler Oluşturmak",
    "headings": [
      {
        "id": "typedef-in-theory",
        "title": "10.1 Teoride typedef"
      },
      {
        "id": "scoping",
        "title": "10.1.1 Kapsam (Scoping)"
      },
      {
        "id": "typedef-in-practice",
        "title": "10.2 Pratikte typedef"
      },
      {
        "id": "typedef-struct",
        "title": "10.2.1 typedef ve struct'lar"
      },
      {
        "id": "typedef-and-other-types",
        "title": "10.2.2 typedef ve Diğer Türler"
      },
      {
        "id": "typedef-and-pointers",
        "title": "10.2.3 typedef ve Göstericiler (Pointers)"
      },
      {
        "id": "typedef-and-capitalization",
        "title": "10.2.4 typedef ve Büyük/Küçük Harf Kullanımı"
      },
      {
        "id": "arrays-and-typedef",
        "title": "10.3 Diziler ve typedef"
      }
    ],
    "text": "Beej's Guide to C Programming 10 typedef: Yeni Türler Oluşturmak Şey, aslında yeni türler oluşturmaktan ziyade mevcut türler için yeni isimler elde etmektir. Yüzeyde biraz anlamsız görünüyor, ancak kodumuzu daha temiz hale getirmek için bunu gerçekten kullanabiliriz. 10.1 Teoride typedef Temel olarak, mevcut bir türü alırsınız ve typedef ile onun için bir takma ad (alias) oluşturursunuz. Şunun gibi: typedef int antelope; // \"antelope\"u \"int\" için bir takma ad yap antelope x = 10; // \"antelope\" türü \"int\" türü ile aynıdır Mevcut herhangi bir türü alıp bunu yapabilirsiniz. Hatta bir virgül listesiyle birden fazla tür de yapabilirsiniz: typedef int antelope, bagel, mushroom; // Bunların hepsi \"int\"tir Bu gerçekten yararlı, değil mi? int yerine mushroom yazabilmek? Bu özellik karşısında aşırı heyecanlanmış olmalısınız! Tamam Profesör Sarcasm—birazdan bunun daha yaygın uygulamalarına geleceğiz. 10.1.1 Kapsam (Scoping) typedef düzenli kapsam kurallarını (scoping rules) takip eder. Bu nedenle, typedef ifadesini dosya kapsamında (\"global\") bulmak oldukça yaygındır, böylece tüm fonksiyonlar yeni türleri istedikleri gibi kullanabilir. 10.2 Pratikte typedef Yani int türünü başka bir şey olarak yeniden adlandırmak o kadar da heyecan verici değil. typedef'in yaygın olarak nerede boy gösterdiğini görelim. 10.2.1 typedef ve struct'lar Bazen struct kelimesini tekrar tekrar yazmak zorunda kalmayın diye bir struct yeni bir isme typedef edilir. struct animal { char *name; int leg_count, speed; }; // orijinal isim yeni isim // | | // v v // |-----------| |----| typedef struct animal animal; struct animal y; // Bu çalışır animal z; // Bu da çalışır çünkü \"animal\" bir takma addır Şahsen ben bu uygulamayı pek sevmiyorum. Tür kelimesine struct kelimesini eklediğinizde kodun sahip olduğu netliği seviyorum; geliştiriciler ne aldıklarını bilirler. Ama bu çok yaygındır, bu yüzden buraya dahil ediyorum. Şimdi tam olarak aynı örneği yaygın olarak görebileceğiniz bir şekilde çalıştırmak istiyorum. struct animal ifadesini typedef içine koyacağız. Hepsini şu şekilde bir araya getirebilirsiniz: // orijinal isim // | // v // |-----------| typedef struct animal { char *name; int leg_count, speed; } animal; // <-- yeni isim struct animal y; // Bu çalışır animal z; // Bu da çalışır çünkü \"animal\" bir takma addır Bu tam olarak önceki örnekle aynıdır, sadece daha derli topludur. Ama hepsi bu kadar değil! Anonim yapılar (anonymous structures)83 adı verilen şeyleri kullanan kodlarda görebileceğiniz başka bir yaygın kestirme yol daha vardır. Yapıyı çeşitli yerlerde adlandırmanıza gerçekten gerek olmadığı ortaya çıkıyor ve typedef de bunlardan biridir. Aynı örneği anonim bir yapı ile yapalım: // Anonim struct! Adı yok! // | // v // |----| typedef struct { char *name; int leg_count, speed; } animal; // <-- yeni isim //struct animal y; // HATA: bu artık çalışmaz--böyle bir struct yok! animal z; // Bu çalışır çünkü \"animal\" bir takma addır Başka bir örnek olarak şöyle bir şey de bulabiliriz: "
  },
  {
    "file": "types-ii-way-more-types.html",
    "title": "14 Türler II: Çok Daha Fazla Tür!",
    "headings": [
      {
        "id": "signed-and-unsigned-integers",
        "title": "14.1 İşaretli ve İşaretsiz Tamsayılar (Signed & Unsigned)"
      },
      {
        "id": "character-types",
        "title": "14.2 Karakter Türleri"
      },
      {
        "id": "more-integer-types-short-long-long-long",
        "title": "14.3 Daha Fazla Tamsayı Türü: short, long, long long"
      },
      {
        "id": "more-float-double-and-long-double",
        "title": "14.4 Daha Fazla Kayal Nokta: double ve long double"
      },
      {
        "id": "how-many-decimal-digits",
        "title": "14.4.1 Kaç Ondalık Basamak?"
      },
      {
        "id": "converting-to-decimal-and-back",
        "title": "14.4.2 Ondalığa Dönüştürme ve Geri Alma"
      },
      {
        "id": "constant-numeric-types",
        "title": "14.5 Sabit Sayısal Türler"
      },
      {
        "id": "hexadecimal-and-octal",
        "title": "14.5.1 Onaltılık (Hexadecimal) ve Sekizlik (Octal)"
      },
      {
        "id": "integer-constants",
        "title": "14.5.2 Tamsayı Sabitleri"
      },
      {
        "id": "floating-point-constants",
        "title": "14.5.3 Kayan Noktalı Sayı Sabitleri"
      }
    ],
    "text": "Beej's Guide to C Programming 14 Türler II: Çok Daha Fazla Tür! char, int ve float türlerine alışkınız, ancak artık bu konuyu bir üst seviyeye taşıma ve türler kulvarında başka nelerin olduğunu görme zamanı! 14.1 İşaretli ve İşaretsiz Tamsayılar (Signed & Unsigned) Şu ana kadar int türünü işaretli (signed) bir tür olarak kullandık; yani hem negatif hem de pozitif olabilen bir değer. Ancak C'de yalnızca pozitif sayıları tutabilen özel işaretsiz (unsigned) tamsayı türleri de vardır. Bu türlerin önüne unsigned anahtar kelimesi getirilir. int a; // signed signed int a; // signed signed a; // signed, \"int\" veya \"signed int\" için nadir kullanılan \"kısaltma\" unsigned int b; // unsigned unsigned c; // unsigned, \"unsigned int\" için kısaltma Neden? Neden yalnızca pozitif sayıları tutmak isteyesiniz ki? Cevap: İşaretsiz (unsigned) bir değişkende, işaretli (signed) bir değişkene kıyasla daha büyük sayılar elde edebilirsiniz. Peki bu neden böyledir? Tamsayıların belirli sayıda bit ile temsil edildiğini düşünebilirsiniz93. Benim bilgisayarımda bir int 64 bit ile temsil edilir. Ve 1 veya 0 olan bitlerin her permütasyonu bir sayıyı temsil eder. Bu sayıları nasıl bölüştüreceğimize karar verebiliriz. İşaretli (signed) sayılarda, negatif sayıları temsil etmek için permütasyonların (yaklaşık) yarısını, pozitif sayıları temsil etmek için ise diğer yarısını kullanırız. İşaretsiz (unsigned) sayılarda ise pozitif sayıları temsil etmek için tüm permütasyonları kullanırız. İşaretsiz sayıları temsil etmek için ikiye tümleyen (two's complement)94 yöntemini kullanan 64-bit int'li bilgisayarımda, tamsayı aralığı üzerinde şu limitlere sahibim: Tür En Küçük En Büyük int -9,223,372,036,854,775,808 9,223,372,036,854,775,807 unsigned int 0 18,446,744,073,709,551,615 En büyük pozitif unsigned int değerinin, en büyük pozitif int değerinin yaklaşık iki katı büyüklüğünde olduğuna dikkat edin. Böylece orada biraz esneklik elde edebilirsiniz. 14.2 Karakter Türleri char türünü hatırlıyor musunuz? Tek bir karakteri tutmak için kullanabileceğimiz tür? char c = 'B'; printf(\"%c\\n\", c); // \"B\" Sizi şaşırtacak bir haberim var: Aslında o bir tamsayıdır. char c = 'B'; // Bunu %c yerine %d olarak değiştirin: printf(\"%d\\n\", c); // 66 (!!) Derinlerde char yalnızca küçük bir int'tir, yani sadece tek bir bayt alan kullanan ve aralığını şuna sınırlayan bir tamsayıdır… Burada C standardı biraz tuhaflaşır. Bir char'ın tek bir bayt olduğunu garanti eder, yani sizeof(char) == 1. Ancak C11 §3.6¶3 standardında ayrıca özel olarak şunu belirtir: Bir bayt, sayısı uygulamaya bağlı olan (implementation-defined) ardışık bir bit dizisinden oluşur. Bekleyin—ne? Bazılarınız bir baytın 8 bit olduğu düşüncesine alışkın olabilir, değil mi? Yani öyle değil mi? Cevap: \"Neredeyse kesinlikle evet.\"95 Ancak C eski bir dildir ve o zamanların makineleri, deyim yerindeyse bir baytta kaç bit olduğu konusunda daha rahat bir fikre sahipti. Ve yıllar boyunca C bu esnekliği korumuştur. Ancak C'deki baytlarınızın, dünyada karşılaşac"
  },
  {
    "file": "types-iii-conversions.html",
    "title": "15 Türler III: Dönüşümler (Conversions)",
    "headings": [
      {
        "id": "string-conversions",
        "title": "15.1 String Dönüşümleri"
      },
      {
        "id": "numeric-value-to-string",
        "title": "15.1.1 Sayısal Değerden String'e"
      },
      {
        "id": "string-to-numeric-value",
        "title": "15.1.2 String'den Sayısal Değere"
      },
      {
        "id": "char-conversions",
        "title": "15.2 char Dönüşümleri"
      },
      {
        "id": "numeric-conversions",
        "title": "15.3 Sayısal Dönüşümler"
      },
      {
        "id": "boolean",
        "title": "15.3.1 Mantıksal Tür (Boolean)"
      },
      {
        "id": "integer-to-integer-conversions",
        "title": "15.3.2 Tamsayıdan Tamsayıya Dönüşümler"
      },
      {
        "id": "integer-and-floating-point-conversions",
        "title": "15.3.3 Tamsayı ve Kayan Noktalı Sayı Dönüşümleri"
      },
      {
        "id": "implicit-conversions",
        "title": "15.4 Örtük Dönüşümler (Implicit Conversions)"
      },
      {
        "id": "integer-promotions",
        "title": "15.4.1 Tamsayı Yükseltmeleri (Integer Promotions)"
      },
      {
        "id": "usual-arithmetic-conversions",
        "title": "15.4.2 Olağan Aritmetik Dönüşümler (The Usual Arithmetic Conversions)"
      },
      {
        "id": "void",
        "title": "15.4.3 void*"
      },
      {
        "id": "explicit-conversions",
        "title": "15.5 Açık Dönüşümler (Explicit Conversions)"
      },
      {
        "id": "casting",
        "title": "15.5.1 Tür Dönüşümü Yapmak (Casting)"
      }
    ],
    "text": "Beej's Guide to C Programming 15 Türler III: Dönüşümler (Conversions) Bu bölümde bir türden diğerine dönüşüm hakkında konuşmak istiyoruz. C'nin bunu yapmak için çeşitli yolları vardır ve bazıları diğer dillerde alıştığınızdan biraz farklı olabilir. Dönüşümlerin nasıl gerçekleşeceğinden bahsetmeden önce, gerçekleştiklerinde nasıl çalıştıklarından bahsedelim. 15.1 String Dönüşümleri Pek çok dilin aksine C, string-sayı (ve tersi) dönüşümlerini sayısal dönüşümlerde olduğu kadar pratik bir şekilde yapmaz. Bunlar için kirli işleri yapacak fonksiyonları çağırmamız gerekecek. 15.1.1 Sayısal Değerden String'e Bir sayıyı string'e dönüştürmek istediğimizde sprintf() (SPRINT-f olarak telaffuz edilir) veya snprintf() (s-n-print-f) kullanabiliriz107. Bunlar temel olarak printf() gibi çalışır, ancak bunun yerine bir string'e çıktı verirler ve bu string'i daha sonra yazdırabilir veya başka bir amaçla kullanabilirsiniz. Örneğin π değerinin bir kısmını string'e dönüştürme: #include <stdio.h> int main(void) { char s[10]; float f = 3.14159; // NUL sonlandırıcısı dahil en fazla 10 karakter yazarak // \"f\" değerini \"s\" dizisine string olarak dönüştürün snprintf(s, 10, \"%f\", f); printf(\"String value: %s\\n\", s); // String değeri: 3.141590 } Böylece tamsayılar için alışkın olduğunuz %d veya %u format belirteçlerini kullanabilirsiniz. 15.1.2 String'den Sayısal Değere C'de bunu yapmak için birkaç fonksiyon ailesi vardır. Bunlara atoi (a-to-i şeklinde okunur) ailesi ve strtol (stir-to-long) ailesi diyeceğiz. Bir string'den bir sayıya temel dönüşüm için <stdlib.h> içindeki atoi fonksiyonlarını deneyin. Bunlar kötü hata işleme özelliklerine sahiptir (hatalı bir string geçirirseniz tanımsız davranış / undefined behavior dahil), bu nedenle bunları dikkatli kullanın. Fonksiyon Açıklama atoi String'den int türüne atof String'den float türüne atol String'den long int türüne atoll String'den long long int türüne Standart açıkça belirtmese de, fonksiyonun başındaki a harfi ASCII anlamına gelir108, yani aslında atoi() \"ASCII-to-integer\"dır (ASCII'den tamsayıya), fakat bunu bugün söylemek biraz ASCII-merkezcidir. Bir string'i float türüne dönüştüren bir örnek: #include <stdio.h> #include <stdlib.h> int main(void) { char *pi = \"3.14159\"; float f; f = atof(pi); printf(\"%f\\n\", f); } Ancak dediğim gibi, böyle garip şeylerden tanımsız davranış (undefined behavior) elde ederiz: int x = atoi(\"what\"); // \"what\" duyduğum hiçbir sayıya benzemiyor (Bunu çalıştırdığımda geriye 0 alıyorum, ama buna kesinlikle hiçbir şekilde güvenmemelisiniz. Tamamen farklı bir şey de elde edebilirsiniz.) Daha iyi hata işleme özellikleri için yine <stdlib.h> içinde bulunan strtol fonksiyonlarına göz atalım. Sadece bu da değil, daha fazla türe ve daha fazla sayı tabanına da dönüşüm yaparlar! Fonksiyon Açıklama strtol String'den long int türüne strtoll String'den long long int türüne strtoul String'den unsigned long int türüne strtoull String'den unsigned long long int türüne strtof String'den float türüne strtod Stri"
  },
  {
    "file": "types-iv-qualifiers-and-specifiers.html",
    "title": "16 Türler IV: Niteleyiciler ve Belirteçler",
    "headings": [
      {
        "id": "type-qualifiers",
        "title": "16.1 Tür Niteleyicileri"
      },
      {
        "id": "const",
        "title": "16.1.1 const"
      },
      {
        "id": "restrict",
        "title": "16.1.2 restrict"
      },
      {
        "id": "volatile",
        "title": "16.1.3 volatile"
      },
      {
        "id": "atomic",
        "title": "16.1.4 _Atomic"
      },
      {
        "id": "storage-class-specifiers",
        "title": "16.2 Depolama Sınıfı Belirteçleri"
      },
      {
        "id": "auto",
        "title": "16.2.1 auto"
      },
      {
        "id": "static",
        "title": "16.2.2 static"
      },
      {
        "id": "extern",
        "title": "16.2.3 extern"
      },
      {
        "id": "register",
        "title": "16.2.4 register"
      },
      {
        "id": "thread_local",
        "title": "16.2.5 _Thread_local"
      }
    ],
    "text": "Beej's Guide to C Programming 16 Türler IV: Niteleyiciler ve Belirteçler Artık elimizin altında birkaç tür daha olduğuna göre, bu türlere davranışlarını kontrol eden bazı ek nitelikler kazandırabileceğimiz ortaya çıkıyor. Bunlar tür niteleyicileri (type qualifiers) ve depolama sınıfı belirteçleridir (storage-class specifiers). 16.1 Tür Niteleyicileri Bunlar sabit değerler bildirmenize ve ayrıca derleyiciye kullanabileceği optimizasyon ipuçları vermenize olanak tanır. 16.1.1 const Bu, göreceğiniz en yaygın tür niteleyicisidir. Değişkenin sabit olduğu anlamına gelir ve onu değiştirme yönündeki her türlü girişim, derleyicinin fazlasıyla öfkelenmesiyle sonuçlanır. const int x = 2; x = 4; // DERLEYİCİ KUSMA SESLERİ, bir sabite atama yapılamaz Bir const değerini değiştiremezsiniz. Genellikle const ifadesini fonksiyonların parametre listelerinde görürsünüz: void foo(const int x) { printf(\"%d\\n\", x + 30); // OK, \"x\"i değiştirmez } 16.1.1.1 const ve Pointer'lar Bu konu biraz kafa karıştırıcı olabilir, çünkü pointer'lar söz konusu olduğunda iki farklı kullanım ve iki farklı anlam vardır. Birincisi, pointer'ın işaret ettiği şeyi değiştirilemez hale getirebiliriz. Bunu, tür bildiriminde const ifadesini tür adının önüne (yıldız işaretinden önce) koyarak yaparsınız. int x[] = {10, 20}; const int *p = x; p++; // p'yi değiştirebiliriz, sorun yok *p = 30; // Derleyici hatası! İşaret ettiği şeyi değiştiremezsiniz Biraz kafa karıştırıcı olsa da, şu iki ifade birbirine eşdeğerdir: const int *p; // p'nin işaret ettiği şey değiştirilemez int const *p; // Önceki satırla aynı şekilde p'nin işaret ettiği şey değiştirilemez Harika, yani pointer'ın gösterdiği şeyi değiştiremiyoruz, ama pointer'ın kendisini değiştirebiliyoruz. Peki tam tersini istersek? Pointer'ın gösterdiği şeyi değiştirebilmek, ama pointer'ın kendisini değiştirememek istersek? Bildirimde const anahtar kelimesini yıldız işaretinden sonraya taşımanız yeterlidir: int *const p; // \"p\" değerini pointer aritmetiği ile değiştiremeyiz p++; // Derleyici hatası! Fakat işaret ettikleri değeri değiştirebiliriz: int x = 10; int *const p = &x; *p = 20; // \"x\" değerini 20 yap, sorun yok Ayrıca her iki şeyi de const yapabilirsiniz: const int *const p; // Ne p'yi ne de *p'yi değiştirebilirsiniz! Son olarak, birden fazla dolaylı yönlendirme (indirection) seviyeniz varsa, uygun seviyeleri const yapmalısınız. Bir pointer'ın const olması, işaret ettiği pointer'ın da const olması gerektiği anlamına gelmez. Aşağıdaki örneklerde olduğu gibi bunları açıkça belirtebilirsiniz: char **p; p++; // OK! (*p)++; // OK! char **const p; p++; // Hata! (*p)++; // OK! char *const *p; p++; // OK! (*p)++; // Hata! char *const *const p; p++; // Hata! (*p)++; // Hata! 16.1.1.2 const Doğruluğu (Const Correctness) Bahsetmem gereken bir şey daha var: Derleyici şuna benzer bir durumda uyarı verecektir: const int x = 20; int *p = &x; şuna benzer bir şey söyleyerek: initialization discards 'const' qualifier from pointer type target Orada ne oluyor? Ata"
  },
  {
    "file": "types-part-v-compound-literals-and-generic-selections.html",
    "title": "32 Türler Bölüm V: Bileşik Sabitler ve Jenerik Seçimler",
    "headings": [
      {
        "id": "compound-literals",
        "title": "32.1 Bileşik Sabitler (Compound Literals)"
      },
      {
        "id": "passing-unnamed-objects-to-functions",
        "title": "32.1.1 İsimsiz Nesneleri Fonksiyonlara Geçirme"
      },
      {
        "id": "unnamed-structs",
        "title": "32.1.2 İsimsiz struct Yapıları"
      },
      {
        "id": "pointers-to-unnamed-objects",
        "title": "32.1.3 İsimsiz Nesnelere Pointer'lar"
      },
      {
        "id": "unnamed-objects-and-scope",
        "title": "32.1.4 İsimsiz Nesneler ve Kapsam"
      },
      {
        "id": "silly-unnamed-object-example",
        "title": "32.1.5 Saçma Bir İsimsiz Nesne Örneği"
      },
      {
        "id": "type-generics",
        "title": "32.2 Jenerik Seçimler (Generic Selections)"
      }
    ],
    "text": "Beej's Guide to C Programming 32 Türler Bölüm V: Bileşik Sabitler ve Jenerik Seçimler Bu, türler için son bölüm! İki şey hakkında konuşacağız: İsimsiz \"anonim\" nesnelere nasıl sahip olunacağı ve bunun nasıl yararlı olduğu. Türe bağlı kodun nasıl üretileceği. Bunlar birbiriyle pek ilgili değiller, ama her ikisi de tek başlarına birer bölümü hak etmiyorlar. Ben de bir asi gibi onları buraya tıkıştırdım! 32.1 Bileşik Sabitler (Compound Literals) Bu, bir türün nesnesini bir değişkene atamadan anında (on the fly) oluşturmanıza olanak tanıyan harika bir dil özelliğidir. Basit türler, diziler, struct'lar, aklınıza ne gelirse oluşturabilirsiniz. Bunun ana kullanımlarından biri, değeri tutmak için geçici bir değişken oluşturmak istemediğinizde fonksiyonlara karmaşık argümanlar geçirmektir. Bileşik bir sabit (compound literal) oluşturmanın yolu, tür adını parantez içine almak ve ardından bir başlangıç değeri listesi (initializer list) koymaktır. Örneğin, isimsiz bir int dizisi şöyle görünebilir: (int []){1,2,3,4} Şimdi, bu kod satırı kendi başına bir şey yapmaz. 4 tane int elemandan oluşan isimsiz bir dizi oluşturur ve ardından bunları kullanmadan çöpe atar. Diziye bir başvuru (referans) saklamak için bir pointer kullanabilirdik… int *p = (int []){1 ,2 ,3 ,4}; printf(\"%d\\n\", p[1]); // 2 Ama bu bir diziye sahip olmak için biraz dolambaçlı bir yol gibi görünüyor. Yani, sadece şunu da yapabilirdik179: int p[] = {1, 2, 3, 4}; printf(\"%d\\n\", p[1]); // 2 Öyleyse daha yararlı bir örneğe göz atalım. 32.1.1 İsimsiz Nesneleri Fonksiyonlara Geçirme Bir int dizisini toplayan bir fonksiyonumuz olduğunu varsayalım: int sum(int p[], int count) { int total = 0; for (int i = 0; i < count; i++) total += p[i]; return total; } Onu çağırmak isteseydik, normalde fonksiyona geçirmek için bir dizi bildirip içine değerler saklayarak şuna benzer bir şey yapmamız gerekirdi: int a[] = {1, 2, 3, 4}; int s = sum(a, 4); Fakat isimsiz nesneler, değişkenden tamamen kaçınarak onu doğrudan fonksiyon çağrısına geçirmemize olanak tanır (yukarıda listelenen parametre adları). İnceleyin—a değişkenini ilk argüman olarak geçirdiğimiz isimsiz bir dizi ile değiştireceğiz: // p[] count // |-----------------| | int s = sum((int []){1, 2, 3, 4}, 4); Bayağı şık! 32.1.2 İsimsiz struct Yapıları struct'lar ile de benzer bir şey yapabiliriz. İlk olarak, isimsiz nesneler kullanmadan işleri yapalım. Bazı x/y koordinatlarını tutacak bir struct tanımlayacağız. Ardından bir tane oluşturup başlatıcı listesine (initializer) değerler geçireceğiz. Son olarak, değerleri yazdırmak için onu bir fonksiyona geçireceğiz: #include <stdio.h> struct coord { int x, y; }; void print_coord(struct coord c) { printf(\"%d, %d\\n\", c.x, c.y); } int main(void) { struct coord t = {.x=10, .y=20}; print_coord(t); // \"10, 20\" yazdırır } Yeterince açık, değil mi? Şimdi print_coord() fonksiyonuna geçirdiğimiz t değişkeni yerine isimsiz bir nesne kullanacak şekilde değiştirelim. t değişkenini oradan çıkarıp yerine isimsiz bir struct koyacağ"
  },
  {
    "file": "unicode-wide-characters-and-all-that.html",
    "title": "27 Unicode, Geniş Karakterler ve Bütün Bunlar",
    "headings": [
      {
        "id": "what-is-unicode",
        "title": "27.1 Unicode Nedir?"
      },
      {
        "id": "code-points",
        "title": "27.2 Kod Noktaları"
      },
      {
        "id": "encoding",
        "title": "27.3 Kodlama"
      },
      {
        "id": "src-exec-charset",
        "title": "27.4 Kaynak ve Yürütme Karakter Kümeleri"
      },
      {
        "id": "unicode-in-c",
        "title": "27.5 C Dilinde Unicode"
      },
      {
        "id": "utf8-quick",
        "title": "27.6 Ayrıntılara Dalan Konulara Geçmeden Önce UTF-8 Hakkında Hızlı Bir Not"
      },
      {
        "id": "different-character-types",
        "title": "27.7 Farklı Karakter Türleri"
      },
      {
        "id": "multibyte-characters",
        "title": "27.7.1 Çok Baytlı Karakterler"
      },
      {
        "id": "wide-characters",
        "title": "27.7.2 Geniş Karakterler"
      },
      {
        "id": "using-wide-characters-and-wchar_t",
        "title": "27.8 Geniş Karakterler ve wchar_t Kullanımı"
      },
      {
        "id": "multibyte-to-wchar_t-conversions",
        "title": "27.8.1 Çok Baytlıdan wchar_t Türüne Dönüşümler"
      },
      {
        "id": "wide-character-functionality",
        "title": "27.9 Geniş Karakter İşlevselliği"
      },
      {
        "id": "wint_t",
        "title": "27.9.1 wint_t"
      },
      {
        "id": "io-stream-orientation",
        "title": "27.9.2 G/Ç Akış Yönelimi"
      },
      {
        "id": "io-functions",
        "title": "27.9.3 G/Ç Fonksiyonları"
      },
      {
        "id": "type-conversion-functions",
        "title": "27.9.4 Tür Dönüştürme Fonksiyonları"
      },
      {
        "id": "string-and-memory-copying-functions",
        "title": "27.9.5 String ve Bellek Kopyalama Fonksiyonları"
      },
      {
        "id": "string-and-memory-comparing-functions",
        "title": "27.9.6 String ve Bellek Karşılaştırma Fonksiyonları"
      },
      {
        "id": "string-searching-functions",
        "title": "27.9.7 String Arama Fonksiyonları"
      },
      {
        "id": "lengthmiscellaneous-functions",
        "title": "27.9.8 Uzunluk / Çeşitli Fonksiyonlar"
      },
      {
        "id": "character-classification-functions",
        "title": "27.9.9 Karakter Sınıflandırma Fonksiyonları"
      },
      {
        "id": "parse-state-restartable-functions",
        "title": "27.10 Ayrıştırma Durumu, Yeniden Başlatılabilir Fonksiyonlar"
      },
      {
        "id": "unicode-encodings-and-c",
        "title": "27.11 Unicode Kodlamaları ve C"
      },
      {
        "id": "utf-8",
        "title": "27.11.1 UTF-8"
      },
      {
        "id": "utf-16-utf-32-char16_t-and-char32_t",
        "title": "27.11.2 UTF-16, UTF-32, char16_t ve char32_t"
      },
      {
        "id": "multibyte-conversions",
        "title": "27.11.3 Çok Baytlı Dönüşümler"
      },
      {
        "id": "utf-3rd-party",
        "title": "27.11.4 Üçüncü Taraf Kütüphaneler"
      }
    ],
    "text": "Beej's C Programlama Rehberi 27 Unicode, Geniş Karakterler ve Bütün Bunlar Başlamadan önce, C dilindeki bazı, öhöm, büyüme sancılarını aşmaya çalışırken bunun C dilinde aktif bir gelişim alanı olduğunu unutmayın. C23 standartlarının çıkmasıyla birlikte, buradaki güncellemeler muhtemeldir. Çoğu insan temelde \"C dilinde şu ya da bu karakter kümesini nasıl kullanırım?\" şeklindeki aldatıcı derecede basit soruyla ilgilenir. Buna geleceğiz. Ancak göreceğimiz gibi, bu durum sisteminizde zaten çalışıyor olabilir. Ya da üçüncü taraf bir kütüphaneye başvurmak zorunda kalabilirsiniz. Bu bölümde pek çok şey hakkında konuşacağız — bazıları platformdan bağımsız, bazıları ise C diline özgü. Neler inceleyeceğimize dair öncelikle bir hat belirleyelim: Unicode arka planı Karakter kodlaması (encoding) arka planı Kaynak ve Yürütme karakter kümeleri Unicode ve UTF-8 Kullanımı wchar_t, char16_t ve char32_t gibi diğer karakter türlerinin kullanımı Hadi başlayalım! 27.1 Unicode Nedir? Eskiden, ABD'de ve dünyanın pek çok yerinde bellekteki karakterler için 7-bit veya 8-bit kodlama kullanmak yaygındı. Bu, toplamda 128 veya 256 karaktere (yazdırılamayan karakterler dahil) sahip olabileceğimiz anlamına geliyordu. ABD merkezli bir dünya için bu sorun değildi, ancak meğer orada başka alfabeler de varmış — kim bilebilirdi ki? Çincede 50.000'den fazla karakter vardır ve bu bir bayta sığmaz. Böylece insanlar kendi özel karakter kümelerini temsil etmek için her türlü alternatif yöntemi geliştirdiler. Bu idare ediyordu, ancak tam bir uyumluluk kabusuna dönüştü. Bundan kaçınmak için Unicode icat edildi. Hepsine hükmedecek tek bir karakter kümesi. Yeni karakterler için alanımız asla tükenmesin diye (etkili bir şekilde) sonsuza kadar uzanır. Çince, Latince, Yunanca, çivi yazısı, satranç sembolleri, emojiler... gerçekten de hemen hemen her şey var! Ve her an daha fazlası ekleniyor! 27.2 Kod Noktaları Burada iki kavramdan bahsetmek istiyorum. Kafa karıştırıcıdır çünkü ikisi de sayıdır... Aynı şey için farklı sayılar. Ama bana katlanın. Bir karakteri temsil eden sayısal değer anlamına gelmek üzere kod noktası (code point) terimini gevşekçe tanımlayalım. (Kod noktaları yazdırılamayan kontrol karakterlerini de temsil edebilir, ancak sadece \"B\" harfi veya \"π\" karakteri gibi bir şeyi kastettiğimi varsayın.) Her kod noktası benzersiz bir karakteri temsil eder. Ve her karakterin kendisiyle ilişkili benzersiz bir sayısal kod noktası vardır. Örneğin Unicode'da 66 sayısal değeri \"B\"yi, 960 ise \"π\"yi temsil eder. Unicode olmayan diğer karakter eşlemeleri potansiyel olarak farklı değerler kullanır, ancak onları unutalım ve geleceğe, yani Unicode'a odaklanalım! Yani ilk şey bu: her karakteri temsil eden bir sayı vardır. Unicode'da bu sayılar 0'dan 1 milyonun üzerine kadar gider. Anlaştık mı? Çünkü masayı biraz devirmek üzereyiz. 27.3 Kodlama Hatırlarsanız, 8 bitlik bir bayt 0 ile 255 arasındaki (dahil) değerleri tutabilir. 66 olan \"B\" için bu harikadır — bir bayta sığar. Ancak \"π\" 960'tır ve bir ba"
  },
  {
    "file": "variable-length-arrays-vlas.html",
    "title": "30 Değişken Uzunluklu Diziler (VLA'lar)",
    "headings": [
      {
        "id": "the-basics",
        "title": "30.1 Temel Bilgiler"
      },
      {
        "id": "sizeof-and-vlas",
        "title": "30.2 sizeof ve VLA'lar"
      },
      {
        "id": "multidimensional-vlas",
        "title": "30.3 Çok Boyutlu VLA'lar"
      },
      {
        "id": "passing-one-dimensional-vlas-to-functions",
        "title": "30.4 Tek Boyutlu VLA'ları Fonksiyonlara Geçirmek"
      },
      {
        "id": "passing-multi-dimensional-vlas-to-functions",
        "title": "30.5 Çok Boyutlu VLA'ları Fonksiyonlara Geçirmek"
      },
      {
        "id": "partial-multidimensional-vlas",
        "title": "30.5.1 Kısmi Çok Boyutlu VLA'lar"
      },
      {
        "id": "compatibility-with-regular-arrays",
        "title": "30.6 Normal Dizilerle Uyumluluk"
      },
      {
        "id": "typedef-and-vlas",
        "title": "30.7 typedef ve VLA'lar"
      },
      {
        "id": "jumping-pitfalls",
        "title": "30.8 Atlama Tuzakları"
      },
      {
        "id": "vla-general-issues",
        "title": "30.9 Genel Sorunlar"
      }
    ],
    "text": "Beej's Guide to C Programming 30 Değişken Uzunluklu Diziler (VLA'lar) C, boyutu çalışma zamanında (runtime) belirlenen bir dizi tanımlamanıza imkan tanır. Bu, malloc() ile elde ettiğiniz dinamik çalışma zamanı boyutlandırmasının avantajlarını sunar, üstelik sonrasında belleği free() ile serbest bırakma derdi olmadan. Şimdi, pek çok kişi VLA'ları pek sevmez. Örneğin Linux çekirdeğinden yasaklandılar. Bunun gerekçelerine daha sonra daha ayrıntılı olarak değineceğiz. Bu, dilin isteğe bağlı bir özelliğidir. VLA'lar mevcut değilse __STDC_NO_VLA__ makrosu 1 olarak ayarlanır. (C99'da zorunluydular, ardından C11 ile isteğe bağlı hale geldiler.) #if __STDC_NO_VLA__ == 1 #error Sorry, need VLAs for this program! #endif Ancak ne GCC ne de Clang bu makroyu tanımlama zahmetine girmediğinden, bundan pek fazla yararlanamayabilirsiniz. Gelin önce bir örnekle başlayalım, ardından detaylardaki şeytana bakarız. 30.1 Temel Bilgiler Normal bir dizi, sabit bir boyutla şu şekilde tanımlanır: int v[10]; Ancak VLA'lar ile, diziyi oluşturmak için çalışma zamanında belirlenen bir boyut kullanabiliriz, şöyle ki: int n = 10; int v[n]; Şimdi, bu aynı şeymiş gibi görünüyor ve birçok açıdan öyle, ancak bu size ihtiyacınız olan boyutu hesaplama ve ardından tam da o boyutta bir dizi elde etme esnekliği sağlar. Kullanıcıdan dizinin boyutunu girmesini isteyelim ve ardından bu dizi elemanlarının her birinde indeks çarpı 10 değerini saklayalım: #include <stdio.h> int main(void) { int n; char buf[32]; printf(\"Enter a number: \"); fflush(stdout); fgets(buf, sizeof buf, stdin); n = strtoul(buf, NULL, 10); int v[n]; for (int i = 0; i < n; i++) v[i] = i * 10; for (int i = 0; i < n; i++) printf(\"v[%d] = %d\\n\", i, v[i]); } (7. satırda, sonunda bir yeni satır karakteri olmasa bile satırı çıktı vermeye zorlaması gereken bir fflush() var.) 12. satır, VLA'yı tanımladığımız yerdir—çalışma o satırı geçtiğinde, dizinin boyutu o anda n neyse ona ayarlanır. Dizi uzunluğu daha sonra değiştirilemez. Köşeli parantezlerin içine bir ifade de koyabilirsiniz: int v[x * 100]; Bazı kısıtlamalar: Dosya kapsamında (file scope) bir VLA tanımlayamazsınız ve blok kapsamında static bir VLA yapamazsınız175. Diziyi ilklendirmek için bir ilklendirme listesi (initializer list) kullanamazsınız. Ayrıca, dizi boyutu için negatif bir değer girmek tanımsız davranışa (undefined behavior) yol açar—en azından bu evrende. 30.2 sizeof ve VLA'lar sizeof operatörünün diziler de dahil olmak üzere belirli herhangi bir nesnenin bayt cinsinden boyutunu vermesine alışkınız. VLA'lar da bir istisna değildir. Temel fark, bir VLA üzerinde sizeof işleminin çalışma zamanında (runtime) yürütülmesidir; oysa değişken boyutlu olmayan bir değişkende derleme zamanında (compile time) hesaplanır. Ancak kullanımı aynıdır. Hatta alışılagelmiş dizi hilesiyle bir VLA'daki eleman sayısını bile hesaplayabilirsiniz: size_t num_elems = sizeof v / sizeof v[0]; Yukarıdaki satırdan çıkarılacak ince ve doğru bir anlam var: pointer aritmetiği tıpkı normal bir di"
  },
  {
    "file": "variables-and-statements.html",
    "title": "3 Değişkenler ve Deyimler",
    "headings": [
      {
        "id": "variables",
        "title": "3.1 Değişkenler"
      },
      {
        "id": "variable-names",
        "title": "3.1.1 Değişken İsimleri"
      },
      {
        "id": "variable-types",
        "title": "3.1.2 Değişken Türleri"
      },
      {
        "id": "boolean-types",
        "title": "3.1.3 Boolean Türleri"
      },
      {
        "id": "operators",
        "title": "3.2 Operatörler ve İfadeler"
      },
      {
        "id": "arithmetic",
        "title": "3.2.1 Aritmetik"
      },
      {
        "id": "ternary-operator",
        "title": "3.2.2 Üçlü Operatör (Ternary Operator)"
      },
      {
        "id": "pre-and-post-increment-and-decrement",
        "title": "3.2.3 Önceden ve Sonradan Artırma ve Azaltma"
      },
      {
        "id": "the-comma-operator",
        "title": "3.2.4 Virgül Operatörü"
      },
      {
        "id": "conditional-operators",
        "title": "3.2.5 Koşullu Operatörler"
      },
      {
        "id": "boolean-operators",
        "title": "3.2.6 Boolean Operatörleri"
      },
      {
        "id": "sizeof-operator",
        "title": "3.2.7 sizeof Operatörü"
      },
      {
        "id": "flow-control",
        "title": "3.3 Akış Kontrolü"
      },
      {
        "id": "ifstat",
        "title": "3.3.1 if-else Deyimi"
      },
      {
        "id": "whilestat",
        "title": "3.3.2 while Deyimi"
      },
      {
        "id": "dowhilestat",
        "title": "3.3.3 do-while Deyimi"
      },
      {
        "id": "forstat",
        "title": "3.3.4 for Deyimi"
      },
      {
        "id": "switch-statement",
        "title": "3.3.5 switch Deyimi"
      }
    ],
    "text": "Beej's Guide to C Programming 3 Değişkenler ve Deyimler “Bir dünyayı dünya yapmak için her türden insan gerekir, değil mi Padre?” “Öyledir oğlum, öyledir.” —Korsan Kaptan Thomas Bartholomew Red'den Padre'ye, Korsanlar (Pirates) Bir C programında gerçekten çok fazla şey olabilir. Evet. Ve çeşitli nedenlerle, bir programda bulabileceğiniz şeylerin bazı türlerini sınıflandırırsak, neden bahsettiğimiz konusunda net olmamız hepimiz için daha kolay olacaktır. 3.1 Değişkenler “Değişkenlerin değer tuttuğu” söylenir. Ancak bunu düşünmenin başka bir yolu da, bir değişkenin bellekteki bazı verilere atıfta bulunan insan tarafından okunabilir bir isim olduğudur. Burada bir saniye duracağız ve göstericilerin (pointers) tavşan deliğine küçük bir bakış atacağız. Endişelenmeyin. Belleği büyük bir bayt dizisi (array of bytes)33 olarak düşünebilirsiniz. Veriler bu “dizide”34 saklanır. Bir sayı tek bir bayttan büyükse, birden fazla baytta saklanır. Bellek bir dizi gibi olduğu için, belleğin her bir baytına indeksi ile atıfta bulunulabilir. Bellekteki bu indekse adres, veya konum, ya da gösterici (pointer) de denir. C'de bir değişkeniniz olduğunda, o değişkenin değeri bellekte bir yerlerde, bir adrestedir. Elbette. Sonuçta başka nerede olabilirdi ki? Ancak bir değere sayısal adresiyle atıfta bulunmak zahmetlidir, bu yüzden onun yerine ona bir isim veririz ve değişken tam olarak budur. Bütün bunları gündeme getirmemin iki nedeni var: Daha sonra pointer değişkenlerini anlamayı kolaylaştıracak—onlar diğer değişkenlerin adresini tutan değişkenlerdir! Ayrıca, daha sonra pointer'ları anlamayı kolaylaştıracak. Yani bir değişken, bellekte bir adreste saklanan bazı verilerin ismidir. 3.1.1 Değişken İsimleri Değişken isimleri için 0-9, A-Z, a-z aralığındaki tüm karakterleri ve alt çizgiyi (underscore) aşağıdaki kurallarla kullanabilirsiniz: Bir değişkeni 0-9 rakamıyla başlatamazsınız. Bir değişken adını iki alt çizgi ile başlatamazsınız. Bir değişken adını alt çizgiyi takip eden büyük A-Z harfiyle başlatamazsınız. Unicode için deneyip görün. Şartnamenin (spec) §D.2 bölümünde, tanımlayıcıların (identifiers) hangi bölümlerinde hangi Unicode kod noktası aralıklarına izin verildiğinden bahseden bazı kurallar vardır, ancak bu buraya yazılacak çok fazla şeydir ve muhtemelen zaten hiçbir zaman düşünmek zorunda kalmayacağınız bir şeydir. 3.1.2 Değişken Türleri Araç kutunuzda halihazırda bulunan dillere bağlı olarak, tür (type) fikrine aşina olabilir veya olmayabilirsiniz. Ancak C türler konusunda biraz titizdir, bu yüzden bir hatırlatma yapmalıyız. En temel türlerden bazı örnekler: Tür Örnek C Türü Tam sayı 3490 int Kayan noktalı sayı 3.14159 float35 Karakter (tekil) 'c' char Metin dizisi (String) \"Hello, world!\" char *36 C, siz istediğinizde çoğu sayısal tür arasında otomatik olarak dönüşüm yapmaya çalışır. Ancak bunun dışında, özellikle string ve sayısal türler arasındaki tüm dönüşümler manueldir. C'deki türlerin neredeyse tamamı bu türlerin varyasyonlarıdır. Bir değişkeni kullanabi"
  },
  {
    "file": "variadic-functions.html",
    "title": "25 Değişken Sayıda Argüman Alan Fonksiyonlar (Variadic Functions)",
    "headings": [
      {
        "id": "ellipses-in-function-signatures",
        "title": "25.1 Fonksiyon İmzalarında Üç Nokta (Ellipses)"
      },
      {
        "id": "getting-the-extra-arguments",
        "title": "25.2 Ek Argümanları Alma"
      },
      {
        "id": "va_list-functionality",
        "title": "25.3 va_list İşlevselliği"
      },
      {
        "id": "library-functions-that-use-va_lists",
        "title": "25.4 va_list Kullanan Kütüphane Fonksiyonları"
      },
      {
        "id": "variadic-macro-gotchas",
        "title": "25.5 Variadic Makro Püf Noktaları ve Tuzakları"
      }
    ],
    "text": "Beej's Guide to C Programming 25 Değişken Sayıda Argüman Alan Fonksiyonlar (Variadic Functions) Variadic (değişken sayıda argüman alan), rastgele sayıda argüman kabul eden fonksiyonlar için kullanılan havalı bir kelimedir. Normal bir fonksiyon belirli sayıda argüman alır, örneğin: int add(int x, int y) { return x + y; } Bunu yalnızca x ve y parametrelerine karşılık gelen tam olarak iki argümanla çağırabilirsiniz. add(2, 3); add(5, 12); Ancak daha fazlasıyla denerseniz, derleyici buna izin vermeyecektir: add(2, 3, 4); // HATA add(5); // HATA Değişken argümanlı (variadic) fonksiyonlar bu kısıtlamayı bir dereceye kadar aşarlar. Bunun ünlü bir örneğini printf() fonksiyonunda zaten görmüştük! Ona her türlü şeyi geçirebilirsiniz. printf(\"Hello, world!\\n\"); printf(\"The number is %d\\n\", 2); printf(\"The number is %d and pi is %f\\n\", 2, 3.14159); Ona kaç tane argüman verdiğinizi umursamıyor gibi görünüyor! Şey, bu tamamen doğru değil. Sıfır argüman vermek size bir hata verecektir: printf(); // HATA Bu bizi C dilindeki variadic fonksiyonların kısıtlamalarından birine götürür: en az bir argümana sahip olmalıdırlar. Ancak bunun haricinde oldukça esnektirler, hatta tıpkı printf() fonksiyonunun yaptığı gibi argümanların farklı türlere sahip olmasına bile izin verirler. Nasıl çalıştıklarını görelim! 25.1 Fonksiyon İmzalarında Üç Nokta (Ellipses) Peki sözdizimsel (syntactically) olarak nasıl çalışır? Yapacağınız şey, önce geçirilmesi zorunlu olan tüm argümanları koymaktır (ve en az bir tane olması gerektiğini unutmayın) ve bundan sonra ... koyarsınız. Tıpkı şöyle: void func(int a, ...) // Kelimenin tam anlamıyla burada 3 nokta var Bunu gösteren bazı kodlar: #include <stdio.h> void func(int a, ...) { printf(\"a is %d\\n\", a); // \"a is 2\" yazdırır } int main(void) { func(2, 3, 4, 5, 6); } Harika, a değişkenindeki o ilk argümanı alabiliyoruz, peki ya diğer argümanlar? Onlara nasıl ulaşırsınız? Eğlence işte burada başlıyor! 25.2 Ek Argümanları Alma Tüm bunların çalışması için <stdarg.h> başlık dosyasını dahil etmek isteyeceksiniz. İlk olarak, bir seferde hangi değişkene eriştiğimizi takip etmek için va_list (değişken argüman listesi) türünde özel bir değişken kullanacağız. Fikir şudur: önce va_start() çağrısıyla argümanları işlemeye başlarız, sırasıyla her argümanı va_arg() ile işleriz ve ardından bittiğinde va_end() ile işlemi tamamlarız. va_start() fonksiyonunu çağırdığınızda, ek argümanları nerede aramaya başlayacağını bilmesi için en son isimlendirilmiş parametreyi (tam olarak ... öncesindeki parametreyi) geçirmelisiniz. Ve bir sonraki argümanı almak için va_arg() fonksiyonunu çağırdığınızda, bir sonraki alınacak argümanın türünü söylemeniz gerekir. İşte rastgele sayıda tamsayıyı toplayan bir gösterim. İlk argüman toplanacak tamsayıların sayısıdır. va_arg() fonksiyonunu kaç kez çağırmamız gerektiğini anlamak için bundan yararlanacağız. #include <stdio.h> #include <stdarg.h> int add(int count, ...) { int total = 0; va_list va; va_start(va, count); // \"count\" sonrası"
  }
];
