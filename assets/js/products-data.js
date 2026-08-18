/* Honeymiood — Product Catalog
   Harvested from the live Cargo Commerce shop (honeymiood.com) —
   product/variant IDs, sizes and prices are real and must stay in
   sync with Cargo's shop admin. Copy is the site's own PL/EN text,
   lightly cleaned up. See data/cargo-site-dump.json for the raw source.

   Image hosting: freight.cargo.site is Cargo's own asset CDN — same
   host the live site already serves photos from, so reusing these
   URLs adds no third-party request and needs no re-upload. */

function hmFreight(hash, name, width) {
  return "https://freight.cargo.site/w/" + (width || 1200) + "/i/" + hash + "/" + name;
}

const PRODUCTS = [
  {
    id: "rzepakowy",
    slug: { pl: "rzepakowy", en: "rapeseed", de: "rapshonig" },
    image: hmFreight("F2206538491760859771258602203894", "1rzepakowy_honeymiood.png"),
    gallery: [
      hmFreight("L2847189092291995114522419604214", "07520012-1.JPG"),
      hmFreight("L2206538101981157493775776557814", "IMG_8066.JPG")
    ],
    origin: "Pasieka dziadka Grzegorza, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "P2253798137", variant: "O3892207573" },
      { label: "1000g", product: "I3861649604", variant: "O3892207573" }
    ],
    pl: {
      title: "Rzepakowy",
      subtitle: "Z mazowieckiej równiny — tradycyjny od czterech pokoleń",
      profile: "Kremowy, delikatny smak, barwa jasna prawie biała",
      consistency: "Kremowany, gęsty",
      benefits: ["Wpływa na koncentrację", "Pobudzający", "Dobry na odporność"],
      usage: "Świetny do słodzenia porannej kawy — łyżeczka miodu rzepakowego rewelacyjnie podbija jej smak.",
      description: "Klasyk z pasieki dziadka Grzegorza, gdzie pszczoły tworzą miód o delikatnej, kremowej konsystencji i subtelnym, kwiatowym aromacie. Jego jasna, niemal biała barwa kryje w sobie bogactwo naturalnych enzymów i antyoksydantów, które wspierają odporność organizmu. Dzięki wysokiej zawartości glukozy działa energetyzująco, co czyni go idealnym wyborem na początek dnia — i najlepszym wyborem dla cukrzyków."
    },
    en: {
      title: "Rapeseed",
      subtitle: "From the Mazovian plain — a family tradition for four generations",
      profile: "Creamy, delicate taste, light almost white colour",
      consistency: "Creamed, thick",
      benefits: ["Supports focus", "Stimulating", "Good for immunity"],
      usage: "Perfect for sweetening morning coffee — a spoonful of rapeseed honey beautifully enhances its flavour.",
      description: "A classic from Grandpa Grzegorz's apiary, where bees create honey with a delicate, creamy texture and a subtle floral aroma. Its light, almost white colour hides a richness of natural enzymes and antioxidants that support the body's immunity. Thanks to its high glucose content, this honey has an energising effect, making it an ideal choice to start the day — and a great option for individuals with diabetes."
    },
    de: {
      title: "Rapshonig",
      subtitle: "Aus der masowischen Tiefebene – Familientradition in vierter Generation",
      profile: "Cremiger, feiner Geschmack, helle, fast weiße Farbe",
      consistency: "Cremig gerührt, feincremig",
      benefits: ["Fördert die Konzentration", "Belebend", "Stärkt das Immunsystem"],
      usage: "Hervorragend zum Süßen des Morgenkaffees – ein Löffel Rapshonig unterstreicht dessen Aroma wunderbar.",
      description: "Ein Klassiker aus der Imkerei von Großvater Grzegorz, wo die Bienen einen Honig mit zarter, cremiger Textur und dezentem Blütenaroma schaffen. Seine helle, beinahe weiße Farbe birgt eine Fülle natürlicher Enzyme und Antioxidantien, die das Immunsystem unterstützen. Dank seines hohen Glukosegehalts wirkt er belebend und ist die perfekte Wahl für den Start in den Tag."
    }
  },
  {
    id: "akacjowy",
    slug: { pl: "akacjowy", en: "acacia", de: "akazienhonig" },
    image: hmFreight("K2200886183016678636153551923958", "akacjowy_honeymiood.png"),
    gallery: [
      hmFreight("G2665639863029007579940922796790", "DSC01494.JPG"),
      hmFreight("Z2665641093021008926746405448438", "DSC01515.JPG")
    ],
    origin: "Rezerwat Kępa Redłowska, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "P0180139165", variant: "O3892207573" },
      { label: "1000g", product: "C0132495884", variant: "O3892207573" }
    ],
    pl: {
      title: "Akacjowy",
      subtitle: "Skarb Rezerwatu Kępa Redłowska",
      profile: "Kwiecisty, słodki aromat",
      consistency: "Płynny i jasny, podczas krystalizacji barwa ciemnieje",
      benefits: ["Antybakteryjny", "Przeciwzapalny", "Uspokajający i kojący"],
      usage: "To tym miodem w naszym domu polewamy owsiankę, słodzimy napary ziołowe i kłócimy się o jego ostatnią łyżkę.",
      description: "Nasz miód akacjowy to prawdziwy skarb tutejszego Rezerwatu Kępa Redłowska. Jego subtelnie słodki smak z delikatnym, kwiatowym aromatem czyni go jednym z najbardziej cenionych miodów w Polsce. Znany jest ze swoich właściwości uspokajających — idealny dla osób czujących przewlekły stres — wspomaga również układ trawienny i działa antybakteryjnie, przeciwzapalnie, regenerując błonę śluzową układu pokarmowego."
    },
    en: {
      title: "Acacia",
      subtitle: "A treasure of the Kępa Redłowska Nature Reserve",
      profile: "Floral aroma, liquid and light in colour",
      consistency: "Darkens during crystallisation",
      benefits: ["Antibacterial", "Anti-inflammatory", "Calming"],
      usage: "At home, this is the honey we drizzle over oatmeal, sweeten herbal infusions with, and sometimes argue over the last spoonful.",
      description: "Our acacia honey is a true treasure of the Kępa Redłowska Nature Reserve. Its subtly sweet taste with a delicate floral aroma makes it one of the most prized honeys in Poland. It is known for its calming properties — ideal for those experiencing chronic stress — and supports the digestive system, working as an antibacterial and anti-inflammatory agent."
    },
    de: {
      title: "Akazienhonig",
      subtitle: "Ein Schatz aus dem Naturschutzgebiet Kępa Redłowska",
      profile: "Blumig-süßes Aroma, flüssig und hell",
      consistency: "Flüssig und klar, dunkelt bei Kristallisation nach",
      benefits: ["Antibakteriell", "Entzündungshemmend", "Beruhigend und wohltuend"],
      usage: "Mit diesem Honig verfeinern wir zu Hause unser Porridge, süßen Kräutertees und streiten uns um den letzten Löffel.",
      description: "Unser Akazienhonig ist ein wahrer Schatz des hiesigen Naturschutzgebiets Kępa Redłowska. Sein fein-süßer Geschmack mit zartem Blütenaroma macht ihn zu einem der beliebtesten Honige. Er ist für seine beruhigenden Eigenschaften bekannt – ideal bei anhaltendem Alltagsstress – unterstützt die Verdauung und wirkt antibakteriell sowie entzündungshemmend."
    }
  },
  {
    id: "wielokwiatowy",
    slug: { pl: "wielokwiatowy", en: "wildflower", de: "bluetenhonig" },
    image: hmFreight("N2206609269704261305963006601974", "jasnywielokwiatowy_honeymiood.png"),
    gallery: [
      hmFreight("B2665652472466939860768315878134", "07520011.JPG"),
      hmFreight("L2847186016242080591233558981366", "DSC03468.JPG")
    ],
    origin: "Rezerwat Kępa Redłowska, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "B1423604264", variant: "O3892207573" },
      { label: "1000g", product: "U1488523096", variant: "O3892207573" }
    ],
    pl: {
      title: "Wielokwiatowy",
      subtitle: "Pyłki chabrów, wiesiołka i roślin bobowatych",
      profile: "Kwiatowy, chabrowy aromat, mocny kolor bursztynu",
      consistency: "Płynny, z czasem krystalizuje drobnoziarniście",
      benefits: ["Detoksykujący", "Wspierający odporność"],
      usage: "Doskonale nadaje się do słodzenia herbaty, polewania naleśników czy jako dodatek do jogurtów.",
      description: "Nasz miód wielokwiatowy zawiera pyłki chabrów, wiesiołka i roślin bobowatych. Wyróżnia się mocno kwiecistym aromatem oraz łagodnym, słodkim smakiem z lekko orzechowymi i ziołowymi nutami. Wspiera regenerację organizmu i detoksykację, wspomagając pracę układu moczowego dzięki obecności pyłków chabrów. Pyłek wiesiołka wpływa korzystnie na kondycję skóry, równowagę hormonalną i odporność. Prawdopodobnie najlepszy z naszych miodów pod względem zapachowym i smakowym."
    },
    en: {
      title: "Wildflower",
      subtitle: "Pollens from cornflowers, evening primrose and legumes",
      profile: "Floral, cornflower aroma, rich amber colour",
      consistency: "Liquid, crystallises over time",
      benefits: ["Detoxifying", "Supports immunity"],
      usage: "Perfect for sweetening tea, topping pancakes, or adding to yoghurt.",
      description: "Our wildflower honey contains pollens from cornflowers, evening primrose, and leguminous plants. It stands out with a rich floral aroma and a mild, sweet taste, with subtle nutty and herbal notes — probably the most aromatic and flavourful of our honeys. It supports the body's regeneration and detoxification, aiding the urinary system thanks to cornflower pollen, while evening primrose pollen benefits skin health, hormonal balance, and immunity."
    },
    de: {
      title: "Blütenhonig",
      subtitle: "Pollen von Kornblumen, Nachtkerze und Schmetterlingsblütlern",
      profile: "Blumiges Kornblumenaroma, sattes Bernstein",
      consistency: "Flüssig, kristallisiert mit der Zeit feinkörnig",
      benefits: ["Entgiftend", "Immunstärkend"],
      usage: "Ideal zum Süßen von Tee, über Pfannkuchen oder als Zutat im Naturjoghurt.",
      description: "Unser Blütenhonig enthält Pollen von Kornblumen, Nachtkerzen und Hülsenfrüchtlern. Er besticht durch sein intensiv blumiges Aroma und einen milden, süßen Geschmack mit dezent nussigen und kräuterigen Noten. Er unterstützt die Regeneration des Körpers und die Entgiftung, fördert dank des Kornblumenpollens die Harnwege, während Nachtkerzenpollen die Hautgesundheit, das hormonelle Gleichgewicht und die Abwehrkräfte stärkt."
    }
  },
  {
    id: "lipowy",
    slug: { pl: "lipowy", en: "linden", de: "lindenhonig" },
    image: hmFreight("C2206609741608868199600756042486", "jasniejszy_lipowy_honeymiood.png"),
    gallery: [
      hmFreight("A2665647448182596736718870883062", "DSC01436.JPG"),
      hmFreight("Q2847186554186031268751503207158", "DSC03482.JPG")
    ],
    origin: "Plaża Redłowska, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "L1279405861", variant: "O3892207573" },
      { label: "1000g", product: "N3972097711", variant: "O3892207573" }
    ],
    pl: {
      title: "Lipowy",
      subtitle: "Nektar kwiatów lipy znad plaży Redłowskiej",
      profile: "Aksamitny, lekko ziołowy z nutą cytrusów, ciemna żywiczna barwa",
      consistency: "Gęsty i długo płynny",
      benefits: ["Regenerujący", "Łagodzi stany zapalne", "Relaksujący"],
      usage: "Warto go na chwilę zatrzymać pod językiem — enzymy wchłoną się, zanim ulegną dezaktywacji w żołądku.",
      description: "Nasz miód lipowy pochodzi z nektaru kwiatów lipy, które rosną przy plaży Redłowskiej. Jest to miód o intensywnym lipowym smaku i zapachu — nie jest gorzki jak niektóre miody lipowe, ma za to lekko ziołowy smak z delikatną nutą cytrusów. Działa napotnie i przeciwgorączkowo, dlatego jest niezastąpiony w walce z przeziębieniem i grypą. Wspomaga układ oddechowy, łagodzi kaszel i ból gardła, a przy tym działa relaksująco, pomagając w stanach napięcia nerwowego i problemach ze snem."
    },
    en: {
      title: "Linden",
      subtitle: "Nectar of linden flowers growing near Redłowo Beach",
      profile: "Velvety, dark resinous hue with a hint of citrus",
      consistency: "Long-flowing, thick",
      benefits: ["Regenerating", "Anti-inflammatory", "Relaxing"],
      usage: "Best kept under the tongue for a moment, letting the enzymes absorb before they're deactivated in the stomach.",
      description: "Our linden honey is made from the nectar of linden flowers growing near Redłowo Beach. It has an intense linden flavour and aroma — unlike some linden honeys, it is not bitter; instead, it offers a slightly herbal taste with a delicate hint of citrus. It has diaphoretic and fever-reducing properties, making it indispensable in fighting colds and the flu, and also supports the respiratory system, soothes coughs, and relieves sore throats."
    },
    de: {
      title: "Lindenhonig",
      subtitle: "Nektar der Lindenblüten am Redłowo-Strand",
      profile: "Samtig, leicht kräuterig mit einer feinen Zitrusnote, dunkler Harzton",
      consistency: "Dickflüssig und lange flüssig bleibend",
      benefits: ["Regenerierend", "Lindert Entzündungen", "Entspannend"],
      usage: "Es lohnt sich, ihn kurz unter der Zunge zergehen zu lassen – so werden die Enzyme aufgenommen, bevor sie im Magen abgebaut werden.",
      description: "Unser Lindenhonig stammt aus dem Nektar von Lindenblüten, die direkt am Strand von Redłowo wachsen. Er zeichnet sich durch einen intensiven Lindengeschmack und -duft aus – keineswegs bitter, sondern angenehm kräuterig mit einer frischen Zitrusnote. Er wirkt schweißtreibend und fiebersenkend, unterstützt die Atemwege, lindert Husten und Halsschmerzen und fördert die Entspannung bei innerer Unruhe."
    }
  },
  {
    id: "zlote-mleko",
    slug: { pl: "rzepakowy-~-złote-mleko", en: "rapeseed-~-golden-milk-2", de: "rapshonig-~-goldene-milch" },
    image: hmFreight("I2206606725437084939573099965174", "uciety_zlotemleko_hoenymiood.png"),
    gallery: [
      hmFreight("N2665618674619149171233488317174", "DSC03196.JPG"),
      hmFreight("B2114152700123516451763151645430", "IMG_3994.jpg")
    ],
    origin: "Pasieka dziadka Grzegorza, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "H4158849584", variant: "O3892207573" }
    ],
    pl: {
      title: "Rzepakowy ~ Złote Mleko",
      subtitle: "Miód rzepakowy z kurkumą, cynamonem i kardamonem",
      profile: "Korzenny, rozgrzewający",
      consistency: "Kremowany",
      benefits: ["Rozgrzewający", "Przeciwzapalny"],
      usage: "Wystarczy łyżeczka do ciepłego mleka lub napoju roślinnego, by przygotować kojący napój inspirowany ajurwedą.",
      description: "Nasz miód rzepakowy z dodatkiem przypraw korzennych inspirowany ajurwedyjską recepturą. Nazwa „złote mleko” nawiązuje do tradycyjnego napoju z mleka z dodatkiem przypraw i miodu, stosowanego od wieków w medycynie wschodniej. Kurkuma, bogata w kurkuminę, ma silne działanie przeciwzapalne i antyoksydacyjne, a dodatek pieprzu czarnego zwiększa jej biodostępność. Cynamon pomaga regulować poziom cukru we krwi, a aromatyczny kardamon działa przeciwbakteryjnie."
    },
    en: {
      title: "Rapeseed Honey ~ Golden Milk",
      subtitle: "Rapeseed honey with turmeric, cinnamon and cardamom",
      profile: "Spiced, warming",
      consistency: "Creamed",
      benefits: ["Warming", "Anti-inflammatory"],
      usage: "Just one teaspoon in warm milk or a plant-based drink makes a soothing, Ayurveda-inspired beverage.",
      description: "Our rapeseed honey with a blend of warming spices is inspired by an Ayurvedic recipe. The name \"Golden Milk\" refers to the traditional drink made with milk, spices, and honey, used for centuries in Eastern medicine. Turmeric, rich in curcumin, has powerful anti-inflammatory and antioxidant properties, while black pepper enhances its bioavailability; cinnamon helps regulate blood sugar, and aromatic cardamom offers antibacterial benefits."
    },
    de: {
      title: "Rapshonig ~ Goldene Milch",
      subtitle: "Rapshonig verfeinert mit Kurkuma, Zimt und Kardamom",
      profile: "Würzig, wärmend",
      consistency: "Cremig gerührt",
      benefits: ["Wärmend", "Entzündungshemmend"],
      usage: "Ein Teelöffel in warmer Milch oder Pflanzendrink genügt für ein wohltuendes, von der Ayurveda-Tradition inspiriertes Heißgetränk.",
      description: "Unser cremiger Rapshonig verfeinert mit wärmenden Gewürzen, inspiriert von traditionellen ayurvedischen Rezepturen. Kurkuma mit hohem Curcumin-Gehalt wirkt stark entzündungshemmend und antioxidativ, während schwarzer Pfeffer die Bioverfügbarkeit optimiert. Zimt unterstützt einen ausgeglichenen Blutzuckerspiegel und aromatischer Kardamom schenkt antibakterielle Frische."
    }
  },
  {
    id: "pierzga",
    slug: { pl: "rzepakowy-z-pierzgą", en: "rapeseed-with-bee-bread-1", de: "rapshonig-mit-bienenbrot" },
    image: hmFreight("P2206590371715934065328338971382", "uciety_pierzga_honeymiood.png"),
    gallery: [
      hmFreight("V2665630592082817759068181179126", "DSC01616.JPG"),
      hmFreight("B2665629354361630645378396400374", "DSC01600.JPG")
    ],
    origin: "Pasieka dziadka Grzegorza, Gdynia",
    harvest: "Zbiór 2025",
    sizes: [
      { label: "320g", product: "A3125722797", variant: "O3892207573" }
    ],
    pl: {
      title: "Rzepakowy z Pierzgą",
      subtitle: "Mały słoiczek zawiera ok. 40 g pierzgi",
      profile: "Kremowy, z drobinkami pierzgi",
      consistency: "Aksamitna, intensywna, lekko ziołowa",
      benefits: ["Antyoksydacyjny", "Odżywczy superfood", "Przeciwbakteryjny"],
      usage: "Idealny do porannej herbaty, jako dodatek do jogurtów, lub łyżeczka na czczo dla wsparcia odporności.",
      description: "Naturalnie kremowy miód rzepakowy z dodatkiem pierzgi to prawdziwy eliksir zdrowia. Pierzga, czyli pyłek kwiatowy poddany fermentacji mlekowej w ulu, stanowi wyjątkowe źródło aminokwasów, witamin (A, B, C, E) i mikroelementów. Wspomaga odporność, regeneruje organizm i korzystnie wpływa na florę jelitową. Dzięki właściwościom antyoksydacyjnym pomaga neutralizować wolne rodniki, a zawarte w nim enzymy wspierają zdrowie serca."
    },
    en: {
      title: "Rapeseed Honey with Bee Bread",
      subtitle: "A small jar contains roughly 40 g of bee bread",
      profile: "Creamy, with tiny bee bread particles",
      consistency: "Velvety, intense, slightly herbal",
      benefits: ["Antioxidant", "Nutritious superfood", "Antibacterial"],
      usage: "Perfect for morning tea, as a topping for yoghurt, or a teaspoon on an empty stomach to support immunity.",
      description: "Naturally creamy rapeseed honey with the addition of bee bread is a true elixir of health. Bee bread — pollen subjected to lactic fermentation in the hive — is an exceptional source of amino acids, vitamins (A, B, C, E), and microelements. It supports immunity, aids in body regeneration, and positively impacts gut flora, while its antioxidant properties help neutralise free radicals and support heart health."
    },
    de: {
      title: "Rapshonig mit Bienenbrot",
      subtitle: "Ein 320g-Glas enthält ca. 40 g wertvolles Bienenbrot (Perga)",
      profile: "Cremig, mit feinen Bienenbrot-Stückchen",
      consistency: "Samtig, intensiv, leicht kräuterig",
      benefits: ["Antioxidativ", "Nährstoffreiches Superfood", "Antibakteriell"],
      usage: "Ideal im Morgentee, als Zutat im Joghurt oder pur auf nüchternen Magen zur Stärkung der Abwehrkräfte.",
      description: "Naturbelassener, cremiger Rapshonig kombiniert mit wertvollem Bienenbrot (Perga) – ein wahres Lebenselixier. Bienenbrot, im Bienenstock milchsauer fermentierter Blütenpollen, ist eine herausragende Quelle für Aminosäuren, Vitamine (A, B, C, E) und Spurenelemente. Es stärkt die Abwehrkräfte, fördert die Regeneration und unterstützt eine gesunde Darmflora."
    }
  },
  {
    id: "swieca",
    slug: { pl: "świeca-z-wosku-pszczelego", en: "beeswax-candle-1", de: "bienenwachskerze" },
    image: hmFreight("W2206618273043534849531282926326", "swieczkaucieta.png"),
    gallery: [
      hmFreight("X2665654410297404803956713138934", "07520013-1.JPG"),
      hmFreight("B2066381379576109531372069268214", "IMG_8939.jpg")
    ],
    origin: "Pasieka rodzinna, Gdynia",
    harvest: "Ręcznie odlewana",
    sizes: [
      { label: "1 x świeca", product: "O0287863125", variant: "O3892207573" },
      { label: "zestaw 3 x świec", product: "C0547502541", variant: "O3892207573" }
    ],
    pl: {
      title: "Świeca z wosku pszczelego",
      subtitle: "Wysokość 10 cm, waga 35 g",
      profile: "Miodowy aromat, oczyszcza powietrze",
      consistency: "Naturalny wosk pszczeli",
      benefits: ["Oczyszcza powietrze", "Bez dymu", "Uspokajający zapach"],
      usage: "Mały luksus dzielony przy każdej wyjątkowej okazji — od codziennej kolacji po długie zimowe wieczory przy książce.",
      description: "Nasze świece z wosku pszczelego wykonujemy z „węzy” wytworzonej z przetopionego wosku naszych pszczół. Ich ciepły aromat o zapachu wnętrza pszczelego ula tworzy w domu wyjątkową atmosferę spokoju, a naturalny skład sprawia, że są w pełni bezpieczne dla zdrowia i środowiska. Neutralizują negatywne jony, eliminując alergeny i poprawiając jakość powietrza, nie wytwarzając dymu."
    },
    en: {
      title: "Beeswax Candle",
      subtitle: "10 cm tall, weighs 35 g",
      profile: "Honey aroma, purifies the air",
      consistency: "Natural beeswax",
      benefits: ["Air-purifying", "Smoke-free", "Calming scent"],
      usage: "A small luxury we share on every special occasion — from a daily dinner to long winter evenings with a book.",
      description: "Our beeswax candles are made from \"bee comb\" created from the melted wax of our bees. Their warm aroma, reminiscent of the inside of a beehive, creates a unique atmosphere of peace in the home, while the natural composition ensures they are completely safe for health and the environment. They neutralise negative ions, eliminate allergens and improve air quality without producing smoke."
    },
    de: {
      title: "Bienenwachskerze",
      subtitle: "Höhe 10 cm, Gewicht 35 g",
      profile: "Honigduft, reinigt die Raumluft",
      consistency: "100% reines Bienenwachs",
      benefits: ["Luftreinigend", "Rußfrei", "Beruhigender Duft"],
      usage: "Ein kleiner Luxus für besondere Augenblicke – vom gemeinsamen Abendessen bis zu gemütlichen Winterabenden mit einem Buch.",
      description: "Unsere Bienenwachskerzen werden aus Mittelwänden aus dem reinen Wachs unserer eigenen Bienen handgefertigt. Ihr warmer, natürlicher Duft nach Bienenstock schafft eine behagliche Wohlfühlatmosphäre. Sie setzen beim gleichmäßigen Abbrennen negative Ionen frei, binden Staub und Pollen und verbessern so die Raumluft ganz ohne künstliche Zusätze."
    }
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.hmFreight = hmFreight;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS, hmFreight };
}
