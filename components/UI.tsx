import React from 'react';
import { Domain, DomainStatus, ListingType } from '../types';
import { Coins, ShieldCheck, Globe, Star, ArrowRight, Eye } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  const baseStyle = "px-5 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-gray-900",
    outline: "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 hover:border-brand-700 hover:text-brand-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ status: DomainStatus | ListingType | string; color?: string }> = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-800";
  let icon = null;
  
  switch (status) {
    case DomainStatus.ACTIVE: 
        colorClass = "bg-green-50 text-green-700 border border-green-100"; 
        break;
    case DomainStatus.PENDING: 
        colorClass = "bg-yellow-50 text-yellow-700 border border-yellow-100"; 
        break;
    case DomainStatus.SOLD: 
        colorClass = "bg-gray-100 text-gray-600 border border-gray-200 line-through"; 
        break;
    case ListingType.EXCLUSIVE: 
        colorClass = "bg-purple-50 text-purple-700 border border-purple-100"; 
        icon = <Star className="w-3 h-3 ml-1 fill-purple-700 text-purple-700" />;
        break;
    case ListingType.MANAGED: 
        colorClass = "bg-blue-50 text-blue-700 border border-blue-100"; 
        break;
  }

  const labelMap: Record<string, string> = {
    [DomainStatus.ACTIVE]: 'نشط',
    [DomainStatus.PENDING]: 'قيد المراجعة',
    [DomainStatus.SOLD]: 'تم البيع',
    [DomainStatus.REJECTED]: 'مرفوض',
    [ListingType.EXCLUSIVE]: 'حصري',
    [ListingType.STANDARD]: 'قياسي',
    [ListingType.MANAGED]: 'مُدار',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center ${colorClass}`}>
      {icon}
      {labelMap[status] || status}
    </span>
  );
};

interface DomainCardProps {
  domain: Domain;
  onBuy?: (id: string) => void;
  showActions?: boolean;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onBuy, showActions = true }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:border-brand-100 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      {/* Exclusive Background Highlight */}
      {domain.listingType === ListingType.EXCLUSIVE && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-purple-500"></div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="bg-gray-50 group-hover:bg-brand-50 p-3 rounded-xl transition-colors">
            <Globe className="w-6 h-6 text-gray-400 group-hover:text-brand-600 transition-colors" />
        </div>
        <div className="flex gap-2">
            {domain.listingType === ListingType.EXCLUSIVE && <Badge status={ListingType.EXCLUSIVE} />}
            <Badge status={domain.status} />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-black text-gray-900 dir-ltr text-right truncate tracking-tight group-hover:text-brand-600 transition-colors">
            {domain.name}
            <span className="text-gray-400 font-normal">{domain.tld}</span>
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 h-10">{domain.description}</p>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-6 bg-gray-50 rounded-lg p-2">
        <span className="flex items-center gap-1.5 text-gray-600">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            ضمان دومنيكسا
        </span>
        <div className="w-px h-3 bg-gray-300"></div>
        <span className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            {domain.ageYears} سنوات
        </span>
        <div className="w-px h-3 bg-gray-300"></div>
        <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {domain.views}
        </span>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div>
            <span className="text-xs text-gray-400 block mb-0.5">السعر المطلوب</span>
            <p className="text-xl font-bold text-gray-900">{domain.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">ج.م</span></p>
        </div>
        {showActions && domain.status === DomainStatus.ACTIVE && (
            <Button onClick={() => onBuy && onBuy(domain.id)} className="!px-6 shadow-md shadow-brand-500/10">
                شراء <ArrowRight className="w-4 h-4 mr-1" />
            </Button>
        )}
      </div>
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
    <input 
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-400 text-gray-900 ${className}`}
      {...props} 
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, className, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
    <div className="relative">
        <select 
        className={`w-full appearance-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white text-gray-900 ${className}`}
        {...props} 
        >
            {children}
        </select>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
    </div>
  </div>
);