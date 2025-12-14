import { Domain, DomainStatus, ListingType, Transaction, User, UserRole, CATEGORIES, Article, Offer, Notification } from '../types';

// --- CONSTANTS ---
const STORAGE_KEYS = {
    DOMAINS: 'domnixa_domains',
    USERS: 'domnixa_users',
    TRANSACTIONS: 'domnixa_transactions'
};

// --- DATA SEEDING HELPERS ---
const WORD_BANKS: Record<string, string[]> = {
  'Tech': ['Cyber', 'Cloud', 'Soft', 'Data', 'Meta', 'Smart', 'Tech', 'Code', 'Net', 'Sys', 'App', 'Bot'],
  'Business': ['Biz', 'Trade', 'Market', 'Corp', 'Venture', 'Capital', 'Growth', 'Deal', 'Asset', 'Firm'],
  'Creative': ['Art', 'Design', 'Studio', 'Pixel', 'Color', 'Muse', 'Create', 'Media', 'Vision', 'Brand'],
  'Finance': ['Invest', 'Coin', 'Wallet', 'Pay', 'Bank', 'Fund', 'Wealth', 'Cash', 'Stock', 'Forex'],
  'Health': ['Medi', 'Care', 'Health', 'Vita', 'Life', 'Doctor', 'Cure', 'Fit', 'Wellness', 'Bio'],
  'Education': ['Learn', 'Edu', 'School', 'Skill', 'Academy', 'Study', 'Book', 'Brain', 'Mentor', 'Class'],
  'Short': ['Go', 'Up', 'On', 'In', 'My', 'We', 'Ez', 'Ok', 'Hi', 'Top']
};

const SUFFIXES = ['Hub', 'Lab', 'Gate', 'Way', 'ify', 'ly', 'Zone', 'Box', 'Base', 'Link', 'Flow', 'Core'];

// Generate meaningful name without numbers
const generateName = (category: string): string => {
  const bank = WORD_BANKS[category] || WORD_BANKS['Tech'];
  const prefix = bank[Math.floor(Math.random() * bank.length)];
  
  // 30% chance of single word (premium), 70% chance of combination
  if (Math.random() > 0.7) {
    return prefix;
  } else {
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    return `${prefix}${suffix}`;
  }
};

const generateDomains = (): Domain[] => {
  const domains: Domain[] = [];
  let idCounter = 1;
  const tlds = ['.eg', '.com.eg', '.com', '.net', '.io', '.sa', '.ae', '.store'];
  const sellers = ['u2', 'u5', 'u6']; 

  CATEGORIES.forEach(category => {
    // Generate 6 domains per category to fill the grid nicely
    for (let i = 0; i < 6; i++) {
      const isExclusive = Math.random() > 0.8;
      const status = Math.random() > 0.85 ? DomainStatus.SOLD : DomainStatus.ACTIVE;
      
      // Premium pricing logic based on name length
      const name = generateName(category);
      const isShort = name.length <= 5;
      const basePrice = isShort ? 25000 : 5000;
      const price = basePrice + Math.floor(Math.random() * 10000);
      
      domains.push({
        id: `d${idCounter++}`,
        name: name,
        tld: tlds[Math.floor(Math.random() * tlds.length)],
        price: price,
        description: isShort 
          ? `فرصة استثمارية نادرة! نطاق قصير جداً (${name}) يتكون من كلمة واحدة أو كلمتين. مثالي للعلامات التجارية الكبرى في قطاع ${category}.`
          : `نطاق احترافي (${name}) سهل النطق والتذكر. مناسب جداً للمشاريع الناشئة وتطبيقات الويب في مجال ${category}.`,
        category: category,
        ageYears: Math.floor(Math.random() * 15) + 1,
        sellerId: sellers[Math.floor(Math.random() * sellers.length)],
        status: status,
        listingType: isExclusive ? ListingType.EXCLUSIVE : ListingType.STANDARD,
        views: Math.floor(Math.random() * 8000) + 500,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        offers: [],
        strategy: isExclusive ? 'PLATFORM' : 'GLOBAL'
      });
    }
  });
  return domains;
};

// --- STATE MANAGEMENT ---
let _domains: Domain[] = [];
let _users: User[] = [];
let _transactions: Transaction[] = [];

const loadData = () => {
    try {
        const storedDomains = localStorage.getItem(STORAGE_KEYS.DOMAINS);
        const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
        const storedTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

        if (storedDomains && JSON.parse(storedDomains).length > 0) {
            _domains = JSON.parse(storedDomains);
        } else {
            _domains = generateDomains();
            saveData();
        }

        if (storedUsers) {
            _users = JSON.parse(storedUsers);
        } else {
            // Default demo users
            _users = [
                {
                    id: 'u1',
                    name: 'أحمد المشتري',
                    email: 'buyer@domnixa.com',
                    roles: [UserRole.BUYER],
                    balance: { available: 50000, pending: 0 },
                    kycLevel: 'BASIC',
                    joinedAt: '2024-01-01',
                    notifications: []
                },
                {
                    id: 'u2',
                    name: 'شركة النيل للتقنية',
                    email: 'seller@domnixa.com',
                    roles: [UserRole.SELLER],
                    balance: { available: 15500, pending: 5000 },
                    kycLevel: 'FULL',
                    joinedAt: '2024-02-15',
                    notifications: []
                },
                {
                    id: 'u3',
                    name: 'سارة المسوقة',
                    email: 'marketer@domnixa.com',
                    roles: [UserRole.MARKETER],
                    balance: { available: 4250, pending: 150 },
                    kycLevel: 'ENHANCED',
                    joinedAt: '2024-03-10',
                    affiliateCode: 'SARA2025',
                    commissionTier: 2,
                    notifications: []
                }
            ];
            saveData();
        }

        if (storedTx) _transactions = JSON.parse(storedTx);
    } catch (e) {
        console.error("Failed to load data", e);
        // Fallback if storage is corrupted
        _domains = generateDomains();
        saveData();
    }
};

const saveData = () => {
    localStorage.setItem(STORAGE_KEYS.DOMAINS, JSON.stringify(_domains));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(_users));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(_transactions));
};

loadData();

// --- AUTH SERVICES ---

export const loginUser = (email: string, password: string): User | null => {
    const user = _users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
};

export const registerUser = (name: string, email: string, password: string, role: UserRole): User | null => {
    if (_users.find(u => u.email === email)) return null;

    const newUser: User = {
        id: `u${Date.now()}`,
        name,
        email,
        roles: [role],
        balance: { available: 0, pending: 0 },
        kycLevel: 'BASIC',
        joinedAt: new Date().toISOString(),
        notifications: [{
            id: `welcome-${Date.now()}`,
            title: 'مرحباً بك في دومنيكسا',
            message: 'تم إنشاء حسابك بنجاح. استكشف السوق الآن وابدأ رحلتك.',
            type: 'SUCCESS',
            read: false,
            date: new Date().toISOString()
        }],
        affiliateCode: role === UserRole.MARKETER ? `REF-${Math.floor(Math.random()*10000)}` : undefined,
        commissionTier: 1
    };

    _users.push(newUser);
    saveData();
    return newUser;
};

// --- CONTENT SERVICES ---

export const ACADEMY_ARTICLES: Article[] = [
    {
        id: 'art1',
        title: 'دليل شامل: كيف تحدد القيمة الحقيقية للنطاق (Valuation)؟',
        excerpt: 'تعلم المعايير الاحترافية لتقييم النطاقات الرقمية وتجنب الشراء بأسعار مبالغ فيها.',
        category: 'Investing',
        readTime: '10 دقائق',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
        content: `
        **مقدمة في تقييم النطاقات**
        تعتبر عملية تقييم النطاق (Domain Valuation) هي الخطوة الأخطر والأهم في تجارة النطاقات. السعر ليس مجرد رقم، بل هو انعكاس لقيمة تجارية وتسويقية كامنة.

        **المعايير الخمسة الذهبية للتقييم:**
        
        1. **الامتداد (TLD):** يظل النطاق .com هو الملك، لكن الامتدادات المحلية مثل .sa و .eg تشهد طلباً هائلاً.
        2. **الطول والإيجاز:** النطاقات المكونة من كلمة واحدة هي الأصول الأغلى.
        3. **قابلية التذكر:** تجنب الأرقام والفواصل.
        4. **الكلمات المفتاحية:** نطاق مثل CairoRealEstate.com يحمل قيمة تسويقية ذاتية.
        
        **نصيحة الخبراء:** استخدم أدوات التقييم الآلي كبداية فقط، واعتمد على بحثك في المبيعات المشابهة (Comps).
        `
    },
    {
        id: 'art2',
        title: 'الربح من التسويق بالعمولة للدومينات',
        excerpt: 'كيف تحقق دخلاً سلبياً من خلال الترويج للنطاقات المميزة.',
        category: 'Marketing',
        readTime: '7 دقائق',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        content: `
        **لماذا التسويق للنطاقات؟**
        صفقة واحدة قد تمنحك عمولة تعادل راتب شهر كامل. السوق متعطش للمسوقين الذين يفهمون كيفية الوصول للعميل المناسب.

        **خطوات النجاح:**
        1. اختر نيش (Niche) محدد: مثل النطاقات التقنية أو الطبية.
        2. ابنِ قائمتك البريدية أو تواجدك على LinkedIn.
        3. استخدم أدواتنا لتوليد روابط تتبع ذكية.
        `
    },
    {
        id: 'art3',
        title: 'كيف تحمي نفسك من الاحتيال في بيع وشراء الدومينات؟',
        excerpt: 'شرح مفصل لنظام الـ Escrow وأهميته القصوى.',
        category: 'Security',
        readTime: '5 دقائق',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600',
        content: `
        **الاحتيال الإلكتروني** هو الخطر الأكبر. لا تقم أبداً بتحويل الأموال مباشرة للبائع.
        
        **دور دومنيكسا (Escrow):**
        1. يدفع المشتري للمنصة.
        2. نتحقق من المبلغ ونخطر البائع.
        3. ينقل البائع النطاق.
        4. يؤكد المشتري الاستلام.
        5. نفرج عن الأموال للبائع.
        
        هذه العملية تضمن حق الطرفين 100%.
        `
    }
];

// Helpers
export const getUser = (id: string) => _users.find(u => u.id === id);
export const getAllDomains = () => {
    // Ensure we always return domains, regenerate if empty
    if (_domains.length === 0) {
        _domains = generateDomains();
        saveData();
    }
    return [..._domains];
};
export const getDomainById = (id: string) => _domains.find(d => d.id === id);
export const createDomain = (domainData: any) => {
  const newDomain: Domain = {
    ...domainData,
    id: `d${Date.now()}`,
    views: 0,
    createdAt: new Date().toISOString(),
    status: DomainStatus.PENDING,
    offers: []
  };
  _domains.unshift(newDomain);
  saveData();
  return newDomain;
};
export const approveDomain = (id: string) => { const d = _domains.find(x => x.id === id); if(d) { d.status = DomainStatus.ACTIVE; saveData(); }};
export const rejectDomain = (id: string) => { const d = _domains.find(x => x.id === id); if(d) { d.status = DomainStatus.REJECTED; saveData(); }};
export const makeOffer = (domainId: string, buyerId: string, amount: number) => {
    const domain = _domains.find(d => d.id === domainId);
    const buyer = _users.find(u => u.id === buyerId);
    if (!domain || !buyer) return false;
    domain.offers.push({ id: `off${Date.now()}`, buyerId, buyerName: buyer.name, amount, date: new Date().toISOString(), status: 'PENDING' });
    const seller = _users.find(u => u.id === domain.sellerId);
    if (seller) seller.notifications.unshift({ id: `not${Date.now()}`, title: 'عرض جديد!', message: `عرض بقيمة ${amount}`, type: 'INFO', read: false, date: new Date().toISOString() });
    saveData();
    return true;
};
export const processCheckout = (domainIds: string[], buyerId: string, paymentMethod: any, affiliateRef?: string): boolean => {
    const domainsToBuy = _domains.filter(d => domainIds.includes(d.id) && d.status === DomainStatus.ACTIVE);
    if (domainsToBuy.length === 0) return false;
    let marketer = affiliateRef ? _users.find(u => u.affiliateCode === affiliateRef) : undefined;
    
    domainsToBuy.forEach(domain => {
        let fee = 0.15;
        if(domain.listingType === ListingType.EXCLUSIVE) fee = 0.10;
        else if(domain.listingType === ListingType.MANAGED) fee = 0.20;
        const platformFee = domain.price * fee;
        const comm = marketer ? domain.price * 0.05 : 0;
        const net = domain.price - platformFee - comm;
        
        const tx: Transaction = {
            id: `tx${Date.now()}`, domainId: domain.id, domainName: domain.name+domain.tld,
            buyerId, sellerId: domain.sellerId, marketerId: marketer?.id,
            amount: domain.price, platformFee, marketerCommission: comm, sellerNet: net,
            date: new Date().toISOString(), paymentMethod, status: 'HELD_IN_ESCROW'
        };
        _transactions.unshift(tx);
        domain.status = DomainStatus.SOLD;
        const seller = _users.find(u => u.id === domain.sellerId);
        if(seller) { seller.balance.pending += net; seller.notifications.push({id:`n${Date.now()}`, title:'تم البيع', message:`بيع ${domain.name}`, type:'SUCCESS', read:false, date: new Date().toISOString()}); }
        if(marketer) { marketer.balance.pending += comm; marketer.notifications.push({id:`nm${Date.now()}`, title:'عمولة', message:`ربحت ${comm}`, type:'SUCCESS', read:false, date: new Date().toISOString()}); }
    });
    saveData();
    return true;
};
export const getTransactions = () => _transactions;
export const getTransactionsByUser = (userId: string) => _transactions.filter(t => t.buyerId === userId || t.sellerId === userId || t.marketerId === userId);
// Better analytics data for demo
export const getAnalytics = (userId: string, role: UserRole) => {
    return { 
        views: [{name:'يناير',val:400}, {name:'فبراير',val:600}, {name:'مارس',val:900}, {name:'أبريل',val:1200}], 
        sales: [{name:'يناير',val:0}, {name:'فبراير',val:15000}, {name:'مارس',val:25000}, {name:'أبريل',val:10000}] 
    };
};