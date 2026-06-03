import React, { useState, useEffect } from "react";
import { Sparkles, Sun, Moon, Compass, ShieldAlert, Star, RefreshCw, Award, Flame, Zap, ShieldCheck } from "lucide-react";

interface TarotCard {
  name: string;
  emoji: string;
  meaning: string;
  advice: string;
}

export default function BurcAstronomy() {
  const [activeAstTab, setActiveAstTab] = useState<"fal" | "leoDet" | "risingDet" | "tarot" | "sinerji" | "daralma">("fal");
  const [falText, setFalText] = useState("");
  const [faling, setFaling] = useState(false);
  
  // Custom tarot card state
  const [tarotCard, setTarotCard] = useState<TarotCard | null>(null);
  const [taroting, setTaroting] = useState(false);

  // Dynamic selector for Boredom/Bother level slider! (GELİŞTİRİLDİ)
  const [daralmaLevel, setDaralmaLevel] = useState(50);

  // Pool of custom, rich, daily horoscope readings specifically for Aslan (Leo) with Akrep (Scorpio) rising
  const dailyFalPool = [
    "İloşum, bugün Güneş senin Aslan burcundaki haneni pırıl pırıl aydınlatıyor! Akrep yükseleninin o sarsılmaz iradesi birleşince karşına çıkacak hiçbir KPSS deryası duramaz. Kütüphanede o asil saç bandınla soru bankalarını fethederken, yıldızlar senin için zafere giden adımları koordine ediyor! 👑📚",
    "Kozmik esintiler bugün Atakum sahilini işaret ediyor İloş! Bugün içinden gelen o bastırılamaz yeşil erik krizleri ve tatlı waffle hayalleri aslında zihninin 'şarj' olma sinyali. Sınav koşturmacasının arasında kendine o narin aslan asaletini hatırlatacak küçük bir mola ver! 🌅🍏",
    "Akrep yükseleninin gizemli sezgileri bugün tavan yapmış durumda! Çevrendeki tüm olumsuz enerjileri ve kem gözleri o melek kalbini koruyan nazar savar kalkanınla darmadağın ediyorsun. Aslan burcunun parıltısı girdiği her odayı aydınlatmaya devam edecek, asil duruşun herkese ilham veriyor! ✨🧿",
    "Gök güncesinde müjde var: Bugün kütüphanede paragrafları çözerken odaklanma gücün en üst seviyede. Kendine inanmaktan asla vazgeçme İloşum. O asil, kararlı, RTE edalı havalı adımların gelecekteki o harika memurluk günlerinin en parlak habercisi! 📚👩‍💼",
    "Bugün Ay'ın Akrep burcundaki konumu, hislerini ve bağlılığını derinleştiriyor. Yorulduğunda derin bir nefes al ve 'Sıradaki gelsin!' de. Gökyüzü senin o duru enerjini, azmini ve sabrını büyük bir başarı dalgasıyla taçlandırmak için bizzat gün sayıyor! 🔮🦁",
    "Yıldız haritandaki şans kapıları bugün ardına kadar açık! Özellikle kütüphane sıralarında dökülen o sıcak çayın her dumanı, dertleri eritiyor. Akşam pürüzsüz bir makyaj temizleme seansı ve derin bir REM uykusuyla hak ettiğin muhteşem dinlenmeyi kendine hediye et! 🧖‍♀️💤"
  ];

  // Specific tarot cards just for Iloş's daily guidance
  const tarotCardsPool: TarotCard[] = [
    {
      name: "Güneş Kartı ☀️ (The Sun)",
      emoji: "🃏☀️",
      meaning: "Sonsuz neşe, başarı ve taze enerji! Bu kart tüm karanlık bulutların dağılıp hayatının parlayacağını müjdeler.",
      advice: "İloşum, kendine inan! Bugün kütüphanede her soru işaretini güneşi batırır gibi eriteceksin. Akşama Atakum sahili havası almak sana çok iyi gelecek!"
    },
    {
      name: "Yıldız Kartı ⭐ (The Star)",
      emoji: "🃏⭐",
      meaning: "Umut, ilham ve dileklerin gerçekleşmesi! Geleceğinin parlak bir yıldız gibi şekilleneceğini gösteren koruyucu sembol.",
      advice: "Zorlandığın o coğrafya haritaları aslında senin zirvene giden yolları çiziyor. Yıldızlar arkanda, derin bir nefes al ve asaletini koru!"
    },
    {
      name: "Değnek Kraliçesi 👑 (Queen of Wands)",
      emoji: "🃏🦁",
      meaning: "Cesur, karizmatik ve girdiği her ortamı aydınlatan asil bir dişi aslan enerjisi! Tam olarak senin duruşun.",
      advice: "Bugün podyuma çıkar gibi kendinden emin ol. O asil duruşun ve azmin karşısında hiçbir engel duramaz İloşum!"
    },
    {
      name: "Kupa Ası 🍷 (Ace of Cups)",
      emoji: "🃏💖",
      meaning: "Saf sevgi, huzur ve kalpten gelen temiz duyguların coşması. Hayatına huzur veren pırıl pırıl bir enerjiyi anlatır.",
      advice: "Moralini bozan her şeyi geride bırak. Musti'nin akort ettiği o sıcak çayların dumanı ve tüm sevgisi her an seninle!"
    },
    {
      name: "Kader Çarkı 🎡 (Wheel of Fortune)",
      emoji: "🃏🎡",
      meaning: "Şansın dönmesi, beklenen güzel haberlerin sırayla gelmesi ve tatlı sürprizlerin kapıda belirmesi!",
      advice: "KPSS stresinin geçici olduğunu bil. Çark senin o güzel kalbin ve emeklerin için mutluluk ve başarı yönüne doğru dönüyor!"
    }
  ];

  const getDaralmaAdvice = (level: number) => {
    if (level < 25) {
      return {
        emoji: "😌🍧✨",
        title: "Kozmik Dinginlik Aurası (%100 Huzur)",
        text: "Kainat ve gezegenler senin için sükunet içinde İloşum! Atakum sahilinde dondurma yemek veya taze dondurulmuş çileklere uzanmak için harika bir an. Zihnini sevgi rüzgarlarıyla doldur."
      };
    } else if (level < 60) {
      return {
        emoji: "📖🎒🦁",
        title: "Akortlu Odaklanma Safhası (%50 Azim)",
        text: "Kütüphane masasında aslan asaletini konuşturma anı! Paragraflar sıraya girsin, Akrep yükseleninin o sarsılmaz derin mantığı tüm karmaşık KPSS soru bankalarını eritmeye aday! Kendine güveniyorsun canım."
      };
    } else if (level < 85) {
      return {
        emoji: "🍋🥤🛡️",
        title: "Hafif Daralma Alarmı! (Ödem Suyu & Soluklanma)",
        text: "Odamız kütüphane tozlarıyla darlanmış gibi! Hemen bir bardak limonlu su/kahve tazele ve derin nefesler al. Peluş avokadonun şifa kanunlarını devreye sokuyorum. Moral dopingi yolda!"
      };
    } else {
      return {
        emoji: "😡🌯👑🔥",
        title: "SINAV DARLAMASI ZİRVEDE! (Acil Komagene & Musti Koruyucusu)",
        text: "Sınav darlaması kalkanları yarmış! Tüm kitapları derhal kapatma ve feci bacak idmanı yazan İlker hocayı 'ödem suyu bahanesiyle' bertaraf etme saati geldi! Akşama bol turşulu, limonlu bir Komagene dürümü veya waffle tepsisi sipariş edilecek! Musti her an yanında!"
      };
    }
  };

  // Simple deterministic day-seed hash so fal & tarot update automatically every 24 hours (daily)
  const getDaySeed = () => {
    const d = new Date();
    return d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  };

  useEffect(() => {
    const seed = getDaySeed();
    const falIdx = seed % dailyFalPool.length;
    const tarotIdx = seed % tarotCardsPool.length;
    setFalText(dailyFalPool[falIdx]);
    setTarotCard(tarotCardsPool[tarotIdx]);
  }, []);

  const drawDailyFal = () => {
    setFaling(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * dailyFalPool.length);
      setFalText(dailyFalPool[idx]);
      setFaling(false);
    }, 1100);
  };

  const drawTarotCard = () => {
    setTaroting(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * tarotCardsPool.length);
      setTarotCard(tarotCardsPool[idx]);
      setTaroting(false);
    }, 1100);
  };

  const currentAdvice = getDaralmaAdvice(daralmaLevel);

  return (
    <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2.5rem] p-6.5 shadow-xl relative overflow-hidden text-left" id="astrology_analyzer_v3">
      
      {/* Decorative Glow elements */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Title Header - Expanded and developed */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 mb-6.5 pb-5 border-b border-purple-100 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-3xl animate-bounce">🌌</span>
            <div>
              <h3 className="text-lg md:text-xl font-black tracking-tight text-vp-maroon font-display uppercase flex items-center gap-1.5">
                <span>İloş'un Kozmik Yıldız Yorumcusu ♌🌌</span>
                <span className="text-xs bg-purple-150 border border-purple-300 text-purple-900 font-mono font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider animate-pulse font-display">Günlük Akortlu</span>
              </h3>
              <p className="text-xs text-slate-550 font-sans font-semibold leading-relaxed mt-1">
                Güneş Aslan burcu ve Yükselen Akrep burcu enerjileriyle, Atakum rüzgarlarına uyumlu günlük kehanetler, tarot tepsisi ve daralma ölçer! (Her gece 24 saatte bir otomatik güncellenir) 🌙
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher - Beautiful and easy to scroll horizontally on phones */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 border border-slate-205 rounded-2xl w-full xl:w-auto overflow-x-auto scrollbar-none shrink-0 self-stretch">
          {[
            { id: "fal", label: "🔮 GÜNLÜK FAL & REÇETE" },
            { id: "daralma", label: "📊 DARALMA ÖLÇER" },
            { id: "leoDet", label: "🦁 ASLAN (GÜNEŞ)" },
            { id: "risingDet", label: "🦂 AKREP (YÜKSELEN)" },
            { id: "tarot", label: "🃏 TAROT TEPSİSİ" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAstTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-[10.5px] font-black tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                activeAstTab === tab.id 
                  ? "bg-vp-pink text-white shadow-md border-b-2 border-r-2 border-purple-700 font-extrabold" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main horizontally expanded display panels */}
      <div className="relative z-10">
        
        {/* TAB 1: DAILY HOROSCOPE (Slightly wider / horizontal) */}
        {activeAstTab === "fal" && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Box: Astro Globe Selector */}
              <div className="lg:col-span-4 bg-slate-50/70 border-2 border-slate-200 p-6 rounded-[1.8rem] text-center flex flex-col justify-between gap-4 shadow-3xs">
                <div>
                  <span className="text-6xl filter drop-shadow block animate-pulse mx-auto mb-2 select-none">🔮🦁🦂</span>
                  <h4 className="text-xs font-black text-slate-800 font-sans tracking-tight block uppercase">Kozmik Yıldız Haritası</h4>
                  <p className="text-[10.5px] text-slate-500 font-sans leading-relaxed font-semibold mt-1.5">
                    Gezegen dergilerinin bugünkü kozmik titreşimleri senin için bizzat Musti tarafından akort edildi İloş! Falını çekmek için tabağı fır döndür!
                  </p>
                </div>
                
                <button
                  disabled={faling}
                  onClick={drawDailyFal}
                  className="w-full bg-vp-pink hover:bg-vp-hotpink text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow-md border-b-4 border-r-4 border-vp-maroon transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  id="draw_fal_btn_new"
                >
                  <RefreshCw className={`w-4 h-4 ${faling ? "animate-spin" : ""}`} />
                  {faling ? "Yıldızlar Taranıyor..." : "🔮 YENİ GÜNLÜK FAL ÇEK!"}
                </button>
              </div>

              {/* Right Box: Horoscope Result Display */}
              <div className="lg:col-span-8 bg-gradient-to-tr from-purple-50/40 via-sky-50/20 to-pink-50/30 border border-vp-borderpink/35 rounded-[1.8rem] p-7 min-h-[220px] flex flex-col justify-center relative shadow-inner overflow-hidden">
                <div className="absolute top-4 right-4 text-[7.5px] font-mono text-slate-400 font-black tracking-widest uppercase">
                  GÜNLÜK ASLAN-AKREP REÇETESİ • AKORTLU
                </div>
                
                {faling ? (
                  <div className="text-center space-y-4">
                    <div className="text-5xl animate-bounce">🌌⭐🌠</div>
                    <span className="text-[10px] font-mono text-vp-pink font-bold block animate-pulse">Gezegen hizalanmaları ve Atakum poyrazının dereceleri süzülüyor...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-sans font-bold italic text-left border-l-4 border-purple-400 pl-4">
                      "{falText}"
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <div className="text-[9px] font-mono text-vp-pink bg-white/80 px-3.5 py-2 rounded-xl border border-vp-borderpink/20 font-bold flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                        <span>👑 PARILTILI SİNERJİ: %100 AKORTLU</span>
                      </div>
                      <div className="text-[9px] font-mono text-vp-blue bg-white/80 px-3.5 py-2 rounded-xl border border-vp-blueborder/20 font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
                        <span>İLOŞCAN'A ÖZEL ZIRH KORUMASI</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE DARALMA OVERVIEW (GELİŞTİRİLDİ / YENİ) */}
        {activeAstTab === "daralma" && (
          <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 border border-slate-205 rounded-[1.8rem] p-6.5 space-y-5 animate-fade-in">
            <div className="flex gap-3.5 items-center border-b border-slate-200 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-205 flex items-center justify-center text-3xl shadow-sm animate-pulse">📊</div>
              <div>
                <span className="text-[8px] font-mono font-black text-amber-600 tracking-wider uppercase block">KOZMİK MOTİVASYON AYARI</span>
                <h4 className="text-sm font-black text-slate-800">İloş'un Günlük Kütüphane Daralma Ölçeri 📊🦁</h4>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 font-sans font-semibold leading-relaxed">
              Bugün kütüphanede, test sıralarında veya antrenman öncesinde iç dünyan ne kadar bulutlu? Sürgüyü kaydır ve gezegenlerin sana özel Musti dilli akortlu tavsiyesini anında al!
            </p>

            {/* Slider Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Slider Input Block (Horizontal setup) */}
              <div className="md:col-span-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-3xs text-center space-y-4">
                <div className="flex justify-between text-[10px] font-mono font-black text-slate-500">
                  <span>DARALMA/SIKILMA ORANI:</span>
                  <span className="text-vp-pink text-xs font-black">{daralmaLevel}%</span>
                </div>
                
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={daralmaLevel}
                  onChange={(e) => setDaralmaLevel(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-vp-pink"
                />
                
                <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400">
                  <span>Tamamen Huzurlu 😌</span>
                  <span>Darlamalar Gelsin 😡</span>
                </div>

                <div className="grid grid-cols-4 gap-1 pt-2">
                  {[10, 40, 70, 95].map((val) => (
                    <button 
                      key={val}
                      onClick={() => setDaralmaLevel(val)}
                      className={`text-[9.5px] font-black py-1.5 rounded-lg border transition-all cursor-pointer ${
                        daralmaLevel === val 
                          ? "bg-vp-pink text-white border-vp-pink shadow-xs" 
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-705"
                      }`}
                    >
                      {val === 10 ? "Keyifli" : val === 40 ? "Ders" : val === 70 ? "Uf" : "PATLADIK!"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Dynamic Result Block (Horizontal stretches) */}
              <div className="md:col-span-7 bg-white border border-purple-100 rounded-[1.5rem] p-5 shadow-3xs flex flex-col justify-center min-h-[160px] relative overflow-hidden transition-all duration-300">
                <div className="absolute top-3 right-4 font-mono text-[7px] text-slate-400 font-extrabold uppercase tracking-widest">
                  KOZMİK ENERJİ ANALİZİ
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-4xl filter drop-shadow font-black self-start pt-1">{currentAdvice.emoji}</div>
                  <div className="text-left space-y-1.5">
                    <h5 className="text-xs font-black text-vp-maroon font-sans uppercase flex items-center gap-1.5">
                      <span>{currentAdvice.title}</span>
                    </h5>
                    <p className="text-[10.5px] text-slate-705 leading-relaxed font-semibold">
                      {currentAdvice.text}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: LEO STARS DETAILS (Stretched Horizontally to 3 columns) */}
        {activeAstTab === "leoDet" && (
          <div className="bg-slate-50 border border-slate-205 rounded-[1.8rem] p-6.5 space-y-5 animate-fade-in">
            <div className="flex gap-3.5 items-center border-b border-slate-200 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-sm">♌</div>
              <div>
                <span className="text-[8px] font-mono font-black text-amber-600 tracking-wider uppercase block">GÜNEŞ BURCU ÖZELLİKLERİ</span>
                <h4 className="text-sm font-black text-slate-800">İloş'un Asil Aslan (Leo) Gezegen Portresi</h4>
              </div>
            </div>

            {/* Stretched horizontally into a 3-column grid for wide screen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-[11px] font-sans text-slate-700 leading-relaxed">
              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">👑</span>
                <span className="text-[8.5px] font-mono font-black text-amber-600 block uppercase">AURA & ASALET</span>
                <h5 className="text-xs font-black text-slate-800">Eşsiz Liderlik Aurası</h5>
                <p className="font-semibold text-slate-600">
                  Girdiği kütüphane koridorlarını o meşhur, emin ve havalı adımlarıyla anında asil bir podyuma çevirir. Taklit edilemez aslan asaleti bizzat ruhundadır!
                </p>
              </div>

              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">📚</span>
                <span className="text-[8.5px] font-mono font-black text-amber-600 block uppercase">ZEKA & SINAV SAVAŞI</span>
                <h5 className="text-xs font-black text-slate-800">Sarsılmaz Mücadeleci Gücü</h5>
                <p className="font-semibold text-slate-600">
                  KPSS deryasında paragrafların canına okur, coğrafyadaki zorlu dağları ve ovaları tek hamlede zihnine kazır. Pes etmez, azmi en yüksek kalkanıdır.
                </p>
              </div>

              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">🍏</span>
                <span className="text-[8.5px] font-mono font-black text-amber-600 block uppercase">ŞEFKATLİ KALP</span>
                <h5 className="text-xs font-black text-slate-800">Yumuşacık İç Dünya</h5>
                <p className="font-semibold text-slate-600">
                  Dışı ne kadar dik ve gururlu olsa da, içi bir kase tuz dökülmüş kıtır kıtır yeşil erikle, dondurulmuş çileklerle anında yumuşayacak kadar sevgi doludur.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SCORPIO RISING DETAILS (Stretched Horizontally to 3 columns) */}
        {activeAstTab === "risingDet" && (
          <div className="bg-slate-50 border border-slate-205 rounded-[1.8rem] p-6.5 space-y-5 animate-fade-in">
            <div className="flex gap-3.5 items-center border-b border-purple-200 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-3xl shadow-sm">🦂</div>
              <div>
                <span className="text-[8px] font-mono font-black text-purple-600 tracking-wider uppercase block">YÜKSELEN BURÇ ÖZELLİKLERİ</span>
                <h4 className="text-sm font-black text-slate-800">Sezgisel & Karizmatik Akrep (Scorpio) Yükseleni</h4>
              </div>
            </div>

            {/* Stretched horizontally into a 3-column grid for wide screen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-[11px] font-sans text-slate-700 leading-relaxed">
              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">🧿</span>
                <span className="text-[8.5px] font-mono font-black text-purple-600 block uppercase">HİSLER & KORUMA</span>
                <h5 className="text-xs font-black text-slate-800">Derin Sezgisel Zırh</h5>
                <p className="font-semibold text-slate-600">
                  İnanılmaz güçlü sezgiler kazandırır. Kem gözleri, nazarları ve çevredeki pürüzleri görünmez bir anti-nazar kalkanıyla anında savuşturur.
                </p>
              </div>

              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">💖</span>
                <span className="text-[8.5px] font-mono font-black text-purple-600 block uppercase">BAĞLILIK</span>
                <h5 className="text-xs font-black text-slate-800">Sarsılmaz Derin Bağ</h5>
                <p className="font-semibold text-slate-600">
                  Hayallerini, sevdiklerini ve mor tabelalı Komagene franchise dükkanı planları gibi projelerini öylesine sahiplenir ki hiçbir fırtına bunu bozamaz.
                </p>
              </div>

              <div className="bg-white border p-4.5 rounded-2xl space-y-1.5 shadow-3xs">
                <span className="text-xl block select-none">💎</span>
                <span className="text-[8.5px] font-mono font-black text-purple-600 block uppercase">YENİLENME</span>
                <h5 className="text-xs font-black text-slate-800">Küllerinden Doğuş</h5>
                <p className="font-semibold text-slate-600">
                  Kütüphane yorgunluğundan veya İlker hocanın pestil çıkartan antrenmanından yorulsa bile, o asil uykuyla ertesi sabah yine bir şampiyon gibi uyanır!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERACTIVE TAROT (Improved and widened) */}
        {activeAstTab === "tarot" && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              <div className="lg:col-span-4 text-center space-y-4 bg-slate-50/70 p-6 rounded-[1.8rem] border border-slate-205 flex flex-col justify-between shadow-3xs">
                <div>
                  <div className="text-6xl filter drop-shadow animate-bounce mx-auto mb-2 select-none">🃏👁️⭐</div>
                  <h4 className="text-xs font-black text-slate-800 font-sans uppercase">Kozmik Kehanet Tepsisi</h4>
                  <p className="text-[10.5px] text-slate-550 font-sans leading-relaxed font-semibold mt-1.5">
                    Musti'nin sevgiyle harmanladığı gizemli tarot tepsisinden bugüne özel bir şans kartı çekerek moral dopingini al İloşum!
                  </p>
                </div>

                <button
                  disabled={taroting}
                  onClick={drawTarotCard}
                  className="w-full bg-vp-pink hover:bg-vp-hotpink text-white font-black text-xs py-3 rounded-xl cursor-pointer shadow-md border-b-4 border-r-4 border-vp-maroon transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  id="draw_tarot_btn"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${taroting ? "animate-spin" : ""}`} />
                  {taroting ? "Kartlar Karıştırılıyor..." : "🃏 GÜNÜN TAROT KARTINI ÇEK!"}
                </button>
              </div>

              <div className="lg:col-span-8 bg-gradient-to-tr from-amber-50/40 via-purple-50/30 to-rose-50/40 border border-amber-200/50 rounded-[1.8rem] p-7 min-h-[220px] flex flex-col justify-center text-center relative shadow-inner overflow-hidden">
                {taroting ? (
                  <div className="space-y-4">
                    <div className="text-5xl animate-pulse">🌌🕯️🔮</div>
                    <span className="text-[10.5px] font-mono text-amber-600 font-black block animate-pulse">Gelecek sayfalardan sana özel asil kart seçiliyor...</span>
                  </div>
                ) : tarotCard ? (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="text-5xl filter drop-shadow select-none animate-bounce">{tarotCard.emoji}</div>
                    <h4 className="text-xs font-black text-vp-maroon font-sans tracking-wide uppercase">{tarotCard.name}</h4>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans italic font-bold max-w-[85%] mx-auto">
                      "{tarotCard.meaning}"
                    </p>
                    <p className="text-[10.5px] text-vp-pink leading-relaxed font-sans font-extrabold bg-white/80 py-2.5 px-4 rounded-2xl border border-vp-borderpink/35 max-w-[90%] mx-auto shadow-3xs">
                      💡 KOZMİK REÇETE: {tarotCard.advice}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 font-bold italic">"Günün kozmik şans kartını çekmek için soldaki butona basın İloşum!"</span>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
