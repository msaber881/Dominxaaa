import React, { useState } from 'react';
import { ACADEMY_ARTICLES } from '../services/mockService';
import { Card, Button } from '../components/UI';
import { BookOpen, Clock, ChevronLeft, PlayCircle } from 'lucide-react';

export const Academy: React.FC = () => {
    const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

    const activeArticle = ACADEMY_ARTICLES.find(a => a.id === activeArticleId);

    if (activeArticle) {
        return (
            <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <Button variant="outline" onClick={() => setActiveArticleId(null)} className="mb-6">
                        <ChevronLeft className="w-4 h-4 ml-2" />
                        العودة للأكاديمية
                    </Button>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up">
                        <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-64 object-cover" />
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-bold">{activeArticle.category}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activeArticle.readTime}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{activeArticle.title}</h1>
                            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                {activeArticle.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-brand-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10 animate-fade-in-up">
                    <h1 className="text-4xl font-extrabold mb-4">أكاديمية دومنيكسا</h1>
                    <p className="text-xl text-brand-200 max-w-2xl mx-auto">تعلم أساسيات تجارة النطاقات، التسويق بالعمولة، والاستثمار الرقمي من الصفر.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ACADEMY_ARTICLES.map((article, index) => (
                        <div 
                            key={article.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animate-fade-in-up" 
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => setActiveArticleId(article.id)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">{article.category}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{article.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};