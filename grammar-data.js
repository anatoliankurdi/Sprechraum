(function () {
  const topic = (id, title, summary, examples, extra = {}) => ({ id, title, summary, examples, ...extra });
  const item = (sentence, answer, options, note = '') => ({ sentence, answer, options, note });

  const levels = {
    A1: {
      label: 'Başlangıç',
      outcome: 'Kısa, doğru temel cümleler kur.',
      color: '#58cc02',
      topics: [
        topic('praesens', 'Präsens · düzenli fiiller', 'Fiil kökü kişiye göre çekim eki alır.', [
          'Ich lerne Deutsch.', 'Du wohnst in Hanau.', 'Wir kochen eine Suppe.', 'Ihr besucht einen Deutschkurs.'
        ], { source: 'PDF s. 6–10', exercise: 'a1-praesens' }),
        topic('unregelmaessig', 'Düzensiz fiiller', 'Bazı fiillerde du ve er/sie/es biçiminde kök ünlüsü değişir.', [
          'Du fährst nach Berlin.', 'Er liest ein Buch.', 'Sie schläft acht Stunden.', 'Du sprichst sehr gut Deutsch.'
        ], { source: 'PDF s. 12–15', exercise: 'a1-irregular' }),
        topic('sein-haben', 'sein ve haben', 'Kimlik, durum ve sahiplik anlatırken en temel iki fiili kullan.', [
          'Ich bin müde.', 'Du bist heute zu Hause.', 'Wir haben eine Frage.', 'Sie hat ein neues Handy.'
        ], { source: 'PDF s. 19', exercise: 'a1-sein-haben' }),
        topic('artikel', 'Artikel · der, die, das', 'İsimleri artikeliyle birlikte öğren; çoğulda artikel die olur.', [
          'der Computer', 'die Lampe', 'das Auto', 'die Bücher'
        ], { source: 'PDF s. 23–26', exercise: 'a1-article' }),
        topic('trennbar', 'Ayrılabilen fiiller', 'Çekimli fiil ikinci yerde, ayrılan ön ek cümlenin sonunda bulunur.', [
          'Ich stehe um sieben Uhr auf.', 'Du kaufst heute ein.', 'Er ruft seine Mutter an.', 'Wir sehen am Abend fern.'
        ], { source: 'PDF s. 31', exercise: 'a1-separable' }),
        topic('modalverben', 'Modalverben', 'Modal fiil çekilir; asıl fiil yalın hâlde cümlenin sonuna gider.', [
          'Ich kann gut schwimmen.', 'Du musst heute arbeiten.', 'Wir wollen Deutsch lernen.', 'Darf ich hier parken?'
        ], { source: 'PDF s. 42–47', exercise: 'a1-modal' }),
        topic('negation', 'Olumsuzluk · nicht / kein', 'İsimleri çoğunlukla kein, fiil ve sıfatları nicht ile olumsuz yap.', [
          'Ich lese kein Buch.', 'Er braucht keine Lampe.', 'Mein Name ist nicht Ahmet.', 'Das Auto ist nicht neu.'
        ], { source: 'PDF s. 50–54', exercise: 'a1-negation' }),
        topic('w-fragen', 'W-Fragen', 'W-soru kelimesinden sonra çekimli fiil, ardından özne gelir.', [
          'Wie heißen Sie?', 'Wo wohnen Sie?', 'Wann arbeiten Sie?', 'Warum lernen Sie Deutsch?'
        ], { source: 'PDF s. 58–63', exercise: 'a1-wfragen' }),
        topic('imperativ', 'Imperativ', 'Emir ve rica cümlelerinde fiili başa getir.', [
          'Komm bitte herein!', 'Machen Sie die Tür zu!', 'Lest den Text!', 'Sei bitte leise!'
        ], { source: 'PDF s. 69–70', exercise: 'a1-imperative' }),
        topic('perfekt', 'Perfekt · haben / sein', 'Yardımcı fiil ikinci yerde, Partizip II cümlenin sonunda olur.', [
          'Ich habe Fußball gespielt.', 'Wir sind nach Berlin gefahren.', 'Er hat Wasser getrunken.', 'Sie ist früh aufgestanden.'
        ], { source: 'PDF s. 77–79', exercise: 'a1-perfect' })
      ]
    },
    A2: {
      label: 'Temel', outcome: 'Günlük durumları daha ayrıntılı anlat.', color: '#1cb0f6', topics: [
        topic('a2-perfekt', 'Perfekt ve Präteritum', 'Geçmiş olayları uygun zamanla anlat.', ['Ich habe lange gearbeitet.', 'Früher war ich in Köln.', 'Wir hatten wenig Zeit.']),
        topic('a2-dativ', 'Dativ', 'Dolaylı nesneyi ve Dativ isteyen yapıları kullan.', ['Ich helfe dem Mann.', 'Sie gibt der Kollegin das Buch.', 'Das gehört mir.']),
        topic('a2-wechsel', 'Wechselpräpositionen', 'Wo? için Dativ, Wohin? için Akkusativ seç.', ['Das Bild hängt an der Wand.', 'Ich hänge das Bild an die Wand.', 'Wir sitzen auf dem Balkon.']),
        topic('a2-nebensatz', 'weil, dass, wenn', 'Yan cümlede çekimli fiili sona gönder.', ['Ich bleibe zu Hause, weil ich krank bin.', 'Ich weiß, dass du heute arbeitest.', 'Wenn es regnet, fahren wir nicht.']),
        topic('a2-reflexiv', 'Dönüşlü fiiller', 'Reflexiv zamiri özneye göre çek.', ['Ich freue mich auf den Urlaub.', 'Du interessierst dich für Musik.', 'Wir treffen uns um acht.']),
        topic('a2-vergleich', 'Komparativ ve Superlativ', 'Kişi ve nesneleri karşılaştır.', ['Berlin ist größer als Bonn.', 'Heute ist es wärmer.', 'Das ist am besten.']),
        topic('a2-adjektiv', 'Sıfat çekimi · temel', 'Sıfat ekini artikel ve ismin hâline göre seç.', ['Das ist ein schöner Park.', 'Ich kaufe eine rote Jacke.', 'Wir wohnen in einem kleinen Haus.']),
        topic('a2-konjunktiv', 'Konjunktiv II · rica', 'Nazik istek ve öneriler kur.', ['Ich hätte gern einen Tee.', 'Könnten Sie mir helfen?', 'Wir könnten zusammen fahren.']),
        topic('a2-relativ', 'Relativsätze · temel', 'İsim hakkında ek bilgi ver.', ['Das ist der Mann, der hier arbeitet.', 'Ich suche das Buch, das du hast.', 'Die Frau, die dort sitzt, ist Ärztin.']),
        topic('a2-indirekt', 'Dolaylı sorular', 'Soruyu daha nazik ve bağlı bir yapıyla sor.', ['Wissen Sie, wo der Bahnhof ist?', 'Kannst du sagen, wann er kommt?', 'Ich weiß nicht, ob sie Zeit hat.'])
      ]
    },
    B1: {
      label: 'Orta', outcome: 'Bağlı, gerekçeli ve sınava uygun cümleler kur.', color: '#ce82ff', topics: [
        topic('b1-konnektoren', 'Bağlaçlar', 'Fikirleri neden, karşıtlık ve amaçla bağla.', ['Obwohl es regnet, gehen wir raus.', 'Ich lerne, damit ich die Prüfung bestehe.', 'Bevor wir anfangen, trinken wir Kaffee.']),
        topic('b1-relativ', 'Relativsätze · tüm hâller', 'Kişi ve nesneleri Nominativ, Akkusativ ve Dativ ile açıkla.', ['Das ist der Mann, den ich kenne.', 'Die Frau, der ich helfe, ist nett.', 'Das ist das Buch, von dem ich erzählt habe.']),
        topic('b1-adjektiv', 'Sıfat çekimi', 'Artikelli ve artikelsiz yapılarda doğru eki seç.', ['Frischer Kaffee schmeckt gut.', 'Ich brauche einen neuen Termin.', 'Wir sprechen mit netten Kollegen.']),
        topic('b1-konjunktiv', 'Konjunktiv II', 'Dilek, öneri ve gerçek dışı durum anlat.', ['Wenn ich Zeit hätte, würde ich kommen.', 'An deiner Stelle würde ich lernen.', 'Ich wäre gern dabei.']),
        topic('b1-passiv', 'Passiv', 'Eylemi yapan yerine süreci öne çıkar.', ['Das Paket wird morgen geliefert.', 'Die Straße wurde gesperrt.', 'Hier darf nicht geraucht werden.']),
        topic('b1-infinitiv', 'zu / um … zu', 'Amaç ve tamamlayıcı eylemleri bağla.', ['Ich versuche, früher zu kommen.', 'Wir treffen uns, um alles zu planen.', 'Er ging, ohne sich zu verabschieden.']),
        topic('b1-pronominal', 'da- / wo- yapıları', 'Nesneler hakkında edatlı sorular ve cevaplar kur.', ['Worauf wartest du?', 'Ich freue mich darauf.', 'Darüber müssen wir sprechen.']),
        topic('b1-genitiv', 'Genitiv', 'Aitlik ilişkisini daha resmî biçimde anlat.', ['Das Auto meines Bruders ist neu.', 'Wegen des Wetters bleiben wir hier.', 'Während des Kurses lerne ich viel.']),
        topic('b1-temporal', 'Zaman bağlaçları', 'Olayların sırasını açıkça göster.', ['Nachdem ich gegessen hatte, ging ich raus.', 'Seitdem ich hier wohne, fahre ich Rad.', 'Während sie kocht, decke ich den Tisch.']),
        topic('b1-indirekt', 'Dolaylı anlatım · temel', 'Başkasının sözünü aktar.', ['Er sagt, dass er später kommt.', 'Sie meinte, sie habe keine Zeit.', 'Laut Anna fällt der Kurs aus.'])
      ]
    },
    B2: {
      label: 'İleri orta', outcome: 'Karmaşık metinlerde esnek ve doğru yapı seç.', color: '#ff9600', topics: [
        topic('b2-passiv', 'Passiv çeşitleri', 'Süreç, durum ve alternatif edilgen yapıları ayır.', ['Die Tür wird geschlossen.', 'Die Tür ist geschlossen.', 'Das Problem lässt sich lösen.']),
        topic('b2-konjunktiv1', 'Konjunktiv I', 'Dolaylı aktarımda konuşmacıyla arana mesafe koy.', ['Er sagt, er sei krank.', 'Sie erklärt, sie habe alles geprüft.', 'Der Zeuge behauptet, er wisse nichts.']),
        topic('b2-konnektoren', 'İleri bağlaçlar', 'Metin ilişkilerini daha kesin ifade et.', ['Einerseits ist es teuer, andererseits ist es praktisch.', 'Sofern du Zeit hast, komm vorbei.', 'Je mehr ich übe, desto sicherer werde ich.']),
        topic('b2-partizip', 'Partizip als Adjektiv', 'Eylemleri sıkıştırılmış sıfat yapısıyla anlat.', ['die wartenden Gäste', 'das gestern gekaufte Buch', 'die gut vorbereitete Präsentation']),
        topic('b2-nominal', 'Nominalleştirme', 'Fiil ve sıfatları isimleştirerek resmî üslup kur.', ['Nach der Ankunft begann die Sitzung.', 'Die Verbesserung der Qualität ist wichtig.', 'Trotz seiner Ablehnung wurde abgestimmt.']),
        topic('b2-funktionsverb', 'Funktionsverbgefüge', 'Akademik ve resmî kalıp yapıları kullan.', ['eine Entscheidung treffen', 'zur Verfügung stehen', 'Kritik üben']),
        topic('b2-mittelfeld', 'Cümle alanı ve sözcük sırası', 'Bilgileri vurgu ve akışa göre orta alanda sırala.', ['Ich habe ihm gestern das Buch gegeben.', 'Morgen möchte ich deshalb früher gehen.', 'Das hat sie mir leider nicht erklärt.']),
        topic('b2-praeposition', 'Fiil + edat yapıları', 'Soyut ilişkileri doğru edatla ifade et.', ['Es hängt davon ab.', 'Wir verfügen über genug Zeit.', 'Sie besteht auf einer Antwort.'])
      ]
    },
    C1: {
      label: 'İleri', outcome: 'Akademik ve profesyonel dilde yüksek doğruluk sağla.', color: '#ff4b4b', topics: [
        topic('c1-satzbau', 'Karmaşık cümle mimarisi', 'Birden çok düşünceyi açık bir hiyerarşiyle bağla.', ['Was zunächst plausibel erscheint, erweist sich bei genauerer Betrachtung als problematisch.', 'Dass die Maßnahme wirkt, obwohl sie umstritten ist, lässt sich belegen.', 'Wer langfristig plant, muss berücksichtigen, dass sich Bedingungen ändern.']),
        topic('c1-indirekt', 'İleri dolaylı anlatım', 'Aktarım derecesini ve kaynağa mesafeyi yönet.', ['Der Bericht legt nahe, die Zahlen seien unvollständig.', 'Sie soll davon gewusst haben.', 'Er will den Fehler nicht bemerkt haben.']),
        topic('c1-ersatzpassiv', 'Passiv alternatifleri', 'Edilgen anlamı farklı stil seçenekleriyle kur.', ['Die Aufgabe ist zu lösen.', 'Die Datei lässt sich öffnen.', 'Das Problem gilt als behoben.']),
        topic('c1-nominalstil', 'Nominalstil', 'Yoğun ve resmî bilgi aktarımı oluştur.', ['Nach eingehender Prüfung des Antrags …', 'Die Durchführung der Maßnahme setzt eine Genehmigung voraus.', 'Aufgrund mangelnder Übereinstimmung kam es zur Ablehnung.']),
        topic('c1-partizip', 'Genişletilmiş Partizip yapıları', 'Yan cümleyi yoğun bir sıfat grubuna dönüştür.', ['die seit Jahren kontrovers diskutierte Reform', 'die von Fachleuten sorgfältig geprüften Daten', 'ein kaum zu überschätzender Einfluss']),
        topic('c1-kohasion', 'Metin bağlayıcıları', 'Argümanı tutarlı ve katmanlı biçimde ilerlet.', ['Demgegenüber ist zu beachten, dass …', 'Nichtsdestotrotz bleibt die Frage offen.', 'Daraus lässt sich folgern, dass …']),
        topic('c1-modalitaet', 'Modalite ve varsayım', 'Kesinlik, olasılık ve değerlendirme derecesini ayarla.', ['Das dürfte zutreffen.', 'Es ist anzunehmen, dass …', 'Die Ursache könnte darin liegen, dass …']),
        topic('c1-wortbildung', 'Sözcük türetme ve dönüşüm', 'Aynı içeriği farklı sözcük türleriyle ifade et.', ['verantworten – die Verantwortung – verantwortungsvoll', 'nachhaltig – die Nachhaltigkeit', 'umsetzen – die Umsetzung'])
      ]
    },
    C2: {
      label: 'Ustalık', outcome: 'Anlam inceliği, kayıt ve üslubu bilinçli yönet.', color: '#2b70c9', topics: [
        topic('c2-register', 'Üslup ve dil kaydı', 'Aynı mesajı hedef kitleye göre yeniden biçimlendir.', ['Wären Sie so freundlich, mir die Unterlagen zukommen zu lassen?', 'Schick mir bitte kurz die Unterlagen rüber.', 'Die Unterlagen sind bis Freitag einzureichen.']),
        topic('c2-fokus', 'Vurgu ve işaretli sözcük sırası', 'Bilgi odağını bilinçli olarak değiştir.', ['Gerade diese Lösung halte ich für sinnvoll.', 'Was er jedoch verschwieg, war der entscheidende Punkt.', 'Nur selten lässt sich ein derart klares Ergebnis beobachten.']),
        topic('c2-partikeln', 'Modal parçacıkların nüansı', 'Tutum ve konuşma niyetini küçük parçacıklarla aktar.', ['Das ist ja interessant.', 'Komm doch einfach mit.', 'Du wirst das wohl wissen.']),
        topic('c2-idiomatik', 'İdiomatik sözdizimi', 'Yerleşik kalıpları doğal ve bağlama uygun kullan.', ['Das steht außer Frage.', 'Es läuft darauf hinaus, dass …', 'Damit ist es nicht getan.']),
        topic('c2-verdichtung', 'Dilsel yoğunlaştırma', 'Uzun açıklamayı eksiksiz ama ekonomik biçimde sıkıştır.', ['die trotz mehrfacher Überarbeitung weiterhin fehlerhafte Fassung', 'unter Abwägung sämtlicher verfügbarer Optionen', 'angesichts der sich abzeichnenden Entwicklung']),
        topic('c2-rhetorik', 'Retorik ve metin ritmi', 'Karşıtlık, paralellik ve tekrar ile etki oluştur.', ['Nicht weil es leicht ist, sondern weil es notwendig ist.', 'Je klarer das Ziel, desto entschlossener der Weg.', 'Man kann zustimmen; man kann widersprechen; ignorieren kann man es nicht.']),
        topic('c2-norm', 'Norm, varyasyon ve bilinçli sapma', 'Standart, bölgesel ve stilistik varyantları ayır.', ['wegen des Wetters / wegen dem Wetter', 'Ich habe gestanden / ich bin gestanden.', 'Er braucht nicht zu kommen / er braucht nicht kommen.'])
      ]
    }
  };

  const exercises = {
    'a1-praesens': { title: 'Fiili doğru çek', source: 'PDF s. 8', items: [
      item('Ich ___ kein Wasser.', 'trinke', ['trinkst', 'trinke', 'trinkt'], 'ich → -e'),
      item('Markus ___ gern Fußball.', 'spielt', ['spiele', 'spielt', 'spielen'], 'er/sie/es → -t'),
      item('Ihr ___ einen Deutschkurs.', 'besucht', ['besuche', 'besucht', 'besuchen'], 'ihr → -t'),
      item('Wir ___ eine leckere Suppe.', 'kochen', ['kocht', 'koche', 'kochen'], 'wir → -en')
    ]},
    'a1-irregular': { title: 'Kök değişimini seç', source: 'PDF s. 12–15', items: [
      item('Du ___ nach Berlin.', 'fährst', ['fahrst', 'fährst', 'fahrt'], 'fahren: a → ä'),
      item('Er ___ ein Buch.', 'liest', ['lest', 'liest', 'lesen'], 'lesen: e → ie'),
      item('Sie ___ acht Stunden.', 'schläft', ['schlaft', 'schläft', 'schlafen'], 'schlafen: a → ä'),
      item('Du ___ Deutsch.', 'sprichst', ['sprechst', 'sprichst', 'spricht'], 'sprechen: e → i')
    ]},
    'a1-sein-haben': { title: 'sein mi, haben mi?', source: 'PDF s. 19', items: [
      item('Ich ___ heute müde.', 'bin', ['bin', 'habe', 'sind'], 'Durum anlatırken sein.'),
      item('Du ___ eine Frage.', 'hast', ['bist', 'hast', 'habt'], 'Sahiplikte haben.'),
      item('Wir ___ im Deutschkurs.', 'sind', ['haben', 'seid', 'sind'], 'wir + sein → sind'),
      item('Sie ___ ein neues Auto.', 'hat', ['ist', 'hat', 'haben'], 'sie (tekil) + haben → hat')
    ]},
    'a1-article': { title: 'Doğru artikeli yerleştir', source: 'PDF s. 23–26', items: [
      item('___ Computer ist neu.', 'Der', ['Der', 'Die', 'Das'], 'Computer → der'),
      item('___ Lampe ist schön.', 'Die', ['Das', 'Der', 'Die'], 'Lampe → die'),
      item('___ Auto ist schnell.', 'Das', ['Die', 'Das', 'Der'], 'Auto → das'),
      item('___ Bücher sind interessant.', 'Die', ['Der', 'Das', 'Die'], 'Çoğul → die')
    ]},
    'a1-separable': { title: 'Ayrılan eki tamamla', source: 'PDF s. 31', items: [
      item('Ich stehe um sieben Uhr ___.', 'auf', ['an', 'ein', 'auf'], 'aufstehen → stehe … auf'),
      item('Wir kaufen heute ___.', 'ein', ['fern', 'ein', 'zu'], 'einkaufen → kaufen … ein'),
      item('Er ruft seine Mutter ___.', 'an', ['auf', 'an', 'mit'], 'anrufen → ruft … an'),
      item('Macht bitte die Tür ___.', 'zu', ['zu', 'aus', 'vor'], 'zumachen → macht … zu')
    ]},
    'a1-modal': { title: 'Modal fiili seç', source: 'PDF s. 43–47', items: [
      item('Ich ___ Fußball spielen.', 'kann', ['kann', 'könnt', 'kannst'], 'ich + können → kann'),
      item('Wir ___ arbeiten.', 'müssen', ['muss', 'müsst', 'müssen'], 'wir + müssen → müssen'),
      item('___ ich hier parken?', 'Darf', ['Dürfen', 'Darf', 'Darfst'], 'ich + dürfen → darf'),
      item('Die Kinder ___ Wasser trinken.', 'sollen', ['soll', 'sollt', 'sollen'], 'die Kinder = sie (çoğul)')
    ]},
    'a1-negation': { title: 'nicht / kein / keine', source: 'PDF s. 50–54', items: [
      item('Ich lese ___ Buch.', 'kein', ['nicht', 'kein', 'keine'], 'das Buch → kein'),
      item('Er braucht ___ Lampe.', 'keine', ['kein', 'nicht', 'keine'], 'die Lampe → keine'),
      item('Mein Name ist ___ Ahmet.', 'nicht', ['keine', 'kein', 'nicht'], 'Özel isim → nicht'),
      item('Das Auto ist ___ neu.', 'nicht', ['kein', 'nicht', 'keine'], 'Sıfat → nicht')
    ]},
    'a1-wfragen': { title: 'Doğru W-sorusunu seç', source: 'PDF s. 58–63', items: [
      item('___ heißen Sie?', 'Wie', ['Wer', 'Wie', 'Wo'], 'İsim sorarken: Wie heißen …?'),
      item('___ kommen Sie?', 'Woher', ['Wohin', 'Wann', 'Woher'], 'Köken / çıkış noktası: woher'),
      item('___ wohnen Sie?', 'Wo', ['Wo', 'Was', 'Wer'], 'Yer sorarken: wo'),
      item('___ lernen Sie Deutsch?', 'Warum', ['Welche', 'Warum', 'Wie viel'], 'Neden sorarken: warum')
    ]},
    'a1-imperative': { title: 'Emir biçimini seç', source: 'PDF s. 69–70', items: [
      item('___ bitte herein! (du)', 'Komm', ['Kommst', 'Komm', 'Kommt'], 'du-Imperativ: Komm!'),
      item('___ Sie bitte die Tür zu!', 'Machen', ['Machst', 'Macht', 'Machen'], 'Sie-Imperativ: fiil + Sie'),
      item('___ den Text! (ihr)', 'Lest', ['Lest', 'Lies', 'Lesen'], 'ihr-Imperativ: Lest!'),
      item('___ bitte leise! (du)', 'Sei', ['Bist', 'Seid', 'Sei'], 'sein → Sei!')
    ]},
    'a1-perfect': { title: 'Perfekt cümlesini tamamla', source: 'PDF s. 77–79', items: [
      item('Ich habe Fußball ___.', 'gespielt', ['spielen', 'gespielt', 'spielte'], 'haben + gespielt'),
      item('Wir sind mit dem Auto ___.', 'gefahren', ['gefahrt', 'fahren', 'gefahren'], 'Hareket: sein + gefahren'),
      item('Er hat Wasser ___.', 'getrunken', ['getrinkt', 'getrunken', 'trank'], 'trinken → getrunken'),
      item('Sie ist früh ___.', 'aufgestanden', ['aufstehen', 'geaufstanden', 'aufgestanden'], 'Ayrılabilen fiil: auf + ge + standen')
    ]}
  };

  window.SPRECHRAUM_GRAMMAR_CATALOG = { levels, exercises, version: 1 };
})();
