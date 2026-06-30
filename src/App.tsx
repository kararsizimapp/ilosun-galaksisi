import React, { useState, useEffect } from "react";
import { 
  Sparkles, MapPin, Heart, Shield, RefreshCw, Clock, Trophy, Star,
  Plus, Minus, Check, Trash2, Coffee, BookOpen, PenTool
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // State for KPSS Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    percentage: 0
  });

  // Nice words pool to randomly render in the footer on refreshes
  const niceWordsPool = [
    "Sen gökyüzünde parlayan en eşsiz aslan burcu yıldızısın; her günün asalet, zarafet ve sonsuz başarı ile dolsun İloşum! 🌟💅",
    "Samsun kütüphane masandaki o kararlı duruş, geleceğin en pürüzsüz Atakum memuriyet başarılarını müjdeliyor! 📚🎀",
    "Bir kase yeşil eriğin kütür kıtır neşesi ve kütüphaneye o RTE havalı girişlerin hayatımıza sönmeyen saniyeler katıyor! 🍏✨",
    "O asil penye saç bandın ve sarsılmaz azminle aslan burcu kraliçeliğini her saniye tüm dünyaya ilan ediyorsun İloş! 👑🦁",
    "Atakum poyrazının uçurduğu o altın saç tellerin kadar özgün, pürüzsüz ve temiz kalpli bir asalet abidesisin! 🪁💖",
    "Musti'nin tüm akortlu sevgisi ve duaları her KPSS paragrafında, her yeni günün taze şafağında seninle beraber! 🛡️⚡",
    "Nazar savar zırhın koruyucu kalkanı her an üstünde olsun; kem gözlerin hepsi aslan auranla eriyip gitsin İloşum! 🧿💜",
    "İlker hoca gym salonundaki o şampiyon duruşunu ve bacak programlarındaki azmini yıldızlı başarı madalyaları ile alkışlıyor! 🏋️‍♀️🏆",
    "Güzellik uykusunun en derini ve pürüzsüz uyanışlar senin baş ucunda dinlensin canım İloş! Kendine çok iyi bak! 🧖‍♀️💅💤",
    "Komagene mor led ışıklı tabelasının altında el ele verip hayallere doğru emin adımlarla yürüyeceğimiz günler yakın! 🌯💜",
    "Odamızda dondurulmuş çilekler ve can yoldaşı eşliğinde Atakum rüzgarlarına karşı akortlu türküler mırıldanmak pürüzsüz! 🎵🍒",
    "Saks mavisi triko kazağın içindeki o asaletle paragraflara hükmettiğin her soru işareti birer başarı feneri İloşum! 🌟🎒"
  ];

  const [footerQuote, setFooterQuote] = useState("");

  // Real-time server quote stats
  const [inspiration, setInspiration] = useState({
    quote: "İloş için günün akortlu enerjisi yükleniyor...",
    action: "Stabilizasyon kalkanları kontrol ediliyor."
  });

  // Clock
  const [timeStr, setTimeStr] = useState("");
  const [todayStr, setTodayStr] = useState("");

  // Easter Eggs State
  const [showNazarSavar, setShowNazarSavar] = useState(false);
  const [showErikTruck, setShowErikTruck] = useState(false);
  const [erikRain, setErikRain] = useState<number[]>([]);
  const [showIcardi, setShowIcardi] = useState(false);
  const [icardiRain, setIcardiRain] = useState<number[]>([]);

  // Utopian & Cosmic Feature States
  const [stressInput, setStressInput] = useState("");
  const [blownBubble, setBlownBubble] = useState<{ text: string; id: number } | null>(null);
  const [bubbleMessage, setBubbleMessage] = useState("");
  const [isPopping, setIsPopping] = useState(false);

  const [crystalStats, setCrystalStats] = useState({
    aura: 100,
    focus: 100,
    cherryEnergy: 100,
    mustiPrayers: 1000
  });
  const [crystalMessage, setCrystalMessage] = useState("Kristal uykuda. Dokunarak akort et canım İloş! ✨");
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [telepathicReply, setTelepathicReply] = useState("");

  // Sound effects helper for cosmic actions
  const playCosmicSound = (type: "bubble" | "crystal" | "pop") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (type === "bubble") {
        // Sliding pitch up representing a floating balloon
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      } else if (type === "crystal") {
        // High crystal chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.1); // E6
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === "pop") {
        // Short bubbly pop sound
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn("Audio blocked by browser policy", e);
    }
  };

  // Blow stress into bubble
  const handleBlowStress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stressInput.trim()) return;
    
    playCosmicSound("bubble");
    setBlownBubble({
      text: stressInput.trim(),
      id: Date.now()
    });
    setStressInput("");
    setBubbleMessage("");
    setIsPopping(false);
  };

  // Pop the stress bubble
  const handlePopBubble = () => {
    if (!blownBubble) return;
    setIsPopping(true);
    playCosmicSound("pop");

    const replies = [
      "Pufff! O dert pürüzsüz Atakum poyrazıyla Karadeniz'in derinliklerine savruldu gitti! Sen keyfine bak İloşum! 🌊💙",
      "Gitti bile! Mustafa Can koruma kalkanları devreye girdi ve o stresi saniyeler içinde toz duman etti! 🛡️✨",
      "Balon GÜMledi! İçindeki dert eridi gitti; yerine bir kase kütür kıtır buz gibi yeşil erik ferahlığı geldi! 🍏💨",
      "Aslan burcu kraliçesinin aurasına böyle küçük dertler vız gelir tırıs gider! Uçtu gitti işte! 💅👑",
      "Pof! Sınav stresi falan kalmadı, hepsi dondurulmuş çilekli bir rüya gibi çözüldü gitti canım benim! 🍓🌌"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    setBubbleMessage(randomReply);

    setTimeout(() => {
      setBlownBubble(null);
      setIsPopping(false);
    }, 4500);
  };

  // Tune Cosmic Crystal
  const handleTuneCrystal = () => {
    playCosmicSound("crystal");
    
    // Boost stats randomly
    const boostAura = Math.floor(Math.random() * 15) + 5;
    const boostFocus = Math.floor(Math.random() * 10) + 10;
    const boostCherry = Math.floor(Math.random() * 20) + 5;
    const boostPrayers = Math.floor(Math.random() * 500) + 100;

    setCrystalStats(prev => ({
      aura: Math.min(300, prev.aura + boostAura),
      focus: Math.min(300, prev.focus + boostFocus),
      cherryEnergy: Math.min(300, prev.cherryEnergy + boostCherry),
      mustiPrayers: prev.mustiPrayers + boostPrayers
    }));

    const logs = [
      "Kristal parıldıyor: Aslan Aurası kozmik düzeye yükseltildi! 🦁✨",
      "Kütüphane odaklanma frekansı %100 pürüzsüz akort edildi! 📚🔮",
      "Dondurulmuş çilekli akort zırhı stabil duruma getirildi! 🍓🛡️",
      "Atakum sahil esintisi şans dalgaları masana yönlendirildi! 🪁💖",
      "Mustafa Can telepatik sevgi düzeyi sınırsızlığa ulaştı! ⚡💜"
    ];
    setCrystalMessage(logs[Math.floor(Math.random() * logs.length)]);
  };

  // Telepathic Message triggers
  const handleVibeSelect = (vibe: string) => {
    playCosmicSound("crystal");
    setSelectedVibe(vibe);

    let reply = "";
    if (vibe === "sleepy") {
      reply = "💤 'Güzellik uykusu aslan burcu asaletinin en temel yakıtıdır canım İloşum! Gözlerini 10 dakika dinlendir, saç bandını düzelt ve derin bir Atakum poyrazı çek içine. Ben dualarımla ve tüm sevgimle buradayım.'";
    } else if (vibe === "bored") {
      reply = "📚 'Paragraflar seni sıkmasın kraliçem! Unutma, o kütüphane masasında çözülen her soru bizi Komagene mor led ışıkları altında el ele yürüyeceğimiz o şanlı zafere yaklaştırıyor. Sen aslan burcusun, hepsini darmadağın edersin!'";
    } else if (vibe === "low_energy") {
      reply = "📉 'Hemen bir sanal yeşil erik ve dondurulmuş çilek dopingi yolluyorum! Kendini çok yorma, İlker hoca gym salonundaki o şampiyon enerjini düşün. Sen çok özelsin ve bu sınavı pürüzsüzce kazanacaksın can yoldaşım.'";
    } else if (vibe === "erik") {
      reply = "🍏 'Kütür kıtır! Ağzının sulandığını hisseder gibiyim! Musti'nin sevgi kamyonu bizzat yola çıktı bile, o yeşil eriklerin en pürüzsüzleri kütüphane masana dökülsün! Ders biter bitmez en güzel dürümler ve tatlılar bizden!'";
    }

    setTelepathicReply(reply);
  };

  const playAskinOlayimMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const notes = [
        { f: 493.88, d: 250 }, // B4
        { f: 440.00, d: 250 }, // A4
        { f: 392.00, d: 250 }, // G4
        { f: 440.00, d: 250 }, // A4
        { f: 493.88, d: 250 }, // B4
        { f: 523.25, d: 250 }, // C5
        { f: 493.88, d: 350 }, // B4
        { f: 440.00, d: 250 }, // A4
        { f: 493.88, d: 500 }  // B4
      ];
      
      let time = ctx.currentTime;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note.f, time);
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (note.d / 1000) - 0.02);
        osc.start(time);
        osc.stop(time + (note.d / 1000));
        time += (note.d / 1000);
      });
    } catch (e) {
      console.warn("Audio blocked", e);
    }
  };

  const triggerIcardiCelebration = () => {
    setShowIcardi(true);
    playAskinOlayimMelody();
    const rain = Array.from({ length: 30 }, (_, i) => i);
    setIcardiRain(rain);
    setTimeout(() => {
      setIcardiRain([]);
    }, 4500);
  };

  // Fetch inspiration on load
  const fetchInspiration = async () => {
    try {
      const res = await fetch("/api/inspiration");
      if (res.ok) {
        const data = await res.json();
        setInspiration({ quote: data.quote, action: data.action });
      }
    } catch (e) {
      console.error("Could not fetch daily inspiration", e);
    }
  };

  useEffect(() => {
    fetchInspiration();

    // Select random beautiful footer quote on mount/refresh
    const idx = Math.floor(Math.random() * niceWordsPool.length);
    setFooterQuote(niceWordsPool[idx]);

    // Clock and Countdown ticker representing Samsun/Istanbul Time (UTC+3)
    const updateTimeAndCountdown = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setTodayStr(now.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }));

      // Target Date: 2026 KPSS Ön Lisans (Usually September 20, 2026, 10:15 - Updated to October 4, 2026)
      const targetDate = new Date("2026-10-04T10:15:00");
      // Reference start date (e.g. January 1, 2026, to calculate progress bar)
      const startDate = new Date("2026-01-01T00:00:00");
      
      const totalTime = targetDate.getTime() - startDate.getTime();
      const currentPassed = now.getTime() - startDate.getTime();
      const difference = targetDate.getTime() - now.getTime();
      
      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let percentage = 0;
      
      if (difference > 0) {
        days = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((difference / 1000 / 60) % 60);
        seconds = Math.floor((difference / 1000) % 60);
        percentage = Math.min(100, Math.max(0, Math.round((currentPassed / totalTime) * 100)));
      } else {
        percentage = 100;
      }
      
      setTimeLeft({ days, hours, minutes, seconds, percentage });
    };

    updateTimeAndCountdown();
    const interval = setInterval(updateTimeAndCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when Nazar Savar is active
  useEffect(() => {
    if (showNazarSavar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showNazarSavar]);

  // Trigger Erik Rain
  const triggerErikRain = () => {
    setShowErikTruck(true);
    const rain = Array.from({ length: 24 }, (_, i) => i);
    setErikRain(rain);
    setTimeout(() => {
      setShowErikTruck(false);
      setErikRain([]);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-vp-bg text-slate-800 font-sans flex flex-col justify-between selection:bg-vp-lightpink selection:text-vp-maroon relative overflow-hidden">
      
      {/* Global Corner Protection Hearts (Visible when Nazar Savar is Active) */}
      {showNazarSavar && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Top Left corner */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col items-center animate-bounce">
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] text-purple-500">💜</span>
            <span className="text-[8px] font-mono font-black text-purple-300 bg-black/85 border border-purple-500 px-1.5 py-0.5 rounded-full mt-1 tracking-wider whitespace-nowrap shadow-md">
              MUSTAFA CAN KORUMASI 🛡️
            </span>
          </div>
          
          {/* Top Right corner */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-center animate-bounce delay-100">
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] text-purple-500">💜</span>
            <span className="text-[8px] font-mono font-black text-purple-300 bg-black/85 border border-purple-500 px-1.5 py-0.5 rounded-full mt-1 tracking-wider whitespace-nowrap shadow-md">
              NEM ALICI SAVUNMA 🛡️
            </span>
          </div>

          {/* Bottom Left corner */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col items-center animate-bounce delay-200">
            <span className="text-[8px] font-mono font-black text-purple-300 bg-black/85 border border-purple-500 px-1.5 py-0.5 rounded-full mb-1 tracking-wider whitespace-nowrap shadow-md">
              KEM GÖZ DEFANSİFİ 🧿
            </span>
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] text-purple-500">💜</span>
          </div>

          {/* Bottom Right corner */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-center animate-bounce delay-300">
            <span className="text-[8px] font-mono font-black text-purple-300 bg-black/85 border border-purple-500 px-1.5 py-0.5 rounded-full mb-1 tracking-wider whitespace-nowrap shadow-md">
              AKORTLU SEVGİ ZIRHI 💖
            </span>
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] text-purple-500">💜</span>
          </div>
        </div>
      )}

      {/* Nazar Savar Modal */}
      {showNazarSavar && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-xs transition-all animate-fade-in">
          <div className="absolute inset-4 border-4 border-dashed border-purple-500/40 rounded-[3rem] opacity-75 pointer-events-none animate-pulse" />
          <div className="absolute inset-8 border border-purple-400/20 rounded-[2.5rem] opacity-30 pointer-events-none" />
          
          <div className="bg-black/95 border-4 border-purple-500 rounded-[2.5rem] p-8 max-w-sm text-center shadow-[0_0_50px_rgba(168,85,247,0.6)] relative z-10 animate-[bounce_0.6s_ease-out_1]">
            <div className="text-6xl mb-4 animate-[spin_6s_linear_infinite] select-none filter drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">🧿</div>
            <h4 className="text-md font-black text-purple-400 font-display tracking-tight uppercase">
              🛡️ MUSTAFA CAN ÖZEL KORUMASI AKTİF! 🛡️
            </h4>
            <p className="text-xs text-purple-100 leading-relaxed font-sans mt-3 font-semibold">
              "Kainat ve Galaksi güzeli İloş Hanım ve asil ailesinin sağlığı, kütüphane motivasyonu, fıstıklı dürümleri ve aslan burcu pürüzsüz konsantrasyonu %100 akortlu MOR ZIRH koruması altındadır! Sayfanın köşelerinde mor kalpler bizzat Mustafa Can tarafından oluşturulmuş kalkanlardır."
            </p>
            <button
              onClick={() => setShowNazarSavar(false)}
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-650 hover:from-purple-600 hover:to-indigo-750 text-white px-6 py-2.5 rounded-xl text-xs font-black leading-none cursor-pointer tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95"
            >
              Kalkanı Aktif Tut & Kapat 🛡️💜
            </button>
          </div>
        </div>
      )}
      
      {/* Decorative Floating Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-vp-lightpink/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-vp-pink/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Green Erik Rain overlay */}
      {erikRain.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {erikRain.map((id) => (
            <div
              key={id}
              className="absolute text-3xl animate-[bounce_3s_infinite]"
              style={{
                left: `${Math.random() * 95}%`,
                top: `-50px`,
                animation: `fallAndBounce 4s ease-in forwards`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              🍏
            </div>
          ))}
        </div>
      )}

      {/* Floating Yellow/Red Hearts and Soccer Balls Rain (Icardi Easter Egg) */}
      {icardiRain.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {icardiRain.map((id) => {
            const emojis = ["⚽", "💛", "❤️", "⭐", "🦁"];
            const emoji = emojis[id % emojis.length];
            return (
              <div
                key={id}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 95}%`,
                  top: `-50px`,
                  animation: `fallAndBounce 4.5s ease-in forwards`,
                  animationDelay: `${Math.random() * 2.5}s`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      {/* Mauro Icardi Galatasaray Celebration Modal */}
      {showIcardi && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-xs transition-all animate-fade-in">
          <div className="absolute inset-4 border-4 border-dashed border-yellow-500/40 rounded-[3rem] opacity-75 pointer-events-none animate-pulse" />
          <div className="absolute inset-8 border border-red-500/20 rounded-[2.5rem] opacity-30 pointer-events-none" />
          
          <div className="bg-slate-900 border-4 border-yellow-500 rounded-[2.5rem] p-8 max-w-sm text-center shadow-[0_0_50px_rgba(253,185,19,0.6)] relative z-10 animate-[bounce_0.6s_ease-out_1]">
            <div className="text-6xl mb-4 select-none filter drop-shadow-[0_0_15px_rgba(253,185,19,0.8)] animate-bounce text-center justify-center flex gap-1">
              <span>🙌</span><span>🦁</span><span>💛</span><span>❤️</span>
            </div>
            
            <div className="flex justify-center gap-1.5 mb-2.5">
              <span className="text-yellow-450 text-lg">⭐</span>
              <span className="text-yellow-450 text-lg">⭐</span>
              <span className="text-yellow-450 text-lg">⭐</span>
              <span className="text-yellow-450 text-lg">⭐</span>
            </div>

            <h4 className="text-md font-black text-yellow-500 font-display tracking-tight uppercase">
              🏆 KÜTÜPHANE FATİHİ İLOŞ! 🦁🙌
            </h4>
            
            <p className="text-xs text-slate-100 leading-relaxed font-sans mt-3 font-bold">
              "Atakum kütüphane masalarından bildiriyoruz: Saniyede paragraf çözen o asil aslan İloş için şampiyonluk sevinci başlasın! 🙌<br/><br/>
              Bugün de aynı disiplin, odaklanma ve yüksek motivasyonla KPSS hedeflerimizi tek tek darmadağın ediyoruz. Bu harika başarı maratonunda şampiyonluk kupasını bizzat kaldıracaksın, dualarımız ve tam desteğimiz her zaman seninle!"
            </p>
            
            <button
              onClick={() => setShowIcardi(false)}
              className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl text-xs font-black leading-none cursor-pointer tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(253,185,19,0.4)] active:scale-95"
            >
              HEMENCEK KAZANIYORUZ! 🦁💛❤️
            </button>
          </div>
        </div>
      )}

      {/* Navigation & Header */}
      <header className="bg-white/80 border-b border-vp-lightpink backdrop-blur-md sticky top-0 z-40 px-4 py-3 shrink-0 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-vp-pink to-vp-hotpink flex items-center justify-center text-lg font-bold shadow-md shadow-vp-pink/20 border border-white/30 animate-pulse">
              ☀️
            </div>
            <div>
              <h1 className="text-md md:text-lg font-black tracking-tight text-vp-maroon font-display">
                İloş'un Galaksisi <span className="text-vp-pink">Hub</span>
              </h1>
              <p className="text-[10px] text-vp-darkpink font-mono uppercase tracking-widest font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-vp-pink shrink-0" />
                📚 KPSS KARARGAHI • ATAKUM ESİNTİSİ • %100 AKORT 🎯
              </p>
            </div>
          </div>

          {/* Clock & Real-time stats */}
          <div className="flex items-center gap-4">
            {/* Clock */}
            <div className="bg-white border-2 border-vp-lightpink rounded-lg px-3 py-1 font-mono text-xs font-bold text-vp-maroon tracking-wider shadow-sm">
              {timeStr || "00:00:00"}
            </div>

            {/* Quick Actions buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowNazarSavar(true)}
                className="bg-sky-50 hover:bg-sky-100 border-2 border-vp-blueborder px-3 py-1 rounded-full text-xs font-bold text-sky-700 flex items-center gap-1.5 transition-all select-none cursor-pointer shadow-sm active:scale-95"
                id="nazar_savar_trigger"
              >
                🧿 Nazar-Savar
              </button>
              <button
                onClick={triggerErikRain}
                disabled={showErikTruck}
                className="bg-emerald-50 hover:bg-emerald-100 border-2 border-vp-greenborder px-3 py-1 rounded-full text-xs font-bold text-emerald-700 flex items-center gap-1.5 transition-all select-none cursor-pointer shadow-sm active:scale-95"
                id="erik_kamyonu_trigger"
              >
                🍏 Erik Kamyonu
              </button>
              <button
                onClick={triggerIcardiCelebration}
                disabled={showIcardi}
                className="bg-amber-50 hover:bg-amber-100 border-2 border-yellow-400 px-3 py-1 rounded-full text-xs font-black text-amber-800 flex items-center gap-1.5 transition-all select-none cursor-pointer shadow-sm active:scale-95 animate-pulse"
                id="icardi_trigger"
              >
                🏆 🦁 Şampiyonluk Sevinci
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:py-12 space-y-8">

        {/* Live Client-Server Daily Motivation Banner */}
        <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="absolute top-0 right-0 w-24 h-24 bg-vp-lightpink/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="md:col-span-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-vp-pink uppercase tracking-wide mb-1">
              <Sparkles className="w-4 h-4 text-vp-pink shrink-0 animate-pulse" />
              <span>Günün Akort Edilmiş Kozmik İletisi</span>
            </div>
            <p className="text-sm md:text-md text-vp-maroon font-sans font-black leading-relaxed" id="live_motivation_quote">
              "{inspiration.quote}"
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Aura Akordu</div>
            <div className="text-xs font-black text-vp-pink mt-1 animate-pulse uppercase font-mono">{inspiration.action}</div>
          </div>
        </div>

        {/* 2026 KPSS Ön Lisans Geri Sayım Sayacı */}
        <div className="bg-gradient-to-r from-vp-maroon via-slate-900 to-vp-maroon border-b-8 border-r-8 border-amber-500 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative cosmic grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/45 px-3 py-1 rounded-full text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                ÖSYM • 2026 KPSS ÖN LİSANS GERİ SAYIMI 🎯
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-amber-400">
                Hedefe Kilitlendik İloş! 👩‍💼🦁
              </h2>
              <p className="text-xs text-slate-300 max-w-md font-medium leading-relaxed">
                Atakum sahili meltemi eşliğinde, her saniye akortlu çalışarak o şampiyonluk kupasını kaldıracağız! Sınav Tarihi: <span className="text-amber-300 font-bold">4 Ekim 2026 - 10:15</span>
              </p>
            </div>

            {/* Countdown Clock Grid */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full md:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[70px] md:min-w-[85px] text-center shadow-lg">
                <div className="text-2xl md:text-4xl font-black font-mono text-amber-300 tracking-tight">
                  {timeLeft.days}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-slate-300 mt-1">GÜN</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[70px] md:min-w-[85px] text-center shadow-lg">
                <div className="text-2xl md:text-4xl font-black font-mono text-amber-300 tracking-tight">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-slate-300 mt-1">SAAT</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[70px] md:min-w-[85px] text-center shadow-lg">
                <div className="text-2xl md:text-4xl font-black font-mono text-amber-300 tracking-tight">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-slate-300 mt-1">DAKİKA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[70px] md:min-w-[85px] text-center shadow-lg">
                <div className="text-2xl md:text-4xl font-black font-mono text-red-400 tracking-tight animate-pulse">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-slate-300 mt-1">SANİYE</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 relative z-10">
            <div className="flex justify-between text-[10px] text-slate-300 font-mono font-bold mb-1.5 uppercase">
              <span>Bugün: {todayStr}</span>
              <span className="text-amber-300 font-black">Sınav İlerlemesi: %{timeLeft.percentage}</span>
              <span>Sınav Günü: 4 Ekim 2026</span>
            </div>
            <div className="w-full bg-white/10 h-3.5 rounded-full p-0.5 border border-white/10 overflow-hidden relative">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-1000 relative shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${timeLeft.percentage}%` }}
              >
                {/* Slidable glowing star indicator */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs filter drop-shadow-[0_0_4px_rgba(255,255,255,1)]">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* KOZMİK AKORT VE ENERJİ İSTASYONU */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Atakum Poyrazı ile Dert Üfleme Balonu */}
          <div className="bg-white border-b-4 border-r-4 border-vp-lightpink/60 border-2 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-mono font-black text-vp-pink uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500 animate-spin" />
                <span>🎈 DERT ÜFLEME BALONU</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Kafanı kurcalayan, modunu düşüren veya sınavla ilgili ne varsa buraya yazıp Atakum poyrazına fırlat!
              </p>

              {!blownBubble ? (
                <form onSubmit={handleBlowStress} className="mt-4 space-y-2">
                  <input 
                    type="text"
                    value={stressInput}
                    onChange={(e) => setStressInput(e.target.value)}
                    placeholder="Seni sıkan şeyi yaz İloşum... (örn: coğrafya ezberleri)"
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-250 focus:border-sky-400 focus:bg-white transition-all text-slate-700"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md shadow-sky-400/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Poyraza Doğru Üfle! 🪁💨</span>
                  </button>
                </form>
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center text-center space-y-4">
                  {/* Floating interactive balloon */}
                  <div 
                    onClick={handlePopBubble}
                    className={`relative w-28 h-28 bg-gradient-to-tr from-sky-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center p-3 text-center cursor-pointer shadow-lg hover:scale-110 active:scale-90 transition-transform ${
                      isPopping ? "animate-ping opacity-0" : "animate-bounce"
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    {/* Balloon knot */}
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rotate-45" />
                    <span className="text-[10px] font-black text-white leading-tight font-sans break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {blownBubble.text}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono font-black text-purple-500 uppercase tracking-wider animate-pulse">
                    🎈 BALONA DOKUN VE PATLAT! 🎈
                  </p>
                </div>
              )}

              {/* Success / Pop Message */}
              {bubbleMessage && (
                <div className="mt-4 bg-sky-50 border border-sky-100 p-3.5 rounded-2xl text-center shadow-inner animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-xs text-sky-850 font-bold leading-relaxed">
                    {bubbleMessage}
                  </p>
                </div>
              )}
            </div>
            
            <div className="pt-2 text-[9px] font-mono text-slate-400 font-bold text-center border-t border-slate-50">
              Uçurulan her balon zihni pürüzsüzleştirir 🪁
            </div>
          </div>

          {/* 2. Kozmik Akort Enerji Kristali */}
          <div className="bg-white border-b-4 border-r-4 border-vp-lightpink/60 border-2 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-mono font-black text-vp-pink uppercase tracking-widest flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-500 animate-pulse" />
                <span>🔮 KOZMİK AKORT KRİSTALİ</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Kristale dokunarak aurandaki, odağındaki ve sevgideki taze enerji düzeylerini zirveye ulaştır!
              </p>

              {/* Glowing Interactive Crystal */}
              <div className="my-4 flex justify-center">
                <div 
                  onClick={handleTuneCrystal}
                  className="w-16 h-24 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-400 cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.55)] hover:shadow-[0_0_40px_rgba(244,63,94,0.75)] active:scale-95 transition-all animate-pulse"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    animationDuration: "2s"
                  }}
                  title="Akort Etmek İçin Dokun! 🔮"
                />
              </div>

              {/* Crystal Live Stats */}
              <div className="grid grid-cols-2 gap-2 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="p-1.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase">Aslan Aurası</span>
                  <span className="text-xs font-black font-mono text-vp-pink">%{crystalStats.aura}</span>
                </div>
                <div className="p-1.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase">Odaklanma</span>
                  <span className="text-xs font-black font-mono text-indigo-600">%{crystalStats.focus}</span>
                </div>
                <div className="p-1.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase">Çilek Enerjisi</span>
                  <span className="text-xs font-black font-mono text-rose-500">%{crystalStats.cherryEnergy}</span>
                </div>
                <div className="p-1.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase">Musti Duaları</span>
                  <span className="text-xs font-black font-mono text-emerald-600">{crystalStats.mustiPrayers} Adet</span>
                </div>
              </div>

              {/* Crystal logs */}
              <div className="mt-3 bg-purple-50/50 border border-purple-100 p-2.5 rounded-xl text-center min-h-[40px] flex items-center justify-center">
                <p className="text-[10.5px] text-purple-900 font-bold leading-relaxed">
                  {crystalMessage}
                </p>
              </div>
            </div>

            <button 
              onClick={handleTuneCrystal}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md shadow-purple-400/20 transition-all active:scale-95"
            >
              Frekansları Eşzamanla ⚡🔮
            </button>
          </div>

          {/* 3. Musti'den Telepatik Sevgi Frekansı */}
          <div className="bg-white border-b-4 border-r-4 border-vp-lightpink/60 border-2 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-mono font-black text-vp-pink uppercase tracking-widest flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse fill-rose-500" />
                <span>🧬 TELEPATİK SEVGİ FREKANSI</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Şu anki modunu seç ve Mustafa Can'ın kalbinden anında telepatik bir enerji dalgası çöz canım İloş!
              </p>

              {/* Vibe Selection Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                  onClick={() => handleVibeSelect("sleepy")}
                  className={`p-2.5 rounded-xl border text-xs font-black text-center cursor-pointer transition-all active:scale-95 ${
                    selectedVibe === "sleepy" 
                      ? "bg-purple-650 border-purple-700 text-white shadow-md shadow-purple-500/25" 
                      : "bg-purple-50/60 border-purple-100 text-purple-900 hover:bg-purple-100"
                  }`}
                >
                  💤 Uykum Geldi
                </button>
                <button 
                  onClick={() => handleVibeSelect("bored")}
                  className={`p-2.5 rounded-xl border text-xs font-black text-center cursor-pointer transition-all active:scale-95 ${
                    selectedVibe === "bored" 
                      ? "bg-pink-650 border-pink-750 text-white shadow-md shadow-pink-500/25" 
                      : "bg-pink-50/60 border-pink-100 text-pink-900 hover:bg-pink-100"
                  }`}
                >
                  🥱 Çok Sıkıldım
                </button>
                <button 
                  onClick={() => handleVibeSelect("low_energy")}
                  className={`p-2.5 rounded-xl border text-xs font-black text-center cursor-pointer transition-all active:scale-95 ${
                    selectedVibe === "low_energy" 
                      ? "bg-rose-650 border-rose-750 text-white shadow-md shadow-rose-500/25" 
                      : "bg-rose-50/60 border-rose-100 text-rose-950 hover:bg-rose-100"
                  }`}
                >
                  📉 Modum Düştü
                </button>
                <button 
                  onClick={() => handleVibeSelect("erik")}
                  className={`p-2.5 rounded-xl border text-xs font-black text-center cursor-pointer transition-all active:scale-95 ${
                    selectedVibe === "erik" 
                      ? "bg-emerald-650 border-emerald-750 text-white shadow-md shadow-emerald-500/25" 
                      : "bg-emerald-50/60 border-emerald-100 text-emerald-950 hover:bg-emerald-100"
                  }`}
                >
                  🍏 Erik Aşeriyorum
                </button>
              </div>

              {/* Dynamic telepathic content display */}
              {telepathicReply && (
                <div className="mt-4 bg-gradient-to-tr from-slate-900 to-purple-950 border-2 border-purple-500/35 p-3.5 rounded-2xl text-center shadow-lg animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-[11px] text-purple-100 font-bold leading-relaxed italic">
                    {telepathicReply}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 text-[9px] font-mono text-slate-400 font-bold text-center border-t border-slate-50">
              Musti'nin sevgisi her frekansta seninle 🛰️💜
            </div>
          </div>

        </div>

      </main>

      {/* Modern High-End Footer with Beautiful Inspiring Quotes */}
      <footer className="bg-white border-t border-vp-lightpink py-10 px-4 shrink-0 text-center relative overflow-hidden mt-12 shadow-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-vp-pink/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
          <Heart className="w-5 h-5 text-vp-pink fill-vp-pink animate-pulse" />
          
          {/* Beautiful Quote Display Container */}
          <div className="bg-vp-bg border border-vp-borderpink p-5 rounded-3xl max-w-xl shadow-xs relative">
            <span className="text-[10px] font-mono text-vp-pink uppercase tracking-widest block mb-2 font-black">✨ GÜNÜN İLHAM VEREN GÜZEL SÖZÜ ✨</span>
            <p className="text-xs text-vp-maroon italic font-sans font-black leading-relaxed">
              "{footerQuote || "Sen gökyüzünde parlayan en eşsiz aslan burcu yıldızısın; her günün asalet ve sonsuz başarı ile dolsun İloşum!"}"
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-[9.5px] bg-white border border-purple-200 px-2.5 py-1 rounded-full font-sans font-bold text-slate-600 shadow-3xs">
                🌸 Her Zorluk Geçer, Yıldızın Asla Sönmez!
              </span>
              <span className="text-[9.5px] bg-white border border-rose-200 px-2.5 py-1 rounded-full font-sans font-bold text-slate-600 shadow-3xs">
                💕 Hayallerine İnan, Zafere Doğru Yürü!
              </span>
              <span className="text-[9.5px] bg-white border border-blue-200 px-2.5 py-1 rounded-full font-sans font-bold text-slate-600 shadow-3xs">
                🧸 Sevgi, Kararlılık ve Bol Kozmetik ✨
              </span>
            </div>
          </div>

          <p className="text-xs text-vp-darkpink font-sans tracking-tight max-w-xl leading-relaxed font-semibold mt-1">
            Musti tarafından en ince ayrıntısına kadar düşünülerek, dondurulmuş çilekler, bol turşulu dürümler ve dualar eşliğinde İloş Hanım için akort edilmiştir...
          </p>
          <div className="text-[10px] font-mono text-vp-maroon/65 uppercase tracking-widest font-black mt-2">
            © 2026 İLOŞ'UN GALAKSİ PLATFORMU • TÜM HAKLARI SAKLIDIR 💖
          </div>
        </div>
      </footer>

      {/* Custom keyframes rules */}
      <style>{`
        @keyframes fallAndBounce {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          60% {
            transform: translateY(85vh) rotate(180deg);
          }
          75% {
            transform: translateY(70vh) rotate(240deg);
          }
          90% {
            transform: translateY(85vh) rotate(300deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

    </div>
  );
}
