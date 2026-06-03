import React, { useState } from "react";
import { Calendar, MapPin, Sparkles, Clock, CloudSun, Compass, RefreshCw, CalendarDays } from "lucide-react";

interface WeatherDay {
  day: string;
  temp: string;
  condition: string;
  emoji: string;
  mustiAdvice: string;
}

interface CultureEvent {
  id: string;
  title: string;
  category: "Konser" | "Tiyatro" | "Gösteri" | "Festival";
  description: string;
  location: string;
  time: string;
  image: string;
}

interface ActivityItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
  location: string;
}

export default function SamsunCalendar() {
  const [activeSubTab, setActiveSubTab] = useState<"festivals" | "activities">("festivals");
  const [weatherTab, setWeatherTab] = useState<"3day" | "weekly" | "monthly">("3day");
  const [activityIndex, setActivityIndex] = useState(0);

  // Samsun Atakum Custom Weather Prognosis June/July 2026 (Cleaned of kanka)
  const weatherForecast3Day: WeatherDay[] = [
    {
      day: "Bugün",
      temp: "24°C",
      condition: "Açık ve Bol Güneşli",
      emoji: "☀️🏖️",
      mustiAdvice: "Atakum sahilinde rüzgar sakin! Tam waffle tabağı ve dondurulmuş çilek keyfi yapıp yürünecek harika bir gün. Ekstra hırka taşımaya gerek yok."
    },
    {
      day: "Yarın",
      temp: "21°C",
      condition: "Hafif Esintili & Bulutlu",
      emoji: "⛅🌬️",
      mustiAdvice: "Sahilde serin esintiler çıkabilir, kütüphane odaklanması için ideal! Çıkışta hırkanı kapmayı unutma güzel aslanım."
    },
    {
      day: "Sonraki Gün",
      temp: "19°C",
      condition: "Hafif Sağanak Yağış",
      emoji: "🌧️☔",
      mustiAdvice: "Yağmur berekettir. Duruşehir'de kahvemizi yudumlayıp, battaniye altında 'It Takes Two' bölüm kilitlerini açarız!"
    }
  ];

  const weatherForecastWeekly: WeatherDay[] = [
    { day: "Pazartesi", temp: "23°C", condition: "Güneşli", emoji: "☀️", mustiAdvice: "Haftaya enerjik bacak seansıyla Atakum sahilinde başlıyoruz!" },
    { day: "Salı", temp: "22°C", condition: "Parçalı Bulutlu", emoji: "⛅", mustiAdvice: "Deneme çözmek için ideal serinlik. Kütüphane masaları bizi bekler!" },
    { day: "Çarşamba", temp: "20°C", condition: "Hafif Yağmurlu", emoji: "🌧️", mustiAdvice: "Yorulmak yok, yağmur penceremize vururken sıcak latte zamanı." },
    { day: "Perşembe", temp: "21°C", condition: "Rüzgarlı", emoji: "💨", mustiAdvice: "Atakum dalgalı ama azimli aslanımız için engeller vız gelir." },
    { day: "Cuma", temp: "24°C", condition: "Güneşli", emoji: "☀️", mustiAdvice: "Güneş yüzünü gösterdi, Atila sahil yürüyüşü harika gider!" },
    { day: "Cumartesi", temp: "25°C", condition: "Bol Güneşli", emoji: "☀️😎", mustiAdvice: "Mavi gök altında dondurulmuş çilek keyfi ve derin nefesler." },
    { day: "Pazar", temp: "22°C", condition: "Bulutlu", emoji: "☁️", mustiAdvice: "Esneme ve dinlenme günü, yeni haftaya tam motivasyon akordu!" }
  ];

  const weatherForecastMonthly: { week: string; temp: string; condition: string; emoji: string; mustiAdvice: string }[] = [
    { week: "1. Hafta (1-7 Haziran)", temp: "21°C - 24°C", condition: "Ilık & Bahar Havası", emoji: "⛅🌱", mustiAdvice: "Haziran ayının ilk adımları, tazelenme ve kitap maratonuyla geçiyor." },
    { week: "2. Hafta (8-14 Haziran)", temp: "22°C - 25°C", condition: "Açık & Güneşli Sahiller", emoji: "☀️🏖️", mustiAdvice: "Yaz iyice hissettiriyor, sahil yürüyüşlerine ağırlık verebiliriz." },
    { week: "3. Hafta (15-21 Haziran)", temp: "20°C - 23°C", condition: "Hafif Geçişli Yağışlar", emoji: "🌧️🌈", mustiAdvice: "Arada yağan serinletici yağmurlarla beraber iç huzuru koruyoruz." },
    { week: "4. Hafta (22-30 Haziran)", temp: "24°C - 27°C", condition: "Sıcak & Tam Yaz Modu", emoji: "🔥🛶", mustiAdvice: "Samsun'un en güzel günleri başlıyor. Akortlu dondurmalar ve pürüzsüz motivasyon!" }
  ];

  // Exactly 25 Detailed, Immersive Future Concerts & Plays in Samsun
  const culturalEvents: CultureEvent[] = [
    {
      id: "ev1",
      title: "Duman Açık Hava Konseri",
      category: "Konser",
      description: "Samsun Doğu Park Amfi Tiyatro'da unutulmaz rock gecesi! En sevilen klasikleri Atakum sahil rüzgarıyla buluşturacağız.",
      location: "Doğu Park Amfi Tiyatro",
      time: "14 Haziran Pazar - 20:30",
      image: "🎸⚡"
    },
    {
      id: "ev2",
      title: "Sineklerin Tanrısı Tiyatro Oyunu",
      category: "Tiyatro",
      description: "Samsun AKM Büyük Salon'da sahnelenecek ödüllü performans. KPSS yorgunluğuna karşı harika bir kültürel şarj dolumu.",
      location: "Samsun Atatürk Kültür Merkezi (AKM)",
      time: "18 Haziran Perşembe - 19:30",
      image: "🎭🏛️"
    },
    {
      id: "ev3",
      title: "Doğu Demirkol Stand-Up Gecesi",
      category: "Gösteri",
      description: "Atakum Sanat Merkezi'nde kahkaha garantili stand-up şovu! Çözülen paragrafların stresini gülme seansıyla sıfırlama saati.",
      location: "Atakum Sanat Merkezi",
      time: "25 Haziran Perşembe - 20:30",
      image: "🎤😂"
    },
    {
      id: "ev4",
      title: "Simge Sağın Resitali",
      category: "Konser",
      description: "Tribünlerin kraliçesi dişi aslan İloş'a özel 'Aşkın Olayım' şarkısını can kulağıyla dinleyeceğimiz muazzam açık hava sahnesi.",
      location: "Batı Park Açık Hava Sahnesi",
      time: "02 Temmuz Perşembe - 21:00",
      image: "👸✨"
    },
    {
      id: "ev5",
      title: "Yüzyüzeyken Konuşuruz Konseri",
      category: "Konser",
      description: "Samsun sahilinde alternatif rock dalgası! Yıldızlar altında gitar eşliğinde en sevilen melodiler.",
      location: "Fener Plajı Konser Alanı",
      time: "17 Haziran Çarşamba - 20:00",
      image: "🎙️🎵"
    },
    {
      id: "ev6",
      title: "Cem Adrian Resitali",
      category: "Konser",
      description: "Yüksek vokaller, pürüzsüz akorlar. Samsun AKM salonunda duygusal pencereleri açacak muhteşem akustik.",
      location: "Samsun AKM Konser Salonu",
      time: "20 Haziran Cumartesi - 21:15",
      image: "🎹🕯️"
    },
    {
      id: "ev7",
      title: "Samsun Uluslararası Caz Günleri",
      category: "Festival",
      description: "Dünyanın dört bir yanından gelen caz sanatçılarının katılımıyla Atakum kumsallarında pürüzsüz melodiler yükseliyor.",
      location: "Atakum Marina Açık Alan",
      time: "28 Haziran Pazar - 18:00",
      image: "🎷🌴"
    },
    {
      id: "ev8",
      title: "Sırça Kümes Tiyatro Gösterimi",
      category: "Tiyatro",
      description: "Devlet Tiyatroları ekibinden klasikleşmiş aile dramı. Sanatsal derinliği yüksek, akıllara kazınacak performans.",
      location: "Samsun AKM Tiyatro Salonu",
      time: "05 Temmuz Pazar - 20:00",
      image: "📜🕯️"
    },
    {
      id: "ev9",
      title: "Kaan Sekban Saçmalar Stand-Up",
      category: "Gösteri",
      description: "Plaza hayatından sahnelere uzanan muhteşem hikaye. Sınav döneminde kütüphaneden kaçıp deşarj olmak için birebir.",
      location: "Atakum Sanat Sahnesi",
      time: "19 Temmuz Pazar - 20:30",
      image: "👔🎪"
    },
    {
      id: "ev10",
      title: "Mabel Matiz Senfonik",
      category: "Konser",
      description: "Senfoni orkestrası eşliğinde Mabel Matiz'in eşsiz diskografisi Samsun semalarında yankılanıyor.",
      location: "Doğu Park Amfi Tiyatro",
      time: "11 Temmuz Cumartesi - 21:00",
      image: "🎻💫"
    },
    {
      id: "ev11",
      title: "Bir Delinin Hatıra Defteri",
      category: "Tiyatro",
      description: "Gogol'ün efsane eseri tek kişilik dev kadro yorumuyla Samsun seyircisiyle buluşuyor. Gerilim ve zeka dolu.",
      location: "Samsun AKM Büyük Salon",
      time: "25 Temmuz Cumartesi - 19:30",
      image: "✒️🎭"
    },
    {
      id: "ev12",
      title: "Zeynep Bastık Akustik Sahne",
      category: "Konser",
      description: "Atakum melteminde, akustik gitarlar ve eşsiz yorumlarla içinizi ısıtacak bir yaz akşamı dinletisi.",
      location: "Atakum Yat Limanı Sahnesi",
      time: "29 Temmuz Çarşamba - 20:45",
      image: "🎸☕"
    },
    {
      id: "ev13",
      title: "Hamlet Klasik Tiyatro Oyunu",
      category: "Tiyatro",
      description: "Shakespeare'in ölümsüz trajedisi yepyeni, modern bir vizyonla Atatürk Kültür Merkezi'nde.",
      location: "Samsun Atatürk Kültür Merkezi",
      time: "08 Temmuz Çarşamba - 20:00",
      image: "💀👑"
    },
    {
      id: "ev14",
      title: "Sefo Samsun Rap Fest",
      category: "Konser",
      description: "Karadeniz'in bağrından kopan popüler hip-hop ritimleri! Atakum gençlik enerjisiyle kışı unutturacak yaz festivali.",
      location: "Batı Park Şenlik Alanı",
      time: "22 Temmuz Çarşamba - 19:00",
      image: "🎤🔥"
    },
    {
      id: "ev15",
      title: "Ata Demirer Gazinosu",
      category: "Gösteri",
      description: "Müzik, kahkaha ve nostalji! Ata Demirer orkestrasıyla hem şarkı söylüyor hem de kırıp geçiriyor.",
      location: "Atakum Sanat Merkezi Sahnesi",
      time: "04 Ağustos Salı - 20:30",
      image: "🎺🍷"
    },
    {
      id: "ev16",
      title: "Mor ve Ötesi Senfonik Konseri",
      category: "Konser",
      description: "Türk rock müziğinin öncülerinden Mor ve Ötesi, dev bir orkestrayla Samsun'da akort tazeleyecek.",
      location: "Doğu Park Amfi Tiyatro",
      time: "08 Ağustos Cumartesi - 21:00",
      image: "🥁🎺"
    },
    {
      id: "ev17",
      title: "Samsun AKM Opera Gecesi: Carmen",
      category: "Gösteri",
      description: "Görkemli kostümler, şahane korolar. Carmen operası Samsun AKM sanatsal doruk noktasına ulaşıyor.",
      location: "Samsun AKM Opera Salonu",
      time: "12 Ağustos Çarşamba - 19:30",
      image: "💃🏛️"
    },
    {
      id: "ev18",
      title: "Sunay Akın ile Görünmeyenler",
      category: "Tiyatro",
      description: "Tarihin tozlu yapraklarından derlenen inanılmaz, gizli hikayeler Sunay Akın'ın enfes anlatımıyla sahnede.",
      location: "Atakum Kültür Salonu",
      time: "15 Ağustos Cumartesi - 20:00",
      image: "📚💡"
    },
    {
      id: "ev19",
      title: "Yalın - Sahne Yıldızları",
      category: "Konser",
      description: "Aşk şarkılarının usta kalemi Yalın, Samsun gökleri altında sevgiyi mırıldanmak için sahnede.",
      location: "Batı Park Açık Hava Sahnesi",
      time: "14 Temmuz Salı - 21:00",
      image: "💖✨"
    },
    {
      id: "ev20",
      title: "Fatma Turgut Rock Şöleni",
      category: "Konser",
      description: "Model grubunun unutulmaz eski vokali Fatma Turgut, güçlü sahnesiyle Atakum'u sallamaya geliyor.",
      location: "Fener Plajı Konser Alani",
      time: "18 Ağustos Salı - 20:30",
      image: "🎸🦾"
    },
    {
      id: "ev21",
      title: "Zengin Mutfağı - Şener Şen",
      category: "Tiyatro",
      description: "Usta sanatçı Şener Şen'in başrolünde yer aldığı efsanevi tiyatro oyunu Samsun'da tarihi bir gece yaşatacak.",
      location: "Samsun Doğu Park Amfi",
      time: "21 Ağustos Cuma - 20:45",
      image: "👑🍳"
    },
    {
      id: "ev22",
      title: "Samsun Gençlik Festivali 2026",
      category: "Festival",
      description: "3 gün boyunca kesintisiz müzik, kamp alanı ve çeşitli rock/rap gruplarının yer alacağı büyük Samsun klasiği.",
      location: "Sheraton Otel Yanı Festival Alanı",
      time: "25-28 Ağustos Kesintisiz",
      image: "🎪🏕️"
    },
    {
      id: "ev23",
      title: "Yasemin Sakallıoğlu Stand-Up",
      category: "Gösteri",
      description: "Tek kişilik kahkaha tufanı! İlişkiler, evlilikler ve sınav kaygıları üzerine tatlı ve iğneleyici anekdotlar.",
      location: "Atakum Sanat Merkezi",
      time: "29 Ağustos Cumartesi - 20:30",
      image: "👱‍♀️😹"
    },
    {
      id: "ev24",
      title: "Gökhan Türkmen Akustik",
      category: "Konser",
      description: "Derin, naif ve loş! Gökhan Türkmen'in en sevilen şarkıları eşliğinde kütüphane yorgunluğunu eritme seansı.",
      location: "Samsun AKM Büyük Salon",
      time: "01 Ağustos Cumartesi - 21:00",
      image: "🎻🥂"
    },
    {
      id: "ev25",
      title: "Samsun AKM Modern Dans Gösterisi",
      category: "Gösteri",
      description: "Estetik ve beden akordu! Genç koreografların hazırladığı modern dans performans şöleni.",
      location: "Samsun AKM Sahnesi",
      time: "16 Temmuz Perşembe - 19:30",
      image: "🩰✨"
    }
  ];

  // Database of 40 unique, gorgeous Activities in Samsun (Cleaned of kanka)
  const sugActivitiesPool: ActivityItem[] = [
    { id: "act1", title: "Atakum Marina Bahçelerinde Waffle & Çay İkilisi", emoji: " waffle_sea  waffle_tea 🧇☕", description: "Denize karşı dumanı üstünde taptaze bir waffle tabağı! Spor eğitmenine yakalanmadan acilen enerji takviyesi.", location: "Atakum Marina Waffle Köşesi" },
    { id: "act2", title: "Amisos Tepesi Teleferik Seferi & Günbatımı Seyri", emoji: "🎡🌅", description: "Samsun'u gökyüzünden izlerken aslan burcu asaletimizle Atakum manzarasını seyre dalarak derin nefesler alacağımız anlar.", location: "Batı Park Amisos Tepesi Teleferiği" },
    { id: "act3", title: "Atakum Sahil Hattı Boyunca Kıtır Yeşil Erik Turu", emoji: "🍏🧂", description: "Halk iskelesinden başlayıp bir kase ekşi yeşil eriğe bol tuz döküp kıtırdatarak sahili baştan başa turlayıp eğlenme saati.", location: "Atakum Sahil Yolu Yürüyüş Parkuru" },
    { id: "act4", title: "Samsun İl Halk Kütüphanesinde Ortak Masa Kapatmaca", emoji: "📚✍️", description: "Tarih ve coğrafyayı sarsacak sessiz fırtınalar koparmak, günde bol soru devirirken mola kahveleri hazırlama.", location: "Duruşehir İl Halk Kütüphanesi" },
    { id: "act5", title: "Batı Park Alanında Çimlerin Üzerinde Akortlu Çay Seansı", emoji: "🧺🧉", description: "Hafif esintiye karşı termosumuzda dumanı tüten çayı yudumlarken mor franchise dükkanı hayallerimizi kurma saati.", location: "Batı Park Sahil Çimliği" },
    { id: "act6", title: "Atila Sahili Bisiklet Parkurunda Çift Kişilik Tandem Turu", emoji: "🚲🚲", description: "Sahilde iki kişilik bisiklete binip rüzgar arkamızda pedallarken kütüphane yorgunluğunu geride bırakma seansı.", location: "Atakum Sahili Bisiklet Yolu" },
    { id: "act7", title: "Çakırlar Korusu Ahşap Köprülerde Sabah Yürüyüşü", emoji: "🌲🚶‍♀️", description: "Sarmaşıkların altındaki tahta yollarda nem kokuları ve kuş ciklemeleriyle akciğerlere temiz oksijen çekme turu.", location: "Çakırlar Ormanı Korusu" },
    { id: "act8", title: "Duruşehir Kahveciler Sokağında Limonata Espresso Tadımı", emoji: "🍋☕", description: "Sert kahvenin taze sıkılmış ekşi limonla buluştuğu buzlu espresso ödem-savar serinliğiyle KPSS tarih dersine hazırlık.", location: "Duruşehir Butik Kahveciler Sokağı" },
    { id: "act9", title: "Bandırma Gemisi Müzesi ve Milli Mücadele Parkı Ziyareti", emoji: "🛳️🏛️", description: "Tarihi soluyacağımız, Bandırma Vapuru'nun ahşap güvertesinde kurtuluşun o ilk adımlarını hissettiğimiz asil seans.", location: "Doğu Park Milli Mücadele Alanı" },
    { id: "act10", title: "Kurtuluş Yolu Tütün İskelesinde Tarihi Yürüyüş", emoji: "⚓📜", description: "Denizin üstüne uzanan tarihi ahşap iskelede Atakum meltemini arkamıza alıp pürüzsüz fotoğraflar çekilme dairesi.", location: "Samsun Merkez Tütün İskelesi" },
    { id: "act11", title: "Atakum Çobanlı İskelesinden Gece Denizi Seyri", emoji: "🌌🌊", description: "İskelenin en ucuna gidip ayaklarımızı sallayarak Atakum sahilinin parıldayan ışıklarını ve yıldızları izleme.", location: "Çobanlı İskelesi Atakum" },
    { id: "act12", title: "Onur Anıtı ve Atatürk Parkı Gölgelerinde Kitap Okuma", emoji: "🐎🌳", description: "Samsun'un kalbi olan heykelin gölgeli dev parkında sessizce sevdiğimiz kitabı okuyup zihni tatlı nane gibi ferahlatma.", location: "Merkez Atatürk Parkı Onur Anıtı" },
    { id: "act13", title: "Samsun Arkeoloji Müzesinde Keşif Turu", emoji: "🏺🏛️", description: "Mitolojik mozaikleri ve aslan lahitlerini pürüzsüz antik eserler koridorunda hayranlıkla inceleme saati.", location: "Samsun Arkeoloji Müzesi" },
    { id: "act14", title: "Kızılırmak Deltası Kuş Cennetinde Safari & Fotoğrafçılık", emoji: "🦅📸", description: "Yılkı atlarının ve onlarca nadir kuş çeşidinin arasında doğanın asıl pürüzsüz ritmini kadraja alma macerası.", location: "19 Mayıs Kızılırmak Deltası" },
    { id: "act15", title: "Atakum Sahilinde Taş Boyama ve Kum Koleksiyonu Yapma", emoji: "🎨🐚", description: "Kıyıdan en düzgün deniz taşlarını ve deniz kabuklarını toplayıp, sevgi akortlu desenler çizme terapisi.", location: "Atakum Sahil Hattı Kumsalları" },
    { id: "act16", title: "Tekkeköy Mağaralarında Tarih Öncesi İzlerin Peşinde", emoji: "🚶‍♀️🧗‍♀️", description: "İnsanlığın ilk yerleşim yerlerinden olan kayalık mağara patikalarında heyecanlı ve tırmanışlı bir doğa yürüyüşü.", location: "Tekkeköy Tarihi Mağaralar Parkı" },
    { id: "act17", title: "Liman Sapağı Dondurmacısından Double Antep Fıstığı Hak Etmesi", emoji: "🍦🥜", description: "Antrenman sonrasına yakışır, şeker ilavesiz ya da enfes kaymaklı manda sütlü yöresel Samsun dondurması ödülü.", location: "Samsun Liman Sapağı Eski Lezzetler" },
    { id: "act18", title: "Atakum Pilates & Esneme Stüdyosunda Günaydın Esnemesi", emoji: "🤸‍♀️🧘‍♀️", description: "Kasları uzatan, kemikleri hizalayan ve gün boyu kütüphanede dik durmayı destekleyen esneme egzersizleri.", location: "Atakum Sahil Esneme Alanı" },
    { id: "act19", title: "Samsun Kent Müzesinde Kuşaklar Arası Samsun Kültürü Söyleşisi", emoji: "🏫🎭", description: "Eski Samsun evlerinin maketleri arasında nostaljik bir yolculuk ve kentin gizli anılarını inceleme.", location: "Kent Müzesi Samsun" },
    { id: "act20", title: "Atakum Halk İskelesinde Martılara Simit Atma Seansı", emoji: "🥯🕊️", description: "Fırından taze çıkmış çıtır Samsun simidini rüzgarda asılı kalan uyanık martılarla paylaşıp gülmece.", location: "Atakum Belediye İskelesi" },
    { id: "act21", title: "Duruşehir Fırınından Samsun Simidi ve Peynir Alıp Sahile İnme", emoji: "🥯🧀", description: "Mükemmel Samsun simidini, yanına sevdiğimiz peyniri katıp sahil çimlerinde sabah kahvaltısı formunda tüketme.", location: "Atakum Çimlik Alanlar" },
    { id: "act22", title: "Samsun Sanat Tiyatrosu Sahnesinde Bağımsız Gösteri İzleme", emoji: "🎭🎟️", description: "Yerel tiyatro ekiplerinin sergilediği bağımsız dramaları en ön koltukta aslan gururuyla izleme.", location: "Samsun Sahnesi Merkez" },
    { id: "act23", title: "Atakum Sahilde Gün Doğumu Yogası", emoji: "🧘‍♀️🌅", description: "Denizden yükselen ilk kızıl ışıklarla beraber sahilde zihni boşaltıp sınav kaygılarını melteme bırakma.", location: "Atakum Sahil Kumluğu" },
    { id: "act24", title: "Amisos Mezarları Lahit Odalarında Gizemli Keşif Turu", emoji: "🏺🔱", description: "Tepedeki eski Pontus krallığı lahitlerinin poyraz fısıldayan koridorlarında gizemli keşifler yapmaca.", location: "Amisos Tepesi Parkı" },
    { id: "act25", title: "Batı Park Amazon Köyü Kanolarında Kısa Gölet Gezintisi", emoji: "🛶🌊", description: "Eski Amazon kadın savaşçıların heykelleri arasında yapay gölette sakin sakin kano sürükleme.", location: "Batı Park Su Göleti" },
    { id: "act26", title: "Atakum Sahilde Çeltik Bahçeleri ve Doğa Esintisi", emoji: "🌾🚲", description: "Sahil yolunun iç kısımlarında kalan çeltik tarlalarının yeşil kokusuyla bisiklet pedal seansı.", location: "Atakum Giriş Ovaları" },
    { id: "act27", title: "Duruşehir Akort Odasında Sessizce Yeni KPSS Denemesi Çözme", emoji: "✏️📖", description: "Tüm kapıları kapatıp, mor kalkanları çekerek rekor sözel mantık hızıyla deneme devirme.", location: "Duruşehir Musti Çalışma Masası" },
    { id: "act28", title: "Atakum Marina Balıkçılarından Sıcak Hamsi Ekmek Alımı", emoji: "🐟🥖", description: "Mevsiminde taze kızartılmış çıtır Karadeniz hamsisini bol limon döküp sahil kenarında keyifle hüpletme.", location: "Yat Limanı Balıkçı Kulübeleri" },
    { id: "act29", title: "Samsun Piazza Meydanı Kitapçılarında Roman İnceleme Saati", emoji: "🏪📚", description: "Yeni çıkan dünya klasiklerini ve kişisel gelişim kitaplarını sayfalarını koklayarak inceleme.", location: "Samsun Piazza Avm Kitapçısı" },
    { id: "act30", title: "Sahil Yolu Palmiye Gölgelerinde Yürüyüş", emoji: "🌴👒", description: "Güneş gözlüğünü takıp, en tarz hırkayı omuzlara atarak palmiyelerin altında enerjik sahil yürüyüşü.", location: "Atakum Sahil Bulvarı" },
    { id: "act31", title: "Liman Boyu Deniz Feneri Altında Fısıltılı Hayaller Akordu", emoji: "🚨🌌", description: "Karanlık çöktüğünde yanıp sönen fenerin ışığı altında hedefleri ve Mor franchise dükkanını konuşmak.", location: "Atakum Deniz Feneri Noktası" },
    { id: "act32", title: "Samsun Pazarından Sulu Amasya Elmaları Toplamak", emoji: "🍎🟢", description: "Kıtır kıtır ekşi ve tatlı elmaları seçip, kütüphane molalarında ısırmalık sağlıklı atıştırmalık yapma.", location: "Atakum Semt Pazarları" },
    { id: "act33", title: "Atakum Tenis Kulübünde Eğlenceli Başlangıç Seti", emoji: "🎾🤸‍♀️", description: "Rakipleri koşturacak cinsten sert servislerle Atakum tenis kortunda pürüzsüz ter dökme seansı.", location: "Tenis Kortları Sahil Tesisleri" },
    { id: "act34", title: "OMÜ Gölet Çevresinde Doğa Pikniği", emoji: "🧺🌾", description: "Kampüsün üst kısmındaki ormanlık gölet kenarında kilimi serip mor çiçekler eşliğinde dinlenmece.", location: "OMÜ Yaşam Merkezi Göleti" },
    { id: "act35", title: "Atakum Sanat Galerisinde Güncel Suluboya Sergisi Gezisi", emoji: "🎨🖼️", description: "Yaratıcı fırça darbelerinden çıkan, denizi ve Karadeniz hayatını anlatan eşsiz tabloların büyüleyiciliği.", location: "Atakum Belediyesi Sergi Sarayı" },
    { id: "act36", title: "Samsun AKM Klasik Piyano Resitalleri Dinletisi", emoji: "🎹🎼", description: "Bach ve Chopin akorlarının zihni pürüzsüzce rahatlatacağı, KPSS zihinsel yorgunluğunu silen seans.", location: "Samsun Gençlik Klasik Müzik Merkezi" },
    { id: "act37", title: "Atakum Sahil Kafe Kütüphanesinde Sessiz Ders Maratonu", emoji: "🎒✍️", description: "Deniz dalgalarının kıyıya vuruş ritmi eşliğinde, cam kenarında 4 saat kesintisiz coğrafya ezberleme.", location: "Atakum Belediyesi Sahil Kitap Kafe" },
    { id: "act38", title: "Kızılırmak Deltasında Günbatımı Manzaralı Bisiklet Kiralaması", emoji: "🌅🚲", description: "Güneş sazlıkların ardında kaybolup pürüzsüz kızıllıklar saçarken doğanın içinde pedal çevirme huzuru.", location: "Kuş Cenneti Delta Parkuru" },
    { id: "act39", title: "Atakum Yeşilyurt Çimlerine Yayılıp Gökyüzünü Seyretme", emoji: "🍀☁️", description: "Çimlerin üstünde sırtüstü uzanıp geçen pamuk bulutları izleme ve zihinsel akort tazeleme dakikaları.", location: "Yeşilyurt Avm Arkası Sahil Alanı" },
    { id: "act40", title: "Duruşehir Parkı Ağaç Evlerinde Gizli Sözel Mantık Seansı", emoji: "🌲🏡", description: "Parkın ağaç evli sessiz köşelerinde, rüzgar esintisiyle kimseye görünmeden 50 mantık sorusu parçalama.", location: "Duruşehir Doğa Parkı" }
  ];

  // WhatsApp redirect function was removed per user request

  const handleNextActivities = () => {
    setActivityIndex((prev) => {
      const next = prev + 15;
      return next >= sugActivitiesPool.length ? 0 : next;
    });
  };

  const visibleActivities = sugActivitiesPool.slice(activityIndex, activityIndex + 15);

  return (
    <div className="bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl" id="samsun_guide_v3">
      
      {/* Top Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <div className="flex items-center gap-3">
            <MapPin className="text-vp-blue w-6 h-6 shrink-0 animate-bounce" />
            <h3 className="text-lg font-black tracking-tight text-vp-blue font-display uppercase">
              Samsun Gezi, Kültür & Atakum Rehberi 🌊⛵
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1 font-semibold">
            Samsun ve Atila sahil hattının anlık rüzgar akortları, genişletilmiş konser takvimleri ve kararsızlığı gideren kaçamak planlayıcısı!
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveSubTab("festivals")}
            className={`px-3.5 py-1.5 rounded-xl text-3xs sm:text-2xs font-black transition-all cursor-pointer ${
              activeSubTab === "festivals" ? "bg-vp-blue text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
             🎭 KONSER & TİYATROLAR ({culturalEvents.length})
          </button>
          <button
            onClick={() => setActiveSubTab("activities")}
            className={`px-3.5 py-1.5 rounded-xl text-3xs sm:text-2xs font-black transition-all cursor-pointer ${
              activeSubTab === "activities" ? "bg-vp-blue text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
             🚲 NELER YAPMALI? ({sugActivitiesPool.length})
          </button>
        </div>
      </div>

      {/* 1. Samsun Weather Forecast Center component with Daily, Weekly, and Monthly projections */}
      <div className="bg-gradient-to-tr from-sky-50 via-white to-amber-50/20 border-2 border-vp-blueborder rounded-3xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
          <h4 className="text-xs font-black text-vp-blue uppercase tracking-wider flex items-center gap-1.5">
            <CloudSun className="w-5 h-5 text-vp-blue shrink-0 animate-pulse" />
            Atakum Kozmik Hava İstasyonu (Forecast Center)
          </h4>
          
          {/* Sub-tab selection for Weather periods */}
          <div className="flex gap-1 p-1 bg-sky-50/70 border border-sky-100/80 rounded-xl" id="weather_periods_tab">
            <button
              onClick={() => setWeatherTab("3day")}
              className={`text-[9px] px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                weatherTab === "3day" ? "bg-vp-blue text-white shadow-xs" : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              📅 3 GÜNLÜK
            </button>
            <button
              onClick={() => setWeatherTab("weekly")}
              className={`text-[9px] px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                weatherTab === "weekly" ? "bg-vp-blue text-white shadow-xs" : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              🗓️ HAFTALIK (7 GÜN)
            </button>
            <button
              onClick={() => setWeatherTab("monthly")}
              className={`text-[9px] px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                weatherTab === "monthly" ? "bg-vp-blue text-white shadow-xs" : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              🔮 HAZİRAN AYI
            </button>
          </div>
        </div>

        {/* 3-Day Forecast Grid View */}
        {weatherTab === "3day" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {weatherForecast3Day.map((w, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 p-3.5 rounded-2xl hover:border-vp-blueborder transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono font-black text-slate-400 uppercase">{w.day}</span>
                    <span className="text-lg filter drop-shadow-xs">{w.emoji}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-base font-black text-slate-800">{w.temp}</span>
                    <span className="text-3xs text-slate-450 font-sans font-bold">({w.condition})</span>
                  </div>
                </div>
                <p className="text-[10px] text-sky-900 bg-sky-50/70 p-2 rounded-xl font-sans font-semibold leading-relaxed border border-sky-100/60 mt-1">
                  🤖 <strong className="text-vp-blue">Musti Akort Notu:</strong> {w.mustiAdvice}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Weekly 7-Day Forecast Grid View */}
        {weatherTab === "weekly" && (
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 animate-fade-in">
            {weatherForecastWeekly.map((w, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-150 p-2.5 rounded-xl hover:border-vp-blueborder transition-all flex flex-col justify-between text-center"
              >
                <div>
                  <span className="text-[8.5px] font-mono font-black text-slate-400 block mb-0.5 uppercase">{w.day}</span>
                  <span className="text-md block my-1 filter drop-shadow-xs">{w.emoji}</span>
                  <span className="text-xs font-black text-slate-800 block">{w.temp}</span>
                  <span className="text-[8px] text-slate-400 font-sans font-bold block mb-1.5">({w.condition})</span>
                </div>
                <span className="text-[8.5px] leading-tight text-sky-850 bg-sky-50/40 p-1 rounded-md font-sans font-medium block border border-sky-100/50">
                  {w.mustiAdvice}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Monthly June 2026 Projections View */}
        {weatherTab === "monthly" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
            {weatherForecastMonthly.map((w, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-150 p-3.5 rounded-2xl hover:border-vp-blueborder transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b pb-1 mb-2">
                  <span className="text-[10px] font-mono font-black text-sky-700">{w.week}</span>
                  <span className="text-base">{w.emoji}</span>
                </div>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-xs font-extrabold text-slate-800">{w.temp}</span>
                  <span className="text-3xs text-slate-400 font-bold">({w.condition})</span>
                </div>
                <p className="text-[9.5px] text-sky-900 bg-sky-50/60 p-2 rounded-xl font-sans font-semibold leading-relaxed border border-sky-100/40">
                  📋 <strong>Özet Görünüm:</strong> {w.mustiAdvice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Toggle Tab Contents Rendering */}

      {/* TAB A: FESTIVALS & THEATER LISTINGS (Contains detailed list of 25 events) */}
      {activeSubTab === "festivals" && (
        <div className="space-y-4 animate-fade-in" id="festivals_section">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-vp-blue" /> Samsun Yaklaşan Kültür-Sanat Güncesi (En Az 25 Etkinlik)
            </span>
            <span className="text-[9px] font-mono font-black text-vp-blue bg-white px-2.5 py-1 rounded-lg border">GÜNCEL HAZİRAN - AĞUSTOS 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar-thin">
            {culturalEvents.map((ev) => (
              <div 
                key={ev.id} 
                className="bg-white border-2 border-slate-100 p-4 rounded-2xl hover:border-vp-blueborder transition-all flex flex-col justify-between min-h-[175px] hover:shadow-xs relative"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-50 text-vp-blue border border-vp-blueborder/25 text-[8.5px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {ev.category}
                    </span>
                    <span className="text-lg">{ev.image}</span>
                  </div>

                  <h4 className="text-[11px] font-black text-slate-800 leading-snug font-sans tracking-tight mb-1 hover:text-vp-blue transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-semibold mb-3 line-clamp-3">
                    {ev.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[8.5px] font-mono text-slate-450 font-bold max-w-[150px] truncate">
                      <MapPin className="w-3 h-3 text-vp-blue" />
                      <span>{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[8.5px] font-mono text-slate-450 font-bold">
                      <Clock className="w-3 h-3 text-vp-blue" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  {/* Whatsapp direction button removed per user request */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB B: MUST-DO ACTIVITIES (Shows 15 at once vertically with shuffle/next options button) */}
      {activeSubTab === "activities" && (
        <div className="space-y-4 animate-fade-in" id="activities_section">
          
          <div className="bg-slate-50 border border-slate-205 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-widest block">
                🚴‍♀️ Samsun Keşif Rotaları & Aktiviteler
              </span>
              <p className="text-[9.5px] text-slate-500 font-sans font-medium">
                Gözüne kestirdiğin bir aktivite varsa tek tıkla paylaşabilir ya da başka seçeneklerle havuzu karıştırabilirsin!
              </p>
            </div>

            {/* Next/Shuffle activities set action */}
            <button
              onClick={handleNextActivities}
              className="bg-vp-pink hover:bg-vp-hotpink text-white text-2xs font-extrabold px-4 py-2 rounded-xl cursor-pointer transition-colors active:scale-95 flex items-center justify-center gap-1.5 shadow-sm shrink-0"
              id="activity_shuffle_btn"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> BAŞKA SEÇENEKLER 🔄
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="recommends_view_grid">
            {visibleActivities.map((act) => (
              <div 
                key={act.id} 
                className="bg-slate-50/60 border-2 border-slate-150 p-4 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-vp-blueborder transition-colors relative"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl shrink-0 select-none">{act.emoji}</span>
                    <h4 className="text-[11px] font-black text-slate-800 leading-snug font-sans tracking-tight line-clamp-1">
                      {act.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-semibold mb-2 line-clamp-2">
                    {act.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-[8.5px] font-mono font-bold text-slate-400 block truncate max-w-full">
                    📍 {act.location}
                  </span>
                  
                  {/* Whatsapp direction button removed per user request */}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt banner detailing pagination */}
          <div className="bg-amber-50/50 border border-amber-150 rounded-xl p-3 text-center text-[10px] text-amber-900 font-sans font-medium">
            💡 Gösterilenler: {activityIndex + 1} - {Math.min(activityIndex + 15, sugActivitiesPool.length)} / {sugActivitiesPool.length} aktivite. Havuzdan daha fazlasını yüklemek için yukarıdan <strong>BAŞKA SEÇENEKLER</strong> butonuna tıklayabilirsin!
          </div>
        </div>
      )}

      {/* Retro/Charming Small Status Anchor credit */}
      <p className="text-center text-[10.5px] text-slate-400 mt-6 italic font-sans font-semibold">
        "Kararsız kalındığı her an bu takvim Atakum deniz feneri gibi yolumuzu aydınlatacak!"
      </p>

    </div>
  );
}
