/** Interface strings per locale. Content itself lives in the locale data files. */

export type Locale = "en" | "ar";

export type UiStrings = {
  nav: {
    primary: string;
    chapters: string;
    work: string;
    record: string;
    experience: string;
    about: string;
    contact: string;
  };
  skipToContent: string;
  backToTop: string;
  cv: string;
  localTime: string;
  contents: { title: string; lead: string; entries: { id: string; title: string; note: string }[] };
  printCv: string;
  story: { beats: { marker: string; text: string }[] };
  leads: { bio: string; work: string; repositories: string; capabilities: string; record: string; experience: string; toolkit: string; about: string };
  openMenu: string;
  closeMenu: string;
  toLight: string;
  toDark: string;
  githubProfile: string;
  linkedinProfile: string;
  heroPrimary: string;
  heroSecondary: string;
  heroFacts: { now: string; sharedTask: string; published: string };
  heroCaption: string;
  work: { title: string; intro: string; kind: string; year: string };
  builtWith: string;
  capabilities: { title: string; intro: string; groups: { title: string; body: string }[] };
  evidence: { repos: string; followers: string; certifications: string; place: string; wer: string };
  showDetails: string;
  hideDetails: string;
  architecture: string;
  allRepos: string;
  repositories: { title: string; intro: string; stars: string; updated: string };
  record: {
    title: string;
    intro: string;
    authors: string;
    venue: string;
    year: string;
    recognition: string;
    awards: string;
    publication: string;
    certification: string;
    /** Contains {count}, replaced at render time. */
    certificationNote: string;
  };
  experience: { title: string; education: string };
  toolkit: { title: string; intro: string };
  about: { title: string };
  bio: { title: string };
  contact: { title: string; lede: string; kaggle: string };
  demo: { written: string; pronounced: string; restore: string; strip: string };
  notFound: { code: string; title: string; body: string; back: string };
  languageSwitch: { label: string; to: string };
};

export const ui: Record<Locale, UiStrings> = {
  en: {
    nav: {
      primary: "Primary",
      chapters: "On this page",
      work: "Work",
      record: "Research",
      experience: "Experience",
      about: "About",
      contact: "Contact",
    },
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    cv: "CV",
    localTime: "It is {time} in Riyadh right now.",
    contents: {
      title: "Contents",
      lead: "Six chapters. Read them in order or jump to the one you came for.",
      entries: [
        { id: "about", title: "Who is speaking", note: "Where I started and what I do now" },
        { id: "work", title: "Selected work", note: "Four projects, constraint first" },
        { id: "capabilities", title: "What I actually do", note: "Build, train, ship" },
        { id: "record", title: "Awards and credentials", note: "First place, one paper, 25 certificates" },
        { id: "experience", title: "Where I have worked", note: "KACST to a government team in Riyadh" },
        { id: "stack", title: "What I reach for", note: "The tools behind all of it" },
      ],
    },
    printCv: "Print or save as PDF",
    story: {
      beats: [
        {
          marker: "2023",
          text: "I started in computer vision at KACST: detection, tracking, and the unglamorous work of building the dataset behind them.",
        },
        {
          marker: "2024",
          text: "Then language. Two bootcamps, a capstone voice agent that had to answer in Arabic fast enough to keep a caller, and the move into production AI work in Riyadh.",
        },
        {
          marker: "2026",
          text: "Now I build LLM systems end to end, and a system I helped build won the KSAA-2026 shared task on Arabic diacritization.",
        },
      ],
    },
    leads: {
      bio: "Before I show you anything, here is who is talking.",
      work: "These are the four I would show a colleague, in the order they happened.",
      repositories: "Smaller pieces, kept public.",
      capabilities: "All four asked the same three things of me.",
      record: "If you want to check any of that, here is where it is written down.",
      experience: "This is the order it actually happened in.",
      toolkit: "These are the ones I reach for without thinking.",
      about: "In my own words.",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    githubProfile: "GitHub profile",
    linkedinProfile: "LinkedIn profile",
    heroPrimary: "Selected work",
    heroSecondary: "Get in touch",
    heroFacts: {
      now: "Now",
      sharedTask: "Shared task",
      published: "Published",
    },
    heroCaption:
      "Sanad answering from an indexed document set, with the source named in the reply.",
    work: {
      title: "Selected work",
      intro:
        "Written up the way they were actually built, constraint first.",
      kind: "Kind",
      year: "Year",
    },
    builtWith: "Built with",
    capabilities: {
      title: "What I actually do",
      intro:
        "The work splits into three, whatever layer the problem turns up in.",
      groups: [
        {
          title: "Build the system",
          body: "Retrieval that returns the right passage, an agent that decides when to search, and an interface that shows its working. FastAPI behind it, a streaming UI in front, tests around both.",
        },
        {
          title: "Train and evaluate the model",
          body: "Fine-tuning under real constraints, hyperparameter search with Optuna, regularization, and evaluation against the metric the task is actually scored on.",
        },
        {
          title: "Ship it and keep it running",
          body: "Containers, model servers, ONNX and BentoML for inference, Kubernetes when it needs to scale, and CI so the next change does not break the last one.",
        },
      ],
    },
    evidence: {
      repos: "public repositories",
      followers: "GitHub followers",
      certifications: "certifications",
      place: "shared task, Task 2",
      wer: "WER, primary metric",
    },
    showDetails: "Read the engineering detail",
    hideDetails: "Close",
    architecture: "Architecture",
    allRepos: "All repositories on GitHub",
    repositories: {
      title: "Smaller things I have shipped",
      intro:
        "Serving, retrieval and pipeline work, kept public. Star counts and dates come from the GitHub API.",
      stars: "GitHub stars",
      updated: "Updated",
    },
    record: {
      title: "Awards, publication and credentials",
      intro: "One shared task, one paper, and the certifications behind the work.",
      authors: "Authors",
      venue: "Venue",
      year: "Year",
      recognition: "Recognition",
      awards: "Awards and results",
      publication: "Publication",
      certification: "Certification",
      certificationNote: "{count} certifications listed on LinkedIn.",
    },
    experience: { title: "Where I have worked", education: "Education" },
    toolkit: {
      title: "What I reach for",
      intro:
        "Grouped by the job it does. Everything here is in something I have shipped.",
    },
    about: { title: "How I work" },
    bio: { title: "Who is speaking" },
    contact: {
      title: "Working on something in this space? Say hello.",
      lede: "LinkedIn is the fastest way to reach me. Code and current experiments live on GitHub.",
      kaggle: "Kaggle",
    },
    demo: {
      written: "As written",
      pronounced: "As pronounced",
      restore: "Restore the diacritics",
      strip: "Strip the diacritics",
    },
    notFound: {
      code: "404",
      title: "There is nothing at this address.",
      body: "The page moved or never existed. Everything on this site lives on one page.",
      back: "Back to the start",
    },
    languageSwitch: { label: "اقرأ بالعربية", to: "/ar" },
  },

  ar: {
    nav: {
      primary: "التنقل الرئيسي",
      chapters: "أقسام الصفحة",
      work: "الأعمال",
      record: "البحث",
      experience: "الخبرة",
      about: "نبذة",
      contact: "تواصل",
    },
    skipToContent: "تخطَّ إلى المحتوى",
    backToTop: "العودة إلى الأعلى",
    cv: "السيرة الذاتية",
    localTime: "الساعة الآن {time} في الرياض.",
    contents: {
      title: "المحتويات",
      lead: "ستة فصول. اقرأها بالترتيب أو انتقل إلى ما جئت من أجله.",
      entries: [
        { id: "about", title: "من يتحدث", note: "من أين بدأت وماذا أعمل الآن" },
        { id: "work", title: "أعمال مختارة", note: "أربعة مشاريع، القيد أولًا" },
        { id: "capabilities", title: "ما أفعله عمليًا", note: "البناء والتدريب والتشغيل" },
        { id: "record", title: "الجوائز والشهادات", note: "مركز أول، وورقة، و25 شهادة" },
        { id: "experience", title: "أين عملت", note: "من كاكست إلى فريق حكومي في الرياض" },
        { id: "stack", title: "الأدوات", note: "ما يقف خلف كل ذلك" },
      ],
    },
    printCv: "طباعة أو حفظ PDF",
    story: {
      beats: [
        {
          marker: "2023",
          text: "بدأت في الرؤية الحاسوبية في مدينة الملك عبدالعزيز للعلوم والتقنية: كشف وتتبع، والعمل غير اللامع في بناء البيانات التي تقوم عليها.",
        },
        {
          marker: "2024",
          text: "ثم اللغة. معسكران، ومشروع تخرّج لوكيل صوتي كان عليه أن يجيب بالعربية بسرعة تُبقي المتصل، ثم الانتقال إلى العمل الإنتاجي في الرياض.",
        },
        {
          marker: "2026",
          text: "واليوم أبني أنظمة النماذج اللغوية من طرف إلى طرف، ونظام شاركت في بنائه فاز بالمركز الأول في مسابقة KSAA-2026 لتشكيل النص العربي.",
        },
      ],
    },
    leads: {
      bio: "قبل أن أعرض أي شيء، هذا من يتحدث.",
      work: "هذه الأربعة هي ما أعرضه على زميل، بترتيب حدوثها.",
      repositories: "أعمال أصغر، منشورة للاطلاع.",
      capabilities: "الأربعة طلبت مني الأمور الثلاثة نفسها.",
      record: "إن أردت التحقق من أي شيء، هنا حيث دُوّن.",
      experience: "هذا هو الترتيب الذي حدث به فعلًا.",
      toolkit: "هذه هي التي أمد يدي إليها دون تفكير.",
      about: "بصيغتي أنا.",
    },
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    toLight: "التبديل إلى الوضع الفاتح",
    toDark: "التبديل إلى الوضع الداكن",
    githubProfile: "الملف على GitHub",
    linkedinProfile: "الملف على LinkedIn",
    heroPrimary: "أعمال مختارة",
    heroSecondary: "للتواصل",
    heroFacts: {
      now: "حاليًا",
      sharedTask: "مسابقة بحثية",
      published: "منشور",
    },
    heroCaption: "سند يجيب من مجموعة مستندات مفهرسة، مع ذكر المصدر داخل الرد.",
    work: {
      title: "أعمال مختارة",
      intro:
        "مكتوبة كما بُنيت فعلًا، بدءًا من القيد.",
      kind: "النوع",
      year: "السنة",
    },
    builtWith: "بُني باستخدام",
    capabilities: {
      title: "ما أفعله عمليًا",
      intro: "ينقسم العمل إلى ثلاثة، أيًّا كانت الطبقة التي تظهر فيها المسألة.",
      groups: [
        {
          title: "بناء النظام",
          body: "استرجاع يعيد المقطع الصحيح، ووكيل يقرر متى يبحث، وواجهة تُظهر مسار الإجابة. FastAPI خلفها، وواجهة متدفقة أمامها، واختبارات حول الاثنين.",
        },
        {
          title: "تدريب النموذج وتقييمه",
          body: "ضبط دقيق تحت قيود حقيقية، وبحث عن المعاملات باستخدام Optuna، وتنظيم، وتقييم على المقياس الذي تُقيَّم عليه المهمة فعلًا.",
        },
        {
          title: "التشغيل والاستمرار",
          body: "حاويات، وخوادم نماذج، وONNX وBentoML للاستدلال، وKubernetes عند الحاجة للتوسع، وتكامل مستمر حتى لا يكسر التغيير التالي ما قبله.",
        },
      ],
    },
    evidence: {
      repos: "مستودع عام",
      followers: "متابع على GitHub",
      certifications: "شهادة",
      place: "المهمة الثانية في المسابقة",
      wer: "معدل خطأ الكلمة، المقياس الأساسي",
    },
    showDetails: "اقرأ التفاصيل الهندسية",
    hideDetails: "إغلاق",
    architecture: "المعمارية",
    allRepos: "كل المستودعات على GitHub",
    repositories: {
      title: "أعمال أصغر منشورة",
      intro:
        "خدمة النماذج والاسترجاع وخطوط المعالجة، متاحة للاطلاع. عدد النجوم وتواريخ التحديث تُقرأ من واجهة GitHub.",
      stars: "نجوم GitHub",
      updated: "آخر تحديث",
    },
    record: {
      title: "الجوائز والنشر والشهادات",
      intro: "مسابقة بحثية واحدة، وورقة منشورة، والشهادات التي تسند العمل.",
      authors: "المؤلفون",
      venue: "مكان النشر",
      year: "السنة",
      recognition: "التقدير",
      awards: "الجوائز والنتائج",
      publication: "النشر",
      certification: "الشهادات",
      certificationNote: "{count} شهادة مدرجة في LinkedIn.",
    },
    experience: { title: "أين عملت", education: "التعليم" },
    toolkit: {
      title: "الأدوات التي أعمل بها",
      intro:
        "مرتّبة حسب الغرض الذي تخدمه. كل أداة هنا مستخدمة في عمل نشرته.",
    },
    about: { title: "كيف أعمل" },
    bio: { title: "من يتحدث" },
    contact: {
      title: "تعمل على شيء في هذا المجال؟ تواصل معي.",
      lede: "LinkedIn أسرع وسيلة للوصول إليّ، والشيفرة والتجارب الحالية على GitHub.",
      kaggle: "Kaggle",
    },
    demo: {
      written: "كما تُكتب",
      pronounced: "كما تُنطق",
      restore: "أعِد التشكيل",
      strip: "أزِل التشكيل",
    },
    notFound: {
      code: "404",
      title: "لا يوجد شيء على هذا العنوان.",
      body: "الصفحة انتقلت أو لم توجد أصلًا. محتوى الموقع كله في صفحة واحدة.",
      back: "العودة إلى البداية",
    },
    languageSwitch: { label: "Read in English", to: "/" },
  },
};
