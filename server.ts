import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GenAI Client to prevent crashes during initial container builds
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARN: GEMINI_API_KEY is not defined in environment variables. Falling back to local empathetic rules.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Empathy Prompt System Instructions loaded with all their sweet platonical inside jokes
const SPECIAL_SYSTEM_INSTRUCTION = `
Sen "Musti'nin Akort Ettiği Kişisel Yapay Zeka" (Gemini-İloş Sürümü) asistanısın. 
Bu web sitesini kullanan tek kişi Mustafa Can'ın (Musti'nin) platonik hayranı olduğu, hayatındaki en değerli insan olan "İloş" (İlayda) hanımdır.
Amacın ona en üst düzeyde destek olmak, moral vermek, ders çalışırken (KPSS tarih, coğrafya, matematik, paragraf) onu motive etmek ve tatlı tatlı takılmaktır.

İloş Hanım Hakkındaki Bilgiler ve İçerideki Esprilerimiz (Bu bilgileri konuşmalara ustaca ve doğalca yedir):
- İloş: Leo (Aslan burcu) ve Scorpio (Akrep yükseleni) olan, "Aslan sahne alır, İkizler konuşur" dinamiğiyle Musti (İkizler burcu, Başak yükselen) ile harika anlaşan muhteşem bir kadındır.
- Signature Özelliği: "Kainatın, Galaksinin ve Geis'lerin en güzel kızı", "Dua Lipa pozlarıyla Kocaeli'yi podyuma çeviren" star.
- Günlük Sözleri: Sıkıldığında veya sınav yorduğunda "Sinir tepede" veya "Sinir zirvede 😡" der. Akşam yatarken de "İloş bayılır ve yok olur 😴" şeklinde uykusuna gider.
- Spor & Fitness Tutkulu MANKENİ: Hummel leggings (Hummel taytı) giyer. Bir keresinde taytını salonda takıp pütürleştirmişti (nazar değdi!) ama Musti hemen yenisini yedekledi.
- Personal Trainer: "İlker". İlker'in antrenman stili "pestil çıkarmaktır", "baba kalk 2 set daha" diye bağırır. Musti ise her zaman bodyguard'lık yapıp İloş'u "Tunahan" gibi gereksiz tiplerden koruyacağına söz verir.
- Yakın Arkadaşları: "Muro/Murat" (günahkar kanka, sürekli kızlarla datelere gider, telefonları açmaz) ve "Berkan".
- Ders Çalışma & KPSS Mücadelesi: Coğrafya (Musti Geography haritalarının çıktısını alıp vermişti), Tarih (YouTube'daki harika hocayı dinler "Tarihte tek geçer"), Matematik (zorlanır ama çözer), Paragraf & Sözel mantık (0 istek anında bile zirveyi zorlar). Merkez Kütüphanesi'nde (Öğretmenevi karşısı) veya arkadaşının ofisinde çalışır.
- Tatlı & Çiğköfte Krizleri: Şeker diyetine girer ama tatlı krizleri meşhurdur. En çok Künefe (Hatay özel), Waffle, Gece cookieleri sever. Ortak hayalleri "Komagene çiğköfte franchise dükkanı" açmaktır ("Komagene yanına buz gibi ayran!"). Limonlu espressoyu ödem atıcı sanan Musti'ye "Limonlu su iç, kahveyi kahve gibi iç" demiştir.
- Futbol: Fanatik Galatasaray'lıdır. Icardi ve Barış Alper Yılmaz hayranıdır. Musti ise Samsunspor'ludur. Samsun GS'yi 4-0 yenince İlker bayram edip Musti'ye 2 ay bedava ders vermiş, İloş ise GS'ye "mallar, aptallar" diyerek tatlı sinir krizleri geçirmiştir.
- Hediye & Jestler: Musti ona her zaman sürprizler yapar. Ona avocado peluşu (yumuşacıktır), seyahatte dinlesi için özel Spotify çalma listesi, İzmit'e giderken arkadaşına hediye etmesi için hediye paketli kolej sweat'i, dondurmalar, meyveler, çiçek besinli mor çiçekler göndermiştir. Bankamatik gibi her şeye yetiştiği için ona "Mustafabank 💳" lakabını vermiştir.
- PS5 & Oyun: It Takes Two oyununu oynamaya bayılırlar. "Relax Musti, panik yapma!" diyerek seanslar dönerler.

Konuşma Tarzı Kuralları:
1. Türkçe konuş, son derece kibar, tatlı, hafif muzip, neşeli, bazen edebi ve İloş'u çok özel hissettiren bir dil kullan.
2. Kesinlikle robotik veya kuru "AI rehberi" gibi konuşma. "Musti'nin akort ettiği en özel asistanım" de.
3. İçerdeki esprileri her cevaba çok sıkıştırma ama İloş canı sıkkınken "Hemen sana Hatay'dan fırından yeni çıkmış bol antep fıstıklı bir Künefe veya Komagene'den bol turşulu bir dürüm ayarlayalım" de.
4. "Mustafabank" kartının her zaman onun hizmetinde olduğunu, "Hummel manken koruma kalkanının" aktif olduğunu söyle.
5. Her zaman sıcak, motivasyon dolu KPSS tavsiyeleri ver. Tarih ezberleme formüllerinden bahset.
`;

// API Routes
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { messages, userMessage } = req.body;
    if (!userMessage) {
       res.status(405).json({ error: "Missing userMessage parameter in request" });
       return;
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey || geminiKey === "MY_GEMINI_API_KEY") {
      // Direct empathetic fallback for when the API Key is mock or not yet configured (AI Studio Preview safety)
      const lowercaseMsg = userMessage.toLowerCase();
      let reply = "Canım İloş'um, şu an sistemlerimizde küçük bir akort ayarı yapılıyor (Gemini API anahtarı ayarlanmamış). Ama yine de senin yanındayım! ";
      
      if (lowercaseMsg.includes("sinir") || lowercaseMsg.includes("stres")) {
        reply += "Fark ettim ki sinirler yine zirvede! 😡 Hemen kütüphane masasını nazikçe itelim ve kendimize buz gibi bir ayranla Komagene çiğköftesi söyleyelim. Paragraflar biraz dursun, kainat güzeli dinlenmeyi hak etti!";
      } else if (lowercaseMsg.includes("tatlı") || lowercaseMsg.includes("yemek") || lowercaseMsg.includes("açım")) {
        reply += "Tatlı/yemek krizleri mi geldi? 🧁 Hemen Hatay'dan özel bir şerbetli Künefe veya kuzenin fırınından yeni çıkmış sıcak bir parça çikolatalı Cookie düşleyelim. Şeker diyetine yarın devam ederiz, Mustafabank daima sponsordur! 💳";
      } else if (lowercaseMsg.includes("spor") || lowercaseMsg.includes("bacak") || lowercaseMsg.includes("legging") || lowercaseMsg.includes("tayt")) {
        reply += "Antrenmana mı gidiyoruz? 🏃‍♀️ İlker'in 'pestil çıkarıcı' programından bacak gününü sağ salim atlatman için dualarım seninle. Hummel taytına göz diken Tunahan giller olursa söyle, Musti bodyguard kalkanı anında devrede!";
      } else if (lowercaseMsg.includes("tarih") || lowercaseMsg.includes("ders") || lowercaseMsg.includes("kpss")) {
        reply += "KPSS mücadelesi tam hız! Tarih hocasının o ses tonunu hatırlatıp motivasyonu coşturalım: İloş her şeyin en güzelini başarır! Geceye kadar kütüphanede kalıp 'bayılana ve yok olana kadar' çalışan bir galaksi güzeline zaten dersler vız gelir.";
      } else {
        reply += "Musti'nin senin için özenle hazırladığı bu dünyada canın neye sıkılırsa bana yazabilirsin. İster 'Its Take Two' oynayalım, ister dertleşelim. Sen her şeyin en iyisine layıksın, sakın unutma! ☀️✨";
      }
       res.json({ text: reply });
       return;
    }

    const ai = getGenAI();
    const chatHistory = messages ? messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }]
    })) : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SPECIAL_SYSTEM_INSTRUCTION,
        temperature: 0.85,
        topP: 0.95
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message: userMessage });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "API hatası alındı. Lütfen daha sonra tekrar deneyiniz.", details: error.message });
  }
});

// Massive pool of customized inspirations for İloş Hand
const INSPIRATION_POOL = [
  {
    quote: "Gökyüzü ne kadar karanlık olursa olsun, senin o güzel aslan kalbin tüm dünyayı aydınlatmaya yeter. Kütüphanedeki o dik duruşun, gelecekteki tüm fırtınaları dize getirecek!",
    action: "Sakinleş, derin bir nefes al kanka. Musti senin her anında yanındaki sarsılmaz kalkanındır! 🛡️"
  },
  {
    quote: "Büyük başarılar, pes etmeyen asil ruhların eseridir. Her çözdüğün paragrarafta, her ezberlediğin tarih bilgisinde, hayallerine bir adım daha yaklaşıyorsun. Sana inanıyorum, mankenim!",
    action: "Şimdi gözlerini kapat ve başardığın o muhteşem günü hayal et. O kütüphane senin başarınla yankılanacak! 🌟"
  },
  {
    quote: "Atakum rüzgarı ne kadar sert eserse essin, içindeki o sıcak motivasyon ateşi asla sönmeyecek. Dünyanın en güzel aslanı, her şeyin en muhteşemine layıktır.",
    action: "Bir yudum su iç, o güzel omuzlarını dikleştir ve paragraflara Leo asaletiyle meydan oku! 🦁"
  },
  {
    quote: "Yoğun günlerin, yorucu kütüphane saatlerin elbet bir gün muhteşem bir zafer anısına dönüşecek. O gün geldiğinde, seninle gurur duymanın keyfi paha biçilemez olacak kanka!",
    action: "Bu yorucu maratonun her saniyesi, geleceğinin parlak sütunlarını inşa ediyor. Devam et! 💪"
  },
  {
    quote: "Kendine inan, gücünün farkına var. Sen galaksinin en parlak starısın; ne KPSS coğrafyası ne de matematik engeli senin o pürüzsüz azminin önüne geçebilir!",
    action: "Hummel taytını giymiş, bacak antrenmanına hazır bir savaşçı aurasıyla soruları erit! 👟"
  },
  {
    quote: "Sinirler zirveye çıksa da, 'İloş bayılır ve yok olur' moduna daha çok olsa da unutma; sen bu evrendeki en narin ama en dirençli çiçeksin.",
    action: "Bir parça soğuk baklava veya Komagene çiğköftesi hayaliyle zihnine tatlı bir mola verdir! 🌯"
  },
  {
    quote: "Her sabah yeni bir umuttur. Bugün kütüphanede her zamankinden daha pürüzsüz bir odaklanma ve şans seninle olacak. Dualarım senin o temiz kalbinle beraber.",
    action: "Kalemini sıkı tut, zihnini serbest bırak. Matematik formülleri sana boyun eğmek üzere! 📐"
  },
  {
    quote: "Mustafabank her zaman arkanda, sevgi kalkanları %100 her saniye aktif. Hayat sana ne fırtına çıkarırsa çıkarsın, sığınağın daima korunaklı.",
    action: "Kendini yorgun hissettiğinde peluş avokadona sıkıca sarıl ve sevginin sıcaklığını hisset 🥑."
  },
  {
    quote: "Bir pazar sabahı Atakum sahilinde dondurmalı waffle yiyeceğimiz o huzurlu günün hayali, kütüphane sıralarını cennete çevirsin kanka!",
    action: "Ders aralarında kendine haksızlık etme, tarihin en çalışkan Leo starı şu an bu odada ders çalışıyor."
  },
  {
    quote: "Çift aşamalı cilt temizliğini bitirmiş, cam cilt (glass skin) pürüzsüzlüğüyle parlayan bir kraliçeye paragraflar vız gelir, tırıs gider!",
    action: "Sonsuz sevgi ve bodyguard kalkanı korumasında kütüphaneye adım at, moral zirvede olsun!"
  },
  {
    quote: "Aslan burcu sahneye çıktığında herkes susar, ve o Leo bu sene o kütüphanede KPSS tarih hocalarını bile şaşkına çevirecek!",
    action: "Gözlerini kısıp, paragrafları bir yırtıcı aslan edasıyla tek hamhede çöz!"
  },
  {
    quote: "Bugün Atakum poyrazı sert esiyor olabilir ama senin o asil sırt & omuz dikliğin poyrazı bile geri püskürtür kanka!",
    action: "Soğuk rüzgarlardan korunmak için şık trençkotunu çek ve koruma kalkanını %100 düzeyine getir!"
  },
  {
    quote: "Hayat bazen 'sinir zirvede 😡' modu açsa da, Musti'nin sana gönderdiği mor kalpler ve dualar o sinir dalgasını saniyeler içinde absorbe eder.",
    action: "Hemen kulaklığını tak, sevdiğin o Atakum sahil şarkısını aç ve derin bir nefes al."
  },
  {
    quote: "İloş Hanım için kozmik istikrar uyarısı: Bugün zihnindeki tüm KPSS formülleri kusursuz bir uyumla birleşiyor. Başarı kaçınılmaz!",
    action: "Sözel mantık sorularını çözerken kaleminin ucu dert görmesin, Mustafabank sponsordur 💳."
  },
  {
    quote: "Kuzenin fırınından sıcak bir çikolatalı cookie kokusu geliyor... Ama o ödülü hak etmek için bugün coğrafya haritalarını eritmemiz şart kanka!",
    action: "Diyetine sadık kal, o muhteşem zafer waffle'ı çok yakında masamızda olacak."
  },
  {
    quote: "Dünyanın en tatlı, en dertsiz, en asil kadınına küçük bir hatırlatma: Sen her halinle, eşofmanınla da kolej sweat'inle de galaksinin podyum kraliçesisin.",
    action: "Kendine aynada göz kırp ve Leo enerjisini tüm odaya fısılda!"
  },
  {
    quote: "İlker Hoca 'kalk baba, 2 set daha!' diye bağırıyor olabilir, ama senin bodyguardın olan Musti o pestil çıkarıcı setleri hafifletmek için tetikte!",
    action: "Spor bittiğinde mor çiçek besinli çiçeğimizi göz önüne getir, huzur bul."
  },
  {
    quote: "Galaksinin en güzel Dua Lipa pozlarının sahibi! Bugün KPSS coğrafya haritasını önüne açıp tüm dağları ve gölleri tek tek fethedeceksin, inanıyorum.",
    action: "Kahveni yudumla, limonlu su ödem atsın ama moralini zirvede tut!"
  },
  {
    quote: "İloş bayılır ve yok olur moduna geçmeden önce, bugün kütüphanede sergilediğin o asil mücadele için sana koca bir porselen kase dolusu mor kalp gönderiyorum 💜💜💜",
    action: "Bugün de harika iş çıkardın, aslan kraliçe şimdi dinlenme meditasyonuna geçebilir."
  },
  {
    quote: "Muro yine datelerde kızlarla geziyor ve telefonları açmıyor olabilir, ama senin her saniye çağrına koşan o akortlu asistanın daima burada!",
    action: "Hemen takılmalık bir It Takes Two seansı planla, panik yapmadan relax modda oyna!"
  },
  {
    quote: "Bugün şans kapını çalacak İlayda Hanım! Çözemediğin o karmaşık matematik soruları bile bu sabah su gibi berrak akacak.",
    action: "Kendine güvenli bir tebessüm et, dualarım kütüphanenin tavanını sardı bile!"
  },
  {
    quote: "Kocaeli podyumu senin o asil ve şık Kruvaze ceketli adımlarınla sarsıldı! Şimdi aynı asaletle Atakum sahil hattına doğru süzül kanka.",
    action: "Güneş gözlüğünü gözüne tak ve Atakum podyumunun startını ver!"
  },
  {
    quote: "Bazen şeker diyeti can sıkıcı olabilir, ama bizim mor tabelalı o Komagene franchise dükkanı hayalimiz diyete en güzel motivasyon şarjıdır!",
    action: "Bol marullu, nar ekşili çiğköftenin o ilk çıtır lokmasını düşle!"
  },
  {
    quote: "Senin o temiz, dürüst ve pürüzsüz yüreğin karşısında engeller sadece küçük birer basamaktır. KPSS sınavı senin o parıltını sadece tescilleyecek.",
    action: "Hiçbir endişeye yer yok, Mustafa Can kalkanı önünde siper olmuş durumda."
  },
  {
    quote: "Usluoğlu'nda yorgunluk kahvesi içmek veya Atakum sahilinde gün batımında tuzlu erik kütürdetmek... Hak ettiğin tüm bu keyifler çok yakın!",
    action: "Son paragrafları da yüksek asaletle tamamla, şölen saatine az kaldı."
  },
  {
    quote: "Kainatın, galaksinin ve tüm Samanyolu'nun gelmiş geçmiş en muhteşem İloş'una günün kozmik mesajı: Sen eşsizsin, çok değerlisin!",
    action: "Yüzündeki her bir gülümseme, tüm Samsun'un bulutlu havasını dağıtmaya yeter ☀️."
  }
];

// Route for daily customized inspirations for İloş Hand
app.get("/api/inspiration", (req, res) => {
  // Select a random quote from the pool to support indefinite change on click!
  const randomIndex = Math.floor(Math.random() * INSPIRATION_POOL.length);
  const selected = INSPIRATION_POOL[randomIndex];

  res.json({ quote: selected.quote, action: selected.action, time: new Date().toISOString() });
});

// Setup Vite Dev server middleware or static directory matching in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
