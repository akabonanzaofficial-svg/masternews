import { Clock, Eye, ArrowRight } from 'lucide-react';
import type { Article } from '../lib/supabase';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'default' | 'compact' | 'horizontal';
}

export default function ArticleCard({ article, onClick, variant = 'default' }: ArticleCardProps) {
  const published = new Date(article.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className="group flex gap-3 p-3 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
      >
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={article.image_url || 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&w=400'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">{article.category}</span>
          <h4 className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
            <span>{published}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div
        onClick={onClick}
        className="group flex gap-4 cursor-pointer transition-colors"
      >
        <div className="w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={article.image_url || 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&w=400'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">{article.category}</span>
          <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.summary}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {published}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg cursor-pointer transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={article.image_url || 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&w=400'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{article.summary}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {published}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Baca <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
