import type { LanguageCode, Opportunity } from "./types";

export const languageMeta: Record<
  LanguageCode,
  { label: string; native: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", native: "English", dir: "ltr" },
  fr: { label: "French", native: "Francais", dir: "ltr" },
  zh: { label: "Mandarin", native: "中文", dir: "ltr" },
  yue: { label: "Cantonese/Yue", native: "粵語", dir: "ltr" },
  pa: { label: "Punjabi", native: "ਪੰਜਾਬੀ", dir: "ltr" },
  ur: { label: "Urdu", native: "اردو", dir: "rtl" },
  ta: { label: "Tamil", native: "தமிழ்", dir: "ltr" },
  tl: { label: "Tagalog/Filipino", native: "Tagalog", dir: "ltr" },
  es: { label: "Spanish", native: "Espanol", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
  fa: { label: "Farsi/Persian", native: "فارسی", dir: "rtl" },
  hi: { label: "Hindi", native: "हिन्दी", dir: "ltr" },
  gu: { label: "Gujarati", native: "ગુજરાતી", dir: "ltr" },
  bn: { label: "Bengali", native: "বাংলা", dir: "ltr" },
  ja: { label: "Japanese", native: "日本語", dir: "ltr" },
  ko: { label: "Korean", native: "한국어", dir: "ltr" }
};

type UiKey =
  | "brand"
  | "mission"
  | "beta"
  | "search"
  | "searchPlaceholder"
  | "filters"
  | "list"
  | "map"
  | "language"
  | "siteLanguage"
  | "programLanguage"
  | "theme"
  | "light"
  | "dark"
  | "system"
  | "auto"
  | "region"
  | "city"
  | "category"
  | "age"
  | "distance"
  | "postal"
  | "nearMe"
  | "equity"
  | "black"
  | "girls"
  | "indigenous"
  | "highSchool"
  | "volunteerHours"
  | "coop"
  | "mentorship"
  | "leadership"
  | "verifiedFree"
  | "lastVerified"
  | "calendar"
  | "save"
  | "audit"
  | "source"
  | "suggest"
  | "partner"
  | "report"
  | "adminQueue"
  | "results"
  | "freeOnly"
  | "translationNote"
  | "allGta"
  | "allCities"
  | "allCategories"
  | "any"
  | "showFilters"
  | "hideFilters"
  | "verifiedListings"
  | "launchLanguages"
  | "teenPathways"
  | "sourceScout"
  | "sourceScoutText"
  | "refreshResearch"
  | "registerApply"
  | "saved"
  | "date"
  | "deadline"
  | "ages"
  | "grades"
  | "commitment"
  | "languages"
  | "access"
  | "equipment"
  | "food"
  | "capacity"
  | "currentLanguage"
  | "highSchoolHeading"
  | "volunteerCardText"
  | "coopCardText"
  | "trustChecks"
  | "trustCardText"
  | "communityNetwork"
  | "contributeHeading"
  | "adminQueueSummary"
  | "submit"
  | "submitted";

const ui: Record<LanguageCode, Partial<Record<UiKey, string>>> = {
  en: {
    brand: "GTA FREE STEM Opportunities",
    mission: "Find real, verified free STEM programs, library events, volunteer hours, co-op, SHSM, and youth opportunities across the GTA.",
    beta: "Verified and growing toward complete GTA coverage",
    search: "Search",
    searchPlaceholder: "Search robotics, Python, volunteer hours, co-op, hackathons...",
    filters: "Filters",
    list: "List",
    map: "Map",
    language: "Language",
    siteLanguage: "Site language",
    programLanguage: "Program language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    auto: "Auto",
    region: "Region",
    city: "City",
    category: "Category",
    age: "Age",
    distance: "Distance",
    postal: "Postal code",
    nearMe: "Use my location",
    equity: "Community focus",
    black: "Black-focused",
    girls: "Girls/women-focused",
    indigenous: "Indigenous-focused",
    highSchool: "High school",
    volunteerHours: "Volunteer hours",
    coop: "Co-op",
    mentorship: "Mentorship",
    leadership: "Leadership",
    verifiedFree: "Verified free",
    lastVerified: "Last verified",
    calendar: "Add calendar",
    save: "Save",
    audit: "Admin log",
    source: "Source",
    suggest: "Share a real opportunity",
    partner: "Host STEM, co-op, or volunteer hours",
    report: "Report correction",
    adminQueue: "Admin review queue",
    results: "Results",
    freeOnly: "Everything here is free for everyone.",
    translationNote: "Listing summary translated for browsing; source details remain available for verification.",
    allGta: "All GTA",
    allCities: "All cities",
    allCategories: "All STEM categories",
    any: "Any",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    verifiedListings: "Verified listings",
    launchLanguages: "Site languages",
    teenPathways: "Teen pathways",
    sourceScout: "Actively looking",
    sourceScoutText: "{count} verified listings loaded. {sources} sources scan every 6 hours; {review} new finds are being verified.",
    refreshResearch: "Refresh research",
    registerApply: "Register or apply",
    saved: "Saved",
    date: "Date",
    deadline: "Deadline",
    ages: "Ages",
    grades: "Grades",
    commitment: "Commitment",
    languages: "Languages",
    access: "Access",
    equipment: "Equipment",
    food: "Food",
    capacity: "Capacity",
    currentLanguage: "Current language",
    highSchoolHeading: "Volunteer hours, co-op, SHSM, mentorship, and career pathways",
    volunteerCardText:
      "STEM clubs, conservation projects, library leadership, and community roles that can support high school hours.",
    coopCardText: "Free-to-apply co-op, SHSM, shadowing, internship, and career exploration opportunities with verified partners.",
    trustChecks: "Trust checks",
    trustCardText: "Every youth pathway keeps source links, free-status proof, provider contact, and school-relevant details visible.",
    communityNetwork: "Community network",
    contributeHeading: "Be part of the community",
    adminQueueSummary: "items need cost checks, duplicate merges, translation review, or partner approval.",
    submit: "Submit",
    submitted: "Sent to the local review queue."
  },
  fr: {
    brand: "GTA FREE STEM Opportunities",
    mission: "Trouvez des occasions gratuites d'apprendre, de STEM, de benevolat, de coop et de leadership.",
    beta: "Verifiee et en croissance",
    search: "Rechercher",
    filters: "Filtres",
    list: "Liste",
    map: "Carte",
    language: "Langue",
    theme: "Theme",
    region: "Region",
    city: "Ville",
    category: "Categorie",
    age: "Age",
    highSchool: "Secondaire",
    verifiedFree: "Gratuit verifie",
    calendar: "Ajouter au calendrier",
    save: "Sauver",
    audit: "Historique",
    results: "resultats"
  },
  zh: {
    brand: "GTA FREE STEM Opportunities",
    mission: "寻找GTA免费的学习、STEM、义工、合作教育和青年机会。",
    beta: "已验证并持续扩展",
    search: "搜索",
    filters: "筛选",
    list: "列表",
    map: "地图",
    language: "语言",
    theme: "主题",
    region: "地区",
    city: "城市",
    category: "类别",
    age: "年龄",
    highSchool: "高中",
    verifiedFree: "已确认免费",
    calendar: "加入日历",
    save: "保存",
    audit: "审核记录",
    results: "个结果"
  },
  yue: {
    brand: "GTA FREE STEM Opportunities",
    mission: "搵GTA免費學習、STEM、義工、coop同青年機會。",
    beta: "已核實並持續增加",
    search: "搜尋",
    filters: "篩選",
    list: "列表",
    map: "地圖",
    language: "語言",
    theme: "主題",
    region: "地區",
    city: "城市",
    category: "類別",
    age: "年齡",
    highSchool: "中學",
    verifiedFree: "已核實免費",
    calendar: "加到日曆",
    save: "儲存",
    audit: "審核記錄",
    results: "個結果"
  },
  pa: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA ਵਿੱਚ ਮੁਫ਼ਤ ਲਰਨਿੰਗ, STEM, ਵਲੰਟੀਅਰ, co-op ਅਤੇ ਯੂਥ ਮੌਕੇ ਲੱਭੋ।",
    beta: "ਜਾਂਚਿਆ ਹੋਇਆ ਅਤੇ ਵਧ ਰਿਹਾ ਹੈ",
    search: "ਖੋਜ",
    filters: "ਫਿਲਟਰ",
    list: "ਲਿਸਟ",
    map: "ਨਕਸ਼ਾ",
    language: "ਭਾਸ਼ਾ",
    theme: "ਥੀਮ",
    region: "ਰੀਜਨ",
    city: "ਸ਼ਹਿਰ",
    category: "ਸ਼੍ਰੇਣੀ",
    age: "ਉਮਰ",
    highSchool: "ਹਾਈ ਸਕੂਲ",
    verifiedFree: "ਮੁਫ਼ਤ ਜਾਂਚਿਆ",
    calendar: "ਕੈਲੰਡਰ",
    save: "ਸੇਵ",
    audit: "ਆਡਿਟ",
    results: "ਨਤੀਜੇ"
  },
  ur: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA میں مفت تعلیم، STEM، رضاکاری، co-op اور نوجوانوں کے مواقع تلاش کریں۔",
    beta: "تصدیق شدہ اور بڑھ رہا ہے",
    search: "تلاش",
    filters: "فلٹرز",
    list: "فہرست",
    map: "نقشہ",
    language: "زبان",
    theme: "تھیم",
    region: "علاقہ",
    city: "شہر",
    category: "زمرہ",
    age: "عمر",
    highSchool: "ہائی اسکول",
    verifiedFree: "مفت تصدیق شدہ",
    calendar: "کیلنڈر",
    save: "محفوظ",
    audit: "آڈٹ",
    results: "نتائج"
  },
  ta: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA முழுவதும் இலவச கற்றல், STEM, தன்னார்வம், co-op மற்றும் இளைஞர் வாய்ப்புகள்.",
    beta: "சரிபார்க்கப்பட்டு வளர்கிறது",
    search: "தேடல்",
    filters: "வடிகள்",
    list: "பட்டியல்",
    map: "வரைபடம்",
    language: "மொழி",
    theme: "தீம்",
    region: "பிராந்தியம்",
    city: "நகரம்",
    category: "வகை",
    age: "வயது",
    highSchool: "உயர்நிலை",
    verifiedFree: "இலவசம் உறுதி",
    calendar: "காலண்டர்",
    save: "சேமி",
    audit: "ஆய்வு பதிவு",
    results: "முடிவுகள்"
  },
  tl: {
    brand: "GTA FREE STEM Opportunities",
    mission: "Maghanap ng libreng learning, STEM, volunteer, co-op, at youth opportunities sa GTA.",
    beta: "Verified at patuloy na lumalaki",
    search: "Hanap",
    filters: "Filters",
    list: "Listahan",
    map: "Mapa",
    language: "Wika",
    theme: "Tema",
    region: "Rehiyon",
    city: "Lungsod",
    category: "Kategorya",
    age: "Edad",
    highSchool: "High school",
    verifiedFree: "Libreng verified",
    calendar: "Calendar",
    save: "I-save",
    audit: "Admin log",
    results: "resulta"
  },
  es: {
    brand: "GTA FREE STEM Opportunities",
    mission: "Encuentra aprendizaje, STEM, voluntariado, co-op y oportunidades juveniles gratis en el GTA.",
    beta: "Verificada y creciendo",
    search: "Buscar",
    filters: "Filtros",
    list: "Lista",
    map: "Mapa",
    language: "Idioma",
    theme: "Tema",
    region: "Region",
    city: "Ciudad",
    category: "Categoria",
    age: "Edad",
    highSchool: "Secundaria",
    verifiedFree: "Gratis verificado",
    calendar: "Calendario",
    save: "Guardar",
    audit: "Auditoria",
    results: "resultados"
  },
  ar: {
    brand: "GTA FREE STEM Opportunities",
    mission: "ابحث عن فرص تعلم وSTEM وتطوع وتعاون للشباب مجانا في GTA.",
    beta: "موثقة وتتوسع",
    search: "بحث",
    filters: "فلاتر",
    list: "قائمة",
    map: "خريطة",
    language: "اللغة",
    theme: "المظهر",
    region: "المنطقة",
    city: "المدينة",
    category: "الفئة",
    age: "العمر",
    highSchool: "الثانوي",
    verifiedFree: "مجاني موثق",
    calendar: "التقويم",
    save: "حفظ",
    audit: "سجل التحقق",
    results: "نتائج"
  },
  fa: {
    brand: "GTA FREE STEM Opportunities",
    mission: "فرصت های رایگان یادگیری، STEM، داوطلبی، co-op و جوانان در GTA را پیدا کنید.",
    beta: "تایید شده و در حال رشد",
    search: "جستجو",
    filters: "فیلترها",
    list: "فهرست",
    map: "نقشه",
    language: "زبان",
    theme: "حالت",
    region: "منطقه",
    city: "شهر",
    category: "دسته",
    age: "سن",
    highSchool: "دبیرستان",
    verifiedFree: "رایگان تایید شد",
    calendar: "تقویم",
    save: "ذخیره",
    audit: "سوابق بررسی",
    results: "نتیجه"
  },
  hi: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA में मुफ्त learning, STEM, volunteering, co-op और youth opportunities खोजें।",
    beta: "Verified और बढ़ रहा है",
    search: "खोज",
    filters: "फिल्टर",
    list: "सूची",
    map: "नक्शा",
    language: "भाषा",
    theme: "थीम",
    region: "क्षेत्र",
    city: "शहर",
    category: "श्रेणी",
    age: "उम्र",
    highSchool: "हाई स्कूल",
    verifiedFree: "मुफ्त verified",
    calendar: "कैलेंडर",
    save: "सेव",
    audit: "ऑडिट",
    results: "नतीजे"
  },
  gu: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA માં મફત learning, STEM, volunteer, co-op અને youth opportunities શોધો.",
    beta: "Verified અને વધતું",
    search: "શોધ",
    filters: "ફિલ્ટર્સ",
    list: "યાદી",
    map: "નકશો",
    language: "ભાષા",
    theme: "થીમ",
    region: "પ્રદેશ",
    city: "શહેર",
    category: "કેટેગરી",
    age: "ઉંમર",
    highSchool: "હાઈ સ્કૂલ",
    verifiedFree: "મફત verified",
    calendar: "કેલેન્ડર",
    save: "સેવ",
    audit: "ઓડિટ",
    results: "પરિણામો"
  },
  bn: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA-তে ফ্রি learning, STEM, volunteer, co-op এবং youth opportunity খুঁজুন।",
    beta: "যাচাই করা এবং বাড়ছে",
    search: "খুঁজুন",
    searchPlaceholder: "robotics, Python, volunteer hours, co-op খুঁজুন...",
    filters: "ফিল্টার",
    list: "তালিকা",
    map: "মানচিত্র",
    language: "ভাষা",
    siteLanguage: "সাইটের ভাষা",
    programLanguage: "প্রোগ্রামের ভাষা",
    theme: "থিম",
    light: "লাইট",
    dark: "ডার্ক",
    system: "সিস্টেম",
    auto: "অটো",
    region: "অঞ্চল",
    city: "শহর",
    category: "বিভাগ",
    age: "বয়স",
    distance: "দূরত্ব",
    postal: "পোস্টাল কোড",
    nearMe: "আমার অবস্থান",
    equity: "কমিউনিটি ফোকাস",
    black: "Black-focused",
    girls: "Girls/women-focused",
    indigenous: "Indigenous-focused",
    highSchool: "হাই স্কুল",
    volunteerHours: "Volunteer hours",
    coop: "Co-op",
    mentorship: "Mentorship",
    leadership: "Leadership",
    verifiedFree: "ফ্রি যাচাই",
    calendar: "ক্যালেন্ডার",
    save: "সেভ",
    saved: "সেভ হয়েছে",
    audit: "অডিট",
    results: "ফলাফল",
    freeOnly: "এখানে সবকিছু সবার জন্য ফ্রি।",
    translationNote: "ব্রাউজ করার জন্য সারাংশ অনুবাদ করা হয়েছে; যাচাইয়ের জন্য source details রাখা আছে।",
    allGta: "সব GTA",
    allCities: "সব শহর",
    allCategories: "সব STEM category",
    any: "যেকোনো",
    showFilters: "ফিল্টার দেখুন",
    hideFilters: "ফিল্টার লুকান",
    verifiedListings: "যাচাইকৃত তালিকা",
    launchLanguages: "চালুর ভাষা",
    teenPathways: "টিন pathway",
    registerApply: "রেজিস্টার বা আবেদন",
    date: "তারিখ",
    deadline: "শেষ তারিখ",
    ages: "বয়স",
    grades: "গ্রেড",
    commitment: "সময়",
    languages: "ভাষা",
    access: "অ্যাক্সেস",
    equipment: "সরঞ্জাম",
    food: "খাবার",
    capacity: "সিট",
    highSchoolHeading: "Volunteer hours, co-op, SHSM, mentorship, এবং career pathways",
    volunteerCardText: "STEM clubs, conservation projects, library leadership, এবং community roles।",
    coopCardText: "Verified partners-এর free-to-apply co-op, SHSM, shadowing, internship, এবং career exploration.",
    trustChecks: "Trust checks",
    trustCardText: "প্রতিটি youth pathway-তে source links, free-status proof, contact, এবং source links থাকে।",
    communityNetwork: "Community network",
    contributeHeading: "Be part of the community",
    adminQueueSummary: "items cost check, duplicate merge, translation review, বা partner approval দরকার।",
    submit: "জমা দিন",
    submitted: "Local review queue-তে পাঠানো হয়েছে।"
  },
  ja: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTAの無料学習、STEM、ボランティア、co-op、若者向け機会を探せます。",
    beta: "確認済みで拡大中",
    search: "検索",
    searchPlaceholder: "ロボット、Python、ボランティア時間、co-opを検索...",
    filters: "フィルター",
    list: "リスト",
    map: "地図",
    language: "言語",
    siteLanguage: "サイト言語",
    programLanguage: "プログラム言語",
    theme: "テーマ",
    light: "ライト",
    dark: "ダーク",
    system: "システム",
    auto: "自動",
    region: "地域",
    city: "市",
    category: "カテゴリ",
    age: "年齢",
    distance: "距離",
    postal: "郵便番号",
    nearMe: "現在地を使う",
    equity: "コミュニティ対象",
    black: "Black-focused",
    girls: "Girls/women-focused",
    indigenous: "Indigenous-focused",
    highSchool: "高校生",
    volunteerHours: "ボランティア時間",
    coop: "Co-op",
    mentorship: "メンター",
    leadership: "リーダーシップ",
    verifiedFree: "無料確認済み",
    calendar: "カレンダー",
    save: "保存",
    saved: "保存済み",
    audit: "監査記録",
    results: "件",
    freeOnly: "ここにあるものはすべてみんな無料です。",
    translationNote: "閲覧用に概要を翻訳しています。確認用のソース情報も表示しています。",
    allGta: "GTA全域",
    allCities: "すべての市",
    allCategories: "すべての学習カテゴリ",
    any: "すべて",
    showFilters: "フィルターを開く",
    hideFilters: "フィルターを閉じる",
    verifiedListings: "確認済み掲載",
    launchLanguages: "対応言語",
    teenPathways: "高校生向け",
    registerApply: "登録・応募",
    date: "日付",
    deadline: "締切",
    ages: "年齢",
    grades: "学年",
    commitment: "参加時間",
    languages: "言語",
    access: "アクセス",
    equipment: "持ち物",
    food: "食事",
    capacity: "定員",
    highSchoolHeading: "ボランティア時間、co-op、メンター、キャリア機会",
    volunteerCardText: "STEMクラブ、保全活動、図書館リーダーシップなど高校生の時間に役立つ機会。",
    coopCardText: "確認済みパートナーによる無料応募のco-op、SHSM、職場体験、インターン、キャリア探索。",
    trustChecks: "確認情報",
    trustCardText: "各機会にソース、無料確認、連絡先、学校に役立つ詳細を表示します。",
    communityNetwork: "コミュニティネットワーク",
    contributeHeading: "コミュニティに参加",
    adminQueueSummary: "件は費用確認、重複統合、翻訳確認、または承認が必要です。",
    submit: "送信",
    submitted: "ローカル確認キューに送信しました。"
  },
  ko: {
    brand: "GTA FREE STEM Opportunities",
    mission: "GTA 전역의 무료 STEM 프로그램, 도서관 행사, 봉사 시간, co-op, SHSM, 청소년 기회를 찾을 수 있습니다.",
    beta: "확인된 기회를 계속 넓히는 중",
    search: "검색",
    searchPlaceholder: "로봇, Python, 봉사 시간, co-op 검색...",
    filters: "필터",
    list: "목록",
    map: "지도",
    language: "언어",
    siteLanguage: "사이트 언어",
    programLanguage: "프로그램 언어",
    theme: "테마",
    light: "라이트",
    dark: "다크",
    system: "시스템",
    auto: "자동",
    region: "지역",
    city: "도시",
    category: "카테고리",
    age: "나이",
    distance: "거리",
    postal: "우편 코드",
    nearMe: "내 위치 사용",
    equity: "커뮤니티 초점",
    black: "Black-focused",
    girls: "Girls/women-focused",
    indigenous: "Indigenous-focused",
    highSchool: "고등학생",
    volunteerHours: "봉사 시간",
    coop: "Co-op",
    mentorship: "멘토십",
    leadership: "리더십",
    verifiedFree: "무료 확인됨",
    lastVerified: "마지막 확인",
    calendar: "캘린더 추가",
    save: "저장",
    saved: "저장됨",
    audit: "관리자 로그",
    source: "출처",
    suggest: "실제 기회 공유",
    partner: "STEM, co-op, 봉사 시간 제공",
    report: "수정 신고",
    adminQueue: "관리자 검토 대기열",
    results: "결과",
    freeOnly: "여기에 있는 모든 것은 모두에게 무료입니다.",
    translationNote: "탐색을 위해 요약이 번역되었습니다. 확인을 위한 출처 정보는 그대로 표시됩니다.",
    allGta: "GTA 전체",
    allCities: "모든 도시",
    allCategories: "모든 STEM 카테고리",
    any: "전체",
    showFilters: "필터 보기",
    hideFilters: "필터 숨기기",
    verifiedListings: "확인된 목록",
    launchLanguages: "지원 언어",
    teenPathways: "청소년 경로",
    registerApply: "등록 또는 신청",
    date: "날짜",
    deadline: "마감",
    ages: "나이",
    grades: "학년",
    commitment: "참여 시간",
    languages: "언어",
    access: "접근성",
    equipment: "준비물",
    food: "음식",
    capacity: "정원",
    highSchoolHeading: "봉사 시간, co-op, SHSM, 멘토십, 진로 경로",
    volunteerCardText: "STEM 클럽, 환경 보전 프로젝트, 도서관 리더십 등 고등학교 봉사 시간에 도움이 되는 기회.",
    coopCardText: "확인된 파트너의 무료 신청 co-op, SHSM, 직업 체험, 인턴십, 진로 탐색 기회.",
    trustChecks: "신뢰 확인",
    trustCardText: "각 청소년 기회에는 출처 링크, 무료 확인, 연락처, 학교 관련 세부 정보가 표시됩니다.",
    communityNetwork: "커뮤니티 네트워크",
    contributeHeading: "커뮤니티에 참여하기",
    adminQueueSummary: "항목은 비용 확인, 중복 병합, 번역 검토 또는 파트너 승인이 필요합니다.",
    submit: "제출",
    submitted: "로컬 검토 대기열로 보냈습니다."
  }
};

export function t(language: LanguageCode, key: UiKey) {
  return ui[language][key] ?? ui.en[key] ?? key;
}

const summaryTemplates: Record<LanguageCode, string> = {
  en: "{summary}",
  fr: "Occasion gratuite de {category} offerte par {provider} a {city}. Ages {ages}. Inscription gratuite et verifiee.",
  zh: "{provider}在{city}提供免费的{category}机会。适合{ages}岁。报名免费并已验证。",
  yue: "{provider}喺{city}提供免費{category}機會。適合{ages}歲。報名免費並已核實。",
  pa: "{provider} ਵੱਲੋਂ {city} ਵਿੱਚ ਮੁਫ਼ਤ {category} ਮੌਕਾ। ਉਮਰ {ages}. ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਮੁਫ਼ਤ ਅਤੇ ਜਾਂਚੀ ਹੋਈ ਹੈ।",
  ur: "{city} میں {provider} کی طرف سے مفت {category} موقع۔ عمر {ages}. رجسٹریشن مفت اور تصدیق شدہ ہے۔",
  ta: "{city} நகரில் {provider} வழங்கும் இலவச {category} வாய்ப்பு. வயது {ages}. பதிவு இலவசம் மற்றும் சரிபார்க்கப்பட்டது.",
  tl: "Libreng {category} opportunity mula sa {provider} sa {city}. Edad {ages}. Verified na libre ang registration.",
  es: "Oportunidad gratis de {category} de {provider} en {city}. Edades {ages}. Registro gratis y verificado.",
  ar: "فرصة {category} مجانية من {provider} في {city}. الأعمار {ages}. التسجيل مجاني وموثق.",
  fa: "فرصت رایگان {category} از {provider} در {city}. سنین {ages}. ثبت نام رایگان و تایید شده است.",
  hi: "{city} में {provider} की मुफ्त {category} opportunity. उम्र {ages}. Registration free और verified है.",
  gu: "{city} માં {provider} તરફથી મફત {category} તક. ઉંમર {ages}. Registration મફત અને verified છે.",
  bn: "{city}-এ {provider} এর ফ্রি {category} opportunity. বয়স {ages}. রেজিস্ট্রেশন ফ্রি এবং verified.",
  ja: "{city}の{provider}による無料の{category}機会です。対象年齢は{ages}。登録無料で確認済みです。",
  ko: "{city}에서 {provider}이 제공하는 무료 {category} 기회입니다. 대상 나이는 {ages}입니다. 등록은 무료로 확인되었습니다."
};

export function translatedSummary(opportunity: Opportunity, language: LanguageCode) {
  if (language === "en") return opportunity.summary;
  const ages = opportunity.ages.max
    ? `${opportunity.ages.min}-${opportunity.ages.max}`
    : `${opportunity.ages.min}+`;
  return summaryTemplates[language]
    .replace("{summary}", opportunity.summary)
    .replace("{category}", opportunity.categories[0])
    .replace("{provider}", opportunity.provider)
    .replace("{city}", opportunity.city)
    .replace("{ages}", ages);
}
