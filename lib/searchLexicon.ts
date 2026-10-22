import type { Category, LanguageCode } from "./types";

// These are reviewed search aliases, not translations of the providers' listings.
export const librarySearchTerms: Record<LanguageCode, readonly string[]> = {
  en: ["public library", "public libraries", "library", "libraries"],
  fr: ["bibliothèque publique", "bibliothèques publiques", "bibliothèque", "bibliothèques"],
  zh: ["公共图书馆", "图书馆", "公共圖書館", "圖書館"],
  yue: ["公共圖書館", "圖書館"],
  pa: ["ਲਾਇਬ੍ਰੇਰੀ", "ਪੁਸਤਕਾਲਾ"],
  ur: ["لائبریری", "کتب خانہ"],
  ta: ["நூலகத்தில்", "நூலகம்"],
  tl: ["aklatan", "library"],
  es: ["biblioteca pública", "bibliotecas públicas", "biblioteca", "bibliotecas"],
  ar: ["المكتبات العامة", "المكتبة العامة", "بالمكتبة", "المكتبات", "المكتبة", "مكتبات", "مكتبة"],
  fa: ["کتابخانه عمومی", "کتاب‌خانه", "کتابخانه"],
  hi: ["पुस्तकालय", "लाइब्रेरी"],
  pt: ["biblioteca pública", "bibliotecas públicas", "biblioteca", "bibliotecas"],
  gu: ["પુસ્તકાલય", "લાઇબ્રેરીમાં", "લાઇબ્રેરી"],
  bn: ["গ্রন্থাগার", "লাইব্রেরিতে", "লাইব্রেরি", "পাঠাগার"],
  ja: ["図書館", "としょかん"],
  ko: ["도서관에서", "도서관"],
  hu: ["könyvtárban", "könyvtári", "könyvtárak", "könyvtár"]
};

// Only generic request words are ignored. Ages, dates, topics, places and
// proximity constraints deliberately stay meaningful.
export const searchFillerTerms: Record<LanguageCode, readonly string[]> = {
  en: ["a", "an", "the", "i", "we", "am", "m", "d", "want", "would", "could", "like", "to", "do", "some", "any", "something", "please", "find", "show", "give", "help", "me", "can", "you", "what", "is", "are", "there", "looking", "for", "at", "in", "of", "with", "and", "free", "program", "programs", "programme", "programmes", "activity", "activities", "opportunity", "opportunities", "event", "events"],
  fr: ["je", "nous", "veux", "voudrais", "cherche", "chercher", "trouver", "montre", "moi", "des", "de", "du", "le", "la", "les", "un", "une", "au", "aux", "dans", "pour", "et", "gratuit", "gratuite", "gratuits", "gratuites", "programme", "programmes", "activité", "activités", "événement", "événements"],
  zh: ["我", "想", "要", "找", "寻找", "查找", "请", "幫", "帮", "看看", "的", "在", "有", "一些", "免费", "免費", "活动", "活動", "项目", "項目", "课程", "課程"],
  yue: ["我", "想", "搵", "找", "請", "幫", "嘅", "喺", "有", "啲", "免費", "活動", "課程"],
  pa: ["ਮੈਂ", "ਚਾਹੁੰਦਾ", "ਚਾਹੁੰਦੀ", "ਹਾਂ", "ਲੱਭੋ", "ਦਿਖਾਓ", "ਮੈਨੂੰ", "ਕਿਰਪਾ", "ਕਰਕੇ", "ਲਈ", "ਵਿੱਚ", "ਦੇ", "ਦੀ", "ਅਤੇ", "ਮੁਫ਼ਤ", "ਮੁਫਤ", "ਪ੍ਰੋਗਰਾਮ", "ਗਤੀਵਿਧੀਆਂ"],
  ur: ["میں", "چاہتا", "چاہتی", "ہوں", "تلاش", "کریں", "دکھائیں", "مجھے", "براہ", "کرم", "کے", "کی", "کا", "لیے", "اور", "مفت", "پروگرام", "سرگرمیاں"],
  ta: ["நான்", "எனக்கு", "வேண்டும்", "தேடுங்கள்", "காட்டுங்கள்", "தயவுசெய்து", "இலவச", "நிகழ்ச்சிகள்", "நிகழ்வுகள்", "செயல்பாடுகள்", "மற்றும்"],
  tl: ["ako", "gusto", "ko", "ng", "mga", "ang", "sa", "para", "at", "hanap", "maghanap", "ipakita", "libreng", "libre", "programa", "aktibidad", "pagkakataon"],
  es: ["yo", "quiero", "quisiera", "busco", "buscar", "encuentra", "muéstrame", "por", "favor", "un", "una", "unos", "unas", "el", "la", "los", "las", "de", "del", "en", "para", "y", "gratis", "gratuito", "gratuitos", "gratuita", "gratuitas", "programa", "programas", "actividad", "actividades", "evento", "eventos", "oportunidades"],
  ar: ["أنا", "اريد", "أريد", "ابحث", "أبحث", "اعرض", "أظهر", "لي", "من", "فضلك", "عن", "في", "و", "مجاني", "مجانية", "برامج", "أنشطة", "فعاليات", "فرص"],
  fa: ["من", "میخواهم", "می‌خواهم", "دنبال", "بگرد", "پیدا", "کن", "لطفا", "لطفاً", "در", "برای", "و", "رایگان", "برنامه", "برنامه‌های", "فعالیت", "فعالیت‌های", "فرصت"],
  hi: ["मैं", "मुझे", "चाहिए", "चाहता", "चाहती", "हूँ", "खोजें", "ढूँढें", "दिखाएं", "दिखाएँ", "कृपया", "में", "के", "की", "का", "लिए", "और", "मुफ्त", "मुफ़्त", "निःशुल्क", "कार्यक्रम", "गतिविधियाँ", "अवसर"],
  pt: ["eu", "quero", "gostaria", "procuro", "procurar", "encontre", "mostre", "me", "por", "favor", "um", "uma", "os", "as", "o", "a", "de", "do", "da", "em", "na", "no", "para", "e", "grátis", "gratuito", "gratuitos", "gratuita", "gratuitas", "programa", "programas", "atividade", "atividades", "evento", "eventos", "oportunidades"],
  gu: ["હું", "મને", "જોઈએ", "શોધો", "બતાવો", "કૃપા", "કરીને", "માં", "માટે", "અને", "મફત", "કાર્યક્રમો", "પ્રવૃત્તિઓ", "તકો"],
  bn: ["আমি", "আমাকে", "চাই", "খুঁজুন", "দেখান", "দয়া", "করে", "জন্য", "এবং", "বিনামূল্যে", "বিনামূল্যের", "বিনামূল্য", "প্রোগ্রাম", "অনুষ্ঠান", "কার্যক্রম", "সুযোগ"],
  ja: ["私", "は", "を", "で", "の", "に", "と", "探す", "探して", "ください", "見せて", "無料", "活動", "イベント", "プログラム"],
  ko: ["나", "저", "는", "을", "를", "에서", "찾아", "찾아주세요", "보여주세요", "무료", "활동", "프로그램", "행사"],
  hu: ["én", "szeretnék", "keresek", "keress", "mutass", "nekem", "kérek", "egy", "a", "az", "és", "ingyenes", "program", "programok", "programokat", "foglalkozás", "foglalkozások", "lehetőség", "lehetőségek"]
};

// These explicit request markers select one reviewed filler list independently
// of the interface language. A topic or a library alias alone is not a marker.
export const searchRequestMarkers: Record<LanguageCode, readonly string[]> = {
  en: [], // English request words are already shared by every filler list.
  fr: ["je cherche"],
  zh: ["我想找"],
  yue: ["我想搵"],
  pa: ["ਮੈਨੂੰ"],
  ur: ["مجھے"],
  ta: ["எனக்கு"],
  tl: ["gusto ko"],
  es: ["quiero"],
  ar: ["أبحث عن", "أريد", "اريد"],
  fa: ["من دنبال"],
  hi: ["मुझे"],
  pt: ["quero"],
  gu: ["મને"],
  bn: ["আমি"],
  ja: ["探してください"],
  ko: ["찾아주세요"],
  hu: ["keresek"]
};

export const proximitySearchPhrases: readonly string[] = [
  "near me", "nearby", "close to me", "around me", "près de moi", "à proximité", "附近", "我附近", "就近", "ਨਜ਼ਦੀਕ", "ਮੇਰੇ ਨੇੜੇ", "میرے قریب", "எனக்கு அருகில்", "malapit sa akin", "cerca de mí", "cerca de mi", "بالقرب مني", "قريب مني", "نزدیک من", "نزدیکم", "मेरे पास", "मेरे नज़दीक", "perto de mim", "મારી નજીક", "আমার কাছে", "আমার কাছাকাছি", "近く", "近所", "내 근처", "주변", "közelemben", "a közelben"
];

// A category alias is attached only to records already in that category.
// Coding is not inferred from unrelated software or 3D-making descriptions.
export const categorySearchAliases: Partial<Record<Category, readonly string[]>> = {
  "Library & Community": ["library", "community"],
  "Coding & Robotics": ["code", "coding", "programming", "robot", "robots", "robotics"],
  "Science & Engineering": ["science", "engineering"],
  "AI & Digital Media": ["ai", "artificial intelligence", "digital media"],
  "Makerspace & Fabrication": ["makerspace", "fabrication", "making"],
  Camps: ["camp", "camps"],
  "Hackathons & Competitions": ["hackathon", "hackathons", "competition", "competitions"],
  "Career & Mentorship": ["career", "careers", "mentor", "mentoring", "mentorship"],
  Scholarships: ["scholarship", "scholarships"],
  "Newcomer & Settlement": ["newcomer", "newcomers", "settlement"],
  "Arts & Media": ["art", "arts", "media"],
  "Volunteer Hours": ["volunteer", "volunteering"],
  "Co-op & SHSM": ["co-op", "coop", "shsm"],
  "Youth Leadership": ["leadership"]
};

// Topic aliases need a matching phrase in the provider's title, description or
// tags. A library name or the broad Library & Community category is not evidence
// that an event includes reading, art, crafts or language practice.
// Reviewed topic words describe the activity, not its spoken language. They
// attach only when an original provider signal below establishes that topic.
export const libraryTopicTerms: Record<LanguageCode, { reading: string; art: string; crafts: string; storytime: string; conversation: string }> = {
  en: { reading: "reading", art: "art", crafts: "crafts", storytime: "storytime", conversation: "conversation" },
  fr: { reading: "lecture", art: "art", crafts: "bricolage", storytime: "heure du conte", conversation: "conversation" },
  zh: { reading: "阅读", art: "艺术", crafts: "手工", storytime: "故事时间", conversation: "会话" },
  yue: { reading: "閱讀", art: "藝術", crafts: "手工", storytime: "故事時間", conversation: "會話" },
  pa: { reading: "ਪੜ੍ਹਨਾ", art: "ਕਲਾ", crafts: "ਦਸਤਕਾਰੀ", storytime: "ਕਹਾਣੀ ਦਾ ਸਮਾਂ", conversation: "ਗੱਲਬਾਤ" },
  ur: { reading: "پڑھنا", art: "فن", crafts: "دستکاری", storytime: "کہانی کا وقت", conversation: "گفتگو" },
  ta: { reading: "வாசிப்பு", art: "கலை", crafts: "கைவினை", storytime: "கதைநேரம்", conversation: "உரையாடல்" },
  tl: { reading: "pagbabasa", art: "sining", crafts: "gawaing kamay", storytime: "oras ng kuwento", conversation: "pag-uusap" },
  es: { reading: "lectura", art: "arte", crafts: "manualidades", storytime: "hora del cuento", conversation: "conversación" },
  ar: { reading: "قراءة", art: "فن", crafts: "أشغال يدوية", storytime: "وقت القصة", conversation: "محادثة" },
  fa: { reading: "مطالعه", art: "هنر", crafts: "کاردستی", storytime: "قصه گویی", conversation: "مکالمه" },
  hi: { reading: "पढ़ना", art: "कला", crafts: "हस्तशिल्प", storytime: "कहानी का समय", conversation: "बातचीत" },
  pt: { reading: "leitura", art: "arte", crafts: "artesanato", storytime: "hora do conto", conversation: "conversação" },
  gu: { reading: "વાંચન", art: "કલા", crafts: "હસ્તકલા", storytime: "વાર્તાનો સમય", conversation: "વાતચીત" },
  bn: { reading: "পড়া", art: "শিল্প", crafts: "হস্তশিল্প", storytime: "গল্পের সময়", conversation: "কথোপকথন" },
  ja: { reading: "読書", art: "美術", crafts: "工作", storytime: "おはなし会", conversation: "会話" },
  ko: { reading: "독서", art: "미술", crafts: "공예", storytime: "이야기 시간", conversation: "회화" },
  hu: { reading: "olvasás", art: "művészet", crafts: "kézművesség", storytime: "mesedélután", conversation: "beszélgetés" }
};
const topicTerms = (topic: keyof typeof libraryTopicTerms.en) => Object.values(libraryTopicTerms).map(terms => terms[topic]);

export const sourceTopicSearchAliases: readonly {
  signals: readonly string[];
  aliases: readonly string[];
}[] = [
  {
    signals: ["storytime", "story time", "read aloud", "read-aloud"],
    aliases: ["storytime", "story time", "read aloud", "reading", "storytelling", ...topicTerms("reading"), ...topicTerms("storytime")]
  },
  {
    signals: ["reading", "book club", "book discussion", "reading circle", "reading buddies"],
    aliases: ["reading", "books", ...topicTerms("reading")]
  },
  {
    signals: ["art", "arts", "drawing", "painting", "watercolour", "watercolor", "collage", "sculpture", "sketching"],
    aliases: ["art", "arts", ...topicTerms("art")]
  },
  {
    signals: ["craft", "crafts", "crafting", "knitting", "crochet", "origami", "sewing", "needlework"],
    aliases: ["art", "arts", "craft", "crafts", "crafting", ...topicTerms("art"), ...topicTerms("crafts")]
  },
  {
    signals: ["conversation circle", "conversation club", "conversation café", "conversation cafe", "language café", "language cafe"],
    aliases: ["community", "conversation", "language practice", ...topicTerms("conversation")]
  }
];
