import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './UI';
import { Menu, X, ShoppingCart, Bell, LayoutDashboard, Settings, LogOut, Globe, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onLoginClick, currentPage, onNavigate, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'marketplace', label: 'السوق' },
    { id: 'academy', label: 'الأكاديمية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'خدماتنا' },
  ];

  const unreadNotifs = user?.notifications.filter(n => !n.read).length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      {/* Navbar - Sticky & White */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 h-[70px] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo Section (Right) */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="relative">
                <img 
                    src="https://ai.studio/apps/drive/1dsTWyyv3uAnX6PSqXsy534ZIb3PDDgZD" 
                    alt="Domnixa Logo" 
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        // Fallback in case image link breaks
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                />
                <div className="hidden w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
                     <span className="text-white font-black text-xl">د</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl leading-none text-brand-800 tracking-tight" style={{fontFamily: "'Cairo', sans-serif", fontWeight: 900}}>دومنيكسا</h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide group-hover:text-brand-600 transition-colors">سوق النطاقات العربي</p>
              </div>
            </div>

            {/* Navigation Links (Center - Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`${
                    currentPage === link.id
                      ? 'text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-lg'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50 px-3 py-1 rounded-lg'
                  } text-sm font-medium transition-all duration-200`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Action Buttons (Left) */}
            <div className="hidden md:flex items-center gap-4">
               {/* Cart */}
               <button onClick={() => onNavigate('cart')} className="relative p-2 text-gray-500 hover:text-brand-600 transition-colors hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full animate-pulse">{cartCount}</span>}
              </button>

              <div className="w-px h-6 bg-gray-200 mx-1"></div>

              {user ? (
                 <div className="flex items-center gap-3 relative">
                 {/* Notifications */}
                 <button className="relative p-2 text-gray-500 hover:text-brand-600 hover:bg-gray-100 rounded-full" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                     <Bell className="w-5 h-5" />
                     {unreadNotifs > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-bounce"></span>}
                 </button>

                 {/* Notif Dropdown */}
                 {isNotifOpen && (
                     <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                         <div className="p-3 border-b bg-gray-50 font-bold flex justify-between text-sm">
                             <span>الإشعارات</span>
                             <span className="text-xs text-brand-600 cursor-pointer hover:underline">مسح الكل</span>
                         </div>
                         <div className="max-h-64 overflow-y-auto">
                             {user.notifications.length === 0 ? (
                                 <div className="p-4 text-center text-gray-500 text-sm">لا توجد إشعارات جديدة</div>
                             ) : (
                                 user.notifications.map(n => (
                                     <div key={n.id} className="p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer">
                                         <div className="text-sm font-bold text-gray-900">{n.title}</div>
                                         <div className="text-xs text-gray-500 mt-1">{n.message}</div>
                                     </div>
                                 ))
                             )}
                         </div>
                     </div>
                 )}

                 {/* User Profile */}
                 <div className="relative">
                     <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 pr-2 transition-colors">
                         <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border-2 border-brand-200 text-sm shadow-sm">
                             {user.name[0]}
                         </div>
                         <div className="text-right hidden lg:block">
                             <div className="text-xs font-bold text-gray-900">{user.name}</div>
                             <div className="text-[10px] text-brand-600 bg-brand-50 px-1.5 rounded inline-block">{user.roles[0]}</div>
                         </div>
                     </button>

                     {isUserMenuOpen && (
                         <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                             <div className="p-4 border-b bg-gray-50">
                                 <p className="text-xs text-gray-500 mb-1">الرصيد المتاح</p>
                                 <p className="text-lg font-bold text-green-600">{user.balance.available.toLocaleString()} ج.م</p>
                             </div>
                             <div className="p-1">
                                 <button onClick={() => { onNavigate('dashboard'); setIsUserMenuOpen(false); }} className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> لوحة التحكم</button>
                                 <button onClick={() => { onNavigate('services'); setIsUserMenuOpen(false); }} className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"><Settings className="w-4 h-4" /> خدماتي</button>
                                 <div className="h-px bg-gray-100 my-1"></div>
                                 <button onClick={onLogout} className="w-full text-right px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"><LogOut className="w-4 h-4" /> تسجيل الخروج</button>
                             </div>
                         </div>
                     )}
                 </div>
             </div>
              ) : (
                <>
                  <button 
                    onClick={onLoginClick} 
                    className="px-5 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all hover:shadow-md"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                    onClick={onLoginClick} 
                    className="px-5 py-2 text-sm font-bold text-white bg-brand-600 rounded-lg hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    إنشاء حساب
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
               <button onClick={() => onNavigate('cart')} className="relative p-2 text-gray-500">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full">{cartCount}</span>}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50 animate-fade-in-up">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-right px-4 py-3 border-b border-gray-50 text-gray-600 font-medium hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {!user && (
                 <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
                    <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="px-4 py-2 border border-gray-300 rounded-lg text-center font-bold text-sm">دخول</button>
                    <button onClick={() => {onLoginClick(); setIsMobileMenuOpen(false)}} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-center font-bold text-sm shadow-lg">تسجيل</button>
                 </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Column 1: Company Info */}
                <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-6 group">
                        <img src="https://ai.studio/apps/drive/1dsTWyyv3uAnX6PSqXsy534ZIb3PDDgZD" alt="Logo" className="w-8 h-8 object-contain filter brightness-0 invert" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                         <div className="hidden w-8 h-8 bg-brand-600 rounded flex items-center justify-center font-bold text-white">د</div>
                        <span className="text-xl font-bold font-sans tracking-wide">دومنيكسا</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        بوابتك الآمنة للاستثمار في الأصول الرقمية. نجمع بين البائع والمشتري في بيئة عربية متطورة تضمن الحقوق.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all transform hover:scale-110"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all transform hover:scale-110"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all transform hover:scale-110"><Linkedin className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600 transition-all transform hover:scale-110"><Instagram className="w-4 h-4" /></a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">روابط هامة</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><button onClick={() => onNavigate('about')} className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-500 rounded-full"></span> من نحن (الرؤية)</button></li>
                        <li><button onClick={() => onNavigate('marketplace')} className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-500 rounded-full"></span> تصفح السوق</button></li>
                        <li><button onClick={() => onNavigate('academy')} className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-500 rounded-full"></span> الأكاديمية التعليمية</button></li>
                        <li><button onClick={() => onNavigate('services')} className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-brand-500 rounded-full"></span> خدمات ما بعد البيع</button></li>
                    </ul>
                </div>

                {/* Column 3: Legal */}
                <div>
                    <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">السياسات</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><button onClick={() => onNavigate('policies')} className="hover:text-brand-400 transition-colors">سياسة البائع</button></li>
                        <li><button onClick={() => onNavigate('policies')} className="hover:text-brand-400 transition-colors">سياسة المشتري</button></li>
                        <li><button onClick={() => onNavigate('policies')} className="hover:text-brand-400 transition-colors">اتفاقية المسوقين</button></li>
                        <li><button onClick={() => onNavigate('policies')} className="hover:text-brand-400 transition-colors">الخصوصية والاستخدام</button></li>
                    </ul>
                </div>

                {/* Column 4: Contact */}
                <div>
                    <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">مركز المساعدة</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-lg">
                            <Mail className="w-4 h-4 text-brand-500" />
                            <span>support@domnixa.com</span>
                        </li>
                        <li className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-lg">
                            <Phone className="w-4 h-4 text-brand-500" />
                            <span>+20 100 123 4567</span>
                        </li>
                        <li className="text-xs text-gray-500 mt-4 leading-relaxed">
                            القاهرة، مصر<br/>
                            دعم فني 24/7
                        </li>
                        <li>
                             <button onClick={() => onNavigate('services')} className="mt-2 w-full px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-800 transition-colors">اتصل بنا</button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">&copy; 2025 دومنيكسا. جميع الحقوق محفوظة.</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-brand-500 font-bold">Domnixa Platform</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};