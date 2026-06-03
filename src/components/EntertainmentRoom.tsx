import React, { useState } from "react";
import { 
  Music, Gamepad2, Heart, Trophy, Star, Sparkles, Link, Headphones, PlayCircle
} from "lucide-react";

export default function EntertainmentRoom() {
  // Custom user Spotify playlist integration state
  const [spotifyInput, setSpotifyInput] = useState("");
  const [linkedPlaylistId, setLinkedPlaylistId] = useState(() => {
    const saved = localStorage.getItem("ilo_user_spotify_playlist_id");
    return saved || "1ASwAb6DrpJAS1uPMa17e6"; // fallback default romantic playlist
  });
  const [spotifySuccess, setSpotifySuccess] = useState(false);

  // It Takes Two chapter guide database with tips, stories, and actual YouTube gameplay guide embeds
  const itTakesTwoChapters = [
    {
      id: 1,
      title: "Bölüm 1: Elektrikli Süpürge ve Alet Kutusu 🔌🔨",
      story: "Musti panik yaptı ama İloş kafa atarak ilk boss olan dev süpürgeyi nakavt etti! ✊ Cody ve May olarak alet çantasından krizleri bir bir savuşturduğumuz o efsane başlangıç.",
      tip: "Cody (Musti) fırlattığı çivilerle platformları asılı tutmalı, May (İloş) çekiç kafasıyla podyum aslanı gibi havalanıp karşıya geçmeli!",
      youtubeEmbed: "https://www.youtube.com/embed/5T7uE7Y2F4Q", // vacuum boss guide
      vibe: "Sarı Vibe • Başlangıç"
    },
    {
      id: 2,
      title: "Bölüm 2: Ağaçtaki Karıncalar & Sincaplar 🌲🐜",
      story: "Çok heyecanlı bölümdü ama Musti yine koltukta sızıp REM uykusuna daldığı için kütüphane seansı yarım kaldı. Sincap ordusuna karşı inanılmaz bir savaş verdik İloşum!",
      tip: "Musti yanıcı sarı reçine fırlatmada ustalaşmalı, İloş ise kibrit tüfeğiyle tam isabetle reçineleri patlatmalı!",
      youtubeEmbed: "https://www.youtube.com/embed/BofTClgX34I", // tree chapter fight
      vibe: "Yeşil Vibe • Orman Savunması"
    },
    {
      id: 3,
      title: "Bölüm 3: Sihirli Gül & Oyuncak Kaleler 🏰🧸",
      story: "İloş bir gecede oyuna bağımlı oldu, sabaha kadar kütüphane masasında 'beynim yandı yetoo!' feryatları koptu. Oyuncak şatodaki dinozorlarla kapıştığımız, beynimizi eriten şahane anlar.",
      tip: "Dinozor binme seansında zamanlamayı iyi ayarlayın! Cody bitkiye dönüşüp May'i yukarı fırlatırken, May su fışkırtıp yolu temizlemeli.",
      youtubeEmbed: "https://www.youtube.com/embed/gbeoW8C6pG0", // rose & toy room
      vibe: "Mor Vibe • Şato Rüyaları"
    },
    {
      id: 4,
      title: "Bölüm 4: Saat Kulesi & Zamanın Efendisi ⏳⏰",
      story: "Musti 'Relax İloş, panik yapma!' diye telkin verirken kollarımıza kramp girdi. Zamanı ileri ve geri bükerek zorlu mekanizmalardan kurtulduğumuz o sabır testi.",
      tip: "İloş kendi kopyalarını yaratarak tuzakları aktif ederken, Musti zamanı ileri-geri sarıp ezilen köprüleri restore etmeli!",
      youtubeEmbed: "https://www.youtube.com/embed/1vRzTzLgqps", // clock tower walkthrough
      vibe: "Mavi Vibe • Zaman Bükme"
    },
    {
      id: 5,
      title: "Bölüm 5: Müzik Odası, Dans & Mutlu Son 🎶🎤",
      story: "Bayram Seansı kararı alındı: Musti PS5'i kucaklayıp kütüphanedeki yerini alacak, dondurulmuş çilekler, waffle dilimleri ve pürüzsüz hırkalar hazır! Ritmin zirvesine vuracağımız final sahnesi.",
      tip: "May parlayan asasıyla bulutları kendine çekerek sahne yapmalı, Cody mikrofonuyla ses dalgaları yollayıp ritme yön vermeli İloşum!",
      youtubeEmbed: "https://www.youtube.com/embed/Hka2W868S6o", // concert finale guide
      vibe: "Kırmızı Vibe • Büyük Konser"
    }
  ];

  const [activeChapterId, setActiveChapterId] = useState(1);

  // Spotify custom playlist binder parser
  const handleBindSpotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyInput.trim()) return;

    let parsedId = spotifyInput;
    if (spotifyInput.includes("playlist/")) {
      const parts = spotifyInput.split("playlist/");
      if (parts[1]) {
        parsedId = parts[1].split("?")[0].trim();
      }
    } else if (spotifyInput.includes("embed/playlist/")) {
      const parts = spotifyInput.split("embed/playlist/");
      if (parts[1]) {
        parsedId = parts[1].split("?")[0].trim();
      }
    }

    setLinkedPlaylistId(parsedId);
    localStorage.setItem("ilo_user_spotify_playlist_id", parsedId);
    setSpotifyInput("");
    setSpotifySuccess(true);
    setTimeout(() => setSpotifySuccess(false), 2500);
  };

  const curatedPlaylists = [
    {
      id: "1ASwAb6DrpJAS1uPMa17e6",
      name: "Musti'den İlahi Sinerji 💖",
      tag: "ROMANTİK & AKORTLU",
      desc: "Seyahatler, kütüphane molaları ve başbaşa neşeli dakikalar için Musti'nin akort ettiği asıl aşiret sinerjisi ezgileri."
    }
  ];

  return (
    <div className="space-y-6" id="entertainment_room_component">
      
      {/* SECTION BANNER 1: MUSIC STATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Curated Spotify Playlist Center (6 cols) */}
        <div className="lg:col-span-6 bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[480px]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="text-vp-blue w-5 h-5 shrink-0 animate-bounce" />
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight font-display">
                  Samsun Spotify İstasyonu 🎵
                </h4>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-black border border-emerald-250 px-2.5 py-0.5 rounded-full uppercase">
                Aktif Akortlandı
              </span>
            </div>
            
            <p className="text-[10px] text-slate-500 font-sans font-semibold mb-4">
              Seyahatlerde, kütüphane sabahlamalarında ve sahil gezintilerinde favori tematik listeni tek tıkla yükle İloşum!
            </p>

            {/* Grid of presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="tematik_playlists_grid">
              {curatedPlaylists.map((p) => {
                const isSelected = linkedPlaylistId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setLinkedPlaylistId(p.id);
                      localStorage.setItem("ilo_user_spotify_playlist_id", p.id);
                    }}
                    className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-[115px] group ${
                      isSelected 
                        ? "bg-sky-50 border-vp-blue shadow-inner" 
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[8px] font-mono font-black px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-vp-blue text-white" : "bg-slate-205 text-slate-600"
                        }`}>
                          {p.tag}
                        </span>
                        {isSelected && <span className="text-xs animate-pulse">🟢</span>}
                      </div>
                      <h5 className="text-[11px] font-black font-sans text-slate-800 tracking-tight line-clamp-1 group-hover:text-vp-blue transition-colors">
                        {p.name}
                      </h5>
                    </div>
                    <p className="text-[9px] text-slate-500 leading-normal font-sans font-semibold line-clamp-2 mt-1">
                      {p.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-vp-blue font-sans font-bold">
            <span>✨ Ruh haline en uygun sinerjiye tıkla</span>
            <span>Musti Mutfak Hizmetleri 🍳</span>
          </div>
        </div>

        {/* Right Column: Embedded Spotify Preview & Custom Binder Form (6 cols) */}
        <div className="lg:col-span-6 bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[480px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Music className="text-vp-blue w-5 h-5 shrink-0 animate-pulse" />
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight font-display">
                Müzik Çalar & Akort Binder 🔗
              </h4>
            </div>

            {/* Spotify Player Iframe Frame container */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden h-[480px] border border-slate-800 shadow-lg relative flex items-center justify-center">
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${linkedPlaylistId}`} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={false} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Real Spotify Player"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-105 space-y-3">
            {/* Playlist Binder Form */}
            <form onSubmit={handleBindSpotify} className="space-y-1.5">
              <label className="text-[9px] font-mono leading-none tracking-wider text-vp-blue font-extrabold uppercase block">
                Özel Spotify Çalma Listenin Bağlantısını Ekle:
              </label>
              
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    placeholder="https://open.spotify.com/playlist/37i9... yapıştırın"
                    value={spotifyInput}
                    onChange={(e) => setSpotifyInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-vp-blue rounded-xl py-2 px-3 pl-8 text-[11px] text-slate-800 placeholder-slate-400 outline-none font-semibold transition-colors"
                    id="spotify_playlist_url_input"
                  />
                  <Link className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="bg-vp-blue hover:bg-sky-700 text-white font-extrabold text-3xs px-4 rounded-xl cursor-pointer transition-colors shrink-0 uppercase tracking-tight shadow-sm"
                  id="bind_custom_spotify_btn"
                >
                  Listeyi Bağla 🔗
                </button>
              </div>
            </form>

            {spotifySuccess && (
              <p className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-150 px-3 py-1.5 rounded-xl font-sans font-bold animate-fade-in text-center">
                🎉 Çalma listeniz başarıyla akort edilip kaydedildi! Saniyeler içinde yüklenecektir!
              </p>
            )}
          </div>
        </div>

      </div>

      {/* SECTION BANNER 2: IT TAKES TWO GAME PROGRESS ACADEMY */}
      <div className="bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl" id="it_takes_two_academy">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-3 border-b border-sky-100">
          <div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-vp-blue w-6 h-6 shrink-0 animate-pulse" />
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight font-display">
                It Takes Two Co-Op Birliktelik Akademisi 🎮👫
              </h4>
            </div>
            <p className="text-[10px] text-slate-505 font-mono uppercase tracking-wider mt-1">
              Bölümlerin detaylı sürükleyici anlatımları, Musti hap taktikleri ve canlı rehber videoları!
            </p>
          </div>

          {/* Chapters grid selection pills */}
          <div className="flex gap-1 overflow-x-auto pb-1 max-w-full custom-scrollbar-thin shrink-0">
            {itTakesTwoChapters.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setActiveChapterId(chap.id)}
                className={`px-3 py-1.5 rounded-xl text-3xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                  activeChapterId === chap.id
                    ? "bg-vp-blue border-vp-blueborder text-white shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                }`}
              >
                Bölüm {chap.id}
              </button>
            ))}
          </div>
        </div>

        {/* Level narrative showcase board */}
        {(() => {
          const chap = itTakesTwoChapters.find(c => c.id === activeChapterId)!;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4 animate-fade-in" key={chap.id}>
              
              {/* Story and Guidance Board Column */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="bg-slate-50 border border-slate-205 rounded-2xl p-4.5 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                    <h5 className="text-xs font-black text-slate-800 font-sans tracking-tight">{chap.title}</h5>
                    <span className="text-[8.5px] font-mono text-vp-blue font-black tracking-wider bg-sky-50 border px-2 py-0.5 rounded-md uppercase">
                      {chap.vibe}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed font-sans text-slate-700">
                    <p className="font-semibold">
                      🤩 <strong className="text-vp-blue">Bizim Hikayemiz:</strong> {chap.story}
                    </p>
                    
                    <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl flex items-start gap-2">
                      <span className="text-base leading-none select-none">💡</span>
                      <p className="text-[11px] text-amber-900 font-sans font-bold leading-relaxed">
                        <strong className="text-amber-950 font-extrabold">Musti & İloş Taktik Formülü:</strong> {chap.tip}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-purple-50/40 border border-purple-100 rounded-xl text-[10.5px] font-sans text-slate-600 font-semibold leading-relaxed">
                  📢 <strong className="text-purple-900 font-bold">Kütüphane Sonrası Notu:</strong> "İkimizin de bacak krampları, yorulan gözleri geride kalacak İloşum. Bu muhteşem hikayeyi tamamlayıp kupaları kaldırmak için sabırsızlanıyorum!"
                </div>

              </div>

              {/* YouTube Guide Video Embed Column */}
              <div className="lg:col-span-5 bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden h-[240px] shadow-lg relative flex flex-col justify-end">
                <iframe 
                  src={chap.youtubeEmbed} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen 
                  title={`Chapter ${chap.id} Gameplay Walkthrough Video`}
                  className="absolute inset-0"
                />
                
                {/* Floating helpful overlay tag to show its a guide */}
                <div className="bg-slate-900/80 backdrop-blur-3xs border-t border-slate-700 p-2 text-center text-[10px] font-mono text-slate-400 font-bold z-10 uppercase tracking-wider">
                  📖 BÖLÜM BOSS REHBER VİDEOSU 🎥
                </div>
              </div>

            </div>
          );
        })()}

      </div>

    </div>
  );
}
