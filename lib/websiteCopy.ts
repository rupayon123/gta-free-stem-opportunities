import type { LanguageCode } from "./types";

type WebsiteCopy = {
  title: string;
  intro: string;
  browse: string;
  interests: string;
  note: string;
  saved: string;
  about: string;
  noAccount: string;
  free: string;
  direct: string;
};

export const websiteCopy: Record<LanguageCode, WebsiteCopy> = {
  en: {
    title: "Free STEM.\nFor curious minds.",
    intro: "Coding clubs, science workshops, and hands-on learning. Find a free place to explore your interests, right here in the GTA.",
    browse: "Find an opportunity",
    interests: "What sparks your curiosity?",
    note: "Browse freely. Save for later. Register with the provider.",
    saved: "Saved",
    about: "How it works",
    noAccount: "No account needed",
    free: "Free to take part",
    direct: "Links to the original source"
  },
  fr: {
    title: "Des activités STEM gratuites.\nPour les esprits curieux.",
    intro: "Clubs de programmation, ateliers scientifiques et activités pratiques. Trouvez une activité gratuite pour explorer vos intérêts, ici dans le Grand Toronto.",
    browse: "Trouver une activité",
    interests: "Qu’est-ce qui éveille votre curiosité ?",
    note: "Explorez librement. Enregistrez pour plus tard. Inscrivez-vous auprès de l’organisme.",
    saved: "Enregistrés",
    about: "Comment ça marche",
    noAccount: "Aucun compte requis",
    free: "Participation gratuite",
    direct: "Liens vers la source originale"
  },
  zh: {
    title: "免费 STEM 活动。\n给充满好奇的你。",
    intro: "编程社团、科学工作坊和动手实践。在大多伦多地区，找到免费探索兴趣的好去处。",
    browse: "寻找活动",
    interests: "什么让你好奇？",
    note: "自由浏览，收藏备用，再向主办方报名。",
    saved: "已收藏",
    about: "使用指南",
    noAccount: "无需账号",
    free: "免费参加",
    direct: "提供原始来源链接"
  },
  yue: {
    title: "免費 STEM 活動。\n畀充滿好奇嘅你。",
    intro: "編程班、科學工作坊、動手學習。喺大多倫多地區，搵個免費探索興趣嘅好去處。",
    browse: "搵活動",
    interests: "有咩令你好奇？",
    note: "隨時睇，儲低遲啲再睇，再向主辦機構報名。",
    saved: "已儲存",
    about: "點樣用",
    noAccount: "唔使開帳戶",
    free: "免費參加",
    direct: "附有原始資料連結"
  },
  pa: {
    title: "ਮੁਫ਼ਤ STEM।\nਜਿਗਿਆਸੂ ਮਨਾਂ ਲਈ।",
    intro: "ਕੋਡਿੰਗ ਕਲੱਬ, ਵਿਗਿਆਨ ਵਰਕਸ਼ਾਪਾਂ ਅਤੇ ਹੱਥੀਂ ਸਿੱਖਣ ਦੇ ਮੌਕੇ। GTA ਵਿੱਚ ਹੀ ਆਪਣੀਆਂ ਦਿਲਚਸਪੀਆਂ ਅਜ਼ਮਾਉਣ ਲਈ ਮੁਫ਼ਤ ਥਾਂ ਲੱਭੋ।",
    browse: "ਮੌਕਾ ਲੱਭੋ",
    interests: "ਤੁਹਾਡੀ ਜਿਗਿਆਸਾ ਕਿਸ ਵਿੱਚ ਹੈ?",
    note: "ਖੁੱਲ੍ਹ ਕੇ ਵੇਖੋ। ਬਾਅਦ ਲਈ ਸੰਭਾਲੋ। ਪ੍ਰੋਗਰਾਮ ਦੀ ਸੰਸਥਾ ਕੋਲ ਰਜਿਸਟਰ ਕਰੋ।",
    saved: "ਸੰਭਾਲੇ ਹੋਏ",
    about: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    noAccount: "ਖਾਤੇ ਦੀ ਲੋੜ ਨਹੀਂ",
    free: "ਭਾਗ ਲੈਣਾ ਮੁਫ਼ਤ ਹੈ",
    direct: "ਅਸਲ ਸਰੋਤ ਦੇ ਲਿੰਕ"
  },
  ur: {
    title: "مفت STEM۔\nتجسس رکھنے والے ذہنوں کے لیے۔",
    intro: "کوڈنگ کلب، سائنس کی ورکشاپس اور عملی سیکھنے کے مواقع۔ GTA میں اپنی دلچسپیوں کو آزمانے کے لیے مفت جگہ تلاش کریں۔",
    browse: "موقع تلاش کریں",
    interests: "آپ کس چیز کے بارے میں جاننا چاہتے ہیں؟",
    note: "آزادی سے دیکھیں۔ بعد کے لیے محفوظ کریں۔ متعلقہ ادارے کے پاس رجسٹر کریں۔",
    saved: "محفوظ کردہ",
    about: "استعمال کا طریقہ",
    noAccount: "اکاؤنٹ کی ضرورت نہیں",
    free: "شرکت مفت ہے",
    direct: "اصل ماخذ کے لنکس"
  },
  ta: {
    title: "இலவச STEM.\nஆர்வமுள்ள அனைவருக்கும்.",
    intro: "கோடிங் குழுக்கள், அறிவியல் பட்டறைகள், செயல்முறை கற்றல். GTA பகுதியில் உங்கள் ஆர்வங்களை ஆராய ஓர் இலவச வாய்ப்பைக் கண்டறியுங்கள்.",
    browse: "வாய்ப்பைக் கண்டறியுங்கள்",
    interests: "எது உங்கள் ஆர்வத்தைத் தூண்டுகிறது?",
    note: "தாராளமாகப் பாருங்கள். பிறகுக்காகச் சேமியுங்கள். நிகழ்ச்சி நடத்தும் அமைப்பிடம் பதிவு செய்யுங்கள்.",
    saved: "சேமித்தவை",
    about: "பயன்படுத்துவது எப்படி",
    noAccount: "கணக்கு தேவையில்லை",
    free: "பங்கேற்பு இலவசம்",
    direct: "அசல் தகவலுக்கான இணைப்புகள்"
  },
  tl: {
    title: "Libreng STEM.\nPara sa mausisang isip.",
    intro: "Mga coding club, science workshop, at aktuwal na pagkatuto. Humanap ng libreng lugar para subukan ang iyong mga hilig, dito mismo sa GTA.",
    browse: "Humanap ng pagkakataon",
    interests: "Ano ang gusto mong tuklasin?",
    note: "Malayang mag-browse. I-save para sa susunod. Magparehistro sa organisasyong nag-aalok nito.",
    saved: "Mga naka-save",
    about: "Paano ito gamitin",
    noAccount: "Hindi kailangan ng account",
    free: "Libreng sumali",
    direct: "Mga link sa orihinal na pinagmulan"
  },
  es: {
    title: "STEM gratis.\nPara mentes curiosas.",
    intro: "Clubes de programación, talleres de ciencias y actividades prácticas. Encuentra un lugar gratuito para explorar tus intereses, aquí en el área metropolitana de Toronto.",
    browse: "Encontrar una oportunidad",
    interests: "¿Qué despierta tu curiosidad?",
    note: "Explora libremente. Guarda para después. Inscríbete con la organización.",
    saved: "Guardados",
    about: "Cómo funciona",
    noAccount: "No necesitas una cuenta",
    free: "Participación gratuita",
    direct: "Enlaces a la fuente original"
  },
  ar: {
    title: "STEM مجانًا.\nللعقول الفضولية.",
    intro: "نوادي البرمجة وورش العلوم والتعلّم العملي. اعثر على مكان مجاني لاستكشاف اهتماماتك، هنا في منطقة تورونتو الكبرى.",
    browse: "اعثر على فرصة",
    interests: "ما الذي يثير فضولك؟",
    note: "تصفّح بحرية. احفظ لوقت لاحق. سجّل لدى الجهة المنظّمة.",
    saved: "المحفوظات",
    about: "كيف يعمل الموقع",
    noAccount: "لا تحتاج إلى حساب",
    free: "المشاركة مجانية",
    direct: "روابط إلى المصدر الأصلي"
  },
  fa: {
    title: "STEM رایگان.\nبرای ذهن‌های کنجکاو.",
    intro: "باشگاه‌های برنامه‌نویسی، کارگاه‌های علمی و یادگیری عملی. همین‌جا در تورنتوی بزرگ، جایی رایگان برای دنبال کردن علاقه‌هایتان پیدا کنید.",
    browse: "یک فرصت پیدا کنید",
    interests: "چه چیزی کنجکاوی شما را برمی‌انگیزد؟",
    note: "آزادانه بگردید. برای بعد ذخیره کنید. نزد برگزارکننده ثبت‌نام کنید.",
    saved: "ذخیره‌شده‌ها",
    about: "روش استفاده",
    noAccount: "نیازی به حساب کاربری نیست",
    free: "شرکت رایگان است",
    direct: "پیوند به منبع اصلی"
  },
  hi: {
    title: "मुफ़्त STEM।\nजिज्ञासु मनों के लिए।",
    intro: "कोडिंग क्लब, विज्ञान कार्यशालाएँ और करके सीखने के मौके। GTA में ही अपनी रुचियाँ तलाशने के लिए एक मुफ़्त जगह खोजें।",
    browse: "एक अवसर खोजें",
    interests: "आपकी जिज्ञासा किसमें है?",
    note: "खुलकर देखें। बाद के लिए सहेजें। आयोजक के पास पंजीकरण करें।",
    saved: "सहेजे गए",
    about: "यह कैसे काम करता है",
    noAccount: "खाते की ज़रूरत नहीं",
    free: "भाग लेना मुफ़्त है",
    direct: "मूल स्रोत के लिंक"
  },
  pt: {
    title: "STEM grátis.\nPara mentes curiosas.",
    intro: "Clubes de programação, oficinas de ciências e atividades práticas. Encontre um lugar gratuito para explorar seus interesses, aqui na Grande Toronto.",
    browse: "Encontrar uma oportunidade",
    interests: "O que desperta sua curiosidade?",
    note: "Explore à vontade. Salve para depois. Inscreva-se com a organização.",
    saved: "Salvos",
    about: "Como funciona",
    noAccount: "Não precisa de conta",
    free: "Participação gratuita",
    direct: "Links para a fonte original"
  },
  gu: {
    title: "મફત STEM.\nજિજ્ઞાસુ મન માટે.",
    intro: "કોડિંગ ક્લબ, વિજ્ઞાન કાર્યશાળાઓ અને જાતે કરીને શીખવાની તકો. GTAમાં જ તમારી રુચિઓ અજમાવવા માટે મફત જગ્યા શોધો.",
    browse: "તક શોધો",
    interests: "તમને શેના વિશે જિજ્ઞાસા છે?",
    note: "મુક્તપણે જુઓ. પછી માટે સાચવો. આયોજક પાસે નોંધણી કરો.",
    saved: "સાચવેલી તકો",
    about: "આ કેવી રીતે કામ કરે છે",
    noAccount: "ખાતાની જરૂર નથી",
    free: "ભાગ લેવો મફત છે",
    direct: "મૂળ સ્રોતની લિંક્સ"
  },
  bn: {
    title: "বিনামূল্যে STEM।\nকৌতূহলী মনের জন্য।",
    intro: "কোডিং ক্লাব, বিজ্ঞানের কর্মশালা আর হাতে-কলমে শেখা। GTA-তেই নিজের আগ্রহ নিয়ে নতুন কিছু শেখার বিনামূল্যের সুযোগ খুঁজুন।",
    browse: "সুযোগ খুঁজুন",
    interests: "কী নিয়ে আপনার কৌতূহল?",
    note: "ইচ্ছেমতো দেখুন। পরের জন্য সংরক্ষণ করুন। আয়োজকের কাছে নিবন্ধন করুন।",
    saved: "সংরক্ষিত",
    about: "ব্যবহার করবেন যেভাবে",
    noAccount: "অ্যাকাউন্ট লাগবে না",
    free: "অংশগ্রহণ বিনামূল্যে",
    direct: "মূল উৎসের লিংক"
  },
  ja: {
    title: "無料のSTEM。\n好奇心いっぱいのあなたへ。",
    intro: "プログラミングクラブ、科学ワークショップ、体験学習。トロント都市圏で、興味のあることに無料で挑戦できる場所を見つけましょう。",
    browse: "参加できる活動を探す",
    interests: "どんなことに興味がありますか？",
    note: "自由に探して、気になる活動を保存。申し込みは主催者のサイトから。",
    saved: "保存済み",
    about: "使い方",
    noAccount: "アカウント不要",
    free: "参加無料",
    direct: "公式の情報源へのリンク"
  },
  ko: {
    title: "무료 STEM.\n호기심 많은 여러분을 위해.",
    intro: "코딩 동아리, 과학 워크숍, 직접 해보는 체험 학습. 광역 토론토에서 관심 있는 분야를 무료로 탐색할 수 있는 곳을 찾아보세요.",
    browse: "참여 기회 찾기",
    interests: "무엇이 궁금한가요?",
    note: "자유롭게 둘러보고 나중을 위해 저장하세요. 신청은 주최 기관에서 하세요.",
    saved: "저장한 활동",
    about: "이용 방법",
    noAccount: "계정 없이 이용",
    free: "무료 참여",
    direct: "원본 출처 링크 제공"
  },
  hu: {
    title: "Ingyenes STEM.\nKíváncsi elméknek.",
    intro: "Programozóklubok, tudományos foglalkozások és gyakorlati tanulás. Találj ingyenes lehetőséget az érdeklődésed felfedezésére itt, Nagy-Torontóban.",
    browse: "Keress egy lehetőséget",
    interests: "Mi kelti fel a kíváncsiságodat?",
    note: "Böngéssz szabadon. Mentsd el későbbre. Jelentkezz a szervezőnél.",
    saved: "Mentett",
    about: "Így működik",
    noAccount: "Nem kell fiók",
    free: "Ingyenes részvétel",
    direct: "Hivatkozások az eredeti forrásra"
  }
};
