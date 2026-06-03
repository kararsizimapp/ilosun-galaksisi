import React, { useState, useEffect } from "react";
import { 
  Play, Pause, RotateCcw, BookOpen, Map, CheckCircle2, 
  Trash2, TrendingUp, AlertCircle, Plus, Calendar, Smile, Pin, PlusSquare, ArrowRight, Sparkles, Check, HelpCircle, Edit3, Save, X, Search, Filter, Award, Archive, Flame
} from "lucide-react";
import { kpssQuestions, KPSSQuestion } from "../data/kpssQuestions";

interface StudyNote {
  id: string;
  text: string;
  color: string;
  tag: string;
  date: string;
}

interface KpssSolvedLog {
  id: string;
  date: string;
  subject: string;
  solvedCount: number;
  mood: string;
  note: string;
  isArchived?: boolean;
}

interface DailyKpssReport {
  id: string;
  dateStr: string;
  totalSolved: number;
  breakdown: Record<string, number>;
  mood: string;
  note: string;
}

export default function KPSSStudy() {
  // Comprehensive, actual and fully updated KPSS Courses curriculum with zero missing topics
  const kpssCourses: Record<string, string[]> = {
    "Tarih": [
      "İslamiyet Öncesi Türk Tarihi 🐴",
      "İlk Türk-İslam Devletleri ve Beylikleri 🕌",
      "Osmanlı Siyasi Tarihi (Kuruluş, Yükselme, Duraklama, Gerileme, Dağılma) ⚔️",
      "Osmanlı Kültür ve Medeniyeti (Saray, Ordu, Toprak, Hukuk, Sanat) 📜",
      "20. Yüzyıl Başlarında Osmanlı Devleti (Trablusgarp, Balkan, I. Dünya) 💥",
      "Kurtuluş Savaşı Hazırlık Dönemi (Genelgeler ve Kongreler) ✊",
      "I. TBMM Dönemi, Kararlar & Açılan İsyanlar 🏛️",
      "Kurtuluş Savaşı Muharebeler, Doğu-Güney-Batı Cepheleri & Antlaşmalar 🎖️",
      "Atatürk İlke ve İnkılapları (Siyasi, Toplumsal, Eğitim, Hukuk, Ekonomi) 🦁",
      "Atatürk Dönemi Türk Dış Politikası (Montrö, Hatay'ın Katılımı) 🌍",
      "Çağdaş Türk ve Dünya Tarihi (II. Dünya Savaşı, Soğuk Savaş, Küreselleşme) 🌎"
    ],
    "Coğrafya": [
      "Türkiye'nin Coğrafi Konumu, Jeopolitiği & Sınır Komşuları 🗺️",
      "Türkiye'nin Fiziki Özellikleri (Yerşekilleri, Dağlar, Ovalar, Platolar) 🏔️",
      "Türkiye'nin Akarsuları, Gölleri, Kıyı Tipleri & Doğal Afetler 🏞️",
      "Türkiye'nin İklim Yapısı, Sıcaklık, Yağış ve Bitki Örtüsü 🌲",
      "Türkiye'de Toprak Tipleri, Su Kaynakları, Ekoloji ve Dağılış 🪴",
      "Türkiye'de Nüfus ve Yerleşme (Yoğunluk, Dağılış, Göç Hareketleri) 👥",
      "Türkiye'de Tarım & Ürünlerin Bölgelere Göre Dağılımı 🌾",
      "Türkiye'de Hayvancılık (Arıcılık, Balıkçılık vb.) ve Ormancılık 🐑",
      "Türkiye'de Madenler, Metalikler, Bor Mineralleri ve Enerji Kaynakları 💎",
      "Türkiye'de Sanayi Sektörü ve Endüstriyel Tesislerin Dağılımı ⚙️",
      "Türkiye'de Ulaşım Ağı, Ticaret ve Doğal Turizm Potansiyeli 🏖️",
      "Türkiye'nin Bölgesel Kalkınma Projeleri (GAP, DAP, DOKAP, ZBK) 🏗"
    ],
    "Matematik": [
      "Temel Kavramlar, Sayı Kümeleri & Çözümleme Kuralları 🔢",
      "Bölme - Bölünebilme Kuralları, Asal Sayılar, EBOB-EKOK 🧩",
      "Rasyonel & Ondalık Sayılar 🍰",
      "Birinci Dereceden Denklemler & Basit Eşitsizlikler ⚖️",
      "Mutlak Değer Esasları 📐",
      "Üslü & Köklü Sayılar Serüveni ⚡",
      "Çarpanlara Ayırma & Özdeşlik Çözümleri 🧬",
      "Oran - Orantı Kuralları 📊",
      "Sayı - Kesir ve Yaş Problemleri 🍎",
      "İşçi - Havuz ve Zaman Problemleri ⏳",
      "Yüzde, Faiz, Kar ve Zarar Problemleri 📈",
      "Karışım ve Hız-Yolcu-Hareket Problemleri 🏎️",
      "Kümeler, Kartezyen Çarpım, Fonksiyonlar, İşlem 🌀",
      "Permütasyon, Kombinasyon, Binom Açılımı & Olasılık 🎲",
      "Sayısal Mantık, Grafik Okuma, Veri Analizi ve Tablo Yorumu ✨"
    ],
    "Türkçe": [
      "Sözcükte Anlam, Mecaz, Terim, Deyimler & Atasözleri ✍️",
      "Cümlede Anlam, Neden-Sonuç, Amaç-Sonuç, Anlatım Teknikleri 📝",
      "Ses Bilgice Uygulamaları (Uyumlar, Düşmeler, Türemeler) 🔊",
      "Yazım Kuralları (Büyük Harfler, de/ki/mi yazımı, Birleşikler) 📖",
      "Noktalama İşaretleri Detayları 📍",
      "Sözcükte Yapı, Kökler, Yapım ve Çekim Ekleri 🔤",
      "Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Edat, Bağlaç) 🔢",
      "Eylemler, Eylemsiler (Fiilimsiler) ve Fiilde Çatı Özellikleri 🌟",
      "Cümlenin Ögeleri Yapısı 📊",
      "Cümle Türleri Yapısı & Anlatım Bozuklukları Analizi 🙅‍♀️",
      "Paragrafta Yapı, Giriş/Gelişme/Sonuç & Akışı Bozan Cümle 📚",
      "Paragrafta Ana Düşünce, Yardımcı Düşünce ve Konu Yorumu 🎨"
    ],
    "Vatandaşlık": [
      "Hukukun Temel Kavramları, Hak & Fiil Ehliyeti ⚖️",
      "Türk Anayasa Tarihi & 1982 Anayasası Esasları 📜",
      "Temel Haklar, Ödevler & Kişi Hak ve Hürriyetleri 🛡️",
      "Yasama Organı (TBMM Seçimi, Görevleri & Yetkileri) 🏛️",
      "Yürütme Organı (Cumhurbaşkanı Seçimi, CB Kararnameleri & Kabine) 💼",
      "Yargı Organı (Yüksek Mahkemeler, Anayasa Mahkemesi, AYM, HSK) ⚖️",
      "İdare Hukuku Esasları, Merkezden Yönetim, Belediyeler & Valilikler 🏢",
      "Memur Hukuku Esasları (Ödevler, Cezalar, Memuriyete Giriş) 👩‍💼",
      "Güncel Uluslararası Gelişmeler & Önemli Bölgesel Teşkilatlar 🪐"
    ],
    "Sözel Mantık": [
      "Sıralama, Tablo Yapılandırma ve Koşul Eşleme Prensipleri 📐",
      "Öncül İlişkilendirme ve Mantıksal Çıkarım Çözümleri 🧮",
      "Gruplandırma ve Koşullu Değişken Analiz Bulmacaları 🧠"
    ]
  };

  const subjectOptions = [
    "Tarih", "Coğrafya", "Matematik", "Türkçe", "Vatandaşlık", "Sözel Mantık"
  ];

  const noteTags = [
    "Sınavda Çıkar 🔥", "Hap Bilgi 🧠", "Musti'den 💖", "Çok Önemli 🚨", "Genel 📝"
  ];

  const [activeCourseTab, setActiveCourseTab] = useState<string>("Tarih");
  const [corkboardSubject, setCorkboardSubject] = useState<string>("Tarih");
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<string>("Genel");
  const [customInputMins, setCustomInputMins] = useState<number>(25);

  // States for sticky notes with tag & date support
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem("kpss_sticky_notes");
    return saved ? JSON.parse(saved) : [
      { id: "note_1", text: "Tarihte İslamiyet Öncesi dönemlerde 'Kurultay' meclisidir, hükümdar asil eşine 'Hatun' denir! 👑", color: "bg-yellow-101", tag: "Çok Önemli 🚨", date: "2026-06-03" },
      { id: "note_2", text: "Coğrafyada Teke ve Taşeli platoları Akdeniz'dedir, kireçli karstik yapıdadır! 🏔️", color: "bg-emerald-100", tag: "Hap Bilgi 🧠", date: "2026-06-03" },
      { id: "note_3", text: "Samsun'daki kütüphane masasında çayını yudumlarken bu formülü yaz: V_ort = 2V1V2/(V1+V2) ☕", color: "bg-sky-100", tag: "Musti'den 💖", date: "2026-06-03" }
    ];
  });
  const [newNoteText, setNewNoteText] = useState<string>("");
  const [selectedNoteColor, setSelectedNoteColor] = useState<string>("bg-yellow-101");
  const [selectedNoteTag, setSelectedNoteTag] = useState<string>("Sınavda Çıkar 🔥");
  
  // Note Board filtering and searching
  const [noteSearch, setNoteSearch] = useState<string>("");
  const [noteFilterColor, setNoteFilterColor] = useState<string>("ALL");
  const [noteFilterTag, setNoteFilterTag] = useState<string>("ALL");

  // Inline Note Editing States
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState<string>("");
  const [editingNoteTag, setEditingNoteTag] = useState<string>("Genel 📝");

  const [topicsChecklist, setTopicsChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("kpss_topics_checklist");
    if (saved) return JSON.parse(saved);
    
    // Initialize default values to false
    const initial: Record<string, boolean> = {};
    Object.values(kpssCourses).forEach(topicList => {
      topicList.forEach(topic => {
        initial[topic] = false;
      });
    });
    return initial;
  });

  // Dynamic Note Kağıdı Index tracker
  const [noteSeed, setNoteSeed] = useState<number>(0);

  // Solved Questions Logs
  const [logs, setLogs] = useState<KpssSolvedLog[]>(() => {
    const saved = localStorage.getItem("kpss_question_logs_v2");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        date: "2026-06-03",
        subject: "Coğrafya",
        solvedCount: 45,
        mood: "Zirvedeyiz 🚀",
        note: "Karadeniz'deki dağlar ve kıyı tipleri sorularını sildim süpürdüm İloşum!"
      },
      {
        id: "2",
        date: "2026-06-02",
        subject: "Tarih",
        solvedCount: 60,
        mood: "Süper 🔥",
        note: "Osmanlı Kültür ve Medeniyeti testlerini çözdüm, neredeyse hiç yanlışım çıkmadı. Harikayım!"
      },
      {
        id: "3",
        date: "2026-06-01",
        subject: "Sözel Mantık",
        solvedCount: 20,
        mood: "Yorulduk 😴",
        note: "Sıralama sorularına baktım. Yavaş yavaş oturuyor."
      }
    ];
  });

  // Saved Daily Reports registry (for process reset & saving history)
  const [savedDailyReports, setSavedDailyReports] = useState<DailyKpssReport[]>(() => {
    const saved = localStorage.getItem("kpss_saved_daily_reports_v2");
    return saved ? JSON.parse(saved) : [];
  });

  // Interactive Quiz States (Enriched & Categorized)
  const [quizCategoryFilter, setQuizCategoryFilter] = useState<"ALL" | "Tarih" | "Coğrafya" | "Vatandaşlık" | "Türkçe" | "Matematik" | "Sözel Mantık">("ALL");
  const [activeQuestionsList, setActiveQuestionsList] = useState<import("../data/kpssQuestions").KPSSQuestion[]>([]);
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "C" | "D" | "E" | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isQuizLogSynced, setIsQuizLogSynced] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; wrong: number }>(() => {
    const saved = localStorage.getItem("kpss_quiz_score_save");
    return saved ? JSON.parse(saved) : { correct: 0, wrong: 0 };
  });

  // Custom alert/overlay flags
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showPomodoroFinished, setShowPomodoroFinished] = useState<boolean>(false);
  const [showArchiveSuccess, setShowArchiveSuccess] = useState<boolean>(false);

  // Dynamic lesson notes pool representing the automated "Kütüphane Not Kağıdı"
  const courseNotesPool: Record<string, string[]> = {
    "Tarih": [
      "🔥 I. İnönü Savaşı Sonuçları Şifresi: MİLAT\n👉 M: Moskova Antlaşması\n👉 İ: İstiklal Marşı'nın kabulü\n👉 L: Londra Konferansı\n👉 A: Afganistan Dostluk Antlaşması\n👉 T: Teşkilat-ı Esasiye Anayasası",
      "📜 Doğu Sınırımızı Belirleyen Antlaşmalar Şifresi: GAZİ\n👉 G: Gümrü\n👉 A: Moskova\n👉 Z: Kars Antlaşması\n💡 Kars Antlaşması ile Doğu sınırımız kesin çizilmiştir, unutma İloş!",
      "🏛️ Mustafa Kemal'in Kurmay Başkanı Olarak İlk Tarih Sahnesi:\n👉 1909 yılındaki Otuz Bir Mart Vakası (Hareket Ordusu).",
      "🦅 Kurtuluş Savaşı'nın Amacı, Gerekçesi ve Yöntemi:\n👉 Mücadele meşalesi Amasya Genelgesi'nde ilk kez belirtilmiştir. 'Milletin bağımsızlığını, yine milletin azim ve kararı kurtaracaktır.'",
      "🕌 Osmanlı'da Orhan Bey Dönemi Gelişmeleri:\n👉 Bursa fethedilip başkent yapıldı. Yaya ve Müsellem adında ilk düzenli ordu kuruldu.",
      "👑 Balkan Savaşları Sonrası Sınırlar:\n👉 Arnavutluk bağımsızlığını ilan eden son Balkan devletidir.",
      "🦁 Erzurum Kongresi'nin Kritik Kararı:\n👉 Toplanış yönüyle bölgesel, aldığı kararlar açısından millidir! Kararlarında ilk kez yeni bir hükümet kurulmasından bahsedildi."
    ],
    "Coğrafya": [
      "🏔️ Türkiye'nin Tektonik Gölleri Şifresi: BASİT\n👉 B: Beyşehir, Burdur\n👉 A: Acıgöl\n👉 S: Sapanca\n👉 İ: İznik\n👉 T: Tuz Gölü",
      "🗺️ Karstik Şekiller Sıralaması (Küçükten Büyüğe):\n👉 Lapya ➡️ Dolin ➡️ Uvala ➡️ Polye (En büyüğü Polye düzlüğüdür İloş!)",
      "🌲 Türkiye'de Orman Dağılım Sıralaması:\n👉 %25 ile Karadeniz birincidir! İkinci sırada Akdeniz bulunur. Samsun da bu yeşilin kalbidir!",
      "⛰️ Türkiye'deki Volkanik Dağlar Hatırlatmaları:\n👉 Nemrut, Süphan, Tendürek, Ağrı (Doğu Anadolu hattı) ve Karacadağ (En yayvan volkan dağı!)",
      "🌾 Mikroklima Tarım Mucizeleri:\n👉 Rize'de narenciye, Artvin'de zeytin yetişmesi rüzgar akortlarıyla ilgilidir!",
      "⚙️ Türkiye'de Bor Madeni Nerelerden Çıkar?\n👉 Balıkesir (Bigadiç), Kütahya (Emet), Eskişehir (Kırka). Dünyada birinciyiz!"
    ],
    "Matematik": [
      "⚡ Ortalama Hız Formülü Pratiği:\n👉 V_ort = Toplam Yol / Toplam Zaman.\n💡 Eğer gidiş hızı V1 ve dönüş V2 ise: V_ort = (2 * V1 * V2) / (V1 + V2)",
      "🍕 Rasyonel Sayılarda Pratik Çözüm:\n👉 Bir tam sayıdan kesir çıkarken payda ile tamı çarpıp payı çıkararak hızlıca payda üstüne yaz!",
      "⏳ İşçi-Havuz Problemi Temel Akor:\n👉 Bir işçi işi tek başına 'x' günde, diğeri 'y' günde tamamlıyorsa; ikisi birlikte: (1/x + 1/y) * t = 1 denkleminden çözülür.",
      "📊 Yüzde Kar-Zarar Pratiği:\n👉 Maliyete her zaman 100x diyerek başla İloş! %20 indirimli satış fiyatı 80x, %30 zamlısı 130x olur. Hayat kurtarır!",
      "🧬 Çarpanlara Ayırma Altın Formülü:\n👉 İki Kare Farkı: (a² - b²) = (a - b) * (a + b)\n👉 Tam Kare Açılımı: (a + b)² = a² + 2ab + b²"
    ],
    "Türkçe": [
      "📖 Yazım Kuralları: Bağlaç Olan 'de/da' nerede?\n👉 Cümleden çıkardığında anlam bozulmuyorsa bağlaçtır ve ayrı yazılır! Anlam daralıyorsa ek olan 'de/da'dır ve bitişik yazılır de gitsin!",
      "📍 Noktalama İşaretleri:\n👉 Soru ekinden sonra veya tamlamalar arasında asla virgül (,) gelmez İloş! Dilbilgisi netlerin Atakum sahilinde uçuşacak!",
      "🗣️ Ünsüz Yumuşaması İstisnaları:\n👉 Tek heceli kelimelerin çoğunda yumuşama olmaz (Örn: Süt ➡️ Sütü, Kart ➡️ Kartı). Yabancı kökenli kelimelerde de olmaz (Hukuk ➡️ Hukuku).",
      "✍️ Yardımcı Eylemler Birleşik Fiiller:\n👉 Etmek, olmak fiillerinde ses düşmesi veya türemesi varsa bitişik yazılır (Örn: Kaybolmak, Hissetmek). Ses olayı yoksa ayrı yazılır (Örn: Teşekkür etmek)."
    ],
    "Vatandaşlık": [
      "⚖️ Normlar Hiyerarşisi Sıralaması (Tepeden Aşağı):\n👉 Anayasa ➡️ Kanun / Milletlerarası Antlaşma / CB Kararnamesi ➡️ Yönetmelik ➡️ Genelge.",
      "🏛️ Yasama Yetkisinin TBMM'ye Ait Olması:\n👉 TBMM üye tamsayısı 600'dür. Karar yeter sayısı üye tamsayısının salt çoğunluğunu geçemez.",
      "🛡️ Temel Hak ve Hürriyetlerin Sınırlandırılması:\n👉 Yalnızca KANUNLA ve sadece Anayasa'nın ilgili maddelerinde belirtilen özel sebeplerle sınırlanabilir.",
      "💼 Yürütme Görevi Kimdedir?\n👉 Cumhurbaşkanına aittir. Cumhurbaşkanı seçilme yaşı 40'tır, yükseköğrenim mezuniyeti şarttır İloş!"
    ],
    "Sözel Mantık": [
      "🧮 Sözel Mantık Bulmaca Stratejisi:\n👉 Değişkeni az olan unsurları her zaman tablonun sabit satırları veya sütunları yap! Diğer değişkenleri öncüllere göre yerleştir.",
      "📐 Sıralama Soruları Altın Kuralı:\n👉 Öndekiler ve arkadakiler için dikey veya yatay yön çizgileri çiz. 'Kesinleşen' bilgileri tabloya kilitle, ihtimalleri parantez içinde yaz."
    ]
  };

  const [activeCourseNote, setActiveCourseNote] = useState("");

  // Automatically switch notes when corkboard subject changes or seed changes
  useEffect(() => {
    const list = courseNotesPool[corkboardSubject] || courseNotesPool["Tarih"];
    const randomIndex = Math.floor(Math.random() * list.length);
    setActiveCourseNote(list[randomIndex]);
  }, [corkboardSubject, noteSeed]);

  const [formSubject, setFormSubject] = useState<string>("Tarih");
  const [formSolved, setFormSolved] = useState<number>(30);
  const [formMood, setFormMood] = useState<string>("Zirvedeyiz 🚀");
  const [formNote, setFormNote] = useState<string>("");
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // Persist states
  useEffect(() => {
    localStorage.setItem("kpss_topics_checklist", JSON.stringify(topicsChecklist));
  }, [topicsChecklist]);

  useEffect(() => {
    localStorage.setItem("kpss_question_logs_v2", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("kpss_sticky_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("kpss_quiz_score_save", JSON.stringify(quizScore));
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem("kpss_saved_daily_reports_v2", JSON.stringify(savedDailyReports));
  }, [savedDailyReports]);

  // Synchronize dynamic categorized shuffling for quiz questions
  useEffect(() => {
    const filtered = quizCategoryFilter === "ALL" 
      ? kpssQuestions 
      : kpssQuestions.filter(q => q.category === quizCategoryFilter);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setActiveQuestionsList(shuffled);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsQuizLogSynced(false);
  }, [quizCategoryFilter]);

  const handleNewTest = () => {
    const filtered = quizCategoryFilter === "ALL" 
      ? kpssQuestions 
      : kpssQuestions.filter(q => q.category === quizCategoryFilter);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setActiveQuestionsList(shuffled);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsQuizLogSynced(false);
  };

  // Pomodoro timer logic
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            setShowPomodoroFinished(true);
            resetTimer();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(customInputMins);
    setSeconds(0);
  };

  const handleCustomMinuteSubmit = (mins: number) => {
    const val = Math.max(1, Math.min(180, mins));
    setCustomInputMins(val);
    setMinutes(val);
    setSeconds(0);
    setIsActive(false);
  };

  const handleTimerTypeChange = (type: string) => {
    setTimerType(type);
    setIsActive(false);
    setSeconds(0);
    let defaultMins = 25;
    if (type === "Matematik") defaultMins = 40;
    else if (type === "Türkçe") defaultMins = 30;
    else if (type === "Sözel Mantık") defaultMins = 20;
    setCustomInputMins(defaultMins);
    setMinutes(defaultMins);
  };

  const toggleTopic = (topicName: string) => {
    setTopicsChecklist(prev => ({ ...prev, [topicName]: !prev[topicName] }));
  };

  const getCourseProgress = (courseName: string) => {
    const topics = kpssCourses[courseName] || [];
    if (topics.length === 0) return 0;
    const completed = topics.filter(t => topicsChecklist[t]).length;
    return Math.round((completed / topics.length) * 100);
  };

  const getOverallProgress = () => {
    let totalTopics = 0;
    let completedTopics = 0;
    Object.values(kpssCourses).forEach(list => {
      totalTopics += list.length;
      list.forEach(t => {
        if (topicsChecklist[t]) completedTopics++;
      });
    });
    return Math.round((completedTopics / totalTopics) * 100);
  };

  // Add solved question entry manually
  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSolved <= 0) return;

    const newLog: KpssSolvedLog = {
      id: Date.now().toString(),
      date: formDate || new Date().toISOString().split("T")[0],
      subject: formSubject,
      solvedCount: Number(formSolved),
      mood: formMood,
      note: formNote || "Memurluğa doğru emin adımlarla!"
    };

    setLogs([newLog, ...logs]);
    setFormNote("");
    setFormSolved(30);
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  // Archive Day & Reset report logic
  const handleArchiveDayReport = () => {
    const todayLogs = getFilteredLogs();
    
    // Create detailed breakdown mapping of solved numbers today
    const breakdown: Record<string, number> = {};
    subjectOptions.forEach(subj => {
      breakdown[subj] = getFilteredSubjectTotal(subj);
    });

    const sumToday = todayLogs.reduce((sum, curr) => sum + curr.solvedCount, 0);
    
    // Calculate dominating mood of today
    const moodCounts: Record<string, number> = {};
    todayLogs.forEach(l => {
      moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1;
    });
    let bestMood = "Süper 🔥";
    let max = 0;
    Object.entries(moodCounts).forEach(([m, count]) => {
      if (count > max) {
        max = count;
        bestMood = m;
      }
    });

    const mergedNotes = todayLogs.map(l => `${l.subject}: ${l.note}`).join(" | ") || "KPSS Çalışma maratonu tamamlandı!";
    const formattedDate = new Date().toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const newReport: DailyKpssReport = {
      id: "report_" + Date.now(),
      dateStr: formattedDate,
      totalSolved: sumToday,
      breakdown,
      mood: bestMood,
      note: mergedNotes
    };

    // Save report in history registry
    setSavedDailyReports([newReport, ...savedDailyReports]);

    // "Sıfırlama" - flag all active logs of today as isArchived: true
    // This preserves their lifetime counts and bottom historical tables,
    // but resets the Active Process Reporting to 0!
    const todayStr = new Date().toISOString().split("T")[0];
    const updatedLogs = logs.map(l => {
      if (l.date === todayStr) {
        return { ...l, isArchived: true };
      }
      return l;
    });

    setLogs(updatedLogs);
    setShowArchiveSuccess(true);
  };

  // Delete an archived daily report
  const deleteArchivedReport = (id: string) => {
    setSavedDailyReports(savedDailyReports.filter(r => r.id !== id));
  };

  // Add custom library note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: StudyNote = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      color: selectedNoteColor,
      tag: selectedNoteTag,
      date: new Date().toISOString().split("T")[0]
    };

    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  // Sticky Note deletion
  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Inline Note Editing methods
  const startEditNote = (note: StudyNote) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
    setEditingNoteTag(note.tag);
  };

  const saveEditNote = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text: editingNoteText, tag: editingNoteTag } : n));
    setEditingNoteId(null);
  };

  // Tip generator
  const getTeacherTip = () => {
    switch(timerType) {
      case "Tarih":
        return "Tarihin efsane hocaları fısıldıyor: 'İloş Hanım, Osmanlı taht kavgalarını ve ıslahatları kafaya kazıyacağız, bizzat vezir-i azam gelse karşımızda saygıyla eğilecek! Sakince, derin nefes alarak odaklan.'";
      case "Coğrafya":
        return "Musti'nin elceğizleriyle bastırıp kargo ettiği o haritalar yalan söylemez! Platolar, ovalar ve körfezler senden sorulur. Sınav gününü değil, Atakum sahilindeki dondurma kutlamasını hayal et!";
      case "Matematik":
        return "Sayılarda veya problemlerde canın sıkıldığında, kağıda küçük bir erik çizip sakinleş! 10 problem çözmek bile zihninde dondurulmuş çilek tadında kıvılcımlar oluşturur.";
      case "Türkçe":
        return "Dil bilgisinde de/ki bağlacını ve noktalama işaretlerini hallettin mi, paragraf adeta Atakum'da yürüyüş yapmak kadar akıcı hale gelecek. O pürüzsüz netler yakındır!";
      case "Vatandaşlık":
        return "Hukukun temel normları ve 82 Anayasası seni korkutmasın. Sen her halinle asil bir bürokratsın! Kurum binalarının havası şimdiden değişmeye başladı bile.";
      case "Sözel Mantık":
        return "Sözel mantığın o karmaşık tabloları adeta bir yapbozdur. Acele etme, sakin adımlarla satırları ve sütunları çiz, bulmaca gibi çözülecek.";
      default:
        return "Sevgi zırhı ve bizzat Musti'nin akort ettiği dualar seninle. Sen bu ülkenin en tatlı, en çalışkan memur adayı olacaksın!";
    }
  };

  // Period filter for today's logs (excludes archived items to reflect end-of-day reset)
  const getFilteredLogs = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    return logs.filter(log => log.date === todayStr && !log.isArchived);
  };

  const filteredLogs = getFilteredLogs();
  const totalSolvedInPeriod = filteredLogs.reduce((sum, curr) => sum + curr.solvedCount, 0);

  // Today's solved count per category
  const getFilteredSubjectTotal = (subj: string) => {
    return filteredLogs.filter(l => l.subject === subj).reduce((sum, curr) => sum + curr.solvedCount, 0);
  };

  // Lifetime solved count per category
  const getSubjectSolvedTotal = (subj: string) => {
    return logs.filter(l => l.subject === subj).reduce((sum, curr) => sum + curr.solvedCount, 0);
  };

  const totalSolvedOverall = logs.reduce((sum, curr) => sum + curr.solvedCount, 0);

  const resetAllLogs = () => {
    setShowResetConfirm(true);
  };

  const confirmResetAction = () => {
    setLogs([]);
    setSavedDailyReports([]);
    localStorage.removeItem("kpss_question_logs_v2");
    localStorage.removeItem("kpss_saved_daily_reports_v2");
    setShowResetConfirm(false);
  };

  // Safe bounded current question
  const currentQuizItem = activeQuestionsList[quizIdx] || activeQuestionsList[0] || kpssQuestions[0];

  // Helper to determine KPSS competency level based on correct quiz questions
  const getKpssUserLevel = () => {
    const correct = quizScore.correct;
    if (correct < 5) return { name: "🥚 Çaylak Memur", color: "text-amber-600 bg-amber-50 border-amber-200", max: 5 };
    if (correct < 10) return { name: "📚 Kütüphane Sakini", color: "text-sky-600 bg-sky-50 border-sky-200", max: 10 };
    if (correct < 15) return { name: "⚡ Mülakat Fatihi", color: "text-emerald-600 bg-emerald-50 border-emerald-205", max: 15 };
    return { name: "👑 Asil Bürokrat", color: "text-purple-600 bg-purple-50 border-purple-200", max: 30 };
  };

  const currentLevel = getKpssUserLevel();

  // Sticky Notes filtering selection
  const getFilteredStickyNotes = () => {
    return notes.filter(n => {
      const matchSearch = n.text.toLowerCase().includes(noteSearch.toLowerCase());
      const matchColor = noteFilterColor === "ALL" || n.color === noteFilterColor;
      const matchTag = noteFilterTag === "ALL" || n.tag === noteFilterTag;
      return matchSearch && matchColor && matchTag;
    });
  };

  const visibleStickyNotes = getFilteredStickyNotes();

  return (
    <div className="space-y-6" id="kpss_studyspace_mega">
      
      {/* Top Welcome Stat Section */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-5 h-5 text-vp-green animate-pulse" />
              <span className="text-xs font-mono font-black text-vp-forest uppercase tracking-wider">İloş'un Akademik KPSS Karargahı</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-vp-forest font-display flex items-center gap-1.5 md:gap-2 flex-wrap">
              <span>Hedefe Adım Adım: KPSS Memurluk Yolculuğu</span>
              <img src="https://flagcdn.com/w40/tr.png" className="w-5.5 h-4 inline-block object-cover rounded shadow-sm shrink-0" alt="TR" />
              <span>👩‍💼</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5 font-medium max-w-2xl">
              Musti'nin duaları, kütüphane çayları ve akortlu takviyeleriyle donatılmış; tüm KPSS müfredat konularını, günlük çözdüğün soru sayılarını ve mola notlarını tek elden yönettiğin yeni özel alanın.
            </p>
          </div>

          <div className="bg-vp-greenbg border-2 border-vp-greenborder p-4 rounded-2xl text-center min-w-[200px] shadow-inner shrink-0">
            <span className="text-[10px] font-mono text-vp-forest font-extrabold tracking-widest uppercase">MÜFREDAT TAMAMLAMA ORANI</span>
            <div className="text-x3 text-3xl font-mono font-black text-vp-forest mt-1">
              %{getOverallProgress()}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-vp-green h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Pomodoro & Curriculum MAP */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Pomodoro Station */}
          <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <BookOpen className="text-vp-green w-6 h-6 shrink-0" />
                <div>
                  <h3 className="text-md font-black text-vp-forest font-display">
                    Özelleştirilebilir Pomodoro İstasyonu ⏱️
                  </h3>
                  <p className="text-xs text-slate-505 font-medium font-sans">
                    Dakikayı kendin belirle, dersini seç ve derin odaklanmaya başla.
                  </p>
                </div>
              </div>

              {/* Minute Custom Set Button Input */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl w-full md:w-auto">
                <span className="text-[10px] font-mono font-bold text-slate-500">SÜRE (DK):</span>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customInputMins}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomInputMins(val);
                    if (!isActive) {
                      setMinutes(val);
                      setSeconds(0);
                    }
                  }}
                  className="w-12 bg-white border border-slate-250 rounded-lg py-0.5 px-1.5 text-xs text-center font-black text-vp-forest outline-none focus:border-vp-green"
                />
                <button
                  type="button"
                  onClick={() => handleCustomMinuteSubmit(customInputMins)}
                  className="bg-vp-green hover:bg-opacity-90 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all"
                >
                  Ayarla
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Preset buttons selection with Dynamic Question Counter */}
              <div className="md:col-span-4 space-y-2">
                <span className="block text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                  BRANŞ ODALARI ({totalSolvedOverall} SORU ÇÖZÜLDÜ)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {subjectOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTimerTypeChange(type)}
                      className={`py-2 px-1 text-3xs md:text-2xs rounded-xl font-extrabold transition-all cursor-pointer border flex flex-col items-center justify-center ${
                        timerType === type 
                          ? "bg-vp-green text-white shadow-md border-vp-greenborder" 
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate w-full pr-0.5 text-center">{type}</span>
                      <span className={`text-[8px] font-mono opacity-80 ${timerType === type ? "text-emerald-100" : "text-emerald-600"}`}>
                        {getSubjectSolvedTotal(type)} Soru
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Clock */}
              <div className="md:col-span-4 bg-gradient-to-tr from-vp-greenbg to-white border-2 border-vp-greenborder rounded-[2rem] py-6 px-4 text-center shadow-inner relative flex flex-col items-center justify-center">
                <div className="text-4xl font-mono tracking-wider font-black text-vp-forest">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-vp-green font-mono uppercase tracking-widest font-black mt-1">
                  Odak Seansı • {timerType}
                </div>

                <div className="flex gap-2.5 mt-4">
                  <button
                    onClick={toggleTimer}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-2xs font-extrabold transition-all shadow-md cursor-pointer ${
                      isActive 
                        ? "bg-orange-500 hover:bg-orange-600 text-white" 
                        : "bg-vp-green hover:bg-vp-green/90 text-white"
                    }`}
                  >
                    {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isActive ? "Durdur" : "Başlat"}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-2xs font-extrabold transition-all border border-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Sıfırla
                  </button>
                </div>
              </div>

              {/* Motivational advice */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[140px] flex flex-col justify-center">
                <div className="flex items-start gap-2.5">
                  <Smile className="w-4 h-4 text-vp-green shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <h5 className="text-[10px] font-mono text-vp-forest font-black uppercase tracking-wider mb-1">
                      {timerType} Odak Önerisi
                    </h5>
                    <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-medium italic">
                      "{getTeacherTip()}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPSS Topic Checklist Board */}
          <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Map className="text-vp-green w-5 h-5 shrink-0" />
                <div>
                  <h3 className="text-md font-black text-vp-forest font-display">
                    KPSS Ders Konu Başlıkları & Tamamlama Haritası 🗺️
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-medium">
                    Müfredat konularını işaretle, derslerde çözdüğün toplam soru sayılarını anlık takip et!
                  </p>
                </div>
              </div>
            </div>

            {/* Subject Tabs with total resolved question metrics */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scroll-smooth custom-scrollbar-thin">
              {Object.keys(kpssCourses).map((course) => {
                const completion = getCourseProgress(course);
                const overallSolvedForCourse = getSubjectSolvedTotal(course);
                return (
                  <button
                    key={course}
                    onClick={() => setActiveCourseTab(course)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2.5 whitespace-nowrap border cursor-pointer ${
                      activeCourseTab === course
                        ? "bg-vp-greenbg border-vp-greenborder text-vp-forest shadow-sm"
                        : "bg-slate-50 border-slate-205 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    <span>{course}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white border border-slate-250 text-slate-500">
                      %{completion}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-850 font-bold">
                       {overallSolvedForCourse} Soru
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Course checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
              {kpssCourses[activeCourseTab].map((topic) => {
                const isSelected = topicsChecklist[topic] || false;
                return (
                  <div
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-vp-greenbg border-vp-greenborder text-vp-forest font-black"
                        : "bg-slate-50/50 border-slate-150 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-sans leading-tight pr-3 font-medium">{topic}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                      isSelected ? "bg-vp-green border-vp-green text-white" : "border-slate-300 bg-white text-transparent"
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full">
                <div className="flex justify-between items-center text-xs font-mono font-extrabold text-vp-forest mb-1.5">
                  <span className="uppercase">{activeCourseTab} TAMAMLAMA SEVİYESİ</span>
                  <span>%{getCourseProgress(activeCourseTab)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-vp-green h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${getCourseProgress(activeCourseTab)}%` }}
                  />
                </div>
              </div>
              <p className="text-2xs text-vp-forest font-mono tracking-wide italic text-center md:text-right shrink-0">
                🚀 Toplamda {getSubjectSolvedTotal(activeCourseTab)} adet {activeCourseTab} sorusu çözüldü!
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MANUEL SAYAC & SÜREÇ RAPORLAMA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Defter & Sayaç Input Form */}
          <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-slate-100">
                <TrendingUp className="text-vp-green w-5 h-5 shrink-0" />
                <div>
                  <h3 className="text-md font-black text-vp-forest font-display">
                    KPSS Soru Sayacı Defteri 📝
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans font-medium">
                    Çözdüğün soru sayılarını anlık kaydet, günlüğü oluştur.
                  </p>
                </div>
              </div>

              <form onSubmit={addLog} className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-2xl mt-2">
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono leading-none font-black text-vp-forest uppercase mb-1">DERS</label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl py-1.5 px-2 text-xs text-slate-800 font-bold focus:border-vp-green outline-none"
                    >
                      {subjectOptions.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono leading-none font-black text-vp-forest uppercase mb-1">TARİH</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl py-1 px-2 text-xs text-slate-800 font-bold focus:border-vp-green outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono leading-none font-black text-vp-forest uppercase mb-1">SORU ADEDİ</label>
                    <input
                      type="number"
                      min="1"
                      value={formSolved}
                      onChange={(e) => setFormSolved(Number(e.target.value))}
                      className="w-full bg-white border border-slate-250 rounded-xl py-1 px-2.5 text-xs text-slate-800 font-black text-center focus:border-vp-green outline-none"
                    />
                  </div>
                   <div>
                    <label className="block text-[10px] font-mono leading-none font-black text-vp-forest uppercase mb-1">MODUMUZ</label>
                    <select
                      value={formMood}
                      onChange={(e) => setFormMood(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl py-1.5 px-2 text-xs text-slate-800 focus:border-vp-green outline-none font-bold"
                    >
                      <option value="Zirvedeyiz 🚀">Zirvedeyiz 🚀</option>
                      <option value="Süper 🔥">Süper 🔥</option>
                      <option value="Yorulduk 😴">Yorulduk 😴</option>
                      <option value="Sinir Tepede 😡">Sinir Tepede 😡</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono leading-none font-black text-vp-forest uppercase mb-1">GÜNÜN NOTU</label>
                  <input
                    type="text"
                    placeholder="Bölünebilme pratikleri yapıldı!"
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-xl py-1.5 px-2 text-xs text-slate-800 placeholder-slate-450 focus:border-vp-green outline-none font-medium"
                  />
                </div>

                <div className="flex gap-2 mt-1.5">
                  <button
                    type="submit"
                    className="flex-1 bg-vp-green hover:bg-opacity-90 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Deftere Ekle
                  </button>
                  <button
                    type="button"
                    onClick={resetAllLogs}
                    className="bg-red-55 hover:bg-red-100 border border-red-200 text-red-650 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Sıfırla"
                  >
                    <Trash2 className="w-4 h-4" /> Temizle
                  </button>
                </div>
              </form>
            </div>

            {/* UPGRADED: Süreç Raporlama card with Today AND Lifetime counts nested under each name */}
            <div className="bg-vp-greenbg border-4 border-vp-greenborder rounded-3xl p-5 mt-4 shadow-inner relative">
              <div className="flex flex-col gap-2">
                
                <div className="flex justify-between items-center pb-2 border-b border-vp-greenborder/20">
                  <span className="text-[10px] font-mono font-black text-vp-forest uppercase flex items-center gap-1">
                    <Archive className="w-3.5 h-3.5" /> Süreç Raporlama (Günlük)
                  </span>
                  <span className="text-[8.5px] font-mono font-black bg-white/70 px-2.5 py-0.5 rounded-md border border-slate-205 text-slate-700">
                    Sıfırlanabilir
                  </span>
                </div>

                <div className="bg-white/80 p-3 rounded-2xl border border-vp-greenborder/10 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-mono text-slate-500 font-bold leading-none uppercase mb-1">BUGÜN ÇÖZÜLEN:</p>
                    <p className="text-lg font-mono font-black text-vp-forest">{totalSolvedInPeriod} Soru</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-mono text-slate-500 font-bold leading-none uppercase mb-1">GENEL TOPLAM:</p>
                    <p className="text-sm font-mono font-black text-slate-700 bg-slate-105 border border-slate-200 rounded-lg px-2 py-0.5 inline-block">
                      {totalSolvedOverall} Soru
                    </p>
                  </div>
                </div>

                {/* Grid for each subject: showing TODAY's solved / TOTAL solved counts! */}
                <div className="space-y-1.5 mt-2">
                  <div className="block text-[8.5px] font-mono font-black text-vp-forest/75 uppercase tracking-wide">
                     📖 DERS BAZLI GÜNLÜK VE TOPLAM DEĞERLER (Bugün / Toplam):
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {subjectOptions.map((subj) => {
                      const todayCount = getFilteredSubjectTotal(subj);
                      const totalCount = getSubjectSolvedTotal(subj);
                      return (
                        <div key={subj} className="bg-white p-2.5 border border-slate-200/60 rounded-xl shadow-xs flex flex-col justify-between">
                          <p className="text-[10px] font-sans font-black text-slate-700">{subj}</p>
                          <div className="flex items-baseline justify-between mt-1">
                            <span className="text-xs font-mono font-black text-vp-forest" title="Bugün Çözülen">
                              {todayCount}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">/</span>
                            <span className="text-[10px] font-mono font-bold text-slate-500" title="Genel Toplam">
                              {totalCount} Toplam
                            </span>
                          </div>
                          {/* Small visual bar indicator */}
                          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
                            <div 
                              className="bg-vp-green h-1 rounded-full"
                              style={{ width: `${Math.min(100, totalCount > 0 ? (todayCount / totalCount) * 100 : 0)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive End of Day reset & Archive button */}
                <div className="mt-3.5 pt-3.5 border-t border-vp-greenborder/20">
                  <button
                    type="button"
                    onClick={handleArchiveDayReport}
                    className="w-full bg-vp-forest hover:bg-opacity-95 text-white py-2.5 px-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Günü mühürle, bugünün skorunu arşive kaydet ve bugünkü sayacı sıfırla!"
                  >
                    <Save className="w-4 h-4 animate-pulse text-amber-300" />
                    Günü Bitir & Raporu Arşivle! 🌅
                  </button>
                  <p className="text-[8.5px] text-slate-500 font-sans font-medium text-center mt-1.5">
                    * Bu butona bastığında bugünün sayacı 0'a sıfırlanır, döküm aşağıdaki Rapor Arşivi'ne işlenir! Genel istatistiğin korunur.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* DEVELOPED CARD BLOCK: KPSS ÇIKMIŞ SORULAR ÇÖZÜCÜ (Wider, highly interactive, level features) */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl relative overflow-hidden" id="mega_kpss_quiz_solver">
        <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-slate-300 pointer-events-none select-none uppercase tracking-widest font-black">
          STUDY ROOM v2.0
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-150 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-vp-green" />
            </div>
            <div>
              <h3 className="text-md md:text-lg font-black text-vp-forest font-display flex items-center gap-2">
                KPSS Çıkmış ve Özgün Sorular Çözüm Paneli 🧠⚡
              </h3>
              <p className="text-xs text-slate-520 font-sans font-medium">
                Özenle hazırlanmış güncel KPSS sorularıyla hız testleri yap, doğru cevapladıkça asil bürokrat seviyene ulaş!
              </p>
            </div>
          </div>

          {/* Core Level competency badge display */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shrink-0">
            <div className="text-left">
              <span className="block text-[8px] font-mono text-slate-400 font-extrabold uppercase leading-none">KPSS AKADEMİK SEVİYESİ</span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-2xs font-extrabold mt-1 border ${currentLevel.color}`}>
                {currentLevel.name}
              </span>
            </div>
            <div className="w-16">
              <div className="flex justify-between text-[8px] font-mono text-slate-400 font-bold mb-0.5 leading-none">
                <span>SKOR</span>
                <span>{quizScore.correct}/{currentLevel.max}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, (quizScore.correct / currentLevel.max) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sub-selectors */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="block text-[9px] font-mono font-black text-slate-500 uppercase tracking-wider mb-2">
                🎯 BRANŞ SEÇEREK ÇÖZÜM YAP
              </span>
              <div className="flex flex-col gap-1.5">
                {(["ALL", "Tarih", "Coğrafya", "Vatandaşlık", "Türkçe", "Matematik", "Sözel Mantık"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setQuizCategoryFilter(cat);
                    }}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-black text-left transition-all border flex justify-between items-center cursor-pointer ${
                      quizCategoryFilter === cat 
                        ? "bg-vp-green text-white border-vp-greenborder shadow" 
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat === "ALL" ? "Karışık Soru Havuzu 🎲" : `${cat} Soruları`}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${quizCategoryFilter === cat ? "bg-emerald-800 text-emerald-100" : "bg-slate-105 text-slate-500"}`}>
                      {cat === "ALL" 
                        ? kpssQuestions.length 
                        : kpssQuestions.filter(q => q.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-vp-greenbg/45 border border-vp-greenborder/30 rounded-2xl p-4 text-center">
              <span className="text-[9px] font-mono text-vp-forest font-black uppercase tracking-wider">SKOR TABLOSU</span>
              <div className="flex justify-around items-center mt-2.5">
                <div className="text-center">
                  <p className="text-[10px] font-mono text-slate-500 font-bold leading-none">DOĞRU</p>
                  <p className="text-xl font-mono font-black text-emerald-600 mt-1">{quizScore.correct}</p>
                </div>
                <div className="text-center border-l border-slate-200/80 pl-4">
                  <p className="text-[10px] font-mono text-slate-500 font-bold leading-none">YANLIŞ</p>
                  <p className="text-xl font-mono font-black text-red-500 mt-1">{quizScore.wrong}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuizScore({ correct: 0, wrong: 0 });
                  setQuizIdx(0);
                  setSelectedAnswer(null);
                  setIsAnswerChecked(false);
                  setIsQuizLogSynced(false);
                }}
                className="text-[8.5px] font-mono text-vp-forest underline hover:text-vp-green font-black uppercase mt-3 block mx-auto cursor-pointer"
              >
                SKORU SIFIRLA 🔄
              </button>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="lg:col-span-9 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 flex flex-col justify-between">
            {activeQuestionsList.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-vp-greenbg border border-vp-greenborder/30 text-vp-forest px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {currentQuizItem.category} Ünitesi
                    </span>
                    <span className="text-slate-400 font-mono text-xs">
                      Soru {quizIdx + 1}/{activeQuestionsList.length}
                    </span>
                  </div>
                  <HelpCircle className="w-5 h-5 text-slate-400 rotate-[-12deg]" />
                </div>

                <div className="text-xs md:text-sm font-sans font-extrabold text-slate-800 leading-relaxed bg-white p-5 rounded-2xl border border-slate-201/50 shadow-xs">
                  {currentQuizItem.question}
                </div>

                {/* Question Choice Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2.5">
                  {(["A", "B", "C", "D", "E"] as const).map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = currentQuizItem.correctOption === opt;
                    let optionStyle = "bg-white text-slate-705 border-slate-200 hover:bg-slate-50";

                    if (isAnswerChecked) {
                      if (isCorrect) {
                        optionStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-850 font-black shadow-inner";
                      } else if (isSelected) {
                        optionStyle = "bg-red-50 border-2 border-red-400 text-red-850 font-black";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-vp-greenbg border-2 border-vp-greenborder text-vp-forest font-bold";
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => setSelectedAnswer(opt)}
                        className={`text-left p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${optionStyle}`}
                      >
                        <span className="bg-slate-105 border border-slate-250 w-6 h-6 rounded-lg flex items-center justify-center font-mono font-black shrink-0 text-slate-650">
                          {opt}
                        </span>
                        <span>{currentQuizItem.options[opt]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Rich feedback explanation with Defter integration option */}
                {isAnswerChecked && (
                  <div className="bg-amber-50/80 border border-amber-250 rounded-2rem p-5 space-y-2 text-xs text-slate-700 leading-normal font-sans animate-fade-in">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-amber-800 uppercase tracking-wider text-[10px]">💡 DERS TAHLİLİ VE ÇÖZÜM ANALİZİ:</span>
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    </div>
                    <p className="font-bold leading-relaxed">{currentQuizItem.explanation}</p>
                    
                    {!isQuizLogSynced ? (
                      <button
                        type="button"
                        onClick={() => {
                          const customLog: KpssSolvedLog = {
                            id: "auto_" + Date.now(),
                            date: new Date().toISOString().split("T")[0],
                            subject: currentQuizItem.category,
                            solvedCount: 1,
                            mood: "Süper 🔥",
                            note: `Hızlı Çıkmış Sorular Çözücü'nden branş sorusunu denedim ve deftere kaydettim.`
                          };
                          setLogs([customLog, ...logs]);
                          setIsQuizLogSynced(true);
                        }}
                        className="bg-vp-forest hover:bg-opacity-95 text-white font-extrabold py-1.5 px-3 rounded-xl mt-3 text-[10px] uppercase tracking-wider cursor-pointer font-sans inline-block transition-all shadow-sm"
                      >
                        ✓ Bu Soru Çözümünü Soru Sayacı Defterine İşle! 📝
                      </button>
                    ) : (
                      <span className="inline-block text-[10px] font-mono text-emerald-600 font-extrabold mt-3.5">
                        ✓ Süreç Sayacına başarıyla bir soru eklendi!
                      </span>
                    )}
                  </div>
                )}

                {/* Play controls */}
                <div className="flex gap-3 pt-2 font-sans justify-end items-center flex-wrap">
                  <button
                    type="button"
                    onClick={handleNewTest}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer leading-none shadow-sm mr-auto"
                  >
                    Yeni Test Yükle (Karıştır) 🔄🧠
                  </button>

                  {!isAnswerChecked ? (
                    <button
                      type="button"
                      disabled={selectedAnswer === null}
                      onClick={() => {
                        if (!selectedAnswer) return;
                        setIsAnswerChecked(true);
                        if (selectedAnswer === currentQuizItem.correctOption) {
                          setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
                        } else {
                          setQuizScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
                        }
                      }}
                      className={`py-3 px-6 rounded-2xl text-xs font-black text-white shadow transition-all flex items-center gap-1 leading-none ${
                        selectedAnswer === null 
                          ? "bg-slate-300 cursor-not-allowed" 
                          : "bg-vp-green hover:bg-opacity-95 cursor-pointer"
                      }`}
                    >
                      Cevabımı Kontrol Et <CheckCircle2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (quizIdx >= activeQuestionsList.length - 1) {
                          handleNewTest();
                        } else {
                          const nextIdx = quizIdx + 1;
                          setQuizIdx(nextIdx);
                          setSelectedAnswer(null);
                          setIsAnswerChecked(false);
                          setIsQuizLogSynced(false);
                        }
                      }}
                      className="bg-vp-green hover:bg-opacity-95 text-white py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer leading-none shadow-md animate-pulse"
                    >
                      {quizIdx >= activeQuestionsList.length - 1 ? (
                        <>🏁 Testi Bitir & Yeni Test Yükle</>
                      ) : (
                        <>Sıradaki Soruya Geç <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">Bu branşta henüz test sorumuz bulunmuyor!</p>
                <button
                  type="button"
                  onClick={() => setQuizCategoryFilter("ALL")}
                  className="bg-vp-green text-white font-bold py-1 px-4 rounded-lg text-xs mt-3 cursor-pointer"
                >
                  Genel Soru Havuzunu Yükle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DEVELOPED CARD BLOCK: GELİŞMİŞ KÜTÜPHANE NOT PANOSU (Wider, grid styling, filter/search and inline edit) */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl" id="corkboard_not_piano">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <Pin className="text-amber-600 w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-md md:text-lg font-black text-vp-forest font-display">
                Gelişmiş Kütüphane Not Panosu ve Mantar Levha 📌📝
              </h3>
              <p className="text-xs text-slate-510 font-sans font-medium">
                Sevgili İloş, kütüphane hap bilgilerini buraya takabilir, her yapışkan notunu dersine göre iğneleyip düzenleyebilirsin!
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setNoteSeed(prev => prev + 1)}
            className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[10.5px] font-black uppercase px-4 py-2 rounded-2xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
            title="Sınırsız şifreleyici notları karıştırır"
          >
             Hazır Ders Notu Değiştir 🔄
          </button>
        </div>

        {/* Big Corkboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Notes Actions & Form */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Display Curated lesson facts card */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-4 shadow-3xs relative space-y-3">
              <span className="absolute top-2 right-2 text-xs opacity-45">📌</span>
              
              <div className="space-y-1">
                <span className="block text-[8px] font-mono font-black text-amber-805 uppercase tracking-wider mb-1">
                  MANTAR LEVHA DERS SEÇİMİ:
                </span>
                <div className="flex flex-wrap gap-1">
                  {["Tarih", "Coğrafya", "Türkçe", "Matematik", "Vatandaşlık", "Sözel Mantık"].map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setCorkboardSubject(sub)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-black border transition-all cursor-pointer ${
                        corkboardSubject === sub 
                          ? "bg-amber-600 text-white border-amber-700" 
                          : "bg-white text-slate-600 border-amber-200 hover:bg-amber-100/55"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-200 pt-2.5">
                <span className="inline-block text-[9px] font-mono font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                  OTOMATİK DERS NOTU ({corkboardSubject})
                </span>
                <p className="text-[11.5px] font-sans font-bold text-slate-800 leading-relaxed whitespace-pre-wrap min-h-[60px]">
                  {activeCourseNote}
                </p>
                <p className="text-[8px] font-mono text-slate-400 mt-2 italic">
                  * Ders seçtikçe veya 'Hazır Not Değiştir' dedikçe sürekli güncellenir!
                </p>
              </div>
            </div>

            {/* Note Creator Form */}
            <form onSubmit={handleAddNote} className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-2rem">
              <span className="block text-[10px] font-mono font-black text-vp-forest uppercase tracking-widest leading-none">
                 Yeni Yapışkan Not İğnele
              </span>
              
              <textarea
                placeholder="Sevgili İloş, kütüphane masasında aldığın hap formülü ya da aklında tutmak istediğin o ezber bilgisini yaz..."
                rows={3}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full bg-white border border-slate-250 rounded-xl p-3 text-xs text-slate-800 focus:border-vp-green outline-none font-medium"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-mono leading-none font-extrabold text-slate-400 uppercase mb-1">STİCKER SEÇİMİ</label>
                  <select
                    value={selectedNoteTag}
                    onChange={(e) => setSelectedNoteTag(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-lg p-1.5 text-3xs font-black text-slate-700 outline-none"
                  >
                    {noteTags.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-mono leading-none font-extrabold text-slate-400 uppercase mb-1">NOT RENGİ</label>
                  <div className="flex gap-1.5 mt-1">
                    {[
                      { key: "bg-yellow-101", display: "bg-amber-100 border-amber-300" },
                      { key: "bg-emerald-100", display: "bg-emerald-100 border-emerald-300" },
                      { key: "bg-sky-100", display: "bg-sky-100 border-sky-300" },
                      { key: "bg-rose-100", display: "bg-rose-100 border-rose-300" },
                      { key: "bg-purple-100", display: "bg-purple-100 border-purple-305" }
                    ].map((col) => (
                      <button
                        key={col.key}
                        type="button"
                        onClick={() => setSelectedNoteColor(col.key)}
                        className={`w-4 h-4 rounded-full border transform hover:scale-120 transition-transform cursor-pointer ${col.display} ${
                          selectedNoteColor === col.key ? "ring-2 ring-vp-forest scale-110" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-vp-forest hover:bg-opacity-95 text-white py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
              >
                Mantar Panoya İğnele 📌
              </button>
            </form>
          </div>

          {/* Interactive Corkboard Notes Grid & Filters */}
          <div className="lg:col-span-8 bg-orange-50/50 border border-orange-100 rounded-[2rem] p-5">
            
            {/* corkboard filters drawer */}
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center bg-white p-3 rounded-2xl border border-orange-100/50 mb-4">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 w-full md:w-auto">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Notlarda ara..."
                  value={noteSearch}
                  onChange={(e) => setNoteSearch(e.target.value)}
                  className="bg-transparent border-none text-xs outline-none w-full text-slate-700 font-bold"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto items-center justify-end">
                <span className="text-[10px] font-mono text-slate-400 font-bold whitespace-nowrap">STİCKER:</span>
                <select
                  value={noteFilterTag}
                  onChange={(e) => setNoteFilterTag(e.target.value)}
                  className="bg-slate-50 text-slate-700 text-3xs font-black border border-slate-200 rounded-lg p-1 outline-none"
                >
                  <option value="ALL">Hepsi</option>
                  {noteTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>

                <span className="text-[10px] font-mono text-slate-400 font-bold whitespace-nowrap">RENK:</span>
                <select
                  value={noteFilterColor}
                  onChange={(e) => setNoteFilterColor(e.target.value)}
                  className="bg-slate-50 text-slate-700 text-3xs font-black border border-slate-200 rounded-lg p-1 outline-none"
                >
                  <option value="ALL">Tümü</option>
                  <option value="bg-yellow-101">Sarı</option>
                  <option value="bg-emerald-100">Yeşil</option>
                  <option value="bg-sky-100">Mavi</option>
                  <option value="bg-rose-100">Kırmızı</option>
                  <option value="bg-purple-100">Mor</option>
                </select>
              </div>
            </div>

            {/* Sticky Notes Corkboard Grid (supporting edit inline) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {visibleStickyNotes.map((note) => {
                const isEditing = editingNoteId === note.id;
                
                let stickyColor = "bg-amber-100 border-amber-250 text-amber-950";
                if (note.color === "bg-emerald-100") stickyColor = "bg-emerald-100 border-emerald-250 text-emerald-950";
                else if (note.color === "bg-sky-100") stickyColor = "bg-sky-100 border-sky-250 text-sky-950";
                else if (note.color === "bg-rose-100") stickyColor = "bg-rose-100 border-rose-250 text-rose-950";
                else if (note.color === "bg-purple-100") stickyColor = "bg-purple-100 border-purple-250 text-purple-950";

                return (
                  <div 
                    key={note.id}
                    className={`p-4 rounded-2xl border shadow-xs min-h-[140px] flex flex-col justify-between relative transform rotate-[-0.5deg] hover:rotate-[0.5deg] transition-all hover:scale-101 hover:shadow-md ${stickyColor}`}
                  >
                    {/* Top sticker badge and delete */}
                    <div className="flex justify-between items-start pb-1">
                      {isEditing ? (
                        <select
                          value={editingNoteTag}
                          onChange={(e) => setEditingNoteTag(e.target.value)}
                          className="bg-white/80 border border-slate-300 rounded text-3xs font-black p-0.5 outline-none"
                        >
                          {noteTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="inline-block text-[8px] font-sans font-black bg-white/70 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest leading-none">
                          📌 {note.tag}
                        </span>
                      )}

                      <div className="flex gap-2">
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => saveEditNote(note.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-md transition-all cursor-pointer shadow-2xs"
                            title="Kaydet"
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditNote(note)}
                            className="text-slate-500 hover:text-slate-800 p-0.5 transition-all cursor-pointer"
                            title="Notu Değiştir / Düzenle"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteNote(note.id)}
                          className="text-slate-400 hover:text-red-600 text-[13px] font-black leading-none cursor-pointer"
                          title="Panodan Sök Al"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    {/* Note content - either edit textarea or static text */}
                    <div className="flex-1 py-2">
                      {isEditing ? (
                        <textarea
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          className="w-full h-20 bg-white/90 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800 font-bold outline-none"
                        />
                      ) : (
                        <p className="font-sans font-extrabold pr-2 text-xs leading-relaxed break-words text-slate-850">
                          {note.text}
                        </p>
                      )}
                    </div>

                    {/* Stamp dates and branding alignment */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200/20 text-[7.5px] font-mono opacity-60">
                      <span>KÜTÜPHANE MASASI</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                );
              })}

              {visibleStickyNotes.length === 0 && (
                <div className="col-span-2 text-center text-3xs text-slate-500 py-10 italic font-semibold">
                  Arama kriterlerinize uyan iğnelenmiş hap bilgi bulunmuyor!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NEW COMPONENT BLOCK: SAVED DAILY PROCESS REPORTS ARCHIVE 📦 */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl" id="kpss_daily_reports_archive_section">
        <h4 className="text-md font-black text-vp-forest mb-2 tracking-tight font-display flex items-center gap-2">
          <Archive className="w-5 h-5 text-vp-green text-amber-500" /> 📦 KPSS Gün Sonu Süreç Raporları Arşivi
        </h4>
        <p className="text-xs text-slate-500 font-sans mb-4 font-medium max-w-3xl">
          Günün sonlanıp "Günü Bitir & Raporu Arşivle" butonuna tıklandığında, çözülen soru dökümleri buraya tarihli mühürlerle kaydedilir. Bu sayede her gününüzü gururla arşivleyebilirsin!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedDailyReports.map((report) => (
            <div 
              key={report.id}
              className="bg-slate-50 border-2 border-slate-200 hover:border-vp-greenborder rounded-[2rem] p-5 shadow-xs hover:shadow-md transition-all relative flex flex-wrap justify-between"
            >
              <button
                type="button"
                onClick={() => deleteArchivedReport(report.id)}
                className="absolute top-3 right-4 text-slate-400 hover:text-red-500 text-xs font-bold font-mono p-1 cursor-pointer"
                title="Raporu Arşivden Sil"
              >
                Sil 🗑️
              </button>
              
              <div className="w-full">
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full font-black uppercase">
                  {report.mood}
                </span>
                
                <h5 className="text-[11.5px] font-mono font-black text-slate-900 mt-2 mb-1">
                  📅 {report.dateStr}
                </h5>

                <div className="bg-white border border-slate-201 p-3 rounded-2xl my-2 flex justify-between items-center shadow-inner">
                  <span className="text-[9px] font-mono text-slate-500 font-extrabold pb-0.5 block leading-none">TOPLAM ÇÖZÜLEN:</span>
                  <span className="text-sm font-mono font-black text-vp-forest bg-vp-greenbg px-2 rounded-lg py-0.5">{report.totalSolved} Soru</span>
                </div>

                <div className="space-y-1 my-2.5">
                  <p className="text-[8px] font-mono text-slate-400 font-black uppercase">Derslerin Detaylı Dağılımları:</p>
                  <div className="grid grid-cols-3 gap-1">
                    {Object.entries(report.breakdown || {}).map(([subject, count]) => (
                      <div key={subject} className="bg-white border border-slate-201 text-[8.5px] p-1 rounded-lg text-center font-mono">
                        <span className="text-slate-500 block text-[7px] font-bold leading-none mb-0.5 truncate">{subject}</span>
                        <span className="text-slate-800 font-black ">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[9.5px] text-slate-600 italic mt-2.5 pt-2 border-t border-slate-200/50 leading-relaxed font-medium block">
                  <strong>Not Defteri:</strong> {report.note}
                </p>
              </div>
            </div>
          ))}

          {savedDailyReports.length === 0 && (
            <div className="col-span-full bg-slate-50 border border-slate-200 py-8 px-4 rounded-[2rem] text-center">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-slate-505 font-bold italic">
                Arşivlenmiş bir günlük süreç raporun bulunmuyor İloşum. Günü kapattığında dökümlerin buraya iğnelenecek!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Score logs table tracker at the bottom */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl">
        <h4 className="text-md font-black text-vp-forest mb-4 tracking-tight font-display flex items-center gap-2">
          <Calendar className="w-5 h-5 text-vp-green" /> Tarihli Çalışma Defteri Soru İndeksleri
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-slate-800">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-mono tracking-wider font-extrabold text-vp-forest uppercase bg-slate-50">
                <th className="py-2.5 px-3">Tarih</th>
                <th className="py-2.5 px-3">Ders Adı</th>
                <th className="py-2.5 px-3">Çözülen Soru Sayısı</th>
                <th className="py-2.5 px-3">Durum / Arşiv</th>
                <th className="py-2.5 px-3">Günün KPSS Notu</th>
                <th className="py-2.5 px-3 text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-700">{log.date}</td>
                  <td className="py-3 px-3 font-sans font-bold text-vp-forest uppercase tracking-wider">{log.subject}</td>
                  <td className="py-3 px-3 font-mono text-lg font-black">{log.solvedCount} Soru</td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2.5 py-0.5 rounded-full text-3xs font-extrabold border shadow-2xs ${
                      log.isArchived 
                        ? "bg-slate-100 border-slate-200 text-slate-505" 
                        : "bg-vp-greenbg border-vp-greenborder text-vp-forest"
                    }`}>
                      {log.isArchived ? "ARŞİVLENDİ 📦" : "AKTİF SAYAÇTA ⭐"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-sans italic max-w-[320px] truncate" title={log.note}>
                    {log.note}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded transition-colors cursor-pointer"
                      title="Kayıtı Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && (
            <p className="text-center text-xs text-slate-400 py-6 font-sans italic">
              "Kayıtlı çalışma seansı henüz yok. Soru çözümlerini girerek KPSS tablonu oluşturmaya hemen başla!"
            </p>
          )}
        </div>
      </div>

      {/* Custom Confirmation Dialog for Reset All Logs */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-red-200 rounded-[2rem] p-6 max-w-sm w-full shadow-2xl transform scale-100 transition-all text-center">
            <div className="w-16 h-16 bg-red-55 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h5 className="text-md font-black text-slate-800 mb-2 font-display">Tüm Verileri Sıfırla? 🧹</h5>
            <p className="text-xs text-slate-650 mb-5 font-sans font-medium leading-relaxed">
              Eyvah İloşum! Tüm çözdüğün KPSS soru sayacı kayıtlarını ve günlük arşivleri tamamen sıfırlamak istediğinden emin misin? Bu işlem geri alınamaz!
            </p>
            <div className="flex gap-2 font-sans">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-305 text-slate-705 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                Vazgeç 🙅‍♀️
              </button>
              <button
                type="button"
                onClick={confirmResetAction}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
              >
                Evet, Sıfırla! 🧼
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom AlertDialog for Pomodoro Finished Notification */}
      {showPomodoroFinished && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white border-4 border-vp-greenborder rounded-[2rem] p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-vp-greenbg border border-vp-greenborder rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-vp-green" />
            </div>
            <h5 className="text-md font-black text-vp-forest mb-2 font-display">Harika İş Çıkardın İloş! 🥳🎉</h5>
            <p className="text-xs text-slate-650 mb-5 font-medium leading-relaxed p-0.5">
              Pomodoro çalışma seansını başarıyla tamamladın! Şimdi zihnini dinlendirme ve hak ettiğin o Atakum sahil havası tadındaki mola vaktidir her halinle! ☕🌸
            </p>
            <button
              type="button"
              onClick={() => setShowPomodoroFinished(false)}
              className="w-full bg-vp-green hover:bg-opacity-90 text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
            >
              Tamam, Süper! 👍
            </button>
          </div>
        </div>
      )}

      {/* Custom Archive Success Modal Overlay */}
      {showArchiveSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white border-4 border-vp-greenborder rounded-[2rem] p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-vp-greenbg border border-vp-greenborder rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8 text-vp-green stroke-[3]" />
            </div>
            <h5 className="text-md font-black text-vp-forest mb-2 font-display">Günü Mühürledik İloş! 🌅🏆</h5>
            <p className="text-xs text-slate-650 mb-5 font-medium leading-relaxed p-0.5">
              Bugün başarıyla çözdüğün tüm KPSS soruları, ders ders Süreç Raporları Arşivi'ne işlendi! Bugünkü aktif sayacın yeni güne hazırlık için sıfırlandı. Harika gidiyorsun!
            </p>
            <button
              type="button"
              onClick={() => setShowArchiveSuccess(false)}
              className="w-full bg-vp-forest hover:bg-opacity-95 text-white py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
            >
              Yuppi, Harika! 🌟
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
