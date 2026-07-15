# Sprechraum mobil yapay zekâ mimarisi

Bu belge, mağaza sürümündeki yerel yapay zekâ dağıtım kararlarını sabitler. Mevcut Ollama bağlantısı yalnızca masaüstü geliştirme ve içerik testi içindir.

## Kurulum akışı

1. App Store ve Google Play'den yalnızca küçük uygulama kabuğu indirilir. Hedef ilk indirme 100 MB civarıdır.
2. İlk açılışta uygulama dili, gizlilik özeti, Wi-Fi ve boş alan kontrolü gösterilir.
3. Gemma 3 1B quantized model uygulamanın özel depolama alanına indirilir.
4. İndirme durdurulabilir, kaldığı yerden devam eder ve dosya özetiyle doğrulanır.
5. Model hazır olduğunda Clara çevrimdışı çalışır. İnternet daha sonra zorunlu değildir.
6. Arka plandaki kısa performans testi cihazı 4B için değerlendirir.
7. Uygun cihazlarda Ayarlar > Yerel Yapay Zekâ Modelleri ekranında Gemma 3 4B yükseltmesi sunulur.

## Model seçenekleri

| Seçenek | Yaklaşık indirme | Kullanım | Davranış |
| --- | ---: | --- | --- |
| Gemma 3 1B | 1 GB | Temel ve varsayılan | Hızlı yanıt, düşük RAM ve pil kullanımı |
| Gemma 3 4B | 4 GB | İsteğe bağlı gelişmiş | Daha doğal diyalog ve daha güçlü değerlendirme |

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

Bu ekran gerçek mobil indirme motoru hazır olmadan web prototipine sahte işlev olarak eklenmeyecektir.
