const root = document.documentElement;
const body = document.body;

const languageButton = document.getElementById('languageToggle');
const themeButton = document.getElementById('themeToggle');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mainNavigation = document.getElementById('mainNav');
const dashboard = document.getElementById('dashboardTilt');
const dashboardShell = dashboard?.querySelector('.dashboard-shell');
const dashboardClock = document.getElementById('dashboardClock');
const currentYear = document.getElementById('year');
const header = document.querySelector('.glass-header');
const backToTopButton = document.getElementById('backToTop');
const cursorOrb = document.querySelector('.cursor-orb');
const skillsTrack = document.querySelector('.skills-marquee div');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointerPreference = window.matchMedia('(min-width: 900px) and (pointer: fine)');

const STORAGE_KEYS = {
  language: 'roaa-language',
  theme: 'roaa-theme',
};

const translations = {
  ar: {
    brandName: 'رؤى اللحياني',
    brandName2: 'رؤى اللحياني',
    firstName: 'رؤى',
    lastName: 'اللحياني',
    brandRole: 'مهندسة برمجيات',
    navHome: 'الرئيسية',
    navExpertise: 'خبراتي',
    navPlatform: 'المنصة',
    navExperience: 'المسيرة المهنية',
    navContact: 'تواصل',
    available: 'متاحة لفرص هندسية ذات أثر حقيقي',
    hello: 'أهلًا، أنا',
    heroTitle: 'أحوّل سير العمل المعقّد إلى أنظمة واضحة وموثوقة.',
    heroDescription: 'مهندسة برمجيات أبدأ بفهم طريقة العمل كما هي على أرض الواقع، ثم أصمم منصات وأتمتة وتجارب بيانات عملية تجعل التشغيل أوضح وأسهل وأكثر قابلية للتطوير.',
    viewPlatform: 'استكشف النظام',
    downloadResume: 'عرض السيرة الذاتية',
    dashboardLabel: 'الذكاء التشغيلي',
    overview: 'نظرة عامة',
    dashboardTitle: 'من البيانات إلى القرار',
    metricSystems: 'أنظمة تم تنفيذها',
    metricSystemsNote: 'مصممة للاستخدام الفعلي',
    metricAutomation: 'أتمتة سير العمل',
    metricAutomationNote: 'أعمال متكررة أقل',
    metricReliability: 'موثوقية التشغيل',
    metricReliabilityNote: 'مصممة للاستمرارية',
    metricInsight: 'وضوح القرار',
    realTime: 'لحظية',
    metricInsightNote: 'رؤية تشغيلية أوضح',
    performanceTrend: 'مؤشر الأداء',
    actual: 'الفعلي',
    target: 'المستهدف',
    dataAction: 'وضوح يقود العمل',
    dataActionNote: 'إجراءات · مؤشرات · قرارات',
    fullStack: 'تطوير متكامل',
    scrollExplore: 'استكشف المزيد',
    whatIBuild: 'ما الذي أبنيه',
    solutionsHeading: 'أنظمة تجعل العمل المعقّد أسهل في الإدارة.',
    solutionsIntro: 'أبدأ بفهم الأشخاص والقرارات وسير العمل خلف المشكلة، ثم أبني التقنية حول ما يحتاجه العمل فعلًا.',
    solution1Title: 'الذكاء التشغيلي',
    solution1Text: 'رؤية مترابطة تجمع الأداء والأنشطة والحالات الاستثنائية في صورة تشغيلية واحدة وواضحة.',
    solution2Title: 'ذكاء الأعمال',
    solution2Text: 'لوحات وتحليلات تحوّل البيانات المتفرقة إلى سياق مفيد يدعم قرارات أفضل.',
    solution3Title: 'أنظمة دعم القرار',
    solution3Text: 'أدوات منظّمة تكشف الأنماط، وتتحقق من المعلومات، وتساعد الفرق على العمل بثقة أكبر.',
    solution4Title: 'الأتمتة والتقارير',
    solution4Text: 'حسابات وتحققات وتقارير وفلاتر وعمليات تصدير مؤتمتة تقلّل الجهد اليدوي المتكرر.',
    solution5Title: 'المراقبة والتنبيهات',
    solution5Text: 'مراقبة مركزية للمؤشرات المهمة والتغيّرات والحالات الاستثنائية، مع استجابة تشغيلية في الوقت المناسب.',
    solution6Title: 'منتجات البيانات',
    solution6Text: 'نماذج بيانات وواجهات برمجية ولوحات وصلاحيات مصممة لاستخدام مؤسسي عملي وموثوق.',
    flagshipLabel: 'نموذج لنظام متكامل',
    platformHeading: 'منصة مرنة تحوّل العمل المعقّد إلى تجربة واضحة ومنظمة.',
    platformIntro: 'يوضح هذا النظام كيف أحوّل الإجراءات المتفرقة إلى تجربة واحدة آمنة ومترابطة؛ من جمع البيانات والتحقق منها، إلى التحليل والتقارير والرؤية الإدارية.',
    feature1Title: 'ذكاء سير العمل',
    feature1Text: 'إجراءات منظّمة، وأهداف ومقارنات ومؤشرات محسوبة، مع رؤية واضحة للأداء.',
    feature2Title: 'الجودة والتحقق',
    feature2Text: 'قواعد متّسقة للتحقق من البيانات، وإدارة الحالات الاستثنائية، ومؤشرات جودة وتقارير جاهزة للإدارة.',
    feature3Title: 'عمليات متعددة المراحل',
    feature3Text: 'مسارات عمل موجّهة، وحسابات تلقائية، ومتابعة للتقدم، وملخصات تشغيلية واضحة.',
    feature4Title: 'أداء الخدمات',
    feature4Text: 'متابعة الوقت والإنتاجية والاتجاهات والحالات الاستثنائية والمقارنات الدورية ضمن رؤية واحدة.',
    feature5Title: 'مركز المراقبة',
    feature5Text: 'رؤية مركزية للحالة والمؤشرات والتنبيهات، ولوحات مصممة لدعم الإجراء والقرار.',
    feature6Title: 'التقارير والتصدير',
    feature6Text: 'لوحات بحسب الصلاحيات، وفلاتر متقدمة، وتقارير ديناميكية، وتصدير PDF، وملخصات إدارية.',
    commandCenter: 'مركز القيادة',
    operationalOverview: 'نظرة تشغيلية عامة',
    qualityIndex: 'مؤشر الجودة',
    completionRate: 'نسبة الاكتمال',
    activeModules: 'الوحدات النشطة',
    allHealthy: 'جميعها بحالة جيدة',
    trendAnalysis: 'تحليل الاتجاه',
    dataHealth: 'سلامة البيانات',
    validated: 'تم التحقق',
    recentActivity: 'آخر الأنشطة',
    status: 'الحالة',
    reportGenerated: 'تم إنشاء التقرير الإداري',
    complete: 'مكتمل',
    validationPassed: 'اكتمل التحقق من البيانات',
    healthy: 'سليم',
    dashboardRefreshed: 'تم تحديث مؤشرات اللوحة',
    live: 'مباشر',
    engineeringApproach: 'كيف أبني الأنظمة',
    outcomesHeading: 'أنظمة مفهومة وموثوقة وقابلة للاستخدام.',
    outcome1Title: 'أفهم العمل أولًا',
    outcome1Text: 'أفهم سير العمل الحقيقي، والأشخاص المعنيين، والقرارات المهمة قبل اختيار التقنية.',
    outcome2Title: 'أجعل المنطق واضحًا',
    outcome2Text: 'أصمم القواعد والحسابات والتحقق والصلاحيات والحالات الطرفية بطريقة واضحة وقابلة للصيانة.',
    outcome3Title: 'أصمم للاستخدام اليومي',
    outcome3Text: 'أنظّم المعلومات المعقّدة في واجهات هادئة وسهلة تساعد الفرق على العمل بثقة.',
    outcome4Title: 'أتولى الحل كاملًا',
    outcome4Text: 'من نموذج البيانات والواجهة البرمجية إلى الواجهة الأمامية والنشر والتقارير والتحسين المستمر.',
    experienceLabel: 'الخبرات',
    experienceHeading: 'خبرة هندسية صقلتها أنظمة حقيقية وقيود واقعية.',
    present: 'حتى الآن',
    role1: 'مهندسة برمجيات',
    company1: 'مزارع فقيه للدواجن',
    role1Text: 'قيادة تطوير أنظمة أعمال متكاملة تشمل لوحات المعلومات والأتمتة والتقارير وسير العمل التشغيلي عبر عدة مواقع.',
    role2: 'مهندسة أنظمة تقنية معلومات',
    company2: 'مستشفى الملك عبدالعزيز',
    role2Text: 'إدارة إعدادات الأنظمة والتطبيقات، وتطوير سكربتات أتمتة قلّلت أعمال الصيانة اليدوية.',
    role3: 'مطوّرة تطبيقات متكاملة',
    company3: 'الأكاديمية السعودية الرقمية',
    role3Text: 'بناء تطبيقات ويب متجاوبة وواجهات REST API ضمن تدريب مكثف مدته 360 ساعة.',
    role4: 'مهندسة DevOps',
    company4: 'Coding Dojo',
    role4Text: 'بناء بنية سحابية ومسارات CI/CD باستخدام AWS وDocker وKubernetes وTerraform وLinux.',
    toolkitLabel: 'الأدوات التقنية',
    toolkitHeading: 'من الواجهة إلى البنية التحتية.',
    contactLabel: 'لنبنِ شيئًا مفيدًا',
    contactHeading: 'هل تبحثون عن مهندسة تفهم طريقة العمل وتصمم النظام المناسب لها؟',
    contactText: 'متاحة لفرص هندسة البرمجيات والتطوير المتكامل والأنظمة والبيانات والأتمتة والتحول الرقمي ضمن فرق تعمل على مشكلات ذات قيمة.',
    getInTouch: 'لنتواصل',
    brandRole2: 'مهندسة برمجيات',
    navHome2: 'الرئيسية',
    navExpertise2: 'خبراتي',
    navPlatform2: 'المنصة',
    navExperience2: 'المسيرة المهنية',
    navContact2: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
    backTop: 'العودة إلى الأعلى',
  },
};

const defaultContent = new Map(
  [...document.querySelectorAll('[data-i18n]')].map((element) => [
    element.dataset.i18n,
    element.innerHTML,
  ]),
);

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The page still works when browser storage is unavailable.
  }
}

function setLanguage(language) {
  const isArabic = language === 'ar';
  const activeLanguage = isArabic ? 'ar' : 'en';

  root.lang = activeLanguage;
  root.dir = isArabic ? 'rtl' : 'ltr';
  body.classList.toggle('rtl', isArabic);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const translatedValue = translations.ar[key];
    element.innerHTML = isArabic && translatedValue !== undefined
      ? translatedValue
      : defaultContent.get(key);
  });

  languageButton.textContent = isArabic ? 'EN' : 'AR';
  languageButton.setAttribute(
    'aria-label',
    isArabic ? 'Switch to English' : 'التبديل إلى العربية',
  );

  document.title = isArabic
    ? 'رؤى اللحياني | مهندسة برمجيات'
    : 'Roaa Al‑Lehyani | Software Engineer';

  savePreference(STORAGE_KEYS.language, activeLanguage);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  const activeTheme = isDark ? 'dark' : 'light';

  if (isDark) {
    root.dataset.theme = 'dark';
  } else {
    delete root.dataset.theme;
  }

  if (themeColorMeta) {
    themeColorMeta.content = isDark ? '#05070b' : '#f4f1ea';
  }

  themeButton.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode',
  );
  themeButton.title = isDark ? 'Light mode' : 'Dark mode';

  savePreference(STORAGE_KEYS.theme, activeTheme);
}

function closeMobileMenu() {
  mainNavigation.classList.remove('open');
  mobileMenuButton.classList.remove('open');
  mobileMenuButton.setAttribute('aria-expanded', 'false');
}

function initializeMobileMenu() {
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mainNavigation.classList.toggle('open');
    mobileMenuButton.classList.toggle('open', isOpen);
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || motionPreference.matches) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

function animateCounter(element) {
  const endValue = Number(element.dataset.counter);
  const suffix = element.dataset.suffix || '';
  const startTime = performance.now();
  const duration = 1250;

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(endValue * easedProgress)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

function initializeCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');

  if (!('IntersectionObserver' in window) || motionPreference.matches) {
    counterElements.forEach((element) => {
      element.textContent = `${element.dataset.counter}${element.dataset.suffix || ''}`;
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counterElements.forEach((element) => observer.observe(element));
}

function initializeCursorOrb() {
  if (!cursorOrb || motionPreference.matches || !desktopPointerPreference.matches) {
    cursorOrb?.remove();
    return;
  }

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.4;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', () => {
    cursorOrb.style.opacity = '0';
  });

  document.documentElement.addEventListener('pointerenter', () => {
    cursorOrb.style.opacity = '.58';
  });

  function animate() {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    cursorOrb.style.left = `${currentX}px`;
    cursorOrb.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  }

  animate();
}

function initializeDashboardTilt() {
  if (!dashboard || !dashboardShell || motionPreference.matches) return;

  dashboard.addEventListener('pointermove', (event) => {
    if (!desktopPointerPreference.matches) return;

    const bounds = dashboard.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;

    dashboardShell.style.transform = [
      `rotateX(${-verticalPosition * 5}deg)`,
      `rotateY(${horizontalPosition * 7}deg)`,
    ].join(' ');
  });

  dashboard.addEventListener('pointerleave', () => {
    dashboardShell.style.transform = 'rotateX(0) rotateY(0)';
  });
}

function updateDashboardClock() {
  if (!dashboardClock) return;

  dashboardClock.textContent = new Date().toLocaleTimeString('en-GB', {
    hour12: false,
  });
}

function initializePageMetadata() {
  updateDashboardClock();
  window.setInterval(updateDashboardClock, 1000);

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

function initializeScrollState() {
  function updateScrollState() {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    backToTopButton?.classList.toggle('visible', window.scrollY > 600);
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: motionPreference.matches ? 'auto' : 'smooth',
    });
  });
}

function initializeSkillsMarquee() {
  if (!skillsTrack || skillsTrack.dataset.duplicated === 'true') return;

  skillsTrack.insertAdjacentHTML('beforeend', skillsTrack.innerHTML);
  skillsTrack.dataset.duplicated = 'true';
}

languageButton.addEventListener('click', () => {
  setLanguage(root.lang === 'ar' ? 'en' : 'ar');
});

themeButton.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

setLanguage(readPreference(STORAGE_KEYS.language, 'en'));
setTheme(readPreference(STORAGE_KEYS.theme, 'dark'));
initializeMobileMenu();
initializeRevealAnimations();
initializeCounters();
initializeCursorOrb();
initializeDashboardTilt();
initializePageMetadata();
initializeScrollState();
initializeSkillsMarquee();
