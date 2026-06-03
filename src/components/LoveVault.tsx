import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, Gift, Smile, Sparkles, RefreshCw, Check, Plus, Trash2, ShieldCheck, Gamepad2, Bookmark,
  Sun, CloudRain, Wind, Palette, Eye, Scale, HelpCircle, Dumbbell, AlignLeft, CheckSquare
} from "lucide-react";

interface DreamItem {
  id: string;
  dream: string;
  completed: boolean;
}

interface SecretLetter {
  id: string;
  trigger: string;
  content: string;
  opened: boolean;
}

interface StylingSuggestion {
  id: string;
  outfit: string;
  makeup: string;
  accessories: string;
  mustiVerdict: string;
  previewColor: string;
  previewTags: string[];
}

// Interactive fashion sketch mirror reflecting garments and styles with active visual rendering
function OutfitMiniSketch({ outfit, previewColor, weather, mood }: { outfit: string, previewColor: string, weather: string, mood: string }) {
  const lowers = outfit.toLowerCase();
  
  const isCoat = lowers.includes("trençkot") || lowers.includes("kaban") || lowers.includes("ceket") || lowers.includes("mont") || lowers.includes("trenckot");
  const isDress = lowers.includes("elbise");
  const isSweat = lowers.includes("sweatshirt") || lowers.includes("hoodie") || lowers.includes("hırka") || lowers.includes("kazak") || lowers.includes("triko") || lowers.includes("sweat");
  const isBandana = lowers.includes("bandana") || lowers.includes("saç bandı") || lowers.includes("taç");
  
  // Map tailwind color classes to actual hex codes for SVG render
  let fillCol = "#f472b6"; // default lovely pink
  if (previewColor.includes("slate")) fillCol = "#94a3b8";
  if (previewColor.includes("zinc")) fillCol = "#71717a";
  if (previewColor.includes("purple")) fillCol = "#c084fc";
  if (previewColor.includes("amber")) fillCol = "#fbbf24";
  if (previewColor.includes("yellow")) fillCol = "#facc15";
  if (previewColor.includes("orange")) fillCol = "#fb923c";
  if (previewColor.includes("emerald")) fillCol = "#34d399";
  if (previewColor.includes("pink")) fillCol = "#f472b6";
  if (previewColor.includes("indigo")) fillCol = "#818cf8";
  if (previewColor.includes("blue")) fillCol = "#60a5fa";
  if (previewColor.includes("rose")) fillCol = "#fb7185";
  if (previewColor.includes("red")) fillCol = "#f87171";

  return (
    <div className="w-full h-40 rounded-2xl relative overflow-hidden ring-4 ring-pink-50 border border-slate-200 shadow-inner bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-2 mb-2 select-none">
      {/* Glare and glowing light decorations */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
      <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />

      {/* SVG Doll */}
      <svg viewBox="0 0 100 120" className="w-[85px] h-[105px] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
        {/* Background aura ring */}
        <circle cx="50" cy="50" r="30" fill={fillCol} opacity="0.3" className="animate-pulse" />
        
        {/* Rich brown long wavy hair */}
        <path d="M35 38 C30 55 35 72 41 72 C45 72 44 45 50 45 C56 45 55 72 59 72 C65 72 70 55 65 38 C65 20 35 20 35 38 Z" fill="#361a0b" />
        
        {/* Skin */}
        <circle cx="50" cy="38" r="13" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.75" />
        
        {/* Saç Bandı / Bandana pink rosette overlay if activated in the text list */}
        {isBandana && (
          <g>
            <path d="M37 34 C41 28 59 28 63 34 C64 33 60 26 50 26 C40 26 36 33 37 34 Z" fill="#db2777" stroke="#be185d" strokeWidth="0.5" />
            <circle cx="39" cy="30" r="2.2" fill="#f472b6" />
            <circle cx="39" cy="30" r="0.8" fill="#fbcfe8" />
          </g>
        )}

        {/* Dynamic blushing make-up details */}
        <circle cx="44" cy="39" r="2" fill="#f43f5e" opacity="0.45" />
        <circle cx="56" cy="39" r="2" fill="#f43f5e" opacity="0.45" />
        <ellipse cx="46" cy="36" rx="1.5" ry="0.8" fill="#0f172a" />
        <ellipse cx="54" cy="36" rx="1.5" ry="0.8" fill="#0f172a" />
        <path d="M47 42 Q50 45 53 42" stroke="#0f172a" strokeWidth="0.9" fill="none" />

        {/* Neck */}
        <rect x="47" y="50" width="6" height="5" fill="#fed7aa" />

        {/* Customized outfit layout renders */}
        {isDress ? (
          <g>
            {/* Flared summer dress overlay */}
            <path d="M35 55 C39 55 44 51 50 51 C56 51 61 55 65 55 L68 90 C62 96 38 96 32 90 Z" fill={fillCol} stroke="#0f172a" strokeWidth="1.25" />
            <circle cx="43" cy="65" r="1.5" fill="#ffffff" />
            <circle cx="57" cy="73" r="1.5" fill="#ffffff" />
            <circle cx="50" cy="80" r="1.8" fill="#fef08a" />
          </g>
        ) : isCoat ? (
          <g>
            {/* Elegant double breasted trenchcoat */}
            <path d="M31 55 L69 55 L71 96 L29 96 Z" fill={fillCol} stroke="#0f172a" strokeWidth="1.5" />
            <path d="M50 55 L37 72 L50 76 Z" fill="#1e293b" opacity="0.3" />
            <path d="M50 55 L63 72 L50 76 Z" fill="#1e293b" opacity="0.3" />
            <circle cx="43" cy="67" r="1.2" fill="#fcd34d" />
            <circle cx="43" cy="77" r="1.2" fill="#fcd34d" />
            <circle cx="57" cy="67" r="1.2" fill="#fcd34d" />
            <circle cx="57" cy="77" r="1.2" fill="#fcd34d" />
          </g>
        ) : (
          <g>
            {/* Oversize sweatshirt/hırka look */}
            <path d="M29 55 Q50 51 71 55 L67 86 Q50 89 33 86 Z" fill={fillCol} stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M41 71 H59 L56 79 H44 Z" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            <line x1="47" y1="55" x2="47" y2="64" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <line x1="53" y1="55" x2="53" y2="62" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          </g>
        )}

        {/* Skin colored arms */}
        <path d="M29 55 C24 64 23 76 22 80" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M71 55 C76 64 77 76 78 80" stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="absolute bottom-2 right-3 text-[7.5px] font-mono tracking-wider font-extrabold text-blue-300">PODYUM AYNASI</span>
    </div>
  );
}

export default function LoveVault() {
  // Vault component sub-navigation: 'surpriz' (Sürprizler & Motivasyon) OR 'guzellik' (Stil & Güzellik Çetelesi)
  const [activeSubVault, setActiveSubVault] = useState<"surpriz" | "guzellik">("surpriz");

  // ============================================
  // TAB A: MUSTİ'DEN SÜRPRİZLER STATE & DATA
  // ============================================
  const friendlyCompliments = [
    "İloşum, o asil saç bandınla kütüphanede KPSS deryasını fethederken dağlar ovalar senin önünde saygıyla eğiliyor! 👑📚",
    "Hummel taytın asil duruşu ve kütüphaneye o kararlı, hızlı adımların adeta altın madalyaya koşan bir şampiyon edası taşıyor! 🏃‍♀️⚡",
    "Yeşil erik yerken yüzünü o minicik ekşitmen, günün tüm KPSS stresini yok edecek kadar sevimli ve neşe dolu! ✨🍏",
    "Musti'nin kararsızlıklarına gösterdiğin o tarifsiz asalet ve sabır, senin ne kadar asil ve temiz kalpli olduğunu her an kanıtlıyor İloş! ❤️🦁",
    "Hani kütüphaneye o kendinden emin, havalı adımlarla girişin yok mu... Aslan burcunun göz kamaştıran asaleti bizzat senden yayılıyor! 🔥✨",
    "İlker hocanın zor spor programında bile o eşsiz gücünü gösterdin. Gym salonundaki herkes azmine imrenerek bakıyor! 🏋️‍♀️🏆",
    "Dünyanın en tatlı makyaj temizleme seansı ve pürüzsüz güzellik uykusu göz kapaklarında dinlenmeyi bekliyor. Kendini çok yorma canım İloş! 🧖‍♀️💅",
    "Samsun kütüphanesinde paragraflara meydan okurken, yanındaki kahve kokusu kadar huzur veren o tatlı varlığın her şeye değer! ☕✨",
    "Her bunaldığında aklına mor yanan Komagene dükkanımız gelsin, o tabelanın mor ışığı senin o muhteşem kalbin için bizzat ayarlanacak! 🌯💜",
    "İloş, kütüphane masandaki o kararlı duruşun, gelecekteki harika memurluk günlerinin en parlak teminatı! Yolun açık olsun! 👩‍💼💫",
    "O narin ellerinle soru bankasının yapraklarını çevirirken, aslında kendi muhteşem hikayenin heyecan verici sayfalarını yazıyorsun! 📖💎",
    "Yeryüzünün en güler yüzlü, enerjisiyle girdiği her odayı aydınlatan ve hayranlık uyandıran biriciğimizsin İloş! 🌟❤️"
  ];

  const [currentCompliment, setCurrentCompliment] = useState("");
  const [heartsCount, setHeartsCount] = useState<number[]>([]);

  const secretNotesPool = [
    "Benim canım İloş'um; KPSS senin o pırıl pırıl zekanın ve azminin yanında sönük bir teferruattır. Kalemi eline aldığında arkanda her an dualarıyla seni bekleyen bir Musti var! 📝🔥",
    "Atakum rüzgarlarının saçlarını uçuşturduğu o anlarda derin bir nefes al ve gülümse. Acilen kalbine neşe kargo birliğiyle yeşil erikler ve mor dükkan hayalleri gönderildi! 🍏💜",
    "Aynadaki o eşsiz yansımana her zaman sevgi ve inançla bak İloş. Dünyanın en temiz enerjisine ve en narin kalbine sahipsin! ✨💅",
    "Kendi yarınlarını inşa etmek için kütüphanede emek veren o asil kıza hayranım. Yorulduğunda derin bir nefes al ve 'Yapabilirim!' de İloşum! ☕🦁",
    "Atakum sahilinde bol çikolatalı ve dondurmalı mini waffle kaçamağıyla KPSS stresini sıfırlamaya hazır, seni hep gülümsetecek bir Musti her zaman burada! 🥞🍓",
    "Nazar-Savar kalkanı her zaman üzerinde olsun İloş'um. Kem gözler uzak dursun, senin o duru motivasyonun tüm hedeflerini bir bir fethetsin! 🔥🧿"
  ];

  const [letters, setLetters] = useState<SecretLetter[]>([
    { id: "l1", trigger: "Sınav Stresi Dağıtıcı ✉️", content: secretNotesPool[0], opened: false },
    { id: "l2", trigger: "Moral Depolama Saati ✉️", content: secretNotesPool[1], opened: false },
    { id: "l3", trigger: "Işıltılı Güzellik Modu 🧖‍♀️", content: secretNotesPool[2], opened: false },
    { id: "l4", trigger: "Bunalma Çıkışı Acil 📚", content: secretNotesPool[3], opened: false },
    { id: "l5", trigger: "Tatlı Kaçamak Rüyası 🥞", content: secretNotesPool[4], opened: false },
    { id: "l6", trigger: "Nazar Savar Kalkanı 🧿", content: secretNotesPool[5], opened: false }
  ]);

  const [dreams, setDreams] = useState<DreamItem[]>(() => {
    const saved = localStorage.getItem("love_dreams_v2");
    return saved ? JSON.parse(saved) : [
      { id: "d1", dream: "Atakum sahilinde gün batımında 10 kilometre kesintisiz yürümek 🌅", completed: true },
      { id: "d2", dream: "Tabelası mor yanan, bizim ismimizle anılan o meşhur ilk Komagene franchise bayisi! 🌯", completed: false },
      { id: "d3", dream: "Samsun kütüphanesinde aynı masayı kapatıp KPSS'de derece yapmak 📚", completed: false },
      { id: "d4", dream: "İlker Hoca ve spor dünyasından tam not alacak o fit kas formuna ulaşmak 🏋️‍♀️", completed: false },
      { id: "d5", dream: "Matching bej trençkotlarla Atakum caddelerinde yağmur altında ıslanmak 🧥☔", completed: false },
      { id: "d6", dream: "İloş Hanım'ın kütüphane masasının ömür boyu pürüzsüz motivasyon sigortasını imzalamak 🛡️", completed: true }
    ];
  });
  const [newDream, setNewDream] = useState("");

  useEffect(() => {
    setCurrentCompliment(friendlyCompliments[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem("love_dreams_v2", JSON.stringify(dreams));
  }, [dreams]);

  const shuffleCompliment = () => {
    const randomIdx = Math.floor(Math.random() * friendlyCompliments.length);
    setCurrentCompliment(friendlyCompliments[randomIdx]);

    const newHearts = Array.from({ length: 6 }, (_, i) => Date.now() + i);
    setHeartsCount(p => [...p, ...newHearts]);
    setTimeout(() => {
      setHeartsCount(p => p.filter(h => !newHearts.includes(h)));
    }, 1200);
  };

  const openLetter = (id: string) => {
    setLetters(letters.map(l => {
      if (l.id === id) {
        const openedState = !l.opened;
        const randContent = secretNotesPool[Math.floor(Math.random() * secretNotesPool.length)];
        return { ...l, opened: openedState, content: randContent };
      }
      return { ...l, opened: false };
    }));
  };

  const handleAddDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDream.trim()) return;
    const item: DreamItem = {
      id: Date.now().toString(),
      dream: newDream.trim(),
      completed: false
    };
    setDreams([...dreams, item]);
    setNewDream("");
  };

  const toggleDream = (id: string) => {
    setDreams(dreams.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const deleteDream = (id: string) => {
    setDreams(dreams.filter(d => d.id !== id));
  };

  // ============================================
  // TAB B: UPGRADED STYLING STUDIO INDEPENDENT DATA
  // ============================================
  const [selectedWeather, setSelectedWeather] = useState<"sun" | "rain" | "wind" | "study">("study");
  const [selectedMood, setSelectedMood] = useState<"cool" | "comfy" | "chic" | "lazy">("chic");
  
  // Custom states added for "Stil & Güzellik Çetelesi" upgrades
  const [auraScore, setAuraScore] = useState(100);
  const [showHeartbeatEx, setShowHeartbeatEx] = useState(false);
  const [selectedBag, setSelectedBag] = useState<string>("Sırt Çantası 🎒");
  const [selectedLipStick, setSelectedLipStick] = useState<string>("Nude Parıltı 💄");

  // Database of custom mixed-outfit combinations
  const combosPool: Record<string, Record<string, StylingSuggestion[]>> = {
    study: {
      cool: [
        {
          id: "sc1",
          outfit: "Oversize bej kolej sweat'i, siyah Hummel yüksek bel tayt ve beyaz dökümlü spor ayakkabısı 👟",
          makeup: "Nude tonlarında nemlendirici ruj, keskin maskara rulosu ve hafif şeftali esintili aydınlatıcı",
          accessories: "Penye siyah bandana, AirPods Max ve bej omuz kütüphane çantası",
          mustiVerdict: "Musti diyor ki: Kütüphanenin kapısından asaletle girerken herkes coğrafya kitabını kapatacak! 🔥💅",
          previewColor: "bg-slate-300",
          previewTags: ["Bej Sweat", "Siyah Tayt", "Bandana"]
        }
      ],
      comfy: [
        {
          id: "sm1",
          outfit: "Pofuduk lila rengi hırka, pamuklu beyaz jogger altı ve en yumuşak tüylü çoraplar 🧦",
          makeup: "Yoğun nemlendirici dudak maskesi, nemli taze bitişli pembe allık",
          accessories: "Peluş saç bandı ve dinlendirici ahşap kütüphane gözlüğün",
          mustiVerdict: "Musti diyor ki: Peluş dostumuzla kütüphanede odaklanma şarjını maksimumlayan pofuduk görünüm! 🥑✨",
          previewColor: "bg-purple-300",
          previewTags: ["Lila Hırka", "Beyaz Jogger", "Peluş Tacı"]
        }
      ],
      chic: [
        {
          id: "sh1",
          outfit: "Saks mavisi triko kazak, mom jeans pantolon ve narin süet bilek botları 👢",
          makeup: "Hafif bordo dudak yağı glosajı, taranmış belirgin dumanlı eyeliner",
          accessories: "Küçük gümüş halka küpeler, deri retro kordonlu saat",
          mustiVerdict: "Musti diyor ki: Bu asil ve keskin aslan kraliçesi duruşuyla KPSS coğrafya nehirleri saniyede kuruyacak! 👑🌟",
          previewColor: "bg-indigo-400",
          previewTags: ["Saks Triko", "Mom Jeans", "Süet Botlar"]
        }
      ],
      lazy: [
        {
          id: "sl1",
          outfit: "Musti'nin gardırobundan ödünç alınmış gri oversize sweatshirt ve rahat pamuklu gri eşofman",
          makeup: "Sadece nemlendirici kirazlı lip balm ruju",
          accessories: "Pratik dağınık topuz örgüsü ve koruyucu aslan tılsımlı bileklik",
          mustiVerdict: "Musti diyor ki: Sweat'ime süresiz el koydun ama helal olsun, bu sweat sana benden 1000 kat daha çok yakışıyor İloşum! 🦁🧥",
          previewColor: "bg-zinc-400",
          previewTags: ["Musti Sweati", "Eşofman", "Topuz"]
        }
      ]
    },
    sun: {
      cool: [
        {
          id: "s_co1",
          outfit: "Yarım fermuarlı crop beyaz sweat, yüksek bel sporcu taytı ve koşu sneakersları 👟",
          makeup: "Güneş koruyuculu CC krem, pembe yanak jeli ve nemli dudak parlatıcısı",
          accessories: "Güneş gözlüğü ve su sızdırmaz sporcu matarası",
          mustiVerdict: "Musti diyor ki: İlker Hoca bu sportif asalete tam 10 puan basar! Sahil yürüyüşü için pürüzsüz! 🏆🏃‍♀️",
          previewColor: "bg-zinc-200",
          previewTags: ["Crop Sweat", "Yüksek Bel Tayt", "Sneakers"]
        }
      ],
      comfy: [
        {
          id: "s_cm1",
          outfit: "Oversize şeftali çizgili tişört, dökümlü keten pantolon ve ince mantar tabanlı sandaletler 👡",
          makeup: "Kiraz bitişli dudak yağı, elmacık kemiklerinde hafif altın aydınlatması",
          accessories: "Geniş kenarlı hasır şapka, kanvas bez Atakum omuz çantası",
          mustiVerdict: "Musti diyor ki: Elimizde dondurma Atakum sahil caddesinde melteme karşı süzülmelik harika tiril tiril kombin! 🍦🌊",
          previewColor: "bg-amber-100",
          previewTags: ["Şeftali Tişört", "Keten Pantolon", "Sandalet"]
        }
      ],
      chic: [
        {
          id: "s_ch1",
          outfit: "Desenli fır fırlı asil yazlık elbise, beyaz deri babetler ve süet mini omuz çantası 👜",
          makeup: "Canlı şeftali mat ruj, narin kahve tonlu göz farı gölgesi ve hafif şakayık allığı",
          accessories: "Zarif inci kolye tılsımı, ince saç taç bandı",
          mustiVerdict: "Musti diyor ki: Atakum sahiline dikiş atmaya çıkan bir asalet abidesi... Karşı caddeden geçen herkes saygıyla eğilir İloş! 👑✨",
          previewColor: "bg-pink-300",
          previewTags: ["Yazlık Elbise", "Babet", "Inci Kolye"]
        }
      ],
      lazy: [
        {
          id: "s_lz1",
          outfit: "Basic siyah t-shirt, sporcu şortu ve pofuduk terlikler",
          makeup: "Renksiz dudak koruma nemlendirici kremi",
          accessories: "Saç tokası, mini akıllı saat",
          mustiVerdict: "Musti diyor ki: Atakum balkonda yeşil erik tabağını kıtırdatarak rüzgarı seyredip dinlenmelik tatlı ev modu! 🍏🍿",
          previewColor: "bg-zinc-805",
          previewTags: ["Siyah T-shirt", "Şort", "Ev Terliği"]
        }
      ]
    },
    rain: {
      cool: [
        {
          id: "r_co1",
          outfit: "Su geçirmez bej rüzgarlık, siyah dar kesim spor pantolon ve kalın tabanlı yürüyüş botları 🥾",
          makeup: "Suya dayanıklı maskara koruması ve şeftali ruj",
          accessories: "Koruyucu aslan baskılı su sızmaz şemsiye, su geçirmez sırt çantası",
          mustiVerdict: "Musti diyor ki: Samsun yağmurlarının önünde duramayacağı asil kütüphane savaşçısı koruma kalkanı! 🌧️🛡️",
          previewColor: "bg-stone-300",
          previewTags: ["Rüzgarlık", "Siyah Pantolon", "Yürüyüş Botu"]
        }
      ],
      comfy: [
        {
          id: "r_cm1",
          outfit: "Örgü bej kazak, bol kesim kadife pantolon ve içi yünlü yumuşak sıcak botlar 👢",
          makeup: "Ballı dudak nemlendirici maskesi, pembe dudak kalemi",
          accessories: "Kulak içi sıcak peluşlar, kahve kupası fısıldayan eldivenler",
          mustiVerdict: "Musti diyor ki: Dışarıda bardaktan boşalırcasına yağmur yağarken kahvemizi yudumlayıp ders molası vermelik sıcacık kombin! ☕🌧️",
          previewColor: "bg-amber-200",
          previewTags: ["Bej Kazak", "Kadife Pantolon", "Yünlü Bot"]
        }
      ],
      chic: [
        {
          id: "r_ch1",
          outfit: "Kruvaze asil bej trençkot, altından siyah balıkçı yaka triko kazak ve deri dökümlü pantolon 🧥",
          makeup: "Keskin ve asil kırmızı ruj tonlaması, belirgin tek hat eyeliner kalemi",
          accessories: "Matching bej trençkot şapkası, deri eldivenler",
          mustiVerdict: "Musti diyor ki: Matrix asaletinde Atakum sokaklarında yağmur altında el ele yürümelik o sarsılmaz estetik! ❤️🧥☔",
          previewColor: "bg-stone-400",
          previewTags: ["Bej Trençkot", "Balıkçı Yaka", "Kırmızı Ruj"]
        }
      ],
      lazy: [
        {
          id: "r_lz1",
          outfit: "Büyük pijama takımı, pofuduk sabahlık ve kalın polar ev babetleri",
          makeup: "Kiraz nemlendiricisi ve taze cici yanaklar",
          accessories: "Peluş saç bükücü bandı, sıcak kahve kupası",
          mustiVerdict: "Musti diyor ki: Yağmur çatıya vururken battaniye altında KPSS coğrafya ezber haplarını dinlemelik harika ev lüksü! 💤🛌",
          previewColor: "bg-rose-200",
          previewTags: ["Pijama", "Sabahlık", "Polar Elbise"]
        }
      ]
    },
    wind: {
      cool: [
        {
          id: "w_co1",
          outfit: "Füme dik yaka deri ceket, gri kargo eşofman altı ve retro deri sneakers",
          makeup: "Çilekli lipgloss ve hafif nemlendirilmiş burun üstü allığı",
          accessories: "Gümüş halka halkalar, AirPods Max kulaklık seti",
          mustiVerdict: "Musti diyor ki: Atakum rüzgarı saçlarını uçururken bu leather duruşunla rüzgara adeta yön veriyorsun! 🪁💨",
          previewColor: "bg-zinc-500",
          previewTags: ["Deri Ceket", "Gri Kargo", "Gümüş Küpe"]
        }
      ],
      comfy: [
        {
          id: "w_cm1",
          outfit: "Kapüşonlu pofuduk puffer mont, jogger altı ve rahat kalın tabanlı spor ayakkabıları 👟",
          makeup: "Yoğun çatlak önleyici şeftalili dudak kozmetik balmı",
          accessories: "Yün bere bükücü saç bandı, aslan tılsımlı anahtarlık takısı",
          mustiVerdict: "Musti diyor ki: Kütüphaneye rüzgarda üşümeden, pürüzsüz ve hızlı adımlarla koşan şampiyon edası! 🧥💨",
          previewColor: "bg-blue-300",
          previewTags: ["Puffer Mont", "Jogger Alt", "Yün Bere"]
        }
      ],
      chic: [
        {
          id: "w_ch1",
          outfit: "Krem rengi asil kaşe kaban, dar kesim jean pantolon ve deri süvari botları 👢",
          makeup: "Nude parıltı ruj, keskin maskara katmanları, yanakta şeftali tozu allık",
          accessories: "Örgü şal atkısı, deri şık omuz çantası",
          mustiVerdict: "Musti diyor ki: Rüzgarlı Atakum sahilinde waffle dükkanına girerken parıltısı ile tüm mekanı aydınlatacak asalet! ✨🦁",
          previewColor: "bg-stone-200",
          previewTags: ["Kaşe Kaban", "Jean", "Örgü Şal"]
        }
      ],
      lazy: [
        {
          id: "w_lz1",
          outfit: "Oversize hırka ceket, pamuklu tayt ve yumuşak örgü ev botları",
          makeup: "Doğal nemli makyajsız duruluk",
          accessories: "Penye mor bandana saç bandı, aslan burcu kolyesi",
          mustiVerdict: "Musti diyor ki: Camdaki rüzgar sesine karşı kütüphane paragraf yapraklarını hırsla devirme modu! 📚💨",
          previewColor: "bg-violet-300",
          previewTags: ["Hırka Ceket", "Tayt", "Sıcak Bot"]
        }
      ]
    }
  };

  const currentCombination: StylingSuggestion = combosPool[selectedWeather]?.[selectedMood]?.[0] || {
    id: "fallback",
    outfit: "Oversize sweat ceket ve siyah Hummel tayt",
    makeup: "Doğal nemlendirici kiraz lip balm",
    accessories: "Penye siyah bandana saç bandı",
    mustiVerdict: "Musti diyor ki: Her halinle aslanlar gibi asil ve pürüzsüzsün İloşum!",
    previewColor: "bg-pink-300",
    previewTags: ["Sweat Ceket", "Tayt", "Bandana"]
  };

  // Custom function to randomize today's closet combos and append unique attributes!
  const [randomizedCloset, setRandomizedCloset] = useState<any>(null);

  const handleShuffleCloset = () => {
    const garments = ["Lila Pofuduk Hırka", "Musti'nin Gri Sweati 🧥", "Crop Beyaz Sweat", "Kruvaze Bej Trençkot", "Saks Mavisi Kazak", "Asil Yazlık Elbise 👗"];
    const bottoms = ["Siyah Hummel Tayt 🏃‍♀️", "Pamuklu Beyaz Jogger", "Klasik Mom Jeans", "Kargo Gri Eşofman Altı", "Dökümlü Keten Pantolon"];
    const accessoriesList = ["Peluş Saç Bandı 🥑", "Penye Bandana", "Altın İnci Kolye ✨", "AirPods Max Kulaklık 🎧", "Koruyucu Aslan Kolyesi 🦁"];
    const makeupList = ["Nude Lipgloss 💄", "Dumanlı Eyeliner 👁️", "Gül Suyu Esintili CC Krem", "Frambuaz Dudak Yağı 🍓"];

    const g = garments[Math.floor(Math.random() * garments.length)];
    const b = bottoms[Math.floor(Math.random() * bottoms.length)];
    const a = accessoriesList[Math.floor(Math.random() * accessoriesList.length)];
    const m = makeupList[Math.floor(Math.random() * makeupList.length)];

    const colors = ["bg-purple-300", "bg-indigo-400", "bg-zinc-400", "bg-pink-300", "bg-stone-300", "bg-amber-200"];
    const c = colors[Math.floor(Math.random() * colors.length)];

    setRandomizedCloset({
      id: `rc_${Date.now()}`,
      outfit: `${g} altında ${b} ve spor ayakkabısı 👟`,
      accessories: a,
      makeup: m,
      previewColor: c,
      mustiVerdict: "Musti diyor ki: Karıştırdığın dolaptan saçılan bu sürpriz akort harikası, Atakum podyumlarını saniyede sarsar! 🏆🦁"
    });
  };

  return (
    <div className="space-y-6" id="unified_love_vault_layout">
      
      {/* Top Main Title Panel */}
      <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-vp-lightpink/35 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight text-vp-maroon font-display flex items-center gap-2">
              <Gift className="text-vp-pink w-6 h-6 shrink-0" />
              Musti'den Sürprizler & Stil Odası ✨🧖‍♀️
            </h3>
            <p className="text-xs text-slate-500 font-sans font-semibold">
              Özel kütüphane jestleri, moral mektup zarfları ve İloş Hanım'ın Atakum podyum kombinleri tek çatı altında akortlandı!
            </p>
          </div>

          {/* Sub Tab Switcher: Solves the category reduction request perfectly */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-250 self-start sm:self-center">
            <button
              onClick={() => setActiveSubVault("surpriz")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                activeSubVault === "surpriz" 
                  ? "bg-vp-pink text-white shadow-sm" 
                  : "text-slate-600 hover:text-vp-maroon"
              }`}
              id="subtab_surpriz"
            >
              🎁 Motivasyon & Sürprizler
            </button>
            <button
              onClick={() => setActiveSubVault("guzellik")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                activeSubVault === "guzellik" 
                  ? "bg-vp-pink text-white shadow-sm" 
                  : "text-slate-600 hover:text-vp-maroon"
              }`}
              id="subtab_guzellik"
            >
              🧖‍♀️👗 Günlük Stil Çetelesi
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW A: MOTIVASYON & SÜRPRİZLER */}
        {activeSubVault === "surpriz" && (
          <motion.div
            key="surpriz_tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Musti'den Günün Şarjı */}
              <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="text-vp-pink w-5 h-5 fill-vp-pink shrink-0 animate-pulse" />
                    <h4 className="text-xs font-black text-vp-maroon uppercase tracking-tight font-display">
                      Musti'den Günün Şarjı & Can Suyu 🔋⚡
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider mb-4">
                    KPSS yorgunluğunu darmadağın eden akortlu enerji jeneratörü
                  </p>

                  <div className="bg-vp-bg border-2 border-vp-borderpink rounded-2xl p-5 min-h-[140px] flex items-center justify-center relative shadow-inner overflow-hidden">
                    <p className="text-xs text-vp-maroon font-sans font-extrabold leading-relaxed text-center italic z-10">
                      {currentCompliment || "Şarjınızı doldurmak için hemen aşağıdaki butona basın İloşum! ⚡"}
                    </p>

                    {heartsCount.map((h, i) => (
                      <div 
                        key={h} 
                        className="absolute text-lg animate-ping text-vp-pink pointer-events-none z-0"
                        style={{
                          left: `${10 + i * 16}%`,
                          top: `${25 + (i % 2) * 35}%`,
                          animationDuration: `${0.8 + Math.random()}s`
                        }}
                      >
                        💖
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={shuffleCompliment}
                  className="mt-4 bg-vp-pink hover:bg-vp-hotpink text-white py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95 self-end"
                  id="boost_compliment_btn"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Günün Şarjını Doldur ⚡
                </button>
              </div>

              {/* Musti'den Gizli Not Zarfları */}
              <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="text-vp-pink w-5 h-5 shrink-0" />
                    <h4 className="text-xs font-black text-vp-maroon font-display uppercase">Musti'den Gizli Not Zarfları ✉️🔒</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-4">
                    Zarfların içerikleri her açtığında sonsuz şekilde ve karışık olarak güncellenir!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {letters.map((letObj) => (
                      <div 
                        key={letObj.id}
                        onClick={() => openLetter(letObj.id)}
                        className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                          letObj.opened 
                            ? "bg-vp-bg border-vp-borderpink text-vp-maroon font-black shadow-inner scale-95" 
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                        id={`envelope_${letObj.id}`}
                      >
                        <div className="text-2xl mb-1 filter drop-shadow">{letObj.opened ? "🔓" : "📩"}</div>
                        <h5 className="text-[10px] leading-tight font-black">{letObj.trigger}</h5>
                        <span className="text-[8px] font-mono text-slate-400 mt-1 block">
                          {letObj.opened ? "ZARFI KAPAT" : "SÜRPRİZİ AÇ"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl min-h-[110px] flex flex-col justify-center relative">
                  <span className="absolute top-2 right-3 text-[7px] font-mono text-slate-400 font-bold uppercase tracking-widest">SÖZLÜ MEKTUP KONSOLU</span>
                  {letters.some(l => l.opened) ? (
                    <div>
                      {letters.filter(l => l.opened).map(l => (
                        <div key={l.id} className="animate-fade-in text-left">
                          <p className="text-xs text-slate-700 leading-relaxed font-sans italic font-bold">
                            "{l.content}"
                          </p>
                          <div className="text-[9px] font-mono text-vp-pink font-extrabold mt-2.5 flex justify-between items-center bg-white/70 px-2 py-0.5 rounded-lg border border-vp-borderpink/20">
                            <span>💌 İLOŞ'A ÖZEL ENERJİ</span>
                            <span>MUSTAFA CAN • AKORTLU SEVGİLERLE ✨</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-slate-400 italic">
                      "Musti'nin her gün farklı fısıltılarla doldurduğu zarflardan birine tıkla..."
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* PERSISTENT DREAMS LIST (Checklist as requested and missing before, now restored beautifully below) */}
            <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Bookmark className="text-vp-pink w-5 h-5 shrink-0" />
                <h4 className="text-xs font-black text-vp-maroon uppercase font-display">Musti & İloş Hayaller & Planlar Çetelesi 🗺️</h4>
              </div>
              <p className="text-[10.5px] text-slate-500 font-sans mb-4">Gelecekte Atakum sahillerinde, kütüphane sıralarında gerçekleştirmeyi düşlediğimiz pürüzsüz akort programı:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {dreams.map((d) => (
                    <div key={d.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleDream(d.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                            d.completed ? "bg-vp-pink border-vp-pink text-white" : "bg-white border-slate-350 hover:bg-slate-100"
                          }`}
                        >
                          {d.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span className={`text-[11px] font-sans font-bold leading-normal ${d.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                          {d.dream}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteDream(d.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add dynamic new dreams */}
                <form onSubmit={handleAddDream} className="bg-vp-bg/40 border border-vp-borderpink/20 rounded-[2rem] p-5 flex flex-col justify-between min-h-[140px]">
                  <div>
                    <h5 className="text-[10px] font-mono font-black text-vp-maroon uppercase tracking-wide mb-1.5">Müteakip Hayaller Listeleme</h5>
                    <input 
                      type="text"
                      className="w-full bg-white border border-slate-300 focus:border-vp-pink outline-none px-3 py-2 text-xs rounded-xl font-bold placeholder-slate-400"
                      placeholder="Atakum sahilde yeşil erikli piknik seansı... 🍏🧺"
                      value={newDream}
                      onChange={(e) => setNewDream(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="mt-3 w-full bg-vp-pink hover:bg-vp-hotpink text-white py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Hayali Kaydet & Çeteleye Ekle
                  </button>
                </form>
              </div>
            </div>

          </motion.div>
        )}

        {/* VIEW B: UPGRADED GÜNLÜK STİL ÇETELESİ */}
        {activeSubVault === "guzellik" && (
          <motion.div
            key="guzellik_tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Selector inputs (Weather & Mood) */}
              <div className="md:col-span-5 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Select weather */}
                  <div>
                    <span className="text-[10px] font-mono font-black text-slate-550 block mb-2 uppercase">🌤️ BUGÜN ATAKUM HAVASI NASIL?</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setSelectedWeather("study")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center gap-1.5 justify-center ${
                          selectedWeather === "study" ? "bg-vp-pink text-white border-vp-pink" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        📚 Kütüphane Esintisi
                      </button>
                      <button 
                        onClick={() => setSelectedWeather("sun")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center gap-1.5 justify-center ${
                          selectedWeather === "sun" ? "bg-vp-pink text-white border-vp-pink" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" /> Güneşli & Meltem
                      </button>
                      <button 
                        onClick={() => setSelectedWeather("rain")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center gap-1.5 justify-center ${
                          selectedWeather === "rain" ? "bg-vp-pink text-white border-vp-pink" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <CloudRain className="w-3.5 h-3.5" /> Yağmurlu & Romantik
                      </button>
                      <button 
                        onClick={() => setSelectedWeather("wind")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center gap-1.5 justify-center ${
                          selectedWeather === "wind" ? "bg-vp-pink text-white border-vp-pink" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Wind className="w-3.5 h-3.5" /> Sert Poyraz & Rüzgar
                      </button>
                    </div>
                  </div>

                  {/* Select mood */}
                  <div>
                    <span className="text-[10px] font-mono font-black text-slate-550 block mb-2 uppercase">🧘‍♀️ MOD GÜNLÜCÜMÜZ NEDİR İLOŞ?</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setSelectedMood("chic")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          selectedMood === "chic" ? "bg-vp-pink text-white border-vp-pink pb-3" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        💅 Aslan Burcu Şıklığı
                      </button>
                      <button 
                        onClick={() => setSelectedMood("cool")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          selectedMood === "cool" ? "bg-vp-pink text-white border-vp-pink pb-3" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        👟 Sportif & Dinamik
                      </button>
                      <button 
                        onClick={() => setSelectedMood("comfy")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          selectedMood === "comfy" ? "bg-vp-pink text-white border-vp-pink pb-3" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        🧸 Pofuduk Yumuşacık
                      </button>
                      <button 
                        onClick={() => setSelectedMood("lazy")}
                        className={`p-2.5 rounded-xl border text-3xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          selectedMood === "lazy" ? "bg-vp-pink text-white border-vp-pink pb-3" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        💤 Tatlı Tembellik Modu
                      </button>
                    </div>
                  </div>

                  {/* Interactive Bags and Lipstick selectors - New Upgrade Detail */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div>
                      <span className="text-[8px] font-mono font-black text-slate-400 uppercase block mb-1">💼 ÇANTA TERCİHİ</span>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-4xs font-bold font-sans text-slate-700 cursor-pointer focus:border-vp-pink outline-none"
                        value={selectedBag}
                        onChange={(e) => setSelectedBag(e.target.value)}
                      >
                        <option>Omuz Çantası 👜</option>
                        <option>Sırt Çantası 🎒</option>
                        <option>Mini Bez Çanta 🛍️</option>
                        <option>Deri Retro Çanta 💼</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono font-black text-slate-400 uppercase block mb-1">💄 RUJ TONLAMASI</span>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-4xs font-bold font-sans text-slate-700 cursor-pointer focus:border-vp-pink outline-none"
                        value={selectedLipStick}
                        onChange={(e) => setSelectedLipStick(e.target.value)}
                      >
                        <option>Nude Parıltı 💄</option>
                        <option>Kiraz Lip Balm 🍒</option>
                        <option>Canlı Şeftali 🧡</option>
                        <option>Bordo Glosaj 💋</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shuffle / Closet Mixer Action - NEW interactive module */}
                <div className="pt-3 border-t">
                  <button
                    onClick={handleShuffleCloset}
                    className="w-full bg-vp-bg border border-vp-borderpink text-vp-pink hover:bg-vp-lightpink/15 text-3xs font-mono font-black py-2 rounded-xl transition-all cursor-pointer uppercase tracking-tight flex items-center justify-center gap-1.5 shadow-3xs"
                    id="closet_shuffle_btn"
                  >
                    🎲 DOLABI KARIŞTIR (SÜRPRİZ KOMBİN!)
                  </button>
                </div>
              </div>

              {/* Right Output Sketch Screen & Details (7 cols) */}
              <div className="md:col-span-7 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between space-y-4">
                
                {/* Visual Doll Component display */}
                <div>
                  <div className="flex justify-between items-center text-[9px] font-mono font-black text-slate-450 uppercase border-b pb-1.5 mb-3">
                    <span>👗 STIL VE GÖRÜNÜM AYNASI</span>
                    <span className="text-vp-pink">AKORTLU REHBER</span>
                  </div>

                  {randomizedCloset ? (
                    <div className="animate-fade-in">
                      <OutfitMiniSketch 
                        outfit={randomizedCloset.outfit} 
                        previewColor={randomizedCloset.previewColor} 
                        weather={selectedWeather} 
                        mood={selectedMood} 
                      />

                      <div className="space-y-2 mt-4 text-left">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                          <h4 className="text-[11.5px] font-black font-sans text-slate-800 leading-tight mb-2">
                            🎲 Şans Esintili Sürpriz Dolap Kombini!
                          </h4>
                          <p className="text-[10.5px] font-sans font-bold leading-normal text-slate-700">
                            👉 <strong>Kombin:</strong> {randomizedCloset.outfit}
                          </p>
                          <p className="text-[10.5px] font-sans text-slate-500 mt-1">
                            👜 <strong>Eşleşen Çanta:</strong> {selectedBag} • 💄 <strong>Kozmetik:</strong> {randomizedCloset.makeup}
                          </p>
                        </div>

                        <p className="text-[10px] text-vp-pink leading-relaxed italic font-black bg-vp-bg p-3 rounded-xl border border-vp-borderpink/30">
                          {randomizedCloset.mustiVerdict}
                        </p>
                      </div>

                      <button 
                        onClick={() => setRandomizedCloset(null)}
                        className="text-[8.5px] font-mono tracking-tighter text-slate-400 mt-2 hover:underline block text-right font-black"
                      >
                        ← STANDART ÖNERİLERE GERİ DÖN
                      </button>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <OutfitMiniSketch 
                        outfit={currentCombination.outfit} 
                        previewColor={currentCombination.previewColor} 
                        weather={selectedWeather} 
                        mood={selectedMood} 
                      />

                      <div className="space-y-2 mt-4 text-left">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                          {/* Tags row */}
                          <div className="flex gap-2.5 flex-wrap mb-2.5 select-none">
                            {currentCombination.previewTags.map((t, idx) => (
                              <span key={idx} className="bg-pink-50 text-vp-pink border border-vp-borderpink/40 text-[8px] font-mono font-black py-0.5 px-2 rounded-full uppercase">
                                {t}
                              </span>
                            ))}
                            <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[8px] font-mono font-black py-0.5 px-2 rounded-full uppercase">
                              {selectedBag}
                            </span>
                            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[8px] font-mono font-black py-0.5 px-2 rounded-full uppercase">
                              {selectedLipStick}
                            </span>
                          </div>

                          <p className="text-[10.5px] font-sans leading-relaxed text-slate-850 font-black mb-1.5">
                            👗 <strong>Günün Kıyafeti:</strong> {currentCombination.outfit}
                          </p>
                          <p className="text-[10px] leading-relaxed text-slate-650 font-sans font-semibold">
                            💄 <strong>Makyaj Önerisi:</strong> {currentCombination.makeup}
                          </p>
                          <p className="text-[10px] leading-relaxed text-slate-650 font-sans font-semibold">
                            🧣  <strong>Aksesuar:</strong> {currentCombination.accessories}
                          </p>
                        </div>

                        {/* Witty diagnostic Musti judgment card */}
                        <div className="bg-vp-bg p-3.5 rounded-2xl border-2 border-dashed border-vp-borderpink flex gap-2 items-start">
                          <span className="text-xl shrink-0 select-none">🍉</span>
                          <p className="text-[10.5px] text-vp-maroon leading-relaxed italic font-extrabold font-sans">
                            {currentCombination.mustiVerdict}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM UPGRADED MODULE DETAILS (Runway Score & Heartbeat block) */}
                <div className="border-t border-slate-100 pt-4 space-y-3.5">
                  {/* Upgrade 1: Aura runway score gauge */}
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-black text-slate-550 uppercase mb-1">
                      <span>✨ ASLAN PODYUM AURA DERECESİ: % {auraScore}</span>
                      <span className="text-vp-pink">YILDIZ PARLAKLIĞI ⭐</span>
                    </div>
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      className="w-full accent-vp-pink h-1 bg-slate-100 rounded-lg cursor-pointer"
                      value={auraScore}
                      onChange={(e) => setAuraScore(parseInt(e.target.value))}
                    />
                    <span className="text-[8.5px] text-slate-400 block mt-1 leading-none font-bold">
                      {auraScore >= 90 ? "👑 ASİL DIŞİ ASLAN AKORTLU DURUŞ! Önünde dağlar diz çöker!" : auraScore >= 60 ? "🧸 Sevimli ve sıcak pofuduk modu. Kütüphanede sıcacık hissettirir!" : "💤 Konfor düzeyimiz yüksek, pürüzsüz hırka aurası aktiftir!"}
                    </span>
                  </div>

                  {/* Upgrade 2: Heartbeat indicator interactive accordion */}
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5">
                    <button 
                      onClick={() => setShowHeartbeatEx(!showHeartbeatEx)}
                      className="w-full flex justify-between items-center text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[9.5px] font-sans font-black text-rose-800 flex items-center gap-1.5 select-none">
                        ❤️ MUSTİ'NİN KALP SİNERJİ TEŞHİS RAPORU
                      </span>
                      <span className="text-xs text-rose-500 font-extrabold">{showHeartbeatEx ? "▲" : "▼"}</span>
                    </button>
                    {showHeartbeatEx && (
                      <div className="animate-fade-in mt-2 text-[9px] text-rose-700 leading-normal font-sans pt-1.5 border-t border-rose-200/50 font-bold space-y-1 text-left">
                        <p>💓 <strong>Musti Heartbeat Peak:</strong> {auraScore * 2} BPM!</p>
                        <p>🚑 <strong>Acil Tıbbi Öneri:</strong> Yoğun Atakum waffle kaçamağı ve Komagene dürümleri ile acilen stabilizasyon gerekiyor.</p>
                        <p>🧿 <strong>Akort Mührü:</strong> Kem göz savar nazar-savar tepsisi sarsılmaz sevgi korumasıyla anında uygulandı.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
