(function () {
  const lesson = (id, title, goal, explanation, words, examples, source, extra = {}) => ({ id, title, goal, explanation, words, examples, source, ...extra });
  const unit = (id, title, subtitle, icon, color, lessons) => ({ id, title, subtitle, icon, color, lessons });

  const units = [
    unit('start', 'İlk sesler ve ilk konuşma', 'Almancayı küçük ses gruplarıyla keşfet, adını hecele ve selam ver.', 'Aa', '#58cc02', [
      lesson('alphabet-vowels', 'Alfabe 1 · A B C D E F', 'Alman alfabesini ilk harften başlayarak sırayla öğren.', 'Her harfin önce Almanca adı, sonra örnek kelimesi okunur. Türkçe ses yardımı yalnızca yaklaşık telaffuzu gösterir.', [], [], 'PDF s. 3 ve 6', { type:'alphabet', letters:[
        ['A','Apfel','🍎','apfıl','A, kelimeye göre kısa veya uzun duyulabilir.','A'],
        ['B','Ball','⚽','bal','B harfi Türkçedeki b sesine yakındır.','Be'],
        ['C','Café','☕','kafee','C yabancı kelimelerde k veya ts sesi verebilir.','Tse'],
        ['D','Dose','🥫','dooze','D harfi Türkçedeki d sesine yakındır.','De'],
        ['E','Elefant','🐘','elefant','E kısa, uzun veya zayıf bir e sesi olabilir.','E'],
        ['F','Fisch','🐟','fiş','F harfi Türkçedeki f gibi okunur.','Ef']
      ], sequence:['A','B','C','D','E','F'] }),
      lesson('alphabet-consonants-1', 'Alfabe 2 · G H I J K L M', 'Alfabeyi G harfinden M harfine kadar sırayla sürdür.', 'Harf adını ve örnek kelimeyi dinle; ardından yalnızca duyduğun sese göre seçim yap.', [], [], 'PDF s. 3 ve 6', { type:'alphabet', letters:[
        ['G','Gabel','🍴','gaabıl','G çoğu kelimede g sesidir.','Ge'],
        ['H','Haus','🏠','haus','H kelime başında nefesli h olarak duyulur.','Ha'],
        ['I','Insel','🏝️','inzıl','I kısa veya uzun i sesi verebilir.','İ'],
        ['J','Jacke','🧥','yake','J Almancada çoğunlukla Türkçedeki y gibi okunur.','Yot'],
        ['K','Katze','🐈','katse','K harfi Türkçedeki k sesine yakındır.','Ka'],
        ['L','Lampe','💡','lampe','L harfi açık bir l sesiyle okunur.','El'],
        ['M','Maus','🐭','maus','M harfi Türkçedeki m gibi okunur.','Em']
      ], sequence:['G','H','I','J','K','L','M'] }),
      lesson('alphabet-consonants-2', 'Alfabe 3 · N O P Q R S T', 'Alfabeyi N harfinden T harfine kadar sırayla sürdür.', 'Önce dinle, sonra harfi kelimenin başındaki sesle ilişkilendir.', [], [], 'PDF s. 3 ve 6', { type:'alphabet', letters:[
        ['N','Nase','👃','naaze','N harfi Türkçedeki n gibi okunur.','En'],
        ['O','Orange','🍊','oran-je','O kısa veya uzun o sesi olabilir.','O'],
        ['P','Pizza','🍕','pitsa','P Türkçedeki p sesine yakındır.','Pe'],
        ['Q','Quelle','⛲','kvele','Q neredeyse her zaman u ile birlikte “kv” okunur.','Ku'],
        ['R','Radio','📻','raadio','R bölgeye göre gırtlaktan veya dil ucuyla duyulabilir.','Er'],
        ['S','Sonne','☀️','zone','S kelime başında sesli harften önce çoğu zaman z gibi duyulur.','Es'],
        ['T','Tasse','☕','tase','T harfi Türkçedeki t sesine yakındır.','Te']
      ], sequence:['N','O','P','Q','R','S','T'] }),
      lesson('alphabet-consonants-3', 'Alfabe 4 · U V W X Y Z', 'Alman alfabesinin son altı harfini sırayla öğren.', 'Özellikle V, W ve Z harflerinin Almanca seslerine dikkat et.', [], [], 'PDF s. 3 ve 6', { type:'alphabet', letters:[
        ['U','Uhr','⌚','uur','U uzun olduğunda belirgin bir “uu” sesi verir.','U'],
        ['V','Vater','👨','faatır','V yerli Almanca kelimelerde çoğunlukla f okunur.','Fau'],
        ['W','Wasser','💧','vasır','W Almancada Türkçedeki v gibi okunur.','Ve'],
        ['X','Xylophon','🎼','ksülofoon','X çoğunlukla “ks” sesini verir.','İks'],
        ['Y','Yoga','🧘','yooga','Y yabancı kelimelerde y veya ü sesine yaklaşabilir.','Üpsilon'],
        ['Z','Zug','🚆','tsuuk','Z Almancada her zaman “ts” sesine yakındır.','Tset']
      ], sequence:['U','V','W','X','Y','Z'] }),
      lesson('alphabet-special', 'Özel harfler · Ä Ö Ü ß', 'Umlautları ve Eszett harfini kelime içinde doğru söyle.', 'Ä, Ö ve Ü ayrı seslerdir. ß harfinin adı Eszett’tir; “ss” gibi duyulur.', [], [], 'PDF s. 3 ve 6', { type:'alphabet', letters:[
        ['Ä','Äpfel','🍎','epfıl','Ä çoğunlukla Türkçedeki e sesine yaklaşır.','Ä'],
        ['Ö','Öl','🫗','ööl','Ö, Türkçedeki ö sesine yakındır; burada uzun okunur.','Ö'],
        ['Ü','Übung','✍️','übung','Ü, Türkçedeki ü sesine yakındır.','Ü'],
        ['ß','Straße','🛣️','ştraase','ß harfinin adı Eszett’tir ve “ss” gibi okunur. Straße yaklaşık “ştraase” duyulur.','Eszett']
      ], sequence:['Ä','Ö','Ü','ß'] }),
      lesson('pronunciation-groups-1', 'Telaffuz 1 · sch ch sp st', 'Sık kullanılan sessiz harf gruplarını kelimelerle öğren.', 'Harfleri tek tek değil, birlikte oluşturdukları sesi dinle ve tekrar et.', [], [], 'A1 telaffuz kuralları', { type:'alphabet', letters:[
        ['sch','Schule','🏫','şuule','sch harf grubu birlikte Türkçedeki “ş” gibi okunur.','ş'],
        ['ch','ich','👤','ih','ch, i ve e gibi ince seslerden sonra yumuşak bir boğaz sesi verir. Türkçede tam karşılığı yoktur.','yumuşak ch'],
        ['sp','Sport','⚽','şport','sp kelime başında çoğunlukla “şp” okunur.','şp'],
        ['st','Straße','🛣️','ştraase','st kelime başında çoğunlukla “şt” okunur.','şt'],
        ['tsch','Deutsch','🇩🇪','doyç','tsch harf grubu Türkçedeki “ç” sesine yakındır.','ç']
      ], sequence:['sch','ch','sp','st','tsch'] }),
      lesson('pronunciation-groups-2', 'Telaffuz 2 · ei ie eu äu au', 'Sık kullanılan sesli harf gruplarını ayırt et.', 'İki harf yan yana geldiğinde yeni bir ses oluşturabilir. Kelimeyi dinleyip bütünüyle tekrar et.', [], [], 'A1 telaffuz kuralları', { type:'alphabet', letters:[
        ['ei','mein','🙋','mayn','ei harf grubu “ay” okunur.','ay'],
        ['ie','Liebe','❤️','liibe','ie harf grubu uzun bir “i” sesi verir.','uzun i'],
        ['eu','Deutsch','🇩🇪','doyç','eu harf grubu “oy” okunur.','oy'],
        ['äu','Häuser','🏘️','hoyzır','äu harf grubu da “oy” okunur.','oy'],
        ['au','Haus','🏠','haus','au harf grubu Türkçedeki “au” seslerine yakındır.','au']
      ], sequence:['ei','ie','eu','äu','au'] }),
      lesson('pronunciation-groups-3', 'Telaffuz 3 · z w v j qu pf ng', 'Almancaya özgü diğer temel ses birleşimlerini söyle.', 'Örnek kelimeyi dinle, mikrofona oku; yanlışsa aynı kelimeyi yeniden dene.', [], [], 'A1 telaffuz kuralları', { type:'alphabet', letters:[
        ['z','Zeit','⏰','tsayt','z Almancada “ts” okunur.','ts'],
        ['w','Wasser','💧','vasır','w Almancada Türkçedeki v gibi okunur.','v'],
        ['v','Vater','👨','faatır','v yerli Almanca kelimelerde çoğunlukla f okunur.','f'],
        ['j','ja','✅','yaa','j Almancada Türkçedeki y gibi okunur.','y'],
        ['qu','Quelle','⛲','kvele','qu birlikte “kv” okunur.','kv'],
        ['pf','Apfel','🍎','apfıl','pf sesinde p ve f art arda, tek akışta söylenir.','pf'],
        ['ng','lang','📏','lang','ng, kelimenin sonunda burundan gelen tek bir ses gibi duyulur.','ng']
      ], sequence:['z','w','v','j','qu','pf','ng'] }),
      lesson('pronunciation-groups-4', 'Telaffuz 4 · Uzunluk ve kelime sonu', 'Sesin uzunluğunu ve kelime sonundaki değişimleri fark et.', 'Almancada h bazen sesi uzatır; çift ünsüzden önceki sesli çoğunlukla kısa okunur. Kelime sonundaki b, d ve g sertleşebilir.', [], [], 'A1 telaffuz kuralları', { type:'alphabet', letters:[
        ['h','sehen','👀','zeen','Sesli harften sonraki h çoğu zaman ayrı okunmaz; önceki sesi uzatır.','uzatma'],
        ['mm','kommen','🚶','komın','Çift ünsüz, önceki seslinin kısa okunacağını gösterir.','kısa ses'],
        ['ck','Jacke','🧥','yake','ck birlikte k sesi verir; önceki sesli kısa okunur.','k'],
        ['-ig','König','👑','könih','Standart Almancada kelime sonundaki -ig çoğunlukla yumuşak ch sesine yaklaşır.','ih'],
        ['-er','Lehrer','👨‍🏫','leera','Kelime sonundaki -er, konuşmada zayıf bir “a” sesine yaklaşabilir.','a'],
        ['-b','Dieb','🕵️','diip','Kelime sonundaki b çoğunlukla p gibi sertleşir.','p'],
        ['-d','Hund','🐕','hunt','Kelime sonundaki d çoğunlukla t gibi sertleşir.','t'],
        ['-g','Tag','📅','taak','Kelime sonundaki g birçok standart kelimede k gibi sertleşir.','k']
      ], sequence:['h','mm','ck','-ig','-er','-b','-d','-g'] }),
      lesson('spell-name', 'Adını hecele', 'Adını Alman alfabesinin harf adlarıyla söyle.', 'Almanya’da telefonda, kursta ve resmî işlemlerde adını hecelemek çok kullanılır. Wie schreibt man das? sorusuna harfleri tek tek söyle.', [['Wie schreibt man das?','Bu nasıl yazılır?'],['Bitte buchstabieren Sie.','Lütfen heceleyin.'],['Mein Name ist …','Benim adım …'],['A – Y – L – I – N','Aylin’in hecelenişi']], ['Wie schreibt man Ihren Namen?','Mein Name ist Aylin: A – Y – L – I – N.','Können Sie das bitte buchstabieren?'], 'PDF s. 3–4'),
      lesson('greetings', 'Selamlaşma', 'Günün saatine göre selam ver.', 'Hallo her zaman kullanılabilir. Guten Morgen sabah, Guten Tag gündüz, Guten Abend akşam söylenir.', [['Hallo!','Merhaba!'],['Guten Morgen!','Günaydın!'],['Guten Tag!','İyi günler!'],['Guten Abend!','İyi akşamlar!'],['Tschüss!','Hoşça kal!']], ['Hallo! Wie geht es dir?','Guten Morgen, Frau Weber!','Tschüss! Bis morgen.'], 'PDF s. 4'),
      lesson('introduce', 'Kendini tanıt', 'İsim, ülke ve yaşını söyle.', 'Kısa kalıpları sırayla birleştir: isim, köken, yaş ve yaşadığın şehir.', [['Ich heiße …','Benim adım …'],['Ich komme aus …','… ülkesinden geliyorum.'],['Ich bin … Jahre alt.','… yaşındayım.'],['Ich wohne in …','… şehrinde oturuyorum.']], ['Ich heiße Elif.','Ich komme aus der Türkei.','Ich wohne in Berlin.'], 'PDF s. 4–5', { checkpoint: true })
    ]),
    unit('sentence', 'İlk cümlenin motoru', 'Özne ve en temel iki fiille doğru cümle kur.', '✦', '#1cb0f6', [
      lesson('pronouns', 'Kişi zamirleri', 'Cümleyi kimin yaptığını göster.', 'Almancada fiil özneye göre değişir. Bu nedenle ich, du, er/sie/es ve wir ayrımını iyi öğren.', [['ich','ben'],['du','sen'],['er / sie / es','o'],['wir','biz'],['ihr','siz'],['Sie','siz – resmî']], ['Ich lerne Deutsch.','Du wohnst in Hanau.','Wir arbeiten heute.'], 'PDF s. 7–10'),
      lesson('sein', 'sein · olmak', 'Durum ve kimlik anlat.', 'sein düzensizdir. Kalıpları bütün olarak öğren: ich bin, du bist, er ist, wir sind.', [['ich bin','ben …im'],['du bist','sen …sin'],['er ist','o …dir'],['wir sind','biz …iz'],['Sie sind','siz …siniz']], ['Ich bin müde.','Du bist nett.','Wir sind im Kurs.'], 'PDF s. 19'),
      lesson('haben', 'haben · sahip olmak', 'Sahip olduğun şeyleri söyle.', 'haben de düzensizdir: ich habe, du hast, er/sie hat, wir haben.', [['ich habe','benim var'],['du hast','senin var'],['sie hat','onun var'],['wir haben','bizim var']], ['Ich habe eine Frage.','Du hast ein Handy.','Wir haben Zeit.'], 'PDF s. 19'),
      lesson('first-sentences', 'İlk cümle kontrolü', 'Özne + fiil + bilgi sırasını uygula.', 'Düz bir cümlede çekimli fiil çoğunlukla ikinci sıradadır.', [['Ich lerne Deutsch.','Ben Almanca öğreniyorum.'],['Er wohnt in Köln.','O Köln’de oturuyor.'],['Wir haben einen Kurs.','Bizim bir kursumuz var.'],['Sie ist Lehrerin.','O öğretmen.']], ['Ich bin heute zu Hause.','Du hast eine Frage.','Wir lernen zusammen.'], 'PDF s. 7–10 ve 19', { checkpoint: true })
    ]),
    unit('verbs', 'Fiillerle günlük hayat', 'Düzenli ve düzensiz fiilleri günlük cümlelerde kullan.', '↻', '#ce82ff', [
      lesson('regular-verbs', 'Düzenli fiil çekimi', 'Kişiye uygun fiil ekini seç.', 'Fiil köküne ich için -e, du için -st, er/sie/es için -t, wir/Sie için -en gelir.', [['ich mache','ben yapıyorum'],['du machst','sen yapıyorsun'],['er spielt','o oynuyor'],['wir kochen','biz pişiriyoruz']], ['Ich trinke Wasser.','Markus spielt Fußball.','Wir kochen eine Suppe.'], 'PDF s. 7–10'),
      lesson('irregular-verbs', 'Düzensiz fiiller', 'Kök ses değişimini fark et.', 'Bazı fiiller du ve er/sie/es biçiminde ses değiştirir: fahren → fährst, lesen → liest.', [['du fährst','sen gidiyorsun'],['er liest','o okuyor'],['sie schläft','o uyuyor'],['du sprichst','sen konuşuyorsun']], ['Du fährst nach Berlin.','Er liest ein Buch.','Sie schläft lange.'], 'PDF s. 12–15'),
      lesson('daily-verbs', 'Günlük eylemler', 'En sık kullanılan fiilleri öğren.', 'Fiili yalnız değil, kısa bir cümle içinde öğrenmek daha kalıcıdır.', [['arbeiten','çalışmak'],['lernen','öğrenmek'],['essen','yemek'],['trinken','içmek'],['schlafen','uyumak'],['gehen','gitmek']], ['Ich arbeite am Montag.','Wir lernen Deutsch.','Das Kind schläft.'], 'PDF s. 13–15'),
      lesson('jobs', 'Meslekler', 'Mesleğini sor ve söyle.', 'Meslek söylerken çoğunlukla Von Beruf bin ich … kalıbı kullanılır.', [['der Koch','aşçı'],['die Ärztin','kadın doktor'],['der Kellner','garson'],['die Lehrerin','kadın öğretmen'],['der Mechaniker','tamirci']], ['Was sind Sie von Beruf?','Ich bin Koch.','Sie arbeitet als Ärztin.'], 'PDF s. 16–18', { checkpoint: true })
    ]),
    unit('nouns', 'İsimler ve artikeller', 'Nesneleri artikeli, çoğulu ve rengiyle öğren.', '◫', '#ff9600', [
      lesson('articles', 'der, die, das', 'Her ismi artikeliyle öğren.', 'Almanca isimler büyük harfle başlar ve artikel ile öğrenilir.', [['der Tisch','masa'],['die Lampe','lamba'],['das Buch','kitap'],['das Auto','araba']], ['Der Tisch ist groß.','Die Lampe ist neu.','Das Buch ist interessant.'], 'PDF s. 23–26'),
      lesson('plural', 'Çoğul isimler', 'Tekil ve çoğul biçimi ayır.', 'Çoğul ekleri değişebilir; fakat bütün çoğul isimlerin belirli artikeli die olur.', [['das Buch – die Bücher','kitap – kitaplar'],['die Lampe – die Lampen','lamba – lambalar'],['der Stuhl – die Stühle','sandalye – sandalyeler'],['das Auto – die Autos','araba – arabalar']], ['Das ist ein Buch.','Das sind Bücher.','Die Autos sind neu.'], 'PDF s. 24–26'),
      lesson('colors', 'Renkler', 'Nesnelerin rengini söyle.', 'sein fiilinden sonra renk yalın hâlde kullanılır: Das Auto ist rot.', [['rot','kırmızı'],['blau','mavi'],['grün','yeşil'],['schwarz','siyah'],['weiß','beyaz'],['gelb','sarı']], ['Das Fahrrad ist rot.','Die Tasche ist blau.','Der Stift ist schwarz.'], 'PDF s. 25'),
      lesson('school-objects', 'Okul ve eşyalar', 'Sınıftaki nesneleri tanı.', 'İsimleri artikel ve çoğuluyla tekrar et.', [['der Bleistift','kurşun kalem'],['das Heft','defter'],['die Schere','makas'],['der Computer','bilgisayar'],['die Tasche','çanta']], ['Das ist ein Bleistift.','Ich brauche ein Heft.','Die Schere liegt hier.'], 'PDF s. 11, 20 ve 24–26', { checkpoint: true })
    ]),
    unit('time', 'Sayılar ve zaman', 'Sayıları, saati ve takvimi günlük hayatta kullan.', '12', '#ff4b4b', [
      lesson('numbers-small', 'Sayılar 0–20', 'Telefon, yaş ve fiyat söyle.', 'Önce 0–12, sonra 13–20 sayılarını sesli tekrar et.', [['null','sıfır'],['eins','bir'],['zwei','iki'],['zehn','on'],['zwölf','on iki'],['zwanzig','yirmi']], ['Ich bin zwanzig Jahre alt.','Das kostet zehn Euro.','Ich habe zwei Kinder.'], 'PDF s. 27–28'),
      lesson('numbers-big', 'Sayılar 21–100', 'İki basamaklı sayıları kur.', 'Almancada önce birlik, sonra und, sonra onluk gelir: 24 = vier-und-zwanzig.', [['einundzwanzig','yirmi bir'],['achtunddreißig','otuz sekiz'],['fünfundvierzig','kırk beş'],['neunundneunzig','doksan dokuz'],['hundert','yüz']], ['Ich bin achtunddreißig Jahre alt.','Das kostet neunundzwanzig Euro.','Zimmer einundzwanzig.'], 'PDF s. 29–30'),
      lesson('clock', 'Saatler', 'Tam, buçuk ve çeyrek saat söyle.', 'Resmî saatte doğrudan sayı; günlük dilde vor, nach, halb ve Viertel kullanılır.', [['Es ist sieben Uhr.','Saat yedi.'],['Es ist halb acht.','Saat yedi buçuk.'],['Es ist Viertel nach acht.','Sekizi çeyrek geçiyor.'],['Es ist Viertel vor neun.','Dokuza çeyrek var.']], ['Wie spät ist es?','Es ist halb acht.','Der Kurs beginnt um neun Uhr.'], 'PDF s. 32–36'),
      lesson('calendar', 'Günler, aylar ve mevsimler', 'Tarih ve zamanı takvimle anlat.', 'Günlerde am, aylarda ve mevsimlerde im kullanılır.', [['Montag','Pazartesi'],['Samstag','Cumartesi'],['Januar','Ocak'],['August','Ağustos'],['der Frühling','ilkbahar'],['der Sommer','yaz'],['der Herbst','sonbahar'],['der Winter','kış']], ['Am Montag arbeite ich.','Im August habe ich Urlaub.','Im Winter ist es kalt.'], 'PDF s. 37 + A1 takvim genişletmesi', { checkpoint: true })
    ]),
    unit('routine', 'Günlük düzen', 'Gününü saat ve ayrılabilen fiillerle anlat.', '☀', '#2b70c9', [
      lesson('routine-morning', 'Sabah rutini', 'Sabah yaptıklarını sırayla söyle.', 'Zaman ifadesi cümlenin başındaysa fiil yine ikinci yerde kalır.', [['aufstehen','kalkmak'],['frühstücken','kahvaltı yapmak'],['duschen','duş almak'],['zur Arbeit fahren','işe gitmek']], ['Ich stehe um sieben Uhr auf.','Dann frühstücke ich.','Um acht Uhr fahre ich zur Arbeit.'], 'PDF s. 13, 31 ve 73'),
      lesson('separable-verbs', 'Ayrılabilen fiiller', 'Ön eki cümlenin sonuna taşı.', 'aufstehen → Ich stehe auf. einkaufen → Wir kaufen ein.', [['aufstehen','kalkmak'],['einkaufen','alışveriş yapmak'],['anrufen','telefon etmek'],['fernsehen','televizyon izlemek'],['zumachen','kapatmak']], ['Ich stehe früh auf.','Wir kaufen am Samstag ein.','Er ruft seine Mutter an.'], 'PDF s. 31'),
      lesson('time-adverbs', 'Zaman zarfları', 'Olayların ne zaman olduğunu söyle.', 'jetzt, heute, morgen ve später gibi zarflar cümlenin zamanını belirler.', [['jetzt','şimdi'],['heute','bugün'],['morgen','yarın'],['später','daha sonra'],['am Wochenende','hafta sonunda']], ['Jetzt lerne ich Deutsch.','Morgen arbeite ich nicht.','Am Wochenende kaufe ich ein.'], 'PDF s. 37 ve 73'),
      lesson('weekly-plan', 'Haftalık plan', 'Gün ve saatle program anlat.', 'am + gün, um + saat kalıplarını birlikte kullan.', [['am Montag','Pazartesi günü'],['um acht Uhr','saat sekizde'],['jeden Tag','her gün'],['am Wochenende','hafta sonunda']], ['Am Montag arbeite ich.','Der Kurs beginnt um acht Uhr.','Am Wochenende schlafe ich lange.'], 'PDF s. 37', { checkpoint: true })
    ]),
    unit('modal', 'Yetenek, zorunluluk ve istek', 'Modal fiillerle daha doğal konuş.', '◇', '#00a8a8', [
      lesson('can-must', 'können ve müssen', 'Yetenek ve zorunluluk söyle.', 'Modal fiil çekilir; asıl fiil yalın hâlde cümlenin sonunda kalır.', [['ich kann','yapabilirim'],['du kannst','yapabilirsin'],['ich muss','yapmalıyım'],['wir müssen','yapmalıyız']], ['Ich kann gut schwimmen.','Du musst heute arbeiten.','Wir müssen Deutsch lernen.'], 'PDF s. 42–47'),
      lesson('want-like', 'wollen ve möchten', 'İsteklerini doğrudan veya nazikçe söyle.', 'möchten daha nazik bir istektir; restoranda çok kullanılır.', [['ich will','istiyorum'],['wir wollen','istiyoruz'],['ich möchte','rica ederek istiyorum'],['möchten Sie?','ister misiniz?']], ['Ich möchte einen Tee.','Wir wollen ins Kino gehen.','Möchten Sie etwas trinken?'], 'PDF s. 42–47'),
      lesson('should-may', 'sollen ve dürfen', 'Tavsiye, görev ve izin anlat.', 'sollen başkasının beklentisini, dürfen izin durumunu gösterir.', [['du sollst','yapmalısın'],['wir sollen','yapmalıyız'],['ich darf','izinliyim'],['darf ich?','izin var mı?']], ['Du sollst mehr lernen.','Darf ich hier parken?','Die Kinder dürfen spielen.'], 'PDF s. 42–47'),
      lesson('modal-review', 'Modal fiil görevi', 'Modal fiil + asıl fiil sırasını pekiştir.', 'Cümleyi kurarken çekimli modal fiili ikinci, asıl fiili son sıraya yerleştir.', [['Ich kann Deutsch sprechen.','Almanca konuşabilirim.'],['Wir müssen heute lernen.','Bugün çalışmalıyız.'],['Darf ich hier sitzen?','Burada oturabilir miyim?'],['Ich möchte Kaffee trinken.','Kahve içmek istiyorum.']], ['Er kann gut kochen.','Wir wollen Fußball spielen.','Du musst früh aufstehen.'], 'PDF s. 43–48', { checkpoint: true })
    ]),
    unit('questions', 'Sorular ve olumsuzluk', 'Bilgi iste, cevap ver ve hayır de.', '?', '#a05cf5', [
      lesson('w-questions', 'W-Fragen', 'Doğru soru kelimesini seç.', 'W-kelimesinden sonra çekimli fiil, ardından özne gelir.', [['Wie?','nasıl?'],['Wo?','nerede?'],['Woher?','nereden?'],['Wann?','ne zaman?'],['Warum?','neden?'],['Was?','ne?']], ['Wie heißen Sie?','Wo wohnen Sie?','Warum lernen Sie Deutsch?'], 'PDF s. 58–63'),
      lesson('yes-no', 'Evet-hayır soruları', 'Fiili başa getirerek soru sor.', 'Bu sorularda soru kelimesi yoktur; çekimli fiil birinci sıraya gelir.', [['Kommst du?','Geliyor musun?'],['Haben Sie Zeit?','Vaktiniz var mı?'],['Bist du müde?','Yorgun musun?'],['Kann er schwimmen?','Yüzebilir mi?']], ['Wohnst du in Berlin?','Haben Sie eine Frage?','Möchtest du Kaffee?'], 'PDF s. 4–5 ve 57'),
      lesson('negation', 'nicht ve kein', 'Cümleyi doğru biçimde olumsuz yap.', 'Artikel alan isimlerde kein; fiil, sıfat ve özel isimlerde çoğunlukla nicht kullanılır.', [['kein Buch','kitap yok'],['keine Lampe','lamba yok'],['nicht neu','yeni değil'],['nicht arbeiten','çalışmamak']], ['Ich lese kein Buch.','Er braucht keine Lampe.','Das Auto ist nicht neu.'], 'PDF s. 50–54'),
      lesson('question-dialogue', 'Mini soru-cevap', 'Soruyu anla ve tam cümleyle cevapla.', 'Tek kelime yerine kısa ama tam bir cümle kur.', [['Wo wohnen Sie?','Nerede oturuyorsunuz?'],['Ich wohne in Bonn.','Bonn’da oturuyorum.'],['Was trinken Sie?','Ne içiyorsunuz?'],['Ich trinke Wasser.','Su içiyorum.']], ['Wie heißen Sie? – Ich heiße Aylin.','Woher kommen Sie? – Ich komme aus Syrien.','Arbeiten Sie? – Ja, ich arbeite.'], 'PDF s. 57–64', { checkpoint: true })
    ]),
    unit('people', 'Aile, kişiler ve sağlık', 'İnsanları tanıt ve temel sağlık ihtiyacını anlat.', '☺', '#e06f95', [
      lesson('family', 'Aile üyeleri', 'Ailendeki kişileri tanıt.', 'mein/meine ile aile üyelerini bağla.', [['die Mutter','anne'],['der Vater','baba'],['die Schwester','kız kardeş'],['der Bruder','erkek kardeş'],['das Kind','çocuk']], ['Das ist meine Mutter.','Ich habe einen Bruder.','Meine Schwester heißt Lea.'], 'PDF s. 65'),
      lesson('possessive', 'mein ve meine', 'Bir şeyin sana ait olduğunu söyle.', 'der/das isimlerle mein, die ve çoğul isimlerle meine kullanılır.', [['mein Vater','babam'],['meine Mutter','annem'],['mein Kind','çocuğum'],['meine Eltern','ebeveynlerim']], ['Mein Vater arbeitet.','Meine Mutter heißt Fatma.','Meine Eltern wohnen in Ankara.'], 'PDF s. 65'),
      lesson('body', 'Vücut bölümleri', 'Temel vücut kelimelerini söyle.', 'Sağlık konuşmalarında artikel ve iyelik yapısını birlikte kullan.', [['der Kopf','baş'],['das Auge','göz'],['der Arm','kol'],['die Hand','el'],['das Bein','bacak']], ['Mein Kopf tut weh.','Das ist meine Hand.','Ich habe zwei Augen.'], 'PDF s. 85–87'),
      lesson('health', 'Doktorda temel iletişim', 'Basit rahatsızlık ve ihtiyacını anlat.', 'wehtun ağrı ifade eder; ich brauche ile ihtiyacını söylersin.', [['Ich bin krank.','Hastayım.'],['Mein Kopf tut weh.','Başım ağrıyor.'],['Ich brauche einen Arzt.','Doktora ihtiyacım var.'],['Ich habe Fieber.','Ateşim var.']], ['Guten Tag, ich bin krank.','Mein Rücken tut weh.','Ich brauche ein Medikament.'], 'PDF s. 21 ve 85', { checkpoint: true })
    ]),
    unit('food', 'Yemek, restoran ve alışveriş', 'Yiyecek seç, sipariş ver ve alışveriş yap.', '☕', '#f2a900', [
      lesson('food-words', 'Yiyecek ve içecekler', 'Temel gıda kelimelerini öğren.', 'Her ismi artikeliyle ve bir kullanım cümlesiyle öğren.', [['das Brot','ekmek'],['der Käse','peynir'],['die Milch','süt'],['das Wasser','su'],['der Apfel','elma'],['das Ei','yumurta']], ['Ich esse Brot und Käse.','Sie trinkt Wasser.','Zum Frühstück esse ich ein Ei.'], 'PDF s. 66–68'),
      lesson('breakfast', 'Kahvaltı konuşması', 'Ne yiyip içtiğini söyle.', 'essen ve trinken fiillerini tam cümle içinde kullan.', [['zum Frühstück','kahvaltıda'],['essen','yemek'],['trinken','içmek'],['gern','severek']], ['Zum Frühstück trinke ich Tee.','Ich esse gern Käse.','Was trinkst du?'], 'PDF s. 66–68'),
      lesson('restaurant', 'Restoranda sipariş', 'Nazikçe sipariş ver ve hesap iste.', 'Ich möchte … sipariş için güvenli ve nazik bir kalıptır.', [['Ich möchte …','… istiyorum.'],['die Speisekarte','menü'],['die Rechnung','hesap'],['Zahlen, bitte!','Hesap lütfen!']], ['Ich möchte eine Suppe.','Noch ein Wasser, bitte.','Die Rechnung, bitte.'], 'PDF s. 69–75'),
      lesson('shopping', 'Süpermarket ve emir cümlesi', 'Fiyat sor ve kısa yönerge ver.', 'Imperativde fiil başta gelir: Nimm!, Nehmen Sie!, Kauft!', [['Wie viel kostet das?','Bu ne kadar?'],['Das kostet drei Euro.','Bu üç avro.'],['Nehmen Sie …','… alın.'],['Kaufen Sie …','… satın alın.']], ['Wie viel kostet die Milch?','Nehmen Sie zwei Äpfel.','Kaufen Sie bitte Brot.'], 'PDF s. 69–75', { checkpoint: true })
    ]),
    unit('home', 'Ev ve çevre', 'Evin bölümlerini, eşyaları ve temel yer bilgisini anlat.', '⌂', '#28a87d', [
      lesson('rooms', 'Odalar', 'Evin bölümlerini tanı.', 'Zimmer isimlerini artikel ve im kalıbıyla öğren.', [['das Wohnzimmer','oturma odası'],['das Schlafzimmer','yatak odası'],['die Küche','mutfak'],['das Bad','banyo'],['der Balkon','balkon']], ['Das ist das Wohnzimmer.','Ich koche in der Küche.','Das Bad ist klein.'], 'PDF s. 56 ve 83–84'),
      lesson('furniture', 'Ev eşyaları', 'Evinde neler olduğunu anlat.', 'Ich habe … ile eşyalarını söyle.', [['das Sofa','kanepe'],['der Tisch','masa'],['das Bett','yatak'],['der Schrank','dolap'],['die Lampe','lamba']], ['Ich habe ein Sofa.','Das Bett ist im Schlafzimmer.','Die Lampe ist neu.'], 'PDF s. 56 ve 83–84'),
      lesson('where', 'Nerede? · temel yer kalıpları', 'Nesnelerin yerini söyle.', 'A1 düzeyinde im, auf ve neben kalıplarını bütün olarak öğren.', [['im Zimmer','odada'],['auf dem Tisch','masanın üstünde'],['neben der Tür','kapının yanında'],['in der Küche','mutfakta']], ['Das Buch liegt auf dem Tisch.','Die Lampe steht neben dem Sofa.','Ich bin in der Küche.'], 'PDF s. 21, 40, 56 ve 83'),
      lesson('hotel-home', 'Otel ve konaklama', 'Oda, fiyat ve hizmet hakkında bilgi sor.', 'Können Sie …? ve Gibt es …? kalıplarıyla nazik soru kur.', [['Ich brauche ein Zimmer.','Bir odaya ihtiyacım var.'],['Was kostet das Zimmer?','Oda ne kadar?'],['Gibt es WLAN?','Kablosuz internet var mı?'],['Wo ist das Hotel?','Otel nerede?']], ['Guten Tag, ich brauche ein Zimmer.','Gibt es ein Frühstück?','Was kostet eine Nacht?'], 'PDF s. 57 ve 83–84', { checkpoint: true })
    ]),
    unit('past', 'Geçmiş zaman ve A1 finali', 'Dün yaptıklarını anlat ve bütün A1 becerilerini birleştir.', '✓', '#3749a7', [
      lesson('perfect-haben', 'Perfekt · haben', 'Geçmişte yaptığın eylemi anlat.', 'haben çekimli olarak ikinci yerde, Partizip II cümlenin sonunda bulunur.', [['ich habe gemacht','yaptım'],['ich habe gelernt','öğrendim'],['ich habe gekocht','pişirdim'],['ich habe gespielt','oynadım']], ['Ich habe Deutsch gelernt.','Wir haben Suppe gekocht.','Er hat Fußball gespielt.'], 'PDF s. 77–79'),
      lesson('perfect-sein', 'Perfekt · sein', 'Hareket ve durum değişimini geçmişte anlat.', 'Yer değiştirme bildiren bazı fiiller sein ile kurulur.', [['ich bin gegangen','gittim'],['wir sind gefahren','gittik/sürdük'],['sie ist gekommen','geldi'],['er ist aufgestanden','kalktı']], ['Ich bin nach Hause gegangen.','Wir sind nach Köln gefahren.','Sie ist früh aufgestanden.'], 'PDF s. 77–79'),
      lesson('perfect-story', 'Dün ne yaptın?', 'Geçmiş olayları sırayla anlat.', 'gestern, dann ve am Abend ile kısa bir günlük oluştur.', [['gestern','dün'],['zuerst','önce'],['dann','sonra'],['am Abend','akşam']], ['Gestern habe ich gearbeitet.','Dann bin ich nach Hause gefahren.','Am Abend habe ich ferngesehen.'], 'PDF s. 79–82'),
      lesson('a1-final', 'A1 bitirme görevi', 'Kendini tanıt, soru sor, günlük hayatı ve geçmişi anlat.', 'Bu kontrol; kelime, gramer, okuma ve cümle kurma becerilerini birlikte ölçer.', [['Ich stelle mich vor.','Kendimi tanıtıyorum.'],['Ich stelle eine Frage.','Bir soru soruyorum.'],['Ich plane meinen Tag.','Günümü planlıyorum.'],['Ich erzähle von gestern.','Dünü anlatıyorum.']], ['Ich heiße … und wohne in …','Am Montag arbeite ich um acht Uhr.','Gestern habe ich Deutsch gelernt.'], 'PDF s. 48, 64, 80–82 ve 88', { checkpoint: true, final: true })
    ])
  ];

  window.SPRECHRAUM_A1_COURSE = { units, version: 2, totalLessons: units.reduce((sum, current) => sum + current.lessons.length, 0) };
})();
