import { useEffect, useState }  from 'react';
import { Clock, Eye, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Link2 } from 'lucide-react';
import { supabase, type Article } from '../lib/supabase';
import ArticleCard from './ArticleCard';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

export default function ArticleDetail({ article, onBack, onArticleClick }: ArticleDetailProps) {
  const [related, setRelated] = useState<Article[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    async function fetchRelated() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('category', article.category)
        .neq('id', article.id)
        .order('published_at', { ascending: false })
        .limit(3);
      if (data) setRelated(data);
    }
    fetchRelated();
  }, [article]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const published = new Date(article.published_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
    }
    setShowShare(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          {/* Category */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="font-semibold text-gray-700">{article.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {published}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {article.views} dilihat
            </span>
          </div>

          {/* Featured Image */}
          {article.image_url && (
            <div className="rounded-xl overflow-hidden mb-8 bg-gray-200">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="article-body text-gray-700 text-lg leading-relaxed space-y-4 mb-8"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
          />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                bookmarked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              {bookmarked ? 'Tersimpan' : 'Simpan'}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
              {showShare && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 flex gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-md hover:bg-gray-100 text-blue-600"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-md hover:bg-gray-100 text-sky-500"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                    title="Copy Link"
                  >
                    <Link2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {related.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-gray-900">Berita Terkait</h3>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-4">
                {related.map((a) => (
                  <ArticleCard
                    key={a.id}
                    article={a}
                    onClick={() => onArticleClick(a)}
                    variant="horizontal"
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
