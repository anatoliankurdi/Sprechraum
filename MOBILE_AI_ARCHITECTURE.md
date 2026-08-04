# Sprechraum mobil yapay zekâ mimarisi

Bu belge, mağaza sürümündeki yerel yapay zekâ dağıtım kararlarını sabitler. Mevcut Ollama bağlantısı yalnızca masaüstü geliştirme ve içerik testi içindir.

## Kurulum akışı

1. App Store ve Google Play'den yalnızca küçük uygulama kabuğu indirilir. Büyük dil modeli ve premium ses ağırlıkları mağaza paketine konmaz; hedef ilk indirme 100 MB civarıdır.
2. İlk açılışta uygulama dili, gizlilik özeti, Wi-Fi ve boş alan kontrolü gösterilir.
3. Kullanıcının açık onayından sonra Gemma 3 1B quantized model ve seçilen profesyonel yerel ses paketi uygulamanın özel depolama alanına indirilir.
4. İndirme durdurulabilir, kaldığı yerden devam eder ve dosya özetiyle doğrulanır.
5. Model hazır olduğunda Clara çevrimdışı çalışır. İnternet daha sonra zorunlu değildir.
6. Arka plandaki kısa performans testi cihazı 4B için değerlendirir.
7. Uygun cihazlarda Ayarlar > Yerel Yapay Zekâ Modelleri ekranında Gemma 3 4B yükseltmesi sunulur.

## Model seçenekleri

| Seçenek | Yaklaşık indirme | Kullanım | Davranış |
| --- | ---: | --- | --- |
| Gemma 3 1B | 1 GB | Temel ve varsayılan | Hızlı yanıt, düşük RAM ve pil kullanımı |
| Gemma 3 4B | 4 GB | İsteğe bağlı gelişmiş | Daha doğal diyalog ve daha güçlü değerlendirme |

Masaüstü geliştirme sürümü ayrıca Gemma 3 12B ve 27B katmanlarını gösterebilir. Bunlar yüksek RAM isteyen Ollama paketleridir; telefonlara önerilmez ve mağaza uygulamasının parçası değildir. Katalogdaki gerçek dosya boyutu, kurulu paketin Ollama bilgisinden okunur; sabit bir boyut varsayılmaz.

4B kurulduktan sonra kullanıcı 1B'yi yedek olarak tutabilir veya depolama alanı kazanmak için silebilir. 4B silinirse uygulama kurulu 1B'ye döner; iki model de yoksa kurulum ekranı açılır.

## Cihaz uygunluk testi

4B yalnızca şu kontrollerden sonra önerilir:

- 64 bit uyumlu cihaz ve desteklenen yerel çıkarım motoru
- tercihen en az 8 GB toplam RAM
- model, geçici indirme ve güncelleme için yeterli boş depolama
- kısa model yükleme ve ilk-token hız testinin başarıyla tamamlanması
- aşırı ısınma veya bellek baskısı görülmemesi

Uygun olmayan cihazlarda yükseltme engellenmez; kullanıcıya performans uyarısı gösterilir ve 1B önerilir.

## Mobil çalışma motoru

Ollama mobil uygulamayla birlikte dağıtılmaz. Model ağırlıkları çalıştırılabilir kod değil, uygulamanın indirdiği veri dosyalarıdır. iOS ve Android sürümleri aynı üst seviye model yöneticisini, platforma uygun yerel çıkarım motorunu ve donanım hızlandırmasını kullanır.

Model indirme katmanı şunları desteklemelidir:

- arka planda ve kaldığı yerden devam eden indirme
- Wi-Fi ile indirme tercihi
- sürüm, dosya boyutu ve SHA-256 bütünlük kontrolü
- atomik kurulum; yarım model hiçbir zaman aktif edilmez
- eski model sürümünü güvenli biçimde temizleme
- indirme, doğrulama, hazır, güncelleme ve hata durumları

Web prototipinde bu sözleşmenin masaüstü karşılığı yalnızca yerel Ollama API'sine bağlanır. Model adları güvenli katalogla sınırlandırılır; uzak bir Ollama adresine, rastgele model adına veya sessiz indirmeye izin verilmez. iOS/Android uygulamasında aynı ekran Ollama yerine uygulamanın yerel model yöneticisine bağlanır.

## Profesyonel yerel ses paketi

Ses motoru da uygulama kabuğundan ayrılır. İlk açılışta seçilen öğretmenin küçük ve lisans açısından dağıtıma uygun ses paketi indirilir. Paket sürümlenir, SHA-256 ile doğrulanır ve model yöneticisindeki gibi duraklatma/devam etme desteği kullanır. Metin, ses ve öğrenci kayıtları sunucuya gönderilmez. Masaüstü prototipindeki Supertonic bağlantısı geliştirme içindir; mağaza sürümünde iOS/Android ile uyumlu yerel çalışma zamanı ayrıca paketlenmelidir.

## İçerik paketleri

B1 temel içerik uygulama kabuğunda veya küçük başlangıç paketinde tutulur. C1 kelimeleri, yeni gramer konuları, resimler ve sınav temaları modelden bağımsız içerik paketleridir. Böylece kullanıcı yalnızca ihtiyaç duyduğu seviyeyi indirir; içerik güncellemesi dil modelini veya öğrenci hafızasını değiştirmez.

## Öğrenci hafızası

Öğrenci profili, kişisel bilgiler, çalışma geçmişi ve gelişim puanları model dosyasından tamamen ayrıdır. Model yükseltme, silme veya yeniden indirme işlemleri öğrenci hafızasını etkilemez. Hafıza cihazdaki şifreli uygulama veritabanında öğrenci kimliğine göre tutulur.

## Ayarlar ekranı

`Yerel Yapay Zekâ Modelleri` ekranı her model için şu bilgileri gösterir:

- kurulu veya indirilmeye hazır durumu
- indirme ve cihazda kapladığı alan
- hız/kalite açıklaması
- indir, duraklat, devam et, etkinleştir ve sil eylemleri
- aktif model
- son bütünlük kontrolü ve güncelleme bilgisi

Web/masaüstü prototipindeki ekran bugün Ollama'nın gerçek listeleme, indirme, etkinleştirme ve silme işlemlerini kullanır. Mobil uygulamada aynı görünüm ancak aşağıdaki yerel köprü işlemleri bağlandıktan sonra yayımlanır:

- `list`: kurulu ve indirilebilir paketleri getirir
- `download`, `pause`, `resume`: arka plan indirmesini yönetir
- `activate`: doğrulanmış modeli etkinleştirir
- `delete`: aktif olmayan modeli ve yalnızca onun dosyalarını siler
- `status`: indirme yüzdesi, doğrulama ve hata durumunu bildirir
