# Sprechraum

Yerel yapay zekâ ile çalışan, Türkçe konuşan öğrenciler için Almanca B1 sözlü sınav hazırlık prototipi.

## Başlatma

1. [Ollama](https://ollama.com) kurun ve Gemma 3 modelini indirin:

   ```sh
   ollama pull gemma3:1b-it-qat
   ```

2. Uygulamayı başlatın:

   ```sh
   node server.mjs
   ```

3. Tarayıcıda `http://127.0.0.1:4173` adresini açın.

### Ücretsiz profesyonel ses

Proje Supertonic 3 yerel ses motorunu kullanır. Kurulum bu çalışma klasöründe tamamlanmıştır; `node server.mjs` çalıştırıldığında ses sunucusu da otomatik başlar. Başka bir bilgisayarda ilk kurulum için:

```sh
python3 -m venv .supertonic-venv
.supertonic-venv/bin/python -m pip install 'supertonic[serve]==1.3.1'
.supertonic-venv/bin/supertonic download
```

Model yaklaşık 400 MB olarak kullanıcı önbelleğine indirilir. Ayarlar içinden Clara, Mia, Frau Weber veya Lukas seçilebilir. Her karakter farklı bir yerel Supertonic sesi kullanır; servis kapalıysa uygulama otomatik olarak cihazın Almanca sistem sesine döner.

Model etiketi kurulumunuzda farklıysa uygulamadaki **Yerel AI ayarları** bölümünden değiştirin. PDF metin çıkarımı için Python ortamında `pypdf` gerekir; TXT, Markdown ve JSON ek bağımlılık istemez.

## İçerik

- `Sich vorstellen`, `Gemeinsam etwas planen`, `Ein Problem lösen` ve `Bildbeschreibung`
- Hızlı Gemma 3 1B / Ollama bağlantısı ve model çevrimdışıysa PDF içinden güvenli yedek cevaplar
- PDF içindeki durum ve A/B konuşmalarını eşleştiren kaynak-kilitli sınav motoru
- A/B diyalogu bulunan temalarda beklemeden kaynak satırından anlık cevap; yalnız eksik diyaloglarda yerel Gemma tamamlama
- Her oturumda rastgele A/B rolü ve rastgele konuşma başlangıcı
- Konu dışı cevapları algılayıp seçili sınav görevine geri yönlendirme
- Tarayıcı ses tanıma ve ücretsiz yerel Supertonic 3 Almanca TTS; konuşma sırasında senkron ses aktivitesi
- Dört kaydedilebilir avatar/ses karakteri ve yerel motor kapalıyken otomatik sistem sesi geri dönüşü
- Basılı tutarak konuşma ve eller serbest kesintisiz konuşma seçenekleri
- Almanca seslere göre ağız şekli değiştiren animasyonlu 2D avatar
- PDF/TXT/MD/JSON kaynak kütüphanesi
- Günlük kelime kartları, B1 gramer dersleri ve ilerleme ekranı
- Goethe-Zertifikat B1 Wortliste PDF'sinden üretilen 3.226 çevrimdışı kelime kartı; kelime ve gecikmeli örnek cümle sesi, kullanıcı dilinde yerel çeviri ve cümledeki anlama göre 75 sıcak editoryal 2D sahneden seçilen taşmasız illüstrasyon
- Uygulama açılışında/telefona dönüşte gösterilebilen, kapatılabilir ve kelime sayısı ayarlanabilir hızlı günlük tekrar
- Masaüstü, tablet ve mobil uyumlu profesyonel arayüz

## Üretim için sonraki teknik katman

Uygulama PWA olarak hazırlanmıştır. Telefon ve bilgisayar aynı yerel ağdaysa sunucuyu ağ adresinde yayınlayarak telefondan açabilir, Safari/Chrome menüsündeki **Ana Ekrana Ekle** seçeneğiyle uygulama gibi kurabilirsiniz. Mikrofon için HTTPS veya güvenilir yerel adres gerekir.

Telefon testi için sunucuyu şu şekilde başlatın:

```sh
HOST=0.0.0.0 node server.mjs
```

Sonra bilgisayarın yerel IP adresini kullanarak telefondan `http://BILGISAYAR-IP:4173` adresini açın. PWA kurulumu çalışır; iPhone ve bazı Android tarayıcılarında mikrofon özelliği yerel IP üzerinde HTTPS isteyebilir. Mağazaya gönderilecek sürümde aynı arayüz Capacitor/native kabuk içinde çalıştırılarak mikrofon izni doğrudan alınmalıdır.

Mevcut 2D avatar, Almanca harf ve ses gruplarına göre `A/E/I/O/U/M/F` ağız şekillerini değiştirir. Üretim sürümünde daha hassas fonem zamanlaması için yerel TTS motorunun fonem süreleri bu ağız şekillerine bağlanabilir.

Mobil sürümde yapay zekâ modeli mağaza paketine gömülmeyecektir. Küçük uygulama ilk açılışta Gemma 3 1B modelini indirir; cihaz uygunluk testini geçen kullanıcılara isteğe bağlı Gemma 3 4B yükseltmesi sunulur. Ayrıntılı ve bağlayıcı uygulama planı için [mobil yapay zekâ mimarisi](MOBILE_AI_ARCHITECTURE.md) belgesine bakın.

Ses modeli de mağaza paketine eklenmez. Mevcut statik uygulama dosyaları yaklaşık 17 MB'tır; `.supertonic-venv` ve kullanıcı önbelleğindeki yaklaşık 385 MB Supertonic modeli dağıtım paketinin dışındadır. Uygulama önce cihazın çevrimdışı Almanca sesini kullanabilir, kullanıcı isterse ayarlardan kaliteli yerel ses paketini sonradan indirebilir. iOS/Android üretiminde bu model uygulamanın `Application Support` alanına indirilip yerel native çalışma zamanı üzerinden çalıştırılmalıdır.

## Sonraki A1 tasarım hedefi

A1 dersleri tamamlanırken başka bir uygulamanın ekranları kopyalanmadan güçlü mikro-ders yaklaşımı Sprechraum'un özgün kimliğiyle uygulanacak: ekranda tek ve net görev, görünür ilerleme, doğru/yanlış cevaba anlamlı karakter hareketi, ders sonunda hataların yeniden çalışılması, çevrimdışı Almanca ses ve Clara ile kısa konuşma pratiği. İlk kapsam selamlaşma, isim sorma ve basit kendini tanıtma dersleri olacak.
