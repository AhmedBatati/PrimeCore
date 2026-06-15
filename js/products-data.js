var products = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    category: "laptops",
    condition: "new",
    price: 3499,
    currency: "USD",
    shortDescription: "أقوى لابتوب من Apple بشريحة M3 Max وشاشة Liquid Retina XDR مذهلة مقاس 16.2 بوصة.",
    fullDescription: "صُمم MacBook Pro 16 بشريحة M3 Max للمحترفين الذين يحتاجون أداءً بلا تنازل، حيث يقدم قوة معالجة استثنائية عبر معالج مركزي من 16 نواة ومعالج رسومي من 40 نواة. توفر شاشة Liquid Retina XDR مدى ديناميكيًا عاليًا وسطوعًا يصل إلى 1600 شمعة، بينما يحافظ نظام التبريد المتقدم على استقرار الأداء تحت الضغط. ومع بطارية تصل إلى 22 ساعة ومنافذ احترافية مثل Thunderbolt 4 وHDMI ومنفذ SDXC، يعيد هذا الجهاز تعريف ما يمكن أن يقدمه اللابتوب الاحترافي.",
    specifications: {
      "المعالج": "Apple M3 Max (معالج مركزي 16 نواة، معالج رسومي 40 نواة)",
      "الذاكرة": "48 جيجابايت ذاكرة موحدة",
      "التخزين": "1 تيرابايت SSD",
      "الشاشة": "16.2 بوصة Liquid Retina XDR، بدقة 3456x2234",
      "البطارية": "حتى 22 ساعة"
    },
    images: ["images/products/product-1-1.jpg", "images/products/product-1-2.jpg", "images/products/product-1-3.jpg"],
    featured: true,
    dateAdded: "2026-01-15"
  },
  {
    id: 2,
    name: "Dell XPS 16",
    category: "laptops",
    condition: "new",
    price: 2199,
    currency: "USD",
    shortDescription: "ألترابوك فاخر بمعالج Intel Core Ultra 9 وشاشة OLED ممتدة وهيكل ألمنيوم مصقول.",
    fullDescription: "يعيد Dell XPS 16 تقديم تجربة اللابتوب الفاخر بنظام Windows عبر معالج Intel Core Ultra 9 ورسوميات Intel Arc. تأتي شاشة OLED InfinityEdge مقاس 16 بوصة بدقة 4K مع حواف نحيفة جدًا ونسبة شاشة إلى جسم تبلغ 93.9% لتجربة مشاهدة غامرة. يجمع الهيكل المصنوع من الألمنيوم المشغول بتقنية CNC مع زجاج Gorilla Glass 3 بين المتانة والأناقة، بينما يمنحك التتش باد اللمسي ولوحة المفاتيح الممتدة تجربة استخدام دقيقة ومريحة.",
    specifications: {
      "المعالج": "Intel Core Ultra 9 285H",
      "الذاكرة": "32 جيجابايت LPDDR5X",
      "التخزين": "1 تيرابايت PCIe Gen 4 SSD",
      "الشاشة": "16 بوصة OLED 4K، بدقة 3840x2400",
      "البطارية": "حتى 14 ساعة"
    },
    images: ["images/products/product-2-1.jpg", "images/products/product-2-2.jpg"],
    featured: true,
    dateAdded: "2026-02-10"
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "laptops",
    condition: "new",
    price: 1849,
    currency: "USD",
    shortDescription: "لابتوب أعمال رائد بشاشة OLED 2.8K ومتانة بمعيار MIL-STD-810H ومعالج Intel Core Ultra 7.",
    fullDescription: "يواصل Lenovo ThinkPad X1 Carbon Gen 12 إرث أجهزة الأعمال الاحترافية بهيكل خفيف جدًا من ألياف الكربون يزن 2.4 رطل ويلبي معايير المتانة العسكرية MIL-STD-810H. يعمل بمعالج Intel Core Ultra 7 مع vPro لتوفير أمان وإدارة بمستوى مؤسسي. شاشة OLED مقاس 14 بوصة بدقة 2.8K تغطي 100% من نطاق DCI-P3، ما يجعل الجهاز مناسبًا للتصميم والعمل على البيانات، بينما يضمن TrackPoint الشهير والتتش باد اللمسي دقة تحكم عالية.",
    specifications: {
      "المعالج": "Intel Core Ultra 7 165U",
      "الذاكرة": "16 جيجابايت LPDDR5X",
      "التخزين": "512 جيجابايت PCIe Gen 4 SSD",
      "الشاشة": "14 بوصة OLED 2.8K، بدقة 2880x1800",
      "الوزن": "2.4 رطل"
    },
    images: ["images/products/product-3-1.jpg", "images/products/product-3-2.jpg"],
    featured: false,
    dateAdded: "2026-03-05"
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G16",
    category: "laptops",
    condition: "used",
    price: 1599,
    currency: "USD",
    shortDescription: "لابتوب ألعاب فاخر بمعالج Intel Core i9 وبطاقة NVIDIA GeForce RTX 4070 داخل هيكل نحيف.",
    fullDescription: "يثبت ASUS ROG Zephyrus G16 أن قوة الألعاب لا تحتاج إلى جهاز ضخم. بسماكة 0.7 بوصة ووزن 4.3 رطل فقط، يضم الجهاز معالج Intel Core i9-14900HX وبطاقة NVIDIA GeForce RTX 4070. شاشة Nebula QHD مقاس 16 بوصة بمعدل تحديث 240 هرتز وتغطية 100% من DCI-P3 تقدم سلاسة عالية للألعاب التنافسية وصناعة المحتوى. كما يأتي الهيكل المصنوع من الألمنيوم المشغول بتقنية CNC بلون Slate Gray مع إضاءة AniMe Matrix المميزة من ROG.",
    specifications: {
      "المعالج": "Intel Core i9-14900HX",
      "معالج الرسوميات": "NVIDIA GeForce RTX 4070 بسعة 8 جيجابايت",
      "الذاكرة": "16 جيجابايت DDR5",
      "التخزين": "1 تيرابايت PCIe Gen 4 SSD",
      "الشاشة": "16 بوصة QHD بمعدل 240 هرتز، بدقة 2560x1600"
    },
    images: ["images/products/product-4-1.jpg", "images/products/product-4-2.jpg"],
    featured: false,
    dateAdded: "2026-01-28"
  },
  {
    id: 5,
    name: "Microsoft Surface Laptop 7",
    category: "laptops",
    condition: "new",
    price: 1299,
    currency: "USD",
    shortDescription: "جهاز Copilot+ من Microsoft بمعالج Snapdragon X Elite وشاشة PixelSense لمس نابضة بالحياة.",
    fullDescription: "يمثل Microsoft Surface Laptop 7 مرحلة جديدة في أجهزة Windows بفضل معالج Snapdragon X Elite الذي يقدم أداءً ممتازًا مقابل استهلاك طاقة منخفض واتصالًا دائمًا. شاشة PixelSense اللمسية مقاس 15 بوصة بدقة 2496x1664 ومعدل تحديث 120 هرتز تدعم اللمس وقلم Surface Slim Pen. ومع بطارية تصل إلى 15 ساعة ومسند يد Alcantara أنيق ودعم ميزات الذكاء الاصطناعي في Windows 11 عبر وحدة NPU مخصصة، يصبح الجهاز رفيق إنتاجية قويًا للعمل الحديث.",
    specifications: {
      "المعالج": "Snapdragon X Elite X1E-80-100",
      "الذاكرة": "16 جيجابايت LPDDR5X",
      "التخزين": "512 جيجابايت SSD",
      "الشاشة": "15 بوصة PixelSense، بدقة 2496x1664، 120 هرتز",
      "البطارية": "حتى 15 ساعة"
    },
    images: ["images/products/product-5-1.jpg", "images/products/product-5-2.jpg"],
    featured: false,
    dateAdded: "2026-04-01"
  },
  {
    id: 6,
    name: "iPhone 15 Pro Max",
    category: "phones",
    condition: "new",
    price: 1199,
    currency: "USD",
    shortDescription: "هاتف Apple الرائد بتصميم تيتانيوم وشريحة A17 Pro ونظام كاميرات احترافي 48 ميجابكسل مع تقريب بصري 5x.",
    fullDescription: "يمثل iPhone 15 Pro Max قمة هندسة الهواتف الذكية بتصميم تيتانيوم خفيف بمعايير صناعة الطيران وشريحة A17 Pro المبنية بتقنية 3 نانومتر. شاشة Super Retina XDR مقاس 6.7 بوصة مع ProMotion تقدم معدل تحديث تكيفي 120 هرتز، بينما يضم نظام الكاميرات الاحترافي مستشعرًا رئيسيًا بدقة 48 ميجابكسل وطلاءً دقيقًا لتقليل توهج العدسة. كما يمنحك التقريب البصري 5x وماسح LiDAR وزر Action تجربة تصوير وإنتاجية أكثر احترافًا.",
    specifications: {
      "المعالج": "A17 Pro (بدقة تصنيع 3 نانومتر)",
      "الشاشة": "6.7 بوصة Super Retina XDR، بدقة 2796x1290، 120 هرتز",
      "الكاميرا": "رئيسية 48 ميجابكسل + واسعة جدًا 12 ميجابكسل + تيليفوتو 12 ميجابكسل بتقريب 5x",
      "التخزين": "256 جيجابايت",
      "البطارية": "حتى 29 ساعة تشغيل فيديو"
    },
    images: ["images/products/product-6-1.jpg", "images/products/product-6-2.jpg", "images/products/product-6-3.jpg"],
    featured: true,
    dateAdded: "2026-01-10"
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    category: "phones",
    condition: "new",
    price: 1299,
    currency: "USD",
    shortDescription: "أقوى هواتف Android مع Galaxy AI وإطار تيتانيوم ونظام كاميرات رباعي بدقة 200 ميجابكسل.",
    fullDescription: "يرفع Samsung Galaxy S24 Ultra مستوى الذكاء في الهواتف عبر ميزات Galaxy AI مثل الترجمة الفورية وتحرير الصور التوليدي وتلخيص الملاحظات بذكاء. يوفر الإطار التيتانيومي وزجاج Corning Gorilla Armor متانة عالية، بينما تقدم شاشة Dynamic AMOLED 2X مقاس 6.8 بوصة سطوعًا يصل إلى 2600 شمعة. ومع كاميرا رئيسية 200 ميجابكسل وعدستين تيليفوتو بتقريب بصري 3x و5x وقلم S Pen مدمج، يصبح الجهاز خيارًا قويًا للمبدعين والمحترفين.",
    specifications: {
      "المعالج": "Snapdragon 8 Gen 3 for Galaxy",
      "الشاشة": "6.8 بوصة Dynamic AMOLED 2X، بدقة 3120x1440، 120 هرتز",
      "الكاميرا": "200 ميجابكسل + 50 ميجابكسل + 12 ميجابكسل + 10 ميجابكسل",
      "التخزين": "512 جيجابايت",
      "البطارية": "5000 مللي أمبير، حتى 30 ساعة فيديو"
    },
    images: ["images/products/product-7-1.jpg", "images/products/product-7-2.jpg"],
    featured: true,
    dateAdded: "2026-02-20"
  },
  {
    id: 8,
    name: "Google Pixel 9 Pro",
    category: "phones",
    condition: "new",
    price: 999,
    currency: "USD",
    shortDescription: "هاتف Google الرائد المدعوم بالذكاء الاصطناعي مع Tensor G4 وكاميرا 50 ميجابكسل وتحديثات لمدة 7 سنوات.",
    fullDescription: "يقدم Google Pixel 9 Pro تجربة Android نقية بفضل شريحة Tensor G4 المصممة من Google، والتي تفتح ميزات ذكاء اصطناعي متقدمة مثل Magic Eraser وBest Take وفحص المكالمات الفوري. شاشة LTPO OLED مقاس 6.3 بوصة بمعدل تحديث تكيفي 120 هرتز محمية بزجاج Gorilla Glass Victus 2، بينما تلتقط الكاميرا الرئيسية 50 ميجابكسل بتقنية Octa-PD تفاصيل دقيقة في مختلف ظروف الإضاءة. ومع سبع سنوات من تحديثات النظام والأمان وميزات Pixel، يعد من أطول الهواتف دعمًا في السوق.",
    specifications: {
      "المعالج": "Google Tensor G4",
      "الشاشة": "6.3 بوصة LTPO OLED، بدقة 2856x1280، 120 هرتز",
      "الكاميرا": "رئيسية 50 ميجابكسل + واسعة جدًا 48 ميجابكسل + تيليفوتو 48 ميجابكسل",
      "التخزين": "128 جيجابايت",
      "نظام التشغيل": "Android 15 مع تحديثات لمدة 7 سنوات"
    },
    images: ["images/products/product-8-1.jpg", "images/products/product-8-2.jpg"],
    featured: false,
    dateAdded: "2026-03-12"
  },
  {
    id: 9,
    name: "OnePlus 12",
    category: "phones",
    condition: "used",
    price: 699,
    currency: "USD",
    shortDescription: "هاتف رائد قوي بمعالج Snapdragon 8 Gen 3 وكاميرات Hasselblad وشحن SUPERVOOC بقدرة 100 واط.",
    fullDescription: "يستعيد OnePlus 12 لقب الهاتف الرائد بسعر ذكي عبر معالج Snapdragon 8 Gen 3 وذاكرة تصل إلى 16 جيجابايت ونظام شحن SUPERVOOC بقدرة 100 واط يشحن بطارية 5400 مللي أمبير من 0 إلى 100 خلال 26 دقيقة فقط. شاشة ProXDR LTPO AMOLED مقاس 6.82 بوصة بسطوع يصل إلى 4500 شمعة تعد من أكثر الشاشات سطوعًا في السوق. وبالتعاون مع Hasselblad، يقدم نظام الكاميرات الثلاثي ألوانًا طبيعية، مع عودة زر التنبيه الجانبي لتركيز أفضل.",
    specifications: {
      "المعالج": "Snapdragon 8 Gen 3",
      "الشاشة": "6.82 بوصة ProXDR LTPO AMOLED، بدقة 3168x1440، 120 هرتز",
      "الكاميرا": "50 ميجابكسل + منظار 64 ميجابكسل + واسعة جدًا 48 ميجابكسل",
      "الذاكرة": "16 جيجابايت",
      "الشحن": "SUPERVOOC بقدرة 100 واط، وشحن لاسلكي 50 واط"
    },
    images: ["images/products/product-9-1.jpg", "images/products/product-9-2.jpg"],
    featured: false,
    dateAdded: "2026-02-05"
  },
  {
    id: 10,
    name: "Sony Xperia 1 VI",
    category: "phones",
    condition: "new",
    price: 1099,
    currency: "USD",
    shortDescription: "هاتف Sony المخصص للوسائط بشاشة OLED 4K HDR مقاس 6.5 بوصة وتحكم كاميرا احترافي.",
    fullDescription: "صُمم Sony Xperia 1 VI لصناع المحتوى وعشاق الوسائط، حيث يأتي بشاشة OLED 4K HDR مقاس 6.5 بوصة بنسبة عرض سينمائية 21:9 ومعايرة BRAVIA Core. يعمل بمعالج Snapdragon 8 Gen 3 ويضم نظام كاميرات ثلاثي 48 ميجابكسل مع تركيز تلقائي فوري على العين للبشر والحيوانات، مستفيدًا من تقنيات كاميرات Sony Alpha. كما أن منفذ السماعات 3.5 ملم ومحول الصوت عالي الجودة والسماعات الأمامية وزر التصوير المخصص تجعله هاتفًا مثاليًا للمبدعين.",
    specifications: {
      "المعالج": "Snapdragon 8 Gen 3",
      "الشاشة": "6.5 بوصة OLED 4K HDR، بدقة 3840x1644، 120 هرتز",
      "الكاميرا": "48 ميجابكسل + تيليفوتو 12 ميجابكسل + واسعة جدًا 12 ميجابكسل",
      "التخزين": "256 جيجابايت + بطاقة microSD حتى 1 تيرابايت",
      "الصوت": "منفذ 3.5 ملم، Dolby Atmos، سماعات ستيريو أمامية"
    },
    images: ["images/products/product-10-1.jpg", "images/products/product-10-2.jpg"],
    featured: false,
    dateAdded: "2026-04-10"
  },
  {
    id: 11,
    name: "AirPods Max 2",
    category: "accessories",
    condition: "new",
    price: 549,
    currency: "USD",
    shortDescription: "سماعات Apple فوق الأذن بشريحة H2 ومنفذ USB-C وإلغاء ضجيج نشط متقدم.",
    fullDescription: "تقدم AirPods Max 2 تجربة استماع فوق الأذن بتصميم متطور، مع شريحة H2 من Apple التي تدعم الصوت التكيفي والصوت المكاني المخصص مع تتبع حركة الرأس ونظام إلغاء ضجيج نشط بمستوى أعلى. يوفر طوق الرأس الشبكي ووسائد الذاكرة راحة ممتازة لجلسات الاستماع الطويلة. ومع شحن USB-C وبطارية تصل إلى 20 ساعة مع تفعيل إلغاء الضجيج والتنقل السلس بين أجهزة Apple عبر iCloud، تعد خيارًا فاخرًا لمنظومة Apple.",
    specifications: {
      "وحدة الصوت": "محركات ديناميكية 40 ملم من تصميم Apple",
      "الشريحة": "Apple H2",
      "عمر البطارية": "20 ساعة مع إلغاء الضجيج النشط",
      "الاتصال": "Bluetooth 5.3، USB-C",
      "الوزن": "13.6 أونصة"
    },
    images: ["images/products/product-11-1.jpg", "images/products/product-11-2.jpg"],
    featured: false,
    dateAdded: "2026-03-18"
  },
  {
    id: 12,
    name: "Samsung Galaxy Buds3 Pro",
    category: "accessories",
    condition: "used",
    price: 199,
    currency: "USD",
    shortDescription: "سماعات أذن فاخرة من Samsung بنظام صوت مزدوج وإلغاء ضجيج تكيفي وميزات Galaxy AI.",
    fullDescription: "تقدم Samsung Galaxy Buds3 Pro تجربة صوتية محسنة عبر نظام محركين يفصل بين الجهير والترددات العالية للحصول على صوت قريب من جودة الاستوديو. يتكيف إلغاء الضجيج النشط بذكاء مع البيئة المحيطة، بينما تضيف ميزات Galaxy AI مثل وضع الترجمة والأوامر الصوتية طبقة ذكية تتجاوز السماعات التقليدية. كما يمنحها تصميم blade-light ومقاومة الماء والغبار بمعيار IP57 جاهزية ممتازة للاستخدام اليومي والنشاطات المتحركة، مع شحن لاسلكي Qi طوال اليوم.",
    specifications: {
      "وحدة الصوت": "محرك مزدوج (ووفر + تويتر)",
      "عمر البطارية": "6 ساعات مع إلغاء الضجيج، و26 ساعة مع العلبة",
      "الاتصال": "Bluetooth 5.4، Samsung Seamless Codec",
      "مقاومة الماء": "IP57",
      "اللون": "فضي"
    },
    images: ["images/products/product-12-1.jpg", "images/products/product-12-2.jpg"],
    featured: false,
    dateAdded: "2026-04-05"
  },
  {
    id: 13,
    name: "Apple Watch Ultra 2",
    category: "accessories",
    condition: "new",
    price: 799,
    currency: "USD",
    shortDescription: "أقوى ساعة Apple Watch بهيكل متين وGPS مزدوج التردد وشاشة بسطوع 3000 شمعة.",
    fullDescription: "صُممت Apple Watch Ultra 2 لرياضيي التحمل والمستكشفين، مع هيكل تيتانيوم مقاس 49 ملم وشاشة مسطحة من كريستال الياقوت يصل سطوعها إلى 3000 شمعة، وهي من أقوى شاشات Apple سطوعًا. يوفر GPS مزدوج التردد عالي الدقة (L1 + L5) تتبعًا ممتازًا حتى في البيئات الحضرية أو البرية الصعبة. ومع اعتماد للغوص حتى 40 مترًا وصفارة طوارئ وبطارية تصل إلى 36 ساعة، تعد رفيقًا مثاليًا للرياضة والمغامرة.",
    specifications: {
      "المعالج": "Apple S9 SiP",
      "الشاشة": "49 ملم، 3000 شمعة، كريستال ياقوت",
      "عمر البطارية": "36 ساعة استخدام عادي، 72 ساعة في وضع الطاقة المنخفضة",
      "مقاومة الماء": "WR100، اعتماد غوص EN13319",
      "الاتصال": "Bluetooth 5.3، Wi-Fi، LTE، GPS مزدوج L1+L5"
    },
    images: ["images/products/product-13-1.jpg", "images/products/product-13-2.jpg"],
    featured: true,
    dateAdded: "2026-01-05"
  },
  {
    id: 14,
    name: "Logitech MX Master 3S",
    category: "accessories",
    condition: "new",
    price: 99,
    currency: "USD",
    shortDescription: "ماوس لاسلكي احترافي من Logitech بدقة تتبع 8K DPI ونقرات هادئة وتمرير MagSpeed كهرومغناطيسي.",
    fullDescription: "يعد Logitech MX Master 3S معيارًا ذهبيًا لماوسات الإنتاجية، حيث يأتي بمستشعر Darkfield ليزري بدقة 8K DPI يعمل على معظم الأسطح بما فيها الزجاج. عجلة التمرير MagSpeed الكهرومغناطيسية تنتقل تلقائيًا بين الوضع المتدرج والتمرير الحر لتصفح آلاف الأسطر بسرعة. ومع تقنية Quiet Click وثلاثة أزرار جانبية قابلة للبرمجة وميزة Flow للتحكم بين الأجهزة، يسهل التنقل بين ما يصل إلى ثلاثة أجهزة تعمل بنظام Windows أو macOS أو Linux. تدوم البطارية حتى 70 يومًا بعد الشحن الكامل.",
    specifications: {
      "المستشعر": "Darkfield Laser بدقة 8000 DPI",
      "عمر البطارية": "70 يومًا، شحن كامل خلال ساعة عبر USB-C",
      "الاتصال": "Bluetooth 5.0، مستقبل Logitech Bolt USB",
      "الأزرار": "7 أزرار قابلة للبرمجة",
      "الوزن": "4.97 أونصة"
    },
    images: ["images/products/product-14-1.jpg", "images/products/product-14-2.jpg"],
    featured: false,
    dateAdded: "2026-02-28"
  },
  {
    id: 15,
    name: "Sony WH-1000XM5",
    category: "accessories",
    condition: "used",
    price: 232,
    currency: "USD",
    shortDescription: "سماعات رائدة في إلغاء الضجيج مع بطارية 30 ساعة ومعالج Sony Integrated Processor V1.",
    fullDescription: "تمثل Sony WH-1000XM5 قمة تقنيات إلغاء الضجيج في السماعات، بفضل Integrated Processor V1 وميكروفونات مزدوجة لاستشعار الضوضاء توفر هدوءًا استثنائيًا. تنتج وحدات الصوت 30 ملم صوتًا واضحًا مع جهير عميق وترددات وسطى طبيعية، بينما تضبط ميزة Adaptive Sound Control الإعدادات تلقائيًا حسب البيئة. ومع بطارية تدوم 30 ساعة واتصال Bluetooth متعدد النقاط وتصميم خفيف مع طوق رأس جلدي ناعم، تعد خيارًا ممتازًا للمسافرين ومحبي الصوت النقي.",
    specifications: {
      "وحدة الصوت": "30 ملم، غشاء مطلي بالذهب",
      "عمر البطارية": "30 ساعة مع إلغاء الضجيج النشط",
      "الاتصال": "Bluetooth 5.2، اتصال متعدد النقاط، LDAC",
      "الوزن": "8.95 أونصة",
      "إلغاء الضجيج": "معالجة مزدوجة، 8 ميكروفونات"
    },
    images: ["images/products/product-15-1.jpg", "images/products/product-15-2.jpg"],
    featured: false,
    dateAdded: "2026-03-25"
  }
];
