import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Trophy, RotateCcw, Heart, Play, HelpCircle, Star, Grid, 
  Dice5, Compass, HelpCircle as HelpIcon, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Zap, Flame, HelpCircle as RiddleIcon, Search, Eye, AlertCircle
} from "lucide-react";

interface TriviaQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

interface RiddleCard {
  id: string;
  question: string;
  answer: string;
  hint: string;
  revealed: boolean;
}

interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MiniGames() {
  // Navigation for games
  const [activeGame, setActiveGame] = useState<string>("adamAsmaca");

  // Game list metadata for rendering selection
  const gamesList = [
    { id: "adamAsmaca", name: "Adam Asmaca 🎯", icon: "📌", desc: "Kelime tahmini ile dertleri bük!" },
    { id: "zarAtma", name: "Zar Atma Güzeli 🎲", icon: "🎲", desc: "Çift zar at, Musti yorumlarını topla!" },
    { id: "cark", name: "Şans Çarkıfeleği 🎡", icon: "🎡", desc: "Günün sürpriz jestini çarktan kopar!" },
    { id: "tavla", name: "Aşk Tavlası 🏆", icon: "🧮", desc: "Eşsiz tavla deryasında Musti ile düello!" },
    { id: "trivia", name: "Kozmik Trivia 💡", icon: "💡", desc: "İloş ve kütüpane evreninden sorular!" },
    { id: "sayiTahmin", name: "Sayı Tahmin Et 🔮", icon: "🔮", desc: "Gizli sayıyı kozmik ipuçlarıyla bul!" },
    { id: "tasKagit", name: "Taş-Kağıt-Makas ✂️", icon: "🥊", desc: "Musti yapay zekasına meydan oku!" },
    { id: "kartEsleme", name: "Hafıza Kartları 🧠", icon: "🧠", desc: "6 özel simgeyi pürüzsüzce eşleştir!" },
    { id: "labirent", name: "Kozmik Labirent 🦁", icon: "🧭", desc: "Leo'yu engellerden yeşil eriğe ulaştır!" },
    { id: "tarot", name: "Tarot Tepsi Seçimi 🃏", icon: "🃏", desc: "Günün kehanet ve motivasyon kartı!" },
    { id: "dokunPatlat", name: "Balon Patlatmaca 🎈", icon: "🎈", desc: "Ekrandaki neşe balonlarını saniyede patlat!" },
    { id: "yaziTura", name: "Yazı Tura At ✨", icon: "🪙", desc: "Kader madalyonunu pürüzsüzce fırlat!" },
    { id: "yalanMakinesi", name: "Yalan Dedektörü 🕵️‍♀️", icon: "🚨", desc: "İçinden geçen cümlelerin doğruluk oranı!" },
    { id: "hizliTiklama", name: "Hız Reaksiyon Testi ⚡", icon: "⚡", desc: "KPSS butonu için klik refleks testi!" },
    { id: "bilmeceler", name: "Akıllı Bilmeceler 📜", icon: "📜", desc: "Eğlenceli ve akortlu bilmece kartları!" }
  ];

  // ============================================
  // GAME 1: ADAM ASMACA (Hangman) STATE & LOGIC
  // ============================================
  const hangmanWords = ["YESILERIK", "KOMAGENE", "ASLANBURCU", "ATAKUMSAHIL", "KUTUPHANE", "ILKERSAVAR", "ODEMSUYU", "DUALIPA", "MUSTAFABANK", "SACBANDI"];
  const [hangmanWord, setHangmanWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [hangmanStatus, setHangmanStatus] = useState<"playing" | "won" | "lost">("playing");
  const [hangmanMistakes, setHangmanMistakes] = useState(0);

  const initHangman = () => {
    const randomWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    setHangmanWord(randomWord);
    setGuessedLetters([]);
    setHangmanMistakes(0);
    setHangmanStatus("playing");
  };

  const handleGuessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || hangmanStatus !== "playing") return;
    const newGuesses = [...guessedLetters, letter];
    setGuessedLetters(newGuesses);

    if (!hangmanWord.includes(letter)) {
      const mistakes = hangmanMistakes + 1;
      setHangmanMistakes(mistakes);
      if (mistakes >= 6) {
        setHangmanStatus("lost");
      }
    } else {
      // Check if won
      const allLettersGuessed = Array.from(hangmanWord).every(l => newGuesses.includes(l));
      if (allLettersGuessed) {
        setHangmanStatus("won");
      }
    }
  };

  // ============================================
  // GAME 2: ZAR ATMA (Dice Roll) STATE & LOGIC
  // ============================================
  const [diceRoll, setDiceRoll] = useState<{ dice1: number; dice2: number; rolling: boolean; text: string }>({
    dice1: 6,
    dice2: 6,
    rolling: false,
    text: "Zarları fırlatın aslan kraliçem!"
  });

  const rollZar = () => {
    if (diceRoll.rolling) return;
    setDiceRoll(p => ({ ...p, rolling: true }));

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      let review = "";
      if (d1 === 6 && d2 === 6) {
        review = "DÜBEŞŞŞ! 🎲 İloş podyum asaletini konuşturdu, her şey %100 akortlu!";
      } else if (d1 === 1 && d2 === 1) {
        review = "Hepyek! 💀 İlker Hoca bu seansı yakaladı sanırım, acilen limonlu ödem suyu tepsisi!";
      } else if (d1 === d2) {
        review = `Çift ${d1}! Şans kapılarımız açık. Musti'den bir porsiyon waffle jesti kazanıldı!`;
      } else if (d1 + d2 >= 10) {
        review = "Yüksek akort! Sinerjimiz gök kubbeye vuruyor, KPSS paragrafları korkudan titredi.";
      } else {
        review = "Güzel bir karıştırma! Enerjimiz her saniye pürüzsüzce yenilenmeye devam ediyor.";
      }

      setDiceRoll({
        dice1: d1,
        dice2: d2,
        rolling: false,
        text: review
      });
    }, 1000);
  };

  // ============================================
  // GAME 3: ŞANS ÇARKIFELEĞİ STATE & LOGIC
  // ============================================
  const wheelRewards = [
    "Atakum Sahilde Günbatımı Yürüyüşü Güzelliği 🌅",
    "Musti'den Belçika Çikolatalı Sıcacık Waffle 🍫",
    "Bizim İsmi Taşıyacak Olan Mor Tabelalı Komagene Dürümü 🌯",
    "Yere Dökülmeyecek Çıtır Tuzlu Yeşil Erik Tabağı 🍏",
    "KPSS Coğrafya Dağlar Şarkısını Musti'den Dinleme Sözü 📚",
    "Aslan Burcu Asaletinin Nazar Temizleme Sigortası 🛡️",
    "İlker Hoca Gözetimi Dışı 1 Dilim Kaçamak Cookie 🍪",
    "Pürüzsüz REM Uykusu Öncesi Sıcak Ayak Masaj Cihazı Ismarlama 🧖‍♀️"
  ];
  const [spinning, setSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setWheelResult(null);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * wheelRewards.length);
      setWheelResult(wheelRewards[idx]);
      setSpinning(false);
    }, 1100);
  };

  // ============================================
  // GAME 4: AŞK TAVLASI STATE & LOGIC (Interactive duel simulation)
  // ============================================
  const [tavlaState, setTavlaState] = useState({
    iloPosition: 0,
    mustiPosition: 0,
    turn: "ilo", // or 'musti'
    history: "Düello başladı! Pulunu bitişe götürmek için zarları salla!",
    finished: false,
    winner: ""
  });

  const rollTavla = () => {
    if (tavlaState.finished) return;
    const steps = Math.floor(Math.random() * 6) + 1;
    
    if (tavlaState.turn === "ilo") {
      const nextPos = Math.min(tavlaState.iloPosition + steps, 15);
      const isFin = nextPos === 15;
      
      setTavlaState(prev => ({
        ...prev,
        iloPosition: nextPos,
        turn: "musti",
        history: `İloş ${steps} attı ve pulu ${nextPos}. haneye uçurdu! 🦁 Şimdi sıra Musti'de...`,
        finished: isFin,
        winner: isFin ? "İloş Kraliçe" : ""
      }));
      
      // Auto Musti response after a delay
      if (!isFin) {
        setTimeout(() => {
          const mSteps = Math.floor(Math.random() * 6) + 1;
          setTavlaState(current => {
            const mNext = Math.min(current.mustiPosition + mSteps, 15);
            const mFin = mNext === 15;
            return {
              ...current,
              mustiPosition: mNext,
              turn: "ilo",
              history: `Musti ${mSteps} attı ve pulunu ${mNext}. haneye kaydırdı! 🥑 Sıra sende! Zarı at!`,
              finished: mFin,
              winner: mFin ? "Musti" : ""
            };
          });
        }, 1200);
      }
    }
  };

  const resetTavla = () => {
    setTavlaState({
      iloPosition: 0,
      mustiPosition: 0,
      turn: "ilo",
      history: "Yeni düello kuruldu! İlk zarı havalı adımlarınla sen sallayacaksın İloşum!",
      finished: false,
      winner: ""
    });
  };

  // ============================================
  // GAME 5: TRIVIA QUIZ
  // ============================================
  const triviaQuestions: TriviaQuestion[] = [
    {
      question: "İloş'un yorgun ve hırpalandığı KPSS akşamları zihnini anında şarj eden o meşhur, ekşi baş tacı besin hangisidir? 🍏",
      options: ["Çilekli Waffle", "Tuzlanmış Kütür Kütür Yeşil Erik! 🍏", "Buzlu Karamel Latte", "Orman Meyveli Yoğurt"],
      correctIdx: 1,
      explanation: "Kütür kıtır yeşil erik, İloş hanıma anında girdiği sınav stresinden kurtuluş aurası fısıldıyor!"
    },
    {
      question: "Bizim spor salonu bodyguardı koruma Tunahan'ın sisteminin çöktüğü o meşhur 'elendi' anı hangisidir? 🛡️",
      options: ["Temizlik süpürgesini kırması", "Taytın pütürleşmesi sonucunda koruma kalkanını Musti'ye devretmesi 💀", "Diyet listesinde gazlı içecek kaçamağı yapması", "Tarih testinde yanlış şıkkı işaretleyip darlaması"],
      correctIdx: 1,
      explanation: "Hummel taytı yırtılınca koruma sistemleri çökerek narin kalkanını kapıdaki Musti'ye bırakmak zorunda kalmıştır!"
    },
    {
      question: "Bizim gelecekte kurmayı hayal ettiğimiz, franchising tabelası mormor yanan o franchise dükkanı hangisidir? 💜",
      options: ["Görkemli Pastane Zinciri", "Mor Tabelalı Komagene Çiğköfte Bayisi! 🌯", "Atakum Butik Kahvecisi", "Waffle Dünyası"],
      correctIdx: 1,
      explanation: "'Niye başkasının dükkanında yiyoruz İloşum kendi yerimizi açalım' diyerek mor tabelayı sarsılmaz planlarımıza ekledik!"
    },
    {
      question: "Ders aralarında kütüphane sıralarında içimizi sıcacık dumanıyla saran o akortlu çay kime aittir?",
      options: ["Sokak Kafesi", "Kütüphane Sabah Otomatı", "Musti'nin sevgiyle doldurduğu o meşhur termosuna ☕", "Duruşehir Kafe Bölgesi"],
      correctIdx: 2,
      explanation: "Musti'nin titizlikle hazırladığı taptaze çay, kütüphanedeki o kuru paragraf tozlarını saniyede eritiverir!"
    }
  ];
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // ============================================
  // GAME 6: SAYI TAHMİN OYUNU STATE & LOGIC
  // ============================================
  const [targetNumber, setTargetNumber] = useState(25);
  const [userGuess, setUserGuess] = useState("");
  const [guessFeedback, setGuessFeedback] = useState("1 ile 50 arasında bir sayı tuttum. Tahmin etmeye başla canım!");
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessWon, setGuessWon] = useState(false);

  const initSayiTahmin = () => {
    setTargetNumber(Math.floor(Math.random() * 50) + 1);
    setUserGuess("");
    setGuessFeedback("Sayıyı tazeledim! Gücünü göster İloş.");
    setGuessAttempts(0);
    setGuessWon(false);
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gVal = parseInt(userGuess);
    if (isNaN(gVal)) return;

    const atts = guessAttempts + 1;
    setGuessAttempts(atts);

    if (gVal === targetNumber) {
      setGuessFeedback(`Tebrikler İloş! 🎉 ${atts} hakta bildin! Sayı bizzat ${targetNumber} idi!`);
      setGuessWon(true);
    } else if (gVal < targetNumber) {
      setGuessFeedback(`Daha Yüksek! ⬆️ (${gVal} çok küçük kaldı, yıldızını yükselt!)`);
    } else {
      setGuessFeedback(`Daha Düşük! ⬇️ (${gVal} çok büyük, podyum boyunu azıcık hizala!)`);
    }
    setUserGuess("");
  };

  // ============================================
  // GAME 7: ROCK PAPER SCISSORS STATE & LOGIC
  // ============================================
  const [rpsResult, setRpsResult] = useState<{ user: string; ai: string; outcome: string; streak: number }>({
    user: "",
    ai: "",
    outcome: "Lütfen bir hamle seç ve düelloyu tetikle!",
    streak: 0
  });

  const playRPS = (userMove: string) => {
    const moves = ["Taş 🪨", "Kağıt 📄", "Makas ✂️"];
    const aiMove = moves[Math.floor(Math.random() * 3)];
    let outcome = "";
    let newStreak = rpsResult.streak;

    if (userMove === aiMove) {
      outcome = "Dostça berabere! İki dahi aynı akortta titreşti 🥑";
    } else if (
      (userMove.includes("Taş") && aiMove.includes("Makas")) ||
      (userMove.includes("Kağıt") && aiMove.includes("Taş")) ||
      (userMove.includes("Makas") && aiMove.includes("Kağıt"))
    ) {
      outcome = "İloş kazandı! 👑 Kütüphane aslanı fatihi hamlesini nakavt etti.";
      newStreak += 1;
    } else {
      outcome = "Musti kıl payı kazandı! 🍳 'Künefe borcun büyüyor İloşum!'";
      newStreak = 0;
    }

    setRpsResult({
      user: userMove,
      ai: aiMove,
      outcome,
      streak: newStreak
    });
  };

  // ============================================
  // GAME 8: MEMORY CARDS
  // ============================================
  const initialSymbols = ["🥑", "🍏", "📚", "🍿", "👑", "🍪"];
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isMemorySolved, setIsMemorySolved] = useState(false);

  const initMemoryGame = () => {
    const pairs = [...initialSymbols, ...initialSymbols];
    const shuffled = pairs
      .map((sym, index) => ({ id: index, symbol: sym, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    setMemoryCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
    setIsMemorySolved(false);
  };

  const handleCardClick = (id: number) => {
    if (selectedCards.length >= 2 || memoryCards.find(c => c.id === id)?.isFlipped || memoryCards.find(c => c.id === id)?.isMatched) {
      return;
    }

    setMemoryCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newSelected;
      const firstCard = memoryCards.find(c => c.id === firstId)!;
      const secondCard = memoryCards.find(c => c.id === secondId)!;

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true, isFlipped: false } : c));
          setSelectedCards([]);
          setMemoryCards(current => {
            const allMatched = current.every(c => c.isMatched || c.id === firstId || c.id === secondId);
            if (allMatched) setIsMemorySolved(true);
            return current;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c));
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  // ============================================
  // GAME 9: KOZMİK LABİRENT (Maze Runner 5x5 Grid)
  // ============================================
  // 5x5 board state
  const [leoPos, setLeoPos] = useState({ r: 0, c: 0 });
  const targetPos = { r: 4, c: 4 };
  const obstacles = [{r: 1, c: 1}, {r: 2, c: 3}, {r: 3, c: 1}, {r: 0, c: 3}];
  const [mazeSteps, setMazeSteps] = useState(0);
  const [mazeWon, setMazeWon] = useState(false);

  const moveLeo = (direction: "up" | "down" | "left" | "right") => {
    if (mazeWon) return;
    let nextR = leoPos.r;
    let nextC = leoPos.c;

    if (direction === "up") nextR = Math.max(0, leoPos.r - 1);
    else if (direction === "down") nextR = Math.min(4, leoPos.r + 1);
    else if (direction === "left") nextC = Math.max(0, leoPos.c - 1);
    else if (direction === "right") nextC = Math.min(4, leoPos.c + 1);

    // Collision check
    const isObstacle = obstacles.some(o => o.r === nextR && o.c === nextC);
    if (!isObstacle) {
      setLeoPos({ r: nextR, c: nextC });
      setMazeSteps(s => s + 1);
      if (nextR === targetPos.r && nextC === targetPos.c) {
        setMazeWon(true);
      }
    }
  };

  const resetMaze = () => {
    setLeoPos({ r: 0, c: 0 });
    setMazeSteps(0);
    setMazeWon(false);
  };

  // ============================================
  // GAME 10: AŞK HESAPLAYICI (Love Match) LOGIC
  // ============================================
  const [compatResult, setCompatResult] = useState<{ score: number | null; feedback: string }>({
    score: null,
    feedback: "İsimlerinizi akort etmek için aşağıdaki kozmik tarayıcıyı aktifleyin!"
  });

  const calculateCompatibility = () => {
    // Standard loving high score above 90%
    const score = Math.floor(Math.random() * 11) + 90; // 90 to 100
    const comments = [
      "Aşiret aurası ve aslan burcu asaleti tavan yaptı! Acilen Komagene mor tabelası çizilsin. 💜🌯",
      "Sinerji şarj düzeyi %100! Sınav bükme ve yeşil erik paylaşma akortu zirveye ulaştı.",
      "Mustafabank limitsiz sevgi aurası devreye girdi, kalkanlar mor kalplerle donatıldı! 🛡️✨",
      "Dondurulmuş çilekler ve pürüzsüz hırkalar eşliğinde gelecek parıl parıl parlatıldı!"
    ];
    setCompatResult({
      score,
      feedback: comments[Math.floor(Math.random() * comments.length)]
    });
  };

  // ============================================
  // GAME 11: TAROT TEPSİ KARTLARI
  // ============================================
  const tarotCardsPool: TarotCard[] = [
    { name: "Güneş Kartı ☀️", emoji: "🃏☀️", meaning: "Sonsuz neşe ve taze enerji!", advice: "İloşum kendine inan! KPSS stresini bizzat eriteceksin." },
    { name: "Yıldız Kartı ⭐", emoji: "🃏⭐", meaning: "Umut ve dileklerin gerçekleşmesi!", advice: "Yıldızlar arkanda, derin nefes al ve podyum asaletini koru." },
    { name: "Değnek Kraliçesi 🦁", emoji: "🃏🦁", meaning: "Asil ve cesur bir dişi aslan!", advice: "Bugün podyuma çıkar gibi kendinden emin ol. Şans seninle!" },
    { name: "Kupa Ası 💖", emoji: "🃏💖", meaning: "Saf sevgi ve huzurun coşması!", advice: "Musti'nin sevgiyle doldurduğu o meşhur çay termosu her an seninle!" }
  ];
  const [tarotCardSelected, setTarotCardSelected] = useState<TarotCard | null>(null);

  // ============================================
  // GAME 12: DOKUN VE PATLAT (Bubble Popper)
  // ============================================
  const [bubbles, setBubbles] = useState<Array<{ id: number; pop: boolean; emoji: string }>>([]);
  const [popCount, setPopCount] = useState(0);

  const initBubbles = () => {
    const emojis = ["💚", "🍇", "🥑", "🍬", "🤍", "🍏", "🍡", "🍥", "🍪", "🍭"];
    const bubbleSet = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      pop: false,
      emoji: emojis[i % emojis.length]
    }));
    setBubbles(bubbleSet);
    setPopCount(0);
  };

  const handlePopBubble = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, pop: true } : b));
    setPopCount(c => c + 1);
  };

  // ============================================
  // GAME 13: YAZI TURA LOGIC
  // ============================================
  const [coinResult, setCoinResult] = useState<{ flipping: boolean; side: string | null; review: string }>({
    flipping: false,
    side: null,
    review: "Parayı fırlat!"
  });

  const flipCoin = () => {
    if (coinResult.flipping) return;
    setCoinResult(p => ({ ...p, flipping: true }));

    setTimeout(() => {
      const isHeads = Math.random() > 0.5;
      setCoinResult({
        flipping: false,
        side: isHeads ? "YAZI 🦁" : "TURA 🥑",
        review: isHeads 
          ? "Yazı geldi! İloş Hanım'ın dilediği waffle kaçamağı saniyede onaylandı! 🧇" 
          : "Tura geldi! Musti'nin Komagene dürümleri sofraya geliyor asaletle! 🌯"
      });
    }, 1000);
  };

  // ============================================
  // GAME 14: YALAN MAKİNESİ LOGIC
  // ============================================
  const [lieInput, setLieInput] = useState("");
  const [lieChecking, setLieChecking] = useState(false);
  const [lieVerdict, setLieVerdict] = useState<string | null>(null);

  const checkLie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lieInput.trim() || lieChecking) return;
    setLieChecking(true);
    setLieVerdict(null);

    setTimeout(() => {
      // Witty responses
      let text = lieInput.toLowerCase();
      let res = "";
      if (text.includes("sevmiy") || text.includes("nefret")) {
        res = "🚨 %100 YALAN! Sevgimiz galaksi sınırlarını aşmış, rüzgarda pürüzsüzce parıldıyor! ❤️";
      } else if (text.includes("çalış") || text.includes("kpss") || text.includes("ders")) {
        res = "✨ %100 DOĞRU! Leo kraliçemiz sessizce paragrafları ezip rekor soru çözüyor! 📚";
      } else if (text.includes("avokado") || text.includes("erik")) {
        res = "✨ %100 GERÇEK! Bu ikili tabağı anında moral ve cici enerji veriyor! 🥑🍏";
      } else {
        const randPct = Math.floor(Math.random() * 20) + 81; // 81 - 100
        res = `💖 %${randPct} DOĞRULUK DERECESİ! Yıldızlar ve Mustabank bu samimi iddiayı bizzat onayladı!`;
      }
      setLieVerdict(res);
      setLieChecking(false);
    }, 1200);
  };

  // ============================================
  // GAME 15: HIZ REAKSİYON TESTİ (Click Test)
  // ============================================
  const [clickCount, setClickCount] = useState(0);
  const [clickActive, setClickActive] = useState(false);
  const [clickTimeLeft, setClickTimeLeft] = useState(5);
  const [clickFinished, setClickFinished] = useState(false);

  const startClickTest = () => {
    setClickCount(0);
    setClickActive(true);
    setClickTimeLeft(5);
    setClickFinished(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clickActive && clickTimeLeft > 0) {
      timer = setTimeout(() => setClickTimeLeft(clickTimeLeft - 1), 1000);
    } else if (clickTimeLeft === 0 && clickActive) {
      setClickActive(false);
      setClickFinished(true);
    }
    return () => clearTimeout(timer);
  }, [clickActive, clickTimeLeft]);

  // ============================================
  // GAME 16: BİLMECELER
  // ============================================
  const [riddles, setRiddles] = useState<RiddleCard[]>([
    { id: "r1", question: "Yeşildir, kütürdür, İloş'un kalbini sınav yorgunluğunda anında yumuşatan kraliçedir?", answer: "Yeşil Erik! (Tuz dökülüp kütüphane masasında kııtır kıtır çiğnenir) 🍏🧂", hint: "Atakum pazarlarında satılan en asil meyve.", revealed: false },
    { id: "r2", question: "Musti'nin dolabından kaçırılan, bir daha asla iade edilmeyen, yumuşacık pofuduk sığınak ceket?", answer: "Musti'nin Oversize Sweatshirt'ü! (İloş Hanım süresiz el koydu) 🧥✨", hint: "Sıcak gri sığınak.", revealed: false },
    { id: "r3", question: "Tabelası mor mor parıldayan, acılı dürümü bol turşulu olan o franchise bayisi?", answer: "Bizim İsimli Mor Tabelalı Komagene Dükkanı! 🌯💜", hint: "Hani kütüphanede konuştuğumuz asil yer.", revealed: false }
  ]);

  useEffect(() => {
    initHangman();
    initMemoryGame();
    initBubbles();
  }, []);

  const selectAndResetGame = (gId: string) => {
    setActiveGame(gId);
    if (gId === "adamAsmaca") initHangman();
    if (gId === "kartEsleme") initMemoryGame();
    if (gId === "dokunPatlat") initBubbles();
    if (gId === "tavla") resetTavla();
    if (gId === "labirent") resetMaze();
  };

  return (
    <div className="bg-white border-b-8 border-r-8 border-vp-blueborder rounded-[2rem] p-6 shadow-xl" id="mega_mini_games_hub_v4">
      {/* Top Header Selector */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h3 className="text-lg font-black tracking-tight text-vp-blue font-display flex items-center gap-2">
            <Trophy className="text-vp-blue w-6 h-6 animate-pulse" /> Musti & İloş Mini Oyun Odası 🎮🧩
          </h3>
          <p className="text-xs text-slate-500 font-sans font-semibold">
            Tarih ezberi ve paragraf çözmekten yorulduğunda, kafayı dezenfekte edecek akortlu 16 adet mini oyun!
          </p>
        </div>
      </div>

      {/* Main Grid: Left sidebar select (16 items), Right current game (playing board) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Quick Game Drawer (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-[2rem] p-4 max-h-[500px] overflow-y-auto custom-scrollbar space-y-1.5 shadow-inner">
          <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block px-1.5 mb-2">🎮 OYUN LİSTESİ (EN AZ 15 OYUN!)</span>
          {gamesList.map((g) => (
            <button
              key={g.id}
              onClick={() => selectAndResetGame(g.id)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 group ${
                activeGame === g.id 
                  ? "bg-vp-blue text-white border-vp-blue shadow-sm font-black" 
                  : "bg-white hover:bg-sky-50 border-slate-200 text-slate-700"
              }`}
              id={`game_btn_${g.id}`}
            >
              <span className="text-lg select-none shrink-0">{g.icon}</span>
              <div className="truncate">
                <h5 className="text-[11px] font-black tracking-tight leading-none mb-1">{g.name}</h5>
                <p className={`text-[8.5px] leading-tight truncate ${activeGame === g.id ? "text-blue-100" : "text-slate-400"}`}>
                  {g.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Game Active Board (8 cols) */}
        <div className="lg:col-span-8 bg-white border-2 border-slate-150 rounded-[2rem] p-6 shadow-xs min-h-[460px] flex flex-col justify-between" id="active_game_viewport">
          
          <AnimatePresence mode="wait">
            {/* GAME 1: ADAM ASMACA */}
            {activeGame === "adamAsmaca" && (
              <div className="space-y-4 animate-fade-in flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <span className="text-xs font-black text-slate-800">Adam Asmaca Kelime Avı 🎯</span>
                    <button onClick={initHangman} className="text-[10px] text-vp-blue font-black flex items-center gap-1 hover:underline">
                      <RotateCcw className="w-3 h-3" /> Kelimeyi Değiştir
                    </button>
                  </div>

                  <div className="flex flex-col items-center py-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-250 mb-3">
                    <div className="text-3xl filter drop-shadow mb-2 select-none">
                      {["🤠", "🪵", "🧱", "🏮", "🚪", "🏚️", "💀"][hangmanMistakes]}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Hata Sayısı: {hangmanMistakes}/6</span>

                    {/* Masked Word */}
                    <div className="flex gap-2.5 mt-4">
                      {Array.from(hangmanWord).map((char, i) => (
                        <span key={i} className="text-base sm:text-lg font-black border-b-4 border-vp-blue px-1.5 text-slate-800 font-mono">
                          {guessedLetters.includes(char) ? char : "_"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard layout */}
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mt-2">
                    {Array.from("ABCDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ").map((letter) => {
                      const isGuessed = guessedLetters.includes(letter);
                      return (
                        <button
                          key={letter}
                          disabled={isGuessed || hangmanStatus !== "playing"}
                          onClick={() => handleGuessLetter(letter)}
                          className={`py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            isGuessed 
                              ? "bg-slate-200 text-slate-400 border-none cursor-not-allowed" 
                              : "bg-white hover:bg-sky-50 border border-slate-350 text-slate-700 active:scale-90"
                          }`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status popup */}
                {hangmanStatus !== "playing" && (
                  <div className={`p-4 rounded-xl text-center shadow-md animate-fade-in mt-4 border-2 ${hangmanStatus === "won" ? "bg-emerald-50 border-emerald-350 text-emerald-850" : "bg-red-50 border-red-350 text-red-850"}`}>
                    <h5 className="text-xs font-black uppercase mb-1">
                      {hangmanStatus === "won" ? "🎉 TEBRİKLER İLOŞ KAZANDI! 🎉" : "😢 DARACAĞI ELENDİ!"}
                    </h5>
                    <p className="text-[11px] leading-relaxed">
                      {hangmanStatus === "won" 
                        ? `Kelimeyi başarıyla keşfettin: '${hangmanWord}'! Sözel mantık zekan pürüzsüz akortta!` 
                        : `Görevi tamamlayamadın. Doğru kelime: '${hangmanWord}' idi! Durma, yeni bir kelime ile akort tazele!`
                      }
                    </p>
                    <button onClick={initHangman} className="mt-2 text-2xs bg-slate-900 text-white px-3 py-1 rounded-md font-bold hover:bg-black">Tekrar Oyna 🔄</button>
                  </div>
                )}
              </div>
            )}

            {/* GAME 2: ZAR ATMA */}
            {activeGame === "zarAtma" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm">
                  <div className="flex justify-center gap-6 my-4 select-none">
                    <div className="w-16 h-16 bg-gradient-to-br from-vp-blue to-sky-700 text-white border-2 border-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-sky-100 animate-pulse">
                      {["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][diceRoll.dice1]}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-vp-blue to-sky-700 text-white border-2 border-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-sky-100 animate-pulse">
                      {["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][diceRoll.dice2]}
                    </div>
                  </div>

                  <p className="text-xs font-black text-slate-800 leading-relaxed min-h-[40px] px-4 font-sans">
                    "{diceRoll.text}"
                  </p>

                  <button
                    disabled={diceRoll.rolling}
                    onClick={rollZar}
                    className="w-full bg-vp-blue hover:bg-sky-700 text-white font-black text-xs py-2.5 rounded-xl cursor-pointer shadow-md select-none"
                  >
                    🎲 {diceRoll.rolling ? "Zarlar Hazırlanıyor..." : "ZAR AT VE YORUM KAP!"}
                  </button>
                </div>
              </div>
            )}

            {/* GAME 3: ŞANS ÇARKIFELEĞİ */}
            {activeGame === "cark" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm w-full">
                  <div className="bg-gradient-to-tr from-sky-50/50 to-white border border-slate-200 p-6 rounded-3xl min-h-[170px] flex flex-col justify-center relative shadow-inner">
                    {spinning ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-4 border-vp-blue border-t-transparent animate-spin" />
                        <span className="text-[10px] font-mono text-vp-blue animate-pulse">KADER ÇARKI DÖNÜYOR...</span>
                      </div>
                    ) : wheelResult ? (
                      <div className="space-y-2.5 animate-fade-in">
                        <span className="text-2xs font-mono font-black text-vp-pink block">🎰 ÇARK SONUCU</span>
                        <h4 className="text-xs font-black text-slate-800 leading-relaxed font-sans">{wheelResult}</h4>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <span className="text-3xl block">🎡🔮</span>
                        <h4 className="text-xs font-black text-slate-700">Şans Çarkı</h4>
                        <p className="text-[10px] text-slate-500 leading-normal px-4">Waffle, yeşil erik ve daha fazla sürpriz jesti kapmak için butona tıklat!</p>
                      </div>
                    )}
                  </div>

                  <button
                    disabled={spinning}
                    onClick={spinWheel}
                    className="w-full bg-vp-blue hover:bg-sky-700 text-white font-black text-xs py-2.5 rounded-xl cursor-pointer shadow-md"
                  >
                    🎡 {spinning ? "Çark fırıldıyor..." : "ÇARKI ÇEVİR!"}
                  </button>
                </div>
              </div>
            )}

            {/* GAME 4: AŞK TAVLASI */}
            {activeGame === "tavla" && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <span className="text-xs font-black text-slate-800">Musti ile Tavla Düellosu 🏆</span>
                    <button onClick={resetTavla} className="text-[10px] text-vp-blue font-black flex items-center gap-1 hover:underline">
                      <RotateCcw className="w-3 h-3" /> Düelloyu Sıfırla
                    </button>
                  </div>

                  {/* Visual progress track */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-inner space-y-4">
                    {/* Track 1: Iloş (Lion) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-slate-700 font-sans">
                        <span>🦁 İLOŞ (Kraliçe)</span>
                        <span>Hane: {tavlaState.iloPosition}/15</span>
                      </div>
                      <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden relative border border-purple-200">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-650 transition-all duration-550"
                          style={{ width: `${(tavlaState.iloPosition / 15) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Track 2: Musti (Avocado) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-slate-700 font-sans">
                        <span>🥑 MUSTİ</span>
                        <span>Hane: {tavlaState.mustiPosition}/15</span>
                      </div>
                      <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden relative border border-emerald-200">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-550"
                          style={{ width: `${(tavlaState.mustiPosition / 15) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10.5px] italic text-slate-700 leading-relaxed bg-white border border-slate-150 p-3 rounded-xl mt-3 shadow-3xs font-semibold">
                    💬 {tavlaState.history}
                  </p>
                </div>

                {tavlaState.finished ? (
                  <div className="bg-sky-50 border border-vp-blueborder/40 p-4 rounded-xl text-center space-y-2 animate-fade-in mt-2">
                    <h5 className="text-xs font-black text-vp-blue uppercase">🏆 OYUN BİTTİ! 🏆</h5>
                    <p className="text-[11px] font-semibold text-slate-700">Kazanan: <strong>{tavlaState.winner}</strong>! Müthiş bir pullarla kapışma şöleniydi!</p>
                    <button onClick={resetTavla} className="text-2xs bg-vp-blue text-white font-bold px-4 py-1.5 rounded-lg">Yeniden Düello Kur 🎲</button>
                  </div>
                ) : (
                  <button
                    disabled={tavlaState.turn !== "ilo"}
                    onClick={rollTavla}
                    className={`w-full py-2.5 rounded-xl text-xs font-black text-white transition-all ${
                      tavlaState.turn === "ilo" 
                        ? "bg-vp-blue hover:bg-sky-700 cursor-pointer shadow-md" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed border-none"
                    }`}
                  >
                    🎲 {tavlaState.turn === "ilo" ? "ZAR SALLA VE PULU İLERLET ➔" : "MUSTİ ZAR SALLIYOR..."}
                  </button>
                )}
              </div>
            )}

            {/* GAME 5: TRIVIA QUIZ */}
            {activeGame === "trivia" && (
              <div className="space-y-4 animate-fade-in flex-1 flex flex-col justify-between">
                {!quizFinished ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 font-black border-b pb-2">
                      <span>SORU {currentQ + 1} / {triviaQuestions.length}</span>
                      <span className="text-vp-blue">Skor: {score}</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-relaxed font-sans">{triviaQuestions[currentQ].question}</h4>
                      
                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {triviaQuestions[currentQ].options.map((opt, i) => {
                          let styleClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                          if (selectedAns !== null) {
                            if (i === triviaQuestions[currentQ].correctIdx) {
                              styleClass = "bg-emerald-50 border-emerald-350 text-emerald-850 font-black";
                            } else if (i === selectedAns) {
                              styleClass = "bg-red-50 border-red-350 text-red-850 font-black";
                            } else {
                              styleClass = "bg-white border-slate-100 text-slate-350 opacity-55";
                            }
                          }
                          return (
                            <button
                              key={i}
                              disabled={selectedAns !== null}
                              onClick={() => {
                                setSelectedAns(i);
                                if (i === triviaQuestions[currentQ].correctIdx) setScore(s => s + 1);
                              }}
                              className={`w-full text-left p-3 rounded-xl border text-2xs leading-relaxed transition-all cursor-pointer ${styleClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedAns !== null && (
                      <div className="p-3 bg-blue-50/50 border border-vp-blueborder/35 rounded-xl text-[10px] text-slate-700 italic leading-relaxed font-semibold">
                        {selectedAns === triviaQuestions[currentQ].correctIdx ? "🎉 Helal İloş! Doğru!" : "❌ Tüh Yanlış İloş!"} {triviaQuestions[currentQ].explanation}
                      </div>
                    )}

                    <button
                      disabled={selectedAns === null}
                      onClick={() => {
                        setSelectedAns(null);
                        if (currentQ < triviaQuestions.length - 1) {
                          setCurrentQ(currentQ + 1);
                        } else {
                          setQuizFinished(true);
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-black text-white transition-all ${
                        selectedAns === null ? "bg-slate-300 cursor-not-allowed" : "bg-vp-blue hover:bg-sky-700"
                      }`}
                    >
                      {currentQ === triviaQuestions.length - 1 ? "Yarışmayı Tamamla 🏆" : "Sonraki Soru ➔"}
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4 my-auto">
                    <div className="text-5xl animate-bounce">🏆⭐👑</div>
                    <h4 className="text-sm font-black text-vp-maroon font-display">Tebrikler İloşum!</h4>
                    <p className="text-xs font-bold text-slate-655">Doğru Sayın: {score} / {triviaQuestions.length}</p>
                    <button
                      onClick={() => {
                        setCurrentQ(0);
                        setSelectedAns(null);
                        setScore(0);
                        setQuizFinished(false);
                      }}
                      className="bg-vp-blue hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-black text-xs"
                    >
                      Yeniden Yarış! 🔄
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* GAME 6: SAYI TAHMİN OYUNU */}
            {activeGame === "sayiTahmin" && (
              <div className="space-y-4 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm w-full">
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl min-h-[140px] flex flex-col justify-center">
                    <p className="text-xs font-black text-slate-800 leading-relaxed font-sans">{guessFeedback}</p>
                    <span className="text-[9px] font-mono text-slate-400 mt-2 block">Kullandığın Hak: {guessAttempts}</span>
                  </div>

                  {!guessWon ? (
                    <form onSubmit={handleGuessSubmit} className="flex gap-2">
                      <input 
                        type="number"
                        min="1"
                        max="50"
                        placeholder="1 - 50 arası"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        className="flex-1 bg-white border border-slate-350 focus:border-vp-blue px-3 py-2 text-xs rounded-xl outline-none font-bold text-center"
                      />
                      <button type="submit" className="bg-vp-blue hover:bg-sky-700 text-white text-3xs font-black uppercase px-4 rounded-xl cursor-pointer">
                        Tahmin Et!
                      </button>
                    </form>
                  ) : (
                    <button onClick={initSayiTahmin} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-2.5 rounded-xl">
                      X Tahmini Yeniden Başlat! ⚡
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* GAME 7: ROCK PAPER SCISSORS */}
            {activeGame === "tasKagit" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-md w-full">
                  <span className="text-3xs font-mono font-black text-slate-400 uppercase tracking-widest block">DÜELLO KÜRŞÜ SİNERJİSİ (SERİ ENERJİSİ: {rpsResult.streak})</span>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border">
                    <div className="text-center space-y-1">
                      <span className="text-3xs text-slate-450 font-mono font-bold block uppercase">Sembolün</span>
                      <span className="text-xl inline-block">{rpsResult.user || "❓"}</span>
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-3xs text-slate-450 font-mono font-bold block uppercase">Musti Yapay Zeka</span>
                      <span className="text-xl inline-block">{rpsResult.ai || "❓"}</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans font-bold text-slate-800 leading-relaxed italic bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                    "{rpsResult.outcome}"
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {["Taş 🪨", "Kağıt 📄", "Makas ✂️"].map((move) => (
                      <button
                        key={move}
                        onClick={() => playRPS(move)}
                        className="bg-white hover:bg-sky-50 border border-slate-300 py-2 rounded-xl text-3xs font-black cursor-pointer shadow-3xs"
                      >
                        {move}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GAME 8: KART EŞLEŞTİRME */}
            {activeGame === "kartEsleme" && (
              <div className="space-y-4 flex-1 flex flex-col justify-between text-center">
                <div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-2xs font-sans font-bold">
                    <span className="text-slate-600">Move: {moves}</span>
                    <button onClick={initMemoryGame} className="text-[10px] text-vp-blue font-black flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Sıfırla
                    </button>
                  </div>

                  {!isMemorySolved ? (
                    <div className="grid grid-cols-4 gap-2 max-w-[280px] mx-auto my-4">
                      {memoryCards.map((card) => {
                        const isRevealed = card.isFlipped || card.isMatched;
                        return (
                          <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-lg cursor-pointer transition-all duration-200 select-none border ${
                              isRevealed 
                                ? "bg-sky-50 border-vp-blue scale-100" 
                                : "bg-slate-900 border-slate-700 hover:bg-slate-800"
                            }`}
                          >
                            {isRevealed ? card.symbol : "❓"}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-sky-50 p-6 rounded-2xl border border-vp-blueborder/35 text-center my-4 space-y-2 animate-fade-in">
                      <div className="text-4xl animate-bounce">🏆🧠</div>
                      <h4 className="text-xs font-black text-vp-blue font-display">Beyin Kapakları Sağlam İloşum!</h4>
                      <p className="text-[10px] text-slate-750 font-sans leading-relaxed">
                        Kartları pürüzsüzce bitirdin! KPSS'de podyum birinciliği pürüzsüzce senin olacak!
                      </p>
                      <button onClick={initMemoryGame} className="bg-vp-blue text-white font-bold text-3xs px-4 py-1.5 rounded-lg">Yeniden Oyna</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAME 9: KOZMİK LABİRENT */}
            {activeGame === "labirent" && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <span className="text-xs font-black text-slate-800">Kozmik Labirent (Leo'yu İlerlet!) 🧭</span>
                    <button onClick={resetMaze} className="text-[10px] text-vp-blue font-black flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Sıfırla
                    </button>
                  </div>

                  {/* 5x5 Grid Board rendering */}
                  <div className="bg-slate-900 border-4 border-slate-950 p-2.5 rounded-2xl max-w-[210px] mx-auto shadow-inner">
                    <div className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 5 }).map((_, rIdx) => 
                        Array.from({ length: 5 }).map((_, cIdx) => {
                          const isPlayer = leoPos.r === rIdx && leoPos.c === cIdx;
                          const isTarget = targetPos.r === rIdx && targetPos.c === cIdx;
                          const isObst = obstacles.some(o => o.r === rIdx && o.c === cIdx);
                          
                          return (
                            <div 
                              key={`${rIdx}-${cIdx}`}
                              className={`aspect-square rounded-lg flex items-center justify-center text-xs border ${
                                isPlayer 
                                  ? "bg-purple-650 border-purple-500 scale-105" 
                                  : isTarget 
                                    ? "bg-emerald-800/80 border-emerald-500 animate-pulse" 
                                    : isObst 
                                      ? "bg-red-950 border-red-900 text-[8px]" 
                                      : "bg-slate-800/25 border-slate-800/85"
                              }`}
                            >
                              {isPlayer ? "🦁" : isTarget ? "🍏" : isObst ? "❌" : ""}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <span className="text-[9.5px] font-mono text-slate-450 block text-center mt-2 font-bold">
                    Hatalı Hücreler: ❌ (Sözel Mantık Tuzakları) • Adım Sayısı: {mazeSteps}
                  </span>
                </div>

                {mazeWon ? (
                  <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl text-center space-y-1.5 animate-fade-in mt-1">
                    <h5 className="text-3sm font-black text-emerald-850">ERİĞE ULAŞILDI! 🍏🎉</h5>
                    <p className="text-3xs text-slate-700 leading-normal">
                      Musti onaylı çıtır yeşil eriğe tüm paragrafları atlatarak ulaştın! Leo asilliği labirenti fethetti.
                    </p>
                    <button onClick={resetMaze} className="text-3xs bg-slate-900 text-white font-bold px-4 py-1.5 rounded-md">Yeniden Oyna</button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-1.5 mt-2">
                    <button onClick={() => moveLeo("left")} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer shadow-3xs"><ArrowLeft className="w-3.5 h-3.5 text-slate-705" /></button>
                    <div className="flex flex-col gap-1.5">
                      <button onClick={() => moveLeo("up")} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer shadow-3xs"><ArrowUp className="w-3.5 h-3.5 text-slate-705" /></button>
                      <button onClick={() => moveLeo("down")} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer shadow-3xs"><ArrowDown className="w-3.5 h-3.5 text-slate-705" /></button>
                    </div>
                    <button onClick={() => moveLeo("right")} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer shadow-3xs"><ArrowRight className="w-3.5 h-3.5 text-slate-705" /></button>
                  </div>
                )}
              </div>
            )}

            {/* GAME 11: TAROT TEPSİ SEÇİMİ */}
            {activeGame === "tarot" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm w-full">
                  <span className="text-3xs font-mono font-black text-slate-400 uppercase tracking-widest block">Gözüne Hitap Eden Kartı Aç İloşum</span>
                  
                  {tarotCardSelected ? (
                    <div className="bg-slate-50 border p-5 rounded-3xl animate-fade-in space-y-2.5 text-center relative shadow-inner">
                      <div className="text-4xl">{tarotCardSelected.emoji}</div>
                      <h4 className="text-xs font-black text-vp-blue font-sans">{tarotCardSelected.name}</h4>
                      <p className="text-[10.5px] italic text-slate-700 leading-relaxed font-semibold">"{tarotCardSelected.meaning}"</p>
                      <p className="text-[10.5px] text-vp-blue leading-normal font-sans pt-2 border-t font-semibold">🚀 {tarotCardSelected.advice}</p>
                      <button onClick={() => setTarotCardSelected(null)} className="mt-3 text-3xs text-slate-400 hover:underline">Kartı Geri Koy ×</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
                      {tarotCardsPool.map((c, i) => (
                        <div 
                          key={i}
                          onClick={() => setTarotCardSelected(c)}
                          className="bg-slate-900 border-2 border-slate-758 p-4 rounded-xl text-center cursor-pointer hover:bg-slate-800 transition-all active:scale-95 group shadow-sm flex flex-col justify-center min-h-[95px]"
                        >
                          <span className="text-xl filter drop-shadow select-none group-hover:animate-bounce block mb-1">🃏</span>
                          <span className="text-[8.5px] font-mono text-purple-300 font-extrabold block uppercase tracking-tighter">KOZMİK {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAME 12: DOKUN VE PATLAT */}
            {activeGame === "dokunPatlat" && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <span className="text-xs font-black text-slate-800">Neşeli Balon Patlatma Yarışı 🎈</span>
                    <button onClick={initBubbles} className="text-[10px] text-vp-blue font-black flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Balonları Şişir
                    </button>
                  </div>

                  <span className="text-[9.5px] font-mono text-slate-450 text-center block font-bold">Pop Derecesi: {popCount} / 10 Balon</span>

                  {/* Bubble playground */}
                  {popCount < 10 ? (
                    <div className="flex flex-wrap gap-2.5 justify-center my-6 max-w-sm mx-auto">
                      {bubbles.map((b) => (
                        <button
                          key={b.id}
                          disabled={b.pop}
                          onClick={() => handlePopBubble(b.id)}
                          className={`w-11 h-11 rounded-full text-lg cursor-pointer transition-all flex items-center justify-center shadow-sm select-none border-2 active:scale-75 ${
                            b.pop 
                              ? "bg-slate-100 border-dashed border-slate-300 opacity-25 scale-75 cursor-not-allowed" 
                              : "bg-white hover:bg-rose-50 border-rose-300 hover:scale-105"
                          }`}
                        >
                          {b.pop ? "💥" : b.emoji}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-sky-50 p-5 rounded-2xl border text-center my-4 animate-fade-in space-y-1.5">
                      <div className="text-4xl animate-bounce">🎈🍰🎉</div>
                      <h4 className="text-3sm font-black text-vp-blue font-display">Tüm Balonlar Toz Edildi!</h4>
                      <p className="text-3xs text-slate-700 leading-normal font-semibold">İloş hırsa dayanamadı ve tüm olumsuz nazarları mısır patlatır gibi patlatarak cici enerjiyi doldurdu!</p>
                      <button onClick={initBubbles} className="text-3xs bg-slate-900 text-white font-bold px-4 py-1 rounded-md">Balonları Tazelemeli</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAME 13: YAZI TURA */}
            {activeGame === "yaziTura" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-xs">
                  <div className="flex justify-center my-4 select-none">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white border-4 border-amber-300 flex items-center justify-center text-lg shadow-lg font-mono font-black ${coinResult.flipping ? "animate-[spin_0.3s_linear_infinite]" : "ring-4 ring-amber-100"}`}>
                      {coinResult.flipping ? "🪙" : (coinResult.side || "👑")}
                    </div>
                  </div>

                  <p className="text-xs font-black text-slate-850 leading-relaxed px-4">
                    "{coinResult.review}"
                  </p>

                  <button
                    disabled={coinResult.flipping}
                    onClick={flipCoin}
                    className="w-full bg-vp-blue hover:bg-sky-700 text-white font-black text-xs py-2.5 rounded-xl cursor-pointer"
                  >
                    🪙 {coinResult.flipping ? "Para Havada Bükülüyor..." : "PARAYI YUKARI AT!"}
                  </button>
                </div>
              </div>
            )}

            {/* GAME 14: YALAN MAKİNESİ */}
            {activeGame === "yalanMakinesi" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm w-full block text-left">
                  <div className="bg-slate-50 border p-5 rounded-3xl min-h-[140px] flex flex-col justify-center text-center">
                    {lieChecking ? (
                      <div className="space-y-3">
                        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <span className="text-3xs font-mono text-red-500 animate-pulse font-extrabold uppercase">AKORTLU PARMAKLARINIZ TARANIYOR...</span>
                      </div>
                    ) : lieVerdict ? (
                      <p className="text-xs leading-relaxed text-slate-800 font-sans font-black">
                        {lieVerdict}
                      </p>
                    ) : (
                      <p className="text-[10.5px] text-slate-500">Aşağıdaki kutuya iddialı bir cümle yaz, scan düğmesine bas ve dürüstlüğünü saniyede tescille!</p>
                    )}
                  </div>

                  <form onSubmit={checkLie} className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Örn: Musti'yi bugün çok özledim..."
                      value={lieInput}
                      onChange={(e) => setLieInput(e.target.value)}
                      className="flex-1 bg-white border border-slate-350 focus:border-vp-blue px-3 py-2 text-2xs rounded-xl outline-none font-bold placeholder-slate-400"
                    />
                    <button type="submit" className="bg-vp-blue hover:bg-sky-700 text-white text-3xs font-black uppercase px-4 rounded-xl cursor-pointer">
                      TARA!
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* GAME 15: REAKSİYON HIZ TESTİ */}
            {activeGame === "hizliTiklama" && (
              <div className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className="space-y-4 max-w-sm w-full">
                  <div className="bg-slate-50 border p-5 rounded-3xl min-h-[140px] flex flex-col justify-center text-center">
                    {clickActive ? (
                      <div className="space-y-2">
                        <span className="text-3xs font-mono text-vp-blue tracking-widest uppercase block animate-pulse">SÜRE HIZLA AKIYOR!</span>
                        <div className="text-2xl font-black text-slate-800">{clickCount} TIK</div>
                        <span className="text-sm font-black text-red-500 uppercase">{clickTimeLeft} Saniye kaldı!</span>
                      </div>
                    ) : clickFinished ? (
                      <div className="space-y-3">
                        <span className="text-2xl block">⚡🥇🏆</span>
                        <h4 className="text-xs font-black text-slate-800">Skorun: {clickCount} Klik!</h4>
                        <p className="text-[10px] text-slate-550 leading-normal px-2.5 italic">
                          {clickCount >= 30 
                            ? "ŞAKA MI! Bu inanılmaz KPSS arayüz refleksidir! Kalem elinde saniyede 6 paragrafa kafa atarsın İloşum! 🚀" 
                            : "Harika hız! Parmaklar ısındı, paragraflar yenilgiye şimdiden dünden razı! ✨"
                          }
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Zap className="w-10 h-10 text-vp-blue mx-auto animate-bounce" />
                        <h4 className="text-xs font-black text-slate-700">Refleks Parmak Akort Testi</h4>
                        <p className="text-[10px] text-slate-500 leading-normal px-4">5 saniye içinde butona basabildiğin kadar yüksek tıklayarak paragraflarla eşleşme reflexini ölç!</p>
                      </div>
                    )}
                  </div>

                  {clickActive ? (
                    <button
                      onClick={() => setClickCount(c => c + 1)}
                      className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black py-4 rounded-2xl text-xs transition-colors cursor-pointer shadow-md select-none"
                    >
                      💥 TIKLA TIKLA TIKLA! 💥
                    </button>
                  ) : (
                    <button
                      onClick={startClickTest}
                      className="w-full bg-vp-blue hover:bg-sky-700 text-white font-black text-xs py-2.5 rounded-xl cursor-pointer"
                    >
                      🚀 TESTİ BAŞLAT (5 SANİYE)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* GAME 16: BİLMECELER */}
            {activeGame === "bilmeceler" && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-3xs font-mono font-black text-slate-450 uppercase">
                    <span>Eğlenceli İloş Bilmeleri</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 mt-3">
                    {riddles.map((r) => (
                      <div key={r.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative shadow-xs text-left">
                        <h4 className="text-[11.5px] font-black text-slate-800 leading-normal font-sans pr-12">{r.question}</h4>
                        
                        <div className="mt-2 text-right">
                          {r.revealed ? (
                            <p className="text-[10px] text-vp-blue font-bold animate-fade-in bg-white/70 p-2 rounded-lg border inline-block text-left">Cevap: {r.answer}</p>
                          ) : (
                            <button
                              onClick={() => setRiddles(riddles.map(x => x.id === r.id ? { ...x, revealed: true } : x))}
                              className="text-[9px] text-vp-blue font-black underline cursor-pointer"
                            >
                              İpucunu gör ve cevabı aç
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Small Game Decor block */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[8px] text-vp-blue font-mono font-black uppercase">
            <span>🛡️ LEO AKORT ODASI KORUMALI</span>
            <span>MUSTAFA CAN MINI LAB 🧪</span>
          </div>
        </div>

      </div>
    </div>
  );
}

interface TarotCard {
  name: string;
  emoji: string;
  meaning: string;
  advice: string;
}
