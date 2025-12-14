import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Marketplace } from './pages/Marketplace';
import { Dashboard } from './pages/Dashboard';
import { Cart } from './pages/Cart';
import { Academy } from './pages/Academy';
import { DomainDetails } from './pages/DomainDetails';
import { AboutPage, PoliciesPage, SupportPage } from './pages/InfoPages';
import { User, UserRole, Domain } from './types';
import * as Service from './services/mockService';
import { Button, Card, Input, DomainCard } from './components/UI';
import { CheckCircle, Shield, TrendingUp, Users, Search, Lock, Zap, Award, ShieldCheck, ArrowRight, Upload, Share2, Mail, ChevronDown, Target, Eye, Globe, Code, Server, Star } from 'lucide-react';

// --- LANDING PAGE (Enhanced & Animated) ---

const LandingPage: React.FC<{ onAction: (action: string) => void; domains: Domain[] }> = ({ onAction, domains }) => {
    // Get latest domains for showcase
    const latestDomains = domains.slice(0, 3);

    return (
        <div className="overflow-hidden">
            {/* 1. Hero Section */}
            <section className="bg-gradient-to-b from-gray-900 to-brand-950 min-h-[700px] flex items-center relative overflow-hidden px-4 sm:px-8 py-20">
                {/* Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-600 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[100px] opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-secondary-500 rounded-full blur-[80px] opacity-10 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="text-right animate-fade-in-up">
                        <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 text-brand-300 text-sm font-bold mb-6">
                            🚀 المنصة رقم #1 عربياً
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 leading-tight">
                            استثمر في هويتك <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">الرقمية المستقبلية</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                            نطمح لأن نكون المحرك الأساسي للاقتصاد الرقمي العربي.
                            <br/>
                            اشتر، بع، وسوق الدومينات المميزة (Premium) بنظام ضمان يحمي حقوقك 100%.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => onAction('marketplace')} className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/40 transition-all transform hover:-translate-y-1">تصفح السوق</button>
                            <button onClick={() => onAction('about')} className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm">اكتشف رؤيتنا</button>
                        </div>
                        
                        <div className="mt-12 flex items-center gap-6 text-gray-400 text-sm">
                            <div className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> <span>توثيق فوري</span></div>
                            <div className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> <span>نطاقات خالية من الأرقام</span></div>
                            <div className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> <span>دعم فني عربي</span></div>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center items-center relative animate-float">
                        <div className="relative w-full max-w-md">
                             {/* Glass Card */}
                             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-20">
                                 <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                     <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                                     <span className="text-xs text-gray-400 font-mono tracking-widest">DOMNIXA MARKET</span>
                                 </div>
                                 <div className="space-y-6">
                                     <div className="h-24 bg-gradient-to-br from-brand-900 to-black rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group cursor-pointer hover:border-brand-500 transition-colors">
                                         <span className="text-3xl font-black text-white tracking-wider group-hover:scale-110 transition-transform">Future.sa</span>
                                     </div>
                                     <div className="flex justify-between items-center text-white">
                                         <span className="text-gray-400">القيمة المقدرة</span>
                                         <span className="font-mono text-green-400 text-2xl font-bold">$15,000</span>
                                     </div>
                                     <button className="w-full py-4 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">تقديم عرض شراء</button>
                                 </div>
                             </div>
                             
                             {/* Floating Elements behind */}
                             <div className="absolute -top-10 -right-10 bg-brand-600 p-4 rounded-2xl shadow-xl animate-bounce-slow z-10">
                                 <Globe className="text-white w-8 h-8" />
                             </div>
                             <div className="absolute -bottom-5 -left-10 bg-secondary-500 p-4 rounded-2xl shadow-xl animate-bounce-slow z-30" style={{animationDelay: '1.5s'}}>
                                 <TrendingUp className="text-white w-8 h-8" />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. New Arrivals (Missing Content Filled) */}
            <section className="py-20 bg-gray-50 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">أحدث النطاقات المميزة</h2>
                            <p className="text-gray-500">نطاقات تم إضافتها حديثاً وتتميز بجودة عالية</p>
                        </div>
                        <Button variant="outline" onClick={() => onAction('marketplace')}>عرض الكل</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestDomains.map((domain, index) => (
                            <div key={domain.id} className="animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                                <DomainCard domain={domain} showActions={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Categories Grid */}
            <section className="py-20 bg-white px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">تصفح حسب التصنيف</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'تقنية', icon: <Code />, color: 'bg-blue-100 text-blue-600' },
                            { name: 'أعمال', icon: <TrendingUp />, color: 'bg-green-100 text-green-600' },
                            { name: 'تعليم', icon: <Award />, color: 'bg-yellow-100 text-yellow-600' },
                            { name: 'صحة', icon: <Target />, color: 'bg-red-100 text-red-600' },
                            { name: 'إبداع', icon: <Star />, color: 'bg-purple-100 text-purple-600' },
                            { name: 'مالية', icon: <DollarSignIcon />, color: 'bg-teal-100 text-teal-600' },
                            { name: 'استضافة', icon: <Server />, color: 'bg-indigo-100 text-indigo-600' },
                            { name: 'نطاقات قصيرة', icon: <Zap />, color: 'bg-orange-100 text-orange-600' },
                        ].map((cat, idx) => (
                            <div key={idx} className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-white" onClick={() => onAction('marketplace')}>
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-gray-700 group-hover:text-brand-600">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Vision & Mission Snippet */}
            <section className="py-20 bg-brand-50 px-4 border-y border-brand-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="inline-block bg-brand-200 text-brand-800 px-3 py-1 rounded-full text-xs font-bold mb-4">من نحن</div>
                        <h2 className="text-3xl font-bold text-brand-900 mb-6">رؤية تتجاوز الحدود</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                             في دومنيكسا، نؤمن أن اسم النطاق هو العقار الرقمي للمستقبل. رسالتنا هي تمكين رواد الأعمال العرب من امتلاك هويتهم الرقمية وبناء أصول استثمارية مستدامة، في بيئة تداول آمنة وشفافة تضمن حقوق جميع الأطراف.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                                 <h4 className="font-bold text-brand-700 mb-1">أمان 100%</h4>
                                 <p className="text-xs text-gray-500">نظام Escrow يحمي أموالك.</p>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-brand-100 shadow-sm">
                                 <h4 className="font-bold text-brand-700 mb-1">هوية عربية</h4>
                                 <p className="text-xs text-gray-500">دعم كامل للغة العربية.</p>
                             </div>
                        </div>
                    </div>
                    <div className="relative h-80 bg-gradient-to-tr from-brand-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-4xl font-black text-white text-center">بوابتك<br/>للعالم الرقمي</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Features & Roles */}
            <section className="py-24 bg-white px-4 sm:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">منظومة متكاملة لنجاحك</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-brand-500 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform"><Search className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-brand-600 mb-2">للمشتري</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">أمان في الدفع، فحص للنطاق، وخدمات ما بعد البيع مثل تصميم المواقع.</p>
                            <button onClick={() => onAction('buyer')} className="text-brand-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto">سجل كمشتري <ArrowRight className="w-4 h-4" /></button>
                        </div>
                        <div className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300">
                             <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform"><Upload className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-green-600 mb-2">للبائع</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">أعلى عائد، وصول لآلاف المستثمرين، وحماية حقوق الملكية الفكرية.</p>
                            <button onClick={() => onAction('seller')} className="text-green-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto">سجل كبائع <ArrowRight className="w-4 h-4" /></button>
                        </div>
                        <div className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all duration-300">
                             <div className="w-16 h-16 bg-orange-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform"><Share2 className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-orange-600 mb-2">للمسوق</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">نظام عمولات شفاف، تتبع فوري، وأدوات تسويقية احترافية لزيادة دخلك.</p>
                            <button onClick={() => onAction('marketer')} className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto">سجل كمسوق <ArrowRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </section>

             {/* 6. Services CTA (Updated with Web Design focus) */}
             <section className="py-20 bg-brand-900 text-white text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                 <div className="relative z-10 max-w-4xl mx-auto px-4">
                     <h2 className="text-3xl lg:text-4xl font-bold mb-6">أكثر من مجرد سوق نطاقات</h2>
                     <p className="text-brand-100 mb-10 text-lg">اشتريت النطاق؟ لا تتوقف هنا. نقدم لك خدمات متكاملة لبناء مشروعك الرقمي.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                         <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                             <Code className="w-8 h-8 mb-4 text-brand-300" />
                             <h3 className="font-bold text-lg mb-2">تصميم المواقع</h3>
                             <p className="text-sm text-gray-300">نحول نطاقك إلى موقع احترافي متجاوب.</p>
                         </div>
                         <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                             <Server className="w-8 h-8 mb-4 text-brand-300" />
                             <h3 className="font-bold text-lg mb-2">الاستضافة والسيرفرات</h3>
                             <p className="text-sm text-gray-300">استضافة سريعة وآمنة مع بريد رسمي.</p>
                         </div>
                         <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                             <Users className="w-8 h-8 mb-4 text-brand-300" />
                             <h3 className="font-bold text-lg mb-2">خدمة العملاء</h3>
                             <p className="text-sm text-gray-300">دعم فني متخصص على مدار الساعة.</p>
                         </div>
                     </div>

                     <button onClick={() => onAction('services')} className="bg-white text-brand-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">اطلب خدماتنا الإضافية</button>
                 </div>
             </section>
        </div>
    );
};

// --- AUTH MODAL (REAL REGISTRATION) ---
const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onLoginSuccess: (user: User) => void }> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: UserRole.BUYER });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (mode === 'login') {
            const user = Service.loginUser(formData.email, formData.password);
            if (user) onLoginSuccess(user);
            else setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else {
            if (!formData.name || !formData.email || !formData.password) return setError('جميع الحقول مطلوبة');
            const user = Service.registerUser(formData.name, formData.email, formData.password, formData.role);
            if (user) onLoginSuccess(user);
            else setError('البريد الإلكتروني مسجل مسبقاً');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <Card className="max-w-md w-full p-8 shadow-2xl relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"><CheckCircle className="w-6 h-6 rotate-45" /></button>
                
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
                    <p className="text-gray-500 text-sm mt-2">انضم لأكبر مجتمع لتجارة النطاقات</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 animate-pulse">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <Input 
                            placeholder="الاسم الكامل" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    )}
                    <Input 
                        placeholder="البريد الإلكتروني" 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <Input 
                        placeholder="كلمة المرور" 
                        type="password" 
                        value={formData.password} 
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                    
                    {mode === 'register' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">نوع الحساب</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { r: UserRole.BUYER, label: 'مشتري' },
                                    { r: UserRole.SELLER, label: 'بائع' },
                                    { r: UserRole.MARKETER, label: 'مسوق' }
                                ].map(opt => (
                                    <button 
                                        type="button"
                                        key={opt.r}
                                        onClick={() => setFormData({...formData, role: opt.r})}
                                        className={`py-2 text-sm rounded-lg border transition-all ${formData.role === opt.r ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button className="w-full mt-2" type="submit">{mode === 'login' ? 'دخول' : 'تسجيل مجاني'}</Button>
                </form>

                <div className="mt-6 text-center text-sm border-t pt-4">
                    {mode === 'login' ? (
                        <p>ليس لديك حساب؟ <button onClick={() => setMode('register')} className="text-brand-600 font-bold hover:underline">أنشئ حساباً الآن</button></p>
                    ) : (
                        <p>لديك حساب بالفعل؟ <button onClick={() => setMode('login')} className="text-brand-600 font-bold hover:underline">تسجيل الدخول</button></p>
                    )}
                </div>
            </Card>
        </div>
    );
};

// Icon helper
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [initialSearchTerm, setInitialSearchTerm] = useState('');
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

  const [domains, setDomains] = useState<Domain[]>(Service.getAllDomains());
  const [cart, setCart] = useState<Domain[]>([]);

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) localStorage.setItem('domnixa_ref', ref);
  }, []);

  const handleLoginSuccess = (user: User) => {
      setCurrentUser(user);
      setIsAuthOpen(false);
      showNotification(`مرحباً بك يا ${user.name}`);
      if (user.roles.includes(UserRole.SELLER) || user.roles.includes(UserRole.MARKETER)) setCurrentPage('dashboard');
  };

  const showNotification = (msg: string) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
  };

  const refreshData = () => setDomains([...Service.getAllDomains()]);

  const handleAddDomain = (domainData: any) => {
      Service.createDomain(domainData);
      refreshData();
      showNotification('تم إضافة النطاق بنجاح');
  };

  const addToCart = (id: string) => {
      const domain = domains.find(d => d.id === id);
      if (!domain) return;
      if (cart.find(c => c.id === id)) return showNotification('موجود بالفعل في السلة');
      setCart([...cart, domain]);
      showNotification('تمت الإضافة للسلة');
  };

  const handleCheckout = () => {
      if (!currentUser) return setIsAuthOpen(true);
      const ref = localStorage.getItem('domnixa_ref') || undefined;
      const success = Service.processCheckout(cart.map(c => c.id), currentUser.id, 'STRIPE', ref);
      if (success) {
          setCart([]);
          refreshData();
          showNotification('تم الشراء بنجاح!');
      }
  };

  const handleViewDetails = (id: string) => {
      setSelectedDomainId(id);
      setCurrentPage('domain-details');
  };
  
  const handleNavigation = (page: string) => {
      if (page.startsWith('#')) {
           const el = document.getElementById(page.substring(1));
           el?.scrollIntoView({ behavior: 'smooth' });
      } else {
          setCurrentPage(page); 
          if(page !== 'marketplace') setInitialSearchTerm(''); 
          setSelectedDomainId(null); 
      }
  };

  const handleLandingAction = (action: string) => {
      if (['register', 'buyer', 'seller', 'marketer'].includes(action)) setIsAuthOpen(true);
      else if (action === 'about') setCurrentPage('about');
      else if (action === 'services') setCurrentPage('services');
      else if (action === 'marketplace') setCurrentPage('marketplace');
  };

  const selectedDomain = domains.find(d => d.id === selectedDomainId);

  return (
    <>
        <Layout 
            user={currentUser} 
            onLogout={() => { setCurrentUser(null); setCurrentPage('home'); setCart([]); }}
            onLoginClick={() => setIsAuthOpen(true)}
            currentPage={currentPage}
            cartCount={cart.length}
            onNavigate={handleNavigation}
        >
            {currentPage === 'home' && <LandingPage onAction={handleLandingAction} domains={domains} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'policies' && <PoliciesPage />}
            {currentPage === 'services' && <SupportPage />}
            {currentPage === 'marketplace' && <Marketplace domains={domains} onBuy={handleViewDetails} initialSearch={initialSearchTerm} />}
            {currentPage === 'domain-details' && selectedDomain && <DomainDetails domain={selectedDomain} currentUser={currentUser} onBack={() => setCurrentPage('marketplace')} onAddToCart={addToCart} />}
            {currentPage === 'cart' && <Cart cartItems={cart} onRemove={(id) => setCart(cart.filter(c => c.id !== id))} onCheckout={handleCheckout} />}
            {currentPage === 'academy' && <Academy />}
            {currentPage === 'dashboard' && currentUser && (
                <Dashboard 
                    user={currentUser}
                    userDomains={domains.filter(d => d.sellerId === currentUser.id)}
                    userTransactions={Service.getTransactionsByUser(currentUser.id)}
                    onAddDomain={handleAddDomain}
                    onApproveDomain={(id) => { Service.approveDomain(id); refreshData(); }}
                    onRejectDomain={(id) => { Service.rejectDomain(id); refreshData(); }}
                    allDomainsForAdmin={currentUser.roles.includes(UserRole.ADMIN) ? domains : undefined}
                />
            )}
        </Layout>

        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />

        {notification && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-6 md:right-auto bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300 z-[100] border border-gray-800">
                <div className="bg-green-500 rounded-full p-1"><CheckCircle className="w-4 h-4 text-white" /></div>
                <span className="font-medium">{notification}</span>
            </div>
        )}
    </>
  );
}