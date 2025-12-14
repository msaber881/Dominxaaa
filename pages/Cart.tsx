import React, { useState } from 'react';
import { Domain } from '../types';
import { Card, Button, Input } from '../components/UI';
import { Trash2, Lock, CreditCard, ShieldCheck, Check, Globe } from 'lucide-react';

interface CartProps {
    cartItems: Domain[];
    onRemove: (id: string) => void;
    onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onCheckout }) => {
    const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        onCheckout();
        setStep('success');
    };

    if (cartItems.length === 0 && step !== 'success') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="bg-white rounded-2xl p-12 shadow-sm inline-block">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
                    <p className="text-gray-500 mb-6">لم تقم بإضافة أي نطاقات للسلة بعد.</p>
                    <Button onClick={() => window.location.reload()}>تصفح السوق</Button>
                </div>
            </div>
        );
    }

    if (step === 'success') {
         return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-2xl p-12 shadow-lg border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">تم استلام طلبك بنجاح!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        المبلغ الآن في حساب الضمان (Escrow).<br/>
                        سيتواصل معك فريقنا خلال 24 ساعة لنقل ملكية النطاقات.
                    </p>
                    
                    {/* UPSIDE: Post Sale Services */}
                    <div className="bg-brand-50 p-6 rounded-xl text-right mb-8 border border-brand-100">
                        <h3 className="font-bold text-xl text-brand-900 mb-2 flex items-center gap-2"><Globe className="w-5 h-5" /> خطوتك القادمة: إنشاء الموقع</h3>
                        <p className="text-gray-600 mb-4 text-sm">تهانينا على النطاق الجديد! هل ترغب في أن نقوم بتصميم واستضافة موقعك الجديد عليه؟</p>
                        <ul className="space-y-2 mb-4 text-sm text-gray-700">
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> تصميم احترافي متجاوب</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> استضافة مجانية لمدة سنة</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> بريد إلكتروني رسمي باسم الشركة</li>
                        </ul>
                        <div className="flex gap-4">
                            <Button className="flex-1">طلب عرض سعر للموقع</Button>
                            <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/'}>العودة للرئيسية</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">إتمام الشراء</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {step === 'cart' ? (
                        cartItems.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="bg-brand-50 p-3 rounded-lg">
                                        <Lock className="w-6 h-6 text-brand-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg dir-ltr text-right">{item.name}{item.tld}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-bold text-lg">{item.price.toLocaleString()} ج.م</span>
                                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 p-2">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold mb-4">بيانات الدفع</h3>
                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="flex gap-4 mb-6">
                                    <div 
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex-1 p-4 border rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 ${paymentMethod === 'card' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200'}`}
                                    >
                                        <CreditCard />
                                        <span className="font-bold">بطاقة بنكية</span>
                                    </div>
                                    <div 
                                        onClick={() => setPaymentMethod('bank')}
                                        className={`flex-1 p-4 border rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 ${paymentMethod === 'bank' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200'}`}
                                    >
                                        <div className="font-bold text-xl">🏦</div>
                                        <span className="font-bold">تحويل بنكي</span>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <>
                                        <Input label="رقم البطاقة" placeholder="0000 0000 0000 0000" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="تاريخ الانتهاء" placeholder="MM/YY" required />
                                            <Input label="CVC" placeholder="123" required />
                                        </div>
                                        <Input label="اسم حامل البطاقة" placeholder="الاسم كما في البطاقة" required />
                                    </>
                                )}
                                
                                <Button type="submit" className="w-full h-12 text-lg mt-4">تأكيد الدفع ({total.toLocaleString()} ج.م)</Button>
                                <Button type="button" variant="secondary" className="w-full mt-2" onClick={() => setStep('cart')}>العودة للسلة</Button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <h3 className="text-xl font-bold mb-6">ملخص الطلب</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>عدد النطاقات</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>المجموع الفرعي</span>
                                <span>{total.toLocaleString()} ج.م</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-xl text-brand-900">
                                <span>الإجمالي</span>
                                <span>{total.toLocaleString()} ج.م</span>
                            </div>
                        </div>

                        {step === 'cart' && (
                            <Button className="w-full h-12 text-lg shadow-lg shadow-brand-500/20" onClick={() => setStep('payment')}>
                                متابعة للدفع
                            </Button>
                        )}

                        <div className="mt-6 bg-gray-50 p-4 rounded-xl text-xs text-gray-500 flex items-start gap-2">
                            <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <p>
                                جميع المدفوعات محمية بنظام Escrow.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};