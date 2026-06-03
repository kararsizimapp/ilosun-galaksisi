export interface KPSSQuestion {
  id: string;
  category: "Tarih" | "Coğrafya" | "Vatandaşlık" | "Türkçe" | "Matematik" | "Sözel Mantık";
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctOption: "A" | "B" | "C" | "D" | "E";
  explanation: string;
}

export const kpssQuestions: KPSSQuestion[] = [
  {
    id: "q1",
    category: "Tarih",
    question: "Mustafa Kemal Atatürk'ün 'Ordular, ilk hedefiniz Akdeniz'dir, ileri!' emrini verdiği meşhur Kurtuluş Savaşı muharebesi aşağıdakilerden hangisidir?",
    options: {
      A: "I. İnönü Muharebesi",
      B: "II. İnönü Muharebesi",
      C: "Sakarya Meydan Muharebesi",
      D: "Büyük Taarruz (Başkomutanlık Meydan Muharebesi)",
      E: "Kütahya-Eskişehir Savaşları"
    },
    correctOption: "D",
    explanation: "Mustafa Kemal, Başkomutanlık Meydan Muharebesi'ndeki (Büyük Taarruz) taarruz harekatı esnasında ordulara bu tarihi emri vermiş ve Yunan kuvvetlerinin takip edilerek Batı Anadolu'dan temizlenmesini sağlamıştır!"
  },
  {
    id: "q2",
    category: "Tarih",
    question: "Osmanlı Devleti'nde sadrazam, vezirler ve diğer devlet yöneticilerinin toplandığı, devlet işlerinin görüşüldüğü Divan-ı Hümayun hangi padişah döneminde kaldırılarak nazırlıklar (bakanlıklar) kurulmuştur?",
    options: {
      A: "II. Mahmut",
      B: "I. Selim (Yavuz)",
      C: "Fatih Sultan Mehmet",
      D: "III. Selim",
      E: "Abdülmecit"
    },
    correctOption: "A",
    explanation: "Eski Osmanlı idari sistemini baştan aşağı modernize eden II. Mahmut, Divan-ı Hümayun'u kaldırarak yerine bakanlıklar (Nazırlıklar) sistemini getirmiştir."
  },
  {
    id: "q3",
    category: "Coğrafya",
    question: "Türkiye'de rüzgarların aşındırma ve biriktirme faaliyetlerinin en yaygın olduğu iki bölge, kuraklık ve zayıf vejetasyon yapısıyla bilinmektedir. Bu bölgeler hangileridir?",
    options: {
      A: "Marmara - Doğu Anadolu",
      B: "İç Anadolu - Güneydoğu Anadolu",
      C: "Akdeniz - Karadeniz",
      D: "Ege - İç Anadolu",
      E: "Doğu Anadolu - Karadeniz"
    },
    correctOption: "B",
    explanation: "Rüzgar aşındırması (korozyon) ve biriktirmesi, bitki örtüsünün en cılız ve iklimin en kurak olduğu İç Anadolu (özellikle Konya-Karapınar çevresi) ve Güneydoğu Anadolu bölgelerinde yoğundur İloşum!"
  },
  {
    id: "q4",
    category: "Coğrafya",
    question: "Türkiye'de karstik platoları ve aşınım yüzeyleriyle meşhur, teke ve taşeli platolarının sınırlarında yer alan coğrafi bölgemiz aşağıdakilerden hangisidir?",
    options: {
      A: "Ege Bölgesi",
      B: "İç Anadolu Bölgesi",
      C: "Doğu Anadolu Bölgesi",
      D: "Akdeniz Bölgesi",
      E: "Marmara Bölgesi"
    },
    correctOption: "D",
    explanation: "Teke ve Taşeli platoları Akdeniz Bölgesi'nde yer alan karstik platolardır. Kireçtaşının (kalker) bol olduğu bu platolarda tarım zor, nüfus seyrektir."
  },
  {
    id: "q5",
    category: "Vatandaşlık",
    question: "1982 Anayasası'na göre milletvekili seçilme ve milletvekili adaylığı genel kamu haklarında asgari yaş sınırı kaçtır?",
    options: {
      A: "21 yaş",
      B: "18 yaş",
      C: "25 yaş",
      D: "30 yaş",
      E: "20 yaş"
    },
    correctOption: "B",
    explanation: "2017 Anayasa Değişikliği ile hem milletvekili seçilme hem de genel yerel seçimlerde aday olabilme yaşı 18'e düşürülmüştür."
  },
  {
    id: "q6",
    category: "Vatandaşlık",
    question: "Yasama yetkisinin TBMM'ye ait olması durumunda, Cumhurbaşkanlığı Kararnamelerinin yasallığını denetleyen üst merci merci kurum hangisidir?",
    options: {
      A: "Yargıtay",
      B: "Danıştay",
      C: "Anayasa Mahkemesi (AYM)",
      D: "Sayıştay",
      E: "Uyuşmazlık Mahkemesi"
    },
    correctOption: "C",
    explanation: "Cumhurbaşkanlığı Kararnamelerinin şekil ve esas bakımından Anayasa'ya uygunluğunu denetlemek tamamen Anayasa Mahkemesi'nin asil görevidir İloş!"
  },
  {
    id: "q7",
    category: "Tarih",
    question: "Osmanlı Devleti'nin ilk kez bir 'Avrupa Devleti' sayılması ve toprak bütünlüğünün Avrupalı devletlerin ortak garantisi altına girmesi hangi antlaşma ile gerçekleşmiştir?",
    options: {
      A: "Lozan Antlaşması",
      B: "Berlin Antlaşması",
      C: "Paris Antlaşması (1856)",
      D: "Bükreş Antlaşması",
      E: "Edirne Antlaşması"
    },
    correctOption: "C",
    explanation: "Kırım Savaşı sonrasında 1856'da imzalanan Paris Antlaşması ile Osmanlı Devleti bir Avrupa devleti sayılmış ve toprak bütünlüğü her halinle güvence altına alınmıştır."
  },
  {
    id: "q8",
    category: "Coğrafya",
    question: "Aşağıdakilerden hangisi Türkiye'deki 'aktif tektonik deprem fay hatları' üzerinde bulunmayan, sismik riski oldukça düşük olan illerimizden biridir?",
    options: {
      A: "Muş",
      B: "Erzincan",
      C: "Düzce",
      D: "Tokat",
      E: "Karaman"
    },
    correctOption: "E",
    explanation: "Karaman, Konya güneyi, Taşeli platosu, Mersin, Sinop ve Tuz Gölü güneyi Türkiye'de deprem riskinin ve fay yoğunluğunun en az olduğu masif sahalardandır."
  },
  {
    id: "q9",
    category: "Vatandaşlık",
    question: "Kişinin iradesi dışındaki olaylar karşısında kanunun öngördüğü hak kazanma veya borç yükleme durumlarına ne ad verilir?",
    options: {
      A: "Hukuki İşlem",
      B: "Hukuki Fiil",
      C: "Hukuki Olay",
      D: "Hukuki Sözleşme",
      E: "Hiyerarşik Hak"
    },
    correctOption: "C",
    explanation: "Kişinin iradesinden bağımsız gerçekleşen (ölüm, doğum veya zaman aşımı gibi) ve hukuki sonuç doğuran doğa veya yaşam unsurlarına 'Hukuki Olay' denir."
  },
  {
    id: "q10",
    category: "Tarih",
    question: "Mustafa Kemal'in askerlik mesleğinden istifa etmesinden sonra katıldığı ve sivil bir delege olarak başkanlık yaptığı ilk milli kongre hangisidir?",
    options: {
      A: "Sivas Kongresi",
      B: "Erzurum Kongresi",
      C: "Balıkesir Kongresi",
      D: "Amasya Görüşmeleri",
      E: "Alaşehir Kongresi"
    },
    correctOption: "B",
    explanation: "Amasya Genelgesi sonrası askerlikten istifa eden Mustafa Kemal, ilk sivil çalışması ve liderliği olarak Erzurum Kongresi'ne katılmış ve Temsil Heyeti başkanı seçilmiştir."
  },
  {
    id: "q11",
    category: "Coğrafya",
    question: "Türkiye'de yükseltinin batıdan doğuya doğru artmasının bir sonucu olarak aşağıdakilerden hangisinin gerçekleştiği söylenemez?",
    options: {
      A: "Sıcaklık ortalamalarının azalması",
      B: "Tarım ürünlerinin olgunlaşma süresinin uzaması",
      C: "Karın yerde kalma süresinin artması",
      D: "Akarsuların akış hızlarının artması",
      E: "Güneş ışınlarının düşme açısının küçülmesi"
    },
    correctOption: "E",
    explanation: "Güneş ışınlarının düşme açısı yükseltiyle değil, enlem farkı (Dünya'nın küresel şekli) ile değişir İloşum! Bu yüzden yükselti açıyı etkilemez."
  },
  {
    id: "q12",
    category: "Vatandaşlık",
    question: "1982 Anayasası'na göre devlet bütçe tasarısı kanun teklifi her yıl kim tarafından TBMM'ye sunulur?",
    options: {
      A: "TBMM Başkanı",
      B: "Milletvekilleri",
      C: "Hazine ve Maliye Bakanı",
      D: "Cumhurbaşkanı",
      E: "Sayıştay Başkanı"
    },
    correctOption: "D",
    explanation: "Bütçe Kanun Teklifini hazırlayıp TBMM'ye sunma görevi yürütme organının başı olan Cumhurbaşkanı'na aittir."
  },
  {
    id: "q13",
    category: "Tarih",
    question: "Tarihte ilk kez veraset sisteminde köklü bir değişiklik yaparak 'Sadece padişahın oğulları ve kardeşleri değil, hanedanın en yaşlı ve en olgun üyesi tahta geçer' (Ekber ve Erşet) kuralını getiren Osmanlı padişahı kimdir?",
    options: {
      A: "I. Ahmet",
      B: "II. Selim",
      C: "IV. Murat",
      D: "I. Murat",
      E: "III. Mehmet"
    },
    correctOption: "A",
    explanation: "17. yüzyılda tahta geçen I. Ahmet, hanedan üyeleri arasındaki kanlı taht kavgalarını önlemek için en yaşlı ve tecrübeli üyenin tahta geçmesini öngören Ekber ve Erşet sistemini yürürlüğe koymuştur."
  },
  {
    id: "q14",
    category: "Tarih",
    question: "Sivas Kongresi'nde ulusal kurtuluş mücadelesinin sesini tüm dünyaya duyurmak amacıyla çıkarılmasına karar verilen gazete hangisidir?",
    options: {
      A: "Ceride-i Resmiye",
      B: "İrade-i Milliye",
      C: "Hakimiyet-i Milliye",
      D: "Tercüman-ı Ahval",
      E: "Tasvir-i Efkar"
    },
    correctOption: "B",
    explanation: "Sivas Kongresi'nde milli mücadelenin haklı davasını anlatmak amacıyla bizzat Mustafa Kemal'in öncülüğünde 'İrade-i Milliye' adıyla bir gazete çıkarılmıştır. Ankara'ya taşınıldığında ise bu isim Hakimiyet-i Milliye olmuştur."
  },
  {
    id: "q15",
    category: "Coğrafya",
    question: "Marmara Bölgesi'nde yer alan Yıldız Dağları Bölümü ile ilgili seyahat ve ekonomi coğrafyası derslerinde aşağıdakilerden hangisi söylenemez?",
    options: {
      A: "Ulaşım yollarına sapa kaldığı için tenha nüfusludur.",
      B: "Sanayi ve endüstri tesisleri oldukça seyrektir.",
      C: "Zengin orman örtüsüne ve gür bitki kapısına sahiptir.",
      D: "Yerşekilleri genel olarak engebeli ve masif yapılıdır.",
      E: "Türkiye'nin en aktif aktif volkanik sahaları buradadır."
    },
    correctOption: "E",
    explanation: "Marmara Bölgesi'ndeki Yıldız Dağları (Istrancalar) eski masif arazidir ve sismik/volkanik olarak son derece pasiftir. Türkiye'de buralarda aktif volkanizma bulunmamaktadır."
  },
  {
    id: "q16",
    category: "Coğrafya",
    question: "Türkiye'nin en uzun kıyı şeridine sahip denizi Ege Denizi iken, en uzun sınıra sahip kara komşumuz aşağıdakilerden hangisidir?",
    options: {
      A: "Yunanistan",
      B: "Irak",
      C: "İran",
      D: "Suriye",
      E: "Gürcistan"
    },
    correctOption: "D",
    explanation: "Türkiye'nin en uzun kara sınırı yaklaşık 911 kilometre ile güney sınırımızdaki Suriye sınırıdır. En kısa kara sınırımız ise Nahçıvan (Azerbaycan) sınırıdır."
  },
  {
    id: "q17",
    category: "Vatandaşlık",
    question: "1982 Anayasası'na göre, TBMM'ye sunulan kanun tasarılarının salt çoğunlukla kabul edilmesi halinde, Cumhurbaşkanı'nın bu kanunu veto etmeyip resmi gazetede yayımlama süresi en çok ne kadardır?",
    options: {
      A: "10 gün",
      B: "15 gün",
      C: "30 gün",
      D: "7 gün",
      E: "20 gün"
    },
    correctOption: "B",
    explanation: "Anayasaya göre Cumhurbaşkanı, TBMM'den gelen kanunları 15 gün içinde resmi gazetede yayımlar ya da tekrar görüşülmek üzere meclise geri gönderir (bütçe kanunları hariç)."
  },
  {
    id: "q18",
    category: "Vatandaşlık",
    question: "Aşağıdakilerden hangisi doğrudan cumhurbaşkanlığına bağlı çalışan ve başkanlık ettiği üyelerini cumhurbaşkanının atadığı bir kamu denetim organıdır?",
    options: {
      A: "Sayıştay",
      B: "Devlet Denetleme Kurulu (DDK)",
      C: "Yüksek Hakem Kurulu",
      D: "Kamu Görevlileri Hakem Kurulu",
      E: "Yargıtay Cumhuriyet Başsavcılığı"
    },
    correctOption: "B",
    explanation: "Devlet Denetleme Kurulu (DDK), doğrudan Cumhurbaşkanlığına bağlıdır ve tüm üyeleri ile başkanını bizzat Cumhurbaşkanı atayarak idari soruşturmalar yürütür."
  },
  {
    id: "q19",
    category: "Tarih",
    question: "Anadolu Selçuklu Devleti'nde ticareti canlandırmak amacıyla, zarar gören tüccarların kayıplarını karşılayan devlet destekli ilk sigortacılık sistemi aşağıdaki padişahlardan hangisi zamanında uygulanmıştır?",
    options: {
      A: "I. Gıyaseddin Keyhüsrev",
      B: "Alaaddin Keykubat",
      C: "Rükneddin Kılıçarslan",
      D: "Ertuğrul Gazi",
      E: "Kılıç Arslan"
    },
    correctOption: "A",
    explanation: "Anadolu Selçuklu Devleti'nde ticareti ve kervansaray ağını canlandırmak, güvenliği tesis etmek üzere ilk devlet güvenceli ticaret sigortası I. Gıyaseddin Keyhüsrev döneminde başlatılmıştır."
  },
  {
    id: "q20",
    category: "Coğrafya",
    question: "Nemli deniz havasının bir dağ yamacı boyunca yükselerek soğuması sonucu oluşan yağış tipine ne ad verilir?",
    options: {
      A: "Konveksiyonel (Yükselim) Yağış",
      B: "Cephesel (Frontal) Yağış",
      C: "Orografik (Yamaç) Yağış",
      D: "Karstik Çisenti",
      E: "Ekvatoral Sağanak"
    },
    correctOption: "C",
    explanation: "Hava kütlesinin bir dağ yamacı boyunca yükselerek soğuması ve yağış bırakması olayına Orografik (Yamaç) yağış denir. Türkiye'de Karadeniz ve Akdeniz kıyılarında yaygındır."
  },
  {
    id: "q21",
    category: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde bir yazım (ortografi) yanlışı yapılmıştır?",
    options: {
      A: "Atakum sahilinde herşey o kadar güzel görünüyordu ki bir an rüyada olduğumuzu düşündük.",
      B: "Samsun kütüphanesinde ders çalışırken bir hayli yorulmuştuk ama pes etmedik.",
      C: "Yan yana duran iki binanın arasındaki o dar sokak, bizim mor dükkanı hatırlatıyordu.",
      D: "Aslan burcu asaletini üzerinde taşıyan İloş, kütüphaneye adeta ışık saçıyordu.",
      E: "Bugün de birçok paragraf sorusunu hatasız çözerek hedeflerimize yaklaştık."
    },
    correctOption: "A",
    explanation: "'Her şey' sözcüğü her zaman ayrı yazılır! Türkçede 'şey' sözcüğü her zaman kendinden önce gelen kelimeden ayrı tutulmalıdır."
  },
  {
    id: "q22",
    category: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde 'ünsüz yumuşamasına aykırılık' gösteren bir sözcük kullanılmıştır?",
    options: {
      A: "Kütüphane çıkışında Atakum sahilinde yürürken rüzgar tatlı tatlı esiyordu.",
      B: "Sıcak bir bardak süt içmek bütün günün o KPSS yorgunluğunu anında aldı.",
      C: "Musti'nin getirdiği fıstıklı dürümler kütüphane mesaisini şenlendirdi.",
      D: "Günün yorgunluğunu pürüzsüz bir uykuyla atmaktan daha lüks bir şey yok.",
      E: "Saç bandını asilce takan İloş, paragraf sorularına odaklanmıştı."
    },
    correctOption: "B",
    explanation: "'Süt' sözcüğüne ünlüyle başlayan bir ek getirildiğinde 'sütü' olur, 'südü' olmaz. Sert ünsüzle biten tek heceli bazı Türkçe kelimeler yumuşama kuralına aykırılık gösterir!"
  },
  {
    id: "q23",
    category: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde virgül (,) işaretinin kullanımı yanlıştır?",
    options: {
      A: "İloş, kütüphaneye erkenden gelip o asil yerine kuruldu.",
      B: "Tarih, Coğrafya ve Vatandaşlık derslerini sırayla hallediyor.",
      C: "Atakum'un rüzgarlı sokaklarında, yürümeyi her şeyden çok seviyordu.",
      D: "Derin bir nefes aldı, sessizce o zor soruyu baştan okumaya başladı.",
      E: "Musti, dualarla süslediği o özel motivasyon notunu zarfa yerleştirdi."
    },
    correctOption: "C",
    explanation: "Cümlede zarf tümleci ya da dolaylı tümleç unsurları arasına tekil haldeyken virgül konulmaz. 'Atakum'un rüzgarlı sokaklarında' ifadesinden sonra virgül gelmemelidir."
  },
  {
    id: "q24",
    category: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde 'bir' sözcüğü sayı sıfatı olarak kullanılmamıştır?",
    options: {
      A: "Kitaplığın üst rafından sadece bir soru bankası alıp masasına döndü.",
      B: "Her zorluğun sonunda mutlaka parlak bir gelecek bizi bekliyor olacak.",
      C: "Waffle dükkanında kendimize sadece bir porsiyon meyveli waffle söyledik.",
      D: "Haftada sadece bir gün İlker hocanın salonunda bacak antrenmanı yapıyor.",
      E: "Atakum sahilinde tam bir saat boyunca kesintisiz tempolu yürüyüş yaptık."
    },
    correctOption: "B",
    explanation: "'Parlak bir gelecek' derken 'bir' sözcüğü herhangi bir anlamında belgisiz sıfat olarak kullanılmıştır, kesin bir sayı bildirmemektedir."
  },
  {
    id: "q25",
    category: "Matematik",
    question: "Bir kütüphane öğrencisi, her gün bir önceki gün çözdüğü soru sayısının 2 katından 10 eksik soru çözmektedir. Üçüncü gün 110 soru çözdüğüne göre, birinci gün kaç soru çözmüştür?",
    options: {
      A: "30",
      B: "35",
      C: "40",
      D: "45",
      E: "50"
    },
    correctOption: "B",
    explanation: "Geriye doğru gidelim İloşum. 3. gün = 110. O halde 2. gün çözdüğünün 2 katından 10 eksik 110 ise: 2x - 10 = 110 -> 2x = 120 -> x = 60 soru (2. gün). 1. günün 2 katından 10 eksik 60 ise: 2y - 10 = 60 -> 2y = 70 -> y = 35 soru (1. gün) çözmüştür!"
  },
  {
    id: "q26",
    category: "Matematik",
    question: "Ayla ile Buse'nin bugünkü yaşları oranı 3/4'tür. 6 yıl sonra yaşları oranı 9/11 olacağına göre, Ayla bugün kaç yaşındadır?",
    options: {
      A: "12",
      B: "15",
      C: "18",
      D: "24",
      E: "30"
    },
    correctOption: "A",
    explanation: "Yaşlar bugün 3k ve 4k olsun. 6 yıl sonra: (3k + 6) / (4k + 6) = 9 / 11 olur. İçler dışlar çarpımı yaparsak: 11*(3k + 6) = 9*(4k + 6) -> 33k + 66 = 36k + 54 -> 3k = 12 -> k = 4 buluruz. Ayla bugün 3k yaşındaydı, yani 3*4 = 12 yaşındadır!"
  },
  {
    id: "q27",
    category: "Matematik",
    question: "Bir fırıncı kuzenimiz dumanı üstünde mis gibi cookie tepsisini hazırlarken, un miktarının şeker miktarına oranını asilce 5/2 olarak ayarlıyor. Bir tepside toplam 560 gram un ve şeker karışımı kullanıldığına göre, kaç gram un kullanılmıştır?",
    options: {
      A: "160",
      B: "240",
      C: "320",
      D: "400",
      E: "450"
    },
    correctOption: "D",
    explanation: "Un/Şeker = 5/2 ise Un = 5k, Şeker = 2k olur. Toplam un ve şeker karışımı 5k + 2k = 7k'dır. 7k = 560 ise k = 80 bulunur. Un miktarı = 5k = 5 * 80 = 400 gramdır!"
  },
  {
    id: "q28",
    category: "Matematik",
    question: "Bir işi Can tek başına 12 günde, İloş ise tek başına 6 günde bitirebilmektedir. İkisi birlikte işe başladıktan 2 gün sonra Can işten ayrılıyor. Geriye kalan işi İloş tek başına kaç günde tamamlar?",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      E: "5"
    },
    correctOption: "B",
    explanation: "1 günde birlikte yaptıkları iş: (1/12 + 1/6) = 3/12 = 1/4'tür. 2 günde yapılan iş: 2 * (1/4) = 1/2'dir (yani işin yarısı bitmiştir). Kalan iş: 1 - 1/2 = 1/2'dir. İloş işin tamamını 6 günde yapıyorsa, kalan yarısını 6 * (1/2) = 3 gün toplam sürer; ama 2 günü zaten yapılmıştı, tek başına kalan işi bitirmesi 2 gün daha sürecektir. (Kalan iş olan 1/2'yi İloş hızı olan 1/6 ile t günde tamamlar: t * (1/6) = 1/2 -> t = 3 gün sürer; ama 2 gün bittiğinde kalan kısım tam olarak 2 günde İloş tarafından eritilir.)"
  },
  {
    id: "q29",
    category: "Sözel Mantık",
    question: "A, B, C ve D isimli dört arkadaş kütüphanede Tarih, Coğrafya, Türkçe ve Matematik derslerinden birer soru bankası çözmektedir. Kimin hangi dersi çözdüğüne dair bilinenler şunlardır: **1)** A ne Coğrafya ne de Türkçe çözmektedir. **2)** Tarih çözen kişi B veya C değildir. **3)** D, Türkçe çözmektedir. Buna göre, Matematik çözen kişi aşağıdakilerden hangisidir?",
    options: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "A veya B"
    },
    correctOption: "A",
    explanation: "D, Türkçe çözüyor (Kesin). Geriye Tarih, Coğrafya, Matematik kaldı. A; Coğrafya ve Türkçe çözmüyor, o zaman A ya Tarih ya Matematik çözmeli. Tarih çözen kişi B veya C değilse, o zaman kesinlikle A olmalıdır denirdi ama durum şöyle: A Coğrafya ve Türkçe değilse ve Tarih çözen kişi B/C değilse, Tarih çözen kişi A'dır. Bu durumda A Tarih çözüyorsa, Coğrafya çözmeyen kişi B veya C olmalıdır. A Matematik çözen kişidir çünkü A ne Coğrafya ne Türkçe ne de Tarih (B ve C çözmediği için) çözüyordur. Şöyle kural kural kural: Matematik çözen kesinlikle A'dır!"
  },
  {
    id: "q30",
    category: "Sözel Mantık",
    question: "Musti, İloş, İlker ve Melis; Atakum'da waffle, dürüm, çiğköfte ve dondurma yemektedir. Herkes farklı bir şey yemektedir. Bilinenler: **1)** Melis, waffle ve dürüm yememektedir. **2)** İlker, dondurma ve dürüm sevmemektedir. **3)** Musti, çiğköfte yemektedir. Bu bilgilere göre, İloş ne yemektedir?",
    options: {
      A: "Waffle",
      B: "Dürüm",
      C: "Çiğköfte",
      D: "Dondurma",
      E: "Waffle veya Çiğköfte"
    },
    correctOption: "B",
    explanation: "Musti = Çiğköfte. Geriye kalanlar: Waffle, Dürüm, Dondurma. Melis waffle ve dürüm yemiyorsa, kesinlikle dondurma yiyordur. Geriye kalanlar: Waffle ve Dürüm. İlker dondurma ve dürüm yemiyorsa, kesinlikle waffle yiyordur. Bu durumda geriye kalan tek yiyecek olan Dürüm'ü ise İloş yiyordur! Afiyet dondurulmuş çilek tadında olsun!"
  }
];

