import React, { useState } from 'react';
import { Domain, ListingType } from '../types';
import { Card, Button, Input, Badge } from '../components/UI';
import { ShieldCheck, Globe, Calendar, Eye, Share2, Heart, AlertCircle, Check } from 'lucide-react';
import { makeOffer } from '../services/mockService';

interface DomainDetailsProps {
    domain: Domain;
    currentUser: any;
    onBack: () => void;
    onAddToCart: (id: string) => void;
}

export const DomainDetails: React.FC<DomainDetailsProps> = ({ domain, currentUser, onBack, onAddToCart }) => {
    const [offerAmount, setOfferAmount] = useState('');
    const [offerStatus, setOfferStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleOffer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return alert('يجب تسجيل الدخول أولاً');
        
        const success = makeOffer(domain.id, currentUser.id, Number(offerAmount));
        if (success) setOfferStatus('success');
        else setOfferStatus('error');
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <button onClick={onBack} className="text-gray-500 hover:text-brand-600 text-sm flex items-center gap-1">
                        &rarr; العودة للسوق
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-t-4 border-t-brand-500">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 dir-ltr text-right mb-2">{domain.name}{domain.tld}</h1>
                                    <div className="flex gap-2">
                                        <Badge status={domain.status} />
                                        {domain.listingType === ListingType.EXCLUSIVE && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold">حصري</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" className="!p-3 rounded-full"><Share2 className="w-5 h-5" /></Button>
                                    <Button variant="secondary" className="!p-3 rounded-full"><Heart className="w-5 h-5" /></Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4 mb-6">
                                <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {domain.tld}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {domain.ageYears} سنوات</span>
                                <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {domain.views} مشاهدة</span>
                            </div>

                            <div className="prose max-w-none text-gray-600">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">عن هذا النطاق</h3>
                                <p>{domain.description}</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> سهل النطق والتذكر</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> مثالي للعلامات التجارية</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> امتداد مرغوب ({domain.tld})</li>
                                </ul>
                            </div>
                        </Card>

                        {/* Whois Mock */}
                        <Card>
                            <h3 className="font-bold text-lg mb-4">بيانات WHOIS</h3>
                            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm dir-ltr text-left overflow-x-auto">
                                <p>Domain Name: {domain.name.toUpperCase()}{domain.tld.toUpperCase()}</p>
                                <p>Registry Domain ID: {domain.id}_DOM</p>
                                <p>Registrar URL: http://www.domnixa.com</p>
                                <p>Updated Date: {new Date().toISOString()}</p>
                                <p>Creation Date: {domain.createdAt}</p>
                                <p>Registry Expiry Date: 2026-01-01T00:00:00Z</p>
                                <p>Registrar: Domnixa LLC</p>
                                <p>Domain Status: clientTransferProhibited</p>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Action */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="sticky top-24 shadow-lg border-brand-100">
                            <div className="text-center mb-6">
                                <p className="text-gray-500 text-sm mb-1">السعر المطلوب</p>
                                <p className="text-4xl font-extrabold text-brand-600">{domain.price.toLocaleString()} <span className="text-lg text-gray-400 font-normal">ج.م</span></p>
                            </div>

                            <Button onClick={() => onAddToCart(domain.id)} className="w-full text-lg h-12 mb-4 shadow-xl shadow-brand-500/20">شراء الآن</Button>
                            
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">أو</span></div>
                            </div>

                            <form onSubmit={handleOffer}>
                                <h4 className="font-bold text-gray-900 mb-2">تقديم عرض</h4>
                                <div className="flex gap-2 mb-2">
                                    <input 
                                        type="number" 
                                        placeholder="المبلغ المقترح" 
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                                        value={offerAmount}
                                        onChange={e => setOfferAmount(e.target.value)}
                                        required
                                    />
                                    <Button variant="outline" type="submit">إرسال</Button>
                                </div>
                                {offerStatus === 'success' && <p className="text-green-600 text-xs flex items-center gap-1 mt-2"><Check className="w-3 h-3" /> تم إرسال العرض للبائع</p>}
                            </form>

                            <div className="mt-6 bg-gray-50 p-4 rounded-xl text-xs text-gray-500 space-y-2">
                                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-600" /> ضمان استرجاع الأموال</div>
                                <div className="flex items-center gap-2"><LockIcon /> مدفوعات آمنة ومشفرة</div>
                                <div className="flex items-center gap-2"><GlobeIcon /> نقل ملكية فوري</div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;