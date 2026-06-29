import { useState, useEffect } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { supabase, type Article } from '../lib/supabase';
import ArticleCard from './ArticleCard';

interface CategoryViewProps {
  category: string;
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terpopuler', value: 'popular' },
];

export default function CategoryView({ category, onBack, onArticleClick }: CategoryViewProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .order(sort === 'popular' ? 'views' : 'published_at', { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, [category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm text-gray-500">Kategori</span>
          <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
          <p className="text-sm text-gray-500 mt-1">{articles.length} artikel ditemukan</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Belum ada artikel dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onClick={() => onArticleClick(article)} />
          ))}
        </div>
      )}
    </div>
  );
}
