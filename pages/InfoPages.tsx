import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { ShieldCheck, Target, Eye, Globe, Server, Code, FileText, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

// --- ABOUT US PAGE ---
export const AboutPage: React.FC = () => (
    <div className="animate-in fade-in duration-500">
        <div className="bg-brand-900 text-white py-20 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">من نحن</h1>
            <p className="text-xl text-brand-200 max-w-2xl mx-auto">دومنيكسا هي المنصة العربية الأولى المتخصصة في الاستثمار الرقمي وتجارة النطاقات.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-t-4 border-t-brand-500">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6 text-brand-600"><Eye className="w-8 h-8" /></div>
                    <h2 className="text-2xl font-bold mb-4 text-brand-900">رؤيتنا (Vision)</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        أن نكون البوابة الرقمية الأولى في الشرق الأوسط وشمال أفريقيا، والمحرك الأساسي لتمكين رواد الأعمال العرب من امتلاك هويتهم الرقمية وبناء أصول استثمارية مستدامة على الإنترنت.
                    </p>
                </Card>
                <Card className="border-t-4 border-t-green-500">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"><Target className="w-8 h-8" /></div>
                    <h2 className="text-2xl font-bold mb-4 text-brand-900">رسالتنا (Mission)</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        توفير بيئة تداول آمنة، شفافة، ومتطورة تضمن حقوق جميع الأطراف، مع تقديم الدعم الفني والتعليمي اللازم لرفع الوعي بأهمية الاقتصاد الرقمي في المنطقة العربية.
                    </p>
                </Card>
            </div>

            {/* Core Values */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-10 text-gray-900">قيمنا الجوهرية</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <ShieldCheck className="w-10 h-10 text-brand-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">الأمان المطلق</h3>
                        <p className="text-gray-500">لا تهاون في حماية أموال وبيانات عملائنا.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <Globe className="w-10 h-10 text-brand-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">الهوية العربية</h3>
                        <p className="text-gray-500">فخورون بلغتنا وندعم المحتوى الرقمي العربي.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <Target className="w-10 h-10 text-brand-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">الشفافية</h3>
                        <p className="text-gray-500">وضوح تام في الرسوم والسياسات دون تعقيد.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- POLICIES PAGE ---
export const PoliciesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'buyer' | 'seller' | 'marketer'>('buyer');

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">السياسات والشروط</h1>
            
            <div className="flex border-b border-gray-200 mb-8">
                <button onClick={() => setActiveTab('buyer')} className={`flex-1 pb-4 font-bold ${activeTab === 'buyer' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>سياسة المشتري</button>
                <button onClick={() => setActiveTab('seller')} className={`flex-1 pb-4 font-bold ${activeTab === 'seller' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>سياسة البائع</button>
                <button onClick={() => setActiveTab('marketer')} className={`flex-1 pb-4 font-bold ${activeTab === 'marketer' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>سياسة المسوق</button>
            </div>

            <Card>
                {activeTab === 'buyer' && (
                    <div className="space-y-4 text-gray-700 leading-relaxed animate-in fade-in">
                        <h3 className="text-xl font-bold text-brand-900">حقوق والتزامات المشتري</h3>
                        <p>1. **ضمان الأموال:** تضمن المنصة الاحتفاظ بأموالك في حساب الضمان (Escrow) حتى يتم نقل ملكية النطاق إليك بالكامل.</p>
                        <p>2. **فترة الفحص:** يحق للمشتري فترة فحص (Inspection Period) مدتها 3 أيام بعد استلام النطاق للتأكد من سلامته.</p>
                        <p>3. **المدفوعات:** يجب إتمام عملية الدفع خلال 24 ساعة من قبول العرض، وإلا يعتبر العرض لاغياً.</p>
                        <p>4. **النزاعات:** في حالة عدم استلام النطاق، تقوم المنصة بإعادة المبلغ كاملاً للمشتري دون خصم أي رسوم إدارية.</p>
                    </div>
                )}
                {activeTab === 'seller' && (
                    <div className="space-y-4 text-gray-700 leading-relaxed animate-in fade-in">
                        <h3 className="text-xl font-bold text-green-900">حقوق والتزامات البائع</h3>
                        <p>1. **الملكية:** يجب أن يكون البائع هو المالك القانوني والحصري للنطاق المعروض.</p>
                        <p>2. **العمولات:** تقتطع المنصة نسبة تتراوح بين 10% إلى 20% حسب نوع الإدراج (Listing Type) عند إتمام البيع فقط.</p>
                        <p>3. **النقل:** يلتزم البائع بتقديم كود النقل (Auth Code) وتعطيل القفل (Unlock) خلال 48 ساعة من إشعار البيع.</p>
                        <p>4. **المصداقية:** أي تلاعب في إحصائيات الزيارات أو الدخل للنطاق يعرض الحساب للحظر النهائي.</p>
                    </div>
                )}
                {activeTab === 'marketer' && (
                    <div className="space-y-4 text-gray-700 leading-relaxed animate-in fade-in">
                        <h3 className="text-xl font-bold text-orange-900">برنامج التسويق بالعمولة</h3>
                        <p>1. **الاحتيال:** يمنع استخدام النطاق الخاص بك للشراء (Self-referral) لكسب العمولة.</p>
                        <p>2. **الدفعات:** يتم تحويل العمولات عندما يتجاوز الرصيد 500 ج.م، وذلك في يوم 15 من كل شهر.</p>
                        <p>3. **صلاحية الكوكيز:** تحتسب العمولة لأي عملية شراء تتم خلال 30 يوماً من نقر العميل على رابط الإحالة.</p>
                        <p>4. **التمثيل:** يمنع انتحال صفة موظف في "دومنيكسا" أثناء التسويق.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

// --- SUPPORT & SERVICES PAGE ---
export const SupportPage: React.FC = () => (
    <div className="animate-in fade-in duration-500 pb-16">
        <div className="bg-gray-900 text-white py-16 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">خدمة العملاء والخدمات الإضافية</h1>
            <p className="text-gray-400">نحن هنا لدعم نجاحك، ليس فقط في شراء النطاق، بل في بناء مشروعك.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Contact Form */}
                <Card className="shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Mail className="text-brand-600" /> تواصل معنا</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="الاسم الكامل" />
                            <Input placeholder="البريد الإلكتروني" type="email" />
                        </div>
                        <select className="w-full p-3 border rounded-xl bg-gray-50 outline-none">
                            <option>استفسار عام</option>
                            <option>مشكلة في الدفع</option>
                            <option>إبلاغ عن مخالفة</option>
                            <option>طلب شراكة</option>
                        </select>
                        <textarea className="w-full p-4 border rounded-xl bg-gray-50 outline-none h-32" placeholder="اكتب رسالتك هنا..."></textarea>
                        <Button className="w-full">إرسال الرسالة</Button>
                    </form>
                    <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> <span>+20 100 123 4567 (9 ص - 5 م)</span></div>
                        <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> <span>مبنى التكنولوجيا، المعادي، القاهرة</span></div>
                    </div>
                </Card>

                {/* Post-Sale Services */}
                <div className="space-y-6">
                    <div className="bg-brand-50 border border-brand-100 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-brand-900 flex items-center gap-2"><Code /> خدمات ما بعد البيع</h2>
                        <p className="text-brand-700 mb-6">اشتريت النطاق؟ دعنا نساعدك في بناء الموقع!</p>
                        
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-xl flex items-start gap-4 shadow-sm">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Globe /></div>
                                <div>
                                    <h3 className="font-bold">تصميم وتطوير المواقع</h3>
                                    <p className="text-sm text-gray-500 mt-1">تصميم موقع احترافي لنطاقك الجديد يبدأ من 3000 ج.م.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl flex items-start gap-4 shadow-sm">
                                <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Server /></div>
                                <div>
                                    <h3 className="font-bold">استضافة وحجز سيرفرات</h3>
                                    <p className="text-sm text-gray-500 mt-1">استضافة سريعة وآمنة مع إعداد البريد الإلكتروني الرسمي.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl flex items-start gap-4 shadow-sm">
                                <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><FileText /></div>
                                <div>
                                    <h3 className="font-bold">إعداد الهوية البصرية</h3>
                                    <p className="text-sm text-gray-500 mt-1">تصميم الشعار (Logo) والهوية الكاملة للمشروع.</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-6" variant="outline">طلب خدمة إضافية</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);