import React, { useState, useMemo, useEffect } from 'react';
import { Domain, CATEGORIES, DomainStatus, ListingType } from '../types';
import { DomainCard, Button } from '../components/UI';
import { Search, Filter, RefreshCw, ChevronDown, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface MarketplaceProps {
  domains: Domain[];
  onBuy: (id: string) => void;
  initialSearch?: string;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ domains, onBuy, initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTlds, setSelectedTlds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if(initialSearch) setSearchTerm(initialSearch);
  }, [initialSearch]);

  const tldOptions = useMemo(() => {
     const tlds = new Set(domains.map(d => d.tld));
     return Array.from(tlds);
  }, [domains]);

  const activeDomains = useMemo(() => {
    return domains.filter(d => d.status === DomainStatus.ACTIVE);
  }, [domains]);

  const filteredDomains = useMemo(() => {
    let result = activeDomains.filter(domain => {
      const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            domain.tld.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? domain.category === selectedCategory : true;
      const matchesTld = selectedTlds.length > 0 ? selectedTlds.includes(domain.tld) : true;
      const matchesPrice = domain.price >= priceRange[0] && domain.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesTld && matchesPrice;
    });

    return result.sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [activeDomains, searchTerm, selectedCategory, selectedTlds, priceRange, sortBy]);

  const toggleTld = (tld: string) => {
      setSelectedTlds(prev => prev.includes(tld) ? prev.filter(t => t !== tld) : [...prev, tld]);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header & Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-sm animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-xl">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="ابحث عن نطاقك المثالي..."
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button 
                        variant="secondary" 
                        className="md:hidden flex-1"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        <Filter className="w-4 h-4 ml-2" />
                        تصفية
                    </Button>
                    <div className="relative flex-1 md:w-48">
                         <select
                            className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="newest">الأحدث إضافة</option>
                            <option value="price_asc">السعر: الأقل أولاً</option>
                            <option value="price_desc">السعر: الأعلى أولاً</option>
                        </select>
                        <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters (Desktop) */}
            <div className={`lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-40 space-y-8 animate-fade-in-up">
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center"><SlidersHorizontal className="w-4 h-4 ml-2" /> التصنيف</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    className="accent-brand-600 w-4 h-4"
                                    checked={selectedCategory === ''} 
                                    onChange={() => setSelectedCategory('')}
                                />
                                <span className={`text-sm ${selectedCategory === '' ? 'text-brand-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>الكل</span>
                            </label>
                            {CATEGORIES.map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="category" 
                                        value={cat}
                                        className="accent-brand-600 w-4 h-4"
                                        checked={selectedCategory === cat} 
                                        onChange={() => setSelectedCategory(cat)}
                                    />
                                    <span className={`text-sm ${selectedCategory === cat ? 'text-brand-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* TLDs */}
                    <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4">الامتداد (Extension)</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                            {tldOptions.map(tld => (
                                <label key={tld} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTlds.includes(tld) ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white'}`}>
                                        {selectedTlds.includes(tld) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={selectedTlds.includes(tld)} 
                                        onChange={() => toggleTld(tld)}
                                    />
                                    <span className="text-sm text-gray-600 dir-ltr">{tld}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4">السعر</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <span className="font-mono">{priceRange[0].toLocaleString()}</span>
                            <span>-</span>
                            <span className="font-mono">{priceRange[1].toLocaleString()} ج.م</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100000" 
                            step="1000"
                            className="w-full accent-brand-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                         <div className="flex justify-between mt-2">
                             <span className="text-xs text-gray-400">0</span>
                             <span className="text-xs text-gray-400">100k+</span>
                         </div>
                    </div>

                     <Button variant="outline" className="w-full mt-4" onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedTlds([]);
                        setPriceRange([0, 100000]);
                    }}>
                        <RefreshCw className="w-4 h-4 ml-2" />
                        إعادة تعيين
                    </Button>
                </div>
            </div>

            {/* Results Grid */}
            <div className="flex-grow">
                <div className="mb-4 text-sm text-gray-500 animate-fade-in">
                    تم العثور على <span className="font-bold text-gray-900">{filteredDomains.length}</span> نطاق
                </div>

                {filteredDomains.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDomains.map((domain, index) => (
                         // Staggered animation based on index
                        <div key={domain.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                            <DomainCard domain={domain} onBuy={onBuy} />
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in">
                        <Filter className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">لا توجد نتائج مطابقة</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">لم نعثر على نطاقات تطابق بحثك الحالي. جرب تغيير الكلمات المفتاحية أو إزالة بعض الفلاتر.</p>
                        <Button variant="primary" onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('');
                            setSelectedTlds([]);
                            setPriceRange([0, 100000]);
                        }}>
                            عرض جميع النطاقات
                        </Button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};