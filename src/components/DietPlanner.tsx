import React, { useState, useEffect } from "react";
import { Plus, Coffee, Apple, Sparkles, TrendingUp, RefreshCw, Trash2, Heart, Check, Save } from "lucide-react";

interface DietMeal {
  id: string;
  category: "Kahvaltı" | "Öğle Yemeği" | "Akşam Yemeği" | "Ara Öğün / Atıştırmalık";
  name: string;
  calories: number;
  macros: string;
  checked: boolean;
}

interface SavedDietSummary {
  id: string;
  date: string;
  totalCalories: number;
  mealsList: { name: string; calories: number }[];
}

export default function DietPlanner() {
  // Programmatic builder generating over 100 uniquely customized Turkish dietitian meal options
  const generate100Meals = (): DietMeal[] => {
    const list: DietMeal[] = [];
    
    const breakfastTemplates = [
      { base: "Dereotlu & Maydanozlu 3 Yumurta Akı Omleti + 1 Sarısı 🍳", calories: 195, macros: "24g Pro / 2g Karb / 9g Yağ" },
      { base: "Tava Muzlu Tarçınlı Fit Yulaf Krepi + 3 Dilim Çilek 🥞🍓", calories: 230, macros: "9g Pro / 34g Karb / 5g Yağ" },
      { base: "Sarı Sarısı Akort Çılbır (Yoğurtlu Üstü 2 Yumurta) 🍯🥚", calories: 210, macros: "14g Pro / 4g Karb / 14g Yağ" },
      { base: "Haşlanmış Yumurtalı & Taze Avokado Ezmeli 1 Dilim Ekşi Mayalı Çavdar Ekmeği 🥑🍞", calories: 220, macros: "12g Pro / 15g Karb / 12g Yağ" },
      { base: "Sıcak Sütle Pişmiş Fit Yulaf Lapası + Antep Fıstığı Ezmesi Dokunuşu 🥣🥜", calories: 245, macros: "10g Pro / 36g Karb / 6g Yağ" },
      { base: "Kepekli & Beyaz Peynirli Domatesli Atakum Yağsız Tostu 🥪🍅", calories: 185, macros: "11g Pro / 22g Karb / 4g Yağ" },
      { base: "Hindi Fümeli Izgara Çedar Dolgulu Fit Yumurta Kapaması 🥚🧀", calories: 205, macros: "18g Pro / 2g Karb / 13g Yağ" },
      { base: "Fırınlanmış Susuz Lor Peyniri Sote, Çeri Domatesler & Taze Dereotu Tabağı 🥗🧀", calories: 140, macros: "16g Pro / 5g Karb / 6g Yağ" },
      { base: "Çilekli Protein Tozlu & Yulaflı Soğuk Kahvaltılık Smooth Kase 🥛🍓", calories: 260, macros: "26g Pro / 28g Karb / 3g Yağ" },
      { base: "Göz Yumurta Üzeri Pul Biberli Taze Semizotu Salatası & Çörek Otu 🍳🌱", calories: 175, macros: "13g Pro / 3g Karb / 12g Yağ" }
    ];

    const lunchTemplates = [
      { base: "Izgara Tavuk Göğsü, Fırınlanmış Kabak Dilimleri & 5 Yemek Kaşığı Bulgur Pilavı 🍗", calories: 390, macros: "42g Pro / 26g Karb / 7g Yağ" },
      { base: "Limonlu Yağsız Ton Balıklı Karışık Bahçe Salatası & Mercimek Çorbası 🍲🥗", calories: 320, macros: "28g Pro / 22g Karb / 11g Yağ" },
      { base: "Soya Soslu Marine Edilmiş Izgara Hindi Dilimleri & Zeytinyağlı Kinoa Tabağı 🥗🦃", calories: 345, macros: "38g Pro / 18g Karb / 8g Yağ" },
      { base: "Az Yağlı Yoğurtlu Süzme Kabak Sote & 4 Adet Ev Yapımı Izgara Köfte 🧆🥒", calories: 330, macros: "31g Pro / 14g Karb / 13g Yağ" },
      { base: "Zeytinyağlı Kuru Fasulye Sote, Fırınlanmış Yağsız İstiridye Mantar Şişleri 🍄🥗", calories: 295, macros: "14g Pro / 38g Karb / 7g Yağ" },
      { base: "Haşlanmış Mercimekli Lorlu Fit Akdeniz Salatası & Limonlu Köz Kırmızı Biber 🌶️🥗", calories: 250, macros: "18g Pro / 24g Karb / 8g Yağ" },
      { base: "Sulu Domates Soslu Fırınlanmış Fit Sebzeli Tavuk Burger Köftesi 🍔🥦", calories: 280, macros: "29g Pro / 11g Karb / 12g Yağ" },
      { base: "Haşlanmış Nohutlu & Karidesli Maydanoz Salatası, Nar Ekşili Hafif Yağlı Sos 🦐🥗", calories: 310, macros: "26g Pro / 20g Karb / 9g Yağ" },
      { base: "Izgara Bonfile Dilimleri, Sote Brüksel Lahanası & Hardallı Sos 🥩🥦", calories: 350, macros: "36g Pro / 8g Karb / 18g Yağ" },
      { base: "Bulgurlu Pazı Sarması (Yağsız Ev Yapımı Yoğurt Eşliğinde) 🥬🥛", calories: 270, macros: "12g Pro / 32g Karb / 9g Yağ" }
    ];

    const dinnerTemplates = [
      { base: "Fırında Levrek Fileto / Somon Izgara, Yanında Bol Rokalı Limon Salatası 🐟🥗", calories: 340, macros: "36g Pro / 8g Karb / 15g Yağ" },
      { base: "Zeytinyağlı Ev Yapımı Enginar Kalbi & Sumaklı Pul Biberli Lor Salatası 🥗🍋", calories: 215, macros: "6g Pro / 28g Karb / 8g Yağ" },
      { base: "Yağsız Tavuklu Sebzeli Fırın Güveç & Yanında Taze Dereotlu Cacık 🍲🥛", calories: 280, macros: "32g Pro / 15g Karb / 8g Yağ" },
      { base: "Haşlama Dana Dilimleri, Izgara Kuşkonmaz & Pul Biberli Karışık Yeşillik Tabağı 🥩🥬", calories: 310, macros: "38g Pro / 4g Karb / 12g Yağ" },
      { base: "Az Yağlı Kaşar Rendeli Fırın Karnabahar & Brokoli Graten 🥦🧀", calories: 265, macros: "18g Pro / 20g Karb / 12g Yağ" },
      { base: "Hindi Kıymalı Kabak Spagetti (Kabaktan Doğranmış Fit Makarna) 🍝🦃", calories: 240, macros: "28g Pro / 14g Karb / 8g Yağ" },
      { base: "Zeytinyağlı Bamya / Taze Fasulye Yemeği & 4 Yemek Kaşığı Yoğurt 🥬🥛", calories: 220, macros: "8g Pro / 22g Karb / 9g Yağ" },
      { base: "Sarımsaklı Yoğurt Soslu Fırınlanmış İstiridye Mantarı & Kıtır Çavdar Ekmekleri 🧄🍄", calories: 190, macros: "9g Pro / 24g Karb / 5g Yağ" },
      { base: "Közlenmiş Patlıcan Salatası Yatağında 150g Izgara Tavuk Sote (Yağsız) 🍗🍆", calories: 320, macros: "34g Pro / 10g Karb / 14g Yağ" },
      { base: "Erişte Kıvamında Soslu Havuç ve Kabak Sote, Üzerine Süzme Peynir Rendesi 🥕🧀", calories: 180, macros: "9g Pro / 18g Karb / 7g Yağ" }
    ];

    const snackTemplates = [
      { base: "10 Adet Çiğ Badem, Soğuk Sade Maden Suyu & Filtre Kahve ☕🥜", calories: 120, macros: "4g Pro / 4g Karb / 10g Yağ" },
      { base: "Süzme Yoğurt Kasesi, Üzerine Kıtır Ekşi Yeşil Erik Dilimleri & Karışık Otlar 🍏🍇", calories: 110, macros: "8g Pro / 14g Karb / 2g Yağ" },
      { base: "Erimiş Olan Meyveli Quark Dondurması (Buzlukta Altın Kaşıklı) 🍨🍓", calories: 135, macros: "10g Pro / 18g Karb / 1g Yağ" },
      { base: "Dilimlenmiş Ekşi Yeşil Elma & 1 Tatlı Kaşığı Doğal Tuzsuz Fıstık Ezmesi 🍏🥜", calories: 115, macros: "3g Pro / 16g Karb / 5g Yağ" },
      { base: "2 Adet Fit Kakao ile Pişmiş Hurma Lazanyası / Hurma Topu & Türk Kahvesi ☕🍘", calories: 98, macros: "2g Pro / 18g Karb / 2g Yağ" },
      { base: "Sumaklı ve Limonlu Baharatlı Fırınlanmış Kabak Dilimleri / Kıtır Salatalık 🥒🌶️", calories: 65, macros: "2g Pro / 8g Karb / 1g Yağ" },
      { base: "3 Adet Yağsız Pirinç Patlağı Üstüne Hindi Füme & Süzme Labne 🍘🥩", calories: 145, macros: "11g Pro / 18g Karb / 3g Yağ" },
      { base: "Izgara Kuşkonmaz Çubukları, Soya Sosu & Çiğ Kaju Fıstığı 🎋🥜", calories: 125, macros: "5g Pro / 10g Karb / 8g Yağ" },
      { base: "1 Avuç Çeri Domates, 2 Dilim Süzme Peynir & Taze Demleme Melisa Çayı 🍅🧀", calories: 90, macros: "6g Pro / 4g Karb / 6g Yağ" },
      { base: "Yağsız Süte Çalkalanmış Wheyli Çilekli Protein Shake İçeceği 🥛🥤", calories: 150, macros: "24g Pro / 5g Karb / 2g Yağ" }
    ];

    const prefixVariations = [
      "Atakum Sahili esintili: ",
      "İlker Hoca Piliç Savar formülüyle: ",
      "Mustafabank Güvenceli: ",
      "Dondurmalı Waffle rüyasından önce: ",
      "Kuzen Bahçesinden Taze El Atılmış: ",
      "Samsun Kütüphanesinin Altın Odasından: ",
      "Mikail Rüzgar Kırıcı dualarla dolma: ",
      "Diyet İradesini Göklere Çıkaran: "
    ];

    const postfixVariations = [
      " (Asla diyeti bozmana değmeyecek o eşsiz hafiflik!)",
      " (İlker Hoca'nın bacak antrenmanına can suyu!)",
      " (Musti'den kütüphane masasına acil motivasyon tabağı!)",
      " (Moral depolayan fit asalet başyapıtı!)",
      " (21 günlük şekersizlik zincirinin göz bebeği!)",
      " (Kasları koruyan ve yağları eriten özel formül!)",
      " (Saray soylularını kıskandıran zayıflama reçetesi!)",
      " (Kuzenin özel onaylı, Atakum yürüyüşü yoldaşı!)"
    ];

    const buildGroup = (templates: typeof breakfastTemplates, category: any, catCode: string) => {
      // Generate 27 items for this category to reach 108 total scenarios
      for (let i = 0; i < 27; i++) {
        const template = templates[i % templates.length];
        const prefix = prefixVariations[i % prefixVariations.length];
        const postfix = postfixVariations[Math.floor(i / 1.5) % postfixVariations.length];
        
        const calorieDiff = (i * 3) - 30; // varies within -30 to +50
        const cal = Math.max(50, template.calories + calorieDiff);
        
        const parts = template.macros.split("/");
        const p = Math.max(1, Math.round(Number(parts[0].replace(/\D/g, "")) * (cal / template.calories || 1)));
        const c = Math.max(1, Math.round(Number(parts[1].replace(/\D/g, "")) * (cal / template.calories || 1)));
        const f = Math.max(1, Math.round(Number(parts[2].replace(/\D/g, "")) * (cal / template.calories || 1)));
        
        list.push({
          id: `gen_${catCode}_${i}`,
          category: category,
          name: `${prefix}${template.base}${postfix}`,
          calories: cal,
          macros: `${p}g Pro / ${c}g Karb / ${f}g Yağ`,
          checked: false
        });
      }
    };

    buildGroup(breakfastTemplates, "Kahvaltı", "b");
    buildGroup(lunchTemplates, "Öğle Yemeği", "l");
    buildGroup(dinnerTemplates, "Akşam Yemeği", "d");
    buildGroup(snackTemplates, "Ara Öğün / Atıştırmalık", "s");

    return list;
  };

  const ALL_MEAL_SUGGESTIONS = generate100Meals();

  // Suggestions index seed to randomize pools
  const [suggestionsSeed, setSuggestionsSeed] = useState<number>(0);

  // Active meals in the daily summaries (saved in localStorage)
  const [activeMeals, setActiveMeals] = useState<DietMeal[]>(() => {
    const saved = localStorage.getItem("ilo_active_meals_v2");
    return saved ? JSON.parse(saved) : [
      {
        id: "m_init1",
        category: "Kahvaltı",
        name: "3 Yumurta Akı Omleti + 1 Sarısı, Bol Maydanozlu & Lor Peynirli 🍳",
        calories: 195,
        macros: "24g Pro / 2g Karb / 9g Yağ",
        checked: true
      },
      {
        id: "m_init2",
        category: "Ara Öğün / Atıştırmalık",
        name: "Bir Olan Ekşi Yeşil Erik & Frambuaz Soslu Fit Süzme Yoğurt Kasesi 🍏🍇",
        calories: 110,
        macros: "8g Pro / 14g Karb / 2g Yağ",
        checked: true
      }
    ];
  });

  // Saved diet summaries log history
  const [savedSummaries, setSavedSummaries] = useState<SavedDietSummary[]>(() => {
    const saved = localStorage.getItem("ilo_saved_diet_summaries");
    return saved ? JSON.parse(saved) : [
      {
        id: "save_init_1",
        date: "3 Haziran 2026 Çarşamba",
        totalCalories: 305,
        mealsList: [
          { name: "3 Yumurta Akı Omleti + 1 Sarısı, Bol Maydanozlu & Lor Peynirli 🍳", calories: 195 },
          { name: "Bir Olan Ekşi Yeşil Erik & Frambuaz Soslu Fit Süzme Yoğurt Kasesi 🍏🍇", calories: 110 }
        ]
      }
    ];
  });

  // State to filter active suggestions category tabs on the left
  const [activeCategoryTab, setActiveCategoryTab] = useState<DietMeal["category"]>("Kahvaltı");

  // Custom meal forms
  const [customMealName, setCustomMealName] = useState("");
  const [customMealCal, setCustomMealCal] = useState(150);
  const [customMealMacros, setCustomMealMacros] = useState("12g Pro / 18g Karb / 4g Yağ");

  // Plan feedback flags
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem("ilo_active_meals_v2", JSON.stringify(activeMeals));
  }, [activeMeals]);

  useEffect(() => {
    localStorage.setItem("ilo_saved_diet_summaries", JSON.stringify(savedSummaries));
  }, [savedSummaries]);

  // Deterministic shuffled suggestions pull based on current seed & category
  const getSuggestionsForCategory = (cat: DietMeal["category"]) => {
    const fullList = ALL_MEAL_SUGGESTIONS.filter(item => item.category === cat);
    // Dynamic pseudo-random deterministic rotation
    const rotateOffset = suggestionsSeed % fullList.length;
    const items = [...fullList];
    
    // Perform simple rotation shifting
    for (let i = 0; i < rotateOffset; i++) {
      const first = items.shift();
      if (first) items.push(first);
    }
    // Return top 3 suggestions
    return items.slice(0, 3);
  };

  // Trigger suggestions refresh
  const triggerSuggestionsRefresh = () => {
    setSuggestionsSeed(prev => prev + 1);
  };

  // Add suggestion item to the chosen board (right side)
  const addMealToPlan = (meal: DietMeal) => {
    // Check if food already added to avoid duplication
    if (activeMeals.some(m => m.name === meal.name)) {
      return;
    }
    const newMeal: DietMeal = {
      ...meal,
      id: Date.now().toString() + Math.random().toString(),
      checked: true // auto check-in as consumed
    };
    setActiveMeals([...activeMeals, newMeal]);
  };

  // Add fully custom meal from form
  const handleAddCustomMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMealName.trim()) return;

    const newMeal: DietMeal = {
      id: Date.now().toString(),
      category: activeCategoryTab,
      name: customMealName.trim(),
      calories: Number(customMealCal) || 120,
      macros: customMealMacros || "Besleyici Makrolar ✨",
      checked: true
    };

    setActiveMeals([...activeMeals, newMeal]);
    setCustomMealName("");
    setCustomMealCal(150);
    setCustomMealMacros("15g Pro / 10g Karb / 4g Yağ");
  };

  const deleteMeal = (id: string) => {
    setActiveMeals(activeMeals.filter(m => m.id !== id));
  };

  const toggleChecked = (id: string) => {
    setActiveMeals(activeMeals.map(m => m.id === id ? { ...m, checked: !m.checked } : m));
  };

  const clearAllMeals = () => {
    setActiveMeals([]);
  };

  // Target metrics calculations
  const calorieLimitTarget = 1450;
  const totalConsumedCals = activeMeals.filter(m => m.checked).reduce((sum, m) => sum + m.calories, 0);
  const percentComplete = Math.min(100, Math.round((totalConsumedCals / calorieLimitTarget) * 100));

  const saveDailyPlan = () => {
    if (activeMeals.length === 0) return;
    
    // Save to historical summaries array
    const timestampStr = new Date().toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const formattedTime = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

    const newLog: SavedDietSummary = {
      id: "summary_" + Date.now(),
      date: `${timestampStr} (${formattedTime})`,
      totalCalories: totalConsumedCals,
      mealsList: activeMeals.filter(m => m.checked).map(m => ({ name: m.name, calories: m.calories }))
    };

    setSavedSummaries([newLog, ...savedSummaries]);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3500);
  };

  const deleteSummary = (id: string) => {
    setSavedSummaries(savedSummaries.filter(s => s.id !== id));
  };

  const categoriesOrder: DietMeal["category"][] = [
    "Kahvaltı", "Öğle Yemeği", "Akşam Yemeği", "Ara Öğün / Atıştırmalık"
  ];

  const currentCategorySuggestions = getSuggestionsForCategory(activeCategoryTab);

  return (
    <div className="space-y-6" id="diet_planner_mega_turkish_wrap">
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl" id="diet_planner_mega_turkish">
        
        {/* Title block */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Apple className="text-vp-green w-6 h-6 shrink-0" />
            <div>
              <h3 className="text-md sm:text-lg font-black tracking-tight text-vp-forest font-display">
                İloş'un Fit Diyet Menüsü & Özet Tablosu 🥗🥑
              </h3>
              <p className="text-[10px] text-slate-500 font-sans font-medium">
                Samsun spor diyetisyenleri elinden taptaze, hafif mutfak akortları!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerSuggestionsRefresh}
            className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-800 text-[10px] font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1 shrink-0 animate-pulse active:scale-95"
            title="Diyetisyen Önerilerini Yenileyip Farklı Alternatifler Listeler"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-emerald-600" /> ÖNERİLERİ YENİLE 🔄
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Suggestions selection (7 cols) */}
          <div className="lg:col-span-7 space-y-4 border-r border-slate-100 pr-0 lg:pr-6">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl">
              <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">DİYETİSYEN REÇETE ÖNERİLERİ</span>
              <span className="text-[9px] font-mono text-vp-green font-extrabold">+ Butonuna Basarak Aktar</span>
            </div>

            {/* Categories Tab selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scroll-smooth custom-scrollbar-thin">
              {categoriesOrder.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTab(cat)}
                  className={`px-3 py-2 rounded-xl text-3xs sm:text-2xs font-black transition-all whitespace-nowrap cursor-pointer border ${
                    activeCategoryTab === cat
                      ? "bg-vp-greenbg border-vp-greenborder text-vp-forest shadow-sm"
                      : "bg-white border-slate-200 text-slate-650 hover:bg-slate-150"
                  }`}
                  id={`diet_category_tab_${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dynamic, randomly rotating recommendation lists */}
            <div className="space-y-2 max-h-[330px] overflow-y-auto pr-1 custom-scrollbar">
              {currentCategorySuggestions.map((meal) => (
                <div 
                  key={meal.id}
                  className="bg-slate-50/65 hover:bg-slate-50 border border-slate-200 p-3.5 rounded-2xl transition-all flex justify-between items-center gap-3 group"
                  id={`diet_suggestion_${meal.id}`}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono">
                      <span className="bg-white border border-slate-250 px-1.5 py-0.5 rounded-md text-slate-500 font-extrabold">
                        {meal.calories} Kcal
                      </span>
                      <span className="text-slate-450 font-bold">Makrolar: {meal.macros}</span>
                    </div>
                    <h5 className="text-[11px] font-sans font-extrabold text-slate-800 leading-snug">{meal.name}</h5>
                  </div>

                  <button
                    onClick={() => addMealToPlan(meal)}
                    className="bg-vp-green hover:bg-opacity-90 text-white w-7 h-7 rounded-lg flex items-center justify-center font-black transition-all cursor-pointer shadow-sm group-hover:scale-105 shrink-0"
                    title="Özet Tabloma Ekle"
                    id={`add_to_plan_btn_${meal.id}`}
                  >
                    +
                  </button>
                </div>
              ))}
              {currentCategorySuggestions.length === 0 && (
                <p className="text-center text-xs text-slate-400 py-6 italic font-medium">Bu kategori için öneri bulunamadı.</p>
              )}
            </div>

            {/* Mini Builder custom form */}
            <form onSubmit={handleAddCustomMeal} className="bg-slate-50 border border-slate-200 p-4 rounded-3xl space-y-3">
              <span className="block text-[9px] font-mono font-black text-vp-forest uppercase tracking-widest border-b border-slate-200 pb-1">
                🛠️ Öneriler Dışı Özel Bir Şey mi Yedin? Kendi Yemeğini Tasarla:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 mb-0.5 uppercase text-left">Özel Yemek İsmi</label>
                  <input
                    type="text"
                    placeholder="Yemeğin adını yaz..."
                    value={customMealName}
                    onChange={(e) => setCustomMealName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800 font-bold focus:border-vp-green outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-mono font-bold text-slate-400 mb-0.5 uppercase">Kalori (Kcal)</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={customMealCal}
                    onChange={(e) => setCustomMealCal(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs text-center font-black focus:border-vp-green outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                <div>
                  <label className="block text-[8px] font-mono font-bold text-slate-400 mb-0.5 uppercase text-left">Protein / Karbonhidrat / Yağ Değerleri</label>
                  <input
                    type="text"
                    placeholder="Örn: 15g Pro / 8g Karb / 3g Yağ"
                    value={customMealMacros}
                    onChange={(e) => setCustomMealMacros(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-705 font-medium focus:border-vp-green outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-vp-green hover:bg-opacity-90 py-1.5 rounded-xl text-3xs font-black text-white uppercase tracking-wider cursor-pointer"
                  >
                    Bunu Günlüğüme Ekle 📝
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Selected Meals Board */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 mb-3">
                <div className="flex items-center gap-1.5 animate-pulse">
                  <Heart className="w-4 h-4 text-vp-green fill-vp-green" />
                  <h4 className="text-xs font-black text-vp-forest uppercase font-display">GÜNLÜK ÖZET PLAN TABLON</h4>
                </div>
                
                <button
                  type="button"
                  onClick={clearAllMeals}
                  className="text-[9px] font-mono font-black text-red-500 hover:underline uppercase cursor-pointer"
                >
                  TEMİZLE
                </button>
              </div>

              {/* Chosen Meals board rendering */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar" id="summary_meals_board">
                {activeMeals.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-2xl border text-left transition-colors flex justify-between items-start gap-2.5 ${
                      item.checked 
                        ? "bg-vp-greenbg border-vp-greenborder/50 text-vp-forest font-bold" 
                        : "bg-white border-slate-200 text-slate-500 line-through"
                    }`}
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <button
                        type="button"
                        onClick={() => toggleChecked(item.id)}
                        className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 cursor-pointer shrink-0 ${
                          item.checked ? "bg-vp-green border-vp-green text-white" : "border-slate-350 bg-white"
                        }`}
                      >
                        {item.checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-1.5 text-[8px] font-mono">
                          <span className="bg-white border px-1.5 py-0.5 rounded-md font-extrabold uppercase text-vp-forest">
                            {item.category}
                          </span>
                          <span>{item.calories} Kcal</span>
                        </div>
                        <p className="text-[11px] font-sans leading-snug mt-1 font-semibold text-slate-800">{item.name}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteMeal(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 shrink-0 cursor-pointer"
                      title="Öğünü Defterden Çıkar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {activeMeals.length === 0 && (
                  <p className="text-center text-xs text-slate-400 py-12 italic font-semibold">
                    "Öğün tablonuz henüz boş! Soldaki kategorilerden zengin porsiyonlar seçip buraya aktarın!"
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {/* Real Calories limits tracker card widget */}
              <div className="bg-vp-greenbg border-2 border-vp-greenborder rounded-2xl p-4 shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-mono font-extrabold text-vp-forest mb-1.5">
                  <span>GÜNLÜK KALORİ KAPASİTESİ REÇETESİ</span>
                  <span>{totalConsumedCals} / {calorieLimitTarget} Kcal ({percentComplete}%)</span>
                </div>
                <div className="w-full bg-slate-205 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-vp-green h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>

                {/* Protein totals, etc. */}
                <div className="mt-2 text-[9px] font-mono text-slate-500 font-bold flex justify-between items-center">
                  <span>Musti'den Akortlu Besin</span>
                  <span>Yarasın Aslan İloş canıma!</span>
                </div>
              </div>

              {/* Save as Plan button */}
              <button
                onClick={saveDailyPlan}
                disabled={activeMeals.length === 0}
                className={`w-full py-2.5 rounded-xl text-xs font-black text-white flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all ${
                  activeMeals.length === 0 
                    ? "bg-slate-300 cursor-not-allowed" 
                    : "bg-vp-green hover:bg-opacity-90 border-b-2 border-r-2 border-slate-700"
                }`}
                id="save_diyet_plan_btn"
              >
                <Save className="w-3.5 h-3.5" /> GÜNLÜK FİT DİYET TABLOMU KAYDET
              </button>

              {showSaveMessage && (
                <div className="bg-vp-greenbg border border-vp-greenborder/45 p-2 rounded-xl text-center text-[10px] text-vp-forest font-black animate-pulse font-sans">
                  ✓ Diyet planı başarıyle akort edilip kaydedildi! Motivasyonunu bozma!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Kaydedilen Günlük Diyet Özetleri Geçmişi */}
      <div className="bg-white border-b-8 border-r-8 border-vp-greenborder rounded-[2rem] p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-vp-green w-5 h-5" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-vp-forest font-display uppercase">
                Kaydedilen Günlük Fit Diyet Özet Arşivi 📋🥑
              </h4>
              <p className="text-[10px] text-slate-500 font-sans font-medium">
                Kaydettiğiniz tüm diyet planları, kalori skorları ve içerdiği lezzetler burada arşivlenir.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 border px-2.5 py-0.5 rounded-md">
            Toplam: {savedSummaries.length} Gün
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {savedSummaries.map((summary) => (
            <div 
              key={summary.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-vp-green transition-all shadow-3xs hover:shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-extrabold text-vp-forest">{summary.date}</span>
                  <button
                    type="button"
                    onClick={() => deleteSummary(summary.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    title="Bu Arşiv Kaydını Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white px-2.5 py-2 rounded-xl border border-slate-150 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-500 font-bold">Toplam Kalori Tüketimi:</span>
                  <span className="text-xs font-mono font-black text-vp-forest bg-vp-greenbg px-2 py-0.5 rounded border border-vp-greenborder/30">
                    {summary.totalCalories} Kcal
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wide">YENİLENLER SEÇKİSİ:</span>
                  <div className="space-y-1 max-h-[100px] overflow-y-auto pr-0.5 custom-scrollbar-thin">
                    {summary.mealsList.map((meal, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] font-sans font-semibold text-slate-700 bg-white/50 px-2 py-1 rounded-lg border border-slate-100">
                        <span className="truncate pr-2">{meal.name}</span>
                        <span className="text-[8.5px] font-mono text-slate-550 shrink-0">{meal.calories} Kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {savedSummaries.length === 0 && (
            <p className="col-span-1 md:col-span-2 text-center text-xs text-slate-400 py-12 italic font-semibold font-sans">
              "Henüz kaydedilmiş diyet özeti bulunmuyor İloşum. Yukarıdaki butona basarak ilk özetini kaydet!"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
