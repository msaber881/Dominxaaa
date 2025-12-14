import React, { useState } from 'react';
import { Domain, User, UserRole, ListingType, CATEGORIES, Transaction, DomainStatus } from '../types';
import { Card, Button, Input, Select, Badge } from '../components/UI';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { PlusCircle, DollarSign, Activity, CheckCircle, XCircle, ShoppingBag, FileText, ArrowUpRight, TrendingUp, Users, Wallet, AlertCircle } from 'lucide-react';
import { getAnalytics } from '../services/mockService';

interface DashboardProps {
  user: User;
  userDomains: Domain[];
  userTransactions: Transaction[];
  onAddDomain: (domain: any) => void;
  onApproveDomain?: (id: string) => void;
  onRejectDomain?: (id: string) => void;
  allDomainsForAdmin?: Domain[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, userDomains, userTransactions, onAddDomain, onApproveDomain, onRejectDomain, allDomainsForAdmin 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'wallet' | 'settings'>('overview');
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const analytics = getAnalytics(user.id, user.roles[0]);

  // New Domain Form State
  const [newDomain, setNewDomain] = useState({
    name: '', tld: '.eg', price: '', category: CATEGORIES[0], description: '', listingType: ListingType.EXCLUSIVE, ageYears: 1
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDomain({ ...newDomain, price: Number(newDomain.price), sellerId: user.id });
    setIsAddingDomain(false);
  };

  const StatCard = ({ title, value, sub, icon, color }: any) => (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
          <div className="flex justify-between items-start">
              <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                  {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
              </div>
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600">{icon}</div>
          </div>
      </Card>
  );

  // --- SELLER VIEW ---
  const renderSeller = () => (
      <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="الرصيد المتاح" value={`${user.balance.available.toLocaleString()} ج.م`} sub="قابل للسحب فوراً" icon={<Wallet />} color="#10b981" />
              <StatCard title="رصيد معلق (Escrow)" value={`${user.balance.pending.toLocaleString()} ج.م`} sub="في انتظار التسليم" icon={<LockIcon />} color="#f59e0b" />
              <StatCard title="إجمالي المبيعات" value={userTransactions.filter(t => t.sellerId === user.id && t.status === 'COMPLETED').length} sub="عملية ناجحة" icon={<TrendingUp />} color="#3b82f6" />
              <StatCard title="نطاقات معروضة" value={userDomains.length} sub="نشط حالياً" icon={<GlobeIcon />} color="#6366f1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                  <Card className="h-full">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold text-lg">أداء المبيعات (آخر 3 شهور)</h3>
                          <Select className="w-32 !mb-0 !py-1 text-sm"><option>هذا العام</option></Select>
                      </div>
                      <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={analytics.sales || []}>
                                  <defs>
                                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                      </linearGradient>
                                  </defs>
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
                              </AreaChart>
                          </ResponsiveContainer>
                      </div>
                  </Card>
              </div>
              <div className="lg:col-span-1">
                  <Card className="h-full bg-brand-900 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                      <h3 className="font-bold text-lg mb-4 relative z-10">إضافة نطاق جديد</h3>
                      <p className="text-brand-200 text-sm mb-6 relative z-10">هل لديك نطاق مميز؟ اعرضه الآن أمام آلاف المشترين واستفد من خدمات التسويق.</p>
                      <Button onClick={() => setIsAddingDomain(true)} className="w-full bg-white text-brand-900 hover:bg-gray-100 relative z-10 font-bold">
                          <PlusCircle className="w-5 h-5 ml-2" /> إضافة نطاق
                      </Button>
                      <div className="mt-8 relative z-10">
                          <h4 className="font-bold text-sm mb-2 text-brand-300">نصائح للبيع السريع:</h4>
                          <ul className="text-xs text-brand-200 space-y-2 list-disc list-inside">
                              <li>استخدم كلمات مفتاحية قوية</li>
                              <li>سعّر النطاق بشكل واقعي</li>
                              <li>فعل خيار "التسويق المدار" لظهور أفضل</li>
                          </ul>
                      </div>
                  </Card>
              </div>
          </div>

          <Card>
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">أحدث النطاقات</h3>
                  <Button variant="secondary" className="!px-3 !py-1 text-xs">عرض الكل</Button>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                          <tr>
                              <th className="px-6 py-3 text-right">النطاق</th>
                              <th className="px-6 py-3 text-right">السعر</th>
                              <th className="px-6 py-3 text-right">المشاهدات</th>
                              <th className="px-6 py-3 text-right">الحالة</th>
                              <th className="px-6 py-3 text-right">إجراء</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {userDomains.slice(0, 5).map(d => (
                              <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 font-bold dir-ltr text-right">{d.name}{d.tld}</td>
                                  <td className="px-6 py-4">{d.price.toLocaleString()} ج.م</td>
                                  <td className="px-6 py-4">{d.views}</td>
                                  <td className="px-6 py-4"><Badge status={d.status} /></td>
                                  <td className="px-6 py-4"><Button variant="outline" className="!px-2 !py-1 text-xs">تعديل</Button></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </Card>
      </div>
  );

  // --- MARKETER VIEW ---
  const renderMarketer = () => (
      <div className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white overflow-hidden relative">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform origin-bottom-left"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-4">
                  <div>
                      <h2 className="text-2xl font-bold mb-2">برنامج المسوقين المحترفين</h2>
                      <div className="flex items-center gap-2 mb-4">
                          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">TIER {user.commissionTier || 1}</span>
                          <span className="text-sm text-purple-200">عمولة الحالية: <span className="text-white font-bold">{(user.commissionTier === 3 ? 12 : user.commissionTier === 2 ? 10 : 5)}%</span></span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg flex items-center gap-3 max-w-md">
                          <code className="text-sm font-mono text-purple-200 flex-grow truncate">https://domnixa.com/?ref={user.affiliateCode}</code>
                          <Button className="!py-1 !px-3 text-xs bg-white/20 hover:bg-white/30 text-white border-0">نسخ</Button>
                      </div>
                  </div>
                  <div className="mt-6 md:mt-0 text-center">
                      <p className="text-purple-200 text-sm mb-1">الأرباح هذا الشهر</p>
                      <p className="text-4xl font-bold">{user.balance.pending.toLocaleString()} ج.م</p>
                  </div>
              </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                  <h3 className="font-bold mb-4">مصادر الزيارات</h3>
                  <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie data={[{name: 'Social', value: 400}, {name: 'Direct', value: 300}, {name: 'Blog', value: 300}]} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8">
                                  <Cell fill="#8b5cf6" /><Cell fill="#6366f1" /><Cell fill="#e5e7eb" />
                              </Pie>
                              <Tooltip />
                              <Legend />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>
              </Card>
              <Card>
                  <h3 className="font-bold mb-4">أفضل النطاقات مبيعاً</h3>
                  <div className="space-y-4">
                      {[1,2,3].map(i => (
                          <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                              <span className="font-bold text-gray-700">tech{i}.eg</span>
                              <span className="text-green-600 font-bold">+450 ج.م</span>
                          </div>
                      ))}
                  </div>
              </Card>
          </div>
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 mb-8 overflow-x-auto">
          {['overview', 'domains', 'wallet', 'settings'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                  {tab === 'overview' && 'نظرة عامة'}
                  {tab === 'domains' && 'النطاقات'}
                  {tab === 'wallet' && 'المحفظة'}
                  {tab === 'settings' && 'الإعدادات'}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>}
              </button>
          ))}
      </div>

      {isAddingDomain && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                <form onSubmit={handleAddSubmit}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">إضافة نطاق جديد</h3>
                        <Button variant="secondary" type="button" onClick={() => setIsAddingDomain(false)} className="!p-2"><XCircle /></Button>
                    </div>
                    {/* ... Form Inputs (Same as previous but inside modal) ... */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="اسم النطاق" placeholder="example" value={newDomain.name} onChange={e => setNewDomain({...newDomain, name: e.target.value})} required />
                        <Select label="الامتداد" value={newDomain.tld} onChange={e => setNewDomain({...newDomain, tld: e.target.value})}>
                            <option value=".eg">.eg</option>
                            <option value=".com">.com</option>
                        </Select>
                        <Input label="السعر" type="number" value={newDomain.price} onChange={e => setNewDomain({...newDomain, price: e.target.value})} required />
                        <Select label="استراتيجية البيع" value={newDomain.listingType} onChange={e => setNewDomain({...newDomain, listingType: e.target.value as ListingType})}>
                            <option value={ListingType.EXCLUSIVE}>حصري (عمولة 10%)</option>
                            <option value={ListingType.STANDARD}>عادي (عمولة 15%)</option>
                            <option value={ListingType.MANAGED}>مسوق (عمولة 20%)</option>
                        </Select>
                    </div>
                    <div className="mt-4"><Input label="الوصف" value={newDomain.description} onChange={e => setNewDomain({...newDomain, description: e.target.value})} /></div>
                    <div className="mt-6 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => setIsAddingDomain(false)}>إلغاء</Button>
                        <Button type="submit">حفظ ونشر</Button>
                    </div>
                </form>
             </Card>
        </div>
      )}

      {user.roles.includes(UserRole.SELLER) ? renderSeller() : 
       user.roles.includes(UserRole.MARKETER) ? renderMarketer() : 
       <div className="text-center py-20 text-gray-500">لوحة المشتري قيد التطوير (استخدم حساب البائع للمعاينة الكاملة)</div>}
    </div>
  );
};

// Icons helper
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;