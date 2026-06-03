import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Sparkles, MessageSquare, AlertCircle, RefreshCcw, Heart, Check, 
  ShieldCheck, BrainCircuit, Dumbbell, Coffee, Volume2, VolumeX, Shield,
  Gauge, Zap, Smile, Compass, Award, Activity
} from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatAssistant() {
  // Conversational modes
  type ActiveMode = "musti" | "kpss" | "pt" | "sweet";
  const [activeMode, setActiveMode] = useState<ActiveMode>("musti");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("ilo_ai_messages_v3");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        role: "assistant",
        content: "Kainatın, galaksinin ve tüm Samanyolu'nun gelmiş geçmiş en muhteşem İloş hanımefendisi, özel akort edilmiş dünyana hoş geldin! Ben Musti'nin senin için özel tasarladığı ve tüm o tatlı esprilerinizle eğittiği asistanım. Tarih mi ezberleyeceğiz, İlker hocayı mı atlatacağız yoksa Komagene franchiselarını mı planlayacağız? Emrindeyim! ☕☀️",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [calibrationScore, setCalibrationScore] = useState(100);
  const [funnyStatus, setFunnyStatus] = useState("Mor Kalkan Aktif 💜");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat locally and persist (never scroll the browser window)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    localStorage.setItem("ilo_ai_messages_v3", JSON.stringify(messages));
  }, [messages]);

  // Synthetic premium chime sound via Web Audio API 🔊
  const playChime = (customFreq?: number) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(customFreq || 587.33, ctx.currentTime); // D5 note
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(customFreq ? customFreq * 1.5 : 880.00, ctx.currentTime + 0.08); // A5 note
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Web audio playback blocked or unsupported.", e);
    }
  };

  // Dynamic fast prompts depending on selected user mode!
  const getFastPrompts = () => {
    switch (activeMode) {
      case "musti":
        return [
          { label: "💜 Musti Kalkanı İste", prompt: "Bana o özel mor kalpli Mustafa Can kalkanı gücünden bahset! Bugün kütüphanede moralim tavan yapsın." },
          { label: "📸 Dua Lipa Pozu", prompt: "Bizim o meşhur 'Dua Lipa pozlarıyla Kocaeli podyumu' esprisini hatırlatır mısın?" },
          { label: "🥑 Peluş Avokado Yasası", prompt: "Peluş avokadonun yumuşacık şifa yasası hakkında konuş canım." }
        ];
      case "kpss":
        return [
          { label: "🌍 Coğrafya Ezberi", prompt: "Samsun ve KPSS coğrafya konularını bir çırpıda aklımda tutacak eğlenceli ve akortlu bir taktik uydur!" },
          { label: "📚 Tarihte Tek Geçen Yöntem", prompt: "Tarih dersinde o muazzam hocanın tarzıyla akılda kalıcı bir padişah taktiği patlat." },
          { label: "🍋 Limonlu Ödem Suyu", prompt: "Limonlu kahve ve limonlu su arasındaki o bitmeyen 'su iç' akordunu tartış canım!" }
        ];
      case "pt":
        return [
          { label: "🏃‍♀️ İlker Hoca'yı Atlat", prompt: "İlker hoca bu akşam feci bacak seansı yazmış! Antrenmandan kaçmak için İlker'i güldürerek ikna edecek bir bahane yaz." },
          { label: "🛡️ Hummel Taytı Korucu", prompt: "Hummel taytımızın tayt pürüzlenme nazarından korunması için mor koruma kalkanını başlat!" },
          { label: "🥇 Kürsüye Çıkış Aurası", prompt: "Manken asiliyle spor salonundaki derecelerimizi kutlayalım!" }
        ];
      case "sweet":
        return [
          { label: "🌯 Komagene Siparişi", prompt: "Tatlı diyetindeyim ama çiğköfte franchise hayallerimiz ne alemde? Limonlu bol turşulu dürüm ayarlayalım!" },
          { label: "🧁 Sanal Künefe Şöleni", prompt: "Hafif künefe isteğim geldi, irademi bozmadan Hatay usulü sanal bir künefe rüyası canlandır canım." },
          { label: "😡 Galatasaray 4-0 Sendromu", prompt: "Samsunspor'un GS'yi 4-0 yenme şoku üzerine İlker'in sevinme esprisini anlat canım!" }
        ];
    }
  };

  // Send message to backend with dynamic mode instructions injected!
  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal;
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    // Injected system context for the active mode so Gemini reacts EXACTLY as desired!
    let contextGuideline = "";
    if (activeMode === "musti") {
      contextGuideline = "\n[Aktif Mod: EMPATİK MUSTİ MODU. Çok sevgi dolu, aşırı tatlı, mor kalpli, Mustafabank cömertliğinde, İloş'u can kulağıyla dinleyen bir tonda konuş.]";
    } else if (activeMode === "kpss") {
      contextGuideline = "\n[Aktif Mod: KPSS COĞRAFYA & TARİH HOCASI. İnanılmaz motive edici, sınav tüyoları veren, kütüphane odaklı, 'Tarih hocasını dinle' tarzında konuş.]";
    } else if (activeMode === "pt") {
      contextGuideline = "\n[Aktif Mod: FİTNESS BODYGUARD İLKER SAVAR. İlker hocanın pestil çıkartan bacak antrenmanlarından kaçış komedileri yapan, Hummel taytı asaletini koruyan cool üslup.]";
    } else if (activeMode === "sweet") {
      contextGuideline = "\n[Aktif Mod: TATLI KRİZ ÇÖZÜCÜ. Şeker diyetine destek veren, sanal Künefeler, Komagene bol turşulu dürüm ve dondurulmuş çileklere aşeren, muzip ve iştah açıcı şaka tonu.]";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          userMessage: textToSend + contextGuideline
        })
      });

      if (!response.ok) {
        throw new Error("Sunucu bağlantısı sağlanamadı.");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Canım İloş, bu cümleni akort edemedim ama Mustafabank daima yanında, mor kalplerimiz devrede! 💖✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      playChime(); // Play the chime on receiving response!
    } catch (err: any) {
      console.error(err);
      
      // Graceful and highly personalized backup mock response so the user experience is flawless
      let mockReply = "";
      if (activeMode === "musti") {
        mockReply = "Ah canım İloş'um! Bizim sunucu kütüphanede çok kafa patlatmış, azıcık yorulmuş (Gemini API bağlantısı akort dışı). Ama Mustafabank kartın buradaki sevgi limitleriyle her saniye %100 açık! Kendini yorgun hissediyorsan avokado peluşuna sarıl ve derin nefes al, Musti her zaman senin koruyan aslan kalkanındır! 🛡️💜";
      } else if (activeMode === "kpss") {
        mockReply = "KPSS sisteminde küçük bir tüzük/api güncellemesi var galiba! Ama kütüphanede o asil duruşuyla coğrafya haritalarını ezberleyen galaksi güzeline zaten hiçbir engel vız gelemez. Sıradaki paragraf sorusu senin o üstün Leo zekana boyun eğecek! 📐📚";
      } else if (activeMode === "pt") {
        mockReply = "İlker Hoca'nın antrenman seansındaki o yorucu dumanı sunucuya da vurmuş! Hummel taytımızı pürüzlendiren o nazar savuşturuldu! Bacak gününü kaytarmak için 'Odamda ödem suyu demliyorum' bahanesi %100 çalışır İloşum, şimdiden geçmiş olsun! 🏃‍♀️🦾";
      } else {
        mockReply = "Komagene şubelerinden birinde internet teli kopmuş gibi! 🌯 Ama canın hiç sıkılmasın, dertleri unutturacak sıcacık bir Hatay künefesi veya üzerine çikolata şelalesi dökülmüş sanal waffle porsiyonun hazır! Şeker diyetini bozmadan bu mor kalpler sana doping olsun! 💕🧁";
      }

      const backupMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, backupMsg]);
      playChime();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInjectPreset = (type: string) => {
    let presetText = "";
    if (type === "kpss") {
      presetText = "Kitaplar açılsın! Bana kütüphane havasında en parlak, en pürüzsüz motivasyonu ver. Tarih ezberlemek için sabırsızlanıyorum! 📚📐";
      setFunnyStatus("Coğrafya Ateşlendi! 🌍🔥");
    } else if (type === "musti") {
      presetText = "Bugün acil Mor Sevgi Kalkanı yardımı gerek! En mor kalpli Mustafa Can dopingini göndersene. 💜✨";
      setFunnyStatus("Musti Kalkanı %150! 🛡️💜");
    } else if (type === "pt") {
      presetText = "Olamaz, İlker Hoca feci bacak idmanı hazırlatıyor! En havalı antrenman kaytarma bahanesini hemen yaz İlker'i güldürelim! 🏋️‍♀️🏃‍♀️";
      setFunnyStatus("Tayt Nazarı Engellendi 🧿");
    } else if (type === "sweet") {
      presetText = "Canım canım, dondurulmuş çilek ve çikolatalı can yoldaşı waffle rüyası kuralım mı? Komagene franchise ne alemde? 🌯🧇";
      setFunnyStatus("Komagene Aktif 🌯✨");
    }
    
    setCalibrationScore(prev => Math.min(prev + 10, 150));
    playChime(698.46); // F5 note
    handleSend(presetText);
  };

  const handleConfirmClear = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Kainatın, galaksinin ve tüm Samanyolu'nun gelmiş geçmiş en muhteşem İloş hanımefendisi, sohbetimiz sıfırlandı ve pürüzsüzce tazelendi! Şimdi hayallerini akort etmeye hazırız. Ne yapmak istersiniz? 🌿✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    localStorage.removeItem("ilo_ai_messages_v3");
    setCalibrationScore(100);
    setFunnyStatus("Geçmiş Temizlendi! 🧹✨");
    setShowConfirmClear(false);
    playChime(440.00); // A4 note
  };

  return (
    <div className="bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2.5rem] p-5 shadow-xl" id="can_yoldasi_container">
      
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-vp-ice via-pink-50 to-blue-50 border-2 border-vp-blueborder p-4.5 rounded-[1.8rem] mb-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-vp-blueborder flex items-center justify-center text-2xl shadow-md animate-bounce">
            🥑👑
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-vp-blue font-display tracking-tight flex items-center gap-1.5">
              <span>Can Yoldaşı & Akort Sürat Merkezin 🤖</span>
              <Sparkles className="w-4 h-4 text-vp-blue animate-pulse" />
            </h3>
            <p className="text-[10px] text-vp-cyan font-mono font-bold uppercase tracking-wider">
              Musti Kumandalı Akıllı Gemini Paneli • En Son Sürüm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Display badge */}
          <div className="bg-white border border-vp-blueborder px-3 py-1 rounded-full font-mono text-[9.5px] font-black text-vp-blue uppercase shadow-3xs">
            📢 {funnyStatus}
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playChime(523.25);
            }}
            className="text-slate-400 hover:text-vp-blue p-2 rounded-xl bg-white border border-slate-200 transition-colors shadow-3xs cursor-pointer"
            title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-vp-blue" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          
          <button 
            onClick={() => setShowConfirmClear(true)}
            className="text-rose-600 hover:text-white hover:bg-rose-600 p-2 rounded-xl bg-rose-50 border border-rose-205 transition-all shadow-3xs cursor-pointer"
            title="Sohbeti Tazelemeli"
            id="clear_chat_header_btn"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inline Confirmation Overwrite Banner (No confirm() blocking anymore!) */}
      {showConfirmClear && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left animate-fade-in shadow-inner">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧹</span>
            <div>
              <span className="text-xs font-black text-rose-800 uppercase block">Göz Kamaştıran Sohbet Temizleme</span>
              <p className="text-[10.5px] text-rose-600 font-semibold leading-relaxed">
                Eski dökümleri ve sohbet geçmişini tamamen silelim mi İloşum? (İlk selamlama mesajı kalacaktır!)
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleConfirmClear}
              className="bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
              id="confirm_clear_true"
            >
              Evet, Temizle! 🧹
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-705 font-black text-[10px] px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Vazgeç ✕
            </button>
          </div>
        </div>
      )}

      {/* Grid container: Split on medium and larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5.5 items-stretch">
        
        {/* LEFT PANEL: SMART TUNER (AKORT KUMANDASI) */}
        <div className="lg:col-span-4 bg-gradient-to-tr from-purple-50/70 via-indigo-50/50 to-blue-50/70 border-2 border-vp-blueborder/35 rounded-[1.8rem] p-5 flex flex-col justify-between gap-4 shadow-3xs">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-5 h-5 text-vp-blue" />
              <h4 className="text-xs font-black text-vp-blue font-display tracking-tight uppercase">
                Musti'nin Akort Kumandası 🎛️
              </h4>
            </div>

            <p className="text-[10.5px] text-slate-550 leading-relaxed font-sans font-semibold mb-4">
              İloşum, bu panelde o anki motivasyon durumuna göre Gemini asistanın sevgi ve akort derecesini yönetebilirsin!
            </p>

            {/* Micro-Gauge slider indicator */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 mb-4 shadow-3xs">
              <div className="flex justify-between text-[9px] font-mono font-black text-slate-500 mb-1.5">
                <span>SEVGİ & AKORT ORANI:</span>
                <span className="text-vp-blue font-black">{calibrationScore}% (DOPİNG)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-vp-blue to-purple-505 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(20, (calibrationScore / 150) * 100))}%` }}
                />
              </div>
              
              <div className="flex justify-between gap-1 mt-3">
                <button 
                  onClick={() => {
                    setCalibrationScore(p => Math.max(50, p - 10));
                    playChime(392.00); // G4 note
                  }}
                  className="px-2.5 py-0.5 roundedbg-slate-100 hover:bg-slate-200 border border-slate-300 text-[10px] font-black cursor-pointer rounded-lg shadow-3xs"
                >
                  Gevşet 🔋
                </button>
                <button 
                  onClick={() => {
                    setCalibrationScore(p => Math.min(150, p + 10));
                    playChime(783.99); // G5 note
                  }}
                  className="px-2.5 py-0.5 bg-vp-blue text-white hover:bg-opacity-90 text-[10px] font-black cursor-pointer rounded-lg shadow-3xs"
                >
                  Akort Et! ⚡
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2 text-left">
              <span className="text-[8px] font-mono font-black text-slate-400 block uppercase tracking-wide">
                HIZLI ŞİMŞEK REAKSİYONLAR 🎒:
              </span>
              
              <button
                onClick={() => triggerInjectPreset("musti")}
                className="w-full bg-white hover:bg-purple-100/30 border border-purple-200 hover:border-purple-300 text-purple-950 px-3 py-2 rounded-xl text-[10.5px] font-sans font-black flex items-center justify-between transition-all shadow-3xs cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
                  Musti Kalkanı İste
                </span>
                <span className="text-[8.5px] bg-purple-50 px-1.5 py-0.5 rounded font-mono text-purple-600">%150</span>
              </button>

              <button
                onClick={() => triggerInjectPreset("kpss")}
                className="w-full bg-white hover:bg-blue-100/30 border border-blue-200 hover:border-blue-300 text-blue-950 px-3 py-2 rounded-xl text-[10.5px] font-sans font-black flex items-center justify-between transition-all shadow-3xs cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 text-blue-500" />
                  KPSS Doping Enjekte Et
                </span>
                <span className="text-[8.5px] bg-blue-50 px-1.5 py-0.5 rounded font-mono text-blue-600">Öğren</span>
              </button>

              <button
                onClick={() => triggerInjectPreset("pt")}
                className="w-full bg-white hover:bg-emerald-100/30 border border-emerald-200 hover:border-emerald-300 text-emerald-950 px-3 py-2 rounded-xl text-[10.5px] font-sans font-black flex items-center justify-between transition-all shadow-3xs cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                  İlker Savar Kalkanı Yükle
                </span>
                <span className="text-[8.5px] bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-emerald-600">Bacak</span>
              </button>

              <button
                onClick={() => triggerInjectPreset("sweet")}
                className="w-full bg-white hover:bg-pink-100/30 border border-pink-205 hover:border-pink-300 text-pink-950 px-3 py-2 rounded-xl text-[10.5px] font-sans font-black flex items-center justify-between transition-all shadow-3xs cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-pink-500" />
                  Sanal Komagene Ziyafeti
                </span>
                <span className="text-[8.5px] bg-pink-50 px-1.5 py-0.5 rounded font-mono text-pink-600">Dürüm</span>
              </button>
            </div>
          </div>

          <div className="bg-indigo-900 text-indigo-50 border border-indigo-700 rounded-2xl p-3.5 text-left text-[9.5px] leading-relaxed font-sans font-semibold mt-2 shadow-xs">
            <span className="font-black text-[10px] block mb-1 text-yellow-300 flex items-center gap-1">
              <Award className="w-3 h-3" />
              Musti'den İlham Sinyali
            </span>
            "Sen gökyüzünün en gururlu en cici aslanısın İloş! Bu dertlerin hepsi Atakum sahilinin poyraz dalgaları gibi esip geçecek. Ben daima arkandayım canım!"
          </div>

        </div>

        {/* RIGHT PANEL: CHAT INTERACTIVE SCREEN */}
        <div className="lg:col-span-8 bg-slate-50 border-2 border-slate-205 rounded-[1.8rem] flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-3xs">
          
          {/* Conversational mode selector */}
          <div className="bg-white border-b border-slate-220 px-4 py-2 shrink-0">
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "musti", label: "🛡️ Musti Modu", info: "Sevgi frekansı" },
                { id: "kpss", label: "🌍 Sınav Doping", info: "Coğrafya & Tarih" },
                { id: "pt", label: "🏋️‍♀️ İlker Savar", info: "Bodyguard" },
                { id: "sweet", label: "🧁 Kriz Çözücü", info: "Komagene & Künefe" }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode.id as any);
                    const notifyMsgs = {
                      musti: "Musti Mor Koruma Kalkanı modu aktive edildi! Sevgi ve motivasyon frekansı %100'e ulaştı. 🛡️💜",
                      kpss: "KPSS Soru Savaşçısı modu açıldı! Tarih-coğrafya motivasyonu tavan yapmaya hazır. 📝🌟",
                      pt: "İlker Savar Antrenman Bodyguard modu aktif! Hummel taytı ve bacak günleri takibe alındı. 🏃‍♀️🦾",
                      sweet: "Tatlı Kriz Şöleni ve Komagene franchisor aurası yüklendi! Şeker diyetlerine moral dopingi! 🌯🍓"
                    };
                    setMessages(prev => [...prev, {
                      id: `notify_${Date.now()}`,
                      role: "assistant",
                      content: notifyMsgs[mode.id as ActiveMode],
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                    setFunnyStatus(`Mod: ${mode.label.split(' ')[1]}`);
                    playChime(659.25); // E5 note
                  }}
                  className={`py-1.5 px-1 rounded-xl border text-[9.5px] font-black tracking-tight text-center transition-all cursor-pointer ${
                    activeMode === mode.id
                      ? "bg-vp-blue border-vp-blue text-white shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className="block">{mode.label}</span>
                  <span className={`block text-[7px] font-semibold opacity-75 hidden sm:block`}>{mode.info}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bubble Threads */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] custom-scrollbar text-left">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                id={`message_bubble_${m.id}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm border-2 font-black shadow-3xs ${
                  m.role === "user" 
                    ? "bg-vp-bg border-vp-borderpink text-vp-pink" 
                    : m.id.startsWith("notify_") 
                      ? "bg-purple-100 border-purple-250 text-purple-900"
                      : "bg-vp-ice border-vp-blueborder text-vp-blue animate-pulse"
                }`}>
                  {m.role === "user" ? "☀️" : m.id.startsWith("notify_") ? "✨" : "🥑"}
                </div>

                {/* Bubble text */}
                <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-3xs text-[11px] font-sans ${
                  m.role === "user"
                    ? "bg-vp-blue text-white rounded-tr-none font-bold"
                    : m.id.startsWith("notify_")
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-150 text-purple-950 font-bold leading-normal rounded-xl"
                      : "bg-white text-slate-700 rounded-tl-none border border-slate-150 leading-relaxed font-bold"
                }`}>
                  <p className="whitespace-pre-line text-left">{m.content}</p>
                  <span className={`block text-[8px] font-mono mt-1 text-right ${
                    m.role === "user" ? "text-blue-100" : "text-slate-400"
                  }`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Bubble */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-vp-ice border border-vp-blueborder text-vp-blue flex items-center justify-center text-xs font-bold animate-pulse">
                  🥑
                </div>
                <div className="bg-white border border-slate-150 font-sans text-slate-500 py-3 px-4 rounded-xl rounded-tl-none text-[11px] flex items-center gap-1.5 shadow-3xs">
                  <span className="w-2 h-2 bg-vp-blue rounded-full animate-bounce shrink-0" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-vp-blue rounded-full animate-bounce shrink-0" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-vp-blue rounded-full animate-bounce shrink-0" style={{ animationDelay: "300ms" }} />
                  <span className="text-[9px] font-mono ml-2 uppercase text-vp-blue font-extrabold tracking-wider">Akort ayarları süzülüyor...</span>
                </div>
              </div>
            )}

            {/* Local Error feedback */}
            {errorText && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-[11.5px] text-red-700 leading-normal font-sans shadow-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorText}</span>
              </div>
            )}

            <div />
          </div>

          {/* Suggested Fast Prompts Drawer */}
          <div className="bg-white border-t border-slate-150 p-2.5 shrink-0">
            <p className="text-[8.5px] font-mono leading-none tracking-wider text-vp-blue font-extrabold mb-2 uppercase text-left">
              Hızlı Soru Önerileri:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scroll-smooth custom-scrollbar-thin">
              {getFastPrompts().map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p.prompt)}
                  disabled={isLoading}
                  className="bg-slate-50 hover:bg-vp-ice text-slate-700 hover:text-vp-blue px-3 py-2 rounded-xl text-[10px] font-sans font-bold border border-slate-200 hover:border-vp-blueborder whitespace-nowrap transition-all select-none cursor-pointer"
                  id={`fast_prompt_btn_${i}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input container */}
          <div className="bg-white p-3 border-t border-slate-150 shrink-0 flex items-center gap-2">
            <button
              onClick={() => setShowConfirmClear(true)}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shrink-0 flex items-center justify-center cursor-pointer"
              title="Sohbet Geçmişini Temizleyin"
              id="clear_chat_inline_btn"
            >
              🧹
            </button>
            <input
              type="text"
              placeholder={
                activeMode === "musti" ? "Mustafabank desteği iste..." :
                activeMode === "kpss" ? "Tarih-coğrafya ezber hapı..." :
                activeMode === "pt" ? "Bacak seansından kaç..." : "Komagene siparişi hazırla..."
              }
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-220 rounded-xl py-2.5 px-4 text-xs text-slate-800 placeholder-slate-400 focus:border-vp-blue outline-none transition-colors font-bold"
              id="chat_input_text"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputVal.trim()}
              className={`p-2.5 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center cursor-pointer ${
                inputVal.trim() && !isLoading
                  ? "bg-vp-blue hover:bg-opacity-90 text-white shadow-md border-b-2 border-r-2 border-slate-600"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              }`}
              id="send_chat_btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
