import React, { useState, useEffect } from "react";
import { 
  Dumbbell, Shield, UserCheck, Flame, Cake, AlertTriangle, 
  Sparkles, Check, Timer, Calendar, Plus, RefreshCw, Star, PlaySquare, Smile,
  Trash2, Edit3, X
} from "lucide-react";

interface WeeklyGymDay {
  dayName: string;
  programType: string;
  completed: boolean;
}

interface GymLog {
  id: string;
  date: string;
  sessionType: string;
  durationMinutes: number;
  pushedByTrainer: boolean;
  leggingsSafe: boolean;
}

export default function FitnessNutrition() {
  // 1. Weekly Gym Planner & map (İlker'in Mix-Pestil Programı - Haftalık Harita)
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyGymDay[]>(() => {
    const saved = localStorage.getItem("ilo_weekly_gym_map");
    return saved ? JSON.parse(saved) : [
      { dayName: "Pazartesi", programType: "Bacak & Glute Günü 🦵", completed: true },
      { dayName: "Salı", programType: "Mix-Pestil Day 💀", completed: true },
      { dayName: "Çarşamba", programType: "Dinlenmece & Esneme 😴", completed: false },
      { dayName: "Perşembe", programType: "Kardiyo & HIIT Seansı 🏃‍♀️", completed: false },
      { dayName: "Cuma", programType: "Omuz & Triceps (Arka Kol) 📐", completed: false },
      { dayName: "Cumartesi", programType: "Atakum Sahil Koşusu 🌊", completed: false },
      { dayName: "Pazar", programType: "Karın & Core Sıkılaşma 🍫", completed: false }
    ];
  });

  const trainingOptions = [
    "Mix-Pestil Day 💀",
    "Bacak & Glute Günü 🦵",
    "Üst Vücut & Göğüs 🦾",
    "Omuz & Triceps (Arka Kol) 📐",
    "Sırt & Biceps (Ön Kol) 💪",
    "Karın & Core Sıkılaşma 🍫",
    "Kardiyo & HIIT Seansı 🏃‍♀️",
    "Atakum Sahil Koşusu 🌊",
    "Dinlenmece & Esneme 😴"
  ];

  // Gym Logs chronologically saved
  const [gymLogs, setGymLogs] = useState<GymLog[]>(() => {
    const saved = localStorage.getItem("ilo_gym_logs_new");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        date: "2026-06-03",
        sessionType: "Hepsinden Mix-Pestil Day 💀",
        durationMinutes: 75,
        pushedByTrainer: true,
        leggingsSafe: true
      },
      {
        id: "2",
        date: "2026-06-02",
        sessionType: "Bacak Günü Güzelliği 🦵",
        durationMinutes: 65,
        pushedByTrainer: true,
        leggingsSafe: false // Day leggings pütürlendi!
      }
    ];
  });

  // Forms to log new session
  const [logSubject, setLogSubject] = useState<string>("Bacak Günü Güzelliği 🦵");
  const [logDuration, setLogDuration] = useState<number>(60);
  const [logPushed, setLogPushed] = useState<boolean>(true);

  // States for inline editing gym logs
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editedDuration, setEditedDuration] = useState<number>(60);
  const [editedType, setEditedType] = useState<string>("");

  // 2. 21-Day Sugar-Free Streak (Persistent)
  const [sugarFreeDays, setSugarFreeDays] = useState(() => {
    const saved = localStorage.getItem("ilo_sugar_free_days_new");
    return saved ? Number(saved) : 14; 
  });

  // Cravings solver state
  const [selectedCraving, setSelectedCraving] = useState<string | null>(null);
  const [cravingQuote, setCravingQuote] = useState("");

  const cravingAlternatives: Record<string, string[]> = {
    durum: [
      "Söz verildi: 21 günlük şekersizlik diyetin bittiği saniye o sıcacık lavaşa sarılı, bol soslu Hatay Dürümü bizzat Mustafabank sponsorluğunda önüne serilecek! 🌯💳",
      "Lavaşın kokusu Atakum sahilini sarmış durumda İloşum! Musti senin için siparişi şimdiden akort etti, o son dürüme kadar motivasyon tavan! 🏃‍♀️💨",
      "Double lavaşlı, bol soslu, sıcak ve çıtır patatesli Hatay dürümü... Her KPSS paragrafı seni bu eşsiz ödüle bir adım daha yaklaştırıyor! 📚📈",
      "Diyet sonrası o ilk lokmayı düşle! Bol turşulu dürümümüz, Musti'nin bitmeyen hayranlığıyla birleşince kalori falan kalmaz! ✨",
      "Akortlu Hatay lavaşı fırından yeni çıktı! İlker hoca görmeden arka sokakta 1 lokma ısırmak serbest mi? Sabırlı ol İloşum, zafere az kaldı! 🦵"
    ],
    erik: [
      "Tuzlu ekşi erik... Paragrafların beynini yorduğu o en sinirli saniyede Mikail'den rüzgar kesici dualarla dondurulmuş çilek yanına kütür erikler sevk edildi! 🍏🧂",
      "Kütür kütür tuzlu yeşil erikler kütüphane sırasına döküldü! Ağzın sulandı biliyorum, bu şifalı yeşil canavarlar diyeti asla bozmaz, zindelik verir! 3 yeşil erik! 🌱",
      "Bol tuzlanmış, sulu sulu Atakum eriği... Musti senin için Samsun pazarındaki en sert en taze erikleri bizzat ayıkladı! ❄️",
      "Tarih ezberlerken gözün mü kapanıyor? At ağzına bir sulu ekşi erik, bak bakayım uykudan eser kalıyor mu! Şifa şifa! 💤",
      "Erikler buz gibi, tuzluk elinde! Kütüphane köşesinde sessizce kütürdetirken moral depolamaya devam, galaksi güzeline güç versin! 🌟"
    ],
    strawberry: [
      "Dondurulmuş çilek parçacıkları, hafifçe erirken ağızda bıraktığı o buzlu ve ferah meyve şöleni... Şekersiz diyeti asla bozmaz, en masum dostundur! 🍓🧊",
      "Buzluktan yeni çıkmış kıtır kıtır dondurulmuş çilekler! Üzerine fısıldanan sevgi akortlarıyla KPSS kütüphanesine özel doping! 🍓✨",
      "Kıpkırmızı, canlı ve çıtır dondurulmuş çilek taneleri... Hem tatlı krizini yok eder hem de o asil enerjini pürüzsüzce zirvede tutar! 👑",
      "Çileklerin serinliği kütüphane masandaki tüm yorgunluğu silip süpürecek! Musti senin için en taze çilekleri bizzat dondurdu!",
      "Şeker ilavesiz meyve keyfi! Çileklerin her bir ısırığı, Atakum sahilinde alacağımız derin ve huzurlu nefesin provası gibidir!"
    ],
    komagene: [
      "Bizim mor tabelalı dükkan planı! 'Niye milletin dükkanında çiğköfte yiyoruz' isyanıyla fışkıran o bol acılı çiğköfte franchise lezzeti çok yakında Mor Tabelayla! 🌯🏪",
      "Gelsin bol limonlu, nar ekşili çiğköfte dürümler! Yanında buz gibi köpüklü yayık ayranı, kütüphane stresini sıfırlamaya birebir! 🥤",
      "Franchise dükkanımızın açılış provası! İloş Hanım dükkanın başında oturup her müşteriye aslan asilliğiyle bakacak, Musti de dürümleri saracak! 🦁👑",
      "Bol yeşillikli, marullu çıtır çiğköfte. 'Komagene yanına buz gibi ayran!' fısıltısı kulağında çınlasın, KPSS tarih bittiğinde şölen başlasın! 🎉",
      "Çiğköfte acısı zihni açar derler! Osmanlı yeniliklerini ezberlerken sana acı soslu bir destek, Musti bodyguard korumasıyla! 🛡️"
    ],
    quark: [
      "Aslında Quark artık gına getirmişti ama Musti içine dondurma tozu ve orman meyveleri atınca erimiş olan quark dondurmasına dönüştü. Afiyet olsun güzeller güzeline! 🍨🍓",
      "Protein deposu yaban mersinli quark! Spor sonrası bacak kaslarını onarırken İlker hocanın da yüzünü güldürecek en masum kriz çözücü! 🏋️‍♀️",
      "Şeker ilavesiz quark gecesi! Buzlukta 10 dakika bekletip dondurma kıvamında kaşıklıyoruz, keyfimiz yerinde! ❄️",
      "Sade quark'a kakao ve Hindistan cevizi tozu serpiştirerek çikolata rüyasına dönüştüren Musti mutfak akort ekibi devrede! 🥥🌱",
      "Kaşıkla İloş kaşıkla! Bu quark'ta ne kalori var ne dert, Hummel manken aurası her zaman korunur! 💅"
    ],
    baklava: [
      "Gaziantep'ten Samsun kütüphanesine doğrudan uzanan o kadifemsi, sütlü soğuk baklava rüyası... Sen bu denemeyi bitir, 3 dilim buz gibi soğuk baklava Musti'den sana helal olsun İloşum! 🍫🥛",
      "Üzeri bol kakao ve çikolata rendeli, içi antep fıstığı dolu soğuk baklava... Isırdığında o sütün ferahlığı KPSS stresinden eser bırakmayacak! ✨",
      "Sütlü buz gibi soğuk baklava... Diyet bozulacak diye korkma, Mustafabank bu tatlıyı kalorisiz sayma hakkını kullandı 💳!",
      "Kütüphane sıcağına en güzel serinlik! Bir parça soğuk baklava ile zihin akort edilir, paragraflar tereyağından kıl çeker gibi çözülür! 📖",
      "Galaksi güzelimize Antep'in en özel tepsisinden seçilen o yumuşacık baklavalar... Afiyet, bal, KPSS tırpanı olsun! 🏆"
    ],
    waffle: [
      "Atakum sahilinde, o ılık meltemde, çilekli ve muzlu çıtır waffle... Kütüphanede çözdüğün her 100 soru için waffle'a ekstra Antep fıstığı ekliyoruz İloşum! 🧇",
      "Kat kat bol antep fıstıklı ve beyaz çikolatalı Belçika waffle'ı! Mustafabank sponsorluğuyla Atakum sahilinde bunu hak ettin mankenim! 💳👑",
      "Bol çilekli, dikey dondurmalı waffle kulesi! Yanında buzlu filtre kahve ve sıfır KPSS stresiyle Atakum melteminde döneceğiz! 🍨",
      "Diyet sonrası o çıtır waffle hamurunun ağızda eriyişi... Bu hayal kütüphanenin o sert sandalyelerini yumuşatmaya yeter! 🌱",
      "Sadece waffle değil, üstüne konacak sevgi pütürleriyle beraber tam bir şölen reçetesi! Akort kalkanı waffle fırınında aktif dert etme! ⚙️"
    ],
    latte: [
      "Konsantrasyonun tavan yapacağı saniyede buz gibi, bol köpüklü, karamel şuruplu bir kahve... Samsun kütüphane masasında ders çalışırken yudumlaman için Musti'nin elinden! ☕🧊",
      "Buzlu latte yanına fındık aroması fısıldandı! Paragraflarla savaşırken uykunu açacak en leziz, en akortlu yudumlar! 🧠⚡",
      "Dört shot espresso içeren ve İloş'a adeta süper aslan gücü veren o meşhur 'bayılma savar' buzlu fındıklı latte! 🦁",
      "Köpüklerin üzerinde mor kalpler uçuşan, sadece senin için akort edilmiş şifalı bir kütüphane lattesidir bu! 💜",
      "Sert ve serin! Samsun'un poyrazı fincanına dolmuş gibi ferahlatıcı karamel latte sevgilerle önüne seriliyor!"
    ],
    patates: [
      "Diyetteyiz ama çıtır patatese kim hayır diyebilir? Yağsız ve fırınlanmış baharatlı çıtır patatesler İlker Hoca'nın gözünden kaçarak diyete uyum sağlar İloşum, dert etme! 🍟🌶️",
      "Fırından yeni çıkmış, bol kekikli ve toz kırmızı biberli altın çıtır patates dilimleri. İlker hocayı atlatma planına dahil edilmiştir! 🏃‍♀️",
      "Musti usulü airfryer patatesi! Sıfır yağ, %100 çıtırlık, %100 lezzet and aslan burcu asaletine yakışır pürüzsüz besin değeri! 🌱",
      "Sıcak çıtır patatesler yanına ev yapımı naneli yoğurt sosuyla beraber. Kütüphaneden çıkıp evde It Takes Two oynarken mükemmel atıştırmalık! 🎮",
      "Çıtır çıtır patates dilimleri! Her lokmada KPSS sözel mantık sorularının şifresini çözer gibi çıtırdat!"
    ],
    katmer: [
      "Diyeti tamamen patlatmayan, fıstığı bol, şekeri sıfır, proteinli fit katmer! Hem kaslarını korur hem de tatlı krizini Mustafabank garantisiyle sonlandırır! 🥞💚",
      "Üzeri sıcacık kaymak eritilmiş, bol yeşil fıstık yağmurlu Gaziantep katmeri... Kütüphanede döktüğün her damla ter için tatlı bir ödül! 🥛",
      "Çıtır çıtır incecik hamura sarılı fıstık şöleni! Musti senin adına tüm kalorisini bizzat üstlendi, afiyetle hüpletmek serbest! 💳",
      "Katmerin o eşsiz kokusu kütüphane kapısına dayandı. Sakın pes etme, aslan kraliçe bu sınavı kazanıp o katmeri Atakum sahilinde afiyetle yiyecek! 🦁🌟",
      "Antrenman sonrası tatlı krizine en asil çözüm! Proteinli fit katmerimiz kasları korurken ruhunu da akort eder!"
    ],
    limonata: [
      "Buz gibi, taze nane yapraklı ve çilekli ev yapımı limonata... Kütüphanenin sıcak günlerinde içini ferahlatacak ve enerjine can suyu katacak! 🍓🍋",
      "Taptaze sıkılmış limonların Atakum sahili ferahlığıyla buluşması! Cam bardakta çıtır çıtır buzlarla sinirleri saniyeler içinde yatıştırır! 🧊",
      "Sarı ve pembe! Çilekli fesleğenli limonata, içindeki Leo neşesini ve Dua Lipa aurasını saniyeler içinde coşturacak! 💅💥",
      "Kütüphanede ders çalışmaktan bunaldığın an çek pipetten buz gibi nane aromalı ev limonatasını, dertler bayılsın ve yok olsun! 😴🎒",
      "Musti'nin elleriyle hazırladığı, taze zencefilli bağışıklık ve odaklanma şarjı olan özel şifalı sarı iksir!"
    ],
    cigkofte_durum: [
      "Yeşilliği bol, bol limonlu, nar ekşili, insanın canını çektiren efsane Atakum dürümü... Musti ile Atakum sahilinde gün batımında çiğköfte partisi planı kilitlendi! 🌯🌅",
      "Bol acılı, marulu kütürdeyen dumanı üstünde Komagene çiğköfte dürüm! Yanında buz gibi ayranıyla kütüphane yorgunluğunu silip atar! 🥤",
      "Lavaşa sarılı o eşsiz mutluluk! Dürümün içindeki turşu miktarı bizzat Mustafabank garantisiyle maksimuma çıkartılmıştır! 💳🥒",
      "Komagene'den bol soslu, çift lavaşlı lezzet bombası! Her tarih testi sonrasında 1/4 dürüm ödülüyle KPSS maratonu şölene dönüşüyor! 📚",
      "Franchise hayalimizin ilk deneme dürümleri! İleride dükkanın o mor tabelası önünde yiyeceğimiz dürümlerin provası, afiyet olsun starım! 🏪🌟"
    ]
  };

  const handleCravingClick = (id: string) => {
    setSelectedCraving(id);
    const pool = cravingAlternatives[id] || [];
    if (pool.length > 0) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setCravingQuote(pool[randomIndex]);
    } else {
      setCravingQuote("");
    }
  };

  // 3. Musti Acil Kaçamak State
  const [showKacamakAlert, setShowKacamakAlert] = useState(false);
  const [kacamakIndex, setKacamakIndex] = useState(0);

  const kacamakSurprises = [
    {
      title: "🚨 ACİL EYLEM PLANI: İLKER HOCA ARKASINI DÖNDÜ! 🚀",
      desc: "İlker Hoca tam dumbbelleri kaldırırken arkasını dönmüşken fırla! En hızlı adımlarla Komagene dükkanına sevkıyatımız başlamıştır. Marul bol olsun!",
      emojis: "🌯🏃‍♀️💨✨"
    },
    {
      title: "🍓 DONDURULMUŞ DAĞ ÇİLEĞİ ŞENLİĞİ! 🍓",
      desc: "Buzluktan yeni çıkmış, dondurulmuş mis kokulu çilekler Atakum sahilindeki o serin meltemle buluştu! Mor kalkanlar eşliğinde antioksidan şarjı başladı. Hemen hüplet!",
      emojis: "🍓🧊🍓🤤"
    },
    {
      title: "🍏 ERİK KAMYONU SAMSUN BULUTLARINI DAĞITTI! 🍏",
      desc: "Mikail ile yapılan gizli meteoroloji görüşmeleri olumlu sonuçlandı. Tam 1 kamyon dolusu kütür, bol tuzlu yeşil erik kütüphane kapısına yığılıyor. Şekersiz diyeti bozmaz, şifadır!",
      emojis: "🍏🧂🚛🟢"
    },
    {
      title: "🥞 WAFFLE REÇETESİ ACİL AKTİF! 🥞",
      desc: "Bacak seansı bittiyse ve o meşhur tayt yırtılmadan kurtulduysa Atakum sahilinde bol çikolatalı, dondurmalı, dikey waffle kulesi yemeye hak kazandınız! Sponsorluğu bizzat meclis kararıyla onaylanmıştır.",
      emojis: "🥞🍨💳✨"
    },
    {
      title: "🧖‍♀️ DİNLENME VE BİZ-BİZE MAKYAJ SEANSI! 🧖‍♀️",
      desc: "Acil kaçamak sadece dürümlerle olmaz, keyfiniz yerinde! Şimdi yüzü yıkayıp yumuşacık kremleri sürme, peluş avokadoya sarılıp keyif yapma saati. Kütüphane tozları arındırılsın!",
      emojis: "🧖‍♀️🧴🥑💤"
    }
  ];

  // Specific customized cravers
  const cravingsList = [
    {
      id: "durum",
      name: "Hatay Dürümü 🌯",
      quote: "Söz verildi: 21 günlük şekersizlik diyetin bittiği saniye o sıcacık lavaşa sarılı, bol soslu Hatay Dürümü bizzat Mustafabank sponsorluğunda önüne serilecek!"
    },
    {
      id: "erik",
      name: "Tuzlu Ekşi Erik 🍏",
      quote: "Tuzlu ekşi erik... Paragrafların beynini yorduğu o en sinirli saniyede Mikail'den rüzgar kesici dualarla dondurulmuş çilek yanına kütür erikler sevk edildi!"
    },
    {
      id: "strawberry",
      name: "Dondurulmuş Çilek 🍓",
      quote: "Buzluktan yeni çıkmış kıtır kıtır dondurulmuş çilekler! Üzerine fısıldanan sevgi akortlarıyla KPSS kütüphanesine özel doping!"
    },
    {
      id: "komagene",
      name: "Komagene Çiğköfte 🌯",
      quote: "Bizim mor tabelalı dükkan planı! 'Niye milletin dükkanında çiğköfte yiyoruz' isyanıyla fışkıran o bol acılı çiğköfte franchise lezzeti çok yakında Mor Tabelayla!"
    },
    {
      id: "quark",
      name: "Dondurmalı Meyveli Quark 🍨",
      quote: "Aslında Quark artık gına getirmişti ama Musti içine dondurma tozu ve orman meyveleri atınca erimiş olan quark dondurmasına dönüştü. Afiyet olsun güzeller güzeline!"
    },
    {
      id: "baklava",
      name: "Soğuk Baklava 🍫",
      quote: "Gaziantep'ten Samsun kütüphanesine doğrudan uzanan o kadifemsi, sütlü soğuk baklava rüyası... Sen bu denemeyi bitir, 3 dilim buz gibi soğuk baklava Musti'den sana helal olsun İloşum!"
    },
    {
      id: "waffle",
      name: "Belçika Waffle 🧇",
      quote: "Atakum sahilinde, o ılık meltemde, çilekli ve muzlu çıtır waffle... Kütüphanede çözdüğün her 100 soru için waffle'a ekstra Antep fıstığı ekliyoruz İloşum!"
    },
    {
      id: "latte",
      name: "Buzlu Karamel Latte ☕",
      quote: "Konsantrasyonun tavan yapacağı saniyede buz gibi, bol köpüklü, karamel şuruplu bir kahve... Samsun kütüphane masasında ders çalışırken yudumlaman için Musti'nin elinden!"
    },
    {
      id: "patates",
      name: "Çıtır Fırın Patates 🍟",
      quote: "Diyetteyiz ama çıtır patatese kim hayır diyebilir? Yağsız ve fırınlanmış baharatlı çıtır patatesler İlker Hoca'nın gözünden kaçarak diyete uyum sağlar İloşum, dert etme!"
    },
    {
      id: "katmer",
      name: "Fit Fıstıklı Katmer 🥞",
      quote: "Diyeti tamamen patlatmayan, fıstığı bol, şekeri sıfır, proteinli fit katmer! Hem kaslarını korur hem de tatlı krizini Mustafabank garantisiyle sonlandırır!"
    },
    {
      id: "limonata",
      name: "Çilekli Limonata 🍓",
      quote: "Buz gibi, taze nane yapraklı ve çilekli ev yapımı limonata... Kütüphanenin sıcak günlerinde içini ferahlatacak ve enerjine can suyu katacak!"
    },
    {
      id: "cigkofte_durum",
      name: "Acılı Çiğköfte Dürüm 🌯",
      quote: "Yeşilliği bol, bol limonlu, nar ekşili, insanın canını çektiren efsane Atakum dürümü... Musti ile Atakum sahilinde gün batımında çiğköfte partisi planı kilitlendi!"
    }
  ];

  // Persistence triggers
  useEffect(() => {
    localStorage.setItem("ilo_weekly_gym_map", JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem("ilo_gym_logs_new", JSON.stringify(gymLogs));
  }, [gymLogs]);

  useEffect(() => {
    localStorage.setItem("ilo_sugar_free_days_new", String(sugarFreeDays));
  }, [sugarFreeDays]);

  // Update weekly program day
  const handleProgramChange = (dayName: string, newType: string) => {
    setWeeklyPlan(weeklyPlan.map(w => w.dayName === dayName ? { ...w, programType: newType } : w));
  };

  const toggleDayComplete = (dayName: string) => {
    setWeeklyPlan(weeklyPlan.map(w => w.dayName === dayName ? { ...w, completed: !w.completed } : w));
  };

  // Add a history gym session log
  const handleAddGymLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: GymLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      sessionType: logSubject,
      durationMinutes: logDuration,
      pushedByTrainer: logPushed,
      leggingsSafe: true
    };
    setGymLogs([newLog, ...gymLogs]);
  };

  const deleteGymLog = (id: string) => {
    setGymLogs(gymLogs.filter(log => log.id !== id));
  };

  const startEditGymLog = (log: GymLog) => {
    setEditingLogId(log.id);
    setEditedDuration(log.durationMinutes);
    setEditedType(log.sessionType);
  };

  const saveEditGymLog = (id: string) => {
    setGymLogs(gymLogs.map(log => log.id === id ? { ...log, durationMinutes: editedDuration, sessionType: editedType } : log));
    setEditingLogId(null);
  };

  const triggerKacamakSurprise = () => {
    // Increment index to rotate and shuffle through different messages each click!
    setKacamakIndex((prev) => (prev + 1) % kacamakSurprises.length);
    setShowKacamakAlert(true);
  };

  return (
    <div className="space-y-6" id="fitness_nutrition_hub_v2">
      
      {/* SECTION A: Cravings and 21 Days Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Şekersiz Hayat & 21-Day Streaks (5 cols) */}
        <div className="lg:col-span-5 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-vp-lightpink/35 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Cake className="text-vp-pink w-6 h-6 shrink-0" />
              <h4 className="text-sm font-black text-vp-maroon uppercase tracking-tight font-display">Şekersiz Hayat Dayanıklılığı</h4>
            </div>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mb-4 uppercase">
               İloş'un efsanevi tatlı direnç zinciri
            </p>

            <div className="bg-vp-bg border-2 border-vp-borderpink rounded-2xl p-5 mb-4 text-center shadow-inner relative">
              <Flame className="w-8 h-8 text-vp-pink mx-auto animate-bounce mb-1" />
              <div className="text-4xl font-mono font-black text-vp-maroon" id="sugarfree_streak_v2">
                {sugarFreeDays} / 21 GÜN
              </div>
              <p className="text-[10px] text-vp-darkpink font-sans font-bold mt-1 uppercase tracking-widest">
                TATLI VE KOLA SAVAŞÇISI UNVANI
              </p>

              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setSugarFreeDays(Math.max(0, sugarFreeDays - 1))}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  -1 Gün
                </button>
                <button
                  onClick={() => setSugarFreeDays(Math.min(21, sugarFreeDays + 1))}
                  className="bg-vp-pink hover:bg-vp-pink/90 text-white px-4 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer border-b-2 border-r-2 border-vp-maroon shadow transition-all"
                >
                  +1 Gün İlerle! 🚀
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-mono font-bold text-slate-400 text-center uppercase tracking-wide">
            Süreç dolduğunda dondurmalı waffle seansları başlayacak!
          </p>
        </div>

        {/* 2. Güncel Tatlı / Çiğköfte Krizini Çöz (7 cols) */}
        <div className="lg:col-span-7 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Star className="text-vp-pink w-5 h-5 shrink-0" />
              <h4 className="text-sm font-black text-vp-maroon font-display uppercase">Güncel Kaçamak Kriz Çözücü 🧠</h4>
            </div>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider mb-4 uppercase">
               Kriz yaşadığın besini seç, Musti'nin akort formülünü fısıldayalım
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {cravingsList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCravingClick(c.id)}
                  className={`p-2 rounded-xl text-left border text-2xs cursor-pointer transition-all flex items-center gap-1.5 font-bold ${
                    selectedCraving === c.id 
                      ? "bg-vp-bg border-vp-borderpink text-vp-maroon" 
                      : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                  }`}
                  id={`craving_tab_${c.id}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-vp-pink animate-pulse shrink-0" />
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>

            {/* Answer Display */}
            <div className="mt-4 bg-slate-50 border border-slate-205 p-3.5 rounded-2xl min-h-[110px] flex flex-col justify-center relative">
              {selectedCraving ? (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-mono font-black text-vp-pink uppercase tracking-widest block">MUSTAFABANK GÜVENCESİ:</span>
                    <button
                      onClick={() => handleCravingClick(selectedCraving)}
                      className="bg-vp-pink/10 hover:bg-vp-pink/20 text-vp-pink font-mono font-black text-[8px] px-1.5 py-0.5 rounded transition-transform active:scale-95 cursor-pointer flex items-center gap-0.5"
                    >
                      DİĞERİNİ FISILDA 🌀
                    </button>
                  </div>
                  <p className="text-2xs text-slate-800 font-sans leading-relaxed font-semibold italic">
                    "{cravingQuote || cravingsList.find(c => c.id === selectedCraving)?.quote}"
                  </p>
                </div>
              ) : (
                <p className="text-center text-xs text-slate-400 italic">
                  "Yandaki listeden kriz anının başrolünü seçiver..."
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* SECTION B: Weekly Gym planning calendar & Gym logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Gym Planner Map - 8 cols */}
        <div className="lg:col-span-8 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Dumbbell className="text-vp-pink w-5 h-5 shrink-0 animate-spin-slow" />
              <div>
                <h3 className="text-md font-black text-vp-maroon font-display">
                  İlker'in Mix-Pestil Programı: Haftalık Gym Haritası 🗺️🏋️‍♀️
                </h3>
                <p className="text-xs text-slate-500 font-sans font-semibold">
                  Hepsinden haftalık antrenman türü haritanı tasarla, bittikçe işaretleyip kaydet!
                </p>
              </div>
            </div>
          </div>

          {/* Map Grid days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
            {weeklyPlan.map((p) => (
              <div 
                key={p.dayName}
                className={`p-3 rounded-2xl border flex flex-col justify-between min-h-[140px] shadow-2xs transition-all relative ${
                  p.completed 
                    ? "bg-purple-50/55 border-vp-borderpink text-vp-maroon font-black" 
                    : "bg-slate-50/60 border-slate-200 text-slate-700"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider font-extrabold text-slate-400 mb-2 border-b border-slate-200/50 pb-1">
                    <span>{p.dayName}</span>
                    <button 
                      onClick={() => toggleDayComplete(p.dayName)}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        p.completed ? "bg-vp-pink text-white border-vp-pink" : "bg-white border-slate-350 hover:border-vp-pink"
                      }`}
                    >
                      {p.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </button>
                  </div>
                  
                  {/* Select menu inside day card to dynamically change training program */}
                  <select
                    value={p.programType}
                    onChange={(e) => handleProgramChange(p.dayName, e.target.value)}
                    className="w-full bg-white/80 border border-slate-250 rounded-lg py-1 px-1.5 text-[10px] text-slate-800 outline-none font-bold focus:border-vp-pink cursor-pointer"
                  >
                    {trainingOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>


              </div>
            ))}
          </div>

          <div className="bg-vp-bg border border-vp-borderpink/35 p-3 rounded-xl text-[10px] text-vp-maroon font-black flex justify-between items-center leading-relaxed">
            <span>🏋️‍♀️ Haftalık Isıl Tüketim Skoru: {weeklyPlan.filter(w => w.completed && !w.programType.includes("Dinlenmece")).length * 400} Kcal Yakıldı!</span>
            <span>Musti Bodyguard birliği spor salonu girişinde siper aldı, korkusuzca bas! 🛡️</span>
          </div>
        </div>

        {/* Manual Gym session log form - 4 cols */}
        <div className="lg:col-span-4 bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
          <form onSubmit={handleAddGymLog} className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-5 h-5 text-vp-pink" />
              <h4 className="text-xs font-black text-vp-maroon uppercase tracking-tight font-display">Tarihli Antrenman Defteri</h4>
            </div>

            <div>
              <label className="block text-[9px] font-mono font-black text-slate-500 uppercase mb-1">PROGRAM TÜRÜ</label>
              <select
                value={logSubject}
                onChange={(e) => setLogSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs text-slate-800 focus:border-vp-pink outline-none cursor-pointer font-bold"
              >
                {trainingOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-mono font-black text-slate-500 uppercase mb-1">SÜRE (DK)</label>
                <input
                  type="number"
                  min="10"
                  value={logDuration}
                  onChange={(e) => setLogDuration(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs text-center font-black text-slate-800 focus:border-vp-pink outline-none"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-[9px] font-mono font-black text-slate-500 uppercase mb-1">İLKER HOCA</label>
                <label className="flex items-center gap-1 text-[11px] text-slate-600 font-bold select-none cursor-pointer py-1.5">
                  <input
                    type="checkbox"
                    checked={logPushed}
                    onChange={(e) => setLogPushed(e.target.checked)}
                    className="rounded text-vp-pink focus:ring-vp-pink w-4 h-4 cursor-pointer"
                  />
                  <span>"Baba Kalk! 💀"</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-vp-pink hover:bg-vp-hotpink text-white py-2.5 rounded-xl text-xs font-black shadow border-b-2 border-r-2 border-slate-700 transition-colors cursor-pointer"
            >
              + Antrenman Kronolojisine Ekle
            </button>
          </form>
        </div>

      </div>

      {/* SECTION C: Integrated Antrenman Kronolojisi Logs */}
      <div className="bg-white border-b-8 border-r-8 border-vp-borderpink rounded-[2rem] p-6 shadow-xl">
        <h4 className="text-md font-black text-vp-maroon font-display tracking-tight flex items-center gap-2 mb-4">
          <Timer className="w-5 h-5 text-vp-pink" /> Gym Seansları Antrenman Kronolojisi
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-800 border-collapse">
            <thead>
              <tr className="border-b border-slate-205 text-[10px] font-mono tracking-wider font-extrabold text-vp-maroon uppercase bg-slate-55/60 text-slate-500">
                <th className="py-2 px-3">Tarih</th>
                <th className="py-2 px-3">Antrenman Türü</th>
                <th className="py-2 px-3">Süre</th>
                <th className="py-2 px-3">İlker Teşviki</th>
                <th className="py-2 px-3 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {gymLogs.map((log) => {
                const isEditing = editingLogId === log.id;
                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition-all">
                    <td className="py-3 px-3 font-mono font-bold text-slate-500 align-middle">
                      {log.date}
                    </td>
                    
                    <td className="py-3 px-3 align-middle text-left">
                      {isEditing ? (
                        <select
                          value={editedType}
                          onChange={(e) => setEditedType(e.target.value)}
                          className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-800 outline-none"
                        >
                          {trainingOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-sans font-black text-vp-maroon uppercase tracking-wider">
                          {log.sessionType}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 align-middle font-mono text-left">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="5"
                            value={editedDuration}
                            onChange={(e) => setEditedDuration(Number(e.target.value))}
                            className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-center font-black text-xs text-slate-800"
                          />
                          <span className="text-[10px] text-slate-400 font-bold">Dk</span>
                        </div>
                      ) : (
                        <span className="text-sm font-black">{log.durationMinutes} Dakika</span>
                      )}
                    </td>

                    <td className="py-3 px-3 align-middle font-sans text-left">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold border ${
                        log.pushedByTrainer ? "bg-red-50 border-red-200 text-red-650" : "bg-slate-105 border-slate-200 text-slate-650"
                      }`}>
                        {log.pushedByTrainer ? "CALLED OUT 💀" : "DENGELİ"}
                      </span>
                    </td>

                    <td className="py-3 px-3 align-middle text-right whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => saveEditGymLog(log.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg cursor-pointer transition-all shadow-sm"
                            title="Değişiklikleri Onayla"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingLogId(null)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1.5 rounded-lg cursor-pointer transition-all"
                            title="İptal Et"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => startEditGymLog(log)}
                            className="bg-vp-bg text-vp-maroon hover:bg-vp-lightpink p-1.5 rounded-lg border border-vp-borderpink/40 cursor-pointer transition-all"
                            title="Hızlı Düzenle"
                          >
                            <Edit3 className="w-3.5 h-3.5 animate-pulse" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteGymLog(log.id)}
                            className="bg-red-50 text-red-500 hover:bg-red-100 p-1.5 rounded-lg border border-red-200 cursor-pointer transition-all"
                            title="Kaydı Tamamen Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {gymLogs.length === 0 && (
            <p className="text-center text-xs text-slate-400 py-4 italic font-sans">Henüz girilmiş bir kronoloji seansı yok!</p>
          )}
        </div>
      </div>

      {/* Musti Acil Kaçamak Surprise Modal */}
      {showKacamakAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/35 backdrop-blur-md">
          <div className="bg-white border-b-8 border-r-8 border-purple-500 rounded-[2.5rem] p-8 max-w-md text-center shadow-2xl relative animate-[bounce_0.6s_ease-out_1]">
            <div className="text-5xl mb-3 animate-pulse">{kacamakSurprises[kacamakIndex].emojis}</div>
            
            <h4 className="text-sm font-black text-purple-950 font-display uppercase tracking-tight">
              {kacamakSurprises[kacamakIndex].title}
            </h4>
            
            <p className="text-xs text-slate-800 leading-relaxed font-sans mt-3 font-semibold pb-4 border-b border-slate-100">
              "{kacamakSurprises[kacamakIndex].desc}"
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center items-center">
              <button
                onClick={triggerKacamakSurprise}
                className="bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs px-4 py-2 rounded-xl font-bold border border-purple-300 transition-colors"
              >
                🔄 Bir Başka Kaçamak Kapısı Aç!
              </button>
              <button
                onClick={() => setShowKacamakAlert(false)}
                className="bg-purple-650 hover:bg-purple-750 text-white text-xs px-5 py-2.5 rounded-xl font-black transition-colors shadow-md shadow-purple-200"
              >
                Kapat & Sınava Odaklan!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
