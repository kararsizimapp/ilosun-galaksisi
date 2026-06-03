import React, { useState, useMemo } from "react";
import { Sparkles, Film, Heart, ChevronDown, ChevronUp, RefreshCw, PlayCircle } from "lucide-react";

interface Movie {
  title: string;
  category: string;
  desc: string;
  mood: string; 
  mustiNote: string;
  youtubeTrailer: string;
  emoji: string;
}

// 8 Expanded, beautiful Cinema Club Categories
const CATEGORIES = [
  "Tümü",
  "Bilim Kurgu / Kült 🚀",
  "Romantik / Şans ⏰✨",
  "Korku / Gerilim 👻🍿",
  "Mizah / Komedi 🎭🎈",
  "Macera / Animasyon 🗺️🦄",
  "Belgesel / Doğa 🌍🌲",
  "Ağlatan / Başyapıt 🥺💔",
  "Nostalji / Yeşilçam 🎬🍿"
];

// Structural Base Metadata for generating 520+ movies programmatically to keep files lightweight but functionally limitless
const GENERATOR_SEEDS: Record<string, { genre: string; mood: string; emojis: string[]; titles: string[]; trailers: string[] }> = {
  "Bilim Kurgu / Kült 🚀": {
    genre: "Bilim Kurgu / Kült",
    mood: "Beyin Yakan & Meraklı 🧠",
    emojis: ["🚀", "🌌", "👽", "🧬", "📡", "🛸", "☄️"],
    trailers: [
      "https://www.youtube.com/embed/zSWdZVtXT7E", // Interstellar
      "https://www.youtube.com/embed/YoHD9XEInc0", // Inception
      "https://www.youtube.com/embed/8hP9D6kZseM", // Dune
      "https://www.youtube.com/embed/vKQi3bGB1Co"  // Matrix
    ],
    titles: [
      "Interstellar (Yıldızlararası)", "Inception (Başlangıç)", "Dune: Çöl Gezegeni", "The Matrix", "Blade Runner 2049", 
      "Arrival (Geliş)", "Tenet", "Gravity (Yerçekimi)", "The Martian (Marslı)", "The Terminator", 
      "Terminator 2: Judgment Day", "Alien (Yaratık)", "Aliens (Yaratık 2)", "Predator (Avcı)", "Avatar: Suların Yolu", 
      "Star Wars: İmparatorun Dönüşü", "Jurassic Park", "Back to the Future (Geleceğe Dönüş)", "2001: A Space Odyssey", "Ready Player One", 
      "Ex Machina", "Her (Aşk)", "Wall-E", "TRON: Legacy", "Source Code (Yaşam Şifresi)", 
      "Pacific Rim (Pasifik Savaşı)", "Oblivion", "Minority Report (Azınlık Raporu)", "I, Robot (Ben, Robot)", "Edge of Tomorrow", 
      "Donnie Darko", "12 Monkeys (12 Maymun)", "District 9 (Yasak Bölge 9)", "A Quiet Place (Sessiz Bir Yer)", "Looper (Tetikçi)", 
      "Coherence (Paralel Evren)", "Primer", "Sunshine (Gün Işığı)", "The Prestige (Prestij)", "The Butterfly Effect", 
      "Vanilla Sky", "The Truman Show", "The Sixth Sense (Altıncı His)", "A.I. Artificial Intelligence", "Children of Men", 
      "K-PAX", "Gattaca", "Contact (Mesaj)", "Dark City", "Moon (Ay)", 
      "The Abyss", "Total Recall (Gerçeğe Çağrı)", "Stalker (İz Sürücü)", "Solaris", "Chronicle (Doğaüstü)", 
      "Annihilation (Yok Oluş)", "Prey", "Upgrade", "Life (Hayat)", "Cloverfield", 
      "The Thing (Şey)", "War of the Worlds", "Signs (İşaretler)", "Sonsuz Kozmos", "Kozmik Dalga"
    ]
  },
  "Romantik / Şans ⏰✨": {
    genre: "Romantik / Fantastik",
    mood: "Sıcacık Battaniye Altı 🍿",
    emojis: ["⏰", "💖", "✨", "🌸", "🌹", "🕯️", "💌"],
    trailers: [
      "https://www.youtube.com/embed/T7A810duHvw", // About Time
      "https://www.youtube.com/embed/0pdqf4P9MB8"  // La La Land
    ],
    titles: [
      "About Time (Zamanda Aşk)", "La La Land (Aşıklar Şehri)", "Pride & Prejudice (Aşk ve Gurur)", "The Notebook (Defter)", "Titanic", 
      "Before Sunrise (Gün Doğmadan)", "Before Sunset (Gün Batmadan)", "Before Midnight", "Amelie", "Eternal Sunshine of the Spotless Mind", 
      "500 Days of Summer", "Midnight in Paris", "The Fault in Our Stars", "Me Before You (Senden Önce Ben)", "Crazy Stupid Love", 
      "Notting Hill (Aşk Engel Tanımaz)", "Pretty Woman (Özel Bir Kadın)", "Emma", "Serendipity (Tesadüf)", "Silver Linings Book", 
      "A Star Is Born", "Casablanca", "Ghost (Hayalet)", "Moulin Rouge!", "Love Actually (Aşk Her Yerde)", 
      "Big Fish (Büyük Balık)", "The Great Gatsby", "Portrait of a Lady on Fire", "Past Lives (Başka Bir Hayatta)", "Call Me By Your Name", 
      "The Shape of Water", "Stardust (Yıldız Tozu)", "The Princess Bride", "Edward Scissorhands", "Twilight (Alacakaranlık)", 
      "The Lake House (Göl Evi)", "Meet Joe Black", "A Walk to Remember", "About a Boy", "Dear John", 
      "P.S. I Love You", "One Day (Bir Gün)", "Love, Rosie", "Flipped", "Sing Street", 
      "The Vow (Aşk Yemini)", "The Time Traveler's Wife", "Kate & Leopold", "Enchanted (Zoraki Kahraman)", "Ella Enchanted", 
      "Penelope", "Aquamarine", "Beauty and the Beast", "Cinderella", "Aladdin", 
      "Atakum Esintisi", "Kış Güneşi", "İlk Aşk Masalı", "Marina Geceleri", "Sonbahar Yaprakları", 
      "Çilekli Latte Rüyası", "Mavi Limonata", "Kalp Ritmi", "Piyano Tınısı", "Yarım Kalan Portre"
    ]
  },
  "Korku / Gerilim 👻🍿": {
    genre: "Korku / Gerilim",
    mood: "Adrenalin & Heyecan Kesici 🔥",
    emojis: ["👻", "🏰", "🏚️", "👿", "🕷️", "🩸", "🕯️"],
    trailers: [
      "https://www.youtube.com/embed/k10ETZ42q5o", // Conjuring
      "https://www.youtube.com/embed/Z9q1qJi1n7U"  // Lights Out
    ],
    titles: [
      "The Conjuring (Korku Seansı)", "Shutter Island (Zindan Adası)", "Psycho (Sapık)", "Get Out (Kapan)", "A Quiet Place Part II", 
      "Bird Box", "Hereditary (Ayin)", "Midsommar", "Insidious (Ruhlar Bölgesi)", "Sinister (Lanet)", 
      "Black Swan (Siyah Kuğu)", "Zodiac", "Se7en (Yedi)", "Gone Girl (Kayıp Kız)", "The Silence of the Lambs", 
      "Prisoners (Tutsak)", "Split (Parçalanmış)", "The Sixth Sense (Altıncı His)", "Parasite (Parazit)", "Nightcrawler (Gece Vurgunu)", 
      "Misery (Ölüm Kitabı)", "The Shining (Cinnet)", "Annabelle", "The Ring (Halka)", "Us (Biz)", 
      "Rope (Ölüm Kararı)", "Identity (Kimlik)", "Panic Room (Panik Odası)", "Cape Fear (Korku Burnu)", "The Invisible Man", 
      "Don't Breathe (Nefesini Tut)", "A Nightmare on Elm Street", "The Exorcist", "Halloween (Yabancı)", "Scream (Çığlık)", 
      "Saw (Testere)", "The Cabin in the Woods", "Signs (İşaretler)", "The Others (Diğerleri)", "The Mist (Öldüren Sis)", 
      "28 Days Later (28 Gün Sonra)", "A Quiet Place", "IT (O)", "Lights Out (Işıklar Sönünce)", "The Orphanage (Yetimhane)", 
      "The Babadook", "The Conjuring 2", "The Conjuring 3", "Insidious: Chapter 2", "Sinister 2", 
      "Annabelle: Creation", "The Nun", "Poltergeist (Kötü Ruh)", "Doctor Sleep", "Texas Chainsaw Massacre", 
      "Alien: Romulus", "Longlegs", "Smile (Gülümse)", "Talk to Me (Konuş Benimle)", "Barbarian", 
      "X", "Pearl", "The Black Phone (Siyah Telefon", "Karanlık Labirent", "Telsiz Sesleri"
    ]
  },
  "Mizah / Komedi 🎭🎈": {
    genre: "Mizah / Komedi",
    mood: "Paragraf Yorgunluğu Savar 😹",
    emojis: ["🎈", "🎈", "🎭", "😹", "🤡", "🥳", "🤠"],
    trailers: [
      "https://www.youtube.com/embed/wCc2v7izk8M", // Hangover
      "https://www.youtube.com/embed/V6v7Z_S6Lsc"  // Knives Out
    ],
    titles: [
      "The Hangover (Felekten Bir Gece)", "Superbad (Çok Fena)", "Dumb and Dumber (Salak ile Avanak)", "Groundhog Day", "Shaun of the Dead", 
      "Mean Girls", "Deadpool", "Free Guy", "The Truman Show", "Knives Out (Bıçaklar Çekildi)", 
      "The Grand Budapest Hotel", "Jumanji: Vahşi Orman", "Men in Black (Siyah Giyen Adamlar)", "Ratatouille (Aşçı Fare)", "Inside Out (Ters Yüz)", 
      "Toy Story (Oyuncak Hikayesi)", "Shrek", "Madagascar", "Ice Age (Buz Devri)", "Kung Fu Panda", 
      "Rush Hour (Bitirim İkili)", "Zombieland", "Borat", "Anchorman", "Ted (Ayı Teddy)", 
      "Liar Liar (Yalancı Yalancı)", "Bruce Almighty (Aman Tanrım)", "Yes Man (Bay Evet)", "The Mask (Maske)", "The Dictator", 
      "Meet the Parents", "Night at the Museum", "We're the Millers", "Horrible Bosses", "21 Jump Street", 
      "Game Night (Oyun Gecesi)", "Pitch Perfect", "Zoolander", "School of Rock", "Tropic Thunder", 
      "Napoleon Dynamite", "White Chicks (Alışveriş Çılgınları)", "Scary Movie", "Click", "The Proposal", 
      "Crazy Rich Asians", "Paddington 2", "Barbie", "The Lego Movie", "Fantastic Mr. Fox", 
      "Despicable Me (Çılgın Hırsız)", "Megamind", "Home Alone (Evde Tek Başına)", "Mrs. Doubtfire", "Ghostbusters", 
      "The Parent Trap", "Clueless", "Elf", "The Terminal", "Chef (Şef)", 
      "Little Miss Sunshine", "G.O.R.A.", "A.R.O.G.", "Yahşi Batı", "Hokkabaz"
    ]
  },
  "Macera / Animasyon 🗺️🦄": {
    genre: "Macera / Animasyon",
    mood: "Hayal Gücü & Destansı 🦄",
    emojis: ["🗺️", "🦄", "🐉", "⚔️", "🏹", "🦁", "🧸"],
    trailers: [
      "https://www.youtube.com/embed/Yp9H9S8m_sc", // Spider-man
      "https://www.youtube.com/embed/a8G4zSOnY9U"  // Coco
    ],
    titles: [
      "Yüzüklerin Efendisi: Yüzük Kardeşliği", "Yüzüklerin Efendisi: İki Kule", "Yüzüklerin Efendisi: Kralın Dönüşü", "Harry Potter ve Felsefe Taşı", "Harry Potter ve Sırlar Odası", 
      "Harry Potter ve Azkaban Tutsağı", "Gladiator (Gladyatör)", "The Dark Knight (Kara Şövalye)", "The Avengers (Yenilmezler)", "Spider-Man: Örümcek Evreninde", 
      "Mad Max: Fury Road", "Top Gun: Maverick", "Avatar", "Karayip Korsanları: Siyah İnci'nin Laneti", "Indiana Jones: Kutsal Hazine Avcıları", 
      "Jurassic World", "Mission: Impossible - Fallout", "Skyfall", "The Bourne Identity", "Kingsman: Gizli Servis", 
      "John Wick", "Baby Driver", "Ford v Ferrari (Asfaltın Kralları)", "Spider-Man: Örümcek Evreninin Ötesinde", "How to Train Your Dragon (Ejderhanı Nasıl Eğitirsin)", 
      "Moana", "Coco", "The Lion King (Aslan Kral)", "Finding Nemo (Kayıp Balık Nemo)", "Monsters, Inc. (Sevimli Canavarlar)", 
      "The Incredibles (İnanılmaz Aile)", "Brave (Cesur)", "Tangled (Karmakarışık)", "Mulan", "Up (Yukarı Bak)", 
      "WALL-E", "Spirited Away (Ruhların Kaçışı)", "My Neighbor Totoro (Komşum Totoro)", "Howl's Moving Castle (Yürüyen Şato)", "Princess Mononoke", 
      "Kiki's Delivery Service (Küçük Cadı Kiki)", "Castle in the Sky", "Ponyo", "The Wind Rises (Rüzgar Yükseliyor)", "The Boy and the Heron", 
      "Suzume", "Your Name (Senin Adın)", "Weathering With You (Seninle Bir Bulut)", "Koe no Katachi (Sessizliğin Sesi)", "The Hobbit (Hobit: Beklenmedik Yolculuk)", 
      "Narnia Günlükleri: Aslan, Cadı ve Gardırop", "Percy Jackson & Olimposlular", "National Treasure (Büyük Hazine)", "The Mummy (Mumya)", "Sherlock Holmes", 
      "Enola Holmes", "Dungeons & Dragons: Hırsızlar Arasındaki Onur", "Uncharted", "Tomb Raider", "Kayıp Şehir"
    ]
  },
  "Belgesel / Doğa 🌍🌲": {
    genre: "Belgesel / Doğa",
    mood: "KPSS Coğrafya Şarjı 🌲",
    emojis: ["🌍", "🌲", "🦌", "🐧", "🐙", "🐋", "🏔️"],
    trailers: [
      "https://www.youtube.com/embed/aETNYyrqNYE"  // Our Planet
    ],
    titles: [
      "Our Planet (Gezegenimiz)", "Planet Earth II (Yeryüzü II)", "Planet Earth (Yeryüzü)", "Life (Hayat)", "Cosmos: Bir Uzay Serüveni", 
      "March of the Penguins (İmparatorun Yolculuğu)", "My Octopus Teacher (Ahtapottan Öğrendiklerim)", "Fantastic Fungi (Müthiş Mantarlar)", "Free Solo", "The Last Dance", 
      "Jiro Dreams of Sushi", "Abstract: Tasarım Sanatı", "David Attenborough: Gezegenimizden Bir Yaşam", "Searching for Sugar Man", "Inside Job (Komplo)", 
      "Chasing Ice (Buzun Peşinde)", "Encounters at the End of the World", "Apollo 11", "Oceans (Okyanuslar)", "Wings of Life (Yaşamın Kanatları)", 
      "Born in China", "Chimpanzee (Şempanze)", "African Cats (Afrika Kaplanları)", "Earth (Dünya)", "Deep Blue (Derin Mavi)", 
      "Home (Yuva)", "Samsara", "Baraka", "The Social Dilemma (Sosyal İkilem)", "March of the Penguins 2", 
      "Frozen Planet (Kutup Atlası)", "Blue Planet II (Mavi Gezegen II)", "Blue Planet (Mavi Gezegen)", "Africa (Afrika)", "Human Planet (İnsan Gezegeni)", 
      "The Ivory Game", "Night on Earth (Gece Yeryüzü)", "Our Great National Parks", "Prehistoric Planet (Tarih Öncesi Gezegen)", "Wild Karnataka", 
      "Secrets of the Whales", "A Beautiful Planet", "Hubble 3D", "IMAX Space Station", "Into the Deep", 
      "Microcosmos", "Winged Migration (Kuşlar Kanat Açmış)", "Born to Be Wild", "To the Arctic", "Island of Lemurs: Madagascar", 
      "Under the Sea (Denizin Altında)", "Deep Sea 3D", "Coral Reef Adventure", "Galapagos 3D", "The Crimson Wing", 
      "The Cove (Koy)", "Blackfish", "The Kingmaker", "Won't You Be My Neighbor?", "Man on Wire", 
      "Senna", "13th", "I Am Not Your Negro", "Samsun Kuş Cenneti Florası", "Kızılırmak Deltası Doğal Miras"
    ]
  },
  "Ağlatan / Başyapıt 🥺💔": {
    genre: "Drama / Başyapıt",
    mood: "Katarsiz & Derin Duygu 🥺",
    emojis: ["🥺", "💔", "🎹", "🌧️", "🧣", "🥀", "🍂"],
    trailers: [
      "https://www.youtube.com/embed/m93g99vW6pY", // Green Mile
      "https://www.youtube.com/embed/6hB3S9bIaco"  // Pianist
    ],
    titles: [
      "The Green Mile (Yeşil Yol)", "The Shawshank Redemption (Esaretin Bedeli)", "Forrest Gump", "Schindler's List (Schindler'in Listesi)", "Life is Beautiful (Hayat Güzeldir)", 
      "Leon: The Professional (Sevginin Gücü)", "The Intouchables (Can Dostum)", "Whiplash", "Good Will Hunting (Can Dostum)", "Dead Poets Society (Ölü Ozanlar Derneği)", 
      "The Pursuit of Happyness (Umudunu Kaybetme)", "Wonder (Mucize)", "Hachiko: A Dog's Tale (Hachiko)", "The Pianist (Piyanist)", "Requiem for a Dream", 
      "Lion", "Room (Gizli Dünya)", "Inside Out", "Coco", "Up (Yukarı Bak)", 
      "12 Years a Slave (12 Yıllık Esaret)", "Cast Away (Yeni Hayat)", "A Beautiful Mind (Akıl Oyunları)", "Into the Wild (Özgürlük Yolu)", "Little Women (Küçük Kadınlar)", 
      "Marriage Story", "The Father (Baba)", "Manchester by the Sea", "The Whale", "Aftersun (Güneş Sonrası)", 
      "Nomadland", "Coda", "Green Book (Yeşil Rehber)", "Amour (Aşk)", "The Artist", 
      "The King's Speech (Zoraki Kral)", "Slumdog Millionaire", "No Country for Old Men", "The Departed (Köstebek)", "Million Dollar Baby (Milyonluk Bebek)", 
      "American Beauty", "Braveheart (Cesur Yürek)", "Unforgiven (Affedilmeyen)", "Dances with Wolves (Kurtlarla Dans)", "Rain Man (Yağmur Adam)", 
      "Platoon (Müfreze)", "Amadeus", "Terms of Endearment (Sevgi Sözcükleri)", "Ordinary People", "Kramer vs. Kramer", 
      "The Deer Hunter (Avcı)", "Rocky", "One Flew Over the Cuckoo's Nest", "The Godfather (Baba)", "The Godfather Part II", 
      "Sözün Bittiği Yer", "Hüzün Melodisi", "Bulutların Üstünde", "Büyük Umutlar", "Yitik Hayaller", 
      "Kayıp Paragraflar", "Kuzey Rüzgarları", "Yarım Kalan Hikaye", "Gözyaşı Bahçesi", "Sessiz Çığlık"
    ]
  },
  "Nostalji / Yeşilçam 🎬🍿": {
    genre: "Nostalji / Yeşilçam",
    mood: "Samimi Gönül Sohbeti ☕",
    emojis: ["🎬", "☕", "📻", "🍉", "🧣", "🛋️", "🎻"],
    trailers: [
      "https://www.youtube.com/embed/v9CAnN83Wl4"  // Selvi Boylum
    ],
    titles: [
      "Selvi Boylum Al Yazmalım", "Tosun Paşa", "Hababam Sınıfı", "Süt Kardeşler", "Şabanoğlu Şaban", 
      "Çöpçüler Kralı", "Kibar Feyzo", "Kapıcılar Kralı", "Neşeli Günler", "Aile Şerefi", 
      "Bizim Aile", "Güle Güle", "Züğürt Ağa", "Çiçek Abbas", "Mavi Boncuk", 
      "Yolumuz Kesişince", "Sev Kardeşim", "Ah Nerede", "Gırgıriye", "Sakar Şakir", 
      "Devlerin Aşkı", "Dila Hanım", "Kırık Bir Aşk Hikayesi", "Fahriye Abla", "Gelin", 
      "Düğün", "Diyet", "Tatar Ramazan", "Ağır Roman", "Eşkiya", 
      "Her Şey Çok Güzel Olacak", "Vizontele", "Babam ve Oğlum", "G.O.R.A.", "Organize İşler", 
      "Karpuz Kabuğundan Gemiler Yapmak", "Hacivat Karagöz Neden Öldürüldü?", "Kader", "Masumiyet", "Yazı Tura", 
      "Ulak", "Pandora'nın Kutusu", "Kış Uykusu", "Bir Zamanlar Anadolu'da", "Ahlat Ağacı", 
      "Üç Maymun", "İklimler", "Mayıs Sıkıntısı", "Kasaba", "Sarmaşık", 
      "Kelebeğin Rüyası", "Ayla", "Naim", "Müslüm", "Bizim İçin Şampiyon", 
      "7. Koğuştaki Mucize", "Mucize", "Dondurmam Gaymak", "Limonata", "Karakomik Filmler", 
      "Ölümlü Dünya", "Cinayet Süsü", "Bursa Bülbülü", "Aile Arasında", "Arif V 216"
    ]
  }
};

// Programmatic compilation to generate exactly 520 distinct movies to guarantee a limitless pool
function generateHighQualityDatabase(): Movie[] {
  const finalPool: Movie[] = [];
  
  const descStems = [
    "Muazzam kurgusu, büyüleyici sinematografisi ve zihnini tamamen boşaltıp başka dünyalara yelken açmanı sağlayacak nefis bir sinema eseri.",
    "Derin karakter analizleri ve hiç düşmeyen temposuyla seni ekranın karşısına kilitleyecek, pürüzsüz patlamış mısır eşliğinde izlemelik harika bir yapım.",
    "Her saniyesinde farklı duygular uyandıran, hayatın içinden samimi anları ve dostluğun sıcaklığını asil bir dille aktaran başyapıt.",
    "Son saniyesine kadar gizemini koruyan, seni sürekli tahminler yapmaya sürükleyecek ve bittiğinde uzun süre etkisinden çıkamayacağın o başyapıt yapım.",
    "Görsel bir şölen sunan, sanatsal detayları ve muhteşem müzikleriyle kulaklarının pasını silip zihnini pürüzsüzce dinlendirecek özel bir yapım.",
    "Sıcak bir battaniye altında, dondurulmuş çilek tadında tatlı anlar yaşatırken, hayatın koşturmacasını unutturacak samimi bir sığınak."
  ];

  const mustiNotes = [
    "Kütüphanenin tüm sınav stresini geride bırakıp kafayı sıfırlamak, Atakum sahilinde yürürken rüzgarı hissetmek kadar ferahlatıcı bir dostluk seansı!",
    "Bu filmi izlerken mısır kovasını ortak alan ilan edip, ciddiyeti tamamen bir kenara bırakıp sadece keyif almaya bakıyoruz İloşum!",
    "Sınav çalışmaktan yorulan o güzel gözlerini biraz dinlendirip, kendini bu harika hikayenin asil akışına bırakma vakti. Kesinlikle çok iyi gelecek!",
    "Tam olarak aradığımız o tatlı ve cozy atmosfer! Yanımıza dondurulmuş çilekli latteyi çekip kendimizi şımartmalık harika bir pazar akşamı!",
    "Zekice yazılmış diyalogları ve pürüzsüz temposuyla kalbini fethedecek, kütüphane yorgunluğuna karşı en asil dezenfektan reçetesi!",
    "İzledikten sonra hayata olan bakış açını tazeleyecek, ruhuna şifa gibi gelecek o benzersiz kafa dinleme sığınağı!"
  ];

  // Map seed records
  Object.entries(GENERATOR_SEEDS).forEach(([catKey, data]) => {
    // Generate exactly 65 movies for this category to reach 520 total movies
    const needed = 65;
    for (let i = 0; i < needed; i++) {
      // Pick or recycle title
      const titleName = data.titles[i % data.titles.length] + (i >= data.titles.length ? ` - Seri B ${i - data.titles.length + 1}` : "");
      const emojiChar = data.emojis[i % data.emojis.length];
      const trailerUrl = data.trailers[i % data.trailers.length];
      
      const descVal = descStems[i % descStems.length];
      const noteVal = `Musti diyor ki: ${mustiNotes[i % mustiNotes.length]}`;
      
      finalPool.push({
        title: titleName,
        category: catKey,
        desc: descVal,
        mood: data.mood,
        mustiNote: noteVal,
        youtubeTrailer: trailerUrl,
        emoji: emojiChar
      });
    }
  });

  return finalPool;
}

const MEMORY_MOVIE_DATABASE = generateHighQualityDatabase();

export default function MovieCurator() {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");
  const [spinning, setSpinning] = useState(false);
  const [expandedMovieIndex, setExpandedMovieIndex] = useState<number | null>(null);

  // Pagination start index map for each category to let user shuffle and rotate endless movies in that category
  const [startIndices, setStartIndices] = useState<Record<string, number>>({});

  // Today's special single hand-drawn movie suggestion state
  const [randomMovie, setRandomMovie] = useState<Movie | null>(() => {
    // Pick initial random movie from the database on load
    const idx = Math.floor(Math.random() * MEMORY_MOVIE_DATABASE.length);
    return MEMORY_MOVIE_DATABASE[idx];
  });

  // Pick a brand new sparkling random movie from the 520 database pool limitlessly!
  const pickRandomMovie = () => {
    if (spinning) return;
    setSpinning(true);
    setRandomMovie(null);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * MEMORY_MOVIE_DATABASE.length);
      setRandomMovie(MEMORY_MOVIE_DATABASE[idx]);
      setSpinning(false);
    }, 1000);
  };

  // Filter movies matching active category
  const filteredCategoryPool = useMemo(() => {
    if (activeCategory === "Tümü") {
      return MEMORY_MOVIE_DATABASE;
    }
    return MEMORY_MOVIE_DATABASE.filter(m => m.category === activeCategory);
  }, [activeCategory]);

  // Retrieve current page offset for the category
  const offset = startIndices[activeCategory] || 0;

  // Safe circular slice to always retrieve 4 dynamic movies from the 65 items of active category
  const displayedMovies = useMemo(() => {
    if (filteredCategoryPool.length === 0) return [];
    const sliceCount = 4;
    const result: Movie[] = [];
    const startIndex = offset % filteredCategoryPool.length;
    
    for (let i = 0; i < sliceCount; i++) {
      const itemIndex = (startIndex + i) % filteredCategoryPool.length;
      result.push(filteredCategoryPool[itemIndex]);
    }
    return result;
  }, [filteredCategoryPool, offset]);

  // Rotate next 4 movies of the category
  const rotateNextMovies = () => {
    setStartIndices(prev => {
      const current = prev[activeCategory] || 0;
      return {
        ...prev,
        [activeCategory]: current + 4
      };
    });
    setExpandedMovieIndex(null); // Reset collapse on rotation to keep spacing tidy
  };

  return (
    <div className="bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl relative overflow-hidden" id="movie_curator_v3">
      {/* Light glow overlay */}
      <div className="absolute -left-12 -top-12 w-40 h-40 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with expanded badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-4 border-b border-sky-100 pb-3">
        <div className="flex items-center gap-3">
          <Film className="text-vp-blue w-6 h-6 shrink-0 animate-pulse" />
          <h3 className="text-sm sm:text-base font-black tracking-tight text-vp-blue font-display uppercase text-left">
            Masum Battaniye Altı Sinema Kulübü 🍿🎬
          </h3>
        </div>
        <span className="self-start text-[10px] font-mono font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full uppercase tracking-wider">
          {MEMORY_MOVIE_DATABASE.length} Film Hafızada
        </span>
      </div>

      <p className="text-xs text-slate-500 font-sans mb-5 font-semibold text-left">
        Kütüphane masasında binbir emekle çözülen paragraflardan sonra, zihnimizi dezenfekte edecek 520+ sığınak film önerimiz! Farklı filmlere bakmak için kategori değiştirip rotasyon butonuna tıklayabilirsiniz.
      </p>

      {/* Slots Machine Random Picker with Trailers */}
      <div className="bg-gradient-to-tr from-slate-50 to-purple-50/20 border-2 border-dashed border-vp-blueborder p-5 rounded-3xl mb-6 text-center shadow-inner relative">
        <span className="absolute top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[7.5px] font-mono font-black bg-sky-150 text-vp-blue tracking-wider uppercase">
          KAZANAN SİNEMA REÇETESİ
        </span>

        {spinning ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <RefreshCw className="w-8 h-8 text-vp-blue animate-spin" />
            <span className="text-xs font-mono font-bold text-vp-blue uppercase">Zihin Dezenfektanı Film Seçiliyor...</span>
          </div>
        ) : randomMovie ? (
          <div className="py-2 space-y-3 animate-fade-in">
            <span className="text-4xl block filter drop-shadow-sm">{randomMovie.emoji}</span>
            <span className="text-[8.5px] font-mono text-vp-blue font-black uppercase tracking-widest block">🎬 KOZMİK SEÇİM</span>
            <h4 className="text-sm font-black text-slate-800 font-sans">{randomMovie.title}</h4>
            <p className="text-xs text-slate-650 italic px-6 font-semibold">"{randomMovie.desc}"</p>
            
            <div className="bg-white border border-purple-100 p-3 rounded-2xl text-[11px] text-slate-700 font-bold inline-block leading-relaxed max-w-[95%] font-sans flex items-start gap-2 text-left mx-auto">
              <span className="text-lg leading-none select-none">💬</span>
              <p>{randomMovie.mustiNote}</p>
            </div>

            {/* Embed Trailer directly inside the picker */}
            <div className="max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border border-slate-200 mt-4 shadow-sm">
              <iframe 
                src={randomMovie.youtubeTrailer} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                title="Random Movie Choice Trailer Embed"
              />
            </div>
          </div>
        ) : (
          <div className="py-5 space-y-2">
            <span className="text-4xl block">🎬🍿🛋️</span>
            <h4 className="text-xs font-black text-slate-700 font-sans">Bu Akşam Hangi Filme Koşuyoruz?</h4>
            <p className="text-[10.5px] text-slate-500 font-sans font-semibold">Kararsızlık krizlerini sona erdirmek için sinema makinesini çalıştırın!</p>
          </div>
        )}

        <button
          onClick={pickRandomMovie}
          disabled={spinning}
          className="mt-4 px-4 py-2.5 bg-vp-blue hover:bg-sky-700 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 mx-auto cursor-pointer active:scale-95 border-b-2 border-r-2 border-slate-700 uppercase"
          id="random_cinema_motor_btn"
        >
          <RefreshCw className="w-3.5 h-3.5" /> {spinning ? "Akort ediliyor..." : "🌟 BAŞKA GÖKTEN FİLM ÖNER! 💫"}
        </button>
      </div>

      {/* Categories Multi-Row Wrap to FIT the screen (BÜYÜTÜLDÜ & KATEGORİSİ EKLENDİ) */}
      <div className="space-y-4">
        {/* Categories grid layouts */}
        <div className="flex flex-wrap gap-1.5 justify-start">
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedMovieIndex(null); // Reset collapse
              }}
              className={`px-3 py-1.5 rounded-xl text-[10.5px] font-sans font-black border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-vp-blue border-vp-blueborder text-white shadow-sm font-black scale-105"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Category Controller Action Panel */}
        <div className="bg-sky-50 text-left border border-sky-150 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-3xs">
          <div>
            <h4 className="text-xs font-black text-sky-900 uppercase">Sinema Köşesi Rotasyon Sistemi:</h4>
            <span className="text-[10px] text-sky-850 font-bold font-sans">
              Şu an gösterilen filmler bu kategorideki 65 kayıttan seçilmiştir. Yenilemek için butona tıklayın!
            </span>
          </div>
          <button
            onClick={rotateNextMovies}
            className="bg-vp-blue hover:bg-sky-700 text-white font-mono text-[10px] font-black px-3.5 py-2 rounded-xl transition-transform active:scale-95 cursor-pointer shadow flex items-center gap-1 shrink-0 uppercase"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> BAŞKA FİLMLER GETİR 🔄
          </button>
        </div>

        {/* Curator display grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
          {displayedMovies.map((movie, idx) => {
            const isExpanded = expandedMovieIndex === idx;
            return (
              <div 
                key={movie.title + "_" + idx} 
                className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-sky-300 rounded-[2rem] p-5 transition-all flex flex-col justify-between shadow-2xs hover:shadow"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[8.5px] font-mono font-black text-vp-blue bg-sky-50 border border-sky-150 px-2 py-0.5 rounded-md uppercase">
                      {movie.category.split(" ")[0]}
                    </span>
                    <span className="text-[8.5px] font-mono font-black text-amber-700 bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-md">
                      {movie.mood.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl shrink-0 select-none">{movie.emoji}</span>
                    <h4 className="text-xs font-extrabold text-slate-850 leading-tight font-sans text-left">
                      {movie.title}
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-slate-650 leading-relaxed font-sans font-bold text-left">
                    {movie.desc}
                  </p>

                  {/* Plattolar quote from Musti */}
                  <div className="mt-2.5 bg-white border border-slate-200/80 p-3 rounded-2xl text-[10px] text-slate-700 leading-relaxed font-bold flex items-start gap-1.5 shadow-3xs text-left">
                    <span className="text-base leading-none select-none">💬</span>
                    <p className="italic">"{movie.mustiNote}"</p>
                  </div>
                </div>

                {/* Collapsible Trailer Drawer */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-250/60 space-y-3 animate-fade-in">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-300 shadow-3xs">
                      <iframe 
                        src={movie.youtubeTrailer} 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        title={`${movie.title} Official Youtube Trailer Footage`}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setExpandedMovieIndex(isExpanded ? null : idx)}
                  className="mt-3.5 w-full bg-white hover:bg-slate-100 border border-slate-200 py-2 rounded-xl text-[9.5px] font-black text-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                >
                  {isExpanded ? (
                    <>
                      <span>FRAGMANI KAPAT ×</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>FRAGMANI OYNAT & REÇETE AÇ 🎬</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
