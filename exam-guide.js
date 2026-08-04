const EXAM_GUIDES={
  'telc-b1':{
    provider:'telc',level:'B1',title:'telc Deutsch B1',accent:'green',active:'yaklaşık 165 dk',prep:'20 dk sözlü hazırlık',breakText:'Yazılı bölüm içinde mola yok.',
    intro:'telc Deutsch B1, yazılı ve sözlü iki ana bölümden oluşur. Yazılı sınav yaklaşık 150 dakika, sözlü sınav yaklaşık 15 dakikadır. Sözlü sınavdan önce 20 dakika hazırlık verilir.',
    scoring:'Toplam 300 puan vardır: yazılı bölüm 225, sözlü bölüm 75 puan. Başarılı olmak için hem yazılı hem sözlü bölümde ayrı ayrı en az yüzde 60 gerekir; yani yazılıda en az 135, sözlüde en az 45 puan.',
    stages:[
      {type:'reading',icon:'▤',title:'Lesen + Sprachbausteine',minutes:'90 dk',parts:'3 okuma + 2 dil öğesi',detail:'Okuma ve Sprachbausteine birlikte 90 dakikadır. Bu blokta ara verilmez.'},
      {type:'listening',icon:'◖',title:'Hören',minutes:'yaklaşık 30 dk',parts:'3 bölüm',detail:'Günlük konuşmalar, duyurular ve radyo türü dinleme görevleri bulunur.'},
      {type:'writing',icon:'✎',title:'Schreiben',minutes:'30 dk',parts:'1 yazma görevi',detail:'Verilen duruma uygun, tüm görev noktalarını karşılayan bir metin yazılır.'},
      {type:'prep',icon:'◷',title:'Vorbereitung',minutes:'20 dk',parts:'Sözlü hazırlık',detail:'Sözlü sınav görevlerini görür ve not alırsın. Sınav merkezi sözlü oturumu farklı bir saatte planlayabilir.'},
      {type:'speaking',icon:'◉',title:'Sprechen',minutes:'yaklaşık 15 dk',parts:'3 bölüm · genelde 2 kişi',detail:'Tanışma, bir konu hakkında konuşma ve birlikte plan yapma görevleri vardır.'}
    ],
    source:'https://www.telc.net/sprachpruefungen/deutsch/zertifikat-deutsch-telc-deutsch-b1/'
  },
  'telc-b2':{
    provider:'telc',level:'B2',title:'telc Deutsch B2',accent:'blue',active:'yaklaşık 155 dk',prep:'20 dk sözlü hazırlık',breakText:'Yazılı bölüm içinde mola yok.',
    intro:'telc Deutsch B2, yazılı ve sözlü iki ana bölümden oluşur. Yazılı sınav yaklaşık 140 dakika, sözlü sınav yaklaşık 15 dakikadır. Sözlü sınavdan önce 20 dakika hazırlık verilir.',
    scoring:'Toplam 300 puan vardır: yazılı bölüm 225, sözlü bölüm 75 puan. Sertifika için her iki bölümde ayrı ayrı en az yüzde 60 gerekir; yazılıda 135, sözlüde 45 puan.',
    stages:[
      {type:'reading',icon:'▤',title:'Lesen + Sprachbausteine',minutes:'90 dk',parts:'3 okuma + 2 dil öğesi',detail:'İki alt test birlikte 90 dakikadır ve arada mola yoktur.'},
      {type:'listening',icon:'◖',title:'Hören',minutes:'yaklaşık 20 dk',parts:'3 bölüm',detail:'Genel, ayrıntılı ve seçici dinleme becerisi ölçülür.'},
      {type:'writing',icon:'✎',title:'Schreiben',minutes:'30 dk',parts:'1 yazma görevi',detail:'Bir girdiye dayanarak açık, bağlantılı ve amaca uygun bir metin yazılır.'},
      {type:'prep',icon:'◷',title:'Vorbereitung',minutes:'20 dk',parts:'Sözlü hazırlık',detail:'İki konu arasından seçim yapar, görevler için kısa notlar hazırlarsın.'},
      {type:'speaking',icon:'◉',title:'Sprechen',minutes:'yaklaşık 15 dk',parts:'3 bölüm · genelde 2 kişi',detail:'Kendini tanıtma, bir deneyim veya konu hakkında konuşma ve partnerle tartışma bölümleri bulunur.'}
    ],
    source:'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-b2/'
  },
  'dtz-b1':{
    provider:'BAMF · g.a.s.t.',level:'A2–B1',title:'Deutsch-Test für Zuwanderer',short:'DTZ A2–B1',accent:'amber',active:'yaklaşık 110 dk kişisel süre',prep:'Sözlü hazırlık süresi yok',breakText:'Hören, Lesen ve Schreiben art arda uygulanır; merkez organizasyonuna göre bekleme olabilir.',
    intro:'DTZ, A2 ve B1 düzeylerini birlikte ölçen bir sınavdır. Yazılı bölüm 100 dakikadır. Sözlü sınav genellikle iki kişiyle yapılır ve kişi başına yaklaşık 10 dakika sürer.',
    scoring:'Hören ve Lesen birlikte değerlendirilir: 45 soruda 20 doğru A2, 33 doğru B1 düzeyidir. Schreiben ve Sprechen ölçütlerle A2 veya B1 olarak değerlendirilir. Genel B1 sonucu için Sprechen bölümünde ve yazılı alanlardan en az birinde, yani Hören-Lesen veya Schreiben alanında B1 gerekir.',
    stages:[
      {type:'listening',icon:'◖',title:'Hören',minutes:'25 dk',parts:'4 bölüm · 20 soru',detail:'Telefon anonsları, kamusal duyurular, radyo bilgileri, konuşmalar ve görüşler dinlenir.'},
      {type:'reading',icon:'▤',title:'Lesen',minutes:'45 dk',parts:'5 bölüm · 25 soru',detail:'Dizin, ilan, basın metni, bilgilendirme broşürü ve resmî yazışma türleri bulunur.'},
      {type:'writing',icon:'✎',title:'Schreiben',minutes:'30 dk',parts:'1 görev',detail:'Günlük veya resmî bir duruma uygun mektup ya da kısa yazılı ileti oluşturulur.'},
      {type:'speaking',icon:'◉',title:'Sprechen',minutes:'yaklaşık 10 dk / kişi',parts:'3 bölüm',detail:'Kendini tanıtma ve soruları yanıtlama, bir görsel veya konu hakkında bilgi verme, son olarak birlikte bir çözüm planlama vardır.'}
    ],
    source:'https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/Modellsaetze/dtz-handbuch_pdf.pdf?__blob=publicationFile&v=8'
  },
  'goethe-b1':{
    provider:'Goethe-Institut',level:'B1',title:'Goethe-Zertifikat B1',accent:'violet',active:'yaklaşık 180 dk',prep:'15 dk sözlü hazırlık',breakText:'Sabit bir genel mola süresi yoktur; modüllerin programı sınav merkezine göre düzenlenir.',
    intro:'Goethe-Zertifikat B1 dört bağımsız modülden oluşur: Lesen, Hören, Schreiben ve Sprechen. Modüller birlikte veya ayrı ayrı alınabilir.',
    scoring:'Her modül ayrı ayrı en fazla 100 puandır ve en az 60 puanla geçilir. 60 altındaki bir modül başarısız sayılır; modüller ayrı ayrı tekrar edilebilir.',
    stages:[
      {type:'reading',icon:'▤',title:'Lesen',minutes:'65 dk',parts:'5 bölüm',detail:'Günlük ve kamusal metinlerde ana fikir, ayrıntı ve görüşleri anlama ölçülür.'},
      {type:'listening',icon:'◖',title:'Hören',minutes:'yaklaşık 40 dk',parts:'4 bölüm',detail:'Duyuru, konuşma ve tartışmalarda ana bilgi ile ayrıntıları anlama ölçülür.'},
      {type:'writing',icon:'✎',title:'Schreiben',minutes:'60 dk',parts:'3 görev',detail:'E-posta veya mektup, görüş bildirme ve kısa yazılı ileti görevleri bulunur.'},
      {type:'prep',icon:'◷',title:'Vorbereitung',minutes:'15 dk',parts:'Tek başına hazırlık',detail:'Sprechen görevlerini inceler ve not alırsın.'},
      {type:'speaking',icon:'◉',title:'Sprechen',minutes:'yaklaşık 15 dk',parts:'3 görev · genelde çift',detail:'Birlikte plan yapma, kısa sunum ve sunum üzerine soru-cevap bölümleri vardır.'}
    ],
    source:'https://www.goethe.de/de/spr/prf/gzb1.html',scoreSource:'https://www.goethe.de/de/spr/prf/pes/pab1.html'
  },
  'goethe-b2':{
    provider:'Goethe-Institut',level:'B2',title:'Goethe-Zertifikat B2',accent:'coral',active:'yaklaşık 195 dk',prep:'15 dk sözlü hazırlık',breakText:'Sabit bir genel mola süresi yoktur; modül ve mola planı sınav merkezine göre değişir.',
    intro:'Goethe-Zertifikat B2, Lesen, Hören, Schreiben ve Sprechen olmak üzere dört bağımsız modülden oluşur. Modüller birlikte veya ayrı ayrı alınabilir.',
    scoring:'Her modül en fazla 100 puandır. Bir modül en az 60 puan, yani yüzde 60 ile geçilir ve gerektiğinde ayrı tekrar edilebilir.',
    stages:[
      {type:'reading',icon:'▤',title:'Lesen',minutes:'65 dk',parts:'5 bölüm',detail:'Farklı metin türlerinde ana düşünce, ayrıntı, tutum ve metin yapısı anlaşılır.'},
      {type:'listening',icon:'◖',title:'Hören',minutes:'yaklaşık 40 dk',parts:'4 bölüm',detail:'Konuşma, röportaj ve tartışmalarda ayrıntılı dinleme becerisi ölçülür.'},
      {type:'writing',icon:'✎',title:'Schreiben',minutes:'75 dk',parts:'2 görev',detail:'Bir forum yazısı ve amaca uygun bir mesaj yazılır.'},
      {type:'prep',icon:'◷',title:'Vorbereitung',minutes:'15 dk',parts:'Tek başına hazırlık',detail:'İki konuşma konusu arasından seçim yapar ve kısa notlar hazırlarsın.'},
      {type:'speaking',icon:'◉',title:'Sprechen',minutes:'yaklaşık 15 dk',parts:'2 bölüm',detail:'Yaklaşık dört dakikalık kısa sunum ve partnerle görüş alışverişine dayalı tartışma yapılır.'}
    ],
    source:'https://www.goethe.de/de/spr/prf/gzb2.html',scoreSource:'https://www.goethe.de/de/spr/prf/pes/pab2.html'
  }
};

const EXAM_GUIDE_PARTS={
  'telc-b1':{
    'Lesen + Sprachbausteine':[
      {title:'Lesen · Teil 1',meta:'Globalverstehen · 5 Aufgaben',text:'Beş kısa metnin ana konusunu uygun başlıklarla eşleştirirsin.'},
      {title:'Lesen · Teil 2',meta:'Detailverstehen · 5 Aufgaben',text:'Bir metni ayrıntılı okuyup beş çoktan seçmeli soruyu yanıtlarsın.'},
      {title:'Lesen · Teil 3',meta:'Selektives Verstehen · 10 Aufgaben',text:'On farklı ihtiyacı uygun ilan veya bilgi metniyle eşleştirirsin. Bazı durumlarda uygun metin olmayabilir.'},
      {title:'Sprachbausteine · Teil 1',meta:'Grammatik · 10 Aufgaben',text:'Boşluklara doğru dil bilgisi yapısını seçersin.'},
      {title:'Sprachbausteine · Teil 2',meta:'Lexik · 10 Aufgaben',text:'Bağlama uygun kelimeyi seçenek listesinden bulup metni tamamlarsın.'}
    ],
    'Hören':[
      {title:'Hören · Teil 1',meta:'Globalverstehen · 5 Aufgaben',text:'Beş kısa metnin ana mesajını doğru veya yanlış olarak değerlendirirsin.'},
      {title:'Hören · Teil 2',meta:'Detailverstehen · 10 Aufgaben',text:'Daha uzun bir konuşmayı dinleyip ayrıntılarla ilgili on ifadeyi değerlendirirsin.'},
      {title:'Hören · Teil 3',meta:'Selektives Verstehen · 5 Aufgaben',text:'Beş kısa duyurudan gerekli bilgiyi seçerek doğru veya yanlış karar verirsin.'}
    ],
    'Schreiben':[{title:'Schreiben · Aufgabe',meta:'1 halbformelle E-Mail',text:'Verilen duruma göre bir e-posta yazarsın. Karttaki bütün içerik noktalarına değinmen ve uygun hitap ile kapanış kullanman gerekir.'}],
    'Vorbereitung':[{title:'Vorbereitungszeit',meta:'20 Minuten',text:'Sözlü görevleri okur, fikirlerini düzenler ve kısa notlar alırsın. Hazırlık kâğıdını sınava götürebilirsin fakat metni tamamen okumamalısın.'}],
    'Sprechen':[
      {title:'Sprechen · Teil 1',meta:'Einander kennenlernen',text:'Partnerinle tanışır; ad, memleket, yaşadığın yer, meslek ve ilgi alanları gibi konularda karşılıklı sorular sorarsın.'},
      {title:'Sprechen · Teil 2',meta:'Über ein Thema sprechen',text:'Bir konu kartındaki bilgi ve kendi deneyimlerin hakkında konuşur, partnerinin görüşüne tepki verirsin.'},
      {title:'Sprechen · Teil 3',meta:'Gemeinsam etwas planen',text:'Partnerinle öneri yapar, ayrıntıları netleştirir, görevleri paylaştırır ve ortak bir karara ulaşırsın.'}
    ]
  },
  'telc-b2':{
    'Lesen + Sprachbausteine':[
      {title:'Leseverstehen · Teil 1',meta:'Globalverstehen · 5 Zuordnungen',text:'Beş metnin ana fikrini başlıklarla eşleştirirsin.'},
      {title:'Leseverstehen · Teil 2',meta:'Detailverstehen · 5 Aufgaben',text:'Uzun bir metni ayrıntılı okuyup beş çoktan seçmeli soruyu yanıtlarsın.'},
      {title:'Leseverstehen · Teil 3',meta:'Selektives Verstehen · 10 Zuordnungen',text:'On ihtiyeti uygun kısa metin veya ilanlarla eşleştirirsin.'},
      {title:'Sprachbausteine · Teil 1',meta:'Grammatische Strukturen · 10 Aufgaben',text:'Metindeki boşluklara doğru gramer seçeneğini yerleştirirsin.'},
      {title:'Sprachbausteine · Teil 2',meta:'Lexik · 10 Aufgaben',text:'Bağlama uygun sözcükleri bir seçenek listesinden seçersin.'}
    ],
    'Hören':[
      {title:'Hörverstehen · Teil 1',meta:'Globalverstehen · 5 Aufgaben',text:'Beş metni bir kez dinler ve ana mesajı doğru ya da yanlış olarak değerlendirirsin.'},
      {title:'Hörverstehen · Teil 2',meta:'Detailverstehen · 10 Aufgaben',text:'Daha uzun bir metni dinleyerek on ayrıntı ifadesini doğru veya yanlış olarak işaretlersin.'},
      {title:'Hörverstehen · Teil 3',meta:'Selektives Verstehen · 5 Aufgaben',text:'Beş kısa metinden belirli bilgileri seçersin.'}
    ],
    'Schreiben':[{title:'Schriftlicher Ausdruck',meta:'1 halbformelle E-Mail · 30 Minuten',text:'İki görevden birini seçip yarı resmî bir e-posta yazarsın. Görev noktalarını, metin düzenini, bağlaçları ve uygun üslubu göstermelisin.'}],
    'Vorbereitung':[{title:'Vorbereitungszeit',meta:'20 Minuten',text:'Sözlü sınavın konu ve görevlerini inceler, deneyimlerini ve gerekçelerini kısa notlarla planlarsın.'}],
    'Sprechen':[
      {title:'Sprechen · Teil 1',meta:'Über Erfahrungen sprechen',text:'Seçtiğin konu hakkında kişisel deneyimlerini düzenli biçimde anlatır ve partnerinin sorularına cevap verirsin.'},
      {title:'Sprechen · Teil 2',meta:'Diskussion',text:'Bir görüşü tartışır, kendi düşünceni gerekçelendirir ve partnerinin argümanlarına tepki verirsin.'},
      {title:'Sprechen · Teil 3',meta:'Gemeinsam etwas planen',text:'Bir plan için fikirleri karşılaştırır, ayrıntıları kararlaştırır ve ortak sonuca ulaşırsın.'}
    ]
  },
  'dtz-b1':{
    'Hören':[
      {title:'Hören · Teil 1',meta:'Telefonansagen und Durchsagen · 4 Aufgaben',text:'Telefon mesajları ve kamusal duyurulardan belirli bilgileri seçersin.'},
      {title:'Hören · Teil 2',meta:'Radioinformationen · 5 Aufgaben',text:'Kısa radyo bilgilerini dinleyip doğru seçeneği bulursun.'},
      {title:'Hören · Teil 3',meta:'Gespräche · 8 Aufgaben',text:'Günlük konuşmalardaki ana mesajı ve önemli ayrıntıları anlarsın.'},
      {title:'Hören · Teil 4',meta:'Meinungsäußerungen · 3 Aufgaben',text:'Farklı kişilerin görüşlerini uygun ifadelerle eşleştirirsin.'}
    ],
    'Lesen':[
      {title:'Lesen · Teil 1',meta:'Kataloge und Verzeichnisse · 5 Aufgaben',text:'Bir dizin veya planda aradığın bilginin nerede olduğunu bulursun.'},
      {title:'Lesen · Teil 2',meta:'Anzeigen · 5 Aufgaben',text:'İhtiyaçları uygun ilanlarla eşleştirirsin.'},
      {title:'Lesen · Teil 3',meta:'Presse und Mitteilungen · 6 Aufgaben',text:'Basın metinleri ve resmî bilgilendirmelerde ana bilgi ile ayrıntıları seçersin.'},
      {title:'Lesen · Teil 4',meta:'Informationsbroschüren · 3 Aufgaben',text:'Bir bilgilendirme metnindeki kuralları ve önemli noktaları anlarsın.'},
      {title:'Lesen · Teil 5',meta:'Formeller Brief · 6 Aufgaben',text:'Resmî bir yazışmadaki boşlukları uygun dil yapılarıyla tamamlarsın.'}
    ],
    'Schreiben':[{title:'Schreiben · Aufgabe',meta:'Brief oder Mitteilung · 30 Minuten',text:'Verilen günlük ya da resmî duruma uygun bir yazı yazarsın. Görevdeki bütün içerik noktalarını işlemelisin.'}],
    'Sprechen':[
      {title:'Sprechen · Teil 1a',meta:'Sich vorstellen',text:'Kendini ad, memleket, yaşadığın yer, aile, meslek ve dil öğrenme gibi başlıklarla tanıtırsın.'},
      {title:'Sprechen · Teil 1b',meta:'Nachfragen beantworten',text:'Sınav görevlisinin tanıtımınla ilgili ek sorularına cevap verirsin.'},
      {title:'Sprechen · Teil 2a',meta:'Informationen geben',text:'Bir fotoğrafı veya durumu anlatır, gördüğün kişileri ve eylemleri açıklarsın.'},
      {title:'Sprechen · Teil 2b',meta:'Vergleichen und berichten',text:'Görseldeki konuyu kendi deneyimin veya kendi ülkenle ilişkilendirirsin.'},
      {title:'Sprechen · Teil 3',meta:'Etwas aushandeln',text:'Partnerinle bir soruna çözüm bulur; öneri, tepki, ayrıntı ve ortak karar döngüsünü tamamlarsın.'}
    ]
  },
  'goethe-b1':{
    'Lesen':[
      {title:'Lesen · Teil 1',meta:'10 Minuten · Aufgaben 1–6',text:'Bir metni okuyup altı ifadeyi doğru veya yanlış olarak değerlendirirsin.'},
      {title:'Lesen · Teil 2',meta:'20 Minuten · Aufgaben 7–12',text:'İki kısa basın metnini okuyup her metin için üç çoktan seçmeli soruyu yanıtlarsın.'},
      {title:'Lesen · Teil 3',meta:'10 Minuten · Aufgaben 13–19',text:'Yedi günlük durumu uygun ilanlarla eşleştirirsin; uygun ilan yoksa bunu ayrıca işaretlersin.'},
      {title:'Lesen · Teil 4',meta:'15 Minuten · Aufgaben 20–26',text:'Bir tartışmadaki farklı yorumları okuyup kişilerin bir öneriye olumlu mu olumsuz mu yaklaştığını belirlersin.'},
      {title:'Lesen · Teil 5',meta:'10 Minuten · Aufgaben 27–30',text:'Bir yönetmelik veya bilgilendirme metnini okuyup dört çoktan seçmeli soruyu yanıtlarsın.'}
    ],
    'Hören':[
      {title:'Hören · Teil 1',meta:'Kurze Texte · Aufgaben 1–10',text:'Beş kısa metni iki kez dinlersin. Her metin için önce ana bilgiyi, sonra bir ayrıntıyı seçersin.'},
      {title:'Hören · Teil 2',meta:'Ein längerer Text · Aufgaben 11–15',text:'Bir duyuru veya bilgilendirici konuşmayı bir kez dinleyip beş çoktan seçmeli soruyu yanıtlarsın.'},
      {title:'Hören · Teil 3',meta:'Gespräch · Aufgaben 16–22',text:'Daha uzun bir konuşmayı bir kez dinleyip yedi ifadeyi doğru veya yanlış olarak değerlendirirsin.'},
      {title:'Hören · Teil 4',meta:'Diskussion · Aufgaben 23–30',text:'Üç kişinin tartışmasını iki kez dinleyip sekiz görüşü doğru konuşmacıyla eşleştirirsin.'}
    ],
    'Schreiben':[
      {title:'Schreiben · Teil 1',meta:'Persönliche E-Mail · yaklaşık 20 Minuten',text:'Bir arkadaşına e-posta yazar, üç görev noktasını ve uygun giriş ile kapanışı kullanırsın.'},
      {title:'Schreiben · Teil 2',meta:'Diskussionsbeitrag · yaklaşık 25 Minuten',text:'Bir konu hakkında kişisel görüşünü açıklar ve gerekçelendirirsin.'},
      {title:'Schreiben · Teil 3',meta:'Kurze formelle E-Mail · yaklaşık 15 Minuten',text:'Resmî bir kişiye kısa mesaj yazar, durumu açıklar ve uygun rica ya da özür ifadesi kullanırsın.'}
    ],
    'Vorbereitung':[{title:'Vorbereitungszeit',meta:'15 Minuten',text:'Sözlü sınavın üç görevini inceler ve kısa notlar alırsın. Partnerinle hazırlık yapmazsın.'}],
    'Sprechen':[
      {title:'Sprechen · Teil 1',meta:'Gemeinsam etwas planen · etwa 3 Minuten',text:'Partnerinle bir plan yapar; öneri sunar, tepki verir ve ayrıntıları kararlaştırırsın.'},
      {title:'Sprechen · Teil 2',meta:'Ein Thema präsentieren · etwa 3 Minuten pro Person',text:'Seçtiğin konu hakkında giriş, kişisel deneyim, ülke karşılaştırması, avantajlar, dezavantajlar ve sonuç içeren kısa sunum yaparsın.'},
      {title:'Sprechen · Teil 3',meta:'Über das Thema sprechen · etwa 2 Minuten pro Person',text:'Partnerinin sunumuna geri bildirim verir, bir soru sorar ve kendi sunumunla ilgili soruyu yanıtlarsın.'}
    ]
  },
  'goethe-b2':{
    'Lesen':[
      {title:'Lesen · Teil 1',meta:'18 Minuten',text:'Bir forumdaki dört kişinin görüşlerini okuyup dokuz ifadeyi doğru kişiyle eşleştirirsin.'},
      {title:'Lesen · Teil 2',meta:'12 Minuten',text:'Bir bilgilendirici metindeki boşluklara uygun cümleleri yerleştirerek metin bağlantısını tamamlarsın.'},
      {title:'Lesen · Teil 3',meta:'12 Minuten',text:'Bir gazete yazısını ayrıntılı okuyup çoktan seçmeli soruları yanıtlarsın.'},
      {title:'Lesen · Teil 4',meta:'16 Minuten',text:'Kısa metinlerdeki görüş veya tutumları uygun ifadelerle eşleştirirsin.'},
      {title:'Lesen · Teil 5',meta:'6 Minuten',text:'Bir yönetmelik ya da resmî bilgilendirme metninde aradığın ayrıntıları hızlıca bulursun.'}
    ],
    'Hören':[
      {title:'Hören · Teil 1',meta:'5 Gespräche · Aufgaben 1–10',text:'Beş konuşma veya ifadeyi bir kez dinlersin. Her metin için bir doğru yanlış ve bir çoktan seçmeli soru çözersin.'},
      {title:'Hören · Teil 2',meta:'Radiointerview · Aufgaben 11–16',text:'Bir radyo röportajını iki kez dinleyip altı çoktan seçmeli soruyu yanıtlarsın.'},
      {title:'Hören · Teil 3',meta:'Gespräch mit mehreren Personen · Aufgaben 17–22',text:'Birden fazla kişinin konuşmasını bir kez dinleyip altı görüşü doğru konuşmacıyla eşleştirirsin.'},
      {title:'Hören · Teil 4',meta:'Kurzer Vortrag · Aufgaben 23–30',text:'Kısa bir sunumu iki kez dinleyip sekiz çoktan seçmeli soruyu yanıtlarsın.'}
    ],
    'Schreiben':[
      {title:'Schreiben · Teil 1',meta:'Forumsbeitrag · önerilen 50 Minuten',text:'Bir konu hakkında yapılandırılmış forum yazısı yazar; görüş, gerekçe, alternatif ve avantajları ele alırsın.'},
      {title:'Schreiben · Teil 2',meta:'Nachricht · önerilen 25 Minuten',text:'Belirli bir iletişim amacına uygun mesaj yazar; görevde istenen bütün dil işlevlerini yerine getirirsin.'}
    ],
    'Vorbereitung':[{title:'Vorbereitungszeit',meta:'15 Minuten',text:'İki sunum konusundan birini seçer, ana noktaları ve argümanlarını tek başına planlarsın.'}],
    'Sprechen':[
      {title:'Sprechen · Teil 1',meta:'Vortrag und Fragen · etwa 4 Minuten',text:'Seçtiğin konuda giriş, seçenekler, avantajlar, dezavantajlar ve değerlendirme içeren kısa sunum yapar; ardından soruları yanıtlarsın.'},
      {title:'Sprechen · Teil 2',meta:'Diskussion · etwa 5 Minuten',text:'Partnerinle bir görüşü tartışır, argüman sunar, karşı görüşe tepki verir ve konuşmayı doğal biçimde sürdürürsün.'}
    ]
  }
};

const examGuideState={selected:null,step:-1,substep:-1,run:0,playing:false,answer:''};
const guideEsc=value=>typeof escapeHtml==='function'?escapeHtml(String(value??'')):String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function examGuideCatalog(){
  const app=document.querySelector('#examGuideApp');if(!app)return;
  app.innerHTML=`<header class="guide-intro"><div><span class="eyebrow">RESMÎ KAYNAKLARLA HAZIRLANDI</span><h2>Sınavını seç, akışı önceden gör</h2><p>Clara; süreyi, bölüm sırasını, hazırlığı ve geçme sistemini animasyonlu olarak anlatsın.</p></div><div class="guide-trust"><span>✓</span><b>Kaynak kontrollü</b><small>telc · BAMF · Goethe-Institut</small></div></header><div class="guide-catalog">${Object.entries(EXAM_GUIDES).map(([id,guide])=>`<button class="guide-exam-card ${guide.accent}" type="button" data-guide-open="${id}"><span class="guide-logo">${guide.provider==='telc'?'telc':guide.provider.startsWith('Goethe')?'GI':'DTZ'}</span><span><small>${guideEsc(guide.provider)} · ${guideEsc(guide.level)}</small><b>${guideEsc(guide.short||guide.title)}</b><em>${guideEsc(guide.active)} · ${guide.stages.length} adım</em></span><strong>→</strong></button>`).join('')}</div><aside class="guide-disclaimer"><b>Program notu</b><span>Sözlü sınavın saati ve Goethe modülleri arasındaki molalar sınav merkezine göre değişebilir. Kayıt belgendeki saat her zaman önceliklidir.</span></aside>`;
}

function examGuideDetail(){
  const guide=EXAM_GUIDES[examGuideState.selected],app=document.querySelector('#examGuideApp');if(!guide||!app)return examGuideCatalog();
  app.innerHTML=`<button class="guide-back" type="button" data-guide-back>← Tüm sınavlar</button><div class="guide-detail ${guide.accent}"><header class="guide-detail-head"><div><span class="eyebrow">${guideEsc(guide.provider)} · ${guideEsc(guide.level)}</span><h2>${guideEsc(guide.title)}</h2><p>${guideEsc(guide.intro)}</p><div class="guide-facts"><span><small>AKTİF SINAV SÜRESİ</small><b>${guideEsc(guide.active)}</b></span><span><small>SÖZLÜ HAZIRLIK</small><b>${guideEsc(guide.prep)}</b></span></div></div><div class="guide-avatar" id="guideAvatar"><span class="guide-avatar-ring"></span><img src="assets/clara-2d.svg" alt="Sınav rehberi Clara"><i></i><small>Clara anlatıyor</small></div></header><div class="guide-player"><div class="guide-player-status"><i></i><span><small id="guidePlayerLabel">REHBER HAZIR</small><b id="guidePlayerTitle">Sınav akışını başlat</b></span></div><div class="guide-player-actions"><button type="button" data-guide-play>▶ Anlat</button><button type="button" data-guide-stop disabled>■ Durdur</button></div></div><div class="guide-flow" id="guideFlow">${guide.stages.map((stage,index)=>`<button type="button" class="guide-stage ${stage.type}" data-guide-stage="${index}"><span class="guide-step">${index+1}</span><i>${stage.icon}</i><span><small>${guideEsc(stage.parts)}</small><b>${guideEsc(stage.title)}</b><em>${guideEsc(stage.minutes)}</em><p>${guideEsc(stage.detail)}</p></span><strong>▶</strong></button>`).join('')}</div><section class="guide-score"><span>◎</span><div><small>PUANLAMA VE GEÇME</small><p>${guideEsc(guide.scoring)}</p></div></section><section class="guide-break"><span>◷</span><div><small>MOLA VE PROGRAM</small><p>${guideEsc(guide.breakText)}</p></div></section><section class="guide-qa"><header><span>?</span><div><small>CLARA’YA SOR</small><b>${guideEsc(guide.title)} hakkında neyi merak ediyorsun?</b></div></header><div class="guide-quick-questions"><button type="button" data-guide-question="Toplam sınav ne kadar sürüyor?">Toplam süre</button><button type="button" data-guide-question="Sınavdan geçmek için kaç puan almalıyım?">Geçme puanı</button><button type="button" data-guide-question="Sınavda mola var mı?">Mola</button></div><div class="guide-answer" id="guideAnswer" ${examGuideState.answer?'':'hidden'}>${examGuideState.answer?`<span>Clara</span><p>${guideEsc(examGuideState.answer)}</p>`:''}</div><form id="guideQuestionForm"><input id="guideQuestionInput" autocomplete="off" placeholder="Örn. Sprechen kaç bölüm?" aria-label="Sınavla ilgili sorunu yaz"><button type="submit">Sor ↑</button></form></section><footer class="guide-source"><span>Bilgiler resmî sınav sağlayıcısından alınmıştır.</span><a href="${guide.source}" target="_blank" rel="noopener">Resmî kaynağı aç ↗</a></footer></div>`;
  guide.stages.forEach((stage,index)=>{const parts=EXAM_GUIDE_PARTS[examGuideState.selected]?.[stage.title]||[],button=app.querySelector(`[data-guide-stage="${index}"]`);if(!button||!parts.length)return;button.insertAdjacentHTML('afterend',`<section class="guide-stage-detail ${stage.type}" data-guide-detail="${index}" hidden><header><span><small>${guideEsc(stage.title)} AYRINTILARI</small><b>${parts.length} adım sırayla anlatılacak</b></span><em>${guideEsc(stage.minutes)}</em></header><div class="guide-part-grid">${parts.map((part,partIndex)=>`<article class="guide-part-card" data-guide-part="${partIndex}"><i>${partIndex+1}</i><span><small>${guideEsc(part.meta)}</small><b>${guideEsc(part.title)}</b><p>${guideEsc(part.text)}</p></span><em>Teil ${partIndex+1}</em></article>`).join('')}</div></section>`)});
  updateExamGuideProgress();
}

function guidePartsFor(index){const guide=EXAM_GUIDES[examGuideState.selected],stage=guide?.stages[index];return stage?(EXAM_GUIDE_PARTS[examGuideState.selected]?.[stage.title]||[]):[]}
function showGuideStageDetail(index,activePart=-1,allDone=false){
  document.querySelectorAll('[data-guide-detail]').forEach(panel=>{const current=Number(panel.dataset.guideDetail)===index;panel.hidden=!current;if(!current)return;panel.classList.toggle('narrating',examGuideState.playing);panel.querySelectorAll('[data-guide-part]').forEach(card=>{const part=Number(card.dataset.guidePart);card.classList.toggle('active',part===activePart);card.classList.toggle('done',allDone||part<activePart)})});
}

function updateExamGuideProgress(){
  const cards=[...document.querySelectorAll('.guide-stage')];cards.forEach((card,index)=>{card.classList.toggle('active',index===examGuideState.step&&examGuideState.playing);card.classList.toggle('done',index<examGuideState.step||(!examGuideState.playing&&index===examGuideState.step&&examGuideState.step>=0))});
  const guide=EXAM_GUIDES[examGuideState.selected],stage=guide?.stages[examGuideState.step],label=document.querySelector('#guidePlayerLabel'),title=document.querySelector('#guidePlayerTitle'),avatar=document.querySelector('#guideAvatar');
  if(label)label.textContent=examGuideState.playing?`${examGuideState.step+1} / ${guide.stages.length} ADIM`:(examGuideState.step>=guide.stages.length-1?'REHBER TAMAMLANDI':'REHBER HAZIR');
  if(title)title.textContent=stage?.title||(examGuideState.step>=guide.stages.length-1?'Tüm akışı gördün':'Sınav akışını başlat');
  avatar?.classList.toggle('speaking',examGuideState.playing);
  const play=document.querySelector('[data-guide-play]'),stop=document.querySelector('[data-guide-stop]');if(play)play.textContent=examGuideState.playing?'Clara anlatıyor…':examGuideState.step>=guide.stages.length-1?'↻ Baştan anlat':'▶ Anlat';if(play)play.disabled=examGuideState.playing;if(stop)stop.disabled=!examGuideState.playing;
}

function guideTurkishSpeech(text){return String(text).replace(/(\d+)\s*dk\b/gi,'$1 dakika').replace(/ca\./gi,'yaklaşık').replace(/\s+/g,' ').trim()}
function guideSpeechParts(text){const splitPattern=/(telc Deutsch B[12]|Goethe-Zertifikat B[12]|Deutsch-Test für Zuwanderer|Leseverstehen|Hörverstehen|Sprachbausteine|Schriftlicher Ausdruck|Vorbereitungszeit|Vorbereitung|Schreiben|Sprechen|Lesen|Hören|Teil\s*\d+[ab]?|Gemeinsam etwas planen|Sich vorstellen|Diskussion|Vortrag|Forumsbeitrag|Nachricht)/gi,isGerman=/^(?:telc Deutsch B[12]|Goethe-Zertifikat B[12]|Deutsch-Test für Zuwanderer|Leseverstehen|Hörverstehen|Sprachbausteine|Schriftlicher Ausdruck|Vorbereitungszeit|Vorbereitung|Schreiben|Sprechen|Lesen|Hören|Teil\s*\d+[ab]?|Gemeinsam etwas planen|Sich vorstellen|Diskussion|Vortrag|Forumsbeitrag|Nachricht)$/i;return String(text).split(splitPattern).filter(Boolean).map(value=>({text:value.trim(),lang:isGerman.test(value.trim())?'de':'tr'})).filter(part=>part.text)}
async function narrateGuideText(text,run){
  for(const part of guideSpeechParts(text)){if(run!==examGuideState.run)return false;await speak(part.lang==='tr'?guideTurkishSpeech(part.text):part.text,{resume:false,lang:part.lang,voice:part.lang==='tr'?'F1':null})}
  return run===examGuideState.run;
}
async function narrateGuideGerman(text,run){if(run!==examGuideState.run)return false;await speak(text,{resume:false,lang:'de'});return run===examGuideState.run}
async function narrateGuideTurkish(text,run){if(run!==examGuideState.run)return false;await speak(guideTurkishSpeech(text),{resume:false,lang:'tr',voice:'F1'});return run===examGuideState.run}

async function narrateGuideStage(index,run){
  const guide=EXAM_GUIDES[examGuideState.selected],stage=guide?.stages[index],parts=guidePartsFor(index);if(!stage||run!==examGuideState.run)return false;
  examGuideState.step=index;examGuideState.substep=-1;updateExamGuideProgress();showGuideStageDetail(index,-1,false);document.querySelector(`[data-guide-stage="${index}"]`)?.scrollIntoView({behavior:'smooth',block:'center'});
  if(!(await narrateGuideGerman(stage.title,run)))return false;
  if(!(await narrateGuideText(`Süre: ${stage.minutes}. ${stage.detail}`,run)))return false;
  for(let partIndex=0;partIndex<parts.length;partIndex++){
    if(run!==examGuideState.run)return false;examGuideState.substep=partIndex;showGuideStageDetail(index,partIndex,false);document.querySelector(`[data-guide-detail="${index}"] [data-guide-part="${partIndex}"]`)?.scrollIntoView({behavior:'smooth',block:'center'});
    const part=parts[partIndex];if(!(await narrateGuideGerman(`${part.title}. ${part.meta}.`,run)))return false;if(!(await narrateGuideTurkish(part.text,run)))return false;
  }
  examGuideState.substep=-1;showGuideStageDetail(index,-1,true);return true;
}

async function playExamGuide(startAt=0,singleStage=false){
  const guide=EXAM_GUIDES[examGuideState.selected];if(!guide)return;
  stopExamGuide(false);const run=examGuideState.run;examGuideState.playing=true;examGuideState.step=startAt;updateExamGuideProgress();
  if(startAt===0&&!singleStage){if(!(await narrateGuideGerman(guide.title,run)))return;if(!(await narrateGuideText(guide.intro,run)))return}
  const end=singleStage?Math.min(startAt+1,guide.stages.length):guide.stages.length;
  for(let index=startAt;index<end;index++)if(!(await narrateGuideStage(index,run)))return;
  if(!singleStage&&!(await narrateGuideText(`Puanlama şöyle: ${guide.scoring} ${guide.breakText}`,run)))return;
  examGuideState.playing=false;updateExamGuideProgress();
}

function stopExamGuide(cancelSpeech=true){examGuideState.run++;examGuideState.playing=false;if(cancelSpeech&&typeof stopSpeech==='function')stopSpeech(false);updateExamGuideProgress();if(examGuideState.step>=0)showGuideStageDetail(examGuideState.step,-1,false)}

function answerExamGuideQuestion(question){
  const guide=EXAM_GUIDES[examGuideState.selected],q=question.toLocaleLowerCase('tr-TR');if(!guide)return '';
  if(/puan|geç|başar|yüzde|yuzde|not/.test(q))return guide.scoring;
  if(/mola|ara|bekle/.test(q))return guide.breakText;
  if(/toplam|ne kadar sür|kaç dakika|kac dakika|süre/.test(q)&&!guide.stages.some(stage=>q.includes(stage.title.toLocaleLowerCase('tr-TR').split(' ')[0])))return `${guide.title} için aktif sınav süresi ${guide.active}. ${guide.prep}. Sınav merkezindeki bekleme ve organizasyon süresi buna dahil değildir.`;
  const stage=guide.stages.find(item=>{const terms=[item.title,...item.title.split(/\s|\+/),item.type];return terms.some(term=>term.length>2&&q.includes(term.toLocaleLowerCase('tr-TR')))});
  if(stage){const index=guide.stages.indexOf(stage),parts=guidePartsFor(index),partSummary=parts.length?` Alt bölümler: ${parts.map(part=>part.title).join(', ')}.`:'';return `${stage.title} ${stage.minutes} sürer ve ${stage.parts.toLocaleLowerCase('tr-TR')} içerir. ${stage.detail}${partSummary}`}
  if(/bölüm|akış|sıra|önce|sonra/.test(q))return `${guide.title} akışı: ${guide.stages.map(stage=>`${stage.title} (${stage.minutes})`).join(' → ')}.`;
  if(/hazırl|hazir/.test(q))return `${guide.prep}. ${guide.stages.find(stage=>stage.type==='prep')?.detail||'Ayrı bir hazırlık adımı bulunmuyor.'}`;
  return `Bu rehberde doğrulanmış olarak süre, bölüm akışı, hazırlık, mola ve puanlama bilgilerini yanıtlayabilirim. Sorunu örneğin “Sprechen kaç dakika?” veya “Geçme puanı nedir?” şeklinde sorabilirsin.`;
}

async function submitExamGuideQuestion(question){
  const answer=answerExamGuideQuestion(question);examGuideState.answer=answer;const box=document.querySelector('#guideAnswer'),avatar=document.querySelector('#guideAvatar');if(box){box.hidden=false;box.innerHTML=`<span>Clara</span><p>${guideEsc(answer)}</p>`;box.scrollIntoView({behavior:'smooth',block:'nearest'})}avatar?.classList.add('speaking');await speak(answer,{resume:false,lang:'tr',voice:'F1'});avatar?.classList.remove('speaking');
}

document.addEventListener('click',event=>{
  const open=event.target.closest('[data-guide-open]'),back=event.target.closest('[data-guide-back]'),play=event.target.closest('[data-guide-play]'),stop=event.target.closest('[data-guide-stop]'),stage=event.target.closest('[data-guide-stage]'),question=event.target.closest('[data-guide-question]');
  if(open){stopExamGuide();examGuideState.selected=open.dataset.guideOpen;examGuideState.step=-1;examGuideState.substep=-1;examGuideState.answer='';examGuideDetail();return}
  if(back){stopExamGuide();examGuideState.selected=null;examGuideState.step=-1;examGuideState.substep=-1;examGuideState.answer='';examGuideCatalog();return}
  if(play)return playExamGuide(0);
  if(stop)return stopExamGuide();
  if(stage){stopExamGuide();examGuideState.step=Number(stage.dataset.guideStage);return playExamGuide(examGuideState.step,true)}
  if(question)return submitExamGuideQuestion(question.dataset.guideQuestion);
  if(event.target.closest('[data-view]')&&!event.target.closest('[data-view="exam-guide"]'))stopExamGuide();
});

document.addEventListener('submit',event=>{if(event.target.id!=='guideQuestionForm')return;event.preventDefault();const input=document.querySelector('#guideQuestionInput'),question=input?.value.trim();if(!question)return;input.value='';submitExamGuideQuestion(question)});

examGuideCatalog();
