import { useState, useEffect } from 'react';
import { TrendingUp, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Article } from '../lib/supabase';
import ArticleCard from './ArticleCard';

interface HomeViewProps {
  onArticleClick: (article: Article) => void;
  onCategoryClick: (category: string) => void;
}

export default function HomeView({ onArticleClick, onCategoryClick }: HomeViewProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFeatured, setActiveFeatured] = useState(0);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data: allData } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (allData) {
        setArticles(allData);
        setFeatured(allData.filter((a) => a.featured).slice(0, 3));
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setActiveFeatured((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const latestArticles = articles.filter((a) => !a.featured);
  const categories = ['Politik', 'Teknologi', 'Olahraga', 'Hiburan', 'Bisnis', 'Kesehatan', 'Wisata'];
  const categoryColors: Record<string, string> = {
    Politik: 'bg-blue-500',
    Teknologi: 'bg-cyan-500',
    Olahraga: 'bg-green-500',
    Hiburan: 'bg-purple-500',
    Bisnis: 'bg-amber-500',
    Kesehatan: 'bg-rose-500',
    Wisata: 'bg-teal-500',
  };

  const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Carousel */}
      {featured.length > 0 && (
        <div className="relative mb-10 rounded-2xl overflow-hidden bg-gray-900 h-[400px] md:h-[500px]">
          {featured.map((article, index) => (
            <div
              key={article.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeFeatured ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={article.image_url || ''}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white mb-4">
                  {article.category}
                </span>
                <h2
                  className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 max-w-3xl cursor-pointer hover:underline"
                  onClick={() => onArticleClick(article)}
                >
                  {article.title}
                </h2>
                <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2 mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {article.views} dilihat
                  </span>
                </div>
              </div>
            </div>
          ))}
          {featured.length > 1 && (
            <>
              <button
                onClick={() => setActiveFeatured((prev) => (prev - 1 + featured.length) % featured.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveFeatured((prev) => (prev + 1) % featured.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6 flex gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFeatured(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activeFeatured ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Categories */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Kategori</h3>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold text-white ${
                categoryColors[cat] || 'bg-gray-500'
              } hover:opacity-90 transition-opacity shadow-sm`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Articles */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-bold text-gray-900">Berita Terbaru</h3>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => onArticleClick(article)} />
            ))}
          </div>
          {latestArticles.length > 6 && (
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Lihat Lebih Banyak <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Trending */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Trending</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
              {trending.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => onArticleClick(article)}
                  variant="compact"
                />
              ))}
            </div>
          </div>

          {/* More by category */}
          {categories.map((cat) => {
            const catArticles = articles.filter((a) => a.category === cat).slice(0, 3);
            if (catArticles.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{cat}</h3>
                  <div className="flex-1 h-px bg-gray-200" />
                  <button
                    onClick={() => onCategoryClick(cat)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="space-y-4">
                  {catArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => onArticleClick(article)}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
